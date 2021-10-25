import React, { useState, useEffect } from "react";
import { Route, Redirect, useParams, useHistory } from "react-router-dom";
import NewsDetails from "./components/NewsDetails";
import NewsFilter from "./components/NewsFilter";
import NewsList from "./components/NewsList";
import Pagination from "./components/Pagination";
import LevelContext from "./components/level-context";
import "./index.css";

function App() {
  const [news, setNews] = useState([]); // array of all news objects fetched with api
  const [chosenNews, setChosenNews] = useState({}); //concrete news object for detailed page
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState(""); // value in the input field to filter news
  const [isDetailsPage, setIsDetailsPage] = useState(false); //has user selected detailed news page

  let shownPosts = []; //posts displayed on one page
  let filteredPosts = []; //posts displayed after filter
  const postsPerPage = 5;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = currentPage * postsPerPage;

  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      if (!location.pathname.includes("details")) setIsDetailsPage(false);
    });
  }, [history]);

  const currentPageHandler = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0 });
    }
  };

  const getFilterValueHandler = (value) => {
    setFilterValue(value);
  };
  const changeLevel = () => {
    setIsDetailsPage((prev) => !prev);
  };

  useEffect(() => {
    fetchData();
    console.log("data fetched");
  }, []);

  const fetchData = () => {
    fetch(
      "https://gnews.io/api/v4/top-headlines?token=9a9bea340a5d8026f5f8ffd56df958c3"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setNews(data.articles);
      });
  };

  if (news) {
    shownPosts = news.slice(startIndex, endIndex);

    filteredPosts = shownPosts.filter((post) => {
      return post.title
        .toLowerCase()
        .includes(filterValue.toLowerCase().trim());
    });
  }

  const getChosenNews = (newsData) => {
    setChosenNews(newsData);
  };
  const stylef = `${isDetailsPage ? "hidden" : "visible"}`;

  return (
    <LevelContext.Provider value={{ changeLevel: changeLevel }}>
      <NewsFilter
        styles={stylef}
        getFilterValue={getFilterValueHandler}
        page={currentPage}
      />
      <Route path="/" exact>
        <Redirect to={`/page/${currentPage}`} />
      </Route>
      <Route path="/page/:pageId">
        <NewsList news={filteredPosts} getChosenNews={getChosenNews} />
        <Pagination
          numberOfPosts={news.length}
          postsPerPage={postsPerPage}
          goToPage={currentPageHandler}
          page={currentPage}
        />
      </Route>
      <Route path={"/details"}>
        <NewsDetails data={chosenNews} />
      </Route>
    </LevelContext.Provider>
  );
}

export default App;

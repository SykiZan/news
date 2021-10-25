import React from "react";
import News from "./News";
import classes from "./NewsList.module.css";
const NewsList = (props) => {
  return (
    <>
      {props.news.map((news) => (
        <News
          key={Math.random()}
          title={news.title}
          description={news.description}
          img={news.image}
          id={news}
          getChosenNews={props.getChosenNews}
        />
      ))}
    </>
  );
};

export default NewsList;

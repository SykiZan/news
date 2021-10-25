import React from "react";
import Card from "./Card";
import classes from "./News.module.css";
import { Route, useHistory, useParams } from "react-router-dom";
import NewsDetails from "./NewsDetails";
import { useContext } from "react";
import LevelContext from "./level-context";

const News = (props) => {
  const history = useHistory();
  const ctx = useContext(LevelContext);
  const goToFullPage = () => {
    window.scrollTo({ top: 0 });
    ctx.changeLevel();

    props.getChosenNews(props.id);
    history.push("/details");
  };

  return (
    <article className={classes.news}>
      <div>
        <img
          className={classes.image}
          src={props.img}
          alt="img"
          onClick={goToFullPage}
        />
      </div>
      <p className={classes.title} onClick={goToFullPage}>
        {props.title}
      </p>
      <p className={classes.description}>{props.description}</p>
    </article>
  );
};

export default News;

import React from "react";
import Card from "./Card";
import News from "./News";

import classes from "./NewsDetails.module.css";
const NewsDetails = (props) => {
  return (
    <article className={classes.news}>
      <div>
        <img className={classes.image} src={props.data.image} alt="img" />
      </div>
      <p className={classes.title}>{props.data.title}</p>

      <p className={classes.content}>{props.data.content}</p>
      <a className={classes.link} href={props.data.url} target="_blank">
        Read from source&rarr;
      </a>
    </article>
  );
};

export default NewsDetails;

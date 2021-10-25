import React from "react";

import classes from "./Card.module.css";

const Card = (props) => {
  // const classList = props.className ? props.className : "card";
  // console.log(classList);
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;

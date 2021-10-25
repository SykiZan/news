import { useContext } from "react";
import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import LevelContext from "./level-context";
import classes from "./NewsFilter.module.css";

const NewsFilter = (props) => {
  const [filterValue, setFilterValue] = useState("");
  const ctx = useContext(LevelContext);

  const filterNewsHandler = (e) => {
    const val = e.target.value;
    setFilterValue(val);
  };
  props.getFilterValue(filterValue);

  return (
    <div>
      <div className={classes.filter} style={{ visibility: `${props.styles}` }}>
        <label htmlFor="filter">Search:</label>
        <input name="filter" type="text" onChange={filterNewsHandler} />
      </div>
      <NavLink
        onClick={ctx.changeLevel}
        to={`/page/${props.page}`}
        style={{
          visibility: `${props.styles === "visible" ? "hidden" : "visible"} `,
        }}
        className={classes.btn}
      >
        &larr;Back
      </NavLink>
    </div>
  );
};

export default NewsFilter;

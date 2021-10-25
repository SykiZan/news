import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

import classes from "./Pagination.module.css";

const Pagination = (props) => {
  const pages = Math.ceil(props.numberOfPosts / props.postsPerPage);
  const pagesArr = new Array(pages).fill("");

  const history = useHistory();

  const nextPage = () => {
    if (props.page !== pages) {
      window.scrollTo({ top: 0 });
      const next = props.page + 1;
      props.goToPage(next);
      history.push(`/page/${next}`);
    }
  };
  const prevPage = () => {
    if (props.page !== 1) {
      window.scrollTo({ top: 0 });
      const next = props.page - 1;
      props.goToPage(next);
      history.push(`/page/${next}`);
    }
  };

  return (
    <div className={classes.pagination}>
      <button className={classes.btn} onClick={prevPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classes["btn-icon"]}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {pagesArr.map((element, index) => (
        <NavLink
          key={Math.random()}
          activeClassName={classes.active}
          className={classes["page-link"]}
          to={`/page/${index + 1}`}
          onClick={() => {
            props.goToPage(index + 1);
          }}
        >
          {index + 1}
        </NavLink>
      ))}
      <button className={classes.btn} onClick={nextPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classes["btn-icon"]}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;

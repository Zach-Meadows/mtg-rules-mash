import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

function Rule(props) {
  return (
    <div>
      <Link to={"/rules/" + props.i}>
        {props.cat} {props.categories[props.cat]["title"]}
      </Link>
    </div>
  );
}

export default Rule;

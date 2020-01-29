import React, { Component } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";

const RuleDiv = styled.div``;

class App extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      sections: [],
      rules: []
    };
  }
  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/Zach-Meadows/MtgRulesPython/master/data.json"
    )
      .then(res => res.json())
      .then(res => {
        let categories = res
        let sections = Object.keys(res).map(cat => {
         return Object.keys(res[cat]).map(section => {
           return res[cat][section]
         })
        })
        let rules = Object.keys(res).map(cat => {
          return Object.keys(res[cat]).map(section => {
            if (section === "title") {
              return res[cat][section]
            }
            return Object.keys(res[cat][section]).map(rule => {
              if (rule === "title") {
                return 
              }
              return res[cat][section][rule]
            })
          })
        })
        let subrules
        this.setState({
          categories: categories,
          sections: sections,
          rules: rules
        });
      });
  }
  
  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          render={() =>
            Object.keys(this.state.categories).map(key => {
              return (
                <RuleDiv>
                  <p>
                    {key} {this.state.categories[key]["title"]}
                  </p>
                  {}
                  
                </RuleDiv>
              );
            })
          }
        />
      </div>
    );
  }
}
export default App;

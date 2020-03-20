import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
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
              return res[cat][section][rule]
            })
          })
        })
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
            Object.keys(this.state.categories).map((key, i) => {
              return (
                <RuleDiv>
                  <Link to={"/rules/" + i}>
                    {key} {this.state.categories[key]["title"]}
                  </Link>
                </RuleDiv>
              );
            })
          }
        />
        {this.state.rules.map((ruleArray, i) => {
          return <Route path={"/rules/" + i} key={i} render={() => {
            return (<div>
              {ruleArray.map((rule,i) => {
                if (i === 0) {
                  return
                }
                return <div>
                  <Link to={"/rules/" + i}>{rule[0]}</Link>
                  </div>
              })}
            </div>)
          }}/>
        })}
      </div>
    );
  }
}
export default App;

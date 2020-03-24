import React, { useState, useEffect } from "react";
import { Route, Link} from "react-router-dom";
import styled from "styled-components";
import Rule from "./Components/Rule";

const RuleDiv = styled.div``;

function App() {
  const [categories, setCat] = useState(0);
  const [sections, setSec] = useState({sections: []});
  const [rules, setRules] = useState({rules: []});

  useEffect(() => {
    // fetchRules();
    fetch(
      "https://raw.githubusercontent.com/Zach-Meadows/MtgRulesPython/master/data.json"
    )
    .then(res => res.json())
    .then(res => {
      setCat(res)
      let fetchSec = Object.entries(res)
      
      setSec(Object.keys(res).map(cat => {
        return Object.keys(res[cat]).map(section => {
          return res[cat][section]
        })
       }))
       setRules(Object.keys(res).map(cat => {
        return Object.keys(res[cat]).map(section => {
          if (section === "title") {
            return res[cat][section]
          }
          return Object.keys(res[cat][section]).map(rule => {
            return res[cat][section][rule]
          })
        })
      }))
})
  }, [categories])
  return (
    <div>
        <Route
          path="/"
          exact
          render={() => {
            return Object.keys(categories).map((cat, i) => {
              return (
                <div key={i}>
                <Rule key={i} i={i} categories={categories} sections={sections} rules={rules} cat={cat}/>
                </div>
              );
            })
          }}
        />
     
        {Array.isArray(rules) && rules.map((ruleArray, i) => {
          return <Route path={"/rules/" + i} key={i} render={() => {
            return (<div>
              {ruleArray.map((rule,subI) => {
                if (subI === 0) {
                  return
                }
                return <div>
                  <Link to={"/rules/" + i + "/" + subI}>{rule[0]}</Link>
                  </div>
              })}
              
            </div>)
          }}/>
        })}
      </div>
  )
}

export default App;

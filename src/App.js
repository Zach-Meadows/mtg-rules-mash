import React, { Component } from "react";
import { Route } from "react-router-dom";

class App extends Component {
  render (){
  return (
    <div>
      <Route
        path="/"
        exact
        render={() => 
        (<div>
           <p>Hello</p>
          </div>
        )}
      />
    </div>
  );
}
}
export default App;

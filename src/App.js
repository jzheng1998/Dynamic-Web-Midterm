import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Selection from "./containers/Selection";
import Home from "./containers/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:breedName">
          <Selection />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

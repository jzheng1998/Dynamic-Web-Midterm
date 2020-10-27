import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Dog from "./containers/Dog";

import Home from "./containers/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id">
          <Dog />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

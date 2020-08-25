import React, { useContext } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import PreviewWrapper from "./components/PreviewWrapper/PreviewWrapper";
import Entry from "./components/Entry/Entry";
import { StateContext } from "./context";

import "./App.css";

function App() {
  const { darkMode } = useContext(StateContext);
  return (
    <Router>
      <div
        className="app"
        style={darkMode ? { backgroundColor: "#121212" } : {}}
      >
        <Header />
        <Switch>
          <Route exact path="/">
            <PreviewWrapper />
          </Route>
          <Route path="/:slug">
            <Entry />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

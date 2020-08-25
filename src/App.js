import React, { useContext } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import PreviewWrapper from "./components/PreviewWrapper/PreviewWrapper";
import Entry from "./components/Entry/Entry";
import Footer from "./components/Footer/Footer";
import { StateContext } from "./context";

import "./App.css";

function App() {
  const { darkMode } = useContext(StateContext);

  // map over existing entries where category = filters

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
          <Route path="/:name">
            <Entry />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

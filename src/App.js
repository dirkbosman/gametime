import React, { useEffect, useContext, useState } from "react";
import { StateContext } from "./context";
import { Link, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header"
import PreviewWrapper from "./components/PreviewWrapper/PreviewWrapper"
import Entry from "./components/Entry/Entry"
import Footer from "./components/Footer/Footer"

import "./App.css";

// do we still need this?
// require("dotenv").config();

function App() {
  

  // do we still need this?

  // map over existing entries where category = filters



  return (
    <Router>
      <div className="app">
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

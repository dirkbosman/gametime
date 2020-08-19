import React, { useEffect, useContext } from "react";
import { StateContext } from "./context";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Header, PreviewWrapper, Entry, Footer } from "./components";

// do we still need this?
// require("dotenv").config();

function App() {
  // do we still need this?
  const { entries, setEntries, client, options } = useContext(StateContext);

  // do we still need this?
  useEffect(() => {
    client.getEntries({ content_type: "games" }).then((response) => {
      setEntries(response.items);
    });
  }, []);

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

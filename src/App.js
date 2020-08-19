import React, { useState, useEffect, useContext } from "react";
import {
  useParams,
  Switch,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { StateContext } from "./context";

import Header from "./components/Header/Header";
// import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer";
import PreviewWrapper from "./components/Main/PreviewWrapper";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

require("dotenv").config();

function App() {
  const { entries, setEntries, client, options } = useContext(StateContext);

  useEffect(() => {
    client.getEntries({ content_type: "games" }).then((response) => {
      setEntries(response.items);
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        {/* <main>
        <div className="entriesWrapper">{Entries}</div>
      </main> */}

        <Switch>
          <Route exact path="/">
            <PreviewWrapper />
          </Route>
          <Route path="/:name">
            {/* <Entries /> */}
            <Entry />
          </Route>
        </Switch>

        <Footer />

        {/* <Entry path={entries.fields.path} /> */}
      </div>
    </Router>
  );
}

const Entry = () => {
  const { name } = useParams();
  const { entries, options } = useContext(StateContext);

  const Entry = entries
    // replace slug in the entry.fields.name
    .filter((entry) => entry.fields.name === name)
    .map((entry) => (
      <div className="detailed-entry" key={entry.sys.id}>
        <h1>{entry.fields.name}</h1>
        {documentToReactComponents(entry.fields.description, options)}
      </div>
    ));

  return <h1>{Entry}</h1>;
};

export default App;

import React, { useState, useEffect, useContext } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { StateContext } from "./context";

import Header from "./components/Header/Header";
// import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer";
import PreviewWrapper from "./components/Main/PreviewWrapper";

require("dotenv").config();

function App() {
  const { entries, setEntries, client, options } = useContext(StateContext);

  useEffect(() => {
    client.getEntries({ content_type: "games" }).then((response) => {
      setEntries(response.items);
    });
  }, []);

  const Entries = entries.map((entry) => (
    <div className="entry" key={entry.sys.id}>
      <h1>{entry.fields.names}</h1>
      {/* {documentToReactComponents(entry.fields.content, options)} */}
      {/* {entry.fields.content} */}
      {/* {documentToReactComponents(entry.fields.content, options)}
      {entry.fields.category}
      {entry.fields.subCategory}
      {entry.fields.image}
      {entry.fields.players}
      {entry.fields.description} */}
    </div>
  ));

  return (
    <div className="app">
      <Header />
      {/* <main>
        <div className="entriesWrapper">{Entries}</div>
      </main> */}
      <PreviewWrapper />
      <Footer />
    </div>
  );
}

export default App;

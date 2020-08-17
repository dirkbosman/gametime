
import React, { useState, useEffect } from "react";
import * as Contentful from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { StateContext } from "./context"

import Header from "./components/Header/Header"
// import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer"

require("dotenv").config();


function App() {
  const { entries } = useContext(StateContext);

  // const [entries, setEntries] = useState([]);

  useEffect(() => {
    client
      .getEntries({ content_type: "blogText" })
      .then((response) => {
        setEntries(response.items);
      });
  }, []);

  const Entries = entries.map((entry) => (
    <div className="entry" key={entry.sys.id}>
      <h1>{entry.fields.title}</h1>
      {documentToReactComponents(entry.fields.content, options)}
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
      <main>
        <div className="entriesWrapper">{Entries}</div>
      </main>
     <Footer />
    </div>
  );
}

export default App;
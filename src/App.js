import React, { useState, useEffect } from "react";
import * as Contentful from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

import logo from "./assets/wikigames-logo.png";
import "./App.css";

require("dotenv").config();

const client = Contentful.createClient({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_CDAPI_ACCESS_TOKEN,
});

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="paragraph_test">{children}</p>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri}>{children}</a>
    ),
    // [BLOCKS.EMBEDDED_ENTRY]: (node, children) => <div>{children}</div>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <img
        className="image"
        src={node.data.target.fields.file.url}
        alt={node.data.target.fields.file.url}
      />
    ),
  },
  renderMark: {
    [MARKS.ITALIC]: (text) => <span className="italic">{text}</span>,
  },
};

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    client
      // rename games to contentType
      .getEntries({ content_type: "blogText" })
      .then((response) => {
        setEntries(response.items);
        // setEntries(..., response.items);
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
    <div className="App">
      <header>
        <div className="headerWrapper">
          <div className="logoWrapper">
            <img src={logo} alt="Logo" />
            <div className="Headline">WikiGames</div>
          </div>
        </div>
      </header>
      <main>
        <div className="mainWrapper">{Entries}</div>
      </main>
      <footer>
        <div className="footerWrapper"></div>
      </footer>
    </div>
  );
}

export default App;

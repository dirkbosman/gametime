import React, { createContext, useState, useEffect } from "react";
import * as Contentful from "contentful";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

require("dotenv").config();

export const StateContext = createContext({});

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

const ContextProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [filters, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    client.getEntries({ content_type: "games" }).then((response) => {
      setEntries(response.items);
    });
  }, []);

  return (
    <StateContext.Provider
      value={{
        entries,
        setEntries,
        filters,
        setFilter,
        darkMode,
        setDarkMode,
        client,
        options,
        loading,
        setLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export default ContextProvider;

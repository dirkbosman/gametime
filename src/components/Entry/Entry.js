import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { StateContext } from "../../context";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function Entry() {
  const { entries, setEntries, filters, client, options,darkMode } = useContext(
    StateContext
  );
require("dotenv").config();
// delete unneccesarry props
   const { slug } = useParams();


  useEffect(() => {
    client.getEntries({ content_type: "games" }).then((response) => {
      setEntries(response.items);
    });
  }, []);

  const RelatedEntries = entries
    .filter(function (entries) {
      if (filters) {
        return entries.fields.category === filters;

        // convertStringToCategoryArray -> helper function
        // const categories = convertStringToCategoryArray(
        //   entries.fields.category
        // );
        // return categories.includes(filters);
      }
    })
    .map((entry) => (
      // <Link style={{ textDecoration: "none" }} to={"/" + entry.fields.name}>
      <Link style={{ textDecoration: "none" }} to={"/" + entry.fields.slug}>
        <div
          className="simple-entry card"
          key={entry.sys.id}
          // href={entry.fields.path}
          href={entry.fields.slug}
                style={
            darkMode
              ? {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "rgba(255, 255, 255, 0.55)",
                }
              : {}
          }
        >
          <p>{entry.fields.players} Player / Players</p>

          <h3>{entry.fields.name}</h3>
          <h5>
            {entry.fields.category}:<br />
            {entry.fields.subCategory}
          </h5>
        </div>
      </Link>
    ))
    .slice(0, 3);

  const Entry = entries
    // replace slug in the entry.fields.name
    // .filter((entry) => entry.fields.name === name)
    .filter((entry) => entry.fields.slug === slug)
    .map((entry) => (
      <div
        className="detailed-entry"
        style={darkMode ? { color: "rgba(255, 255, 255, 0.55)" } : {}}
        key={entry.sys.id}
      >
        <h1>{entry.fields.name}</h1>
        {documentToReactComponents(entry.fields.description, options)}
      </div>
    ));

  function goBack() {
    window.history.back();
  }

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
      <h1>{Entry}</h1>
      <div className="relatedEntriesWrapper">{RelatedEntries}</div>
    </div>
  );
}

function convertStringToCategoryArray(str) {
  return str.split(",").map((item) => item.trim());
}


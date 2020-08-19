import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StateContext } from "../../context";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

require("dotenv").config();
// delete unneccesarry props

function Entry() {
  const {
    entries,
    setEntries,
    client,
    options,
    loading,
    setLoading,
  } = useContext(StateContext);

  const { name } = useParams();
  // const { slug } = useParams();
  // console.log("slug: " + slug);

  //delete this later
  useEffect(() => {
    client.getEntries({ content_type: "games" }).then((response) => {
      setEntries(response.items);
    });
  }, []);

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

  // const Entry = entries
  //   .filter((entry) => entry.slug === slug)
  //   .map((entry) => (
  //     <div className="detailed-entry" key={entry.sys.id}>
  //       <h1>{entry.fields.names}</h1>
  //       {documentToReactComponents(entry.fields.description, options)}
  //     </div>
  //   ));

  // return <div className="entriesWrapper">{Entry}</div>;
}

export default Entry;

import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { StateContext } from "../../context";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

require("dotenv").config();

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

export default Entry;

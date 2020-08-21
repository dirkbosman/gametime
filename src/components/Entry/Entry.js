import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StateContext } from "../../context";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Link} from "react-router-dom";


require("dotenv").config();
// delete unneccesarry props

function Entry() {

  const { entries, setEntries, filters, setFilter, client, options } = useContext(StateContext);
  const { name } = useParams();

  useEffect(() => {
    client.getEntries({ content_type: "games" }).then((response) => {
      setEntries(response.items);
    });
  }, []);
  
  const RelatedEntries = entries.filter(function (entries) { 
    if (filters) {return entries.fields.category === filters;}
  }).map((entry) => (
  
    <Link style={{textDecoration: "none"}} to={"/" + entry.fields.name}>
      <div
        className="simple-entry card"
        key={entry.sys.id}
        href={entry.fields.path}
      >
        <h3>{entry.fields.name}</h3>
        <h5>
          {entry.fields.category}:<br />
          {entry.fields.subCategory}
        </h5>
        <p>{entry.fields.players}</p>
        <p>{entry.fields.path}</p>
      </div>
    </Link>
  )).slice(0, 3);

  const Entry = entries
    // replace slug in the entry.fields.name
    .filter((entry) => entry.fields.name === name)
    .map((entry) => (
      <div className="detailed-entry" key={entry.sys.id}>
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
    </div>)
  ;
}

export default Entry;
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StateContext } from "../../context";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Link} from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { backButton } from "./assets/back.png";

import "./Entry.css"

require("dotenv").config();
// delete unneccesarry props

function Entry() {

  const { entries, setEntries, filters, client, options } = useContext(StateContext);
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
        className="simple-entry card-1"
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
      <div className="detailed-entry card-2" key={entry.sys.id}>
        <div className="card-header">
          <div className="button-wrapper">
            <button onClick={goBack}>Back</button>
          </div>
          <div className="SocialIconsWrapper">
            <SocialIcon network="twitter" url={`http://twitter.com/share?text=${"Check This Out!"}&url=${name}` } target="_blank" style={{margin: 5, height:35, width:35}} />
            <SocialIcon network="facebook" url={`http://www.facebook.com/sharer.php?u=${name}`}  target="_blank" style={{margin: 5, height:35, width:35}} />
            <SocialIcon network="instagram" url="https://instagram.com" target="_blank" style={{margin: 5, height:35, width:35}} />
            <SocialIcon network="pinterest" url={`http://pinterest.com/pin/create/button/?url=${name}&description=${"Check This Out!"}`} target="_blank" style={{margin: 5, height:35, width:35}} />              
            <SocialIcon network="whatsapp" style={{margin: 5, height:35, width:35}} />
          </div>
        </div>
        <h1>{entry.fields.name}</h1>
        <div className="main-text">{documentToReactComponents(entry.fields.description, options)}</div>
      </div>
    ));

  function goBack() {
    window.history.back();
  }  

  return (
    <div>
      
      <div className="detailed-entry-container">{Entry}</div>
      <div className="relatedEntriesWrapper">{RelatedEntries}</div>
    </div>)
  ;
}

export default Entry;
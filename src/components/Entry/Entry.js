import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { StateContext } from "../../context";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { SocialIcon } from "react-social-icons";
import "./Entry.css";

export default function Entry() {
  const {
    entries,
    setEntries,
    filters,
    setFilter,
    client,
    options,
    darkMode,
  } = useContext(StateContext);
  require("dotenv").config();

  const { slug } = useParams();

  // useEffect(() => {
  //   client.getEntries({ content_type: "games" }).then((response) => {
  //     setEntries(response.items);
  //   });
  // }, []);

  const RelatedEntries = entries
    .filter(function (entries) {
      if (filters) {
        return entries.fields.category === filters;
      }
    })
    .map((entry) => (
      <Link style={{ textDecoration: "none" }} to={"/" + entry.fields.slug}>
        <div
          className="simple-entry card-1"
          key={entry.sys.id}
          href={entry.fields.slug}
          style={
            darkMode
              ? {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }
              : {}
          }
        >
          <p className="playerCount">{playerCount(entry.fields.players)}</p>
          <h3>{entry.fields.name}</h3>
          <h5>{entry.fields.category}</h5>
        </div>
      </Link>
    ))
    .slice(0, 3);

  const Entry = entries
    .filter((entry) => entry.fields.slug === slug)
    .map((entry) => (
      <div className="detailed-entry card-2" key={entry.sys.id}>
        <div className="card-header">
          <div className="button-wrapper">
            <button onClick={goBack}>Back</button>
          </div>
          <div className="SocialIconsWrapper">
            <SocialIcon
              network="twitter"
              url={`http://twitter.com/share?text=${"Check This Out!"}&url=${slug}`}
              target="_blank"
              style={{ margin: 5, height: 30, width: 30 }}
            />
            <SocialIcon
              network="facebook"
              url={`http://www.facebook.com/sharer.php?u=${slug}`}
              target="_blank"
              style={{ margin: 5, height: 30, width: 30 }}
            />
            <SocialIcon
              network="instagram"
              url="https://instagram.com"
              target="_blank"
              style={{ margin: 5, height: 30, width: 30 }}
            />
            <SocialIcon
              network="pinterest"
              url={`http://pinterest.com/pin/create/button/?url=${slug}&description=${"Check This Out!"}`}
              target="_blank"
              style={{ margin: 5, height: 30, width: 30 }}
            />
            <SocialIcon
              network="whatsapp"
              style={{ margin: 5, height: 30, width: 30 }}
            />
          </div>
        </div>

        <h2>{entry.fields.name}</h2>
        <h5>{entry.fields.category}</h5>
        <div className="main-text">
          {documentToReactComponents(entry.fields.description, options)}
        </div>
      </div>
    ));

  function goBack() {
    setFilter("All");
    window.history.back();
  }

  return (
    <div>
      <div className="detailed-entry-container">{Entry}</div>
      <div className="relatedEntriesWrapper">{RelatedEntries}</div>
    </div>
  );
}

function playerCount(str) {
  if (str === "1") {
    return str + " Player 🙍";
  } else {
    return str + " Players 👩‍👧‍👦";
  }
}

import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { StateContext } from "../../context";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { SocialIcon } from "react-social-icons";
import "./Entry.css";

export default function Entry() {
  const {
    entries,
    filters,
    setFilter,
    slugs,
    setSlugs,
    options,
    darkMode,
  } = useContext(StateContext);
  require("dotenv").config();

  const { slug } = useParams();

  const RelatedEntries = entries
    .filter(function (entries) {
      if (filters) {
        if (entries.fields.slug === slug) {
          return false;
        }
        const filterz = convertStringToCategoryArray(filters);
        const categories = convertStringToCategoryArray(
          entries.fields.category
        );
        return categories.includes(filterz[0]);
      }
    })
    .map((entry) => (
      <Link
        onClick={() => setSlugs(entry.fields.slug)}
        to={"/" + entry.fields.slug}
        style={{ textDecoration: "none" }}
      >
        <div
          className="simple-entry card-1"
          key={entry.sys.id}
          href={entry.fields.slug}
          style={
            darkMode
              ? {
                  backgroundColor: "#333333",
                  color: "#fff",
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
    .filter((entry) => entry.fields.slug === slugs)
    .map((entry) => (
      <div
        className="detailed-entry card-2"
        key={entry.sys.id}
        style={
          darkMode
            ? {
                backgroundColor: "#333333",
                color: "#fff",
              }
            : {}
        }
      >
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
      <h3
        style={
          darkMode
            ? {
                color: "#fff",
              }
            : {}
        }
      >
        Games you also may like...
      </h3>
      <div className="relatedEntriesWrapper">{RelatedEntries}</div>
    </div>
  );
}

function convertStringToCategoryArray(str) {
  return str.split(",").map((item) => item.trim());
}

function playerCount(str) {
  if (str === "1") {
    return str + " Player 🙍";
  } else {
    return str + " Players 👩‍👧‍👦";
  }
}

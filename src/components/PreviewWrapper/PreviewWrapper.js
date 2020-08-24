import React, { useContext } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { StateContext } from "../../context";
import "./PreviewWrapper.css";

export default function PreviewWrapper() {
  const {
    entries,
    setEntries,
    filters,
    setFilter,
    client,
    loading,
  } = useContext(StateContext);

  const Entries = entries
    .filter(function (entries) {
      if (filters === "All") {
        return entries.fields.category;
      } else {
        // convertStringToCategoryArray -> helper function
        const categories = convertStringToCategoryArray(
          entries.fields.category
        );
        return categories.includes(filters);
      }
    })
    .sort((a, b) => {
      return a.fields.players - b.fields.players;
    })
    .map((entry) => (
      <Link
        className={addColorClass(entry.fields.players)}
        style={{ textDecoration: "none" }}
        // to={"/" + entry.fields.name}
        to={"/" + entry.fields.slug}
        onClick={() => setFilter(entry.fields.category)}
      >
        <div
          className="simple-entry card"
          key={entry.sys.id}
          // href={entry.fields.path}
          href={entry.fields.slug}
        >
          <p>{entry.fields.players} Player / Players</p>
          <h3>{entry.fields.name}</h3>
          <h5>
            {entry.fields.category}:<br />
            {entry.fields.subCategory}
          </h5>
        </div>
      </Link>
    ));

  return (
    <div className="entriesWrapper">
      <button onClick={() => setFilter("All")}>All</button>
      <button onClick={() => setFilter("Online Games")}>Online Games</button>
      <button onClick={() => setFilter("Card Games")}>Card Games</button>
      <button onClick={() => setFilter("Party Games")}>Party Games</button>
      <button onClick={() => setFilter("Board Games")}>Board Games</button>
      {loading ? (
        <Loader type="Circles" color="#1ab188" height={150} width={150} />
      ) : (
        <div className="entriesWrapper">{Entries}</div>
      )}
    </div>
  );
}

function convertStringToCategoryArray(str) {
  return str.split(",").map((item) => item.trim());
}

function addColorClass(num) {
  if (num <= 1) {
    return "players-xs";
  } else if (num <= 2) {
    return "players-sm";
  } else if (num <= 4) {
    return "players-md";
  }
  return "players-lg";
}

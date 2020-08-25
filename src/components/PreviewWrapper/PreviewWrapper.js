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
    darkMode,
    setDarkMode,
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
          className="simple-entry card-1"
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
    ));

  return (
    <div className="entriesWrapper">
      {<div className="buttonsWrapper">
        <button
          className={darkMode ? "buttonDark" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={darkMode ? "buttonDark" : ""}
          onClick={() => setFilter("Online Games")}
        >
          Online Games
        </button>
        <button
          className={darkMode ? "buttonDark" : ""}
          onClick={() => setFilter("Card Games")}
        >
          Card Games
        </button>
        <button
          className={darkMode ? "buttonDark" : ""}
          onClick={() => setFilter("Party Games")}
        >
          Party Games
        </button>
        <button
          className={darkMode ? "buttonDark" : ""}
          onClick={() => setFilter("Board Games")}
        >
          Board Games
        </button>
        <button
          className={darkMode ? "buttonDark" : ""}
          onClick={() => setDarkMode(!darkMode)}
        >
          Dark Mode
        </button>
      </div>
      {loading ? (
        <Loader type="Circles" color="#1ab188" height={150} width={150} />
      ) : (
        <div>{Entries}</div>
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

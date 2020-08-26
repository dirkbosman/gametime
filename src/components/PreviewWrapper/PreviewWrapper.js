import React, { useContext } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { StateContext } from "../../context";
import "./PreviewWrapper.css";

export default function PreviewWrapper() {
  const {
    entries,
    filters,
    setFilter,
    setSlugs,
    loading,
    darkMode,
  } = useContext(StateContext);

  const Entries = entries
    .filter(function (entries) {
      if (filters === "All") {
        return entries.fields.category;
      } else {
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
        onClick={() =>
          handleSlugAndFilter(entry.fields.category, entry.fields.slug)
        }
        to={"/" + entry.fields.slug}
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
          <p
            style={{ color: "black" }}
            className={addColorClass(entry.fields.players)}
          >
            {playerCount(entry.fields.players)}
          </p>

          <h3>{entry.fields.name}</h3>
          <h5>{entry.fields.category}</h5>
        </div>
      </Link>
    ));

  const handleSlugAndFilter = (filter, slugPath) => {
    setFilter(filter);
    setSlugs(slugPath);
  };

  return (
    <div className="entriesContainer">
      <div className="buttonsWrapper">
        <button
          className={darkMode ? "buttonDark" : "buttonLight"}
          onClick={() => setFilter("All")}
        >
          All Games
        </button>
        <button
          className={darkMode ? "buttonDark" : "buttonLight"}
          onClick={() => setFilter("Online Games")}
        >
          Online Games
        </button>
        <button
          className={darkMode ? "buttonDark" : "buttonLight"}
          onClick={() => setFilter("Card Games")}
        >
          Card Games
        </button>
        <button
          className={darkMode ? "buttonDark" : "buttonLight"}
          onClick={() => setFilter("Party Games")}
        >
          Party Games
        </button>
        <button
          className={darkMode ? "buttonDark" : "buttonLight"}
          onClick={() => setFilter("Board Games")}
        >
          Board Games
        </button>
      </div>
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

function playerCount(str) {
  if (str === "1") {
    return str + " Player 👩";
  } else {
    return str + " Players 👩‍👧‍👦";
  }
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

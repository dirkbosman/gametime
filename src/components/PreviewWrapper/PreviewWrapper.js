import React, { useContext, useEffect } from "react";
import Loader from "react-loader-spinner";

import { Link } from "react-router-dom";
import "./PreviewWrapper.css";
import { StateContext } from "../../context";

export default function PreviewWrapper() {
  const { entries, setEntries, filters, setFilter, client, loading } = useContext(StateContext);

  // delete later
  useEffect(() => {
    client.getEntries({ content_type: "games" }).then((response) => {
      setEntries(response.items);
    });
  }, []);
  
  // map all the games into multiple cards (how one card looks like)

  // Apply filter function to map
  const Entries = entries.filter(function (entries) { 
    if (filters==="All") {return entries.fields.category;} else {return entries.fields.category === filters;}
  }).map((entry) => (

    <Link style={{textDecoration: "none"}} to={"/" + entry.fields.name} onClick={() => setFilter(entry.fields.category)}>
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
  ));

  return (
    <div className="entriesWrapper">
      {<div className="buttonsWrapper">
          <button onClick={() => setFilter("All")}>All Games</button>
          <button onClick={() => setFilter("Online Games")}>Online Games</button>
          <button onClick={() => setFilter("Card Games")}>Card Games</button>
          <button onClick={() => setFilter("Party Games")}>Party Games</button>
          <button onClick={() => setFilter("Board Games")}>Board Games</button>
          <button>Single player</button>
          <button>Multiplayer player</button>
        </div>}
      {loading ? (
        <Loader type="Circles" color="#1ab188" height={150} width={150} />
      ) : (
          <div className="entriesWrapper">{Entries}</div>
      )}
    </div>
  );
}

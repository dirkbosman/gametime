import React, { useContext, useEffect } from "react";
import Loader from "react-loader-spinner";

import { Link } from "react-router-dom";
import "./PreviewWrapper.css";
import { StateContext } from "../../context";

export default function PreviewWrapper() {
  const { entries, setEntries, client, loading } = useContext(StateContext);

  // delete later
  useEffect(() => {
    client.getEntries({ content_type: "games" }).then((response) => {
      setEntries(response.items);
    });
  }, []);
  // map all the games into multiple cards (how one card looks like)
  const Entries = entries.map((entry) => (
    <Link to={"/" + entry.fields.name}>
      <div
        className="simple-entry card"
        key={entry.sys.id}
        href={entry.fields.path}
      >
        <h3>{entry.fields.name}</h3>
        <h4>
          {entry.fields.category}:<br />
          {entry.fields.subCategory}
        </h4>
        <p>{entry.fields.players}</p>
        <p>{entry.fields.path}</p>
      </div>
    </Link>
  ));

  return (
    <div className="mainContainer">
      <div className="entriesWrapper">
        {loading ? (
          <Loader type="Circles" color="#1ab188" height={150} width={150} />
        ) : (
          // Wrap in a-tag to link to other detail page.

          // <div className="level-left">
          //   <Link className="level-item button is-small is-link is-outlined" to={props.path}>Read More</Link>
          // </div>

          <div className="entriesWrapper">{Entries}</div>
          // if onCLick entries => not visible
          // => detail entry block/none

          // { Entries ? Entries : Entry }
          // children --> insert component of Entry here <Entry (**passing the fields.path)/>
        )}
      </div>
    </div>
  );
}

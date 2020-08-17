import React, { useContext, useEffect } from "react";
import Loader from "react-loader-spinner";

import "./PreviewWrapper.css";
import { StateContext } from "../../context";

function PreviewWrapper() {
  const { entries, setEntries, client, options, loading } = useContext(
    StateContext
  );

  useEffect(() => {
    client.getEntries({ content_type: "games" }).then((response) => {
      setEntries(response.items);
    });
  }, []);

  const Entries = entries.map((entry) => (
    <div className="entry card" key={entry.sys.id}>
      <h3>{entry.fields.name}</h3>
      <h4>
        {entry.fields.category}:<br />
        {entry.fields.subCategory}
      </h4>
      <p>{entry.fields.players}</p>
    </div>
  ));

  return (
    <div className="mainContainer">
      <div className="entriesWrapper">
        {loading ? (
          <Loader type="Circles" color="#1ab188" height={150} width={150} />
        ) : (
          <div className="entry">{Entries}</div>
        )}
      </div>
    </div>
  );
}

export default PreviewWrapper;

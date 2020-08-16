import React, { useState, useEffect } from "react"
import * as Contentful from "contentful"
import "./main.css"

const client = Contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
})

function Main() {
    const [entries, setEntries] =useState([])

    useEffect(() => {
        client
            .getEntries({
                'content_type': 'games'
            })
            .then((response) => {
                setEntries(response.items);
            });
        }, []);
    
    const Entries = entries.map((entry) => (
        <div className="entry card" key={entry.sys.id}>
            <h3>{entry.fields.name}</h3>
            <h4>{entry.fields.category}:<br/>{entry.fields.subCategory}</h4>
            <p>{entry.fields.players}</p>       
        </div>
    ));

    return(
        <div className="mainContainer">
            <div className="navBarContainer">
                <div className="navWrapper">
                    <button>Party games</button>
                    <button>Card games</button>
                    <button>Online games</button>
                </div>
            </div>
            <div className="entriesWrapper">{Entries}</div>
        </div>
    )
}

export default Main
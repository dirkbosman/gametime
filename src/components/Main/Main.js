import React, { useState, useEffect } from "react"
import * as Contentful from "contentful"
import "./main.css"

const client = Contentful.createClient({
    space: 'lr6yfxctthfu',
    accessToken: 'qCol8PdpNVGA2LR-9bHYlTSBbYfhPfSZS5GTj8kyHxo'
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
            <h4>{entry.fields.category}: {entry.fields.subCategory}</h4>
            <p>Participant: {entry.fields.participant}</p>       
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
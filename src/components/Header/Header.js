import React from "react"
import "./header.css"
import logo from "./wikigames-logo.png"

function Header() {
    return(
        <div className="headerContainer">
          <div className="logoWrapper">
            <img src={logo} alt="logo" />
            <div className="headline">WikiGames</div>
          </div>
        </div>
    )
}

export default Header
import React from "react";
import "./header.css";
import logo from "./wikigames-logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="headerContainer">
      <Link to="/" style={{textDecoration: "none"}}>
        <div className="logoWrapper">
          <img src={logo} alt="logo" />
          <div className="headline">WikiGames</div>
        </div>
      </Link>
    </div>
  );
}

export default Header;

import React, { useContext } from "react";
import "./header.css";
import logo from "./wikigames-logo.png";
import { Link } from "react-router-dom";
import { StateContext } from "../../context";

function Header() {
  const { setFilter } = useContext(StateContext);
  return (
    <div className="headerContainer">
      <Link
        to={"/"}
        style={{ textDecoration: "none" }}
        // reset filter to all to show all the entries.
        onClick={() => setFilter("All")}
      >
        <div className="logoWrapper">
          <img src={logo} alt="logo" />
          <div className="headline">WikiGames</div>
        </div>
      </Link>
    </div>
  );
}

export default Header;

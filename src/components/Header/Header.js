import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
import logo4 from "./assets/logo4.png";
import logo5 from "./assets/logo5.png";
import logo6 from "./assets/logo6.png";
import logo7 from "./assets/logo7.png";
import logo8 from "./assets/logo8.png";
import logo9 from "./assets/logo9.png";
import logo10 from "./assets/logo10.png";
import logo11 from "./assets/logo11.png";
import logo12 from "./assets/logo12.png";
import logo13 from "./assets/logo13.png";
import logo14 from "./assets/logo14.png";
import logo15 from "./assets/logo15.png";

function Header() {
  return (
    <div className="headerContainer">
      <Link to="/" style={{textDecoration: "none"}}>
          <div className="logoWrapper">
            <img src={logo1} alt="logo1" />
            <img src={logo2} alt="logo2" />
            <img src={logo3} alt="logo3" />
            <img src={logo4} alt="logo4" />
            <img src={logo5} alt="logo5" />
            <img src={logo6} alt="logo6" />
            <img src={logo7} alt="logo7" />
            <img src={logo8} alt="logo8" />
            <img src={logo9} alt="logo9" />
            <img src={logo10} alt="logo10" />
            <img src={logo11} alt="logo11" />
            <img src={logo12} alt="logo12" />
            <img src={logo13} alt="logo13" />
            <img src={logo14} alt="logo14" />
            <img src={logo15} alt="logo15" />
          </div>
          <div className="headline">WikiGames</div>
      </Link>
    </div>
  );
}

export default Header;

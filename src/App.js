import React from 'react';
import logo from "./assets/wikigames-logo.png"
import './App.css';


function App() {
  return (
    <div className="App">
      <header>
        <div className="headerWrapper">
          <div className="logoWrapper">
            <img src={logo} alt="Logo" />
            <div className="Headline">WikiGames</div>
          </div>
        </div>
      </header>
      <main>
        <div className="mainWrapper"></div>
      </main>
      <footer>
        <div className="footerWrapper"></div>
      </footer>
    </div>
  );
}

export default App;

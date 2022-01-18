import React from "react";
import logo from "../images/hos_logo.png";
import tower from "../images/tower.png";
import { Link } from "react-router-dom";
import "./Header.css";

/** The header for the app */

function Header() {
  return (
    <header>
        
    <figure><img src={tower} id="listentower" alt="Broadcast Tower"></img><figcaption>Listen Now</figcaption></figure>
    
    <Link to="/" className="headerlink"><h1>HOUSE OF<br/>SOUND <img id="hoslogo" src={logo} alt="House of Sound logo"></img></h1></Link>
    
    </header>
  );
}

export default Header;
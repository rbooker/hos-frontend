import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Favorite from "./Favorite"
import UserContext from "../auth/UserContext";

import "./ShowCard.css";

/** Show limited information about a show
 *
 * Is rendered by ShowList to show a "card" for each company.
 *
 * ShowList -> ShowCard
 */

function ShowCard({ showID, showName, djName, showTime, description, imgURL}) {
  
  console.debug("CompanyCard", imgURL);
  const { currentUser } = useContext(UserContext);
  
  //A little bit of slice 'n' dice to make sure the show time displays in 12hr mode, e.g. 10:00 PM rather than 22:00:00
  const showHour = +showTime.slice(0,2);
  const suffix = showHour >= 12 ? "PM":"AM"; 
  const niceShowTime = ((showHour + 11) % 12 + 1) + showTime.slice(2,5) + " " + suffix;

  const showRoute = `/show/${showID}`;

  return (
    <div className="showcard">
    <h3>{showName}</h3>
    
    <p>
      <img src={imgURL} alt="Show logo"/>
        <div className="showcardheaderred">Hosted by {djName}</div>
        <div className="showcardtext">{description}</div>
        <br/>&nbsp;<br/>&nbsp;<br/><br/>&nbsp;<br/>
        <Link className="showcardlink" to={showRoute}>Show Page &amp; Archives</Link><br/><br/>
        {currentUser ? <Favorite showID={+showID}/> : <></>}
      </p>
       <div className="showcardtime">On air live at {niceShowTime}</div>
    </div>
  );
}

export default ShowCard;

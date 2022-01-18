import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "../shows/ShowCard.css";

//Admin home page

function AdminHomePage(){
    const { currentUser } = useContext(UserContext);

    return (
        <div className="AdminHomepage">
          <div className="showcard">
          <h3>Admin Home</h3>
          <p>
          <div className="showcardheaderred">{currentUser.username}</div><br/>
          <Link className="showcardlink" to="/editmembers">View &amp; Edit Members</Link><br/><br/>
          <div className="showcardsmalltext">View and edit member info, including name, email, and DJ/Admin status.</div><br/><br/>
          <Link className="showcardlink" to="/editplaylists">View &amp; Edit Playlists</Link><br/><br/>
          <div className="showcardsmalltext">View info for all playlists including date recorded, and show and host name. Delete playlists.</div><br/><br/>
          <Link className="showcardlink" to="/editshows">View &amp; Edit Shows</Link><br/><br/>
          <div className="showcardsmalltext">View info for all shows including host and airtime. Edit show info and delete shows.</div><br/><br/>
          
  
          </p>
        </div>
        </div>
    );
}

export default AdminHomePage;
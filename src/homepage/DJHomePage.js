import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import HOSApi from "../api/api";
import UserContext from "../auth/UserContext";
import "../shows/ShowCard.css";

//DJ home page

function DJHomePage(){
    const { currentUser } = useContext(UserContext);

    return (
        <div className="Homepage">
          <div className="showcard">
          <h3>DJ Home</h3>
          <p>
          <div className="showcardheaderred">{currentUser.username}</div><br/>
          <Link className="showcardlink" to="/newplaylist">Create New Playlist</Link><br/><br/>
          <div className="showcardsmalltext">Create a new playlist for your show. Only available on the day your show is recorded.</div><br/><br/>
          <Link className="showcardlink" to={`/editshow/${currentUser.showID}`}>Edit Playlists</Link><br/><br/>
          <div className="showcardsmalltext">Add or remove songs from your playlists.</div><br/><br/>
          <Link className="showcardlink" to={`/editshow/profile/${currentUser.showID}`}>Edit Profile</Link><br/><br/>
          <div className="showcardsmalltext">Edit your show's profile, including the name, description, and your DJ name.</div><br/><br/>
  
          </p>
        </div>
        </div>
    );
}

export default DJHomePage;
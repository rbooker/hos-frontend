import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import HOSApi from "../api/api";
import ShowCard from "./ShowCard";
import LoadingSpinner from "../common/LoadingSpinner";
import "./ShowList.css";
import "./ShowCard.css";

function EditPlaylistMenu() {
    console.debug("ShowProfile");
    
    const { showid } = useParams();

    //The array that holds all the JSX for the calendar
    let playlistLinks = [];

    //Coverts dates from numbers to words
    const dateConverter = {0:"Sunday", 1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday", 7:"Sunday"};
  
    const [showdata, setShowData] = useState(null);
  
    useEffect(function getShowDataOnMount() {
      console.debug("ShowProfile useEffect getShowDataOnMount");
      search();
    }, []);
  
    /** Triggered by search form submit; reloads companies. */
    async function search() {
      let showInfo = await HOSApi.getShowByID(+showid);
      setShowData(showInfo);
    }
  
    if (!showdata) return <LoadingSpinner />;
    
    //If there are any playlists associated with the show, create a list of them - I wish I could just do it with a 
    //map statement, but there's stuff related to formatting the date that prevents me from doing it.
    if(showdata.playlists){
        for(let i = 0; i < showdata.playlists.length; i++){
            const playlistURL = `/editshow/${showid}/playlistinfo/${showdata.playlists[i].id}`;
            const d = new Date(showdata.playlists[i].date);
            playlistLinks.push(<div><h5>{d.toDateString().slice(4)}</h5>{showdata.playlists[i].description}<br/><br/><Link className="showcardlink" to={playlistURL}>Edit Playlist</Link><br/><br/></div>);
        }
    }

    //A little bit of slice 'n' dice to make sure the show time displays in 12hr mode, e.g. 10:00 PM rather than 22:00:00
    const showHour = +showdata.showTime.slice(0,2);
    const suffix = showHour >= 12 ? "PM":"AM"; 
    const niceShowTime = ((showHour + 11) % 12 + 1) + showdata.showTime.slice(2,5) + " " + suffix;
    
    return (
        <div className="showcard">
        <h3>Edit Playlist: {showdata.showName}</h3>
        
        <p>
          <img src={showdata.imgURL} alt="Show image"/>
            <div className="showcardheaderred">Playlists</div>
            <div className="showcardtext">{playlistLinks}</div>
        </p>
        </div>
      );
}

export default EditPlaylistMenu;
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import HOSApi from "../api/api";
import UserContext from "../auth/UserContext";
import ShowCard from "./ShowCard";
import LoadingSpinner from "../common/LoadingSpinner";
import "./ShowList.css";
import "./ShowCard.css";
import "./ShowPlaylist.css";

//Displays a given playlist for a show

function ShowPlaylist() {
    console.debug("ShowProfile");
    
    const { currentUser } = useContext(UserContext);
    const { showid, playlistid } = useParams();

    
    const [playlistdata, setPlaylistData] = useState(null);
    const [showdata, setShowData] = useState(null);
  
    useEffect(function getPlaylistDataOnMount() {
      console.debug("ShowProfile useEffect getShowDataOnMount");
      playlistQuery();
    }, []);

    useEffect(function getShowDataOnMount() {
        console.debug("ShowProfile useEffect getShowDataOnMount");
        showQuery();
      }, []);
  
    /** Load the playlist */
    async function playlistQuery() {
      let playlistQueryResult = await HOSApi.getPlaylistByID(+playlistid);
      setPlaylistData(playlistQueryResult.songs);
    }

    async function showQuery() {
        let showQueryResult = await HOSApi.getShowByID(+showid);
        setShowData(showQueryResult);
    }
    console.log(playlistdata);
    
    if (!playlistdata || !showdata) return <LoadingSpinner />;
    
    let playlistTable = playlistdata.map(t => (<tr><td>{t.artist}</td><td>{t.title}</td><td>{t.album}</td></tr>));
    
    let playlistInfo = showdata.playlists.filter(p => p.id === +playlistid)[0];
    const d = new Date(playlistInfo.date);

    return (
        <div className="showcard">
        <h3>Playlist for {showdata.showName}</h3>
        
        <p>
          <div className="showcardheaderred">{d.toDateString().slice(4)}</div>
          <table><tr><th>Artist</th><th>Title</th><th>Album</th></tr>{playlistTable}</table>
          <br/>
          <div className="showcardheaderred">Description</div>
          {playlistInfo.description}
          <br/>
          {currentUser && currentUser.donated ? <div className="playbutton">Listen</div> :<div><div className="disabledplaybutton">Listen</div><br />You must be logged in as a member who has made a donation to listen to this episode.</div>}
        </p>
        </div>
      );
}

export default ShowPlaylist;
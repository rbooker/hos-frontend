import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HOSApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import "./ShowList.css";
import "./ShowCard.css";
import "./ShowPlaylist.css";

//Allows for the editing (e.g. removing) of playlists
function EditPlaylists() {
    console.debug("ShowProfile");
    
    const [playlistdata, setPlaylistData] = useState(null);
  
    useEffect(function getPlaylistDataOnMount() {
      console.debug("ShowProfile useEffect getShowDataOnMount");
      playlistQuery();
    }, []);

    //Loads all playlists - called on load, and again every time a playlist is removed
    async function playlistQuery() {
      let playlistQueryResult = await HOSApi.getAllPlaylists();
      setPlaylistData(playlistQueryResult);
    }
    
    if (!playlistdata) return <LoadingSpinner />;
    
    async function removePlaylist(evt){
        const playlistTargeted = evt.target;
        let deleteQueryResult = await HOSApi.deletePlaylist(+playlistTargeted.dataset.playlistid);
        playlistQuery();
      }

    //JSX playlist table
    let playlistTable = playlistdata.map(p => (<tr key={+p.playlistID}><td>{p.playlistID}</td><td>{p.date.slice(0,10)}</td><td>{p.show_name}</td><td className="tdcenter"><Link to={`/show/${p.showID}/playlist/${p.playlistID}`} className="tablelink">View Playlist</Link></td><td className="tdcenter"><i data-playlistid={p.playlistID} onClick={removePlaylist} className="bi-trash trashicon"></i></td></tr>));
    
    return (
        <div className="showcard">
        <h3>View &amp; Edit Playlists</h3>
        
        <p>
          <div className="showcardheaderred">Playlists</div>
          {playlistTable.length > 0 ? <table><tr><th>Playlist ID</th><th>Playlist Date</th><th>Show Name</th><th>Link to Playlist</th><th><i className="bi-trash-fill trashiconheader"></i></th></tr>{playlistTable}</table> : <h4>No playlists</h4>}
          
        </p>
        </div>
      );
}

export default EditPlaylists;
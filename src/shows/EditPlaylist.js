import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "../common/Alert";
import HOSApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import useTimedMessage from "../hooks/useTimedMessage.js";
import "./ShowList.css";
import "./ShowCard.css";
import "./ShowPlaylist.css";

//Allow DJ members to edit playlists

function EditPlaylist() {
    console.debug("ShowProfile");
    
    const { showid, playlistid } = useParams();

    
    const [playlistdata, setPlaylistData] = useState(null);
    const [showdata, setShowData] = useState(null);
    const [formData, setFormData] = useState({
      artist: "",
      title: "",
      album: "",

    });
   
    const [saveConfirmed, setSaveConfirmed] = useTimedMessage();
    const [formErrors, setFormErrors]  = useTimedMessage();
  
    useEffect(function getPlaylistDataOnMount() {
      console.debug("ShowProfile useEffect getShowDataOnMount");
      playlistQuery();
    }, []);

    useEffect(function getShowDataOnMount() {
        console.debug("ShowProfile useEffect getShowDataOnMount");
        showQuery();
      }, []);
  
    //Used on load and also every time a song is added/removed
    async function playlistQuery() {
      let playlistQueryResult = await HOSApi.getPlaylistByID(+playlistid);
      setPlaylistData(playlistQueryResult.songs);
    }

    async function showQuery() {
        let showQueryResult = await HOSApi.getShowByID(+showid);
        setShowData(showQueryResult);
    }
    
    if (!playlistdata || !showdata) return <LoadingSpinner />;
    
    //Remove song and reload the playlist
    async function removeSong(evt){
        const songTargeted = evt.target;
        let deleteQueryResult = await HOSApi.deleteSong({"playlistID": +playlistid, "songID": +songTargeted.dataset.songid, "songOrder": +songTargeted.dataset.order});
        playlistQuery();
      }

      async function handleSubmit(evt) {
        evt.preventDefault();
    
        let songData = {
          playlistID: +playlistid,
          artist: formData.artist,
          title: formData.title,
          album: formData.album,
        };

        let newSong;
    
        try {
          newSong = await HOSApi.addNewSong(songData);
        } catch (errors) {
          debugger;
          setFormErrors(errors);
          return;
        }
    
        setFormData({
          artist: "",
          title: "",
          album: "",
    
        });
        setFormErrors([]);
        setSaveConfirmed(true);
    
        // trigger reloading of playlist
        playlistQuery();
      }
    
      /** Handle form data changing */
      function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
          ...f,
          [name]: value,
        }));
        setFormErrors([]);
      }
    
    //The table (in JSX) that displays song info
    let playlistTable = playlistdata.map(t => (<tr key={+t.songOrder}><td>{t.artist}</td><td>{t.title}</td><td>{t.album}</td><td><i data-songid={t.songID} data-order={t.songOrder} onClick={removeSong} className="bi-trash trashicon"></i></td></tr>));
    
    //Info (date/time/etc) about the playlist
    let playlistInfo = showdata.playlists.filter(p => p.id === +playlistid)[0];

    //Date object instantiated with the date of the playlist - used to format the date
    const d = new Date(playlistInfo.date);

    return (
        <div className="showcard">
        <h3>Edit Playlist for {showdata.showName}</h3>
        
        <p>
          <div className="showcardheaderred">{d.toDateString().slice(4)}</div>
          {playlistTable.length > 0 ? <table><tr><th>Artist</th><th>Title</th><th>Album</th><th><i className="bi-trash-fill trashiconheader"></i></th></tr>{playlistTable}</table> : <h4>No songs on this playlist</h4>}
          <br/>
          <form className="showcardform">
              <div className="showcardheaderred">Add Song</div>
              
              <div className="form-group">
                <label>Artist</label>
                <input
                    name="artist"
                    className="form-control"
                    value={formData.artist}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Album</label>
                <input
                    name="album"
                    className="form-control"
                    value={formData.album}
                    onChange={handleChange}
                />
              </div>

              {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Song added successfully."]} />
                  : null}

              <button
                  className="btn btn-secondary"
                  onClick={handleSubmit}
              >
                Add Song
              </button>
            </form>
        </p>
        </div>
      );
}

export default EditPlaylist;
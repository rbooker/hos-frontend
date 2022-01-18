import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HOSApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import "./ShowList.css";
import "./ShowCard.css";
import "./ShowPlaylist.css";

//Allows admins to edit shows

function EditShows() {
    console.debug("ShowProfile");
    
    const [showdata, setShowData] = useState(null);
  
    useEffect(function getShowDataOnMount() {
      console.debug("ShowProfile useEffect getShowDataOnMount");
      showQuery();
    }, []);

    async function showQuery() {
      let showQueryResult = await HOSApi.getShowsForDay();
      setShowData(showQueryResult);
    }
    
    if (!showdata) return <LoadingSpinner />;
    
    //Remove a show
    async function removeShow(evt){
        const showTargeted = evt.target;
        let deleteQueryResult = await HOSApi.deleteShow(+showTargeted.dataset.showid);
        showQuery();
      }

    //JSX table of shows
    let showTable = showdata.map(s => (<tr key={+s.id}><td>{s.id}</td><td>{s.showName}</td><td>{s.djName}</td><td>{s.dayOfWeek}</td><td>{s.showTime}</td><td><Link to={`/show/${s.id}`} className="tablelink">View Show Page</Link></td><td><i data-showid={s.id} onClick={removeShow} className="bi-trash trashicon"></i></td></tr>));
    
    return (
        <div className="showcard">
        <h3>View &amp; Edit Shows</h3>
        
        <p>
          <div className="showcardheaderred">Show List</div>
          {showTable.length > 0 ? <table><tr><th>Show ID</th><th>Show Name</th><th>DJ Name</th><th>Day of Week</th><th>Show Time</th><th>Link to Show</th><th><i className="bi-trash-fill trashiconheader"></i></th></tr>{showTable}</table> : <h4>No shows</h4>}
          
        </p>
        </div>
      );
}

export default EditShows;
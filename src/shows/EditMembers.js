import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from "../common/Alert";
import HOSApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import useTimedMessage from "../hooks/useTimedMessage.js";
import "./ShowList.css";
import "./ShowCard.css";
import "./ShowPlaylist.css";

//Edit members
function EditMembers() {
    console.debug("ShowProfile");
    
    const [memberdata, setMemberData] = useState(null);
  
    useEffect(function getMemberDataOnMount() {
      console.debug("ShowProfile useEffect getShowDataOnMount");
      memberQuery();
    }, []);

    async function memberQuery() {
      let memberQueryResult = await HOSApi.getAllUsers();
      setMemberData(memberQueryResult);
    }
    
    if (!memberdata) return <LoadingSpinner />;
    
    async function removeMember(evt){
        const memberTargeted = evt.target;
        let deleteQueryResult = await HOSApi.deleteUser(memberTargeted.dataset.username);
        memberQuery();
      }

    let memberTable = memberdata.map(m => (<tr key={+m.id}><td>{m.username}</td><td>{m.firstName}</td><td>{m.lastName}</td><td><Link to={`/editmember/${m.username}`} className="tablelink">Edit</Link></td><td><i data-username={m.username} onClick={removeMember} className="bi-trash trashicon"></i></td></tr>));
    
    return (
        <div className="showcard">
        <h3>View &amp; Edit Members</h3>
        
        <p>
          <div className="showcardheaderred">Member List</div>
          {memberTable.length > 0 ? <table><tr><th>Username</th><th>First Name</th><th>Last Name</th><th>&nbsp;Edit&nbsp;</th><th><i className="bi-trash-fill trashiconheader"></i></th></tr>{memberTable}</table> : <h4>No members</h4>}
          
        </p>
        </div>
      );
}

export default EditMembers;
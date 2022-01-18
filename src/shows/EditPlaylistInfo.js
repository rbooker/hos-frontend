import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../common/Alert";
import HOSApi from "../api/api";
import UserContext from "../auth/UserContext";
import "../shows/ShowCard.css";
import useTimedMessage from "../hooks/useTimedMessage";

/** Playlist editing form.
 *
 * Allows editing of basic info about playlist, e.g. description/date
 */

function EditPlaylistInfo() {
  const { currentUser } = useContext(UserContext);
  const { showid, playlistid } = useParams();
  const [playlistDate, setPlaylistDate] = useState(null);
  const [formData, setFormData] = useState({
    description: ""
  });
  const [formErrors, setFormErrors] = useTimedMessage();

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useTimedMessage();
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
      "ProfileForm",
      "currentUser=", currentUser,
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );

  useEffect(function checkForExistingPlaylistOnMount() {
    console.debug("ShowList useEffect getCompaniesOnMount");
    playlistQuery();
  }, []);

  /** Function for determining if a new playlist should exist*/
  async function playlistQuery() {
    
    let playlistQueryResult = await HOSApi.getPlaylistByID(+playlistid);
    setFormData({description: `${playlistQueryResult.description}`});
    setPlaylistDate(playlistQueryResult.date);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    let playlistData = {
      description: `${formData.description}`,
    };

    let updatedPlaylistInfo;

    try {
      updatedPlaylistInfo = await HOSApi.editDetailsForPlaylist(+playlistid, playlistData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f}));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
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

  
  const d = new Date(playlistDate);
  return (
    <div className="updatePlaylist">
      <div className="showcard">
        <h3>Update Show Info</h3>
      <p>
        <div className="showcardform">
          <form>
              <div className="showcardheaderred">{d.toDateString().slice(4)}</div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
              />
            </div>

            {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null}

            {saveConfirmed
                ?
                <Alert type="success" messages={["Updated successfully."]} />
                : null}

            <button
                className="btn btn-secondary"
                onClick={handleSubmit}
            >
              Submit Changes
            </button>
          </form>
          </div>
          <br />
          <br />
          <Link className="showcardlink" to={`/editshow/${showid}/playlist/${playlistid}`}>Add &amp; Remove Songs</Link>
        </p>
      </div>
    </div>
);
}

export default EditPlaylistInfo;
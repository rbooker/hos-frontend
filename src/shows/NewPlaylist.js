import React, { useState, useContext, useEffect } from "react";
import Alert from "../common/Alert";
import HOSApi from "../api/api";
import UserContext from "../auth/UserContext";
import "../shows/ShowCard.css";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

/** 
 * Create a new playlist, for DJs
 */

function NewPlaylist() {
  const { currentUser } = useContext(UserContext);
  const [createShow, setCreateShow] = useState(null);
  const [formData, setFormData] = useState({
    description: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
      "ProfileForm",
      "currentUser=", currentUser,
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );

  const d = new Date();

  useEffect(function checkForExistingPlaylistOnMount() {
    console.debug("ShowList useEffect getCompaniesOnMount");
    playlistQuery();
  }, []);

  /** Function for determining if a new playlist should exist*/
  async function playlistQuery() {
    
    //Temp variables to store queries
    let showID;
    let showPlaylists;
    let latestShow;

    let djInfoQuery = await HOSApi.getCurrentUser(currentUser.username);

    //If the DJ wanting to create the show exists, get their showID
    if(djInfoQuery)
        showID = djInfoQuery.showID;
    
    //Then get their show info, including the most recent playlists
    let showInfoQuery = await HOSApi.getShowByID(+showID);
    if(showInfoQuery)
        showPlaylists = showInfoQuery.playlists;
    if(showPlaylists.length > 0)
        latestShow = showPlaylists[0].date;
    //The truth value of the show existing is determined by 
    //a) whether it's the day of the week the show is on (can't create a Sunday show on Wednesday, for example)
    //b) whether a show already exists for that date
    const showShouldExist = (d.getDay() === +showInfoQuery.dayOfWeek) && (d.toJSON().slice(0,10) !== latestShow.slice(0,10));
    
    setCreateShow(showShouldExist);
  }
  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      date: `${d.toJSON().slice(0,10)}`,
      description: `${formData.description}`,
      memberID: currentUser.id,
    };

    let newShow;

    try {
      newShow = await HOSApi.createNewPlaylist(profileData);
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
/**/
  if (createShow)
  return (
    <div className="newPlaylist">
      <div className="showcard">
        <h3>New Show</h3>
      <p>
        <div className="showcardform">
          <form>
              <div className="showcardheaderred">{d.toJSON().slice(0,10)}</div>
            
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
              CreatePlaylist
            </button>
          </form>
          </div>
        </p>
      </div>
    </div>
);
  else
    return (<div className="newPlaylist">
              <div className="showcard">
                <h3>New Show</h3>
                <p>No playlist was created. This is because:<br/><br/>
                <ul><li>It's not the day of the week for your show&nbsp;&nbsp;OR</li>
                <li>A playlist already exists for your show for this day</li></ul>
                </p>
              </div>
            </div>);
    
}

export default NewPlaylist;
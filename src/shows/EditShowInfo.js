import React, { useState, useEffect, useContext } from "react";
import Alert from "../common/Alert";
import HOSApi from "../api/api";
import UserContext from "../auth/UserContext";
import { useParams, Link } from "react-router-dom";
import "../shows/ShowCard.css";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

//Edit info about a show

function EditShowInfo() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { showid } = useParams();
  const [formData, setFormData] = useState({
    djName: "",
    showName: "",
    description: "",
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

  useEffect(function getShowDataOnMount() {
    console.debug("ShowProfile useEffect getShowDataOnMount");
    showQuery();
  }, []);

  async function showQuery() {
    let showQueryResult = await HOSApi.getShowByID(+showid);
    setFormData({djName: `${showQueryResult.djName}`,
                 showName: `${showQueryResult.showName}`,
                 description: `${showQueryResult.description}`});
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

    let showData = {
      djName: formData.djName,
      showName: formData.showName,
      description: formData.description,
    };
;
    let updatedShow;

    try {
      updatedShow = await HOSApi.editDetailsForShow(+showid, showData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f,}));
    setFormErrors([]);
    setSaveConfirmed(true);
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

  return (
      <div className="showUpdate">
        <div className="showcard">
          <h3>Update Profile</h3>
        <p>
          <div className="showcardform">
            <form>
                <div className="showcardheaderred">{currentUser.username}</div>
              
              <div className="form-group">
                <label>DJ Name</label>
                <input
                    name="djName"
                    className="form-control"
                    value={formData.djName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Show Name</label>
                <input
                    name="showName"
                    className="form-control"
                    value={formData.showName}
                    onChange={handleChange}
                />
              </div>
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
                Update Info
              </button>
            </form>
            </div>
          </p>
        </div>
      </div>
  );
}

export default EditShowInfo;

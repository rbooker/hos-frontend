import React, { useState, useEffect, useContext } from "react";
import Alert from "../common/Alert";
import { useParams } from "react-router-dom";
import HOSApi from "../api/api";
import UserContext from "../auth/UserContext";
import "../shows/ShowCard.css";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function EditMember() {
    
    const { username } = useParams();

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      isDJ: false,
      isAdmin: false,
    });

    useEffect(function getMemberDataOnMount() {
        console.debug("ShowProfile useEffect getShowDataOnMount");
        memberQuery();
        
      }, []);
  
      async function memberQuery() {
        let memberData = await HOSApi.getCurrentUser(username);
      
        setFormData({
          firstName: memberData.firstName,
          lastName: memberData.lastName,
          email: memberData.email,
          isDJ: memberData.isDJ,
          isAdmin: memberData.isAdmin,
        });
      }

    
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

   console.debug(
      "ProfileForm",
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );

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
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      isDJ: formData.isDJ,
      isAdmin: formData.isAdmin
    };

    let updatedUser;

    try {
      updatedUser = await HOSApi.saveProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const target = evt.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <div className="memberUpdate">
        <div className="showcard">
          <h3>Update Profile</h3>
        <p>
          <div className="showcardform">
            <form>
                <div className="showcardheaderred">{username}</div>
              
              <div className="form-group">
                <label>First Name</label>
                <input
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                />
              </div>
              <div className="form-check">
                <input name="isDJ" className="form-check-input" type="checkbox" id="djcheckbox" checked={formData.isDJ} onChange={handleChange}/>
                <label className="form-check-label" for="djcheckbox">
                 Is DJ
                </label>
                </div>
                <br/>
                <div className="form-check">
                <input name="isAdmin" className="form-check-input" type="checkbox" id="admincheckbox" checked={formData.isAdmin} onChange={handleChange}/>
                <label className="form-check-label" for="admincheckbox">
                 Is Admin
                </label>
                </div>
                <br/>
            

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
                Save Changes
              </button>
            </form>
            </div>
          </p>
        </div>
      </div>
  );
}

export default EditMember;
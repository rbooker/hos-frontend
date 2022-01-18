import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";
import "../shows/ShowCard.css";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }
/**<div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4"> <div className="card">
            <div className="card-body"> */
  return (
      <div className="SignupForm">
        <div className="showcard">
          <h3>Join House of Sound!</h3>
          <p><div className="showcardtext">Joining House of Sound as a member is completely free, and includes a number of benefits, such as a personalized homepage that includes the most recently recorded episodes of your favorite shows,
          discounted admission to HoS-sponsored events, and a subscription to our weekly member newsletter (which you can always opt out of).
            You also, with an optional, tax-deductible donation, receive access to our extensive show archives, and become eligible to purchase member-exclusive merchandise designed (and in some cases hand-made) by our DJs.<br/><br/>So what are you
            waiting for? Just fill out the form below and away you go!<br/></div>
            <div className="showcardheaderred">Signup Form</div> 
        <div className="showcardform">
          
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>First name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
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
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
                    className="btn btn-secondary"
                    onSubmit={handleSubmit}
                >
                  <strong>Submit</strong>
                </button>
              </form>
        </div>
        </p>
        </div>
      </div>
  );
}

export default SignupForm;
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
          <li className="nav-item">
            <Link className="navbarlink loginlogoutbutton" to="/" onClick={logout}>
              Logout
            </Link>
          </li>
    );
  }

  function loggedinDJ() {
    return (
      <li><NavLink className="navbarlink" to="/djhome">DJ</NavLink></li>
    )
  }
  function loggedInAdmin() {
    return (
      <li><NavLink className="navbarlink" to="/adminhome">Admin</NavLink></li>
    )
  }

  function loggedOutNav() {
    return (
            <li>
            <NavLink className="navbarlink loginlogoutbutton" to="/login">
              Login
            </NavLink>
            </li>
    );  
  }

  return (
      <nav>
        <ul>
          <li>
            <NavLink className="navbarlink" to="/schedule">
              Schedule
            </NavLink>
          </li>
          <li>
            <NavLink className="navbarlink" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="navbarlink" to="/signup">
              Membership
            </NavLink>
          </li>
          <li>
            <NavLink className="navbarlink" to="/donate">
              Donate
            </NavLink>
          </li>
            {currentUser ? loggedInNav() : loggedOutNav()}
            {(currentUser && currentUser.isDJ) ? loggedinDJ() : <li>&nbsp;</li>}
            {(currentUser && currentUser.isAdmin) ? loggedInAdmin() : <li>&nbsp;</li>}
        </ul>
        
      </nav>
  );
}

export default Navigation;

//{currentUser ? loggedInNav() : loggedOutNav()}
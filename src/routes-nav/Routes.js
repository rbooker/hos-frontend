import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Homepage from "../homepage/Homepage";
import ShowList from "../shows/ShowList";
import ShowPlaylist from "../shows/ShowPlaylist";
import ShowProfile from "../shows/ShowProfile";
import ShowCalendar from "../shows/ShowCalendar";
import EditPlaylistMenu from "../shows/EditPlaylistMenu";
import EditPlaylistInfo from "../shows/EditPlaylistInfo";
import EditPlaylist from "../shows/EditPlaylist";
import EditShowInfo from "../shows/EditShowInfo";
import EditMembers from "../shows/EditMembers";
import EditMember from "../shows/EditMember";
import EditPlaylists from "../shows/EditPlaylists";
import EditShows from "../shows/EditShows";
import About from "../shows/About";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import NewPlaylist from "../shows/NewPlaylist";
import DJHomePage from "../homepage/DJHomePage";
import AdminHomePage from "../homepage/AdminHomePage";
import PrivateRoute from "./PrivateRoute";
import DJRoute from "./DJRoute";
import AdminRoute from "./AdminRoute";
import NotFound from "./NotFound";
import Payment from "../shows/Payment";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );
  const { currentUser } = useContext(UserContext);
//the "/" route was originally <Homepage />
  return (
      <div className="pt-5">
        <Switch>
          { /* ------- Primary Routes --------- */ }
          <Route exact path="/">
            {currentUser ? <Homepage /> : <ShowList /> }
          </Route>

          <Route exact path="/schedule">
            <ShowCalendar />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>

          <Route exact path="/donate">
            <Payment />
          </Route>

          <Route exact path="/show/:showid">
            <ShowProfile />  
          </Route>

          <Route exact path="/show/:showid/playlist/:playlistid">
            <ShowPlaylist />  
          </Route>

          <PrivateRoute exact path="/memberupdate">
            <ProfileForm />
          </PrivateRoute>

          <DJRoute exact path="/djhome">
            <DJHomePage />
          </DJRoute>

          <DJRoute exact path="/newplaylist">
            <NewPlaylist />
          </DJRoute>

          <DJRoute exact path="/editshow/:showid">
            <EditPlaylistMenu />  
          </DJRoute>
          
          <DJRoute exact path="/editshow/:showid/playlistinfo/:playlistid">
            <EditPlaylistInfo />  
          </DJRoute>
          
          <DJRoute exact path="/editshow/:showid/playlist/:playlistid">
            <EditPlaylist />  
          </DJRoute>

          <DJRoute exact path="/editshow/profile/:showid">
            <EditShowInfo />
          </DJRoute>

          <AdminRoute exact path="/adminhome">
            <AdminHomePage />
          </AdminRoute>

          <AdminRoute exact path="/editmembers">
            <EditMembers />
          </AdminRoute>

          <AdminRoute exact path="/editmember/:username">
            <EditMember />
          </AdminRoute>

          <AdminRoute exact path="/editplaylists">
            <EditPlaylists />
          </AdminRoute>

          <AdminRoute exact path="/editshows">
            <EditShows />
          </AdminRoute>

          <Route exact path="/notfound">
            <NotFound />
          </Route>

          <Redirect to="/notfound" />
        </Switch>
      </div>
  );
}

export default Routes;

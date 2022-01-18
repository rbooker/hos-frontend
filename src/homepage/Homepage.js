import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import HOSApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import "../shows/ShowCard.css";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  const [favorites, setFavorites] = useState([]);

  let favoritePlaylistJSX = [];

  useEffect(function getFavoritesOnMount() {
    console.debug("Homepage useEffect getFavoritesOnMount");
    favoriteQuery();
  }, []);

  async function favoriteQuery() {
    let favoritesQueryResult = await HOSApi.getFavoritesByUserID(currentUser.id);
    let favoriteShows = [];
    for(let i = 0; i < favoritesQueryResult.length; i++){
      let showQueryResult = await HOSApi.getShowByID(favoritesQueryResult[i].showID);
      favoriteShows.push(showQueryResult);
    }
    setFavorites(favoriteShows);
  }

  //You have to do this because otherwise you can't look at the length of an array stored in state
  const favoriteshows = favorites;

  if(favoriteshows.length == 0)
    favoritePlaylistJSX.push(<div><h5>You have no favorite shows. What a dilettante!</h5></div>);
  
  else{
    
    for (let i = 0; i < favoriteshows.length; i++){
      
      favoritePlaylistJSX.push(<div><h5>{favoriteshows[i].showName}</h5></div>);
      
      if(favoriteshows[i].playlists.length == 0)
        favoritePlaylistJSX.push(<div>This show has no playlists. Weird.</div>);
      else{
        const playlistURL = `/show/${favoriteshows[i].id}/playlist/${favoriteshows[i].playlists[0].id}`;
        const d = new Date(favoriteshows[i].playlists[0].date);

        favoritePlaylistJSX.push(<div><h5>{d.toDateString().slice(4)}</h5>{favoriteshows[i].playlists[0].description}<br/><br/><Link className="showcardlink" to={playlistURL}>View Playlist &amp; Listen</Link><br/><br/><br /></div>)
      }
    }

  }
  return (
      <div className="Homepage">
        <div className="showcard">
        <h3>Member Home</h3>
        <p>
        <div className="showcardheaderred">{currentUser.firstName}</div>
        <h4>The most recent playlists from your favorite shows</h4>
        <div>{favoritePlaylistJSX}</div>
        <br/><br/>
        <Link className="showcardlink" to="/memberupdate">Update Profile</Link>
        

        </p>
      </div>
      </div>
  );
}

export default Homepage;

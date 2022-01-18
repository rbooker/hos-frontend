import React, { useState, useEffect, useContext} from "react";
import HOSApi from "../api/api";
import UserContext from "../auth/UserContext";
import "./Favorite.css";

//Favorite - allows a user to click on the heart icon in a show profile to make that show their "favorite"
function Favorite({ showID, favoriteIDs }) {
  
    const { currentUser } = useContext(UserContext);
    const [favorite, setFavorite] = useState(null);
    let favoritesAddResult;
    let favoritesDeleteResult;

    //Query the DB for favorites on load
    useEffect(function getFavoriteOnMount() {
        console.debug("ShowList useEffect getCompaniesOnMount");
        favoriteQuery();
      }, []);
      
      //Checks to see if the show this Favorite object corresponds to has been "favorited"
      //by the user. If it is, the "favorite" state is set to true.
      async function favoriteQuery() {
        const userFavoritesQuery = await HOSApi.getFavoritesByUserID(currentUser.id);
        let userFavoritesIDs;

        if (userFavoritesQuery.length > 0)
            userFavoritesIDs = userFavoritesQuery.map(f => f.showID);
        else
            userFavoritesIDs = [];

        setFavorite(userFavoritesIDs.includes(showID));
      }
    
    //Toggles the show as either favorited or un-favorited
    async function favoriteToggle() {
        
        const favoriteData = {"username": currentUser.username, "memberID": currentUser.id, "showID": showID}

        if(favorite){
            setFavorite(f => !f);
            favoritesDeleteResult = await HOSApi.removeFavorite(favoriteData);
        }
        else{
            favoritesAddResult = await HOSApi.addFavorite(favoriteData);
            setFavorite(f => !f);
            console.log("added a favorite");
        }
    }
  
    //Returns a heart shape that is filled in if the show has been favorited, empty if not.
    return (
        <div className="Favorite">
            {favorite ? <i onClick={favoriteToggle} className="bi-heart-fill" ></i>
                      : <i onClick={favoriteToggle} className="bi-heart"></i>}
        </div>
    );
  }
  
  export default Favorite;
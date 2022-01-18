import React, { useState, useEffect, useContext } from "react";
import HOSApi from "../api/api";
import ShowCard from "./ShowCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import "./ShowList.css";

/** Show page with list of shows.
 *
 * On mount, loads shows from API.
 */ 

function ShowList() {
  console.debug("CompanyList");

  const dateObj = new Date;
  

  const [shows, setShows] = useState(null);
  

  useEffect(function getShowsOnMount() {
    console.debug("ShowList useEffect getShowsOnMount");
    getShows();
  }, []);

  async function getShows() {
    let showsForDay = await HOSApi.getShowsForDay(dateObj.getDay());
    setShows(showsForDay);
  }

  

  if (!shows) return <LoadingSpinner />;

  console.log(shows);
  return (
    <><div className="showcardheader">Today's Programming</div>
      <div>
        {shows.length
            ? (
              <div>
            {shows.map(s => (
              <ShowCard
                key={s.showName}
                showID={s.id}
                showName={s.showName}
                djName={s.djName}
                showTime={s.showTime}
                description={s.description}
                imgURL={s.imgURL}
                 />
            ))}
          </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div></>
  );
}

export default ShowList;

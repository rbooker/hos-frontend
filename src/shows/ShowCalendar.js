import React, { useState, useEffect, useContext } from "react";
import HOSApi from "../api/api";
import ShowCard from "./ShowCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import "./ShowList.css";
import "./ShowCard.css";

function ShowCalendar() {
    console.debug("CompanyList");

    const { currentUser } = useContext(UserContext);
    
    //The array that holds all the JSX for the calendar
    let jsxCalendar = [];

    let userFavoritesIDs = [];

    //Coverts dates from numbers to words
    const dateConverter = {0:"Sunday", 1:"Monday", 2:"Tuesday", 3:"Wednesday", 4:"Thursday", 5:"Friday", 6:"Saturday", 7:"Sunday"};
  
    const [shows, setShows] = useState(null);
  
    useEffect(function getCompaniesOnMount() {
      console.debug("ShowList useEffect getCompaniesOnMount");
      search();
    }, []);
  
    /** Triggered by search form submit; reloads companies. */
    async function search() {
      let showsForDay = await HOSApi.getShowsForDay();
      setShows(showsForDay);
    }

    if (!shows) return <LoadingSpinner />;

    for (let i = 0; i < 7; i++){
        const showsByDay = shows.filter(s => s.dayOfWeek == i);
        if (showsByDay.length !== 0){
            jsxCalendar.push(<div className="showcardheader">{dateConverter[i]}</div>);
            jsxCalendar.push (<div>{showsByDay.map(s => (
                <ShowCard
                  key={s.id}
                  showID = {s.id}
                  showName={s.showName}
                  djName={s.djName}
                  showTime={s.showTime}
                  description={s.description}
                  imgURL={s.imgURL}
                   />))}</div>)
        
            }
    }


    console.log(jsxCalendar);
    return(<div>{jsxCalendar}</div>);
}
//isFavorite = {favoriteShowIDs.includes(s.id)}
export default ShowCalendar;
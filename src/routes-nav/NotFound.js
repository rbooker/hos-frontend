import React from "react";
import "../shows/ShowCard.css";

/** The 404 page for the site */
function NotFound(){
return (
    <div className="AboutPage">
      <div className="showcard">
        <h3>Page Not Found</h3>
        <p>
        <div className="showcardheaderred">Sorry...</div>
        The page you're looking for either doesn't exist, or you're not authorized to view it.
        </p>
      </div>
    </div>
);
}

export default NotFound;
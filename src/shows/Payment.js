import React from "react";
import "../shows/ShowCard.css";
import BraintreeDropIn from "../common/BraintreeDropIn";

//About page

function Payment(){
return (
    <div className="AboutPage">
      <div className="showcard">
        <h3>Help Us Out</h3>
        <p>
        <div className="showcardheaderred">Donate</div>
        We live in an era in which possessing a high-quality copy of nearly any song ever recorded costs essentially nothing. Thus, the primary expense involved with being a music fan is no longer in acquisition, but exploration. Today, you don't have to pay an exorbitant sum for a limited-pressing, import single to get that obscure b-side - but how would you have known it existed in the first place, let alone that it was worth finding? That's what we're here for, and why we deserve your help staying afloat.<br />
        <br />
        If you are a member and make a contribution, you'll receive unlimited streaming access to our archives.<br /><br />
        *Note: this is, of course, just for show.<br/><br/> However, if you enter a Braintree-valid phony credit card (ex. 4111 1111 1111 1111 with any future expiration date) you can see the mechanism in action.
        <div className="braintreecontainer"><BraintreeDropIn show={true}/></div>
        </p>
      </div>
    </div>
);
}

export default Payment;
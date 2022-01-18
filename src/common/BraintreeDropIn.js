import React, {useEffect, useState, useContext} from 'react'
import UserContext from "../auth/UserContext";
import '../index.css';
import dropin from "braintree-web-drop-in"
import HOSApi from "../api/api";
import {Button} from "reactstrap";
import Alert from "./Alert";

export default function BraintreeDropIn(props) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { show, onPaymentCompleted } = props;
    const [braintreeInstance, setBraintreeInstance] = useState(undefined)
    const [paymentMade, setPaymentMade] = useState(false);
    let paymentResult;
    let updatedUser;

    useEffect(() => {
        if (show) {
            const initializeBraintree = () => dropin.create({
                // insert your tokenization key or client token here
                authorization: 'sandbox_gp247hym_k9tt6cnqf2c77qj3', 
                container: '#braintree-drop-in-div',
            }, function (error, instance) {
                if (error)
                    console.error(error)
                else
                    setBraintreeInstance(instance);
            });

            if (braintreeInstance) {
                braintreeInstance
                    .teardown()
                    .then(() => {
                        initializeBraintree();
                    });
            } else {
                initializeBraintree();
            }
        }
    }, [show])

    return (
        <div
            style={{display: `${show ? "block" : "none"}`}}
        >
            <div
                id={"braintree-drop-in-div"}
            />
            <br />
            <Button
                className={"braintreePayButton"}
                type="primary"
                disabled={!braintreeInstance}
                onClick={() => {
                    if (braintreeInstance) {
                        braintreeInstance.requestPaymentMethod(
                            async function makePayment(error, payload) {
                                if (error) {
                                    console.error(error);
                                } else {
                                    const paymentMethodNonce = payload.nonce;
                                    console.log("payment method nonce", payload.nonce);

                                    // TODO: use the paymentMethodNonce to
                                    //  call you server and complete the payment here
                                    paymentResult = await HOSApi.makePayment({paymentMethodNonce});
                                    console.log(paymentResult);
                                    if (paymentResult.success){
                                        setPaymentMade(true);
                                        if(currentUser){
                                            updatedUser = await HOSApi.saveProfile(currentUser.username, {donated: true});
                                            setCurrentUser(updatedUser);
                                        }
                                    }
                                    // ...
                                    
                                }
                            });
                            
                        }
                }}
            >
                {
                    "Make Donation"
                }
            </Button>
            
            {paymentMade && currentUser ? <div><br/><Alert type={"success"} messages={["Thank you, member! Enjoy access to our archives"]}/></div> : null}
            {paymentMade && !currentUser ? <div><br/><Alert type={"success"} messages={["Thank you for your donation!"]}/></div> : null }
                                
                            
        </div>
    )
}
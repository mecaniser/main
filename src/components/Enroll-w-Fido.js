import React, { useState, useEffect } from 'react'
import "../App.css";
import ActionButton from "./ActionButton";

const transmitSdk = xmsdk.XmSdk()
const XmUIHandler = new xmui.XmUIHandler()
// import { XmSdk } from "./xmsdk-es6";
// import { XmUIHandler } from "./xmui-es6.js";
// import {WFCustomUIHandler} from "./wf-ui-handler"
// import {MyUIHandler}  from "./myuihndlr"
// const transmitSdk = xmsdk.XmSdk()
// let transmitSdk = {}
const txUserId = "802bd777-5c8d-47f8-add0-c1c508d84911"
const txJourneyPolicyId = "register_fido"
var clientContext = {};
const jpPolicyParams =
{
    "wfSessionId": "3e773ac1-cb1c-484f-a31b-ff9e6e13f0dc",
    "manifestJWT": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4MDJiZDc3Ny01YzhkLTQ3ZjgtYWRkMC1jMWM1MDhkODQ5MTEiLCJpc3MiOiJPMyIsImV4cCI6MTYxMTE2ODExOSwiaWF0IjoxNjEwNTYzMzE5LCJqdGkiOiIzZTc3M2FjMS1jYjFjLTQ4NGYtYTMxYi1mZjllNmUxM2YwZGMifQ.5dlPb9B3gt2X4Q9iHBXjXBCLyuvhrBZ24T4_UlD6G80"
}

// console.log(com.ts.mobile.sdk)
const registerHandler = () => {
    console.log("Register Fido2")
    debugger
    transmitSdk.authenticate(txUserId, txJourneyPolicyId, jpPolicyParams, clientContext)
        .then((autStatus) => {
            console.log(`Example journey ended successfully: ${autStatus}`);
            transmitSdk.logout()
                .then(function (successfulAuth) {
                    console.log("Logout successful!");
                    location.reload();
                })
                .catch(function (error) {
                    displayResponse(error, false);
                });
            // transmitJourneyEnded(clientContext);
        })
        .catch((err) => {
            console.error(`Example journey ended with error: ${err.getMessage()}`);
            // transmitJourneyEnded(clientContext);
            transmitSdk.logout()
                .then(function (successfulAuth) {
                    debugger
                    console.log("Logout successful!");
                    location.reload();
                })
        });

}
const deregisterHandler = () => {
    console.log("Deregister Fido2")
    transmitSdk.authenticate(txUserId, txJourneyPolicyId[2], jpPolicyParams, clientContext)
        .then((results) => {
            console.log(`Example journey ended successfully: ${results}`);
            transmitSdk.logout().then((response) => `Logged out successfully ${response}`)
            // transmitJourneyEnded(clientContext);
        })
        .catch((err) => {
            console.error(`Example journey ended with error: ${err.getMessage()}`);
            // transmitJourneyEnded(clientContext);
        });
}
const EnrollwFido = () => {
    const [msg, setmsg] = useState("")
    useEffect(() => {
        debugger
        // transmitSdk = XmSdk()

        function WFCustomUIHandler() {
            xmui.XmUIHandler.call(this);
        }

        WFCustomUIHandler.prototype = Object.create(xmui.XmUIHandler.prototype);
        WFCustomUIHandler.prototype.constructor = WFCustomUIHandler;
        WFCustomUIHandler.prototype.processJsonData = (jsonData) => Promise.resolve(com.ts.mobile.sdk.JsonDataProcessingResult.create(true));
        WFCustomUIHandler.prototype.handlePolicyRejection = () => Promise.resolve(com.ts.mobile.sdk.ConfirmationInput.create(-1));

        let WfUiHandler = new WFCustomUIHandler()

        const serverUrl = "https://sit-connect.secure.evetest.wellsfargo.com:23611/baa";
        const appId = "olbwebapp";
        let settings = com.ts.mobile.sdk.SDKConnectionSettings.create(serverUrl, appId);
        console.log(com.ts.mobile.sdk)
        transmitSdk.setConnectionSettings(settings);
        // transmitSdk.setUiAssetsDownloadMode(com.ts.mobile.sdk.UIAssetsDownloadMode.Disable)
        // transmitSdk.setUiAssetsDownloadMode(com.ts.mobile.sdk.UIAssetsDownloadMode.DownloadOnInit.Disable);
        transmitSdk.setUiHandler(WfUiHandler);

        transmitSdk.initialize()
            .then((results) => {
                console.log(`Transmit SDK initialized successfully: ${results}`);
                setmsg(`Sdk initialized:  ${results}`)
            })
            .catch((error) => {
                console.error(`Transmit SDK initialization error!: ${error}`);
            });

    }, [])
    // const initSdk = () => {}

    return (
        <div className="enrollwFido">
            <div id="transmitContainer"></div>
            <ActionButton status={msg} actionName="Initialize Sdk... " ></ActionButton>
            <ActionButton actionName="Register Fido2" execute={registerHandler}></ActionButton>
            <ActionButton execute={deregisterHandler} actionName="Deregister Fido2" ></ActionButton>
        </div >
    )
}
export default EnrollwFido
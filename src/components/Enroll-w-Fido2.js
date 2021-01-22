import React, { useEffect, useState } from "react";
import "../App.css";
import ActionButton from "./ActionButton";
var sdk = new xmsdk.XmSdk();
var UiHandler = new xmui.XmUIHandler()

var journeyId = ["register_fido", "deregister_fido", "authenticator_status"];
var paramsInput =
  '{"wfSessionId":"3e773ac1-cb1c-484f-a31b-ff9e6e13f0dd","manifestJWT":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4MDJiZDc3Ny01YzhkLTQ3ZjgtYWRkMC1jMWM1MDhkODQ5MTEiLCJpc3MiOiJPMyIsImV4cCI6MTYxMTc4MTcwMywiaWF0IjoxNjExMTc2OTAzLCJqdGkiOiIzZTc3M2FjMS1jYjFjLTQ4NGYtYTMxYi1mZjllNmUxM2YwZGQifQ.rq8EyRe0CuY_LeZcbc1S4QNg5sKlMf0HlNCgrg4-v60"}';
var params = paramsInput ? JSON.parse(paramsInput) : paramsInput;
var username = "Sergio2";

const EnrollWithFido2 = () => {
  const [msg, setmsg] = useState("");

  useEffect(() => {
    const serverUrl =
      "https://sit-connect.secure.evetest.wellsfargo.com:23611/baa";
    const appId = "olbwebapp";
    let settings = com.ts.mobile.sdk.SDKConnectionSettings.create(
      serverUrl,
      appId
    );
    sdk.setConnectionSettings(settings);
    sdk.setUiAssetsDownloadMode(com.ts.mobile.sdk.UIAssetsDownloadMode.Disable);

    sdk
      .initialize()
      .then((results) => {
        console.log(`Transmit SDK initialized successfully: ${results}`);
        setmsg(`Sdk initialized:  ${results}`);
      })
      .catch((error) => {
        console.error(`Transmit SDK initialization error!: ${error._message}`);
        setmsg(`Sdk initialized with error:  ${error._message}`);
      });
    
    sdk.setUiHandler(UiHandler);
    
  }, []);
 
  const fidoJourney = (journey) => {
    sdk
      .authenticate(username, journey, params, {})
      .then((authStatus) => {
        console.log(
          `${journey} with: ${authStatus._deviceId} and username ${username}`
        );
      })
      .then(() => {
        sdk.logout().then((logOutResponse) => {
          console.log(
            `Session deactivated on ${journey}: ${logOutResponse}`
          );
          setmsg(`${journey} as ${username}`);
        });
      })
      .catch((error) => {
        console.log(`${journey} error: ${error._message}`);
      })
      .catch((error) => console.log(`${journey} error: ${error._message}`));
  };

  const logout = () => {
    sdk
      .logout()
      .then((response) => console.log(`Session deactivated: ${response}`))
      .catch((err) => {
        console.log(`Log out error: ${err._message}`);
      });
  };

  return (
    <>
      <div className="enrollWithFido">
        <div id="transmitContainer">Transmit Container 2</div>
        <div id="msgContainer2">
          <p style={{ color: "green" }}>{msg}</p>
        </div>
        <ActionButton
          actionName="Enrollment status"
          execute={()=> fidoJourney(journeyId[2])}
        ></ActionButton>

        <ActionButton
          actionName="Register Fido2"
          execute={()=> fidoJourney(journeyId[0])}
        ></ActionButton>

        <ActionButton
          actionName="De-Register Fido2"
          execute={()=> fidoJourney(journeyId[1])}
        ></ActionButton>

        <ActionButton execute={logout} actionName="Log Out"></ActionButton>
      </div>
    </>
  );
};

export default EnrollWithFido2;

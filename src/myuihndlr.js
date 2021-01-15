
var myApp = myApp || {};
(function() {
	var sdk = new xmsdk.XmSdk();
	
	function CustomUIHandler() {
		xmui.XmUIHandler.call(this);
	}
	
	CustomUIHandler.prototype = Object.create(xmui.XmUIHandler.prototype);
	CustomUIHandler.prototype.constructor = CustomUIHandler;   

	CustomUIHandler.prototype.processJsonData = function(jsonData) {
    	return Promise.resolve(com.ts.mobile.sdk.JsonDataProcessingResult.create(true));
	}
	
	CustomUIHandler.prototype.handlePolicyRejection = function() {
    	return Promise.resolve(com.ts.mobile.sdk.ConfirmationInput.create(-1));
	}

	var myUIHandler = new CustomUIHandler();
	
    this.initialize = function() {
    	
        var server = document.getElementById('server').value;
        var appId = document.getElementById('appid').value;
        var apiTokenId = "";
        var apiToken = "";

        var connectionSettings = com.ts.mobile.sdk.SDKConnectionSettings.create(server, appId, apiTokenId, apiToken);
        sdk.setConnectionSettings(connectionSettings);
        // Disable localization
        sdk.setUiAssetsDownloadMode(com.ts.mobile.sdk.UIAssetsDownloadMode.DownloadOnInit.Disable);
        //set default ui handler
        sdk.setUiHandler(myUIHandler);


        sdk.initialize().then(function() {
            console.log("SDK initialized");
            document.getElementById("initStatus").innerHTML = "SDK initialized..";
            
        }).catch(function(err) {
        	displayResponse(err, false);

        });

    };
    
 
    this.invokeJourney = function() {
        var journeyId = document.getElementById('journeyId').value;
        var paramsInput = document.getElementById('params').value;
        var params = paramsInput ? JSON.parse(paramsInput) : paramsInput;
        var username = document.getElementById("username").value;
        var transmitContainer = document.getElementById("transmitContainer");
        var clientContext = {
            uiContainer: transmitContainer
        };
        
        sdk.authenticate(username, journeyId, params, clientContext)
            .then(function(successfulAuth) {
                document.getElementById("loginButton").disabled = true;
                document.getElementById("loginButton").style.color = "grey";
                document.getElementById("transmitContainer").innerHTML = "";
                document.getElementById("responseHeaderText").textContent = "";
                document.getElementById("response").textContent = "";
                displayResponse(successfulAuth, true);
            })
            .catch(function(err) {
                displayResponse(err, false);
            });
    };
    
    this.logout = function() {
        sdk.logout()
        .then(function(successfulAuth) {
            alert("Logout successful!");
            location.reload();
        })
        .catch(function(error) {
        	displayResponse(error, false);
        });
    };
    
    this.showConfigMenu = function() {
        sdk.startAuthenticationConfiguration()
            .then(function(successfulAuth) {
                alert("Success!");

            })
            .catch(function(error) {
            	displayResponse(error, false);
            });
    };
    	
    
    
    displayResponse = function (response , isSuccess) {
        console.log(response);
        if(isSuccess){
        	document.getElementById("responseHeaderText").textContent = "Success. Journey Complete!!";
        }else{
        	document.getElementById("responseHeaderText").textContent = "Error Response";
        }
        document.getElementById("response").textContent = JSON.stringify(response, null , 2);
    };

}).apply(myApp); 



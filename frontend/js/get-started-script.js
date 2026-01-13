function getStarted() {
   
    // Generate a unique nonce (important for security)
   //  const requestNonce = crypto.randomUUID();

    // Redirect to Truecaller SDK
    window.location =
        "truecallersdk://truesdk/web_verify?" +
        "type=btmsheet" +
        "&requestNonce=9f9b7fea-c643-413e-8e5f-eb4d7b8e9ffb" +
      //   + requestNonce +
        "&partnerKey=cY9BN7e379bdef7394189b1fda81348e71f42" +
        "&partnerName=AuthDemo1" +
        "&lang=en" +
        "&privacyUrl=https://ngrok-free.dev/privacy" +
        "&termsUrl=https://ngrok-free.dev/terms" +
        "&loginPrefix=getstarted" +
        "&loginSuffix=login" +
        "&ctaPrefix=use" +
        "&ctaColor=%23007AFF" +
        "&ctaTextColor=%23FFFFFF" +
        "&btnShape=round" +
        "&skipOption=useanothernum" +
        "&ttl=8000";
        
    setTimeout(function() {

  if( document.hasFocus() ){
     // Truecaller app not present on the device and you redirect the user 
     // to your alternate verification page
        window.location.href = "login.html";

  }else{
     // Truecaller app present on the device and the profile overlay opens
     // The user clicks on verify & you'll receive the user's access token to fetch the profile on your 
     // callback URL - post which, you can refresh the session at your frontend and complete the user  verification
     console.log("Truecaller detected")
    
  }
}, 600);
}

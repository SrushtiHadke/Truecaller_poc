function login() {
    const mobile = document.getElementById("mobile").value.trim();
    const error = document.getElementById("error");

    // Validate mobile number
    if (!/^[0-9]{10}$/.test(mobile)) {
        error.textContent = "Please enter a valid 10-digit mobile number";
        return;
    }

    error.textContent = "";

    // Generate a unique nonce (important for security)
    const requestNonce = crypto.randomUUID();

    // Redirect to Truecaller SDK
    window.location =
        "truecallersdk://truesdk/web_verify?" +
        "type=btmsheet" +
        "&requestNonce=" + requestNonce +
        "&partnerKey=aQGGYbb303fc47dcb41888103050ad4947c3b" +
        "&partnerName=AuthDemo" +
        "&lang=en" +
        "&privacyUrl=https://ngrok-free.dev/privacy" +
        "&termsUrl=https://ngrok-free.dev/terms" +
        "&loginPrefix=SignIn" +
        "&loginSuffix=with Truecaller" +
        "&ctaPrefix=Continue" +
        "&ctaColor=%23007AFF" +
        "&ctaTextColor=%23FFFFFF" +
        "&btnShape=rounded" +
        "&skipOption=Skip" +
        "&ttl=8000";
        
    setTimeout(function() {

  if( document.hasFocus() ){
     // Truecaller app not present on the device and you redirect the user 
     // to your alternate verification page
        window.location.href = "https://pyruvic-jennell-drumly.ngrok-free.dev/frontend/verify-otp.html";

  }else{
     // Truecaller app present on the device and the profile overlay opens
     // The user clicks on verify & you'll receive the user's access token to fetch the profile on your 
     // callback URL - post which, you can refresh the session at your frontend and complete the user  verification
     alert("Truecaller detected")
    
  }
}, 600);
}

// function generateUUID() {
//     if (crypto.randomUUID) {
//         return crypto.randomUUID();
//     }
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         const r = Math.random() * 16 | 0;
//         const v = c === 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }

// function getStarted() {
   
//     // Generate a unique nonce (important for security)
//    //  const requestNonce = generateUUID();

//     // Redirect to Truecaller SDK
//     window.location =
//         "truecallersdk://truesdk/web_verify?" +
//         "type=btmsheet" +
//         "&requestNonce=9f9b7fea-c643-413e-8e5f-eb4d7b8e9ffb" +
//       //   + requestNonce +
//         "&partnerKey=cY9BN7e379bdef7394189b1fda81348e71f42" +
//         "&partnerName=AuthDemo1" +
//         "&lang=en" +
//         "&privacyUrl=https://ngrok-free.dev/privacy" +
//         "&termsUrl=https://ngrok-free.dev/terms" +
//         "&loginPrefix=getstarted" +
//         "&loginSuffix=login" +
//         "&ctaPrefix=use" +
//         "&ctaColor=%23007AFF" +
//         "&ctaTextColor=%23FFFFFF" +
//         "&btnShape=round" +
//         "&skipOption=useanothernum" +
//         "&ttl=8000";
        
//     setTimeout(function() {

//   if( document.hasFocus() ){
//      // Truecaller app not present on the device and you redirect the user 
//      // to your alternate verification page
//         window.location.href = "login.html";

//   }else{
//      // Truecaller app present on the device and the profile overlay opens
//      // The user clicks on verify & you'll receive the user's access token to fetch the profile on your 
//      // callback URL - post which, you can refresh the session at your frontend and complete the user  verification
//      console.log("Truecaller detected")
    
//   }
// }, 600);
// }




function generateUUID() {

    // for testing purposes
    return '982ab479c82bb42389a6342052b8faf5062fbb567f2ecfa4bffb170e309206ac'
    if (crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// function printUUID() {
//     const uuid = generateUUID();
//     document.getElementById("uuidValue").innerText = uuid;
// }


async function getStarted() {
    const codeChallenge = generateUUID();
    console.log("code_challenge:", codeChallenge);

    const res = await fetch(
        "https://api-development.kisan.io/api/farmers/auth/challenge",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "farmer_truecaller_signin",
                challenge_name: "truecaller_verify_mobile",
                challenge_data: {
                    client_id: "d5f6da7b73a56d8e64bc6783ae3e1a1b",
                    code_challenge: codeChallenge
                }
            })
        }
    );

    if (!res.ok) {
        console.error("Start-auth failed");
        return;
    }

    const data = await res.json();
    console.log("API response:", data);

    const authProgressId = data?.data?.auth_progress_id;
    if (!authProgressId) {
        console.error("auth_progress_id missing");
        return;
    }

    // ✅ SHOW auth_progress_id
    document.getElementById("auth-id").innerText = authProgressId;
    document.getElementById("auth-id-box").style.display = "block";

    console.log("auth_progress_id:", authProgressId);

    // ✅ Allow UI to paint before redirect
    setTimeout(() => {
        window.location =
            "truecallersdk://truesdk/web_verify?" +
            "type=btmsheet" +
            "&requestNonce=" + encodeURIComponent(authProgressId) +
            "&partnerKey=Irdek1bfcc0186b804fbf80151f79b11b87fc" +
            "&partnerName=Farmer Web Dev" +
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
    }, 300);

    // fallback
    setTimeout(() => {
        if (document.hasFocus()) {
            window.location.href = "login.html";
        } else {
            console.log("✅ Truecaller detected");
        }
    }, 1500);
}

function copyAuthId() {
    const text = document.getElementById("auth-id").innerText;

    navigator.clipboard.writeText(text)
        .then(() => alert("Copied to clipboard"))
        .catch(() => alert("Failed to copy"));
}
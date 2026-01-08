const inputs = document.querySelectorAll(".otp-input");
const error = document.getElementById("error");
const resend = document.getElementById("resend");

inputs[0].focus();

/* OTP input navigation */
inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9]/g, "");
        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

/* Verify OTP */
function verifyOtp() {
    let otp = "";
    inputs.forEach(input => otp += input.value);

    if (otp.length !== 6) {
        error.textContent = "Please enter complete OTP";
        return;
    }

    error.textContent = "";
    alert("OTP verified: " + otp);
}

/* 🔁 Resend OTP Logic */
let timer = 30;
let interval;

function startResendTimer() {
    resend.classList.remove("active");
    resend.classList.add("disabled");
    resend.textContent = `Resend in ${timer}s`;

    interval = setInterval(() => {
        timer--;
        resend.textContent = `Resend in ${timer}s`;

        if (timer <= 0) {
            clearInterval(interval);
            resend.textContent = "Resend OTP";
            resend.classList.remove("disabled");
            resend.classList.add("active");
        }
    }, 1000);
}

/* Resend click handler */
resend.addEventListener("click", () => {
    if (!resend.classList.contains("active")) return;

    // 👉 Call resend OTP API here
    console.log("OTP resent");

    // Reset timer
    timer = 30;
    startResendTimer();
});

/* Start timer on page load */
startResendTimer();

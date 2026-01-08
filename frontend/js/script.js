function login() {
    const mobile = document.getElementById("mobile").value.trim();
    const error = document.getElementById("error");

    if (!/^[0-9]{10}$/.test(mobile)) {
        error.textContent = "Please enter a valid 10-digit mobile number";
        return;
    }

    error.textContent = "";
    alert("Login successful: " + mobile);
}

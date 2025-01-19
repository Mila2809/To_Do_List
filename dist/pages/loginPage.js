"use strict";
const dynamicInputs = document.getElementById("dynamic-inputs");
const signUpBtn = document.getElementById("sign-up-btn");
const signInBtn = document.getElementById("sign-in-btn");
const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.id = "email";
emailInput.placeholder = "Email";
signUpBtn.addEventListener("click", () => {
    if (!document.getElementById("email")) {
        dynamicInputs.insertBefore(emailInput, dynamicInputs.firstChild);
    }
});
signInBtn.addEventListener("click", () => {
    const email = document.getElementById("email");
    if (email) {
        dynamicInputs.removeChild(email);
    }
});

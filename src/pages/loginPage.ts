const dynamicInputs = document.getElementById(
    "dynamic-inputs"
) as HTMLDivElement;
const signUpBtn = document.getElementById("sign-up-btn") as HTMLAnchorElement;
const signInBtn = document.getElementById("sign-in-btn") as HTMLAnchorElement;

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

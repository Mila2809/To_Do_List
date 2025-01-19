"use strict";
var register;
(function (register) {
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche la soumission automatique du formulaire
        const form = e.target;
        const data = new FormData(form);
        const submitButton = e.submitter; // Cast pour TypeScript
        const action = submitButton.value;
        // Transforme les données du formulaire en un objet
        const formDataObject = Object.fromEntries(data.entries());
        try {
            if (action === "Sign Up") {
                // Appel de l'inscription
                const response = await fetch("/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataObject),
                });
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        // Redirection vers la page des tâches
                        window.location.href = "/index";
                    }
                    else {
                        // Affiche un message d'erreur
                        const message_error = document.getElementById("error-connexion");
                        if (message_error) {
                            message_error.innerHTML =
                                "Erreur d'inscription : " + result.message;
                        }
                    }
                }
                else {
                    alert("Une erreur est survenue lors de l'inscription.");
                }
            }
            else if (action === "sign-in") {
                // Appel pour la connexion (non traité ici, mais tu peux l'ajouter de la même manière)
                console.log("Connexion...");
                // Code de connexion à ajouter ici
            }
        }
        catch (error) {
            console.error("Erreur lors de la requête :", error);
            alert("Impossible de se connecter au serveur.");
        }
    };
    // Attache l'événement submit au formulaire
    const registerForm = document.querySelector("#dynamic-inputs");
    registerForm?.addEventListener("submit", handleSubmit);
})(register || (register = {}));

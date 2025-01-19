namespace register {
    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        const submitButton = e.submitter as HTMLButtonElement;
        const action = submitButton.value;

        const formDataObject = Object.fromEntries(data.entries());

        try {
            if (action === "Sign Up") {
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
                        window.location.href = "/index";
                    } else {
                        const message_error =
                            document.getElementById("error-connexion");
                        if (message_error) {
                            message_error.innerHTML =
                                "Erreur d'inscription : " + result.message;
                        }
                    }
                } else {
                    alert("Une erreur est survenue lors de l'inscription.");
                }
            }
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            alert("Impossible de se connecter au serveur.");
        }
    };

    const registerForm =
        document.querySelector<HTMLFormElement>("#dynamic-inputs");
    registerForm?.addEventListener("submit", handleSubmit);
}

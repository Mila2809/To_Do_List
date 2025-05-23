namespace add_task {
    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        const formDataObject = Object.fromEntries(data.entries());

        try {
            const response = await fetch("/add_task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataObject),
            });

            if (response) {
                const result = await response.json();
                if (result.success) {
                    window.location.href = "./index";
                } else {
                    const message_error = document.getElementById("error-task");
                    if (message_error) {
                        message_error.innerHTML =
                            "Erreur d'ajout de la tache : " + result.message;
                    }
                }
            } else {
                alert("Une erreur est survenue lors de la connexion.");
            }
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            alert("Impossible de se connecter au serveur.");
        }
    };

    const form = document.querySelectorAll<HTMLFormElement>(".form-task");
    if (form.length > 0) {
        form.forEach((f) => f.addEventListener("submit", handleSubmit));
    }
}

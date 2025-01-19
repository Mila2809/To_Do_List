"use strict";
const change_status = async (taskElement, statusInput) => {
    console.log("Changement de statut appelé."); // Devrait s'afficher si l'événement est déclenché.
    const taskId = taskElement.dataset.taskId;
    const status = statusInput.checked;
    // Appel de la modification du statut
    const response = await fetch("/status_task", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId, status: status }),
    });
    if (response) {
        const result = await response.json();
        if (!result.success) {
            const message_error = document.getElementById("error-task");
            if (message_error) {
                message_error.innerHTML =
                    "Erreur du changement de statut de la tâche : " +
                        result.message;
            }
        }
    }
    else {
        const message_error = document.getElementById("error-task");
        if (message_error) {
            message_error.innerHTML =
                "Une erreur est survenue lors de la connexion.";
        }
    }
};
// fonction pour supprimer une tache
const delete_task = async (taskElement) => {
    const taskId = taskElement.dataset.taskId;
    // Appelle de la suppression
    const response = await fetch(`/delete_task`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }),
    });
    if (response) {
        // Enleve
        const result = await response.json();
        if (result.success) {
            taskElement.remove();
            const tasks = await getTasks();
        }
        else {
            // Sinon on affiche l'erreur
            const message_error = document.getElementById("error-task");
            if (message_error) {
                message_error.innerHTML =
                    "Erreur de la suppression de la tache : " + result.message;
            }
        }
    }
    else {
        const message_error = document.getElementById("error-task");
        if (message_error) {
            message_error.innerHTML =
                "Une erreur est survenue lors de la connexion.";
        }
    }
};
const getTasks = async () => {
    try {
        const response = await fetch("/task", {
            method: "GET",
        });
        if (!response.ok) {
            console.error(`Erreur lors de la récupération des tâches : ${response.statusText}`);
            return [];
        }
        const data = await response.json();
        return data.data || [];
    }
    catch (erreur) {
        console.error("Erreur lors de la requête :", erreur);
        return [];
    }
};
const displaytask = async () => {
    const tasks = await getTasks();
    const container = document.getElementById("container");
    const template = document.getElementById("task");
    if (container && template) {
        container.innerHTML = ""; // Nettoie le conteneur avant d'ajouter des tâches
        tasks.forEach((task) => {
            // Clone le template
            const taskCard = template.cloneNode(true);
            taskCard.dataset.taskId = task.id.toString(); // Ajoute l'ID de la tâche
            taskCard.style.display = "block"; // Rend le template visible
            // Remplit les données
            const title = taskCard.querySelector(".title");
            const description = taskCard.querySelector(".sub-title");
            const deadline = taskCard.querySelector(".to-do-date");
            title.textContent = task.title;
            deadline.textContent = `Release date before : ${task.date}`;
            description.textContent = task.description;
            // Ajoute l'élément cloné au conteneur
            container.appendChild(taskCard);
            // Récupère l'input "status" et ajoute un écouteur
            const statusInput = taskCard.querySelector("#status");
            const deleteButton = taskCard.querySelector("#delete");
            deleteButton?.addEventListener("click", () => {
                delete_task(taskCard);
            });
            statusInput?.addEventListener("change", () => {
                change_status(taskCard, statusInput);
            });
        });
    }
};
displaytask();

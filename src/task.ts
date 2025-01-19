const updateTaskStatus = async (
    taskElement: HTMLElement,
    statusInput: HTMLInputElement,
    deleteButton: HTMLButtonElement | null
) => {
    const taskId = taskElement.dataset.taskId;
    const newStatus = statusInput.checked;

    const response = await fetch("/status_task", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId, status: newStatus }),
    });

    if (response) {
        const result = await response.json();
        if (!result.success) {
            const errorMessage = document.getElementById("error-task");
            if (errorMessage) {
                errorMessage.innerHTML = `Erreur du changement de statut de la tâche : ${result.message}`;
            }
        } else if (deleteButton) {
            deleteButton.style.display = newStatus ? "none" : "flex";
        }
    } else {
        const errorMessage = document.getElementById("error-task");
        if (errorMessage) {
            errorMessage.innerHTML =
                "Une erreur est survenue lors de la connexion.";
        }
    }
};

const removeTask = async (taskElement: HTMLElement) => {
    const taskId = taskElement.dataset.taskId;

    const response = await fetch("/delete_task", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }),
    });

    if (response) {
        const result = await response.json();
        if (result.success) {
            taskElement.remove();
            await fetchTasks();
        } else {
            const errorMessage = document.getElementById("error-task");
            if (errorMessage) {
                errorMessage.innerHTML = `Erreur de la suppression de la tâche : ${result.message}`;
            }
        }
    } else {
        const errorMessage = document.getElementById("error-task");
        if (errorMessage) {
            errorMessage.innerHTML =
                "Une erreur est survenue lors de la connexion.";
        }
    }
};

const fetchTasks = async () => {
    try {
        const response = await fetch("/task", { method: "GET" });
        if (!response.ok) {
            console.error(
                `Erreur lors de la récupération des tâches : ${response.statusText}`
            );
            return [];
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        return [];
    }
};

const renderTasks = async () => {
    const tasks = await fetchTasks();
    const container = document.getElementById("container");
    const taskTemplate = document.getElementById("task");

    if (container && taskTemplate) {
        container.innerHTML = "";
        tasks.forEach((task: any) => {
            const taskCard = taskTemplate.cloneNode(true) as HTMLElement;
            taskCard.dataset.taskId = task.id.toString();
            taskCard.style.display = "block";

            const titleElement = taskCard.querySelector(
                ".title"
            ) as HTMLElement;
            const descriptionElement = taskCard.querySelector(
                ".sub-title"
            ) as HTMLElement;
            const deadlineElement = taskCard.querySelector(
                ".to-do-date"
            ) as HTMLElement;

            titleElement.textContent = task.title;
            deadlineElement.textContent = `Release date before : ${task.date}`;
            descriptionElement.textContent = task.description;

            container.appendChild(taskCard);

            const statusInput = taskCard.querySelector(
                "#status"
            ) as HTMLInputElement;
            statusInput.checked = task.status;

            const deleteButton = taskCard.querySelector(
                "#delete"
            ) as HTMLButtonElement | null;
            if (task.status && deleteButton) {
                deleteButton.style.display = "none";
            }

            deleteButton?.addEventListener("click", () => removeTask(taskCard));
            statusInput?.addEventListener("change", () =>
                updateTaskStatus(taskCard, statusInput, deleteButton)
            );
        });
    }
};

renderTasks();

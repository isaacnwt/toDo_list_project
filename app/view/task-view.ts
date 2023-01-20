export class TaskView {
    private container: HTMLDivElement;

    constructor(selector: string) {
        this.container = document.querySelector(selector);
    }

    update(taskList: Task[]): void {
        this.container.innerHTML = "";
        taskList.forEach(task => {
            this.appendTaskDiv(task.id.toString(),
                task.title,
                task.description);
        });
    }

    appendTaskDiv(id: string, title: string, description: string): void {
        const newContainer = document.createElement("div");
        const taskContainer = document.createElement("div");
        const taskTitle = document.createElement("h3");
        const taskDescription = document.createElement("p");
        const deleteItem = document.createElement("i");

        taskTitle.innerHTML = title;
        taskDescription.innerHTML = description;

        newContainer.classList.add("task-item");
        newContainer.id = id;

        deleteItem.classList.add("fa-solid");
        deleteItem.classList.add("fa-trash");

        taskContainer.appendChild(taskTitle);
        taskContainer.appendChild(taskDescription);

        newContainer.appendChild(taskContainer);
        newContainer.appendChild(deleteItem);
        this.container.appendChild(newContainer);
    }

    descriptionInput(input: HTMLInputElement, element: HTMLElement): void {
        if (input.value.trim().length === 1 && !element.querySelector(".description-input")) {
            const descriptionInput = document.createElement("textarea");
            descriptionInput.classList.add("description-input");
            descriptionInput.setAttribute("placeholder", "Descrição (opcional)");
            element.appendChild(descriptionInput);
        } else if (input.value.trim().length === 0) {
            element.removeChild(element.lastElementChild);
        }

    }
}
export class TaskView {
    constructor(selector) {
        this.container = document.querySelector(selector);
    }
    update(taskList) {
        this.container.innerHTML = "";
        taskList.forEach(task => {
            this.appendTaskDiv(task.id.toString(), task.title);
        });
    }
    appendTaskDiv(id, title) {
        const taskItemContainer = document.createElement("div");
        const taskContent = document.createElement("p");
        const deleteItem = document.createElement("i");
        taskContent.innerHTML = title;
        taskItemContainer.classList.add("task-item");
        taskItemContainer.id = id;
        deleteItem.classList.add("fa-solid");
        deleteItem.classList.add("fa-trash");
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
        this.container.appendChild(taskItemContainer);
    }
}

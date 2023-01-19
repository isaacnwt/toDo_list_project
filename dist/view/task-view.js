import { elements } from "./elements.js";
const isInputEmpty = () => elements.input.value.trim().length > 0;
export const addTask = () => {
    let inputIsValid = isInputEmpty();
    if (!inputIsValid) {
        return inputIsValid = elements.input.classList.add("error");
    }
    elements.input.value = "";
};
export const removeErrorClass = () => {
    const inputIsValid = isInputEmpty();
    if (inputIsValid) {
        return elements.input.classList.remove("error");
    }
};
const createNewTodoDiv = (id, title) => {
    const taskItemContainer = document.createElement("div");
    const taskContent = document.createElement("p");
    const deleteItem = document.createElement("i");
    taskContent.innerHTML = title;
    deleteItem.addEventListener("click", () => deleteTask(id));
    taskItemContainer.classList.add("task-item");
    taskItemContainer.id = id;
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash");
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    elements.tasksContainer.appendChild(taskItemContainer);
};
export const showTaskList = (taskList) => {
    elements.tasksContainer.innerHTML = "";
    taskList.forEach(task => {
        createNewTodoDiv(task.id.toString(), task.title);
    });
};
const deleteTask = (id) => {
    const taskDiv = document.getElementById(id);
    taskDiv.remove();
};

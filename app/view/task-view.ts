import { elements } from "./elements.js"


const isInputEmpty = (): boolean => elements.input.value.trim().length > 0;

export const addTask = (): void => {
    let inputIsValid: boolean | void = isInputEmpty();

    if (!inputIsValid) { return inputIsValid = elements.input.classList.add("error"); }

    createNewTodoDiv(elements.input.value);
    elements.input.value = "";
}

export const removeErrorClass = () => {
    const inputIsValid = isInputEmpty();
    if (inputIsValid) { return elements.input.classList.remove("error"); }
};

const createNewTodoDiv = (title: string): void => {
    const taskItemContainer = document.createElement("div");
    const taskContent = document.createElement("p");
    const deleteItem = document.createElement("i");

    taskContent.innerHTML = title; 
    
    // deleteItem.addEventListener("click", () => deleteTask());

    taskItemContainer.classList.add("task-item");
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash");

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    elements.tasksContainer.appendChild(taskItemContainer);
}

export const showTaskList = (taskList: Task[]) => {
    taskList.forEach(task => {
        createNewTodoDiv(task.title);
    });
}
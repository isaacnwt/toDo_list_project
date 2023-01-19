import { TaskList } from "./model/TaskList.js";

import * as view from "./view/task-view.js";

import { elements } from "./view/elements.js";


const url = "http://localhost/todo_list/todo.php";

const getDataFromApi = async (): Promise<void> => {
    try {
        let taskList = new TaskList(url, 1);
        await taskList.getResults();
        view.showTaskList(taskList.list);
    } catch (error) {
      console.log("Erro ao comunicar com a API");
    }
};


window.addEventListener("load", getDataFromApi);

elements.addButton.addEventListener("click", () => view.addTask());
elements.input.addEventListener("change", () => view.removeErrorClass());
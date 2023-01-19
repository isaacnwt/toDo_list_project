import { TaskList } from "./model/TaskList.js";

import * as view from "./view/task-view.js";

import { elements } from "./view/elements.js";


const url = "http://localhost/todo_list/todo.php";
const taskList = new TaskList(url, 1);

const getDataFromApi = async (): Promise<void> => {
  try {
    await taskList.getTasks();
    view.showTaskList(taskList.list);
  } catch (error) {
    console.log("Erro ao comunicar com a API");
  }
};


window.addEventListener("load", getDataFromApi);

elements.addButton.addEventListener("click", async () => {
  let request = taskList.createTask(elements.input.value);
  if (request) {
    view.addTask()
    getDataFromApi;
  } else {
    alert("Falha ao registrar!");
  }

});

elements.input.addEventListener("change", () => view.removeErrorClass());
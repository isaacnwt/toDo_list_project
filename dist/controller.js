var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TaskList } from "./model/TaskList.js";
import * as view from "./view/task-view.js";
import { elements } from "./view/elements.js";
const url = "http://localhost/todo_list/todo.php";
const taskList = new TaskList(url, 1);
const getDataFromApi = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield taskList.getResults();
        view.showTaskList(taskList.list);
    }
    catch (error) {
        console.log("Erro ao comunicar com a API");
    }
});
window.addEventListener("load", getDataFromApi);
elements.addButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    let request = taskList.createTask(elements.input.value);
    if (request) {
        view.addTask();
        yield taskList.getResults();
        view.showTaskList(taskList.list);
    }
    else {
        alert("Falha ao registrar!");
    }
}));
elements.input.addEventListener("change", () => view.removeErrorClass());

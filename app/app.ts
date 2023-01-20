import { TaskController } from "./controller/task-controller.js";

const taskController = new TaskController(1);
const addButton = document.querySelector(".botao_adicionar_tarefa");

addButton.addEventListener("click", async () => taskController.create());

window.addEventListener("load", async () => taskController.loadData());

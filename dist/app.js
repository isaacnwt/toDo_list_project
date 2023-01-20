var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TaskController } from "./controller/task-controller.js";
const taskController = new TaskController(1);
const addButton = document.querySelector(".botao_adicionar_tarefa");
addButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () { return taskController.create(); }));
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () { return taskController.loadData(); }));

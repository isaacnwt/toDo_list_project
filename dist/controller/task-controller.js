var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TaskService } from "../service/task-service.js";
import { TaskView } from "../view/task-view.js";
export class TaskController {
    constructor(userId) {
        this.userId = userId;
        this.taskView = new TaskView("#tasks-container");
        this.input = document.querySelector(".input_adicionar_tarefa");
        this.taskService = new TaskService(this.userId);
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.input.value == "") {
                this.input.classList.add("error");
                alert("Input vazio"); // melhorar depois
            }
            else {
                let response = yield this.taskService.create(this.input.value);
                if (response.status === 201) {
                    alert("Task cadastrada com sucesso"); // melhorar depois
                    this.taskView.update(yield this.taskService.get());
                    this.input.value = "";
                }
                else {
                    console.log(response.status);
                    alert("Falha ao registrar!");
                }
            }
        });
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.taskView.update(yield this.taskService.get());
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    removeErrorClass() {
        this.input.classList.remove("error");
    }
}

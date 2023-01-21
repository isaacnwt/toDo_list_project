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
import { InputView } from "../view/input-view.js";
import { TaskView } from "../view/task-view.js";
export class TaskController {
    constructor(userId) {
        this.userId = userId;
        this.taskView = new TaskView("#tasks-container");
        this.inputView = new InputView("#description-container");
        this.input = document.querySelector(".input_adicionar_tarefa");
        this.input.addEventListener("click", () => this.removeErrorClass());
        this.inputDiv = document.getElementById("input-container");
        this.tasksDivs = document.getElementById("tasks-container").children;
        this.taskService = new TaskService(this.userId);
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.inputHasValue()) {
                this.input.classList.add("error");
            }
            else {
                let response = yield this.taskService.create(this.input.value);
                if (response.status === 201) {
                    alert("Task cadastrada com sucesso"); // melhorar depois
                    this.loadData();
                    this.input.value = "";
                }
                else {
                    console.log(response.status);
                    alert("Falha ao registrar!");
                }
            }
        });
    }
    addDescription() {
        if (this.inputHasValue() && !this.isDescriptionShown()) {
            this.inputView.update("Descrição (opcional)");
        }
        else if (!this.inputHasValue()) {
            this.inputView.remove();
        }
    }
    inputHasValue() {
        return this.input.value.trim().length > 0;
    }
    isDescriptionShown() {
        if (this.inputDiv.querySelector(".description-input")) {
            return true;
        }
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.taskView.update(yield this.taskService.get());
                this.addDeleteEvent();
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    addDeleteEvent() {
        for (let i = 0; i < this.tasksDivs.length; i++) {
            let button = this.tasksDivs[i].querySelector("i");
            button.addEventListener("click", () => {
                let taskDiv = button.parentNode;
                let id = taskDiv.getAttribute("id");
                this.delete(id);
            });
        }
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.taskService.delete(parseInt(id));
            if (response.status === 200) {
                alert("Task deletada com sucesso"); // melhorar depois
                this.loadData();
            }
            else {
                console.log(response.status);
                alert("Falha ao deletar!");
            }
        });
    }
    removeErrorClass() {
        this.input.classList.remove("error");
    }
}

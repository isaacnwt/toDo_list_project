import { TaskService } from "../service/task-service.js";
import { TaskView } from "../view/task-view.js";

export class TaskController {
  private input: HTMLInputElement;
  private inputDiv: HTMLElement;
  private tasksDivs: HTMLCollection;
  private taskService: TaskService;
  private taskView = new TaskView("#tasks-container");

  constructor(private userId: number) {
    this.input = document.querySelector(".input_adicionar_tarefa");
    this.input.addEventListener("click", () => this.removeErrorClass());
    this.input.addEventListener("input", () => this.taskView.descriptionInput(this.input, this.inputDiv));
    this.inputDiv = document.getElementById("input-container");
    this.tasksDivs = document.getElementById("tasks-container").children;
    this.taskService = new TaskService(this.userId);
  }

  async create(): Promise<void> {
    if (this.input.value == "") {
      this.input.classList.add("error");
      alert("Input vazio"); // melhorar depois
    }
    else {
      let response = await this.taskService.create(this.input.value);
      if (response.status === 201) {
        alert("Task cadastrada com sucesso"); // melhorar depois
        this.loadData();
        this.input.value = "";
      } else {
        console.log(response.status);
        alert("Falha ao registrar!");
      }
    }
  }

  async loadData(): Promise<void> {
    try {
      this.taskView.update(await this.taskService.get());
      this.addDeleteEvent();
    } catch (error) {
      console.error(error);
    }
  }

  addDeleteEvent() {
    for (let i = 0; i < this.tasksDivs.length; i++) {
      let button = this.tasksDivs[i].querySelector("i");
      button.addEventListener("click", () => {
        let taskDiv = button.parentNode as HTMLDivElement;
        let id = taskDiv.getAttribute("id");
        this.delete(id);
      })
    }
  }

  async delete(id: string): Promise<void> {
    let response = await this.taskService.delete(parseInt(id));
    if (response.status === 200) {
      alert("Task deletada com sucesso"); // melhorar depois
      this.loadData();
    } else {
      console.log(response.status);
      alert("Falha ao deletar!");
    }
  }

  removeErrorClass(): void {
    this.input.classList.remove("error");
  }
}

import { TaskService } from "../service/task-service.js";
import { InputView } from "../view/input-view.js";
import { TaskView } from "../view/task-view.js";

export class TaskController {
  private taskService: TaskService;
  public input: HTMLInputElement;
  private inputDiv: HTMLElement;
  private tasksDivs: HTMLCollection;
  private taskView = new TaskView("#tasks-container");
  private inputView = new InputView("#description-container");

  constructor(private userId: number) {
    this.input = document.querySelector(".input_adicionar_tarefa");
    this.inputDiv = document.getElementById("input-container");
    this.tasksDivs = document.getElementById("tasks-container").children;
    this.taskService = new TaskService(this.userId);
  }

  public async loadData(): Promise<void> {
    try {
      this.taskView.update(await this.taskService.get());
      this.addDeleteEvent();
    } catch (error) {
      console.error(error);
    }
  }

  public async create(): Promise<void> {
    if (!this.inputHasValue()) {
      this.input.classList.add("error");
      this.input.addEventListener("click", () => this.removeErrorClass());
    } else {
      let descriptionInput = this.getDescriptionInput();
      let response = await this.taskService.create(
        this.input.value, 
        descriptionInput.value);
      this.returnCreateResult(response);
    }
  }

  public addDescription(): void {
    if (this.inputHasValue() && !this.getDescriptionInput()) {
      this.inputView.update("Descrição (opcional)");
    } else if (!this.inputHasValue()) {
      this.inputView.remove();
    }
  }

  private async delete(id: string): Promise<void> {
    let response = await this.taskService.delete(parseInt(id));
    if (response.status === 200) {
      alert("Task deletada com sucesso"); // melhorar depois
      this.loadData();
    } else {
      console.log(response.status);
      alert("Falha ao deletar!");
    }
  }

  private returnCreateResult(response: Response): void {
    if (response.status === 201) {
      this.loadData();
      this.input.value = "";
      this.inputView.remove();
    } else {
      console.log(response.status);
      alert("Falha ao registrar!");
    }
  }

  private addDeleteEvent(): void {
    for (let i = 0; i < this.tasksDivs.length; i++) {
      let button = this.tasksDivs[i].querySelector("i");
      button.addEventListener("click", () => {
        let taskDiv = button.parentNode as HTMLDivElement;
        let id = taskDiv.getAttribute("id");
        this.delete(id);
      })
    }
  }

  private removeErrorClass(): void {
    this.input.classList.remove("error");
  }

  private inputHasValue(): boolean {
    return this.input.value.trim().length > 0;
  }

  private getDescriptionInput(): HTMLInputElement {
    return this.inputDiv.querySelector(".description-input");
  }
}

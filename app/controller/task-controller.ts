import { TaskService } from "../service/task-service.js";
import { InputView } from "../view/input-view.js";
import { TaskView } from "../view/task-view.js";

export class TaskController {
  private taskService: TaskService;
  private taskView: TaskView;
  private inputView : InputView;
  public input: HTMLInputElement;
  private inputDiv: HTMLElement;
  private tasksDivs: HTMLCollection;

  constructor(private userId: number) {
    this.taskService = new TaskService(this.userId);
    this.taskView = new TaskView("#tasks-container");
    this.inputView = new InputView("#description-container");
    this.input = document.querySelector(".input_adicionar_tarefa");
    this.inputDiv = document.getElementById("input-container");
    this.tasksDivs = document.getElementById("tasks-container").children;
  }

  public async loadData(): Promise<void> {
    try {
      this.taskView.update(await this.taskService.get());
      this.addEvents();
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
      let response = await this.taskService
      .create(
        this.input.value,
        descriptionInput.value
      );
      this.returnCreateResult(response);
    }
  }

  public addDescriptionTextBox(): void {
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

  private addDeleteEvent(taskDiv: Element): void {
    taskDiv.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.matches(".delete-icon")) {
        this.delete(taskDiv.getAttribute("id"));
      }
    })
  }

  private addDoneEvent(taskDiv: Element): void {
    const content = taskDiv.querySelector(".task-content");
    content.addEventListener("dblclick", () => this.taskView.turnDone(content));
  }

  private addEvents(): void {
    for (let i = 0; i < this.tasksDivs.length; i++) {
      this.addDoneEvent(this.tasksDivs[i]);
      this.addDeleteEvent(this.tasksDivs[i]);
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

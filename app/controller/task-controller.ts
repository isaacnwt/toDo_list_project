import { TaskService } from "../service/task-service.js";
import { TaskView } from "../view/task-view.js";

export class TaskController {
  private input: HTMLInputElement;
  private taskService: TaskService;
  private taskView = new TaskView("#tasks-container");

  constructor(private userId: number) {
    this.input = document.querySelector(".input_adicionar_tarefa");
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
        this.taskView.update(await this.taskService.get());
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
    } catch (error) {
      console.error(error);
    }
  }

  removeErrorClass(): void {
    this.input.classList.remove("error");
  }

  // deleteTask(id: string): void {
  //   const taskDiv = document.getElementById(id);
  //   taskDiv.remove();
  // }

}

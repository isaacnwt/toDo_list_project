import { View } from "./view.js";

export class TaskView extends View<Task[]>{

    public turnDone(taskContent: Element): void {
        if (!taskContent.classList.contains("done")) {
            taskContent.classList.add("done");
            return
        }
        taskContent.classList.remove("done");
    }

    protected template(taskList: Task[]): string {
        return `${taskList.map(task => {
            return `
                <div class="task-item" id="${task.id}">
                    <div class="task-content">
                        <h3>${task.title}</h3>
                        <div id="description-text">
                            ${task.description ? `<p>${task.description}</p>` : ""} 
                        </div>
                    </div>
                    <i class="delete-icon fa-solid fa-trash"></i>
                </div>
            `
        }).join('')
        }`
    }
}
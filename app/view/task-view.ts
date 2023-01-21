import { View } from "./view.js";

export class TaskView extends View<Task[]>{

    protected template(taskList: Task[]): string {
        return `${taskList.map(task => {
            return `
                <div class="task-item id="${task.id}">
                    <div>
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                    </div>
                    <i class="fa-solid fa-trash"></i>
                </div>
            `
        }).join('')
        }`
    }
}
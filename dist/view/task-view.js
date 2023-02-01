import { View } from "./view.js";
export class TaskView extends View {
    turnDone(taskContent) {
        if (!taskContent.classList.contains("done")) {
            taskContent.classList.add("done");
            return;
        }
        taskContent.classList.remove("done");
    }
    template(taskList) {
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
            `;
        }).join('')}`;
    }
}

export class TaskView {
    private container: HTMLDivElement;

    constructor(selector: string) {
        this.container = document.querySelector(selector);
     }

    update(taskList: Task[]): void {
        this.container.innerHTML = "";
        taskList.forEach(task => {
            this.appendTaskDiv(task.id.toString(), task.title);
        });
    }

    appendTaskDiv(id: string, title: string): void  {
        const taskItemContainer = document.createElement("div");
        const taskContent = document.createElement("p");
        const deleteItem = document.createElement("i");
    
        taskContent.innerHTML = title; 
    
        taskItemContainer.classList.add("task-item");
        taskItemContainer.id = id;
        
        deleteItem.classList.add("fa-solid");
        deleteItem.classList.add("fa-trash");
        
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
        this.container.appendChild(taskItemContainer);
    }

}
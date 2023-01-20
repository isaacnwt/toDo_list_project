export class TaskView {
    private container: HTMLDivElement;

    constructor(selector: string) {
        this.container = document.querySelector(selector);
     }

    update(taskList: Task[]): void {
        this.container.innerHTML = "";
        taskList.forEach(task => {
            this.appendTaskDiv(task.id.toString(), 
                               task.title, 
                               task.description);
        });
    }

    appendTaskDiv(id: string, title: string, description: string): void  {
        const newContainer = document.createElement("div");
        const taskContainer = document.createElement("div");
        const taskTitle = document.createElement("h3");
        const taskDescription = document.createElement("p");
        const deleteItem = document.createElement("i");
    
        taskTitle.innerHTML = title; 
        taskDescription.innerHTML = description; 
    
        newContainer.classList.add("task-item");
        newContainer.id = id;
        
        deleteItem.classList.add("fa-solid");
        deleteItem.classList.add("fa-trash");
        
        taskContainer.appendChild(taskTitle);
        taskContainer.appendChild(taskDescription);

        newContainer.appendChild(taskContainer);
        newContainer.appendChild(deleteItem);
        this.container.appendChild(newContainer);
    }

}
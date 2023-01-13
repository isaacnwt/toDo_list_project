import { Task } from "./Task.js";

class TaskList {
    private _list: Task[];

    constructor(private api: string) {}

    async getResults(): Promise<void> {
        try {
            const response = await fetch(this.api);
            const jsonResponse: ApiTask[] = await response.json();

            jsonResponse.forEach(task => {
                this._list.push(new Task(
                    task.id,
                    task.title,
                    task.description,
                    task.done,
                    task.user_id));
            });
        } catch (error) {
            console.log(error);
        }
    }

    
    get list(): readonly Task[] {
        return this._list;
    }
    
}
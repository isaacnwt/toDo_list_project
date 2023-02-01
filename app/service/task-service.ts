export class TaskService {
    private readonly api = "http://localhost/todo-list-api/todo.php";
    private readonly header = { 'Content-Type': 'application/x-www-form-urlencoded' };

    constructor( private userId: number ) { }

    async get(): Promise<Task[]> {
        try {
            const response = await fetch(`${this.api}?id=${this.userId.toString()}`);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async create(title: string, description?: string): Promise<Response> {
        try {
            let body = this.getBody(title, description);
            
            const response = await fetch(this.api, {
                method: "POST",
                headers: this.header,
                body: body
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async delete(id: number): Promise<Response> {
        try {
            const response = await fetch(this.api, {
                method: 'DELETE',
                headers: this.header,
                body: `id=${id}&user_id=${this.userId}`
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    private getBody(title: string, description: string): string {
        if(description) {
            return `title=${title}&description=${description}&user_id=${this.userId}`
        } else {
            return `title=${title}&user_id=${this.userId}`
        }
    }

}
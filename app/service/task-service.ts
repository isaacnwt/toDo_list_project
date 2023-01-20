export class TaskService {
    private readonly api = "http://localhost/todo_list/todo.php";

    constructor( private userId: number ) { }

    async get(): Promise<Task[]> {
        try {
            const response = await fetch(`${this.api}?id=${this.userId.toString()}`);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async create(title: string, description: string = null): Promise<Response> {
        try {
            const response = await fetch(this.api, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `title=${title}&description=${description}&user_id=${this.userId}`
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
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${id}&user_id=${this.userId}`
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    };

}
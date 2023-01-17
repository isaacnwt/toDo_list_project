class TaskList {
    private _list: Task[];

    constructor(private api: string) {}

    async getResults(): Promise<void> {
        try {
            const response = await fetch(this.api);
            this._list = await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    
    get list(): Task[] {
        return this._list;
    }
    
} export { TaskList }
class TaskList {
    private _list: Task[];

    constructor(
        private api: string,
        private userId: number
    ) { }

    async getResults(): Promise<void> {
        try {
            const response = await fetch(`${this.api}?id=${this.userId.toString()}`);
            this._list = await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTask(id: number): Promise<void> {
        try {
            const response = await fetch(this.api, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${id}&user_id=${this.userId}`
            });
            const json = await response.json();
            if (response.status === 200) {
                console.log(json.msg);
            } else {
                console.error(json.msg);
            }
        } catch (error) {
            console.error(error);
        }
    };



    get list(): Task[] {
        return this._list;
    }

} export { TaskList }
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
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', this.api);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('id', id.toString());
            xhr.setRequestHeader('user_id', this.userId.toString());
            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log("Successful DELETE request");
                    console.log(xhr.responseText);
                } else {
                    console.log("Error: " + xhr.status);
                }
            };
            xhr.onerror = () => {
                console.log("Error while making DELETE request");
            };
            xhr.send();
        } catch (error) {
            console.log(error);
        }
    }


    get list(): Task[] {
        return this._list;
    }

} export { TaskList }
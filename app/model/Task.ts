class Task {

    constructor(
        private id: number, 
        private title: string,
        private description: string = null,
        private done: boolean = false, 
        private userId: number
    ) {}

} export { Task }
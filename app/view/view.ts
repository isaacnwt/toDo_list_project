export abstract class View<T> {
    protected container: HTMLElement;

    constructor(selector: string) {
        this.container = document.querySelector(selector);
    }

    update(model: T): void {
        this.container.innerHTML = this.template(model);
    }

    protected abstract template(model: T): string;
}
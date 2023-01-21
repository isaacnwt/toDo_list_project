export class View {
    constructor(selector) {
        this.container = document.querySelector(selector);
    }
    update(model) {
        this.container.innerHTML = this.template(model);
    }
}

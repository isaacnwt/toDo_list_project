import { View } from "./view.js";
export class InputView extends View {
    remove() {
        let description = document.getElementById("description");
        description.remove();
    }
    template(model) {
        return `
                <textarea id="description" class="description-input" placeholder="${model}"></textarea>
        `;
    }
}

import { View } from "./view.js";

export class InputView extends View<string> {

    public remove(): void {
        let description = document.getElementById("description");
        description.remove()
    }

    protected template(model: string): string {
        return `
                <textarea id="description" class="description-input" placeholder="${model}"></textarea>
        `
    }

}
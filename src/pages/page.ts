import { Model } from "../model.js";

interface Page {
    urlElement: string;
    update(model: Model): void;
    updateView(): void;
    hide(): void;
}

export { Page };

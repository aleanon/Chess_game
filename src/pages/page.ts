import { Model } from "../model.js";

interface Page {
    urlElement: string;
    update(model: Model): void;
    view(): void;
    hide(): void;
}

export { Page };

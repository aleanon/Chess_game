import { ChessPage } from "./pages/chess_game/chess_page.js";
import { Page } from "./pages/page.js";

export class Model {
    private currentPage: Page;

    constructor(page: Page) {
        this.currentPage = page;
    }

    setPage(page: Page): void {
        this.currentPage.hide();
        this.currentPage = page;
        this.currentPage.updateView();
    }

    getCurrentPage(): Page {
        return this.currentPage;
    }

    updateView() {
        this.currentPage.updateView();
    }

    updateCurrentPage(): void {
        if (this.currentPage) {
            this.currentPage.update(this);
        }
    }
    view() {
        this.currentPage?.updateView();
    }
}

const page = new ChessPage("1");
export const model = new Model(page);

declare global {
    interface Window {
        model: Model;
    }
}

window.model = model;

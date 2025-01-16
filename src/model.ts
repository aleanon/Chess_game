import { ChessBoard } from "./pages/chess_game/chess_board.js";
import { ChessGame } from "./pages/chess_game/chess_game.js";
import { Page } from "./pages/page.js";

export class Model {
    private currentPage: Page;

    constructor(page: Page) {
        this.currentPage = page;
    }

    setPage(page: Page): void {
        this.currentPage.hide();
        this.currentPage = page;
        this.currentPage.view();
    }

    getCurrentPage(): Page {
        return this.currentPage;
    }

    updateCurrentPage(): void {
        if (this.currentPage) {
            this.currentPage.update(this);
        }
    }
    view() {
        this.currentPage?.view();
    }
}

const page = new ChessGame("1");
export const model = new Model(page);

import { ChessBoard } from "./chess_board.js";
import { Page } from "../page.js";

const BOARD_CONTAINER_ID = "chess-board-container";

export class ChessGame implements Page {
    public readonly urlElement: string;
    public readonly board: ChessBoard;
    private readonly CHESS_GAME_CONTAINER: HTMLElement;

    constructor(sessionId: string) {
        this.urlElement = "board/" + sessionId + "/";
        this.board = new ChessBoard();
        document.body.innerHTML = this.createHTML();

        this.CHESS_GAME_CONTAINER = document.getElementById(
            BOARD_CONTAINER_ID
        ) as HTMLElement;
    }

    private createHTML(): string {
        return /*HTML*/ `
        <div id="${BOARD_CONTAINER_ID}" class="board-container">
            ${this.board.createBoardHtml()}
        </div>
    `;
    }

    view(): void {
        this.CHESS_GAME_CONTAINER.style.display = "block";
    }
    hide(): void {
        this.CHESS_GAME_CONTAINER.style.display = "none";
    }
    update(): void {}
}

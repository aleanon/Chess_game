import { Page } from "../page.js";
import { ChessGame } from "./chess_game.js";

const PAGE_ID = "chess-page";

export class ChessPage implements Page {
    public readonly urlElement: string;
    public readonly game: ChessGame;
    private readonly chessPageContainer: HTMLElement;

    constructor(sessionId: string) {
        this.urlElement = "board/" + sessionId + "/";
        this.game = new ChessGame();
        document.body.innerHTML = this.createHTML();

        this.chessPageContainer = document.getElementById(
            PAGE_ID
        ) as HTMLElement;
    }

    private createHTML(): string {
        return /*HTML*/ `
        <div id=${PAGE_ID}>
            ${this.game.createChessGameHtml()}
        </div>
    `;
    }

    public updateView() {
        this.chessPageContainer.innerHTML = this.createHTML();
    }

    // private updateBoardContainerView() {
    //     const element = document.getElementById(BOARD_CONTAINER_ID);
    //     if (element == null) return;

    //     element.innerHTML = this.board.createBoardHtml();
    // }

    // public rotateBoard() {
    //     this.board.rotateBoard = !this.board.rotateBoard;
    //     this.updateBoardContainerView();
    // }

    // updateView(): void {
    //     this.chessPageContainer.style.display = "block";
    // }
    hide(): void {
        this.chessPageContainer.style.display = "none";
    }
    update(): void {}
}

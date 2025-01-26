import { ChessBoard } from "./chess_board.js";
import { Move } from "./move.js";
import { ChessPiece, Color } from "./pieces/chess_piece.js";
import { SortedChessPieces } from "./sorted_chessPieces.js";

const BOARD_CONTAINER_ID = "chess-board-container";
const CHESS_GAME_CONTAINER_ID = "chess-game";

export class ChessGame {
    private board: ChessBoard;
    public readonly moves: Move[] = [];
    private takenPieces: SortedChessPieces = new SortedChessPieces();
    private player: Color | null = null;

    constructor() {
        this.board = new ChessBoard(this);
    }

    setPlayer(player: Color) {
        this.player = player;
    }

    public updateView() {
        const gameContainer = document.getElementById(CHESS_GAME_CONTAINER_ID);
        if (gameContainer) gameContainer.outerHTML = this.createChessGameHtml();
    }

    public createChessGameHtml(): string {
        return /*Html*/ `
        <div id=${CHESS_GAME_CONTAINER_ID}> 
            <div id="taken-pieces-container" class="${
                this.board.rotateBoard ? "column-reverse" : ""
            }">
                ${this.createTakenPiecesHtml(Color.BLACK)}
                ${this.createTakenPiecesHtml(Color.WHITE)}
            </div>

            ${this.board.createBoardHtml()}

            <div id="moves-list">
                ${this.createMovesHtml()}
            </div>
        </div>
        `;
    }

    public createTakenPiecesHtml(color: Color): string {
        let takenPieces = "";
        for (const piece of this.takenPieces.values()) {
            if (piece.color !== color) continue;
            const pieceSvg = piece.pieceGraphic();
            pieceSvg.classList.add("taken-piece");
            takenPieces += pieceSvg.outerHTML;
        }
        return /*html*/ `<div class="taken-pieces">${takenPieces}</div>`;
    }

    private createMovesHtml() {
        let moves = "";
        for (const move of this.moves) {
            moves += move.createMoveHtml();
        }
        return moves;
    }

    public rotateBoard() {
        this.board.rotateBoard = !this.board.rotateBoard;
        this.updateBoardContainerView();
    }

    public addTakenPiece(piece: ChessPiece) {
        this.takenPieces.add(piece);
    }

    private updateBoardContainerView() {
        const element = document.getElementById(BOARD_CONTAINER_ID);
        if (element == null) return;

        element.outerHTML = this.board.createBoardHtml();
    }
}

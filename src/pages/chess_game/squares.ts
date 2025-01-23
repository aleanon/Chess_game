import { ChessPiece, Color } from "./pieces/chess_piece.js";
import { Position } from "./position.js";

const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

export class Square {
    public readonly position: Position;
    private piece: ChessPiece | null;
    public can_move_to: boolean = false;
    private contestedByBlack: boolean = false;
    private contestedByWhite: boolean = false;
    private color: string;

    constructor(piece: ChessPiece | null, position: Position) {
        this.piece = piece;
        this.position = position;
        this.color = (position.row + position.col) % 2 === 0 ? "light" : "dark";
    }

    chessPiece(): ChessPiece | null {
        return this.piece;
    }

    takePiece(): ChessPiece | null {
        const takenPiece = this.piece;
        this.piece = null;
        return takenPiece;
    }

    placePiece(piece: ChessPiece) {
        this.piece = piece;
    }

    shouldHighlight(): boolean {
        return this.can_move_to;
    }

    removeHighlight() {
        this.can_move_to = false;
    }

    hasSameColorPiece(color: Color): boolean {
        return this.piece != null && this.piece.color === color;
    }

    setContestedBy(color: Color) {
        if (color === Color.WHITE) {
            this.contestedByWhite = true;
        } else {
            this.contestedByBlack = true;
        }
    }

    removeContestedBy(color: Color) {
        if (color === Color.WHITE) {
            this.contestedByWhite = false;
        } else {
            this.contestedByBlack = false;
        }
    }

    contestedByNone() {
        this.contestedByBlack = false;
        this.contestedByWhite = false;
    }

    isContestedBy(color: Color): boolean {
        return color === Color.WHITE
            ? this.contestedByWhite
            : this.contestedByBlack;
    }

    public updateSquareView() {
        const squareElement = document.getElementById(this.position.name);
        if (squareElement) {
            squareElement.outerHTML = this.createSquarehtml();
        }
    }

    public createSquarehtml(): string {
        const highlighting = this.can_move_to ? "highlight" : "";

        return /* HTML */ `
            <div
                id=${this.position.name}
                class="square ${this.color} ${highlighting}"
            >
                ${this.createSquareContentHtml()}
            </div>
        `;
    }

    private createSquareContentHtml(): string {
        return /* HTML */ `
            <div
                class="square-content ${this.piece != null ? "clickable" : ""}"
                onclick="${this.createOnclick()}"
            >
                ${this.piece?.svg() ?? ""}
            </div>
        `;
    }

    private createOnclick() {
        return this.can_move_to
            ? `window.model.getCurrentPage().board.moveTo(${this.position.row}, ${this.position.col})`
            : `window.model.getCurrentPage().board.selectSquare(${this.position.row}, ${this.position.col})`;
    }
}

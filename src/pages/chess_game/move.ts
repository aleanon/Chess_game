import { ChessPiece, Color, PieceType } from "./pieces/chess_piece";
import { Position } from "./position.js";

export class Move {
    public readonly from: Position;
    public readonly to: Position;
    public readonly piece: ChessPiece;
    public readonly takenPiece: ChessPiece | null = null;

    constructor(
        from: Position,
        to: Position,
        movedPiece: ChessPiece,
        takenPiece: ChessPiece | null = null
    ) {
        this.from = from;
        this.to = to;
        this.piece = movedPiece;
        this.takenPiece = takenPiece;
    }

    createMoveHtml() {
        const takenPiece = this.takenPiece
            ? `<div class="taken-piece">${this.takenPiece.svg()}</div>`
            : "";

        return /*html*/ `
            <div class="move">
                <div class="moved-piece">${this.piece.svg()}</div>
                <div class="from-position">${this.from}</div>
                <div class="to-position">${this.to}</div>
                ${takenPiece}
            </div>
        `;
    }
}

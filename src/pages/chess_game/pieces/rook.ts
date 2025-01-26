import { Position } from "../position.js";
import { Square } from "../square.js";
import { ChessPiece, Color, isWithinBounds, PieceType } from "./chess_piece.js";
import { parseSVG } from "./common.js";
import { ROOK_SVG } from "./svg/rook.js";

const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

export class Rook implements ChessPiece {
    readonly color: Color;
    isSelected: boolean = false;
    position: Position;

    constructor(color: Color, position: Position) {
        this.color = color;
        this.position = position;
    }

    public pieceGraphic(): HTMLElement {
        return parseSVG(this.svg());
    }

    public svg(): string {
        return this.color === Color.WHITE ? ROOK_SVG.white : ROOK_SVG.black;
    }

    public calculateMoves(fromPosition: Position, squares: Square[][]) {
        for (const [rowDir, colDir] of directions) {
            let row = fromPosition.row + rowDir;
            let col = fromPosition.col + colDir;

            while (isWithinBounds(row, col)) {
                const square = squares[row][col];
                const pieceAtPosition = square.chessPiece();
                if (pieceAtPosition !== null) {
                    if (pieceAtPosition.color != this.color) {
                        square.highlight = true;
                    }
                    break;
                }
                square.highlight = true;
                row += rowDir;
                col += colDir;
            }
        }
    }

    public pieceType(): PieceType {
        return PieceType.ROOK;
    }

    public opponentColor(): Color {
        if (this.color === Color.WHITE) return Color.BLACK;
        return Color.WHITE;
    }

    public contestSquares(fromPosition: Position, squares: Square[][]) {
        for (const [rowDir, colDir] of directions) {
            let row = fromPosition.row + rowDir;
            let col = fromPosition.col + colDir;

            while (isWithinBounds(row, col)) {
                const square = squares[row][col];
                const pieceAtPosition = square.chessPiece();
                if (pieceAtPosition !== null) {
                    square.setContestedBy(this.color);
                    break;
                }
                square.setContestedBy(this.color);
                row += rowDir;
                col += colDir;
            }
        }
    }
}

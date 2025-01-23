import { Position } from "../position.js";
import { Square } from "../squares.js";
import { ChessPiece, Color, isWithinBounds, PieceType } from "./chess_piece.js";
import { parseSVG } from "./common.js";
import { KING_SVG } from "./svg/king.js";
import { KNIGHT_SVG } from "./svg/knight.js";

const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

export class King implements ChessPiece {
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
        return this.color === Color.WHITE ? KING_SVG.white : KING_SVG.black;
    }

    public calculateMoves(fromPosition: Position, squares: Square[][]) {
        for (const [rowDir, colDir] of directions) {
            const row = fromPosition.row + rowDir;
            const col = fromPosition.col + colDir;

            if (
                !isWithinBounds(row, col) ||
                !this.isValidMove(row, col, squares)
            )
                continue;

            squares[row][col].highlight = true;
        }
    }

    public pieceType(): PieceType {
        return PieceType.KING;
    }

    public opponentColor(): Color {
        if (this.color === Color.WHITE) return Color.BLACK;
        return Color.WHITE;
    }

    private isValidMove(
        row: number,
        column: number,
        squares: Square[][]
    ): boolean {
        const piece = squares[row][column].chessPiece();
        return (
            (piece === null || piece?.color !== this.color) &&
            !squares[row][column].isContestedBy(this.opponentColor())
        );
    }

    public contestSquares(fromPosition: Position, squares: Square[][]) {
        for (const [rowDir, colDir] of directions) {
            const row = fromPosition.row + rowDir;
            const col = fromPosition.col + colDir;

            if (!isWithinBounds(row, col)) continue;

            squares[row][col].setContestedBy(this.color);
        }
    }
}

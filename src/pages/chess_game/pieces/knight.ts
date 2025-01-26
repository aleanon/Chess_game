import { Position } from "../position.js";
import { Square } from "../square.js";
import { ChessPiece, Color, isWithinBounds, PieceType } from "./chess_piece.js";
import { parseSVG } from "./common.js";
import { KNIGHT_SVG } from "./svg/knight.js";

const directions = [
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
];

export class Knight implements ChessPiece {
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
        return this.color === Color.WHITE ? KNIGHT_SVG.white : KNIGHT_SVG.black;
    }
    public calculateMoves(fromPosition: Position, squares: Square[][]) {
        for (const [rowDir, colDir] of directions) {
            const [row, col] = [
                fromPosition.row + rowDir,
                fromPosition.col + colDir,
            ];
            if (
                !isWithinBounds(row, col) ||
                !this.isValidMove(row, col, squares)
            )
                continue;

            squares[row][col].highlight = true;
        }
    }

    public pieceType(): PieceType {
        return PieceType.KNIGHT;
    }

    public opponentColor(): Color {
        if (this.color === Color.WHITE) return Color.BLACK;
        return Color.WHITE;
    }

    private isValidMove(
        row: number,
        col: number,
        squares: Square[][]
    ): boolean {
        const square = squares[row][col];
        return (
            square.chessPiece() === null ||
            square.chessPiece()?.color !== this.color
        );
    }

    public contestSquares(fromPosition: Position, squares: Square[][]) {
        for (const [rowDir, colDir] of directions) {
            const [row, col] = [
                fromPosition.row + rowDir,
                fromPosition.col + colDir,
            ];
            if (!isWithinBounds(row, col)) continue;

            squares[row][col].setContestedBy(this.color);
        }
    }
}

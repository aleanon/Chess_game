import { Position } from "../position.js";
import { Square } from "../squares.js";
import { ChessPiece, Color, isWithinBounds, PieceType } from "./chess_piece.js";
import { parseSVG } from "./common.js";
import { KING_SVG } from "./svg/king.js";
import { KNIGHT_SVG } from "./svg/knight.js";

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

    public potentialMoves(
        fromPosition: Position,
        squares: Square[][]
    ): Position[][] {
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

        const moves: Position[][] = [];

        for (const [rowDir, colDir] of directions) {
            const newRow = fromPosition.row + rowDir;
            const newCol = fromPosition.col + colDir;

            if (
                !isWithinBounds(
                    newRow,
                    newCol || !this.isValidMove(newRow, newCol, squares)
                )
            )
                continue;
            const pos = Position.new(newRow, newCol);
            moves.push([pos]);
        }

        return moves;
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
        return squares[row][column];
    }
}

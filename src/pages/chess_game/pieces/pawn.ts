import { Position } from "../position.js";
import { Square } from "../squares.js";
import { ChessPiece, Color, isWithinBounds, PieceType } from "./chess_piece.js";
import { parseSVG } from "./common.js";
import { PAWN_SVG } from "./svg/pawn.js";

export class Pawn implements ChessPiece {
    readonly color: Color;
    private hasMovedTwoPositions: boolean = false;
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
        return this.color === Color.WHITE ? PAWN_SVG.white : PAWN_SVG.black;
    }

    public calculateMoves(fromPosition: Position, squares: Square[][]) {
        const takeDirections = this.takeDirections();
        let [rowDir, colDir] = this.moveDirection();

        let row = fromPosition.row + rowDir;
        let col = fromPosition.col + colDir;

        if (this.isValidMove(row, col, squares)) {
            squares[row][col].highlight = true;

            if (
                this.isFirstMove() &&
                squares[row + rowDir][col].chessPiece() == null
            ) {
                squares[row + rowDir][col].highlight = true;
            }
        }

        for (let [takeRowDir, takeColDir] of takeDirections) {
            row = fromPosition.row + takeRowDir;
            col = fromPosition.col + takeColDir;
            if (this.isValidAttack(row, col, squares)) {
                squares[row][col].highlight = true;
            }
        }
    }

    public pieceType(): PieceType {
        return PieceType.PAWN;
    }

    private isValidMove(
        row: number,
        column: number,
        squares: Square[][]
    ): boolean {
        return row >= 0 && row < 8 && squares[row][column].chessPiece() == null;
    }

    private isValidAttack(
        row: number,
        column: number,
        squares: Square[][]
    ): boolean {
        return (
            row >= 0 &&
            row < 8 &&
            column >= 0 &&
            column < 8 &&
            squares[row][column].chessPiece() != null &&
            squares[row][column].chessPiece()?.color !== this.color
        );
    }

    private isFirstMove() {
        if (this.color == Color.WHITE) {
            return this.position.row === 6;
        } else {
            return this.position.row === 1;
        }
    }

    private moveDirection() {
        if (this.color === Color.WHITE) {
            return [-1, 0];
        } else {
            return [1, 0];
        }
    }

    private takeDirections() {
        if (this.color === Color.WHITE) {
            return [
                [-1, -1],
                [-1, 1],
            ];
        } else {
            return [
                [1, -1],
                [1, 1],
            ];
        }
    }

    public opponentColor(): Color {
        if (this.color === Color.WHITE) return Color.BLACK;
        return Color.WHITE;
    }

    public contestSquares(fromPosition: Position, squares: Square[][]) {
        const takeDirections = this.takeDirections();

        for (let [takeRowDir, takeColDir] of takeDirections) {
            const row = fromPosition.row + takeRowDir;
            const col = fromPosition.col + takeColDir;
            if (isWithinBounds(row, col)) {
                squares[row][col].setContestedBy(this.color);
            }
        }
    }
}

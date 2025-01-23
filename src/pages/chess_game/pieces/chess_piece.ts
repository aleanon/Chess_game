import { Position } from "../position";
import { Square } from "../squares";

export enum Color {
    WHITE = "white",
    BLACK = "black",
}

export enum PieceType {
    PAWN = "Pawn",
    KNIGHT = "Knight",
    BISHOP = "Bishop",
    ROOK = "Rook",
    QUEEN = "Queen",
    KING = "King",
}

export interface ChessPiece {
    readonly color: Color;
    position: Position;

    // public abstract move(): void;

    pieceGraphic(): HTMLElement;

    svg(): string;

    calculateMoves(fromPosition: Position, squares: Square[][]): void;

    pieceType(): PieceType;

    opponentColor(): Color;

    contestSquares(fromPosition: Position, squares: Square[][]): void;
}

export function isWithinBounds(row: number, column: number): boolean {
    return row >= 0 && row < 8 && column >= 0 && column < 8;
}

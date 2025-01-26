import { Position } from "../position";
import { Square } from "../square";

export enum Color {
    WHITE = "white",
    BLACK = "black",
}

export enum PieceType {
    PAWN,
    KNIGHT,
    BISHOP,
    ROOK,
    QUEEN,
    KING,
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

export function pieceTypeToString(pieceType: PieceType): string {
    switch (pieceType) {
        case PieceType.PAWN:
            return "Pawn";
        case PieceType.KNIGHT:
            return "Knight";
        case PieceType.BISHOP:
            return "Bishop";
        case PieceType.ROOK:
            return "Rook";
        case PieceType.QUEEN:
            return "Queen";
        case PieceType.KING:
            return "King";
    }
}

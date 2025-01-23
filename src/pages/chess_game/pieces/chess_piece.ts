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

    potentialMoves(fromPosition: Position, squares: Square[][]): Position[][];

    pieceType(): PieceType;
}

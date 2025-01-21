import { Position } from "../position";

export enum Color {
    WHITE = "white",
    BLACK = "black",
}

export interface ChessPiece {
    readonly color: Color;
    position: Position;

    // public abstract move(): void;

    pieceGraphic(): HTMLElement;

    svg(): string;

    potentialMoves(fromPosition: Position): Position[][];
}

import { Position } from "../position";

export enum Color {
    WHITE = "white",
    BLACK = "#000000",
}

export interface ChessPiece {
    readonly color: Color;
    isSelected: boolean;
    position: Position;

    // public abstract move(): void;

    pieceGraphic(): HTMLElement;

    svg(): string;

    potentialMoves(fromPosition: Position): Position[][];
}

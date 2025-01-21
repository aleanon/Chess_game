import { Position } from "../position.js";
import { ChessPiece, Color } from "./chess_piece.js";
import { parseSVG } from "./common.js";
import { PAWN_SVG } from "./svg/pawn.js";

export class Pawn implements ChessPiece {
    readonly color: Color;
    private hasMovedTwoPositions: boolean = false;
    private hasMoved: boolean = false;
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

    public potentialMoves(fromPosition: Position): Position[][] {
        const takeDirections = [[-1]];
        const possibleMoves: Position[][] = [];
        if (this.hasMoved && fromPosition.row < 7)
            possibleMoves.push([
                Position.new(fromPosition.row + 1, fromPosition.col),
            ]);
        if (!this.hasMoved)
            possibleMoves.push([
                Position.new(fromPosition.row + 2, fromPosition.col),
            ]);

        return possibleMoves;
    }
}

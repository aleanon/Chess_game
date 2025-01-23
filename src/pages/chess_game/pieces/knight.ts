import { Position } from "../position.js";
import { ChessPiece, Color, isWithinBounds, PieceType } from "./chess_piece.js";
import { parseSVG } from "./common.js";
import { KNIGHT_SVG } from "./svg/knight.js";

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
    public potentialMoves(fromPosition: Position): Position[][] {
        const moves: Position[][] = [];

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

        for (let dir = 0; dir < directions.length; dir++) {
            const [dirRow, dirCol] = directions[dir];
            const [newRow, newCol] = [
                fromPosition.row + dirRow,
                fromPosition.col + dirCol,
            ];
            if (!isWithinBounds(newRow, newCol)) continue;
            moves.push([Position.new(newRow, newCol)]);
        }
        return moves;
    }

    public pieceType(): PieceType {
        return PieceType.KNIGHT;
    }

    public opponentColor(): Color {
        if (this.color === Color.WHITE) return Color.BLACK;
        return Color.WHITE;
    }
}

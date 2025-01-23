import { Position } from "../position.js";
import { ChessPiece, Color, PieceType } from "./chess_piece.js";
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

    public potentialMoves(fromPosition: Position): Position[][] {
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

        return directions
            .map(([rowDir, colDir]) => {
                const newRow = fromPosition.row + rowDir;
                const newCol = fromPosition.col + colDir;

                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    const pos = Position.new(newRow, newCol);
                    return [pos];
                }
                return null;
            })
            .filter((move): move is Position[] => move !== null);
    }

    public pieceType(): PieceType {
        return PieceType.KING;
    }
}

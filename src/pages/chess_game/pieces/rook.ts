import { Position } from "../position.js";
import { ChessPiece, Color } from "./chess_piece.js";
import { parseSVG } from "./common.js";
import { ROOK_SVG } from "./svg/rook.js";

export class Rook implements ChessPiece {
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
        return this.color === Color.WHITE ? ROOK_SVG.white : ROOK_SVG.black;
    }

    public potentialMoves(fromPosition: Position): Position[][] {
        const directions = [
            [0, 1], //Right
            [0, -1], //Left
            [1, 0], //Up
            [-1, 0], //Down
        ];

        const moves: Position[][] = [[], [], [], []];

        for (let dir = 0; dir < directions.length; dir++) {
            const [rowDir, colDir] = directions[dir];

            let row = fromPosition.row + rowDir;
            let col = fromPosition.col + colDir;

            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                const pos = Position.new(row, col);
                moves[dir].push(pos);
                row += rowDir;
                col += colDir;
            }
        }

        return moves;
    }
}

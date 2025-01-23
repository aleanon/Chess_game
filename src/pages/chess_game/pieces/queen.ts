import { Position } from "../position.js";
import { ChessPiece, Color, PieceType } from "./chess_piece.js";
import { parseSVG } from "./common.js";
import { QUEEN_SVG } from "./svg/queen.js";

export class Queen implements ChessPiece {
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
        return this.color === Color.WHITE ? QUEEN_SVG.white : QUEEN_SVG.black;
    }

    public potentialMoves(fromPosition: Position): Position[][] {
        const directions = [
            [1, -1],
            [1, 0],
            [1, 1],
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1, 0],
            [-1, 1],
        ];

        const moves: Position[][] = [[], [], [], [], [], [], [], []];

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

    public pieceType(): PieceType {
        return PieceType.QUEEN;
    }

    public opponentColor(): Color {
        if (this.color === Color.WHITE) return Color.BLACK;
        return Color.WHITE;
    }
}

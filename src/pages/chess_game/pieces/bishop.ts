import { Position } from "../position.js";
import { Square } from "../squares.js";
import { ChessPiece, Color, PieceType } from "./chess_piece.js";
import { parseSVG } from "./common.js";
import { BISHOP_SVG } from "./svg/bishop.js";

export class Bishop implements ChessPiece {
    public readonly color: Color;
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
        return this.color === Color.WHITE ? BISHOP_SVG.white : BISHOP_SVG.black;
    }

    public potentialMoves(
        fromPosition: Position,
        squares: Square[][]
    ): Position[][] {
        const directions = [
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
        ];

        const moves: Position[][] = [[], [], [], []];

        for (let dir = 0; dir < 4; dir++) {
            const [rowDir, colDir] = directions[dir];
            let row = fromPosition.row + rowDir;
            let col = fromPosition.col + colDir;

            while (this.isWithinBounds(row, col)) {
                const pieceAtPosition = squares[row][col].chessPiece();
                if (pieceAtPosition !== null) {
                }
                const pos = Position.new(row, col);
                moves[dir].push(pos);
                row += rowDir;
                col += colDir;
            }
        }

        return moves;
    }

    public pieceType(): PieceType {
        return PieceType.BISHOP;
    }

    private isWithinBounds(row: number, col: number): boolean {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }
}

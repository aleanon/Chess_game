import { Position } from "../position.js";
import { Square } from "../squares.js";
import { ChessPiece, Color, isWithinBounds, PieceType } from "./chess_piece.js";
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

    public potentialMoves(
        fromPosition: Position,
        squares: Square[][]
    ): Position[][] {
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

            while (isWithinBounds(row, col)) {
                const pieceAtPosition = squares[row][col].chessPiece();
                if (pieceAtPosition !== null) {
                    if (pieceAtPosition.color != this.color) {
                        moves[dir].push(Position.new(row, col));
                    }
                    break;
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
        return PieceType.ROOK;
    }

    public opponentColor(): Color {
        if (this.color === Color.WHITE) return Color.BLACK;
        return Color.WHITE;
    }
}

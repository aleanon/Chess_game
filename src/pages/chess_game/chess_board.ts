import { Bishop } from "./pieces/bishop.js";
import { ChessPiece, Color } from "./pieces/chess_piece.js";
import { King } from "./pieces/king.js";
import { Knight } from "./pieces/knight.js";
import { Pawn } from "./pieces/pawn.js";
import { Queen } from "./pieces/queen.js";
import { Rook } from "./pieces/rook.js";
import { Position } from "./position.js";
import { Square } from "./squares.js";

const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
const BOARD_ID = "chess-board";

export class ChessBoard {
    private squares: Square[][];
    private selectedPiece: ChessPiece | null = null;

    constructor() {
        this.squares = this.constructNewBoard();
    }

    private constructNewBoard(): Square[][] {
        let newBoard: Square[][] = [];

        newBoard.push(this.constructOfficersRow(0, Color.BLACK));
        newBoard.push(this.constructPawnRow(1, Color.BLACK));

        for (let rowIndex = 2; rowIndex < 6; rowIndex++) {
            newBoard.push(this.constructEmptyRow(rowIndex));
        }

        newBoard.push(this.constructPawnRow(6, Color.WHITE));
        newBoard.push(this.constructOfficersRow(7, Color.WHITE));
        return newBoard;
    }

    private constructOfficersRow(rowIndex: number, color: Color): Square[] {
        return [
            new Square(
                new Rook(color, Position.new(rowIndex, 0)),
                Position.new(rowIndex, 0)
            ),
            new Square(
                new Knight(color, Position.new(rowIndex, 1)),
                Position.new(rowIndex, 1)
            ),
            new Square(
                new Bishop(color, Position.new(rowIndex, 2)),
                Position.new(rowIndex, 2)
            ),
            new Square(
                new Queen(color, Position.new(rowIndex, 3)),
                Position.new(rowIndex, 3)
            ),
            new Square(
                new King(color, Position.new(rowIndex, 4)),
                Position.new(rowIndex, 4)
            ),
            new Square(
                new Bishop(color, Position.new(rowIndex, 5)),
                Position.new(rowIndex, 5)
            ),
            new Square(
                new Knight(color, Position.new(rowIndex, 6)),
                Position.new(rowIndex, 6)
            ),
            new Square(
                new Rook(color, Position.new(rowIndex, 7)),
                Position.new(rowIndex, 7)
            ),
        ];
    }

    private constructPawnRow(rowIndex: number, color: Color): Square[] {
        const row: Square[] = [];
        for (let colIndex = 0; colIndex < 8; colIndex++) {
            row.push(
                new Square(
                    new Pawn(color, Position.new(rowIndex, colIndex)),
                    Position.new(rowIndex, colIndex)
                )
            );
        }
        return row;
    }

    private constructEmptyRow(rowIndex: number): Square[] {
        const row: Square[] = [];
        for (let colIndex = 0; colIndex < 8; colIndex++) {
            row.push(new Square(null, Position.new(rowIndex, colIndex)));
        }
        return row;
    }

    createBoardHtml(): string {
        return /*HTML*/ `
            <div id="${BOARD_ID}" class="chess-board">
                ${this.createBoardRowsHtml()}
            </div>
        `;
    }

    private createBoardRowsHtml(): string {
        let rows = "";

        for (let row of this.squares) {
            rows += this.createRowHtml(row);
        }

        return rows;
    }

    private createRowHtml(squares: Square[]): string {
        let row = "";
        row += `<div class="board-row">`;

        for (let square of squares) {
            row += square.createSquarehtml();
        }

        row += `</div>`;

        return row;
    }

    public selectPiece(row: number, column: number) {
        this.selectedPiece = this.squares[row][column].chessPiece();
        this.removeAnyHighlights();

        if (this.selectedPiece === null) return;

        const potentialMoves = this.selectedPiece.potentialMoves(
            this.selectedPiece.position
        );
        const moves = this.filterImpossibleMoves(
            potentialMoves,
            this.selectedPiece.color
        );
        this.highlightSquares(moves);
    }

    filterImpossibleMoves(moves: Position[][], pieceColor: Color): Position[] {
        const validMoves: Position[] = [];
        for (let row of moves) {
            for (let position of row) {
                const chessPiece =
                    this.squares[position.row][position.col].chessPiece();
                if (chessPiece != null) {
                    if (chessPiece.color === pieceColor) break;
                    validMoves.push(position);
                    break;
                }
                validMoves.push(position);
            }
        }
        return validMoves;
    }

    highlightSquares(positions: Position[]): void {
        positions.forEach((position) => {
            const squareElement = document.getElementById(position.name);
            if (squareElement) {
                squareElement.classList.add("highlight");
            }
        });
    }

    removeAnyHighlights() {
        const squares = document.getElementsByClassName("square");
        for (let square of squares) {
            square.classList.remove("highlight");
        }
    }
}

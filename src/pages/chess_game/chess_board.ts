import { Bishop } from "./pieces/bishop.js";
import { ChessPiece, Color } from "./pieces/chess_piece.js";
import { King } from "./pieces/king.js";
import { Knight } from "./pieces/knight.js";
import { Pawn } from "./pieces/pawn.js";
import { Queen } from "./pieces/queen.js";
import { Rook } from "./pieces/rook.js";
import { Position } from "./position.js";
import { model } from "../../model.js";

const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
const BOARD_ID = "chess-board";

export class ChessBoard {
    private board: (ChessPiece | null)[][];
    private selectedPiece: ChessPiece | null = null;

    constructor() {
        this.board = this.constructNewBoard();
    }

    private constructNewBoard(): (ChessPiece | null)[][] {
        let newBoard: (ChessPiece | null)[][] = [];

        newBoard.push(this.constructOfficersRow(0, Color.WHITE));
        newBoard.push(this.constructPawnRow(1, Color.WHITE));

        for (let i = 0; i < 4; i++) {
            newBoard.push(Array(8).fill(null));
        }

        newBoard.push(this.constructPawnRow(6, Color.BLACK));
        newBoard.push(this.constructOfficersRow(7, Color.BLACK));
        return newBoard;
    }

    private constructOfficersRow(
        rowId: number,
        color: Color
    ): (ChessPiece | null)[] {
        return [
            new Rook(color, Position.new(rowId, 0)),
            new Knight(color, Position.new(rowId, 1)),
            new Bishop(color, Position.new(rowId, 2)),
            new Queen(color, Position.new(rowId, 3)),
            new King(color, Position.new(rowId, 4)),
            new Bishop(color, Position.new(rowId, 5)),
            new Knight(color, Position.new(rowId, 6)),
            new Rook(color, Position.new(rowId, 7)),
        ];
    }

    private constructPawnRow(
        rowId: number,
        color: Color
    ): (ChessPiece | null)[] {
        const column: (ChessPiece | null)[] = [];
        for (let colId = 0; colId < 8; colId++) {
            column.push(new Pawn(color, Position.new(rowId, colId)));
        }
        return column;
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

        for (let row = 8; row >= 1; row--) {
            rows += this.createRowHtml(row);
        }

        return rows;
    }

    private createRowHtml(rowNr: number): string {
        let row = "";
        row += `<div class="board-row">`;

        for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
            row += this.createSquarehtml(rowNr, columnIndex);
        }

        row += `</div>`;

        return row;
    }

    private createSquarehtml(rowNr: number, columnIndex: number): string {
        const column = columns[columnIndex];
        const squareColor = (rowNr + columnIndex) % 2 === 0 ? "light" : "dark";
        const piece = this.board[rowNr - 1][columnIndex];
        const position = piece
            ? piece.position
            : Position.new(rowNr - 1, columnIndex);
        const squareContent = piece ? this.createPieceHtml(piece) : "";

        return /* HTML */ `
            <div id=${position} class="square ${squareColor}">
                ${squareContent}
                ${columnIndex == 0 ? `<div class='row-id'>${rowNr}</div>` : ""}
                ${rowNr == 1 ? `<div class='column-id'>${column}</div>` : ""}
            </div>
        `;
    }

    private createPieceHtml(piece: ChessPiece): string {
        return /* HTML */ `
            <div
                class="square-content"
                onclick="(window.model.page as ChessGame)
                    .board
                    .selectPiece(${piece.position.row}, ${piece.position.col})"
            >
                ${piece.svg()}
            </div>
        `;
    }

    public selectPiece(row: number, column: number) {
        this.selectedPiece = this.board[row][column];
        if (this.selectedPiece === null) {
            this.removeAnyHighlights();
            return;
        }

        const potentialMoves = this.selectedPiece.potentialMoves(
            Position.new(row, column)
        );
        const moves = this.filterImpossibleMoves(
            potentialMoves,
            this.selectedPiece.color
        );
        this.highlightSquares(moves);
    }

    filterImpossibleMoves(moves: Position[][], pieceColor: Color): Position[] {
        const validMoves: Position[] = [];
        for (let rowIndex = 0; rowIndex < moves.length; rowIndex++) {
            const rowMoves = moves[rowIndex];
            for (
                let columnIndex = 0;
                columnIndex < rowMoves.length;
                columnIndex++
            ) {
                const move = rowMoves[columnIndex];
                const squareContent = this.board[move.row][move.col];
                if (squareContent != null) {
                    if (squareContent.color === pieceColor) break;
                    validMoves.push(move);
                    break;
                }
                validMoves.push(move);
            }
        }
        return validMoves;
    }

    highlightSquares(positions: Position[]): void {
        positions.forEach((position) => {
            const squareElement = document.getElementById(position.name);
            if (squareElement) {
                squareElement.classList.add("highlighted");
            }
        });
    }

    removeAnyHighlights() {
        const squares = document.getElementsByClassName("square");
        for (let square of squares) {
            square.classList.remove("highlighted");
        }
    }
}

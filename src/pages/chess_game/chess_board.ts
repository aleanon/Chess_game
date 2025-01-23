import { Bishop } from "./pieces/bishop.js";
import { ChessPiece, Color } from "./pieces/chess_piece.js";
import { King } from "./pieces/king.js";
import { Knight } from "./pieces/knight.js";
import { Pawn } from "./pieces/pawn.js";
import { Queen } from "./pieces/queen.js";
import { Rook } from "./pieces/rook.js";
import { Position } from "./position.js";
import { Square } from "./squares.js";

const BOARD_ID = "chess-board";

export class ChessBoard {
    private squares: Square[][];
    private selectedPiece: ChessPiece | null = null;
    private player_color: Color = Color.WHITE;
    private rotateBoard: boolean;

    constructor() {
        this.squares = this.constructNewBoard();
        this.rotateBoard = this.player_color === Color.BLACK;
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

    public updateBoardView() {
        this.squares.forEach((row) => {
            row.forEach((square) => square.updateSquareView());
        });
    }

    createBoardHtml(): string {
        return /*HTML*/ ` 
        <div class="board-wrapper">
            <div class="rank-labels ${
                this.rotateBoard ? "column-reverse" : ""
            }">
                <div>8</div>
                <div>7</div>
                <div>6</div>
                <div>5</div>
                <div>4</div>
                <div>3</div>
                <div>2</div>
                <div>1</div>
            </div>

            <div id="${BOARD_ID}" class="chess-board ${
            this.rotateBoard ? "column-reverse" : ""
        }">
                    ${this.createBoardRowsHtml()}
            </div>
           
            
            <div class="file-labels ${this.rotateBoard ? "row-reverse" : ""}">
                <div>a</div>
                <div>b</div>
                <div>c</div>
                <div>d</div>
                <div>e</div>
                <div>f</div>
                <div>g</div>
                <div>h</div>
            </div>
            </div>`;
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
        row += `<div class="board-row ${
            this.rotateBoard ? "row-reverse" : ""
        }">`;

        for (let square of squares) {
            row += square.createSquarehtml();
        }

        row += `</div>`;

        return row;
    }

    public selectSquare(row: number, column: number) {
        const selectedSquare = this.squares[row][column];
        this.selectedPiece = selectedSquare.chessPiece();
        this.removeHighlightingFromAllSquares();

        if (this.selectedPiece === null) {
            this.updateBoardView();
            return;
        }

        this.selectedPiece.calculateMoves(
            selectedSquare.position,
            this.squares
        );

        this.updateBoardView();
    }

    removeHighlightingFromAllSquares() {
        this.squares.forEach((row) => {
            row.forEach((square) => {
                square.highlight = false;
            });
        });
    }

    moveTo(row: number, col: number) {
        if (this.selectedPiece == null) return;

        const currentSquare =
            this.squares[this.selectedPiece.position.row][
                this.selectedPiece.position.col
            ];
        const piece = currentSquare.takePiece();
        const targetSquare = this.squares[row][col];
        if (piece == null)
            throw new Error("Attempted to move from a square without a piece");

        piece.position = targetSquare.position;
        targetSquare.placePiece(piece);
        this.selectedPiece = null;
        this.removeHighlightingFromAllSquares();
        this.recalculateContestion();
        this.updateBoardView();
    }

    recalculateContestion() {
        this.squares.forEach((row) => {
            row.forEach((square) => square.contestedByNone());
        });

        this.squares.forEach((row) => {
            row.forEach((square) => {
                square
                    .chessPiece()
                    ?.contestSquares(square.position, this.squares);
            });
        });
    }
}

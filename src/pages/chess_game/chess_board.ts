import { model } from "../../model.js";
import { ChessGame } from "./chess_game.js";
import { Move } from "./move.js";
import { Bishop } from "./pieces/bishop.js";
import { ChessPiece, Color } from "./pieces/chess_piece.js";
import { King } from "./pieces/king.js";
import { Knight } from "./pieces/knight.js";
import { Pawn } from "./pieces/pawn.js";
import { Queen } from "./pieces/queen.js";
import { Rook } from "./pieces/rook.js";
import { Position, POSITIONS } from "./position.js";
import { Square } from "./square.js";

const BOARD_ID = "chess-board";
const BOARD_CONTAINER_ID = "chess-board-container";

export class ChessBoard {
    private game: ChessGame;
    private squares: Square[][];
    private selectedPiece: ChessPiece | null = null;
    private player_color: Color = Color.WHITE;
    private moves: Move[];
    public rotateBoard: boolean;

    constructor(game: ChessGame) {
        this.squares = this.constructNewBoard();
        this.rotateBoard = this.player_color === Color.BLACK;
        this.game = game;
        this.moves = [];
    }

    private constructNewBoard(): Square[][] {
        let newBoard: Square[][] = [];

        newBoard.push(this.constructOfficersRow(POSITIONS[0], Color.BLACK));
        newBoard.push(this.constructPawnRow(POSITIONS[1], Color.BLACK));

        for (const positions of POSITIONS.slice(2, 6)) {
            newBoard.push(this.constructEmptyRow(positions));
        }

        newBoard.push(this.constructPawnRow(POSITIONS[6], Color.WHITE));
        newBoard.push(this.constructOfficersRow(POSITIONS[7], Color.WHITE));
        return newBoard;
    }

    private constructOfficersRow(
        positions: Position[],
        color: Color
    ): Square[] {
        return [
            new Square(new Rook(color, positions[0]), positions[0], this),
            new Square(new Knight(color, positions[1]), positions[1], this),
            new Square(new Bishop(color, positions[2]), positions[2], this),
            new Square(new Queen(color, positions[3]), positions[3], this),
            new Square(new King(color, positions[4]), positions[4], this),
            new Square(new Bishop(color, positions[5]), positions[5], this),
            new Square(new Knight(color, positions[6]), positions[6], this),
            new Square(new Rook(color, positions[7]), positions[7], this),
        ];
    }

    private constructPawnRow(positions: Position[], color: Color): Square[] {
        const row: Square[] = [];
        for (const position of positions) {
            row.push(new Square(new Pawn(color, position), position, this));
        }
        return row;
    }

    private constructEmptyRow(positions: Position[]): Square[] {
        const row: Square[] = [];
        for (const position of positions) {
            row.push(new Square(null, position, this));
        }
        return row;
    }

    createBoardHtml(): string {
        return /*HTML*/ ` 
        <div id="${BOARD_CONTAINER_ID}">
            <div class="player-info"></div>
            ${this.createBoardContentHtml()}
            <div class="player-info"></div>
        </div>`;
    }

    private createBoardContentHtml(): string {
        return /*html*/ `
            <div class="board-wrapper">
                <div class="rank-labels ${
                    this.rotateBoard ? "column-reverse" : ""
                }">
                    <div class="rank-label">8</div>
                    <div class="rank-label">7</div>
                    <div class="rank-label">6</div>
                    <div class="rank-label">5</div>
                    <div class="rank-label">4</div>
                    <div class="rank-label">3</div>
                    <div class="rank-label">2</div>
                    <div class="rank-label">1</div>
                </div>

                <div id="${BOARD_ID}" class="chess-board ${
            this.rotateBoard ? "column-reverse" : ""
        }">
                                ${this.createBoardRowsHtml()}
                </div>
                
                <div class="file-labels ${
                    this.rotateBoard ? "row-reverse" : ""
                }">
                    <div class="file-label">a</div>
                    <div class="file-label">b</div>
                    <div class="file-label">c</div>
                    <div class="file-label">d</div>
                    <div class="file-label">e</div>
                    <div class="file-label">f</div>
                    <div class="file-label">g</div>
                    <div class="file-label">h</div>
                </div>
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
        row += `<div class="board-row ${
            this.rotateBoard ? "row-reverse" : ""
        }">`;

        for (let square of squares) {
            row += square.createSquarehtml();
        }

        row += `</div>`;

        return row;
    }

    public updateBoardView() {
        const element = document.getElementById(BOARD_CONTAINER_ID);
        if (element == null) return;

        element.innerHTML = this.createBoardHtml();
    }

    public updateSquaresView() {
        this.squares.forEach((row) => {
            row.forEach((square) => square.updateSquareView());
        });
    }

    public selectSquare(row: number, column: number) {
        const selectedSquare = this.squares[row][column];
        this.selectedPiece = selectedSquare.chessPiece();
        this.removeHighlightingFromAllSquares();

        if (this.selectedPiece === null) {
            this.updateSquaresView();
            return;
        }

        selectedSquare.selected = true;
        this.selectedPiece.calculateMoves(
            selectedSquare.position,
            this.squares
        );

        this.updateSquaresView();
    }

    private removeHighlightingFromAllSquares() {
        this.squares.forEach((row) => {
            row.forEach((square) => {
                square.highlight = false;
                square.partOfLastMove = false;
                square.selected = false;
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
        const move = new Move(
            currentSquare.position,
            targetSquare.position,
            piece,
            targetSquare.chessPiece()
        );
        this.moves.push(move);
        this.selectedPiece = null;
        this.removeHighlightingFromAllSquares();
        currentSquare.partOfLastMove = true;
        targetSquare.partOfLastMove = true;
        this.recalculateContestion();
        model.updateView();
    }

    private recalculateContestion() {
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

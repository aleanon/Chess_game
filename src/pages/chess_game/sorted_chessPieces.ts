import { ChessPiece } from "./pieces/chess_piece";

export class SortedChessPieces {
    private pieces: Set<ChessPiece> = new Set<ChessPiece>();

    constructor() {
        this.pieces = new Set();
    }

    add(piece: ChessPiece): void {
        this.pieces.delete(piece);
        this.pieces = new Set(
            [...this.pieces].sort((a, b) => a.pieceType() - b.pieceType())
        );
        this.pieces.add(piece);
    }

    values(): ChessPiece[] {
        return Array.from(this.pieces);
    }
}

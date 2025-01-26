export class Position {
    constructor(
        public readonly name: string,
        readonly row: number,
        readonly col: number
    ) {}

    public pathToPosition(position: Position): Position[] {
        const path: Position[] = [];
        let currentRow = this.row;
        let currentCol = this.col;
        const targetRow = position.row;
        const targetCol = position.col;

        while (currentRow !== targetRow || currentCol !== targetCol) {
            if (currentRow < targetRow) currentRow++;
            else if (currentRow > targetRow) currentRow--;

            if (currentCol < targetCol) currentCol++;
            else if (currentCol > targetCol) currentCol--;

            path.push(POSITIONS[currentRow][currentCol]);
        }

        return path;
    }
}

export const POSITIONS = [
    [
        new Position("A8", 0, 0),
        new Position("B8", 0, 1),
        new Position("C8", 0, 2),
        new Position("D8", 0, 3),
        new Position("E8", 0, 4),
        new Position("F8", 0, 5),
        new Position("G8", 0, 6),
        new Position("H8", 0, 7),
    ],
    [
        new Position("A7", 1, 0),
        new Position("B7", 1, 1),
        new Position("C7", 1, 2),
        new Position("D7", 1, 3),
        new Position("E7", 1, 4),
        new Position("F7", 1, 5),
        new Position("G7", 1, 6),
        new Position("H7", 1, 7),
    ],
    [
        new Position("A6", 2, 0),
        new Position("B6", 2, 1),
        new Position("C6", 2, 2),
        new Position("D6", 2, 3),
        new Position("E6", 2, 4),
        new Position("F6", 2, 5),
        new Position("G6", 2, 6),
        new Position("H6", 2, 7),
    ],
    [
        new Position("A5", 3, 0),
        new Position("B5", 3, 1),
        new Position("C5", 3, 2),
        new Position("D5", 3, 3),
        new Position("E5", 3, 4),
        new Position("F5", 3, 5),
        new Position("G5", 3, 6),
        new Position("H5", 3, 7),
    ],
    [
        new Position("A4", 4, 0),
        new Position("B4", 4, 1),
        new Position("C4", 4, 2),
        new Position("D4", 4, 3),
        new Position("E4", 4, 4),
        new Position("F4", 4, 5),
        new Position("G4", 4, 6),
        new Position("H4", 4, 7),
    ],
    [
        new Position("A3", 5, 0),
        new Position("B3", 5, 1),
        new Position("C3", 5, 2),
        new Position("D3", 5, 3),
        new Position("E3", 5, 4),
        new Position("F3", 5, 5),
        new Position("G3", 5, 6),
        new Position("H3", 5, 7),
    ],
    [
        new Position("A2", 6, 0),
        new Position("B2", 6, 1),
        new Position("C2", 6, 2),
        new Position("D2", 6, 3),
        new Position("E2", 6, 4),
        new Position("F2", 6, 5),
        new Position("G2", 6, 6),
        new Position("H2", 6, 7),
    ],
    [
        new Position("A1", 7, 0),
        new Position("B1", 7, 1),
        new Position("C1", 7, 2),
        new Position("D1", 7, 3),
        new Position("E1", 7, 4),
        new Position("F1", 7, 5),
        new Position("G1", 7, 6),
        new Position("H1", 7, 7),
    ],
];

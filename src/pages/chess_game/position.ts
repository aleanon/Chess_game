export class Position {
    static readonly A1 = new Position("A1", 0, 0);
    static readonly B1 = new Position("B1", 0, 1);
    static readonly C1 = new Position("C1", 0, 2);
    static readonly D1 = new Position("D1", 0, 3);
    static readonly E1 = new Position("E1", 0, 4);
    static readonly F1 = new Position("F1", 0, 5);
    static readonly G1 = new Position("G1", 0, 6);
    static readonly H1 = new Position("H1", 0, 7);

    static readonly A2 = new Position("A2", 1, 0);
    static readonly B2 = new Position("B2", 1, 1);
    static readonly C2 = new Position("C2", 1, 2);
    static readonly D2 = new Position("D2", 1, 3);
    static readonly E2 = new Position("E2", 1, 4);
    static readonly F2 = new Position("F2", 1, 5);
    static readonly G2 = new Position("G2", 1, 6);
    static readonly H2 = new Position("H2", 1, 7);

    static readonly A3 = new Position("A3", 2, 0);
    static readonly B3 = new Position("B3", 2, 1);
    static readonly C3 = new Position("C3", 2, 2);
    static readonly D3 = new Position("D3", 2, 3);
    static readonly E3 = new Position("E3", 2, 4);
    static readonly F3 = new Position("F3", 2, 5);
    static readonly G3 = new Position("G3", 2, 6);
    static readonly H3 = new Position("H3", 2, 7);

    static readonly A4 = new Position("A4", 3, 0);
    static readonly B4 = new Position("B4", 3, 1);
    static readonly C4 = new Position("C4", 3, 2);
    static readonly D4 = new Position("D4", 3, 3);
    static readonly E4 = new Position("E4", 3, 4);
    static readonly F4 = new Position("F4", 3, 5);
    static readonly G4 = new Position("G4", 3, 6);
    static readonly H4 = new Position("H4", 3, 7);

    static readonly A5 = new Position("A5", 4, 0);
    static readonly B5 = new Position("B5", 4, 1);
    static readonly C5 = new Position("C5", 4, 2);
    static readonly D5 = new Position("D5", 4, 3);
    static readonly E5 = new Position("E5", 4, 4);
    static readonly F5 = new Position("F5", 4, 5);
    static readonly G5 = new Position("G5", 4, 6);
    static readonly H5 = new Position("H5", 4, 7);

    static readonly A6 = new Position("A6", 5, 0);
    static readonly B6 = new Position("B6", 5, 1);
    static readonly C6 = new Position("C6", 5, 2);
    static readonly D6 = new Position("D6", 5, 3);
    static readonly E6 = new Position("E6", 5, 4);
    static readonly F6 = new Position("F6", 5, 5);
    static readonly G6 = new Position("G6", 5, 6);
    static readonly H6 = new Position("H6", 5, 7);

    static readonly A7 = new Position("A7", 6, 0);
    static readonly B7 = new Position("B7", 6, 1);
    static readonly C7 = new Position("C7", 6, 2);
    static readonly D7 = new Position("D7", 6, 3);
    static readonly E7 = new Position("E7", 6, 4);
    static readonly F7 = new Position("F7", 6, 5);
    static readonly G7 = new Position("G7", 6, 6);
    static readonly H7 = new Position("H7", 6, 7);

    static readonly A8 = new Position("A8", 7, 0);
    static readonly B8 = new Position("B8", 7, 1);
    static readonly C8 = new Position("C8", 7, 2);
    static readonly D8 = new Position("D8", 7, 3);
    static readonly E8 = new Position("E8", 7, 4);
    static readonly F8 = new Position("F8", 7, 5);
    static readonly G8 = new Position("G8", 7, 6);
    static readonly H8 = new Position("H8", 7, 7);

    private constructor(
        public readonly name: string,
        readonly row: number,
        readonly col: number
    ) {}

    static new(row: number, col: number): Position {
        return new Position(
            `${String.fromCharCode(65 + col)}${row + 1}`,
            row,
            col
        );
    }
}

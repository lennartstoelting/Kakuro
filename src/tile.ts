export class Tile {
    constructor() {
        // Common properties and methods for all tiles
    }
    // Common properties and methods for all tiles
}

export class PlayableTile extends Tile {
    possibleNumbers: number;

    constructor(possibleNumbers: number) {
        super();
        this.possibleNumbers = possibleNumbers;
    }

    // 001000000 -> 7
    // 110110100 -> 0
    onlyPossibleNumber(): number {
        if (this.possibleNumbers.toString(2).split("1").length > 2) {
            return 0;
        }
        return this.possibleNumbers.toString(2).split("1")[1].length + 1;
    }
}

export class UnplayableTile extends Tile {
    colSum: number;
    rowSum: number;

    constructor(colSum: number, rowSum: number) {
        super();
        this.colSum = colSum;
        this.rowSum = rowSum;
    }

    isEmpty(): boolean {
        return this.colSum === 0 && this.rowSum === 0;
    }
}

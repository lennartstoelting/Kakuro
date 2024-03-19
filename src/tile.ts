class Tile {
    // Common properties and methods for all tiles
}

class PlayableTile extends Tile {
    possibleNumbers: number;

    // 001000000 -> 7
    // 110110100 -> 0
    onlyPossibleNumber(): number {
        if (this.possibleNumbers.toString(2).split("1").length > 2) {
            return 0;
        }
        return this.possibleNumbers.toString(2).split("1")[1].length + 1;
    }
}

class UnplayableTile extends Tile {
    colSum: number;
    rowSum: number;

    isEmpty(): boolean {
        return this.colSum === 0 && this.rowSum === 0;
    }
}

export class Tile {}

export class PlayableTile extends Tile {
    num: number;

    constructor(num: number) {
        super();
        this.num = num;
    }

    // 001000000 -> 7
    // 110110100 -> 0
    onlyPossibleNumber(): number {
        if (this.num.toString(2).split("1").length > 2) {
            return 0;
        }
        return this.num.toString(2).split("1")[1].length + 1;
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

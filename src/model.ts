export class Model {
    matrix: number[][];
    sumTable: number[][][];

    constructor(level: number[][]) {
        this.matrix = this.initBinaryMatrix(level);
        this.sumTable = this.initSumTable();
    }

    /**
     * 000000 000000 000000000
     * col    row    candidates
     * if the number is zero, the tile is unplayable
     */
    private initBinaryMatrix(matrix: number[][]): number[][] {
        let newMatrix: any[][] = [];
        matrix.forEach((row, y) => {
            let rowArray: number[] = [];
            row.forEach((tile, x) => {
                if (tile === 0) {
                    rowArray.push(0);
                    return;
                }
                if (tile === 1) {
                    rowArray.push(parseInt("1".repeat(9), 2));
                    return;
                }

                // for all other cases, we see them as a decimal number.
                // the 0th bit is 0,
                // then the next 6 bit incript the two numbers to the right of the comma,
                // and the last 6 bit incript the two numbers to the left of the comma
                let colAndRow = tile
                    .toFixed(2)
                    .split(".")
                    .map((sum) => parseInt(sum));

                // error handling
                if (colAndRow.length !== 2) {
                    throw new Error("invalid input matrix at x: " + x + " and y: " + y);
                }
                if (colAndRow[0] > 45 || colAndRow[0] == 2 || colAndRow[0] == 1) {
                    throw new Error("invalid input matrix: sum of col at y: " + y + " and x: " + x + " is given as " + colAndRow[0]);
                }
                if (colAndRow[1] > 45 || colAndRow[1] == 2 || colAndRow[1] == 1) {
                    throw new Error("invalid input matrix: sum of row at y: " + y + " and x: " + x + " is given as " + colAndRow[1]);
                }

                rowArray.push(((colAndRow[0] << 6) | (colAndRow[1] << 0)) << 9);
            });
            newMatrix.push(rowArray);
        });
        return newMatrix;
    }

    /**
     *
     * [[],                         0
     *  [],                         1
     *  [],                         2
     *  [[],[],[3]],                3
     *  [[],[],[5]],                4
     *  [[],[],[6,9]],              5
     *  [[],[],[10,17],[7]]]        6
     *  [[],[],[33,18, 12],[11]]    7
     *
     * @returns a 45x9x? table with all possible combinations of 2 to 9 numbers and their sum as the first index
     */
    private initSumTable(): number[][][] {
        // create a 45x9x? empty array
        let table: number[][][] = Array(46)
            .fill(0)
            .map(() =>
                Array(10)
                    .fill(0)
                    .map(() => [])
            );

        for (let binCombination = 3; binCombination <= parseInt("111111111", 2); binCombination++) {
            let candidatesDecArr = this.candidatesAsReadableArray(binCombination);
            let sum = candidatesDecArr.reduce((acc, cur) => acc + cur, 0);
            table[sum][candidatesDecArr.length].push(binCombination);
        }

        return table;
    }

    public solveAll(): void {
        let changesMade = true;
        let solvingSteps = -1;

        while (changesMade) {
            let oldMatrix = JSON.parse(JSON.stringify(this.matrix));
            this.solveStep();
            changesMade = JSON.stringify(oldMatrix) !== JSON.stringify(this.matrix);
            solvingSteps++;
        }

        console.log(`solved in ${solvingSteps} steps`);
    }

    public solveStep(): void {
        this.matrix.forEach((row, y) => {
            row.forEach((tile, x) => {
                if (!(tile & 511)) {
                    return;
                }
                this.solveTile(y, x);
            });
        });

        return;
    }

    public solveTile(y: number, x: number): void {
        let colSuperPosition = this.permutations(y, x, true);
        let rowSuperPosition = this.permutations(y, x, false);

        this.matrix[y][x] &= colSuperPosition & rowSuperPosition;
        return;
    }

    /**
     * @param isCol
     * @returns
     */
    permutations(y: number, x: number, isCol: boolean): number {
        let info = isCol ? this.getColumnInfo(y, x) : this.getRowInfo(y, x);
        let permutations = this.sumTable[info.sum][info.tiles.length];

        // general setup
        let otherCandidates: number[] = [];
        info.tiles.forEach((tile: { y: number; x: number }) => {
            permutations = permutations.filter((permutation) => permutation & this.matrix[tile.y][tile.x]);
            if (tile.x === x && tile.y === y) return;
            otherCandidates.push(this.matrix[tile.y][tile.x]);
        });

        // sudoku rules
        let candidatesCounted = otherCandidates.reduce((cnt: any, cur: any) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});
        for (const [key, value] of Object.entries(candidatesCounted)) {
            if (this.candidatesAsReadableArray(parseInt(key)).length !== value) continue;
            this.matrix[y][x] &= ~parseInt(key);
            permutations = permutations.filter((permutation) => (permutation & parseInt(key)) == parseInt(key));
        }

        // individual candidate checking
        let candidatesInOtherTilesCombined = this.reduceToSuperposition(otherCandidates);
        this.candidatesAsReadableArray(this.matrix[y][x]).forEach((num) => {
            let candidateNotation = 2 ** (num - 1);
            let permutationsWithThisNum = permutations.filter((permutation) => permutation & candidateNotation);
            permutationsWithThisNum = permutationsWithThisNum.map((permutation) => permutation & ~candidateNotation);

            let specificCandidateWorksOut = false;
            permutationsWithThisNum.forEach((permutation) => {
                if ((permutation & candidatesInOtherTilesCombined) !== permutation) return;
                specificCandidateWorksOut = true;
            });
            if (specificCandidateWorksOut) return;
            this.matrix[y][x] &= ~candidateNotation;
        });

        return this.reduceToSuperposition(permutations);
    }

    private getColumnInfo(y: number, x: number): { sum: number; tiles: { y: number; x: number }[] } {
        while (y >= 0 && this.matrix[y][x] & 511) {
            y--;
        }
        let colCoordinates: { y: number; x: number }[] = [];
        while (y + colCoordinates.length < 9 && this.matrix[y + colCoordinates.length + 1][x] & 511) {
            colCoordinates.push({ y: y + colCoordinates.length + 1, x: x });
        }

        return { sum: this.matrix[y][x] >> 15, tiles: colCoordinates };
    }

    private getRowInfo(y: number, x: number): { sum: number; tiles: { y: number; x: number }[] } {
        while (x >= 0 && this.matrix[y][x] & 511) {
            x--;
        }
        let rowCoordinates: { y: number; x: number }[] = [];
        while (x + rowCoordinates.length < 9 && this.matrix[y][x + rowCoordinates.length + 1] & 511) {
            rowCoordinates.push({ y: y, x: x + rowCoordinates.length + 1 });
        }

        return { sum: (this.matrix[y][x] >> 9) & 63, tiles: rowCoordinates };
    }

    private candidatesAsReadableArray(binary: number): number[] {
        let candidates: number[] = [];
        for (let i = 0; i < 9; i++) {
            if (binary & (2 ** i)) {
                candidates.push(i + 1);
            }
        }
        return candidates;
    }

    private reduceToSuperposition(permutations: number[]): number {
        return permutations.reduce((acc, cur) => acc | cur, 0);
    }
}

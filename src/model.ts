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
     * this function does the following 3 steps:
     *
     * 1. a general check
     * 2. a check for "sudoku rules"
     * 3. a check for individual candidates (we check for all candidates in this tile, if they work out to form a valid permutation with the other candidates in the neighboring tiles)
     *
     * @param isCol
     * @returns all the candidates that are possible for the tile at y, x
     */
    private permutations(y: number, x: number, isCol: boolean): number {
        let info = isCol ? this.getColumnInfo(y, x) : this.getRowInfo(y, x);
        let perms = this.sumTable[info.sum][info.tiles.length];

        // general
        // all the possible permutations reduced to only those that are possible with the candidates that are already set in this tile
        let neighbouringCandidates: number[] = [];
        info.tiles.forEach((tile: { y: number; x: number }) => {
            perms = perms.filter((perm) => perm & this.matrix[tile.y][tile.x]);

            // setup for steps 2 and 3
            if (tile.x === x && tile.y === y) return;
            neighbouringCandidates.push(this.matrix[tile.y][tile.x]);
        });

        // sudoku rules
        // example: if the row has two tiles in which only 8 and 9 are possible, the other tiles can't have 8 or 9 as a candidate
        // this is achieved by counting the amount of candidate combinations in all neighbouring tiles
        // in our example, the candidatesCounted would include {384: 2} (dec: 110 000 000) among other candidate combinations
        // then we check if the amount of occurance of a candidate combination is equal to the amount of tiles that have this candidate combination
        // if so, the 8 and 9 are set to be part of the permutation
        // so we can filter out the 8 and the 9 from this tile while generally  keeping only the permutations that include 8 and 9
        let candidatesCounted = neighbouringCandidates.reduce((cnt: any, cur: any) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});
        for (const [key, value] of Object.entries(candidatesCounted)) {
            if (this.candidatesAsReadableArray(parseInt(key)).length !== value) continue;
            this.matrix[y][x] &= ~parseInt(key);
            perms = perms.filter((perm) => (perm & parseInt(key)) == parseInt(key));
        }

        // individual candidate checking
        // example: if the current tile has the candidates 1 and 3, we look at each candidate individually
        // we check for the 1 and then the 3, if the neighbouring tiles can be filled with the remaining sum
        let candidatesInOtherTilesCombined = this.reduceToSuperposition(neighbouringCandidates);
        this.candidatesAsReadableArray(this.matrix[y][x]).forEach((num) => {
            let candidate = 2 ** (num - 1);
            let permsOfIndividual = perms.filter((perm) => perm & candidate);
            let permsWithoutCandidate = permsOfIndividual.map((perm) => perm & ~candidate);

            // when at least one of the permsWithoutCandidate can be achieved with any of the candidates in the neighbouring tiles, this candidate is true and can be kept
            if (permsWithoutCandidate.some((perm) => (perm & candidatesInOtherTilesCombined) === perm)) return;
            // otherwise, no permutation will work out with this individual candidate, so we can filter it out
            this.matrix[y][x] &= ~candidate;
        });

        return this.reduceToSuperposition(perms);
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

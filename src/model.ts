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
     * i want to do a general table where all the combinations of 2 up to 9 numbers are listed and the sum of them is calculated
     * the resulting sum is the index of where to find these combinations in the table
     * at that index, the combinations are stored as a 9 bit number, where the bit is 1 if the number is in the combination
     * the table is a 45 element array
     * at each index, the amount of numbers that make up the sum is stored at the index of it's amount
     * the matrix looks as follows:
     *
     * [[],                         0
     *  [],                         1
     *  [],                         2
     *  [[],[],[3]],                3
     *  [[],[],[5]],                4
     *  [[],[],[6,9]],              5
     *  [[],[],[10,17],[7]]]        6
     *  [[],[],[33,18, 12],[11]]    7
     * the first index is the sum (#45), the second index is the amount of numbers that make up the sum(#9),
     * each of the numbers from that point are meant to be read in binary, having a 1 everywhere the number is in the combination
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

        for (let binCombination = 1; binCombination <= parseInt("111111111", 2); binCombination++) {
            let candidatesDecArr = this.candidatesAsReadableArray(binCombination);
            let sum = candidatesDecArr.reduce((acc, cur) => acc + cur, 0);
            table[sum][candidatesDecArr.length].push(binCombination);
        }

        return table;
    }

    public solveAll(): void {
        let changesMade = true;
        while (changesMade) {
            let oldMatrix = JSON.parse(JSON.stringify(this.matrix));
            this.solveStep();
            changesMade = JSON.stringify(oldMatrix) !== JSON.stringify(this.matrix);
        }
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

        console.log("--- solved step ---");

        return;
    }

    public solveTile(y: number, x: number): void {
        let colInfo = this.getColumnInfo(y, x);
        let rowInfo = this.getRowInfo(y, x);

        // all permutations where the given jointTiles amount to sum
        let colPermutations = this.sumTable[colInfo.sum][colInfo.jointTiles.length];
        let rowPermutations = this.sumTable[rowInfo.sum][rowInfo.jointTiles.length];

        // removing permutations that don't include any of the tiles candidates
        colInfo.jointTiles.forEach((tile: { x: number; y: number }) => {
            colPermutations = colPermutations.filter((permutation) => permutation & this.matrix[tile.y][tile.x]);
        });
        rowInfo.jointTiles.forEach((tile: { x: number; y: number }) => {
            rowPermutations = rowPermutations.filter((permutation) => permutation & this.matrix[tile.y][tile.x]);
        });

        // --- sudoku rules ---

        let otherCandidatesinRow: number[] = [];
        rowInfo.jointTiles.forEach((tile: { x: number; y: number }) => {
            if (tile.x === x && tile.y === y) return;
            otherCandidatesinRow.push(this.matrix[tile.y][tile.x]);
        });
        let rowCandidatesCounted = otherCandidatesinRow.reduce((cnt: any, cur: any) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});
        for (const [key, value] of Object.entries(rowCandidatesCounted)) {
            if (this.candidatesAsReadableArray(parseInt(key)).length !== value) continue;
            // I can cross off the matrix candidates sudoku style
            this.matrix[y][x] &= ~parseInt(key);
            // and I can adapt the permutations
            rowPermutations = rowPermutations.filter((permutation) => (permutation & parseInt(key)) == parseInt(key));
        }

        let otherCandidatesinCol: number[] = [];
        colInfo.jointTiles.forEach((tile: { x: number; y: number }) => {
            if (tile.x === x && tile.y === y) return;
            otherCandidatesinCol.push(this.matrix[tile.y][tile.x]);
        });
        let colCandidatesCounted = otherCandidatesinCol.reduce((cnt: any, cur: any) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});
        for (const [key, value] of Object.entries(colCandidatesCounted)) {
            if (this.candidatesAsReadableArray(parseInt(key)).length !== value) continue;
            // I can cross off the matrix candidates sudoku style
            this.matrix[y][x] &= ~parseInt(key);
            // and I can adapt the permutations
            colPermutations = colPermutations.filter((permutation) => (permutation & parseInt(key)) == parseInt(key));
        }

        // --- end of sudoku rules ---

        // --- rule out permutations in other tiles based on possible permutations from this tile

        let possibleNumbers = this.candidatesAsReadableArray(this.matrix[y][x]);
        let leftoverColPermutations = 0;
        let leftoverRowPermutations = 0;

        possibleNumbers.forEach((num) => {
            let colPermutationsForNum = this.sumTable[colInfo.sum][colInfo.jointTiles.length].filter((permutation) => permutation & (2 ** (num - 1)));
            colPermutationsForNum = colPermutationsForNum.map((permutation) => permutation & ~(2 ** (num - 1)));
            colPermutationsForNum.forEach((permutation) => {
                leftoverColPermutations |= permutation;
            });

            let rowPermutationsForNum = this.sumTable[rowInfo.sum][rowInfo.jointTiles.length].filter((permutation) => permutation & (2 ** (num - 1)));
            rowPermutationsForNum = rowPermutationsForNum.map((permutation) => permutation & ~(2 ** (num - 1)));
            rowPermutationsForNum.forEach((permutation) => {
                leftoverRowPermutations |= permutation;
            });
        });

        colInfo.jointTiles.forEach((coords: { x: number; y: number }) => {
            if (coords.x === x && coords.y === y) return;
            this.matrix[coords.y][coords.x] &= leftoverColPermutations;
        });

        rowInfo.jointTiles.forEach((coords: { x: number; y: number }) => {
            if (coords.x === x && coords.y === y) return;
            this.matrix[coords.y][coords.x] &= leftoverRowPermutations;
        });

        // --- end of rule out permutations in other tiles based on possible permutations from this tile ---

        let colSuperPosition = this.reduceToSuperposition(colPermutations);
        let rowSuperPosition = this.reduceToSuperposition(rowPermutations);

        // temporary, needs to be made into several steps
        this.matrix[y][x] &= colSuperPosition & rowSuperPosition;

        return;
    }

    // private solveCombinedPermutations() {}

    private getColumnInfo(y: number, x: number): { sum: number; jointTiles: { x: number; y: number }[] } {
        while (y >= 0 && this.matrix[y][x] & 511) {
            y--;
        }
        let colCoordinates: { x: number; y: number }[] = [];
        while (y + colCoordinates.length < 9 && this.matrix[y + colCoordinates.length + 1][x] & 511) {
            colCoordinates.push({ y: y + colCoordinates.length + 1, x: x });
        }

        return { sum: this.matrix[y][x] >> 15, jointTiles: colCoordinates };
    }

    private getRowInfo(y: number, x: number): { sum: number; jointTiles: { x: number; y: number }[] } {
        while (x >= 0 && this.matrix[y][x] & 511) {
            x--;
        }
        let rowCoordinates: { x: number; y: number }[] = [];
        while (x + rowCoordinates.length < 9 && this.matrix[y][x + rowCoordinates.length + 1] & 511) {
            rowCoordinates.push({ y: y, x: x + rowCoordinates.length + 1 });
        }

        return { sum: (this.matrix[y][x] >> 9) & 63, jointTiles: rowCoordinates };
    }

    private reduceToSuperposition(permutations: number[]): number {
        return permutations.reduce((acc, cur) => {
            acc |= cur;
            return acc;
        }, 0);
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
}

/**
 * TODO:
 * - aesthetics:                make the colors prettier to look at in view (maybe only show little numbers if any sort of solving has been started)
 * - aesthetics + mechanics:    after each click of the solveStep button, color the tiles that have been affected by the solve change function (this requires to save a copy of the previous state of the matrix)
 * - mechanics:                 make a solveAll button that repeatedly/recursively calls the solve function until no more changes can be made
 * - readability:               make the code more readable by splitting the solveStep function into smaller functions if possible
 * - readability:               make the code more readable by adding comments to the code
 * - error handling:            add error handling for the case that the input matrix is not valid
 * - error handling:            add error handling for the case that the sum of the row or the column isn't valid
 *
 * DONE:
 * - rules:                     for easy[1], specify a rule that solves row 2 by realizing that only 8 and 9 are already fixed for the final permutation and adjust the other tiles accordingly
 * - rules:                     for easy[1], specify a rule that, in case some numbers are already fixed as the final numbers, reapplies the sumTable (if you have three tiles in a row and one is already safe, the sum of the other two tiles can be recalculated and tested against the sumTable)
 */

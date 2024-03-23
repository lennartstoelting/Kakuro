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
            let amountOfOnes = binCombination.toString(2).split("1").length - 1;
            let sum = 0;
            for (let j = 0; j < 9; j++) {
                if (binCombination & (2 ** j)) {
                    sum += j + 1;
                }
            }
            table[sum][amountOfOnes].push(binCombination);
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
                this.solveTile(tile, y, x);
            });
        });
        return;
    }

    public solveTile(candidates: number, y: number, x: number): void {
        // this way, I can wirte whatever I want into candidates without changing the matrix
        // only when I'm done, I can write the candidates back into the matrix
        // this.matrix[y][x] = candidates;

        let colInfo = this.getColumnInfo(y, x);
        let rowInfo = this.getRowInfo(y, x);

        // all permutations where the given jointTiles amount to sum
        let colPermutations = this.sumTable[colInfo.sum][colInfo.jointTiles.length];
        let rowPermutations = this.sumTable[rowInfo.sum][rowInfo.jointTiles.length];

        // filtered permutations by removing rued out candidates
        colPermutations = colPermutations.filter((permutation) => permutation & candidates);
        rowPermutations = rowPermutations.filter((permutation) => permutation & candidates);

        this.matrix[y][x] = this.reduceToSuperposition(colPermutations) & this.reduceToSuperposition(rowPermutations);

        return;
    }

    private getColumnInfo(y: number, x: number): any {
        while (y >= 0 && this.matrix[y][x] & 511) {
            y--;
        }
        let colCoordinates = [];
        while (y + colCoordinates.length < 9 && this.matrix[y + colCoordinates.length + 1][x] & 511) {
            colCoordinates.push({ y: y + colCoordinates.length + 1, x: x });
        }

        return { sum: this.matrix[y][x] >> 15, jointTiles: colCoordinates };
    }

    private getRowInfo(y: number, x: number): any {
        while (x >= 0 && this.matrix[y][x] & 511) {
            x--;
        }
        let rowCoordinates = [];
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

    // for pretty console output
    private visualizeStateOfTile(x: number, y: number): void {
        let candidateString = ("000000000" + this.matrix[y][x].toString(2)).slice(-9);
        console.log("State of Tile at x: " + x + " and y: " + y + " is " + candidateString);
    }

    //     public solveStep(): void {
    //         this.matrix.forEach((row, y) => {
    //             row.forEach((tile, x) => {
    //                 if (tile instanceof UnplayableTile) {
    //                     return;
    //                 }

    //                 let rowInfo = this.getRowInfo(y, x);
    //                 let colInfo = this.getColumnInfo(y, x);

    //                 // putting some of that info into specific variables for better readability might be helpful
    //                 // also, maybe to get rid of the necesseity of the .num at the end of each matrix call, I could consider having the matrix in the form of matrix: (UnplayableTile | number)[][]

    //                 // all permutations with given tile amount to sum
    //                 let rowPermutations = this.sumTable[rowInfo.sum][rowInfo.tileCoords.length];
    //                 let colPermutations = this.sumTable[colInfo.sum][colInfo.tileCoords.length];

    //                 rowPermutations = rowPermutations.filter((permutation) => permutation & tile.num);
    //                 colPermutations = colPermutations.filter((permutation) => permutation & tile.num);

    //                 // if the row (or column) is already has fixed tiles, the permutations have to include these fixed numbers
    //                 let fixedInRow = 0;
    //                 rowInfo.tileCoords.forEach((coords: any) => {
    //                     if (this.matrix[coords.y][coords.x].onlyPossibleNumber() !== 0) {
    //                         fixedInRow |= this.matrix[coords.y][coords.x].num;
    //                     }
    //                 });
    //                 let fixedInCol = 0;
    //                 colInfo.tileCoords.forEach((coords: any) => {
    //                     if (this.matrix[coords.y][coords.x].onlyPossibleNumber() !== 0) {
    //                         fixedInCol |= this.matrix[coords.y][coords.x].num;
    //                     }
    //                 });

    //                 // filter the permutations by the numbers that are already fixed in the tile, therefore having to be included in the final permutation
    //                 if (fixedInRow) {
    //                     rowPermutations = rowPermutations.filter((permutation) => (permutation & fixedInRow) === fixedInRow);
    //                 }
    //                 if (fixedInCol) {
    //                     colPermutations = colPermutations.filter((permutation) => (permutation & fixedInCol) === fixedInCol);
    //                 }

    //                 // for this current tile, the permutations are combined to a superposition
    //                 let combinedRowPermutations = this.reduceToSuperposition(rowPermutations);
    //                 let combinedColPermutations = this.reduceToSuperposition(colPermutations);

    //                 // the superposition includes the all leftover permutations after filtering, so the permutations in the other tiles in the row and column can be reduced
    //                 rowInfo.tileCoords.forEach((coords: any) => {
    //                     this.matrix[coords.y][coords.x].num &= combinedRowPermutations;
    //                 });

    //                 colInfo.tileCoords.forEach((coords: any) => {
    //                     this.matrix[coords.y][coords.x].num &= combinedColPermutations;
    //                 });

    //                 // both superpositions are being combined and then applied to the tile
    //                 tile.num &= combinedRowPermutations & combinedColPermutations;

    //                 this.sudokuRules(y, x);

    //             });
    //         });
    //     }

    //     private sudokuRules(y: number, x: number): void {
    //         // we check, how many possible numbers the current tile has
    //         // if the tile is already fixed, it should return 1 number
    //         let possibleNumbers = this.matrix[y][x].num.toString(2).split("1").length - 1;

    //         let colInfo = this.getColumnInfo(y, x);
    //         colInfo.tileCoords.forEach((coords: any) => {
    //             // within this if, there might be a way to fix/include the solution 8 for the tile at y: 1 and x: 6 on medium[0]
    //             if (this.matrix[coords.y][coords.x].num === this.matrix[y][x].num) {
    //                 possibleNumbers -= 1;
    //             }
    //         });
    //         if (possibleNumbers === 0) {
    //             colInfo.tileCoords.forEach((coords: any) => {
    //                 if (this.matrix[y][x].num == this.matrix[coords.y][coords.x].num) return;
    //                 this.matrix[coords.y][coords.x].num &= ~this.matrix[y][x].num;
    //             });
    //         }

    //         possibleNumbers = this.matrix[y][x].num.toString(2).split("1").length - 1;
    //         let rowInfo = this.getRowInfo(y, x);
    //         rowInfo.tileCoords.forEach((coords: any) => {
    //             if (this.matrix[coords.y][coords.x].num === this.matrix[y][x].num) {
    //                 possibleNumbers -= 1;
    //             }
    //         });
    //         if (possibleNumbers === 0) {
    //             rowInfo.tileCoords.forEach((coords: any) => {
    //                 if (this.matrix[y][x].num == this.matrix[coords.y][coords.x].num) return;
    //                 this.matrix[coords.y][coords.x].num &= ~this.matrix[y][x].num;
    //             });
    //         }
    //         return;
    //     }
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
 * - rules:                     for easy[1], specify a rule that, in case some numbers are already fixed as the final numbers, reapplies the sumTable (if you have three tiles in a row and one is already safe, the sum of the other two tiles can be recalculated and tested against the sumTable)
 * - rules:                     for easy[1], specify a rule that solves row 2 by realizing that only 8 and 9 are already fixed for the final permutation and adjust the other tiles accordingly
 *
 *
 */

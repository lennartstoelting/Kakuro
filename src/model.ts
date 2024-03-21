import { Tile, PlayableTile, UnplayableTile } from "./tile";

export class Model {
    matrix: any[][];
    sumTable: number[][][];

    constructor(level: number[][]) {
        this.matrix = this.initBinaryMatrix(level);
        this.sumTable = this.initSumTable();
    }

    initBinaryMatrix(matrix: number[][]): Tile[][] {
        let newMatrix: any[][] = [];
        matrix.forEach((row, y) => {
            let rowArray: Tile[] = [];
            row.forEach((tile, x) => {
                if (tile === 0) {
                    rowArray.push(new UnplayableTile(0, 0));
                    return;
                }
                if (tile === 1) {
                    rowArray.push(new PlayableTile(parseInt("1".repeat(9), 2)));
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

                rowArray.push(new UnplayableTile(colAndRow[0], colAndRow[1]));
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
    initSumTable(): number[][][] {
        // create a 45x9x? empty array
        let table: number[][][] = Array(46)
            .fill(0)
            .map(() =>
                Array(10)
                    .fill(0)
                    .map(() => [])
            );

        for (let binaryCombination = 1; binaryCombination <= parseInt("111111111", 2); binaryCombination++) {
            let amountOfOnes = binaryCombination.toString(2).split("1").length - 1;
            let sum = 0;
            for (let j = 0; j < 9; j++) {
                if (binaryCombination & (2 ** j)) {
                    sum += j + 1;
                }
            }
            // console.log("sum: " + sum + " amountOfOnes: " + amountOfOnes + " binaryCombination: " + binaryCombination.toString(2));
            table[sum][amountOfOnes].push(binaryCombination);
        }

        return table;
    }

    solve(): void {
        this.matrix.forEach((row, y) => {
            row.forEach((tile, x) => {
                if (tile instanceof UnplayableTile) {
                    return;
                }

                let rowInfo = this._getRowInfo(y, x);
                let colInfo = this._getColumnInfo(y, x);

                // all permutations with given tile amount to sum
                let rowPermutations = this.sumTable[rowInfo.sum][rowInfo.emptyTileCoords.length];
                let colPermutations = this.sumTable[colInfo.sum][colInfo.emptyTileCoords.length];

                rowPermutations = rowPermutations.filter((permutation) => permutation & tile.num);
                colPermutations = colPermutations.filter((permutation) => permutation & tile.num);

                // if the row (or column) is already has fixed tiles, the permutations have to include these fixed numbers
                let fixedInRow = 0;
                rowInfo.emptyTileCoords.forEach((coords: any) => {
                    if (this.matrix[coords[0]][coords[1]].onlyPossibleNumber() !== 0) {
                        fixedInRow |= this.matrix[coords[0]][coords[1]].num;
                    }
                });
                let fixedInCol = 0;
                colInfo.emptyTileCoords.forEach((coords: any) => {
                    if (this.matrix[coords[0]][coords[1]].onlyPossibleNumber() !== 0) {
                        fixedInCol |= this.matrix[coords[0]][coords[1]].num;
                    }
                });

                // filter the permutations by the numbers that are already fixed in the tile, therefore having to be included in the final permutation
                if (fixedInRow) {
                    rowPermutations = rowPermutations.filter((permutation) => (permutation & fixedInRow) === fixedInRow);
                }
                if (fixedInCol) {
                    colPermutations = colPermutations.filter((permutation) => (permutation & fixedInCol) === fixedInCol);
                }

                // for this current tile, the permutations are combined to a superposition
                let combinedRowPermutations = this._reduceToSuperposition(rowPermutations);
                let combinedColPermutations = this._reduceToSuperposition(colPermutations);

                // the superposition includes the all leftover permutations after filtering, so the permutations in the other tiles in the row and column can be reduced
                rowInfo.emptyTileCoords.forEach((coords: any) => {
                    this.matrix[coords[0]][coords[1]].num &= combinedRowPermutations;
                });

                colInfo.emptyTileCoords.forEach((coords: any) => {
                    this.matrix[coords[0]][coords[1]].num &= combinedColPermutations;
                });

                // both superpositions are being combined and then applied to the tile
                tile.num &= combinedRowPermutations & combinedColPermutations;

                this._sudokuRules(y, x);

                // debugging console logs

                // if (y < 3 && x == 6) {
                //     console.log(
                //         "y: " +
                //             y +
                //             " x: " +
                //             x +
                //             "\n" +
                //             "current State of tile: " +
                //             tile.num.toString(2) +
                //             "\n" +
                //             rowInfo.emptyTileCoords.length +
                //             " tiles in this row sum to " +
                //             rowInfo.sum +
                //             "\npossible rowPermutations " +
                //             rowPermutations.map((el) => el.toString(2)) +
                //             "\ncombinedRowPermutations " +
                //             combinedRowPermutations.toString(2) +
                //             "\n" +
                //             colInfo.emptyTileCoords.length +
                //             " tiles in this column sum to " +
                //             colInfo.sum +
                //             "\npossible colPermutations " +
                //             colPermutations.map((el) => el.toString(2)) +
                //             "\ncombinedColPermutations " +
                //             combinedColPermutations.toString(2)
                //     );
                // }
            });
        });
    }

    _reduceToSuperposition(permutations: number[]): number {
        return permutations.reduce((acc, cur) => {
            acc |= cur;
            return acc;
        }, 0);
    }

    _sudokuRules(y: number, x: number): void {
        // we check, how many possible numbers the current tile has
        // if the tile is already fixed, it should return 1 number
        let possibleNumbers = this.matrix[y][x].num.toString(2).split("1").length - 1;

        let colInfo = this._getColumnInfo(y, x);
        colInfo.emptyTileCoords.forEach((coords: any) => {
            if (this.matrix[coords[0]][coords[1]].num === this.matrix[y][x].num) {
                possibleNumbers -= 1;
            }
        });
        if (possibleNumbers === 0) {
            colInfo.emptyTileCoords.forEach((coords: any) => {
                if (this.matrix[y][x].num == this.matrix[coords[0]][coords[1]].num) return;
                this.matrix[coords[0]][coords[1]].num &= ~this.matrix[y][x].num;
            });
        }

        possibleNumbers = this.matrix[y][x].num.toString(2).split("1").length - 1;
        let rowInfo = this._getRowInfo(y, x);
        rowInfo.emptyTileCoords.forEach((coords: any) => {
            if (this.matrix[coords[0]][coords[1]].num === this.matrix[y][x].num) {
                possibleNumbers -= 1;
            }
        });
        if (possibleNumbers === 0) {
            rowInfo.emptyTileCoords.forEach((coords: any) => {
                if (this.matrix[y][x].num == this.matrix[coords[0]][coords[1]].num) return;
                this.matrix[coords[0]][coords[1]].num &= ~this.matrix[y][x].num;
            });
        }
        return;
    }

    /**
     * loops up to find the sum of the column
     * loops down from there to find the empty tiles below that sum
     * @returns array with the sum to the right and the amount of empty tiles in the column
     */
    _getColumnInfo(y: number, x: number): any {
        while (y >= 0 && this.matrix[y][x] instanceof PlayableTile) {
            y--;
        }
        let emptyTilesInfo = [];
        while (y + emptyTilesInfo.length < 9 && this.matrix[y + emptyTilesInfo.length + 1][x] instanceof PlayableTile) {
            emptyTilesInfo.push([y + emptyTilesInfo.length + 1, x]);
        }

        return { sum: this.matrix[y][x].colSum, emptyTileCoords: emptyTilesInfo };
    }

    _getRowInfo(y: number, x: number): any {
        while (x >= 0 && this.matrix[y][x] instanceof PlayableTile) {
            x--;
        }
        let emptyTilesInfo = [];
        while (x + emptyTilesInfo.length < 9 && this.matrix[y][x + emptyTilesInfo.length + 1] instanceof PlayableTile) {
            emptyTilesInfo.push([y, x + emptyTilesInfo.length + 1]);
        }

        return { sum: this.matrix[y][x].rowSum, emptyTileCoords: emptyTilesInfo };
    }
}

/**
 * TODO:
 * - aesthetics:                make the colors prettier to look at in view (maybe only show little numbers if any sort of solving has been started)
 * - aesthetics + mechanics:    after each click of the solve button, color the tiles that have been affected by the solve change function (this requires to save a copy of the previous state of the matrix)
 * - mechanics:                 make a solveAll button that repeatedly/recursively calls the solve function until no more changes can be made
 * - readability:               make the code more readable by splitting the solve function into smaller functions if possible
 * - readability:               make the code more readable by adding comments to the code
 * - error handling:            add error handling for the case that the input matrix is not valid
 * - error handling:            add error handling for the case that the sum of the row or the column isn't valid
 * - rules:                     for easy[1], specify a rule that, in case some numbers are already fixed as the final numbers, reapplies the sumTable (if you have three tiles in a row and one is already safe, the sum of the other two tiles can be recalculated and tested against the sumTable)
 * - rules:                     for easy[1], specify a rule that solves row 2 by realizing that only 8 and 9 are already fixed for the final permutation and adjust the other tiles accordingly
 */

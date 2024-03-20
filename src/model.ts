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
                    throw new Error("invalid input matrix: sum of col at x: " + x + " and y: " + y + " is given as " + colAndRow[0]);
                }
                if (colAndRow[1] > 45 || colAndRow[1] == 2 || colAndRow[1] == 1) {
                    throw new Error("invalid input matrix: sum of row at x: " + x + " and y: " + y + " is given as " + colAndRow[1]);
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

        for (let binaryCombination = 3; binaryCombination <= parseInt("111111111", 2); binaryCombination++) {
            let amountOfOnes = binaryCombination.toString(2).split("1").length - 1;
            if (amountOfOnes === 1) {
                continue;
            }
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

                let colInfo = this._getColumnInfo(y, x);
                let rowInfo = this._getRowInfo(y, x);

                // all permutations for amount of tiles in row that sum to the sum of the row (and column vice versa)
                let rowPermutations = this.sumTable[rowInfo.sum][rowInfo.emptyTileCoords.length];
                let colPermutations = this.sumTable[colInfo.sum][colInfo.emptyTileCoords.length];

                // filter the permutations by the numbers that are already fixed in the tile, therefor having to be included in the final permutation
                rowPermutations = rowPermutations.filter((permutation) => permutation & tile.num);
                colPermutations = colPermutations.filter((permutation) => permutation & tile.num);

                let combinedRowPermutations = this._reducePermutations(rowPermutations);
                let combinedColPermutations = this._reducePermutations(colPermutations);

                tile.num &= combinedRowPermutations & combinedColPermutations;

                // wenn ich jetzt bspw. in y : 1 x: 3 bin sollte ich ja einsehen, das nur noch die Zahlen 1 oder 2 möglich sind
                // also schaue ich, welche Permutationen aus der Liste noch übrig bleiben
                // in der rowPermutations Liste sind Kombinationen für die Zahl 8 auf zwei Feldern enthalten
                // 10100,100010,1000001 (5+3, 6+2, 7+1)
                // a nur noch die Zahlen 1 und 2 möglich sind, bleiben nur noch 1000001 (6+2) und 100010 (7+1) übrig
                // jetzt will ich nicht nur die dritte, überflüssige Permutation streichen, sondern auch in dem benachbarten Feld das einzige übrig lassen, was noch möglich ist
                // in diesem Falle sollte also auf y: 1 x: 2 nur noch die 7 und die 7 übrig bleiben

                rowInfo.emptyTileCoords.forEach((coords: any) => {
                    this.matrix[coords[0]][coords[1]].num &= combinedRowPermutations;
                    // console.log(coords);
                });

                this._sudokuRules(y, x);
                /*
                if (y == 1 && x <= 3) {
                    rowInfo.emptyTileCoords.forEach((coords: any) => {
                        if (coords[0] == y && coords[1] == x) {
                            return;
                        }
                        console.log(coords);
                    });

                    console.log(
                        "y: " +
                            y +
                            " x: " +
                            x +
                            "\n" +
                            "current State of tile: " +
                            tile.num.toString(2) +
                            "\n" +
                            rowInfo.emptyTileCoords.length +
                            " tiles in this row sum to " +
                            rowInfo.sum +
                            "\npossible rowPermutations " +
                            rowPermutations.map((el) => el.toString(2)) +
                            "\ncombinedRowPermutations " +
                            combinedRowPermutations.toString(2) +
                            "\n" +
                            colInfo.emptyTileCoords.length +
                            " tiles in this column sum to " +
                            colInfo.sum +
                            "\npossible colPermutations " +
                            colPermutations.map((el) => el.toString(2)) +
                            "\ncombinedColPermutations " +
                            combinedColPermutations.toString(2)
                    );
                }
                */
            });
        });
    }

    _reducePermutations(permutations: number[]): number {
        return permutations.reduce((acc, cur) => {
            acc |= cur;
            return acc;
        }, 0);
    }

    _sudokuRules(y: number, x: number): void {
        let onlyPossibleNumber = this.matrix[y][x].onlyPossibleNumber();
        if (!onlyPossibleNumber) {
            return;
        }

        let colInfo = this._getColumnInfo(y, x);
        colInfo.emptyTileCoords = colInfo.emptyTileCoords.filter((coord: any) => {
            return !(coord[0] === y && coord[1] === x);
        });
        colInfo.emptyTileCoords.forEach((coords: any) => {
            this.matrix[coords[0]][coords[1]].num &= ~this.matrix[y][x].num;
        });

        let rowInfo = this._getRowInfo(y, x);
        rowInfo.emptyTileCoords = rowInfo.emptyTileCoords.filter((coord: any) => {
            return !(coord[0] === y && coord[1] === x);
        });
        rowInfo.emptyTileCoords.forEach((coords: any) => {
            this.matrix[coords[0]][coords[1]].num &= ~this.matrix[y][x].num;
        });
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

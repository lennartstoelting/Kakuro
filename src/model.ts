class Model {
    matrix: number[][];
    sumTable: number[][][];

    constructor() {
        // grundsätzlich: unspielbar, Summenfeld, spielbar
        // Idee: 13 bit Zahl (bit 0: spielbar ja oder nein? bit 1-12: Summenfeld)
        this.matrix = this.initBinaryMatrix(easy1);
        this.sumTable = this.initSumTable();

        // console.log(this.matrix);
        // console.log(this.sumTable);
    }

    initBinaryMatrix(matrix: number[][]): number[][] {
        let binaryMatrix: number[][] = [];
        matrix.forEach((row, y) => {
            let binaryRow: number[] = [];
            row.forEach((tile, x) => {
                if (tile === 0) {
                    binaryRow.push(0);
                    return;
                }
                if (tile === 1) {
                    binaryRow.push(parseInt("1".repeat(10), 2));
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

                let colAndRowBinary = colAndRow.map((sum) => ("000000" + sum.toString(2)).slice(-6));
                let binary = parseInt(colAndRowBinary[0] + colAndRowBinary[1], 2) << 1;
                binaryRow.push(binary);
            });
            binaryMatrix.push(binaryRow);
        });
        return binaryMatrix;
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
        let yTest = 3;
        let xTest = 8;

        this.matrix.forEach((row, y) => {
            row.forEach((tile, x) => {
                // only solve the empty tiles
                if (!(this.matrix[y][x] & 1)) {
                    return;
                }

                this.matrix[y][x] &= this._crossReferenceSumTableEntries(y, x);
                this.matrix[y][x] &= this._sudokuRules(y, x);
                // next function: sudoku rules, checks in row and colum if there are already fixed numbers and removes them from the possible combinations
                // this one already might need to be a recursive function to gain of of each won step
                //
                // then functions could be the ones in cases where two tiles only each have two numbers left or three tiles each have three numbers left.
                // those can also be eliminated from the others, similar to sudoku rules
                // e.g. if two tiles only have 2 and 3 left, the other tiles can't have 2 and 3 in them
                //
                // also more functions with the sumtable, e.g. if for example in a row with three numbers, there is already a safe 7 in there, the only combinations left have to include a 7
                // this might get rid of some combinations in the sumtable
            });
        });

        // this.matrix[yTest][xTest] = parseInt("1101111111", 2);
    }

    _crossReferenceSumTableEntries(y: number, x: number): number {
        let colInfo = this._getColumnInfo(y, x);
        let rowInfo = this._getRowInfo(y, x);

        let rowCombinations = this.sumTable[rowInfo.sum][rowInfo.tileAmount].reduce((acc, cur) => {
            acc |= cur;
            return acc;
        }, 0);

        let colCombinations = this.sumTable[colInfo.sum][colInfo.tileAmount].reduce((acc, cur) => {
            acc |= cur;
            return acc;
        }, 0);

        let possibleCombinations = rowCombinations & colCombinations;
        return (possibleCombinations << 1) | 1;
    }
    /**
     * loops up to find the sum of the column
     * loops down from there to find the empty tiles below that sum
     * @returns array with the sum to the right and the amount of empty tiles in the column
     */
    _getColumnInfo(y: number, x: number): any {
        while (y >= 0 && this.matrix[y][x] & 1) {
            y--;
        }
        let emptyTilesInColumn = 1;
        while (y + emptyTilesInColumn < 9 && this.matrix[y + emptyTilesInColumn + 1][x] & 1) {
            emptyTilesInColumn++;
        }
        return { sum: (this.matrix[y][x] >> 7) & 63, tileAmount: emptyTilesInColumn };
    }

    _getRowInfo(y: number, x: number): any {
        while (x >= 0 && this.matrix[y][x] & 1) {
            x--;
        }
        let emptyTilesInRow = 1;
        while (x + emptyTilesInRow < 9 && this.matrix[y][x + emptyTilesInRow + 1] & 1) {
            emptyTilesInRow++;
        }
        return { sum: (this.matrix[y][x] >> 1) & 63, tileAmount: emptyTilesInRow };
        // return [(this.matrix[y][x] >> 1) & 63, emptyTilesInRow];
    }

    _sudokuRules(y: number, x: number): number {
        return 1023;
    }
}

export default Model;

const easy1: number[][] = [
    [0, 0, 45, 3, 0, 0, 0, 3, 45, 0],
    [0, 17.08, 1, 1, 0, 16, 4.03, 1, 1, 0],
    [0.11, 1, 1, 1, 16.17, 1, 1, 1, 1, 17],
    [0.17, 1, 1, 3.17, 1, 1, 1, 0.16, 1, 1],
    [0, 0.18, 1, 1, 1, 0, 0, 17.13, 1, 1],
    [0, 17.04, 1, 1, 0, 0, 3.11, 1, 1, 0],
    [0.09, 1, 1, 0, 16, 3.16, 1, 1, 1, 4],
    [0.14, 1, 1, 3.1, 1, 1, 1, 16.12, 1, 1],
    [0, 0.19, 1, 1, 1, 1, 0.18, 1, 1, 1],
    [0, 0.05, 1, 1, 0, 0, 0.1, 1, 1, 0],
];

const medium2: number[][] = [
    [0, 0, 29, 4, 0, 7, 34, 16, 0, 0],
    [0, 0.08, 1, 1, 3.17, 1, 1, 1, 0, 0],
    [0, 3.31, 1, 1, 1, 1, 1, 1, 0, 0],
    [0.1, 1, 1, 24.1, 1, 1, 1, 24, 0, 0],
    [0.16, 1, 1, 1, 15, 0.13, 1, 1, 0, 0],
    [0, 0, 0.13, 1, 1, 0.16, 1, 1, 10, 16],
    [0, 0, 0.1, 1, 1, 24, 3.16, 1, 1, 1],
    [0, 0, 0, 17.14, 1, 1, 1, 17.11, 1, 1],
    [0, 0, 0.3, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0.18, 1, 1, 1, 0.13, 1, 1, 0],
];

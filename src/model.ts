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
        let colSuperPosition = this.colPermutations(y, x);
        let rowSuperPosition = this.rowPermutations(y, x);

        this.matrix[y][x] &= colSuperPosition & rowSuperPosition;
        return;
    }

    colPermutations(y: number, x: number): number {
        let col = this.getColumnInfo(y, x);
        let colPermutations = this.sumTable[col.sum][col.tiles.length];

        let leftoverColPermutations = 0;
        this.candidatesAsReadableArray(this.matrix[y][x]).forEach((num) => {
            let candidateNotation = 2 ** (num - 1);
            let colPermutationsWithThisNum = colPermutations.filter((permutation) => permutation & candidateNotation);
            colPermutationsWithThisNum = colPermutationsWithThisNum.map((permutation) => permutation & ~candidateNotation);
            colPermutationsWithThisNum.forEach((permutation) => {
                leftoverColPermutations |= permutation;
            });
        });

        let otherCandidatesinCol: number[] = [];
        col.tiles.forEach((tile: { y: number; x: number }) => {
            // removing permutations that don't include any of the tiles candidates
            colPermutations = colPermutations.filter((permutation) => permutation & this.matrix[tile.y][tile.x]);
            if (tile.x === x && tile.y === y) return;
            // setup for sudoku rules
            otherCandidatesinCol.push(this.matrix[tile.y][tile.x]);
            // rule out permutations in other tiles based on possible permutations from this tile
            this.matrix[tile.y][tile.x] &= leftoverColPermutations;
        });

        let colCandidatesCounted = otherCandidatesinCol.reduce((cnt: any, cur: any) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});
        for (const [key, value] of Object.entries(colCandidatesCounted)) {
            if (this.candidatesAsReadableArray(parseInt(key)).length !== value) continue;
            // I can cross off the matrix candidates sudoku style
            this.matrix[y][x] &= ~parseInt(key);
            // and I can adapt the permutations
            colPermutations = colPermutations.filter((permutation) => (permutation & parseInt(key)) == parseInt(key));
        }

        return this.reduceToSuperposition(colPermutations);
    }

    rowPermutations(y: number, x: number): number {
        let row = this.getRowInfo(y, x);

        // row permutations stores all possible permutations for the row
        // in the beginning these are just all possible permutations for the sum and the amount of tiles in the row
        let rowPermutations = this.sumTable[row.sum][row.tiles.length];

        let candidatesInOtherTiles = 0;
        row.tiles.forEach((tile: { y: number; x: number }) => {
            if (tile.x === x && tile.y === y) return;
            candidatesInOtherTiles |= this.matrix[tile.y][tile.x];
        });

        let leftoverRowPermutations = 0;
        this.candidatesAsReadableArray(this.matrix[y][x]).forEach((num) => {
            // example: if the tile we are currently looking at has a 1 and a 3 as candidates
            // each loop looks at a single candidate at a time
            // this variable stores the 3 in candidateNotation, so not three but 000 000 100 or 4 in decimal (or the 1 a 000 000 001 or 1 in decimal)
            let candidateNotation = 2 ** (num - 1);

            // now we individually look at the permutations that
            // include a 1 and then in the next forEach loop the permutations that include a 3
            let rowPermutationsWithThisNum = rowPermutations.filter((permutation) => permutation & candidateNotation);

            // now we look at all those permutations and remove the 3 from them
            rowPermutationsWithThisNum = rowPermutationsWithThisNum.map((permutation) => permutation & ~candidateNotation);

            // now we combine all those permutations that had a three in them, that is now removed, and combine them
            // these leftover permutations will later be applied to the other tiles in the row
            rowPermutationsWithThisNum.forEach((permutation) => {
                leftoverRowPermutations |= permutation;
            });

            // console.log(
            // `current candidate: ${num}\nrowpermutations without candidate: ${rowPermutationsWithThisNum.map((permutation) =>
            // permutation.toString(2)
            // )}\ncandidates in the surrounding tiles: ${candidatesInOtherTiles.toString(2)}`
            // );

            // for each candidate being checked in this tile, we assume that it will not find a matching solution
            // we check the if all the candidates in the other tiles can be combined into a permutation that has this current num in it
            // this is done by filtering out the permutations that have this current num, then remuving the currrent num from them
            // and then seing if the permutations that are left can be achieved with the candidates in the other tiles
            let specificCandidateWorksOut = false;
            rowPermutationsWithThisNum.forEach((permutation) => {
                if ((permutation & candidatesInOtherTiles) === permutation) {
                    specificCandidateWorksOut = true;
                }
            });
            // console.log(`specific candidate works out: ${specificCandidateWorksOut}`);
            if (!specificCandidateWorksOut) {
                this.matrix[y][x] &= ~candidateNotation;
            }
        });

        let otherCandidatesinRow: number[] = [];

        row.tiles.forEach((tile: { y: number; x: number }) => {
            // removing permutations that don't include any of the other tiles candidates or even the canditates already set in this tile
            rowPermutations = rowPermutations.filter((permutation) => permutation & this.matrix[tile.y][tile.x]);

            if (tile.x === x && tile.y === y) return;

            // rule out permutations in other tiles based on possible permutations from this tile
            this.matrix[tile.y][tile.x] &= leftoverRowPermutations;

            // setup for sudoku rules
            otherCandidatesinRow.push(this.matrix[tile.y][tile.x]);
        });

        // row Candidates Counted is a dictionary that counts how often a certain candidate combination appears in the other tiles
        // so if we have four tiles and are currently soliving the leftmost one. The  first tile to a right has candidates 2 and 3, the next one 8 and 9 and the last one also 8 and 9.
        // then rowCandidatesCounted would be { 6: 1, 384: 2 } because 6 is 000 000 110 and 384 is 110 000 000
        let rowCandidatesCounted = otherCandidatesinRow.reduce((cnt: any, cur: any) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {});

        for (const [key, value] of Object.entries(rowCandidatesCounted)) {
            if (this.candidatesAsReadableArray(parseInt(key)).length !== value) continue;

            // If the current candidate combination appears as often as the number of candidates it has itself, then they are set to be the final candidates in the other tiles without knowing their order yet
            // but because they are set in the other tiles, the current tile can't have them anymore
            // for tiles that only have a single number left, this algorithm works the same as intuitively solving a sudoku
            this.matrix[y][x] &= ~parseInt(key);

            // and I can adapt the permutations
            // like in our example, the 8 and 9 both have to be in the final permutation of the row, so we can remove all permutations that don't include both of them
            rowPermutations = rowPermutations.filter((permutation) => (permutation & parseInt(key)) == parseInt(key));
        }

        return this.reduceToSuperposition(rowPermutations);
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
        return permutations.reduce((acc, cur) => {
            acc |= cur;
            return acc;
        }, 0);
    }
}

class Model {
    matrix: number[][];

    constructor(tilesAcross: number) {
        // grundsätzlich: unspielbar, Summenfeld, spielbar
        // Idee: 13 bit Zahl (bit 0: spielbar ja oder nein? bit 1-12: Summenfeld)
        this.matrix = this.initBinaryMatrix(easy1);
        console.log(this.matrix);
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

                // for all other cases, we see them as a decimal number. the 0th bit is 0, then the next 6 bit incript the two numbers to the right of the comma, and the last 6 bit incript the two numbers to the left of the comma
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

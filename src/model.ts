class Model {
    matrix: number[][];

    constructor(tilesAcross: number) {
        // grundsätzlich: unspielbar, Summenfeld, spielbar
        // Idee: 13 bit Zahl (bit 0: spielbar ja oder nein? bit 1-12: Summenfeld)
        this.matrix = this.matrixToBinaryMatrix(test);
        console.log(this.matrix);
    }

    matrixToBinaryMatrix(matrix: number[][]): number[][] {
        let binaryMatrix: number[][] = [];
        matrix.forEach((row, y) => {
            let binaryRow: number[] = [];
            row.forEach((tile, x) => {
                if (tile === null) {
                    binaryRow.push(0);
                    return;
                }

                if (tile === 1) {
                    binaryRow.push(511);
                    return;
                }

                // for all other cases, we see them as a decimal number. the 0th bit is 0, then the next 6 bit incript the two numbers to the right of the comma, and the last 6 bit incript the two numbers to the left of the comma
                let colAndRow = tile.toFixed(2).split(".");
                let binaryRight = parseInt(colAndRow[1]).toString(2);
                let binaryDown = parseInt(colAndRow[0]).toString(2);
                // if the binary number is shorter than 6 bit, we add leading zeros
                while (binaryRight.length < 6) {
                    binaryRight = "0" + binaryRight;
                }
                while (binaryDown.length < 6) {
                    binaryDown = "0" + binaryDown;
                }
                let binary = parseInt(binaryDown + binaryRight, 2) << 1;
                binaryRow.push(binary);
            });
            binaryMatrix.push(binaryRow);
        });
        return binaryMatrix;
    }
}

export default Model;

const test: number[][] = [
    [null, null, 45, 3, null, null, null, 3, 45, null],
    [null, 17.08, 1, 1, null, 16, 4.03, 1, 1, null],
    [0.11, 1, 1, 1, 16.17, 1, 1, 1, 1, 17],
    [0.17, 1, 1, 3.17, 1, 1, 1, 0.16, 1, 1],
    [null, 0.18, 1, 1, 1, null, null, 17.13, 1, 1],
    [null, 17.14, 1, 1, null, null, 3.11, 1, 1, null],
    [0.9, 1, 1, null, 16, 3.16, 1, 1, 1, 4],
    [0.14, 1, 1, 3.1, 1, 1, 1, 16.12, 1, 1],
    [null, 0.19, 1, 1, 1, 1, 0.18, 1, 1, 1],
    [null, 0.5, 1, 1, null, null, 0.1, 1, 1, null],
];

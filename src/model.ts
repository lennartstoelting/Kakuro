class Model {
    matrix: number[][];

    constructor(tilesAcross: number) {
        // grundsätzlich: unspielbar, Summenfeld, spielbar
        // Idee: 13 bit Zahl (bit 0: spielbar ja oder nein? bit 1-12: Summenfeld)
        this.matrix = test;
    }
}

export default Model;

const test: number[][] = [
    [null, null, 45.0, 3.0, null, null, null, 3.0, 45.0, null],
    [null, 17.08, 1, 1, null, 16.0, 4.03, 1, 1, null],
    [0.11, 1, 1, 1, 16.17, 1, 1, 1, 1, 17],
    [17, 1, 1, 3.17, 1, 1, 1, 0.16, 1, 1],
    [null, 0.18, 1, 1, 1, null, null, 17.13, 1, 1],
    [null, 17.14, 1, 1, null, null, 3.11, 1, 1, null],
    [0.9, 1, 1, null, 16, 3.16, 1, 1, 1, 4],
    [0.14, 1, 1, 3.1, 1, 1, 1, 16.12, 1, 1],
    [null, 0.19, 1, 1, 1, 1, 0.18, 1, 1, 1],
    [null, 0.5, 1, 1, null, null, 0.1, 1, 1, null],
];

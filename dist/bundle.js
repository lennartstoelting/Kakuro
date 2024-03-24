/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/levels.ts":
/*!***********************!*\
  !*** ./src/levels.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   levels: () => (/* binding */ levels)
/* harmony export */ });
var levels = {
    easy: [
        [
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
        ],
        [
            [0, 23, 29, 4, 0, 0, 0, 0, 3, 17],
            [0.17, 1, 1, 1, 4, 0, 30, 17.1, 1, 1],
            [0.21, 1, 1, 1, 1, 4.24, 1, 1, 1, 1],
            [0.14, 1, 1, 16.2, 1, 1, 1, 1, 0, 0],
            [0, 0.12, 1, 1, 10.11, 1, 1, 3, 0, 0],
            [0, 0, 0.11, 1, 1, 17.1, 1, 1, 30, 0],
            [0, 0, 0, 16.1, 1, 1, 4.08, 1, 1, 7],
            [0, 4, 3.24, 1, 1, 1, 1, 16.1, 1, 1],
            [0.13, 1, 1, 1, 1, 0.18, 1, 1, 1, 1],
            [0.04, 1, 1, 0, 0, 0, 0.2, 1, 1, 1],
        ],
    ],
    medium: [
        [
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
        ],
    ],
    hard: [
        [
            [0, 0, 7, 38, 0, 0, 0, 4, 11],
            [0, 3.07, 1, 1, 0, 17, 16.03, 1, 1, 0],
            [0.14, 1, 1, 1, 6.21, 1, 1, 1, 1, 17],
            [0.3, 1, 1, 1, 1, 1, 1, 39.11, 1, 1],
            [0, 0, 0.07, 1, 1, 0, 7.22, 1, 1, 1],
            [0, 16, 11.09, 1, 1, 0.09, 1, 1, 24, 4],
            [0.14, 1, 1, 1, 16, 3.07, 1, 1, 24, 4],
            [0.12, 1, 1, 16.32, 1, 1, 1, 1, 1, 1],
            [0, 0.21, 1, 1, 1, 1, 0.12, 1, 1, 1],
            [0, 0.1, 1, 1, 0, 0, 0.14, 1, 1, 0],
        ],
    ],
    challenging: new Array(1),
    extreme: [
        [
            [0, 0, 0, 0, 9, 12, 0, 12, 37, 0],
            [0, 0, 37, 8.03, 1, 1, 8.15, 1, 1, 9],
            [0, 11.43, 1, 1, 1, 1, 1, 1, 1, 1],
            [0.14, 1, 1, 1, 6.11, 1, 1, 10.04, 1, 1],
            [0.1, 1, 1, 9.03, 1, 1, 7.04, 1, 1, 0],
            [0, 0.15, 1, 1, 1, 26.13, 1, 1, 1, 16],
            [0, 3.09, 1, 1, 5.12, 1, 1, 10.12, 1, 1],
            [0.09, 1, 1, 14.03, 1, 1, 3.14, 1, 1, 1],
            [0.4, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0.1, 1, 1, 0.08, 1, 1, 0, 0, 0],
        ],
    ],
};


/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Model: () => (/* binding */ Model)
/* harmony export */ });
var Model = /** @class */ (function () {
    function Model(level) {
        this.matrix = this.initBinaryMatrix(level);
        this.sumTable = this.initSumTable();
    }
    /**
     * 000000 000000 000000000
     * col    row    candidates
     * if the number is zero, the tile is unplayable
     */
    Model.prototype.initBinaryMatrix = function (matrix) {
        var newMatrix = [];
        matrix.forEach(function (row, y) {
            var rowArray = [];
            row.forEach(function (tile, x) {
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
                var colAndRow = tile
                    .toFixed(2)
                    .split(".")
                    .map(function (sum) { return parseInt(sum); });
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
    };
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
    Model.prototype.initSumTable = function () {
        // create a 45x9x? empty array
        var table = Array(46)
            .fill(0)
            .map(function () {
            return Array(10)
                .fill(0)
                .map(function () { return []; });
        });
        for (var binCombination = 1; binCombination <= parseInt("111111111", 2); binCombination++) {
            var candidatesDecArr = this.candidatesAsReadableArray(binCombination);
            var sum = candidatesDecArr.reduce(function (acc, cur) { return acc + cur; }, 0);
            table[sum][candidatesDecArr.length].push(binCombination);
        }
        return table;
    };
    Model.prototype.solveAll = function () {
        var changesMade = true;
        while (changesMade) {
            var oldMatrix = JSON.parse(JSON.stringify(this.matrix));
            this.solveStep();
            changesMade = JSON.stringify(oldMatrix) !== JSON.stringify(this.matrix);
        }
    };
    Model.prototype.solveStep = function () {
        var _this = this;
        this.matrix.forEach(function (row, y) {
            row.forEach(function (tile, x) {
                if (!(tile & 511)) {
                    return;
                }
                _this.solveTile(y, x);
            });
        });
        console.log("--- solved step ---");
        return;
    };
    Model.prototype.solveTile = function (y, x) {
        var _this = this;
        var colInfo = this.getColumnInfo(y, x);
        var rowInfo = this.getRowInfo(y, x);
        // all permutations where the given jointTiles amount to sum
        var colPermutations = this.sumTable[colInfo.sum][colInfo.jointTiles.length];
        var rowPermutations = this.sumTable[rowInfo.sum][rowInfo.jointTiles.length];
        // removing permutations that don't include any of the tiles candidates
        colInfo.jointTiles.forEach(function (tile) {
            colPermutations = colPermutations.filter(function (permutation) { return permutation & _this.matrix[tile.y][tile.x]; });
        });
        rowInfo.jointTiles.forEach(function (tile) {
            rowPermutations = rowPermutations.filter(function (permutation) { return permutation & _this.matrix[tile.y][tile.x]; });
        });
        // --- sudoku rules ---
        var otherCandidatesinRow = [];
        rowInfo.jointTiles.forEach(function (tile) {
            if (tile.x === x && tile.y === y)
                return;
            otherCandidatesinRow.push(_this.matrix[tile.y][tile.x]);
        });
        var rowCandidatesCounted = otherCandidatesinRow.reduce(function (cnt, cur) { return ((cnt[cur] = cnt[cur] + 1 || 1), cnt); }, {});
        var _loop_1 = function (key, value) {
            if (this_1.candidatesAsReadableArray(parseInt(key)).length !== value)
                return "continue";
            // I can cross off the matrix candidates sudoku style
            this_1.matrix[y][x] &= ~parseInt(key);
            // and I can adapt the permutations
            rowPermutations = rowPermutations.filter(function (permutation) { return (permutation & parseInt(key)) == parseInt(key); });
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.entries(rowCandidatesCounted); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            _loop_1(key, value);
        }
        var otherCandidatesinCol = [];
        colInfo.jointTiles.forEach(function (tile) {
            if (tile.x === x && tile.y === y)
                return;
            otherCandidatesinCol.push(_this.matrix[tile.y][tile.x]);
        });
        var colCandidatesCounted = otherCandidatesinCol.reduce(function (cnt, cur) { return ((cnt[cur] = cnt[cur] + 1 || 1), cnt); }, {});
        var _loop_2 = function (key, value) {
            if (this_2.candidatesAsReadableArray(parseInt(key)).length !== value)
                return "continue";
            // I can cross off the matrix candidates sudoku style
            this_2.matrix[y][x] &= ~parseInt(key);
            // and I can adapt the permutations
            colPermutations = colPermutations.filter(function (permutation) { return (permutation & parseInt(key)) == parseInt(key); });
        };
        var this_2 = this;
        for (var _c = 0, _d = Object.entries(colCandidatesCounted); _c < _d.length; _c++) {
            var _e = _d[_c], key = _e[0], value = _e[1];
            _loop_2(key, value);
        }
        // --- end of sudoku rules ---
        // --- rule out permutations in other tiles based on possible permutations from this tile
        var possibleNumbers = this.candidatesAsReadableArray(this.matrix[y][x]);
        var leftoverRowPermutations = 0;
        possibleNumbers.forEach(function (num) {
            var rowPermutationsForNum = _this.sumTable[rowInfo.sum][rowInfo.jointTiles.length].filter(function (permutation) { return permutation & (Math.pow(2, (num - 1))); });
            rowPermutationsForNum = rowPermutationsForNum.map(function (permutation) { return permutation & ~(Math.pow(2, (num - 1))); });
            rowPermutationsForNum.forEach(function (permutation) {
                leftoverRowPermutations |= permutation;
            });
        });
        rowInfo.jointTiles.forEach(function (coords) {
            if (coords.x === x && coords.y === y)
                return;
            _this.matrix[coords.y][coords.x] &= leftoverRowPermutations;
        });
        var leftoverColPermutations = 0;
        possibleNumbers.forEach(function (num) {
            var colPermutationsForNum = _this.sumTable[colInfo.sum][colInfo.jointTiles.length].filter(function (permutation) { return permutation & (Math.pow(2, (num - 1))); });
            colPermutationsForNum = colPermutationsForNum.map(function (permutation) { return permutation & ~(Math.pow(2, (num - 1))); });
            colPermutationsForNum.forEach(function (permutation) {
                leftoverColPermutations |= permutation;
            });
        });
        colInfo.jointTiles.forEach(function (coords) {
            if (coords.x === x && coords.y === y)
                return;
            _this.matrix[coords.y][coords.x] &= leftoverColPermutations;
        });
        // --- end of rule out permutations in other tiles based on possible permutations from this tile ---
        var colSuperPosition = this.reduceToSuperposition(colPermutations);
        var rowSuperPosition = this.reduceToSuperposition(rowPermutations);
        // temporary, needs to be made into several steps
        this.matrix[y][x] &= colSuperPosition & rowSuperPosition;
        return;
    };
    // for pretty console output
    Model.prototype.visualizeStateOfTile = function (x, y) {
        var candidateString = ("000000000" + this.matrix[y][x].toString(2)).slice(-9);
        console.log("State of Tile at x: ".concat(x, " and y: ").concat(y, " is \n\" + \"").concat(candidateString, " or ").concat(this.candidatesAsReadableArray(this.matrix[y][x])));
    };
    Model.prototype.getColumnInfo = function (y, x) {
        while (y >= 0 && this.matrix[y][x] & 511) {
            y--;
        }
        var colCoordinates = [];
        while (y + colCoordinates.length < 9 && this.matrix[y + colCoordinates.length + 1][x] & 511) {
            colCoordinates.push({ y: y + colCoordinates.length + 1, x: x });
        }
        return { sum: this.matrix[y][x] >> 15, jointTiles: colCoordinates };
    };
    Model.prototype.getRowInfo = function (y, x) {
        while (x >= 0 && this.matrix[y][x] & 511) {
            x--;
        }
        var rowCoordinates = [];
        while (x + rowCoordinates.length < 9 && this.matrix[y][x + rowCoordinates.length + 1] & 511) {
            rowCoordinates.push({ y: y, x: x + rowCoordinates.length + 1 });
        }
        return { sum: (this.matrix[y][x] >> 9) & 63, jointTiles: rowCoordinates };
    };
    Model.prototype.reduceToSuperposition = function (permutations) {
        return permutations.reduce(function (acc, cur) {
            acc |= cur;
            return acc;
        }, 0);
    };
    Model.prototype.candidatesAsReadableArray = function (binary) {
        var candidates = [];
        for (var i = 0; i < 9; i++) {
            if (binary & (Math.pow(2, i))) {
                candidates.push(i + 1);
            }
        }
        return candidates;
    };
    return Model;
}());

//     public solveStep(): void {
//                 let rowInfo = this.getRowInfo(y, x);
//                 let colInfo = this.getColumnInfo(y, x);
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


/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   View: () => (/* binding */ View)
/* harmony export */ });
var View = /** @class */ (function () {
    function View() {
        this.boardContainer = document.getElementById("board-container");
        this.borderRadius = 1;
    }
    View.prototype.drawBoard = function (matrix) {
        var _this = this;
        this.createCanvas(matrix);
        this.drawBackground();
        matrix.forEach(function (row, y) {
            row.forEach(function (tile, x) {
                var nodeCornerY = y * _this.tileSize;
                var nodeCornerX = x * _this.tileSize;
                // the unplayable tiles with sums
                if (tile & 511) {
                    _this.drawPlayableTile(tile, nodeCornerX, nodeCornerY);
                }
                else {
                    _this.drawUnplayableTile(tile, nodeCornerX, nodeCornerY);
                }
            });
        });
        this.drawGridlines();
    };
    View.prototype.drawUnplayableTile = function (tile, nodeCornerX, nodeCornerY) {
        var colValue = tile >> 15;
        if (colValue) {
            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(colValue.toString(), nodeCornerX + (this.tileSize / 3) * 1, nodeCornerY + (this.tileSize / 3) * 3 - this.tilePadding);
        }
        var rowValue = (tile >> 9) & 63;
        if (rowValue) {
            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(("  " + rowValue.toString()).slice(-2), nodeCornerX + (this.tileSize / 3) * 2 - this.tilePadding / 2, nodeCornerY + (this.tileSize / 3) * 2 - this.tilePadding);
        }
        if (colValue && rowValue) {
            this.ctx.beginPath();
            this.ctx.moveTo(nodeCornerX, nodeCornerY);
            this.ctx.lineTo(nodeCornerX + this.tileSize, nodeCornerY + this.tileSize);
            this.ctx.lineWidth = this.tileSize / 25;
            this.ctx.strokeStyle = "white";
            this.ctx.stroke();
        }
    };
    View.prototype.drawPlayableTile = function (tile, nodeCornerX, nodeCornerY) {
        // background for playable tile
        this.ctx.beginPath();
        this.ctx.fillStyle = "lightgray";
        this.ctx.rect(nodeCornerX, nodeCornerY, this.tileSize, this.tileSize);
        this.ctx.stroke();
        this.ctx.fill();
        // the already safe numbers in the tiles (e.g. if the tile has 000 001 000 written, 4 is the only number left to be placed in the tile)
        // 000 001 000 -> nach split -> ["00000", "000"]
        var onlyPossibleNumber = tile.toString(2).split("1");
        if (onlyPossibleNumber.length === 2) {
            this.ctx.font = this.tileSize + "px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText((onlyPossibleNumber[1].length + 1).toString(), nodeCornerX + (this.tileSize / 3) * 0 + this.tilePadding * 3, nodeCornerY + (this.tileSize / 3) * 3 - this.tilePadding * 2);
            return;
        }
        // the candidate numbers in the tiles
        for (var i = 0; i < 9; i++) {
            if (!(tile & (Math.pow(2, i))))
                continue;
            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "grey";
            this.ctx.fillText((i + 1).toString(), nodeCornerX + (this.tileSize / 3) * (i % 3) + this.tilePadding, nodeCornerY + (this.tileSize / 3) * Math.floor((i + 3) / 3) - this.tilePadding);
        }
    };
    View.prototype.createCanvas = function (matrix) {
        this.board = document.createElement("canvas");
        this.board.id = "board";
        this.board.style.boxShadow = "5px 5px 20px gray";
        this.board.style.borderRadius = this.borderRadius + "%";
        this.board.style.margin = "1%";
        this.board.width = this.boardContainer.clientWidth * 0.98;
        this.board.height = this.boardContainer.clientHeight * 0.98;
        this.boardContainer.innerHTML = "";
        this.boardContainer.appendChild(this.board);
        this.ctx = this.board.getContext("2d");
        this.boardSideLength = this.board.clientWidth;
        this.tileSize = this.boardSideLength / matrix.length;
        this.tilePadding = this.tileSize / 15;
    };
    View.prototype.drawBackground = function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.roundRect(0, 0, this.board.clientWidth, this.board.clientWidth, this.board.clientWidth * (this.borderRadius / 100));
        this.ctx.stroke();
        this.ctx.fill();
    };
    View.prototype.drawGridlines = function () {
        this.ctx.beginPath();
        for (var l = 0; l <= this.boardSideLength; l += this.tileSize) {
            this.ctx.moveTo(l, 0);
            this.ctx.lineTo(l, this.boardSideLength);
            this.ctx.moveTo(0, l);
            this.ctx.lineTo(this.boardSideLength, l);
        }
        this.ctx.lineWidth = this.tileSize / 25;
        this.ctx.strokeStyle = "white";
        this.ctx.stroke();
    };
    return View;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.ts");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.ts");
/* harmony import */ var _levels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./levels */ "./src/levels.ts");



/** handles all input, checks in with model and displays the result with view */
var Controller = /** @class */ (function () {
    function Controller() {
        this.model = new _model__WEBPACK_IMPORTED_MODULE_0__.Model(_levels__WEBPACK_IMPORTED_MODULE_2__.levels.hard[0]);
        this.view = new _view__WEBPACK_IMPORTED_MODULE_1__.View();
        this.getDomElements();
        this.initEventListeners();
        this.updateView();
    }
    Controller.prototype.getDomElements = function () {
        this.solveOneStepButton = document.getElementById("solve-step");
        this.solveAllButton = document.getElementById("solve-all");
        this.debug1 = document.getElementById("b1");
    };
    Controller.prototype.initEventListeners = function () {
        var _this = this;
        window.addEventListener("resize", function () {
            _this.updateView();
        });
        this.solveOneStepButton.addEventListener("click", function () {
            _this.model.solveStep();
            _this.updateView();
        });
        this.solveAllButton.addEventListener("click", function () {
            _this.model.solveAll();
            _this.updateView();
        });
        this.debug1.addEventListener("click", function () {
            _this.model.solveTile(5, 4);
            _this.updateView();
        });
    };
    Controller.prototype.updateView = function () {
        var _this = this;
        this.view.drawBoard(this.model.matrix);
        this.view.board.addEventListener("click", function (event) { return _this.boardClicked(event); });
    };
    Controller.prototype.boardClicked = function (event) {
        console.log("board clicked");
    };
    return Controller;
}());
var app = new Controller();
// "npm run start" in terminal to start live server

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTSxNQUFNLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUNEO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEM7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkM7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM3QixDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNyQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QztLQUNKO0lBQ0QsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6QixPQUFPLEVBQUU7UUFDTDtZQUNJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFD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QyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBaUIsSUFBSyxZQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVPLGlDQUFZLEdBQXBCLFVBQXFCLEtBQWlCO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQztBQUVELElBQU0sR0FBRyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFFN0IsbURBQW1EIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL2xldmVscy50cyIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvbW9kZWwudHMiLCJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL3ZpZXcudHMiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBsZXZlbHMgPSB7XHJcbiAgICBlYXN5OiBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMCwgNDUsIDMsIDAsIDAsIDAsIDMsIDQ1LCAwXSxcclxuICAgICAgICAgICAgWzAsIDE3LjA4LCAxLCAxLCAwLCAxNiwgNC4wMywgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLjExLCAxLCAxLCAxLCAxNi4xNywgMSwgMSwgMSwgMSwgMTddLFxyXG4gICAgICAgICAgICBbMC4xNywgMSwgMSwgMy4xNywgMSwgMSwgMSwgMC4xNiwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLjE4LCAxLCAxLCAxLCAwLCAwLCAxNy4xMywgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAxNy4wNCwgMSwgMSwgMCwgMCwgMy4xMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLjA5LCAxLCAxLCAwLCAxNiwgMy4xNiwgMSwgMSwgMSwgNF0sXHJcbiAgICAgICAgICAgIFswLjE0LCAxLCAxLCAzLjEsIDEsIDEsIDEsIDE2LjEyLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAuMTksIDEsIDEsIDEsIDEsIDAuMTgsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMC4wNSwgMSwgMSwgMCwgMCwgMC4xLCAxLCAxLCAwXSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDIzLCAyOSwgNCwgMCwgMCwgMCwgMCwgMywgMTddLFxyXG4gICAgICAgICAgICBbMC4xNywgMSwgMSwgMSwgNCwgMCwgMzAsIDE3LjEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4yMSwgMSwgMSwgMSwgMSwgNC4yNCwgMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjE0LCAxLCAxLCAxNi4yLCAxLCAxLCAxLCAxLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAuMTIsIDEsIDEsIDEwLjExLCAxLCAxLCAzLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMTEsIDEsIDEsIDE3LjEsIDEsIDEsIDMwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDE2LjEsIDEsIDEsIDQuMDgsIDEsIDEsIDddLFxyXG4gICAgICAgICAgICBbMCwgNCwgMy4yNCwgMSwgMSwgMSwgMSwgMTYuMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjEzLCAxLCAxLCAxLCAxLCAwLjE4LCAxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMDQsIDEsIDEsIDAsIDAsIDAsIDAuMiwgMSwgMSwgMV0sXHJcbiAgICAgICAgXSxcclxuICAgIF0sXHJcbiAgICBtZWRpdW06IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAwLCAyOSwgNCwgMCwgNywgMzQsIDE2LCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAuMDgsIDEsIDEsIDMuMTcsIDEsIDEsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMy4zMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLjEsIDEsIDEsIDI0LjEsIDEsIDEsIDEsIDI0LCAwLCAwXSxcclxuICAgICAgICAgICAgWzAuMTYsIDEsIDEsIDEsIDE1LCAwLjEzLCAxLCAxLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMTMsIDEsIDEsIDAuMTYsIDEsIDEsIDEwLCAxNl0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjEsIDEsIDEsIDI0LCAzLjE2LCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDE3LjE0LCAxLCAxLCAxLCAxNy4xMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjMsIDEsIDEsIDEsIDEsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMC4xOCwgMSwgMSwgMSwgMC4xMywgMSwgMSwgMF0sXHJcbiAgICAgICAgXSxcclxuICAgIF0sXHJcbiAgICBoYXJkOiBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMCwgNywgMzgsIDAsIDAsIDAsIDQsIDExXSxcclxuICAgICAgICAgICAgWzAsIDMuMDcsIDEsIDEsIDAsIDE3LCAxNi4wMywgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLjE0LCAxLCAxLCAxLCA2LjIxLCAxLCAxLCAxLCAxLCAxN10sXHJcbiAgICAgICAgICAgIFswLjMsIDEsIDEsIDEsIDEsIDEsIDEsIDM5LjExLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMDcsIDEsIDEsIDAsIDcuMjIsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMTYsIDExLjA5LCAxLCAxLCAwLjA5LCAxLCAxLCAyNCwgNF0sXHJcbiAgICAgICAgICAgIFswLjE0LCAxLCAxLCAxLCAxNiwgMy4wNywgMSwgMSwgMjQsIDRdLFxyXG4gICAgICAgICAgICBbMC4xMiwgMSwgMSwgMTYuMzIsIDEsIDEsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMC4yMSwgMSwgMSwgMSwgMSwgMC4xMiwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLjEsIDEsIDEsIDAsIDAsIDAuMTQsIDEsIDEsIDBdLFxyXG4gICAgICAgIF0sXHJcbiAgICBdLFxyXG4gICAgY2hhbGxlbmdpbmc6IG5ldyBBcnJheSgxKSxcclxuICAgIGV4dHJlbWU6IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwLCA5LCAxMiwgMCwgMTIsIDM3LCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDM3LCA4LjAzLCAxLCAxLCA4LjE1LCAxLCAxLCA5XSxcclxuICAgICAgICAgICAgWzAsIDExLjQzLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMTQsIDEsIDEsIDEsIDYuMTEsIDEsIDEsIDEwLjA0LCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMSwgMSwgMSwgOS4wMywgMSwgMSwgNy4wNCwgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLjE1LCAxLCAxLCAxLCAyNi4xMywgMSwgMSwgMSwgMTZdLFxyXG4gICAgICAgICAgICBbMCwgMy4wOSwgMSwgMSwgNS4xMiwgMSwgMSwgMTAuMTIsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4wOSwgMSwgMSwgMTQuMDMsIDEsIDEsIDMuMTQsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC40LCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAuMSwgMSwgMSwgMC4wOCwgMSwgMSwgMCwgMCwgMF0sXHJcbiAgICAgICAgXSxcclxuICAgIF0sXHJcbn07XHJcbiIsImV4cG9ydCBjbGFzcyBNb2RlbCB7XHJcbiAgICBtYXRyaXg6IG51bWJlcltdW107XHJcbiAgICBzdW1UYWJsZTogbnVtYmVyW11bXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxldmVsOiBudW1iZXJbXVtdKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXggPSB0aGlzLmluaXRCaW5hcnlNYXRyaXgobGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuc3VtVGFibGUgPSB0aGlzLmluaXRTdW1UYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogMDAwMDAwIDAwMDAwMCAwMDAwMDAwMDBcclxuICAgICAqIGNvbCAgICByb3cgICAgY2FuZGlkYXRlc1xyXG4gICAgICogaWYgdGhlIG51bWJlciBpcyB6ZXJvLCB0aGUgdGlsZSBpcyB1bnBsYXlhYmxlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdEJpbmFyeU1hdHJpeChtYXRyaXg6IG51bWJlcltdW10pOiBudW1iZXJbXVtdIHtcclxuICAgICAgICBsZXQgbmV3TWF0cml4OiBhbnlbXVtdID0gW107XHJcbiAgICAgICAgbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcm93QXJyYXk6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd0FycmF5LnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByb3dBcnJheS5wdXNoKHBhcnNlSW50KFwiMVwiLnJlcGVhdCg5KSwgMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgYWxsIG90aGVyIGNhc2VzLCB3ZSBzZWUgdGhlbSBhcyBhIGRlY2ltYWwgbnVtYmVyLlxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIDB0aCBiaXQgaXMgMCxcclxuICAgICAgICAgICAgICAgIC8vIHRoZW4gdGhlIG5leHQgNiBiaXQgaW5jcmlwdCB0aGUgdHdvIG51bWJlcnMgdG8gdGhlIHJpZ2h0IG9mIHRoZSBjb21tYSxcclxuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgbGFzdCA2IGJpdCBpbmNyaXB0IHRoZSB0d28gbnVtYmVycyB0byB0aGUgbGVmdCBvZiB0aGUgY29tbWFcclxuICAgICAgICAgICAgICAgIGxldCBjb2xBbmRSb3cgPSB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoc3VtKSA9PiBwYXJzZUludChzdW0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvdy5sZW5ndGggIT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeCBhdCB4OiBcIiArIHggKyBcIiBhbmQgeTogXCIgKyB5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3dbMF0gPiA0NSB8fCBjb2xBbmRSb3dbMF0gPT0gMiB8fCBjb2xBbmRSb3dbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgaW5wdXQgbWF0cml4OiBzdW0gb2YgY29sIGF0IHk6IFwiICsgeSArIFwiIGFuZCB4OiBcIiArIHggKyBcIiBpcyBnaXZlbiBhcyBcIiArIGNvbEFuZFJvd1swXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93WzFdID4gNDUgfHwgY29sQW5kUm93WzFdID09IDIgfHwgY29sQW5kUm93WzFdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeDogc3VtIG9mIHJvdyBhdCB5OiBcIiArIHkgKyBcIiBhbmQgeDogXCIgKyB4ICsgXCIgaXMgZ2l2ZW4gYXMgXCIgKyBjb2xBbmRSb3dbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJvd0FycmF5LnB1c2goKChjb2xBbmRSb3dbMF0gPDwgNikgfCAoY29sQW5kUm93WzFdIDw8IDApKSA8PCA5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG5ld01hdHJpeC5wdXNoKHJvd0FycmF5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3TWF0cml4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaSB3YW50IHRvIGRvIGEgZ2VuZXJhbCB0YWJsZSB3aGVyZSBhbGwgdGhlIGNvbWJpbmF0aW9ucyBvZiAyIHVwIHRvIDkgbnVtYmVycyBhcmUgbGlzdGVkIGFuZCB0aGUgc3VtIG9mIHRoZW0gaXMgY2FsY3VsYXRlZFxyXG4gICAgICogdGhlIHJlc3VsdGluZyBzdW0gaXMgdGhlIGluZGV4IG9mIHdoZXJlIHRvIGZpbmQgdGhlc2UgY29tYmluYXRpb25zIGluIHRoZSB0YWJsZVxyXG4gICAgICogYXQgdGhhdCBpbmRleCwgdGhlIGNvbWJpbmF0aW9ucyBhcmUgc3RvcmVkIGFzIGEgOSBiaXQgbnVtYmVyLCB3aGVyZSB0aGUgYml0IGlzIDEgaWYgdGhlIG51bWJlciBpcyBpbiB0aGUgY29tYmluYXRpb25cclxuICAgICAqIHRoZSB0YWJsZSBpcyBhIDQ1IGVsZW1lbnQgYXJyYXlcclxuICAgICAqIGF0IGVhY2ggaW5kZXgsIHRoZSBhbW91bnQgb2YgbnVtYmVycyB0aGF0IG1ha2UgdXAgdGhlIHN1bSBpcyBzdG9yZWQgYXQgdGhlIGluZGV4IG9mIGl0J3MgYW1vdW50XHJcbiAgICAgKiB0aGUgbWF0cml4IGxvb2tzIGFzIGZvbGxvd3M6XHJcbiAgICAgKlxyXG4gICAgICogW1tdLCAgICAgICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgKiAgW10sICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAqICBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMlxyXG4gICAgICogIFtbXSxbXSxbM11dLCAgICAgICAgICAgICAgICAzXHJcbiAgICAgKiAgW1tdLFtdLFs1XV0sICAgICAgICAgICAgICAgIDRcclxuICAgICAqICBbW10sW10sWzYsOV1dLCAgICAgICAgICAgICAgNVxyXG4gICAgICogIFtbXSxbXSxbMTAsMTddLFs3XV1dICAgICAgICA2XHJcbiAgICAgKiAgW1tdLFtdLFszMywxOCwgMTJdLFsxMV1dICAgIDdcclxuICAgICAqIHRoZSBmaXJzdCBpbmRleCBpcyB0aGUgc3VtICgjNDUpLCB0aGUgc2Vjb25kIGluZGV4IGlzIHRoZSBhbW91bnQgb2YgbnVtYmVycyB0aGF0IG1ha2UgdXAgdGhlIHN1bSgjOSksXHJcbiAgICAgKiBlYWNoIG9mIHRoZSBudW1iZXJzIGZyb20gdGhhdCBwb2ludCBhcmUgbWVhbnQgdG8gYmUgcmVhZCBpbiBiaW5hcnksIGhhdmluZyBhIDEgZXZlcnl3aGVyZSB0aGUgbnVtYmVyIGlzIGluIHRoZSBjb21iaW5hdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRTdW1UYWJsZSgpOiBudW1iZXJbXVtdW10ge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBhIDQ1eDl4PyBlbXB0eSBhcnJheVxyXG4gICAgICAgIGxldCB0YWJsZTogbnVtYmVyW11bXVtdID0gQXJyYXkoNDYpXHJcbiAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgIC5tYXAoKCkgPT5cclxuICAgICAgICAgICAgICAgIEFycmF5KDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoKSA9PiBbXSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYmluQ29tYmluYXRpb24gPSAxOyBiaW5Db21iaW5hdGlvbiA8PSBwYXJzZUludChcIjExMTExMTExMVwiLCAyKTsgYmluQ29tYmluYXRpb24rKykge1xyXG4gICAgICAgICAgICBsZXQgY2FuZGlkYXRlc0RlY0FyciA9IHRoaXMuY2FuZGlkYXRlc0FzUmVhZGFibGVBcnJheShiaW5Db21iaW5hdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBzdW0gPSBjYW5kaWRhdGVzRGVjQXJyLnJlZHVjZSgoYWNjLCBjdXIpID0+IGFjYyArIGN1ciwgMCk7XHJcbiAgICAgICAgICAgIHRhYmxlW3N1bV1bY2FuZGlkYXRlc0RlY0Fyci5sZW5ndGhdLnB1c2goYmluQ29tYmluYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb2x2ZUFsbCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2hhbmdlc01hZGUgPSB0cnVlO1xyXG4gICAgICAgIHdoaWxlIChjaGFuZ2VzTWFkZSkge1xyXG4gICAgICAgICAgICBsZXQgb2xkTWF0cml4ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLm1hdHJpeCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNvbHZlU3RlcCgpO1xyXG4gICAgICAgICAgICBjaGFuZ2VzTWFkZSA9IEpTT04uc3RyaW5naWZ5KG9sZE1hdHJpeCkgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMubWF0cml4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNvbHZlU3RlcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goKHRpbGUsIHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghKHRpbGUgJiA1MTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zb2x2ZVRpbGUoeSwgeCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLSBzb2x2ZWQgc3RlcCAtLS1cIik7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc29sdmVUaWxlKHk6IG51bWJlciwgeDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNvbEluZm8gPSB0aGlzLmdldENvbHVtbkluZm8oeSwgeCk7XHJcbiAgICAgICAgbGV0IHJvd0luZm8gPSB0aGlzLmdldFJvd0luZm8oeSwgeCk7XHJcblxyXG4gICAgICAgIC8vIGFsbCBwZXJtdXRhdGlvbnMgd2hlcmUgdGhlIGdpdmVuIGpvaW50VGlsZXMgYW1vdW50IHRvIHN1bVxyXG4gICAgICAgIGxldCBjb2xQZXJtdXRhdGlvbnMgPSB0aGlzLnN1bVRhYmxlW2NvbEluZm8uc3VtXVtjb2xJbmZvLmpvaW50VGlsZXMubGVuZ3RoXTtcclxuICAgICAgICBsZXQgcm93UGVybXV0YXRpb25zID0gdGhpcy5zdW1UYWJsZVtyb3dJbmZvLnN1bV1bcm93SW5mby5qb2ludFRpbGVzLmxlbmd0aF07XHJcblxyXG4gICAgICAgIC8vIHJlbW92aW5nIHBlcm11dGF0aW9ucyB0aGF0IGRvbid0IGluY2x1ZGUgYW55IG9mIHRoZSB0aWxlcyBjYW5kaWRhdGVzXHJcbiAgICAgICAgY29sSW5mby5qb2ludFRpbGVzLmZvckVhY2goKHRpbGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICAgICAgICBjb2xQZXJtdXRhdGlvbnMgPSBjb2xQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gcGVybXV0YXRpb24gJiB0aGlzLm1hdHJpeFt0aWxlLnldW3RpbGUueF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJvd0luZm8uam9pbnRUaWxlcy5mb3JFYWNoKCh0aWxlOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0pID0+IHtcclxuICAgICAgICAgICAgcm93UGVybXV0YXRpb25zID0gcm93UGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IHBlcm11dGF0aW9uICYgdGhpcy5tYXRyaXhbdGlsZS55XVt0aWxlLnhdKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gLS0tIHN1ZG9rdSBydWxlcyAtLS1cclxuXHJcbiAgICAgICAgbGV0IG90aGVyQ2FuZGlkYXRlc2luUm93OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIHJvd0luZm8uam9pbnRUaWxlcy5mb3JFYWNoKCh0aWxlOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRpbGUueCA9PT0geCAmJiB0aWxlLnkgPT09IHkpIHJldHVybjtcclxuICAgICAgICAgICAgb3RoZXJDYW5kaWRhdGVzaW5Sb3cucHVzaCh0aGlzLm1hdHJpeFt0aWxlLnldW3RpbGUueF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCByb3dDYW5kaWRhdGVzQ291bnRlZCA9IG90aGVyQ2FuZGlkYXRlc2luUm93LnJlZHVjZSgoY250OiBhbnksIGN1cjogYW55KSA9PiAoKGNudFtjdXJdID0gY250W2N1cl0gKyAxIHx8IDEpLCBjbnQpLCB7fSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocm93Q2FuZGlkYXRlc0NvdW50ZWQpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbmRpZGF0ZXNBc1JlYWRhYmxlQXJyYXkocGFyc2VJbnQoa2V5KSkubGVuZ3RoICE9PSB2YWx1ZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIC8vIEkgY2FuIGNyb3NzIG9mZiB0aGUgbWF0cml4IGNhbmRpZGF0ZXMgc3Vkb2t1IHN0eWxlXHJcbiAgICAgICAgICAgIHRoaXMubWF0cml4W3ldW3hdICY9IH5wYXJzZUludChrZXkpO1xyXG4gICAgICAgICAgICAvLyBhbmQgSSBjYW4gYWRhcHQgdGhlIHBlcm11dGF0aW9uc1xyXG4gICAgICAgICAgICByb3dQZXJtdXRhdGlvbnMgPSByb3dQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gKHBlcm11dGF0aW9uICYgcGFyc2VJbnQoa2V5KSkgPT0gcGFyc2VJbnQoa2V5KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3RoZXJDYW5kaWRhdGVzaW5Db2w6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgY29sSW5mby5qb2ludFRpbGVzLmZvckVhY2goKHRpbGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGlsZS54ID09PSB4ICYmIHRpbGUueSA9PT0geSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBvdGhlckNhbmRpZGF0ZXNpbkNvbC5wdXNoKHRoaXMubWF0cml4W3RpbGUueV1bdGlsZS54XSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGNvbENhbmRpZGF0ZXNDb3VudGVkID0gb3RoZXJDYW5kaWRhdGVzaW5Db2wucmVkdWNlKChjbnQ6IGFueSwgY3VyOiBhbnkpID0+ICgoY250W2N1cl0gPSBjbnRbY3VyXSArIDEgfHwgMSksIGNudCksIHt9KTtcclxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjb2xDYW5kaWRhdGVzQ291bnRlZCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FuZGlkYXRlc0FzUmVhZGFibGVBcnJheShwYXJzZUludChrZXkpKS5sZW5ndGggIT09IHZhbHVlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgLy8gSSBjYW4gY3Jvc3Mgb2ZmIHRoZSBtYXRyaXggY2FuZGlkYXRlcyBzdWRva3Ugc3R5bGVcclxuICAgICAgICAgICAgdGhpcy5tYXRyaXhbeV1beF0gJj0gfnBhcnNlSW50KGtleSk7XHJcbiAgICAgICAgICAgIC8vIGFuZCBJIGNhbiBhZGFwdCB0aGUgcGVybXV0YXRpb25zXHJcbiAgICAgICAgICAgIGNvbFBlcm11dGF0aW9ucyA9IGNvbFBlcm11dGF0aW9ucy5maWx0ZXIoKHBlcm11dGF0aW9uKSA9PiAocGVybXV0YXRpb24gJiBwYXJzZUludChrZXkpKSA9PSBwYXJzZUludChrZXkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC0tLSBlbmQgb2Ygc3Vkb2t1IHJ1bGVzIC0tLVxyXG5cclxuICAgICAgICAvLyAtLS0gcnVsZSBvdXQgcGVybXV0YXRpb25zIGluIG90aGVyIHRpbGVzIGJhc2VkIG9uIHBvc3NpYmxlIHBlcm11dGF0aW9ucyBmcm9tIHRoaXMgdGlsZVxyXG5cclxuICAgICAgICBsZXQgcG9zc2libGVOdW1iZXJzID0gdGhpcy5jYW5kaWRhdGVzQXNSZWFkYWJsZUFycmF5KHRoaXMubWF0cml4W3ldW3hdKTtcclxuICAgICAgICBsZXQgbGVmdG92ZXJSb3dQZXJtdXRhdGlvbnMgPSAwO1xyXG4gICAgICAgIHBvc3NpYmxlTnVtYmVycy5mb3JFYWNoKChudW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IHJvd1Blcm11dGF0aW9uc0Zvck51bSA9IHRoaXMuc3VtVGFibGVbcm93SW5mby5zdW1dW3Jvd0luZm8uam9pbnRUaWxlcy5sZW5ndGhdLmZpbHRlcigocGVybXV0YXRpb24pID0+IHBlcm11dGF0aW9uICYgKDIgKiogKG51bSAtIDEpKSk7XHJcbiAgICAgICAgICAgIHJvd1Blcm11dGF0aW9uc0Zvck51bSA9IHJvd1Blcm11dGF0aW9uc0Zvck51bS5tYXAoKHBlcm11dGF0aW9uKSA9PiBwZXJtdXRhdGlvbiAmIH4oMiAqKiAobnVtIC0gMSkpKTtcclxuICAgICAgICAgICAgcm93UGVybXV0YXRpb25zRm9yTnVtLmZvckVhY2goKHBlcm11dGF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0b3ZlclJvd1Blcm11dGF0aW9ucyB8PSBwZXJtdXRhdGlvbjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcm93SW5mby5qb2ludFRpbGVzLmZvckVhY2goKGNvb3JkczogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjb29yZHMueCA9PT0geCAmJiBjb29yZHMueSA9PT0geSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdICY9IGxlZnRvdmVyUm93UGVybXV0YXRpb25zO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBsZWZ0b3ZlckNvbFBlcm11dGF0aW9ucyA9IDA7XHJcbiAgICAgICAgcG9zc2libGVOdW1iZXJzLmZvckVhY2goKG51bSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29sUGVybXV0YXRpb25zRm9yTnVtID0gdGhpcy5zdW1UYWJsZVtjb2xJbmZvLnN1bV1bY29sSW5mby5qb2ludFRpbGVzLmxlbmd0aF0uZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gcGVybXV0YXRpb24gJiAoMiAqKiAobnVtIC0gMSkpKTtcclxuICAgICAgICAgICAgY29sUGVybXV0YXRpb25zRm9yTnVtID0gY29sUGVybXV0YXRpb25zRm9yTnVtLm1hcCgocGVybXV0YXRpb24pID0+IHBlcm11dGF0aW9uICYgfigyICoqIChudW0gLSAxKSkpO1xyXG4gICAgICAgICAgICBjb2xQZXJtdXRhdGlvbnNGb3JOdW0uZm9yRWFjaCgocGVybXV0YXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGxlZnRvdmVyQ29sUGVybXV0YXRpb25zIHw9IHBlcm11dGF0aW9uO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb2xJbmZvLmpvaW50VGlsZXMuZm9yRWFjaCgoY29vcmRzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGNvb3Jkcy54ID09PSB4ICYmIGNvb3Jkcy55ID09PSB5KSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0gJj0gbGVmdG92ZXJDb2xQZXJtdXRhdGlvbnM7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIC0tLSBlbmQgb2YgcnVsZSBvdXQgcGVybXV0YXRpb25zIGluIG90aGVyIHRpbGVzIGJhc2VkIG9uIHBvc3NpYmxlIHBlcm11dGF0aW9ucyBmcm9tIHRoaXMgdGlsZSAtLS1cclxuXHJcbiAgICAgICAgbGV0IGNvbFN1cGVyUG9zaXRpb24gPSB0aGlzLnJlZHVjZVRvU3VwZXJwb3NpdGlvbihjb2xQZXJtdXRhdGlvbnMpO1xyXG4gICAgICAgIGxldCByb3dTdXBlclBvc2l0aW9uID0gdGhpcy5yZWR1Y2VUb1N1cGVycG9zaXRpb24ocm93UGVybXV0YXRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gdGVtcG9yYXJ5LCBuZWVkcyB0byBiZSBtYWRlIGludG8gc2V2ZXJhbCBzdGVwc1xyXG4gICAgICAgIHRoaXMubWF0cml4W3ldW3hdICY9IGNvbFN1cGVyUG9zaXRpb24gJiByb3dTdXBlclBvc2l0aW9uO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9yIHByZXR0eSBjb25zb2xlIG91dHB1dFxyXG4gICAgcHJpdmF0ZSB2aXN1YWxpemVTdGF0ZU9mVGlsZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjYW5kaWRhdGVTdHJpbmcgPSAoXCIwMDAwMDAwMDBcIiArIHRoaXMubWF0cml4W3ldW3hdLnRvU3RyaW5nKDIpKS5zbGljZSgtOSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFN0YXRlIG9mIFRpbGUgYXQgeDogJHt4fSBhbmQgeTogJHt5fSBpcyBcXG5cIiArIFwiJHtjYW5kaWRhdGVTdHJpbmd9IG9yICR7dGhpcy5jYW5kaWRhdGVzQXNSZWFkYWJsZUFycmF5KHRoaXMubWF0cml4W3ldW3hdKX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENvbHVtbkluZm8oeTogbnVtYmVyLCB4OiBudW1iZXIpOiB7IHN1bTogbnVtYmVyOyBqb2ludFRpbGVzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1bXSB9IHtcclxuICAgICAgICB3aGlsZSAoeSA+PSAwICYmIHRoaXMubWF0cml4W3ldW3hdICYgNTExKSB7XHJcbiAgICAgICAgICAgIHktLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbENvb3JkaW5hdGVzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgICAgIHdoaWxlICh5ICsgY29sQ29vcmRpbmF0ZXMubGVuZ3RoIDwgOSAmJiB0aGlzLm1hdHJpeFt5ICsgY29sQ29vcmRpbmF0ZXMubGVuZ3RoICsgMV1beF0gJiA1MTEpIHtcclxuICAgICAgICAgICAgY29sQ29vcmRpbmF0ZXMucHVzaCh7IHk6IHkgKyBjb2xDb29yZGluYXRlcy5sZW5ndGggKyAxLCB4OiB4IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHsgc3VtOiB0aGlzLm1hdHJpeFt5XVt4XSA+PiAxNSwgam9pbnRUaWxlczogY29sQ29vcmRpbmF0ZXMgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJvd0luZm8oeTogbnVtYmVyLCB4OiBudW1iZXIpOiB7IHN1bTogbnVtYmVyOyBqb2ludFRpbGVzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1bXSB9IHtcclxuICAgICAgICB3aGlsZSAoeCA+PSAwICYmIHRoaXMubWF0cml4W3ldW3hdICYgNTExKSB7XHJcbiAgICAgICAgICAgIHgtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJvd0Nvb3JkaW5hdGVzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgICAgIHdoaWxlICh4ICsgcm93Q29vcmRpbmF0ZXMubGVuZ3RoIDwgOSAmJiB0aGlzLm1hdHJpeFt5XVt4ICsgcm93Q29vcmRpbmF0ZXMubGVuZ3RoICsgMV0gJiA1MTEpIHtcclxuICAgICAgICAgICAgcm93Q29vcmRpbmF0ZXMucHVzaCh7IHk6IHksIHg6IHggKyByb3dDb29yZGluYXRlcy5sZW5ndGggKyAxIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHsgc3VtOiAodGhpcy5tYXRyaXhbeV1beF0gPj4gOSkgJiA2Mywgam9pbnRUaWxlczogcm93Q29vcmRpbmF0ZXMgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZHVjZVRvU3VwZXJwb3NpdGlvbihwZXJtdXRhdGlvbnM6IG51bWJlcltdKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gcGVybXV0YXRpb25zLnJlZHVjZSgoYWNjLCBjdXIpID0+IHtcclxuICAgICAgICAgICAgYWNjIHw9IGN1cjtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbmRpZGF0ZXNBc1JlYWRhYmxlQXJyYXkoYmluYXJ5OiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgbGV0IGNhbmRpZGF0ZXM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGJpbmFyeSAmICgyICoqIGkpKSB7XHJcbiAgICAgICAgICAgICAgICBjYW5kaWRhdGVzLnB1c2goaSArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYW5kaWRhdGVzO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyAgICAgcHVibGljIHNvbHZlU3RlcCgpOiB2b2lkIHtcclxuXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgcm93SW5mbyA9IHRoaXMuZ2V0Um93SW5mbyh5LCB4KTtcclxuLy8gICAgICAgICAgICAgICAgIGxldCBjb2xJbmZvID0gdGhpcy5nZXRDb2x1bW5JbmZvKHksIHgpO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIC8vIGFsbCBwZXJtdXRhdGlvbnMgd2l0aCBnaXZlbiB0aWxlIGFtb3VudCB0byBzdW1cclxuLy8gICAgICAgICAgICAgICAgIGxldCByb3dQZXJtdXRhdGlvbnMgPSB0aGlzLnN1bVRhYmxlW3Jvd0luZm8uc3VtXVtyb3dJbmZvLnRpbGVDb29yZHMubGVuZ3RoXTtcclxuLy8gICAgICAgICAgICAgICAgIGxldCBjb2xQZXJtdXRhdGlvbnMgPSB0aGlzLnN1bVRhYmxlW2NvbEluZm8uc3VtXVtjb2xJbmZvLnRpbGVDb29yZHMubGVuZ3RoXTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICByb3dQZXJtdXRhdGlvbnMgPSByb3dQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gcGVybXV0YXRpb24gJiB0aWxlLm51bSk7XHJcbi8vICAgICAgICAgICAgICAgICBjb2xQZXJtdXRhdGlvbnMgPSBjb2xQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gcGVybXV0YXRpb24gJiB0aWxlLm51bSk7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHJvdyAob3IgY29sdW1uKSBpcyBhbHJlYWR5IGhhcyBmaXhlZCB0aWxlcywgdGhlIHBlcm11dGF0aW9ucyBoYXZlIHRvIGluY2x1ZGUgdGhlc2UgZml4ZWQgbnVtYmVyc1xyXG4vLyAgICAgICAgICAgICAgICAgbGV0IGZpeGVkSW5Sb3cgPSAwO1xyXG4vLyAgICAgICAgICAgICAgICAgcm93SW5mby50aWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ub25seVBvc3NpYmxlTnVtYmVyKCkgIT09IDApIHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRJblJvdyB8PSB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bTtcclxuLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICAgICAgICAgIGxldCBmaXhlZEluQ29sID0gMDtcclxuLy8gICAgICAgICAgICAgICAgIGNvbEluZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm9ubHlQb3NzaWJsZU51bWJlcigpICE9PSAwKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkSW5Db2wgfD0gdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW07XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgLy8gZmlsdGVyIHRoZSBwZXJtdXRhdGlvbnMgYnkgdGhlIG51bWJlcnMgdGhhdCBhcmUgYWxyZWFkeSBmaXhlZCBpbiB0aGUgdGlsZSwgdGhlcmVmb3JlIGhhdmluZyB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgcGVybXV0YXRpb25cclxuLy8gICAgICAgICAgICAgICAgIGlmIChmaXhlZEluUm93KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgcm93UGVybXV0YXRpb25zID0gcm93UGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IChwZXJtdXRhdGlvbiAmIGZpeGVkSW5Sb3cpID09PSBmaXhlZEluUm93KTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIGlmIChmaXhlZEluQ29sKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgY29sUGVybXV0YXRpb25zID0gY29sUGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IChwZXJtdXRhdGlvbiAmIGZpeGVkSW5Db2wpID09PSBmaXhlZEluQ29sKTtcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgICAgICAgICAvLyBmb3IgdGhpcyBjdXJyZW50IHRpbGUsIHRoZSBwZXJtdXRhdGlvbnMgYXJlIGNvbWJpbmVkIHRvIGEgc3VwZXJwb3NpdGlvblxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IGNvbWJpbmVkUm93UGVybXV0YXRpb25zID0gdGhpcy5yZWR1Y2VUb1N1cGVycG9zaXRpb24ocm93UGVybXV0YXRpb25zKTtcclxuLy8gICAgICAgICAgICAgICAgIGxldCBjb21iaW5lZENvbFBlcm11dGF0aW9ucyA9IHRoaXMucmVkdWNlVG9TdXBlcnBvc2l0aW9uKGNvbFBlcm11dGF0aW9ucyk7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgLy8gdGhlIHN1cGVycG9zaXRpb24gaW5jbHVkZXMgdGhlIGFsbCBsZWZ0b3ZlciBwZXJtdXRhdGlvbnMgYWZ0ZXIgZmlsdGVyaW5nLCBzbyB0aGUgcGVybXV0YXRpb25zIGluIHRoZSBvdGhlciB0aWxlcyBpbiB0aGUgcm93IGFuZCBjb2x1bW4gY2FuIGJlIHJlZHVjZWRcclxuLy8gICAgICAgICAgICAgICAgIHJvd0luZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtICY9IGNvbWJpbmVkUm93UGVybXV0YXRpb25zO1xyXG4vLyAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgY29sSW5mby50aWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0gJj0gY29tYmluZWRDb2xQZXJtdXRhdGlvbnM7XHJcbi8vICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAvLyBib3RoIHN1cGVycG9zaXRpb25zIGFyZSBiZWluZyBjb21iaW5lZCBhbmQgdGhlbiBhcHBsaWVkIHRvIHRoZSB0aWxlXHJcbi8vICAgICAgICAgICAgICAgICB0aWxlLm51bSAmPSBjb21iaW5lZFJvd1Blcm11dGF0aW9ucyAmIGNvbWJpbmVkQ29sUGVybXV0YXRpb25zO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIHRoaXMuc3Vkb2t1UnVsZXMoeSwgeCk7XHJcblxyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwcml2YXRlIHN1ZG9rdVJ1bGVzKHk6IG51bWJlciwgeDogbnVtYmVyKTogdm9pZCB7XHJcbi8vICAgICAgICAgLy8gd2UgY2hlY2ssIGhvdyBtYW55IHBvc3NpYmxlIG51bWJlcnMgdGhlIGN1cnJlbnQgdGlsZSBoYXNcclxuLy8gICAgICAgICAvLyBpZiB0aGUgdGlsZSBpcyBhbHJlYWR5IGZpeGVkLCBpdCBzaG91bGQgcmV0dXJuIDEgbnVtYmVyXHJcbi8vICAgICAgICAgbGV0IHBvc3NpYmxlTnVtYmVycyA9IHRoaXMubWF0cml4W3ldW3hdLm51bS50b1N0cmluZygyKS5zcGxpdChcIjFcIikubGVuZ3RoIC0gMTtcclxuXHJcbi8vICAgICAgICAgbGV0IGNvbEluZm8gPSB0aGlzLmdldENvbHVtbkluZm8oeSwgeCk7XHJcbi8vICAgICAgICAgY29sSW5mby50aWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbi8vICAgICAgICAgICAgIC8vIHdpdGhpbiB0aGlzIGlmLCB0aGVyZSBtaWdodCBiZSBhIHdheSB0byBmaXgvaW5jbHVkZSB0aGUgc29sdXRpb24gOCBmb3IgdGhlIHRpbGUgYXQgeTogMSBhbmQgeDogNiBvbiBtZWRpdW1bMF1cclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtID09PSB0aGlzLm1hdHJpeFt5XVt4XS5udW0pIHtcclxuLy8gICAgICAgICAgICAgICAgIHBvc3NpYmxlTnVtYmVycyAtPSAxO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgaWYgKHBvc3NpYmxlTnVtYmVycyA9PT0gMCkge1xyXG4vLyAgICAgICAgICAgICBjb2xJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFt5XVt4XS5udW0gPT0gdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0pIHJldHVybjtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtICY9IH50aGlzLm1hdHJpeFt5XVt4XS5udW07XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcG9zc2libGVOdW1iZXJzID0gdGhpcy5tYXRyaXhbeV1beF0ubnVtLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKS5sZW5ndGggLSAxO1xyXG4vLyAgICAgICAgIGxldCByb3dJbmZvID0gdGhpcy5nZXRSb3dJbmZvKHksIHgpO1xyXG4vLyAgICAgICAgIHJvd0luZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0gPT09IHRoaXMubWF0cml4W3ldW3hdLm51bSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcG9zc2libGVOdW1iZXJzIC09IDE7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KTtcclxuLy8gICAgICAgICBpZiAocG9zc2libGVOdW1iZXJzID09PSAwKSB7XHJcbi8vICAgICAgICAgICAgIHJvd0luZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W3ldW3hdLm51bSA9PSB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSkgcmV0dXJuO1xyXG4vLyAgICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0gJj0gfnRoaXMubWF0cml4W3ldW3hdLm51bTtcclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybjtcclxuLy8gICAgIH1cclxuXHJcbi8qKlxyXG4gKiBUT0RPOlxyXG4gKiAtIGFlc3RoZXRpY3M6ICAgICAgICAgICAgICAgIG1ha2UgdGhlIGNvbG9ycyBwcmV0dGllciB0byBsb29rIGF0IGluIHZpZXcgKG1heWJlIG9ubHkgc2hvdyBsaXR0bGUgbnVtYmVycyBpZiBhbnkgc29ydCBvZiBzb2x2aW5nIGhhcyBiZWVuIHN0YXJ0ZWQpXHJcbiAqIC0gYWVzdGhldGljcyArIG1lY2hhbmljczogICAgYWZ0ZXIgZWFjaCBjbGljayBvZiB0aGUgc29sdmVTdGVwIGJ1dHRvbiwgY29sb3IgdGhlIHRpbGVzIHRoYXQgaGF2ZSBiZWVuIGFmZmVjdGVkIGJ5IHRoZSBzb2x2ZSBjaGFuZ2UgZnVuY3Rpb24gKHRoaXMgcmVxdWlyZXMgdG8gc2F2ZSBhIGNvcHkgb2YgdGhlIHByZXZpb3VzIHN0YXRlIG9mIHRoZSBtYXRyaXgpXHJcbiAqIC0gbWVjaGFuaWNzOiAgICAgICAgICAgICAgICAgbWFrZSBhIHNvbHZlQWxsIGJ1dHRvbiB0aGF0IHJlcGVhdGVkbHkvcmVjdXJzaXZlbHkgY2FsbHMgdGhlIHNvbHZlIGZ1bmN0aW9uIHVudGlsIG5vIG1vcmUgY2hhbmdlcyBjYW4gYmUgbWFkZVxyXG4gKiAtIHJlYWRhYmlsaXR5OiAgICAgICAgICAgICAgIG1ha2UgdGhlIGNvZGUgbW9yZSByZWFkYWJsZSBieSBzcGxpdHRpbmcgdGhlIHNvbHZlU3RlcCBmdW5jdGlvbiBpbnRvIHNtYWxsZXIgZnVuY3Rpb25zIGlmIHBvc3NpYmxlXHJcbiAqIC0gcmVhZGFiaWxpdHk6ICAgICAgICAgICAgICAgbWFrZSB0aGUgY29kZSBtb3JlIHJlYWRhYmxlIGJ5IGFkZGluZyBjb21tZW50cyB0byB0aGUgY29kZVxyXG4gKiAtIGVycm9yIGhhbmRsaW5nOiAgICAgICAgICAgIGFkZCBlcnJvciBoYW5kbGluZyBmb3IgdGhlIGNhc2UgdGhhdCB0aGUgaW5wdXQgbWF0cml4IGlzIG5vdCB2YWxpZFxyXG4gKiAtIGVycm9yIGhhbmRsaW5nOiAgICAgICAgICAgIGFkZCBlcnJvciBoYW5kbGluZyBmb3IgdGhlIGNhc2UgdGhhdCB0aGUgc3VtIG9mIHRoZSByb3cgb3IgdGhlIGNvbHVtbiBpc24ndCB2YWxpZFxyXG4gKiAtIHJ1bGVzOiAgICAgICAgICAgICAgICAgICAgIGZvciBlYXN5WzFdLCBzcGVjaWZ5IGEgcnVsZSB0aGF0LCBpbiBjYXNlIHNvbWUgbnVtYmVycyBhcmUgYWxyZWFkeSBmaXhlZCBhcyB0aGUgZmluYWwgbnVtYmVycywgcmVhcHBsaWVzIHRoZSBzdW1UYWJsZSAoaWYgeW91IGhhdmUgdGhyZWUgdGlsZXMgaW4gYSByb3cgYW5kIG9uZSBpcyBhbHJlYWR5IHNhZmUsIHRoZSBzdW0gb2YgdGhlIG90aGVyIHR3byB0aWxlcyBjYW4gYmUgcmVjYWxjdWxhdGVkIGFuZCB0ZXN0ZWQgYWdhaW5zdCB0aGUgc3VtVGFibGUpXHJcbiAqIC0gcnVsZXM6ICAgICAgICAgICAgICAgICAgICAgZm9yIGVhc3lbMV0sIHNwZWNpZnkgYSBydWxlIHRoYXQgc29sdmVzIHJvdyAyIGJ5IHJlYWxpemluZyB0aGF0IG9ubHkgOCBhbmQgOSBhcmUgYWxyZWFkeSBmaXhlZCBmb3IgdGhlIGZpbmFsIHBlcm11dGF0aW9uIGFuZCBhZGp1c3QgdGhlIG90aGVyIHRpbGVzIGFjY29yZGluZ2x5XHJcbiAqXHJcbiAqXHJcbiAqL1xyXG4iLCJleHBvcnQgY2xhc3MgVmlldyB7XHJcbiAgICBib2FyZDogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICB0aWxlU2l6ZTogbnVtYmVyO1xyXG4gICAgdGlsZVBhZGRpbmc6IG51bWJlcjtcclxuICAgIHByaXZhdGUgYm9hcmRTaWRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvcmRlclJhZGl1czogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIGJvYXJkQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1jb250YWluZXJcIikgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ib3JkZXJSYWRpdXMgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3Qm9hcmQobWF0cml4OiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDYW52YXMobWF0cml4KTtcclxuICAgICAgICB0aGlzLmRyYXdCYWNrZ3JvdW5kKCk7XHJcblxyXG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goKHRpbGUsIHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlQ29ybmVyWSA9IHkgKiB0aGlzLnRpbGVTaXplO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVDb3JuZXJYID0geCAqIHRoaXMudGlsZVNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIHVucGxheWFibGUgdGlsZXMgd2l0aCBzdW1zXHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAmIDUxMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BsYXlhYmxlVGlsZSh0aWxlLCBub2RlQ29ybmVyWCwgbm9kZUNvcm5lclkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdVbnBsYXlhYmxlVGlsZSh0aWxlLCBub2RlQ29ybmVyWCwgbm9kZUNvcm5lclkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3R3JpZGxpbmVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3VW5wbGF5YWJsZVRpbGUodGlsZTogbnVtYmVyLCBub2RlQ29ybmVyWDogbnVtYmVyLCBub2RlQ29ybmVyWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNvbFZhbHVlID0gdGlsZSA+PiAxNTtcclxuICAgICAgICBpZiAoY29sVmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoY29sVmFsdWUudG9TdHJpbmcoKSwgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMSwgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMyAtIHRoaXMudGlsZVBhZGRpbmcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJvd1ZhbHVlID0gKHRpbGUgPj4gOSkgJiA2MztcclxuICAgICAgICBpZiAocm93VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICAoXCIgIFwiICsgcm93VmFsdWUudG9TdHJpbmcoKSkuc2xpY2UoLTIpLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMiAtIHRoaXMudGlsZVBhZGRpbmcgLyAyLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMiAtIHRoaXMudGlsZVBhZGRpbmdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb2xWYWx1ZSAmJiByb3dWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKG5vZGVDb3JuZXJYLCBub2RlQ29ybmVyWSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhub2RlQ29ybmVyWCArIHRoaXMudGlsZVNpemUsIG5vZGVDb3JuZXJZICsgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMudGlsZVNpemUgLyAyNTtcclxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdQbGF5YWJsZVRpbGUodGlsZTogbnVtYmVyLCBub2RlQ29ybmVyWDogbnVtYmVyLCBub2RlQ29ybmVyWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gYmFja2dyb3VuZCBmb3IgcGxheWFibGUgdGlsZVxyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwibGlnaHRncmF5XCI7XHJcbiAgICAgICAgdGhpcy5jdHgucmVjdChub2RlQ29ybmVyWCwgbm9kZUNvcm5lclksIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuXHJcbiAgICAgICAgLy8gdGhlIGFscmVhZHkgc2FmZSBudW1iZXJzIGluIHRoZSB0aWxlcyAoZS5nLiBpZiB0aGUgdGlsZSBoYXMgMDAwIDAwMSAwMDAgd3JpdHRlbiwgNCBpcyB0aGUgb25seSBudW1iZXIgbGVmdCB0byBiZSBwbGFjZWQgaW4gdGhlIHRpbGUpXHJcbiAgICAgICAgLy8gMDAwIDAwMSAwMDAgLT4gbmFjaCBzcGxpdCAtPiBbXCIwMDAwMFwiLCBcIjAwMFwiXVxyXG4gICAgICAgIGxldCBvbmx5UG9zc2libGVOdW1iZXIgPSB0aWxlLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKTtcclxuICAgICAgICBpZiAob25seVBvc3NpYmxlTnVtYmVyLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIChvbmx5UG9zc2libGVOdW1iZXJbMV0ubGVuZ3RoICsgMSkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDAgKyB0aGlzLnRpbGVQYWRkaW5nICogMyxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDMgLSB0aGlzLnRpbGVQYWRkaW5nICogMlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0aGUgY2FuZGlkYXRlIG51bWJlcnMgaW4gdGhlIHRpbGVzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCEodGlsZSAmICgyICoqIGkpKSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJncmV5XCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgKGkgKyAxKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogKGkgJSAzKSArIHRoaXMudGlsZVBhZGRpbmcsXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiBNYXRoLmZsb29yKChpICsgMykgLyAzKSAtIHRoaXMudGlsZVBhZGRpbmdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVDYW52YXMobWF0cml4OiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5pZCA9IFwiYm9hcmRcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLmJveFNoYWRvdyA9IFwiNXB4IDVweCAyMHB4IGdyYXlcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLmJvcmRlclJhZGl1cyA9IHRoaXMuYm9yZGVyUmFkaXVzICsgXCIlXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5tYXJnaW4gPSBcIjElXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC53aWR0aCA9IHRoaXMuYm9hcmRDb250YWluZXIuY2xpZW50V2lkdGggKiAwLjk4O1xyXG4gICAgICAgIHRoaXMuYm9hcmQuaGVpZ2h0ID0gdGhpcy5ib2FyZENvbnRhaW5lci5jbGllbnRIZWlnaHQgKiAwLjk4O1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuYm9hcmQpO1xyXG5cclxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuYm9hcmQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMuYm9hcmRTaWRlTGVuZ3RoID0gdGhpcy5ib2FyZC5jbGllbnRXaWR0aDtcclxuICAgICAgICB0aGlzLnRpbGVTaXplID0gdGhpcy5ib2FyZFNpZGVMZW5ndGggLyBtYXRyaXgubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMudGlsZVBhZGRpbmcgPSB0aGlzLnRpbGVTaXplIC8gMTU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QmFja2dyb3VuZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgdGhpcy5jdHgucm91bmRSZWN0KDAsIDAsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGgsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGgsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGggKiAodGhpcy5ib3JkZXJSYWRpdXMgLyAxMDApKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3R3JpZGxpbmVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDw9IHRoaXMuYm9hcmRTaWRlTGVuZ3RoOyBsICs9IHRoaXMudGlsZVNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKGwsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8obCwgdGhpcy5ib2FyZFNpZGVMZW5ndGgpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmJvYXJkU2lkZUxlbmd0aCwgbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMudGlsZVNpemUgLyAyNTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcclxuaW1wb3J0IHsgbGV2ZWxzIH0gZnJvbSBcIi4vbGV2ZWxzXCI7XHJcblxyXG4vKiogaGFuZGxlcyBhbGwgaW5wdXQsIGNoZWNrcyBpbiB3aXRoIG1vZGVsIGFuZCBkaXNwbGF5cyB0aGUgcmVzdWx0IHdpdGggdmlldyAqL1xyXG5cclxuY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgICBtb2RlbDogTW9kZWw7XHJcbiAgICB2aWV3OiBWaWV3O1xyXG5cclxuICAgIC8vIGJ1dHRvbnNcclxuICAgIHNvbHZlT25lU3RlcEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBzb2x2ZUFsbEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBkZWJ1ZzE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWwobGV2ZWxzLmhhcmRbMF0pO1xyXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudHMoKTtcclxuICAgICAgICB0aGlzLmluaXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERvbUVsZW1lbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29sdmVPbmVTdGVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x2ZS1zdGVwXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMuc29sdmVBbGxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvbHZlLWFsbFwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLmRlYnVnMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYjFcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0RXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2x2ZU9uZVN0ZXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb2x2ZVN0ZXAoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29sdmVBbGxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb2x2ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kZWJ1ZzEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb2x2ZVRpbGUoNSwgNCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZpZXcuZHJhd0JvYXJkKHRoaXMubW9kZWwubWF0cml4KTtcclxuICAgICAgICB0aGlzLnZpZXcuYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4gdGhpcy5ib2FyZENsaWNrZWQoZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJvYXJkQ2xpY2tlZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm9hcmQgY2xpY2tlZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYXBwID0gbmV3IENvbnRyb2xsZXIoKTtcclxuXHJcbi8vIFwibnBtIHJ1biBzdGFydFwiIGluIHRlcm1pbmFsIHRvIHN0YXJ0IGxpdmUgc2VydmVyXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
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
    hard: new Array(1),
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
                _this.solveTile(tile, y, x);
            });
        });
        console.log("--- solved step ---");
        return;
    };
    Model.prototype.solveTile = function (candidates, y, x) {
        // this way, I can wirte whatever I want into candidates without changing the matrix
        // only when I'm done, I can write the candidates back into the matrix
        // this.matrix[y][x] = candidates;
        var colInfo = this.getColumnInfo(y, x);
        var rowInfo = this.getRowInfo(y, x);
        // all permutations where the given jointTiles amount to sum
        var colPermutations = this.sumTable[colInfo.sum][colInfo.jointTiles.length];
        var rowPermutations = this.sumTable[rowInfo.sum][rowInfo.jointTiles.length];
        // removing permutations that don't include any of the tiles candidates
        // this can probably be specified more precicely by not only filtering what the candidates in this tile are, but also what the fixed numbers in the other tiles are
        colPermutations = colPermutations.filter(function (permutation) { return permutation & candidates; });
        rowPermutations = rowPermutations.filter(function (permutation) { return permutation & candidates; });
        // --- sudoku rules ---
        // i not only want to check for numbers that are fixed in other tiles but also for tiles that have overlapping candidates
        // meaning of course, if another tile has a fixed 2 in it, we want to strike out the 2 in this tile
        // but what if for example two different tiles in the same row both have only the 8 or 9 as candidates left?
        // then we can strike out the 8 and 9 in this tile because they have to be in those other tiles one each
        // same goes for three tiles in a row that have 8, 9 and 7 as candidates left. The hard part is to cross reference three tiles where one has 8 and 9, one has 8 and 7 and one has 9 and 7
        // in that case all three numbers are used and can no longer occour in this tile but how to check for that?
        // let temp = this.candidatesAsReadableArray(candidates);
        // if (temp.length === 1) {
        //     colInfo.jointTiles.forEach((tile: { x: number; y: number }) => {
        //         if (tile.x === x && tile.y === y) return;
        //         this.matrix[tile.y][tile.x] &= ~candidates;
        //     });
        //     rowInfo.jointTiles.forEach((tile: { x: number; y: number }) => {
        //         if (tile.x === x && tile.y === y) return;
        //         this.matrix[tile.y][tile.x] &= ~candidates;
        //     });
        // }
        // temporary, needs to be made into several steps
        this.matrix[y][x] = this.reduceToSuperposition(colPermutations) & this.reduceToSuperposition(rowPermutations);
        return;
    };
    // for pretty console output
    Model.prototype.visualizeStateOfTile = function (x, y) {
        var candidateString = ("000000000" + this.matrix[y][x].toString(2)).slice(-9);
        console.log("State of Tile at x: ".concat(x, " and y: ").concat(y, " is \n").concat(candidateString, " or ").concat(this.candidatesAsReadableArray(this.matrix[y][x])));
    };
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
            this.ctx.fillText(rowValue.toString(), nodeCornerX + (this.tileSize / 3) * 2 - this.tilePadding / 2, nodeCornerY + (this.tileSize / 3) * 2 - this.tilePadding);
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
        this.model = new _model__WEBPACK_IMPORTED_MODULE_0__.Model(_levels__WEBPACK_IMPORTED_MODULE_2__.levels.easy[0]);
        this.view = new _view__WEBPACK_IMPORTED_MODULE_1__.View();
        this.getDomElements();
        this.initEventListeners();
        this.updateView();
    }
    Controller.prototype.getDomElements = function () {
        this.solveOneStepButton = document.getElementById("solve-step");
        this.solveAllButton = document.getElementById("solve-all");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTSxNQUFNLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUNEO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEM7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkM7S0FDSjtJQUNELElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEIsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6QixPQUFPLEVBQUU7UUFDTDtZQUNJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxD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RUFBRTtZQUM5QixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBQzlDLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdkIsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDMUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sK0JBQVUsR0FBbEI7UUFBQSxpQkFHQztRQUZHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBaUIsSUFBSyxZQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVPLGlDQUFZLEdBQXBCLFVBQXFCLEtBQWlCO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQztBQUVELElBQU0sR0FBRyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFFN0IsbURBQW1EIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL2xldmVscy50cyIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvbW9kZWwudHMiLCJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL3ZpZXcudHMiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBsZXZlbHMgPSB7XHJcbiAgICBlYXN5OiBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMCwgNDUsIDMsIDAsIDAsIDAsIDMsIDQ1LCAwXSxcclxuICAgICAgICAgICAgWzAsIDE3LjA4LCAxLCAxLCAwLCAxNiwgNC4wMywgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLjExLCAxLCAxLCAxLCAxNi4xNywgMSwgMSwgMSwgMSwgMTddLFxyXG4gICAgICAgICAgICBbMC4xNywgMSwgMSwgMy4xNywgMSwgMSwgMSwgMC4xNiwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLjE4LCAxLCAxLCAxLCAwLCAwLCAxNy4xMywgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAxNy4wNCwgMSwgMSwgMCwgMCwgMy4xMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLjA5LCAxLCAxLCAwLCAxNiwgMy4xNiwgMSwgMSwgMSwgNF0sXHJcbiAgICAgICAgICAgIFswLjE0LCAxLCAxLCAzLjEsIDEsIDEsIDEsIDE2LjEyLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAuMTksIDEsIDEsIDEsIDEsIDAuMTgsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMC4wNSwgMSwgMSwgMCwgMCwgMC4xLCAxLCAxLCAwXSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDIzLCAyOSwgNCwgMCwgMCwgMCwgMCwgMywgMTddLFxyXG4gICAgICAgICAgICBbMC4xNywgMSwgMSwgMSwgNCwgMCwgMzAsIDE3LjEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4yMSwgMSwgMSwgMSwgMSwgNC4yNCwgMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjE0LCAxLCAxLCAxNi4yLCAxLCAxLCAxLCAxLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAuMTIsIDEsIDEsIDEwLjExLCAxLCAxLCAzLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMTEsIDEsIDEsIDE3LjEsIDEsIDEsIDMwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDE2LjEsIDEsIDEsIDQuMDgsIDEsIDEsIDddLFxyXG4gICAgICAgICAgICBbMCwgNCwgMy4yNCwgMSwgMSwgMSwgMSwgMTYuMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjEzLCAxLCAxLCAxLCAxLCAwLjE4LCAxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMDQsIDEsIDEsIDAsIDAsIDAsIDAuMiwgMSwgMSwgMV0sXHJcbiAgICAgICAgXSxcclxuICAgIF0sXHJcbiAgICBtZWRpdW06IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAwLCAyOSwgNCwgMCwgNywgMzQsIDE2LCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAuMDgsIDEsIDEsIDMuMTcsIDEsIDEsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMy4zMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLjEsIDEsIDEsIDI0LjEsIDEsIDEsIDEsIDI0LCAwLCAwXSxcclxuICAgICAgICAgICAgWzAuMTYsIDEsIDEsIDEsIDE1LCAwLjEzLCAxLCAxLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMTMsIDEsIDEsIDAuMTYsIDEsIDEsIDEwLCAxNl0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjEsIDEsIDEsIDI0LCAzLjE2LCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDE3LjE0LCAxLCAxLCAxLCAxNy4xMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjMsIDEsIDEsIDEsIDEsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMC4xOCwgMSwgMSwgMSwgMC4xMywgMSwgMSwgMF0sXHJcbiAgICAgICAgXSxcclxuICAgIF0sXHJcbiAgICBoYXJkOiBuZXcgQXJyYXkoMSksXHJcbiAgICBjaGFsbGVuZ2luZzogbmV3IEFycmF5KDEpLFxyXG4gICAgZXh0cmVtZTogW1xyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDksIDEyLCAwLCAxMiwgMzcsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMzcsIDguMDMsIDEsIDEsIDguMTUsIDEsIDEsIDldLFxyXG4gICAgICAgICAgICBbMCwgMTEuNDMsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4xNCwgMSwgMSwgMSwgNi4xMSwgMSwgMSwgMTAuMDQsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4xLCAxLCAxLCA5LjAzLCAxLCAxLCA3LjA0LCAxLCAxLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAuMTUsIDEsIDEsIDEsIDI2LjEzLCAxLCAxLCAxLCAxNl0sXHJcbiAgICAgICAgICAgIFswLCAzLjA5LCAxLCAxLCA1LjEyLCAxLCAxLCAxMC4xMiwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjA5LCAxLCAxLCAxNC4wMywgMSwgMSwgMy4xNCwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjQsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMC4xLCAxLCAxLCAwLjA4LCAxLCAxLCAwLCAwLCAwXSxcclxuICAgICAgICBdLFxyXG4gICAgXSxcclxufTtcclxuIiwiZXhwb3J0IGNsYXNzIE1vZGVsIHtcclxuICAgIG1hdHJpeDogbnVtYmVyW11bXTtcclxuICAgIHN1bVRhYmxlOiBudW1iZXJbXVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IobGV2ZWw6IG51bWJlcltdW10pIHtcclxuICAgICAgICB0aGlzLm1hdHJpeCA9IHRoaXMuaW5pdEJpbmFyeU1hdHJpeChsZXZlbCk7XHJcbiAgICAgICAgdGhpcy5zdW1UYWJsZSA9IHRoaXMuaW5pdFN1bVRhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAwMDAwMDAgMDAwMDAwIDAwMDAwMDAwMFxyXG4gICAgICogY29sICAgIHJvdyAgICBjYW5kaWRhdGVzXHJcbiAgICAgKiBpZiB0aGUgbnVtYmVyIGlzIHplcm8sIHRoZSB0aWxlIGlzIHVucGxheWFibGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0QmluYXJ5TWF0cml4KG1hdHJpeDogbnVtYmVyW11bXSk6IG51bWJlcltdW10ge1xyXG4gICAgICAgIGxldCBuZXdNYXRyaXg6IGFueVtdW10gPSBbXTtcclxuICAgICAgICBtYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByb3dBcnJheTogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goKHRpbGUsIHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93QXJyYXkucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd0FycmF5LnB1c2gocGFyc2VJbnQoXCIxXCIucmVwZWF0KDkpLCAyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZvciBhbGwgb3RoZXIgY2FzZXMsIHdlIHNlZSB0aGVtIGFzIGEgZGVjaW1hbCBudW1iZXIuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgMHRoIGJpdCBpcyAwLFxyXG4gICAgICAgICAgICAgICAgLy8gdGhlbiB0aGUgbmV4dCA2IGJpdCBpbmNyaXB0IHRoZSB0d28gbnVtYmVycyB0byB0aGUgcmlnaHQgb2YgdGhlIGNvbW1hLFxyXG4gICAgICAgICAgICAgICAgLy8gYW5kIHRoZSBsYXN0IDYgYml0IGluY3JpcHQgdGhlIHR3byBudW1iZXJzIHRvIHRoZSBsZWZ0IG9mIHRoZSBjb21tYVxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbEFuZFJvdyA9IHRpbGVcclxuICAgICAgICAgICAgICAgICAgICAudG9GaXhlZCgyKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdChcIi5cIilcclxuICAgICAgICAgICAgICAgICAgICAubWFwKChzdW0pID0+IHBhcnNlSW50KHN1bSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93Lmxlbmd0aCAhPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgaW5wdXQgbWF0cml4IGF0IHg6IFwiICsgeCArIFwiIGFuZCB5OiBcIiArIHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvd1swXSA+IDQ1IHx8IGNvbEFuZFJvd1swXSA9PSAyIHx8IGNvbEFuZFJvd1swXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXg6IHN1bSBvZiBjb2wgYXQgeTogXCIgKyB5ICsgXCIgYW5kIHg6IFwiICsgeCArIFwiIGlzIGdpdmVuIGFzIFwiICsgY29sQW5kUm93WzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3dbMV0gPiA0NSB8fCBjb2xBbmRSb3dbMV0gPT0gMiB8fCBjb2xBbmRSb3dbMV0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgaW5wdXQgbWF0cml4OiBzdW0gb2Ygcm93IGF0IHk6IFwiICsgeSArIFwiIGFuZCB4OiBcIiArIHggKyBcIiBpcyBnaXZlbiBhcyBcIiArIGNvbEFuZFJvd1sxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcm93QXJyYXkucHVzaCgoKGNvbEFuZFJvd1swXSA8PCA2KSB8IChjb2xBbmRSb3dbMV0gPDwgMCkpIDw8IDkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbmV3TWF0cml4LnB1c2gocm93QXJyYXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXdNYXRyaXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpIHdhbnQgdG8gZG8gYSBnZW5lcmFsIHRhYmxlIHdoZXJlIGFsbCB0aGUgY29tYmluYXRpb25zIG9mIDIgdXAgdG8gOSBudW1iZXJzIGFyZSBsaXN0ZWQgYW5kIHRoZSBzdW0gb2YgdGhlbSBpcyBjYWxjdWxhdGVkXHJcbiAgICAgKiB0aGUgcmVzdWx0aW5nIHN1bSBpcyB0aGUgaW5kZXggb2Ygd2hlcmUgdG8gZmluZCB0aGVzZSBjb21iaW5hdGlvbnMgaW4gdGhlIHRhYmxlXHJcbiAgICAgKiBhdCB0aGF0IGluZGV4LCB0aGUgY29tYmluYXRpb25zIGFyZSBzdG9yZWQgYXMgYSA5IGJpdCBudW1iZXIsIHdoZXJlIHRoZSBiaXQgaXMgMSBpZiB0aGUgbnVtYmVyIGlzIGluIHRoZSBjb21iaW5hdGlvblxyXG4gICAgICogdGhlIHRhYmxlIGlzIGEgNDUgZWxlbWVudCBhcnJheVxyXG4gICAgICogYXQgZWFjaCBpbmRleCwgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtIGlzIHN0b3JlZCBhdCB0aGUgaW5kZXggb2YgaXQncyBhbW91bnRcclxuICAgICAqIHRoZSBtYXRyaXggbG9va3MgYXMgZm9sbG93czpcclxuICAgICAqXHJcbiAgICAgKiBbW10sICAgICAgICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAqICBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICogIFtdLCAgICAgICAgICAgICAgICAgICAgICAgICAyXHJcbiAgICAgKiAgW1tdLFtdLFszXV0sICAgICAgICAgICAgICAgIDNcclxuICAgICAqICBbW10sW10sWzVdXSwgICAgICAgICAgICAgICAgNFxyXG4gICAgICogIFtbXSxbXSxbNiw5XV0sICAgICAgICAgICAgICA1XHJcbiAgICAgKiAgW1tdLFtdLFsxMCwxN10sWzddXV0gICAgICAgIDZcclxuICAgICAqICBbW10sW10sWzMzLDE4LCAxMl0sWzExXV0gICAgN1xyXG4gICAgICogdGhlIGZpcnN0IGluZGV4IGlzIHRoZSBzdW0gKCM0NSksIHRoZSBzZWNvbmQgaW5kZXggaXMgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtKCM5KSxcclxuICAgICAqIGVhY2ggb2YgdGhlIG51bWJlcnMgZnJvbSB0aGF0IHBvaW50IGFyZSBtZWFudCB0byBiZSByZWFkIGluIGJpbmFyeSwgaGF2aW5nIGEgMSBldmVyeXdoZXJlIHRoZSBudW1iZXIgaXMgaW4gdGhlIGNvbWJpbmF0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdFN1bVRhYmxlKCk6IG51bWJlcltdW11bXSB7XHJcbiAgICAgICAgLy8gY3JlYXRlIGEgNDV4OXg/IGVtcHR5IGFycmF5XHJcbiAgICAgICAgbGV0IHRhYmxlOiBudW1iZXJbXVtdW10gPSBBcnJheSg0NilcclxuICAgICAgICAgICAgLmZpbGwoMClcclxuICAgICAgICAgICAgLm1hcCgoKSA9PlxyXG4gICAgICAgICAgICAgICAgQXJyYXkoMTApXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbGwoMClcclxuICAgICAgICAgICAgICAgICAgICAubWFwKCgpID0+IFtdKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBiaW5Db21iaW5hdGlvbiA9IDE7IGJpbkNvbWJpbmF0aW9uIDw9IHBhcnNlSW50KFwiMTExMTExMTExXCIsIDIpOyBiaW5Db21iaW5hdGlvbisrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYW5kaWRhdGVzRGVjQXJyID0gdGhpcy5jYW5kaWRhdGVzQXNSZWFkYWJsZUFycmF5KGJpbkNvbWJpbmF0aW9uKTtcclxuICAgICAgICAgICAgbGV0IHN1bSA9IGNhbmRpZGF0ZXNEZWNBcnIucmVkdWNlKChhY2MsIGN1cikgPT4gYWNjICsgY3VyLCAwKTtcclxuICAgICAgICAgICAgdGFibGVbc3VtXVtjYW5kaWRhdGVzRGVjQXJyLmxlbmd0aF0ucHVzaChiaW5Db21iaW5hdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNvbHZlQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjaGFuZ2VzTWFkZSA9IHRydWU7XHJcbiAgICAgICAgd2hpbGUgKGNoYW5nZXNNYWRlKSB7XHJcbiAgICAgICAgICAgIGxldCBvbGRNYXRyaXggPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMubWF0cml4KSk7XHJcbiAgICAgICAgICAgIHRoaXMuc29sdmVTdGVwKCk7XHJcbiAgICAgICAgICAgIGNoYW5nZXNNYWRlID0gSlNPTi5zdHJpbmdpZnkob2xkTWF0cml4KSAhPT0gSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRyaXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc29sdmVTdGVwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEodGlsZSAmIDUxMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvbHZlVGlsZSh0aWxlLCB5LCB4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tIHNvbHZlZCBzdGVwIC0tLVwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb2x2ZVRpbGUoY2FuZGlkYXRlczogbnVtYmVyLCB5OiBudW1iZXIsIHg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIC8vIHRoaXMgd2F5LCBJIGNhbiB3aXJ0ZSB3aGF0ZXZlciBJIHdhbnQgaW50byBjYW5kaWRhdGVzIHdpdGhvdXQgY2hhbmdpbmcgdGhlIG1hdHJpeFxyXG4gICAgICAgIC8vIG9ubHkgd2hlbiBJJ20gZG9uZSwgSSBjYW4gd3JpdGUgdGhlIGNhbmRpZGF0ZXMgYmFjayBpbnRvIHRoZSBtYXRyaXhcclxuICAgICAgICAvLyB0aGlzLm1hdHJpeFt5XVt4XSA9IGNhbmRpZGF0ZXM7XHJcblxyXG4gICAgICAgIGxldCBjb2xJbmZvID0gdGhpcy5nZXRDb2x1bW5JbmZvKHksIHgpO1xyXG4gICAgICAgIGxldCByb3dJbmZvID0gdGhpcy5nZXRSb3dJbmZvKHksIHgpO1xyXG5cclxuICAgICAgICAvLyBhbGwgcGVybXV0YXRpb25zIHdoZXJlIHRoZSBnaXZlbiBqb2ludFRpbGVzIGFtb3VudCB0byBzdW1cclxuICAgICAgICBsZXQgY29sUGVybXV0YXRpb25zID0gdGhpcy5zdW1UYWJsZVtjb2xJbmZvLnN1bV1bY29sSW5mby5qb2ludFRpbGVzLmxlbmd0aF07XHJcbiAgICAgICAgbGV0IHJvd1Blcm11dGF0aW9ucyA9IHRoaXMuc3VtVGFibGVbcm93SW5mby5zdW1dW3Jvd0luZm8uam9pbnRUaWxlcy5sZW5ndGhdO1xyXG5cclxuICAgICAgICAvLyByZW1vdmluZyBwZXJtdXRhdGlvbnMgdGhhdCBkb24ndCBpbmNsdWRlIGFueSBvZiB0aGUgdGlsZXMgY2FuZGlkYXRlc1xyXG4gICAgICAgIC8vIHRoaXMgY2FuIHByb2JhYmx5IGJlIHNwZWNpZmllZCBtb3JlIHByZWNpY2VseSBieSBub3Qgb25seSBmaWx0ZXJpbmcgd2hhdCB0aGUgY2FuZGlkYXRlcyBpbiB0aGlzIHRpbGUgYXJlLCBidXQgYWxzbyB3aGF0IHRoZSBmaXhlZCBudW1iZXJzIGluIHRoZSBvdGhlciB0aWxlcyBhcmVcclxuICAgICAgICBjb2xQZXJtdXRhdGlvbnMgPSBjb2xQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gcGVybXV0YXRpb24gJiBjYW5kaWRhdGVzKTtcclxuICAgICAgICByb3dQZXJtdXRhdGlvbnMgPSByb3dQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gcGVybXV0YXRpb24gJiBjYW5kaWRhdGVzKTtcclxuXHJcbiAgICAgICAgLy8gLS0tIHN1ZG9rdSBydWxlcyAtLS1cclxuICAgICAgICAvLyBpIG5vdCBvbmx5IHdhbnQgdG8gY2hlY2sgZm9yIG51bWJlcnMgdGhhdCBhcmUgZml4ZWQgaW4gb3RoZXIgdGlsZXMgYnV0IGFsc28gZm9yIHRpbGVzIHRoYXQgaGF2ZSBvdmVybGFwcGluZyBjYW5kaWRhdGVzXHJcbiAgICAgICAgLy8gbWVhbmluZyBvZiBjb3Vyc2UsIGlmIGFub3RoZXIgdGlsZSBoYXMgYSBmaXhlZCAyIGluIGl0LCB3ZSB3YW50IHRvIHN0cmlrZSBvdXQgdGhlIDIgaW4gdGhpcyB0aWxlXHJcbiAgICAgICAgLy8gYnV0IHdoYXQgaWYgZm9yIGV4YW1wbGUgdHdvIGRpZmZlcmVudCB0aWxlcyBpbiB0aGUgc2FtZSByb3cgYm90aCBoYXZlIG9ubHkgdGhlIDggb3IgOSBhcyBjYW5kaWRhdGVzIGxlZnQ/XHJcbiAgICAgICAgLy8gdGhlbiB3ZSBjYW4gc3RyaWtlIG91dCB0aGUgOCBhbmQgOSBpbiB0aGlzIHRpbGUgYmVjYXVzZSB0aGV5IGhhdmUgdG8gYmUgaW4gdGhvc2Ugb3RoZXIgdGlsZXMgb25lIGVhY2hcclxuICAgICAgICAvLyBzYW1lIGdvZXMgZm9yIHRocmVlIHRpbGVzIGluIGEgcm93IHRoYXQgaGF2ZSA4LCA5IGFuZCA3IGFzIGNhbmRpZGF0ZXMgbGVmdC4gVGhlIGhhcmQgcGFydCBpcyB0byBjcm9zcyByZWZlcmVuY2UgdGhyZWUgdGlsZXMgd2hlcmUgb25lIGhhcyA4IGFuZCA5LCBvbmUgaGFzIDggYW5kIDcgYW5kIG9uZSBoYXMgOSBhbmQgN1xyXG4gICAgICAgIC8vIGluIHRoYXQgY2FzZSBhbGwgdGhyZWUgbnVtYmVycyBhcmUgdXNlZCBhbmQgY2FuIG5vIGxvbmdlciBvY2NvdXIgaW4gdGhpcyB0aWxlIGJ1dCBob3cgdG8gY2hlY2sgZm9yIHRoYXQ/XHJcblxyXG4gICAgICAgIC8vIGxldCB0ZW1wID0gdGhpcy5jYW5kaWRhdGVzQXNSZWFkYWJsZUFycmF5KGNhbmRpZGF0ZXMpO1xyXG4gICAgICAgIC8vIGlmICh0ZW1wLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIC8vICAgICBjb2xJbmZvLmpvaW50VGlsZXMuZm9yRWFjaCgodGlsZTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZiAodGlsZS54ID09PSB4ICYmIHRpbGUueSA9PT0geSkgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5tYXRyaXhbdGlsZS55XVt0aWxlLnhdICY9IH5jYW5kaWRhdGVzO1xyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyAgICAgcm93SW5mby5qb2ludFRpbGVzLmZvckVhY2goKHRpbGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgaWYgKHRpbGUueCA9PT0geCAmJiB0aWxlLnkgPT09IHkpIHJldHVybjtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubWF0cml4W3RpbGUueV1bdGlsZS54XSAmPSB+Y2FuZGlkYXRlcztcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyB0ZW1wb3JhcnksIG5lZWRzIHRvIGJlIG1hZGUgaW50byBzZXZlcmFsIHN0ZXBzXHJcbiAgICAgICAgdGhpcy5tYXRyaXhbeV1beF0gPSB0aGlzLnJlZHVjZVRvU3VwZXJwb3NpdGlvbihjb2xQZXJtdXRhdGlvbnMpICYgdGhpcy5yZWR1Y2VUb1N1cGVycG9zaXRpb24ocm93UGVybXV0YXRpb25zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZvciBwcmV0dHkgY29uc29sZSBvdXRwdXRcclxuICAgIHByaXZhdGUgdmlzdWFsaXplU3RhdGVPZlRpbGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2FuZGlkYXRlU3RyaW5nID0gKFwiMDAwMDAwMDAwXCIgKyB0aGlzLm1hdHJpeFt5XVt4XS50b1N0cmluZygyKSkuc2xpY2UoLTkpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBTdGF0ZSBvZiBUaWxlIGF0IHg6ICR7eH0gYW5kIHk6ICR7eX0gaXMgXFxuJHtjYW5kaWRhdGVTdHJpbmd9IG9yICR7dGhpcy5jYW5kaWRhdGVzQXNSZWFkYWJsZUFycmF5KHRoaXMubWF0cml4W3ldW3hdKX1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAgICAgcHVibGljIHNvbHZlU3RlcCgpOiB2b2lkIHtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHJvd0luZm8gPSB0aGlzLmdldFJvd0luZm8oeSwgeCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGNvbEluZm8gPSB0aGlzLmdldENvbHVtbkluZm8oeSwgeCk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGFsbCBwZXJtdXRhdGlvbnMgd2l0aCBnaXZlbiB0aWxlIGFtb3VudCB0byBzdW1cclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgcm93UGVybXV0YXRpb25zID0gdGhpcy5zdW1UYWJsZVtyb3dJbmZvLnN1bV1bcm93SW5mby50aWxlQ29vcmRzLmxlbmd0aF07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGNvbFBlcm11dGF0aW9ucyA9IHRoaXMuc3VtVGFibGVbY29sSW5mby5zdW1dW2NvbEluZm8udGlsZUNvb3Jkcy5sZW5ndGhdO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICByb3dQZXJtdXRhdGlvbnMgPSByb3dQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gcGVybXV0YXRpb24gJiB0aWxlLm51bSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29sUGVybXV0YXRpb25zID0gY29sUGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IHBlcm11dGF0aW9uICYgdGlsZS5udW0pO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcm93IChvciBjb2x1bW4pIGlzIGFscmVhZHkgaGFzIGZpeGVkIHRpbGVzLCB0aGUgcGVybXV0YXRpb25zIGhhdmUgdG8gaW5jbHVkZSB0aGVzZSBmaXhlZCBudW1iZXJzXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGZpeGVkSW5Sb3cgPSAwO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHJvd0luZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5vbmx5UG9zc2libGVOdW1iZXIoKSAhPT0gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRJblJvdyB8PSB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBmaXhlZEluQ29sID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb2xJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ub25seVBvc3NpYmxlTnVtYmVyKCkgIT09IDApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkSW5Db2wgfD0gdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gZmlsdGVyIHRoZSBwZXJtdXRhdGlvbnMgYnkgdGhlIG51bWJlcnMgdGhhdCBhcmUgYWxyZWFkeSBmaXhlZCBpbiB0aGUgdGlsZSwgdGhlcmVmb3JlIGhhdmluZyB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgcGVybXV0YXRpb25cclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAoZml4ZWRJblJvdykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICByb3dQZXJtdXRhdGlvbnMgPSByb3dQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gKHBlcm11dGF0aW9uICYgZml4ZWRJblJvdykgPT09IGZpeGVkSW5Sb3cpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAoZml4ZWRJbkNvbCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xQZXJtdXRhdGlvbnMgPSBjb2xQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gKHBlcm11dGF0aW9uICYgZml4ZWRJbkNvbCkgPT09IGZpeGVkSW5Db2wpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gZm9yIHRoaXMgY3VycmVudCB0aWxlLCB0aGUgcGVybXV0YXRpb25zIGFyZSBjb21iaW5lZCB0byBhIHN1cGVycG9zaXRpb25cclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY29tYmluZWRSb3dQZXJtdXRhdGlvbnMgPSB0aGlzLnJlZHVjZVRvU3VwZXJwb3NpdGlvbihyb3dQZXJtdXRhdGlvbnMpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBjb21iaW5lZENvbFBlcm11dGF0aW9ucyA9IHRoaXMucmVkdWNlVG9TdXBlcnBvc2l0aW9uKGNvbFBlcm11dGF0aW9ucyk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIHRoZSBzdXBlcnBvc2l0aW9uIGluY2x1ZGVzIHRoZSBhbGwgbGVmdG92ZXIgcGVybXV0YXRpb25zIGFmdGVyIGZpbHRlcmluZywgc28gdGhlIHBlcm11dGF0aW9ucyBpbiB0aGUgb3RoZXIgdGlsZXMgaW4gdGhlIHJvdyBhbmQgY29sdW1uIGNhbiBiZSByZWR1Y2VkXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcm93SW5mby50aWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtICY9IGNvbWJpbmVkUm93UGVybXV0YXRpb25zO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICBjb2xJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0gJj0gY29tYmluZWRDb2xQZXJtdXRhdGlvbnM7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGJvdGggc3VwZXJwb3NpdGlvbnMgYXJlIGJlaW5nIGNvbWJpbmVkIGFuZCB0aGVuIGFwcGxpZWQgdG8gdGhlIHRpbGVcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aWxlLm51bSAmPSBjb21iaW5lZFJvd1Blcm11dGF0aW9ucyAmIGNvbWJpbmVkQ29sUGVybXV0YXRpb25zO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnN1ZG9rdVJ1bGVzKHksIHgpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHByaXZhdGUgc3Vkb2t1UnVsZXMoeTogbnVtYmVyLCB4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIC8vICAgICAgICAgLy8gd2UgY2hlY2ssIGhvdyBtYW55IHBvc3NpYmxlIG51bWJlcnMgdGhlIGN1cnJlbnQgdGlsZSBoYXNcclxuICAgIC8vICAgICAgICAgLy8gaWYgdGhlIHRpbGUgaXMgYWxyZWFkeSBmaXhlZCwgaXQgc2hvdWxkIHJldHVybiAxIG51bWJlclxyXG4gICAgLy8gICAgICAgICBsZXQgcG9zc2libGVOdW1iZXJzID0gdGhpcy5tYXRyaXhbeV1beF0ubnVtLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKS5sZW5ndGggLSAxO1xyXG5cclxuICAgIC8vICAgICAgICAgbGV0IGNvbEluZm8gPSB0aGlzLmdldENvbHVtbkluZm8oeSwgeCk7XHJcbiAgICAvLyAgICAgICAgIGNvbEluZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgLy8gd2l0aGluIHRoaXMgaWYsIHRoZXJlIG1pZ2h0IGJlIGEgd2F5IHRvIGZpeC9pbmNsdWRlIHRoZSBzb2x1dGlvbiA4IGZvciB0aGUgdGlsZSBhdCB5OiAxIGFuZCB4OiA2IG9uIG1lZGl1bVswXVxyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtID09PSB0aGlzLm1hdHJpeFt5XVt4XS5udW0pIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBwb3NzaWJsZU51bWJlcnMgLT0gMTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIGlmIChwb3NzaWJsZU51bWJlcnMgPT09IDApIHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbEluZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFt5XVt4XS5udW0gPT0gdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0pIHJldHVybjtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSAmPSB+dGhpcy5tYXRyaXhbeV1beF0ubnVtO1xyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIHBvc3NpYmxlTnVtYmVycyA9IHRoaXMubWF0cml4W3ldW3hdLm51bS50b1N0cmluZygyKS5zcGxpdChcIjFcIikubGVuZ3RoIC0gMTtcclxuICAgIC8vICAgICAgICAgbGV0IHJvd0luZm8gPSB0aGlzLmdldFJvd0luZm8oeSwgeCk7XHJcbiAgICAvLyAgICAgICAgIHJvd0luZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtID09PSB0aGlzLm1hdHJpeFt5XVt4XS5udW0pIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBwb3NzaWJsZU51bWJlcnMgLT0gMTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIGlmIChwb3NzaWJsZU51bWJlcnMgPT09IDApIHtcclxuICAgIC8vICAgICAgICAgICAgIHJvd0luZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFt5XVt4XS5udW0gPT0gdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0pIHJldHVybjtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSAmPSB+dGhpcy5tYXRyaXhbeV1beF0ubnVtO1xyXG4gICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENvbHVtbkluZm8oeTogbnVtYmVyLCB4OiBudW1iZXIpOiB7IHN1bTogbnVtYmVyOyBqb2ludFRpbGVzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1bXSB9IHtcclxuICAgICAgICB3aGlsZSAoeSA+PSAwICYmIHRoaXMubWF0cml4W3ldW3hdICYgNTExKSB7XHJcbiAgICAgICAgICAgIHktLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbENvb3JkaW5hdGVzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgICAgIHdoaWxlICh5ICsgY29sQ29vcmRpbmF0ZXMubGVuZ3RoIDwgOSAmJiB0aGlzLm1hdHJpeFt5ICsgY29sQ29vcmRpbmF0ZXMubGVuZ3RoICsgMV1beF0gJiA1MTEpIHtcclxuICAgICAgICAgICAgY29sQ29vcmRpbmF0ZXMucHVzaCh7IHk6IHkgKyBjb2xDb29yZGluYXRlcy5sZW5ndGggKyAxLCB4OiB4IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHsgc3VtOiB0aGlzLm1hdHJpeFt5XVt4XSA+PiAxNSwgam9pbnRUaWxlczogY29sQ29vcmRpbmF0ZXMgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJvd0luZm8oeTogbnVtYmVyLCB4OiBudW1iZXIpOiB7IHN1bTogbnVtYmVyOyBqb2ludFRpbGVzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1bXSB9IHtcclxuICAgICAgICB3aGlsZSAoeCA+PSAwICYmIHRoaXMubWF0cml4W3ldW3hdICYgNTExKSB7XHJcbiAgICAgICAgICAgIHgtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJvd0Nvb3JkaW5hdGVzOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgICAgIHdoaWxlICh4ICsgcm93Q29vcmRpbmF0ZXMubGVuZ3RoIDwgOSAmJiB0aGlzLm1hdHJpeFt5XVt4ICsgcm93Q29vcmRpbmF0ZXMubGVuZ3RoICsgMV0gJiA1MTEpIHtcclxuICAgICAgICAgICAgcm93Q29vcmRpbmF0ZXMucHVzaCh7IHk6IHksIHg6IHggKyByb3dDb29yZGluYXRlcy5sZW5ndGggKyAxIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHsgc3VtOiAodGhpcy5tYXRyaXhbeV1beF0gPj4gOSkgJiA2Mywgam9pbnRUaWxlczogcm93Q29vcmRpbmF0ZXMgfTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZHVjZVRvU3VwZXJwb3NpdGlvbihwZXJtdXRhdGlvbnM6IG51bWJlcltdKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gcGVybXV0YXRpb25zLnJlZHVjZSgoYWNjLCBjdXIpID0+IHtcclxuICAgICAgICAgICAgYWNjIHw9IGN1cjtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbmRpZGF0ZXNBc1JlYWRhYmxlQXJyYXkoYmluYXJ5OiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgbGV0IGNhbmRpZGF0ZXM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGJpbmFyeSAmICgyICoqIGkpKSB7XHJcbiAgICAgICAgICAgICAgICBjYW5kaWRhdGVzLnB1c2goaSArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYW5kaWRhdGVzO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVE9ETzpcclxuICogLSBhZXN0aGV0aWNzOiAgICAgICAgICAgICAgICBtYWtlIHRoZSBjb2xvcnMgcHJldHRpZXIgdG8gbG9vayBhdCBpbiB2aWV3IChtYXliZSBvbmx5IHNob3cgbGl0dGxlIG51bWJlcnMgaWYgYW55IHNvcnQgb2Ygc29sdmluZyBoYXMgYmVlbiBzdGFydGVkKVxyXG4gKiAtIGFlc3RoZXRpY3MgKyBtZWNoYW5pY3M6ICAgIGFmdGVyIGVhY2ggY2xpY2sgb2YgdGhlIHNvbHZlU3RlcCBidXR0b24sIGNvbG9yIHRoZSB0aWxlcyB0aGF0IGhhdmUgYmVlbiBhZmZlY3RlZCBieSB0aGUgc29sdmUgY2hhbmdlIGZ1bmN0aW9uICh0aGlzIHJlcXVpcmVzIHRvIHNhdmUgYSBjb3B5IG9mIHRoZSBwcmV2aW91cyBzdGF0ZSBvZiB0aGUgbWF0cml4KVxyXG4gKiAtIG1lY2hhbmljczogICAgICAgICAgICAgICAgIG1ha2UgYSBzb2x2ZUFsbCBidXR0b24gdGhhdCByZXBlYXRlZGx5L3JlY3Vyc2l2ZWx5IGNhbGxzIHRoZSBzb2x2ZSBmdW5jdGlvbiB1bnRpbCBubyBtb3JlIGNoYW5nZXMgY2FuIGJlIG1hZGVcclxuICogLSByZWFkYWJpbGl0eTogICAgICAgICAgICAgICBtYWtlIHRoZSBjb2RlIG1vcmUgcmVhZGFibGUgYnkgc3BsaXR0aW5nIHRoZSBzb2x2ZVN0ZXAgZnVuY3Rpb24gaW50byBzbWFsbGVyIGZ1bmN0aW9ucyBpZiBwb3NzaWJsZVxyXG4gKiAtIHJlYWRhYmlsaXR5OiAgICAgICAgICAgICAgIG1ha2UgdGhlIGNvZGUgbW9yZSByZWFkYWJsZSBieSBhZGRpbmcgY29tbWVudHMgdG8gdGhlIGNvZGVcclxuICogLSBlcnJvciBoYW5kbGluZzogICAgICAgICAgICBhZGQgZXJyb3IgaGFuZGxpbmcgZm9yIHRoZSBjYXNlIHRoYXQgdGhlIGlucHV0IG1hdHJpeCBpcyBub3QgdmFsaWRcclxuICogLSBlcnJvciBoYW5kbGluZzogICAgICAgICAgICBhZGQgZXJyb3IgaGFuZGxpbmcgZm9yIHRoZSBjYXNlIHRoYXQgdGhlIHN1bSBvZiB0aGUgcm93IG9yIHRoZSBjb2x1bW4gaXNuJ3QgdmFsaWRcclxuICogLSBydWxlczogICAgICAgICAgICAgICAgICAgICBmb3IgZWFzeVsxXSwgc3BlY2lmeSBhIHJ1bGUgdGhhdCwgaW4gY2FzZSBzb21lIG51bWJlcnMgYXJlIGFscmVhZHkgZml4ZWQgYXMgdGhlIGZpbmFsIG51bWJlcnMsIHJlYXBwbGllcyB0aGUgc3VtVGFibGUgKGlmIHlvdSBoYXZlIHRocmVlIHRpbGVzIGluIGEgcm93IGFuZCBvbmUgaXMgYWxyZWFkeSBzYWZlLCB0aGUgc3VtIG9mIHRoZSBvdGhlciB0d28gdGlsZXMgY2FuIGJlIHJlY2FsY3VsYXRlZCBhbmQgdGVzdGVkIGFnYWluc3QgdGhlIHN1bVRhYmxlKVxyXG4gKiAtIHJ1bGVzOiAgICAgICAgICAgICAgICAgICAgIGZvciBlYXN5WzFdLCBzcGVjaWZ5IGEgcnVsZSB0aGF0IHNvbHZlcyByb3cgMiBieSByZWFsaXppbmcgdGhhdCBvbmx5IDggYW5kIDkgYXJlIGFscmVhZHkgZml4ZWQgZm9yIHRoZSBmaW5hbCBwZXJtdXRhdGlvbiBhbmQgYWRqdXN0IHRoZSBvdGhlciB0aWxlcyBhY2NvcmRpbmdseVxyXG4gKlxyXG4gKlxyXG4gKi9cclxuIiwiZXhwb3J0IGNsYXNzIFZpZXcge1xyXG4gICAgYm9hcmQ6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgdGlsZVNpemU6IG51bWJlcjtcclxuICAgIHRpbGVQYWRkaW5nOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvYXJkU2lkZUxlbmd0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBib3JkZXJSYWRpdXM6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHJpdmF0ZSBib2FyZENvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuYm9yZGVyUmFkaXVzID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd0JvYXJkKG1hdHJpeDogbnVtYmVyW11bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQ2FudmFzKG1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy5kcmF3QmFja2dyb3VuZCgpO1xyXG5cclxuICAgICAgICBtYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUNvcm5lclkgPSB5ICogdGhpcy50aWxlU2l6ZTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlQ29ybmVyWCA9IHggKiB0aGlzLnRpbGVTaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSB1bnBsYXlhYmxlIHRpbGVzIHdpdGggc3Vtc1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgJiA1MTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdQbGF5YWJsZVRpbGUodGlsZSwgbm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VW5wbGF5YWJsZVRpbGUodGlsZSwgbm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhd0dyaWRsaW5lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1VucGxheWFibGVUaWxlKHRpbGU6IG51bWJlciwgbm9kZUNvcm5lclg6IG51bWJlciwgbm9kZUNvcm5lclk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjb2xWYWx1ZSA9IHRpbGUgPj4gMTU7XHJcbiAgICAgICAgaWYgKGNvbFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGNvbFZhbHVlLnRvU3RyaW5nKCksIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDEsIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDMgLSB0aGlzLnRpbGVQYWRkaW5nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb3dWYWx1ZSA9ICh0aWxlID4+IDkpICYgNjM7XHJcbiAgICAgICAgaWYgKHJvd1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgcm93VmFsdWUudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIgLSB0aGlzLnRpbGVQYWRkaW5nIC8gMixcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIgLSB0aGlzLnRpbGVQYWRkaW5nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29sVmFsdWUgJiYgcm93VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhub2RlQ29ybmVyWCwgbm9kZUNvcm5lclkpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8obm9kZUNvcm5lclggKyB0aGlzLnRpbGVTaXplLCBub2RlQ29ybmVyWSArIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLnRpbGVTaXplIC8gMjU7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3UGxheWFibGVUaWxlKHRpbGU6IG51bWJlciwgbm9kZUNvcm5lclg6IG51bWJlciwgbm9kZUNvcm5lclk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIC8vIGJhY2tncm91bmQgZm9yIHBsYXlhYmxlIHRpbGVcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImxpZ2h0Z3JheVwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnJlY3Qobm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZLCB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgIC8vIHRoZSBhbHJlYWR5IHNhZmUgbnVtYmVycyBpbiB0aGUgdGlsZXMgKGUuZy4gaWYgdGhlIHRpbGUgaGFzIDAwMCAwMDEgMDAwIHdyaXR0ZW4sIDQgaXMgdGhlIG9ubHkgbnVtYmVyIGxlZnQgdG8gYmUgcGxhY2VkIGluIHRoZSB0aWxlKVxyXG4gICAgICAgIC8vIDAwMCAwMDEgMDAwIC0+IG5hY2ggc3BsaXQgLT4gW1wiMDAwMDBcIiwgXCIwMDBcIl1cclxuICAgICAgICBsZXQgb25seVBvc3NpYmxlTnVtYmVyID0gdGlsZS50b1N0cmluZygyKS5zcGxpdChcIjFcIik7XHJcbiAgICAgICAgaWYgKG9ubHlQb3NzaWJsZU51bWJlci5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICAob25seVBvc3NpYmxlTnVtYmVyWzFdLmxlbmd0aCArIDEpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAwICsgdGhpcy50aWxlUGFkZGluZyAqIDMsXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAzIC0gdGhpcy50aWxlUGFkZGluZyAqIDJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhlIGNhbmRpZGF0ZSBudW1iZXJzIGluIHRoZSB0aWxlc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghKHRpbGUgJiAoMiAqKiBpKSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ3JleVwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIChpICsgMSkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIChpICUgMykgKyB0aGlzLnRpbGVQYWRkaW5nLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogTWF0aC5mbG9vcigoaSArIDMpIC8gMykgLSB0aGlzLnRpbGVQYWRkaW5nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlQ2FudmFzKG1hdHJpeDogbnVtYmVyW11bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuaWQgPSBcImJvYXJkXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5ib3hTaGFkb3cgPSBcIjVweCA1cHggMjBweCBncmF5XCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5ib3JkZXJSYWRpdXMgPSB0aGlzLmJvcmRlclJhZGl1cyArIFwiJVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUubWFyZ2luID0gXCIxJVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQud2lkdGggPSB0aGlzLmJvYXJkQ29udGFpbmVyLmNsaWVudFdpZHRoICogMC45ODtcclxuICAgICAgICB0aGlzLmJvYXJkLmhlaWdodCA9IHRoaXMuYm9hcmRDb250YWluZXIuY2xpZW50SGVpZ2h0ICogMC45ODtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmJvYXJkKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmJvYXJkLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLmJvYXJkU2lkZUxlbmd0aCA9IHRoaXMuYm9hcmQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdGhpcy50aWxlU2l6ZSA9IHRoaXMuYm9hcmRTaWRlTGVuZ3RoIC8gbWF0cml4Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLnRpbGVQYWRkaW5nID0gdGhpcy50aWxlU2l6ZSAvIDE1O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0JhY2tncm91bmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIHRoaXMuY3R4LnJvdW5kUmVjdCgwLCAwLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoICogKHRoaXMuYm9yZGVyUmFkaXVzIC8gMTAwKSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0dyaWRsaW5lcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8PSB0aGlzLmJvYXJkU2lkZUxlbmd0aDsgbCArPSB0aGlzLnRpbGVTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhsLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKGwsIHRoaXMuYm9hcmRTaWRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIGwpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy5ib2FyZFNpZGVMZW5ndGgsIGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLnRpbGVTaXplIC8gMjU7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL21vZGVsXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XHJcbmltcG9ydCB7IGxldmVscyB9IGZyb20gXCIuL2xldmVsc1wiO1xyXG5cclxuLyoqIGhhbmRsZXMgYWxsIGlucHV0LCBjaGVja3MgaW4gd2l0aCBtb2RlbCBhbmQgZGlzcGxheXMgdGhlIHJlc3VsdCB3aXRoIHZpZXcgKi9cclxuXHJcbmNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgbW9kZWw6IE1vZGVsO1xyXG4gICAgdmlldzogVmlldztcclxuXHJcbiAgICAvLyBidXR0b25zXHJcbiAgICBzb2x2ZU9uZVN0ZXBCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgc29sdmVBbGxCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWwobGV2ZWxzLmVhc3lbMF0pO1xyXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudHMoKTtcclxuICAgICAgICB0aGlzLmluaXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERvbUVsZW1lbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29sdmVPbmVTdGVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x2ZS1zdGVwXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMuc29sdmVBbGxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvbHZlLWFsbFwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRFdmVudExpc3RlbmVycygpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvbHZlT25lU3RlcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNvbHZlU3RlcCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2x2ZUFsbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNvbHZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZpZXcuZHJhd0JvYXJkKHRoaXMubW9kZWwubWF0cml4KTtcclxuICAgICAgICB0aGlzLnZpZXcuYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4gdGhpcy5ib2FyZENsaWNrZWQoZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJvYXJkQ2xpY2tlZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm9hcmQgY2xpY2tlZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYXBwID0gbmV3IENvbnRyb2xsZXIoKTtcclxuXHJcbi8vIFwibnBtIHJ1biBzdGFydFwiIGluIHRlcm1pbmFsIHRvIHN0YXJ0IGxpdmUgc2VydmVyXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
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
            return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTSxNQUFNLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUNEO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEM7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkM7S0FDSjtJQUNELElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEIsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6QixPQUFPLEVBQUU7UUFDTDtZQUNJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxD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azovL2tha3Vyby8uL3NyYy9sZXZlbHMudHMiLCJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL21vZGVsLnRzIiwid2VicGFjazovL2tha3Vyby8uL3NyYy92aWV3LnRzIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tha3Vyby8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgbGV2ZWxzID0ge1xyXG4gICAgZWFzeTogW1xyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDAsIDQ1LCAzLCAwLCAwLCAwLCAzLCA0NSwgMF0sXHJcbiAgICAgICAgICAgIFswLCAxNy4wOCwgMSwgMSwgMCwgMTYsIDQuMDMsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMC4xMSwgMSwgMSwgMSwgMTYuMTcsIDEsIDEsIDEsIDEsIDE3XSxcclxuICAgICAgICAgICAgWzAuMTcsIDEsIDEsIDMuMTcsIDEsIDEsIDEsIDAuMTYsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMC4xOCwgMSwgMSwgMSwgMCwgMCwgMTcuMTMsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMTcuMDQsIDEsIDEsIDAsIDAsIDMuMTEsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMC4wOSwgMSwgMSwgMCwgMTYsIDMuMTYsIDEsIDEsIDEsIDRdLFxyXG4gICAgICAgICAgICBbMC4xNCwgMSwgMSwgMy4xLCAxLCAxLCAxLCAxNi4xMiwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLjE5LCAxLCAxLCAxLCAxLCAwLjE4LCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAuMDUsIDEsIDEsIDAsIDAsIDAuMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAyMywgMjksIDQsIDAsIDAsIDAsIDAsIDMsIDE3XSxcclxuICAgICAgICAgICAgWzAuMTcsIDEsIDEsIDEsIDQsIDAsIDMwLCAxNy4xLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMjEsIDEsIDEsIDEsIDEsIDQuMjQsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4xNCwgMSwgMSwgMTYuMiwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLjEyLCAxLCAxLCAxMC4xMSwgMSwgMSwgMywgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjExLCAxLCAxLCAxNy4xLCAxLCAxLCAzMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAxNi4xLCAxLCAxLCA0LjA4LCAxLCAxLCA3XSxcclxuICAgICAgICAgICAgWzAsIDQsIDMuMjQsIDEsIDEsIDEsIDEsIDE2LjEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4xMywgMSwgMSwgMSwgMSwgMC4xOCwgMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjA0LCAxLCAxLCAwLCAwLCAwLCAwLjIsIDEsIDEsIDFdLFxyXG4gICAgICAgIF0sXHJcbiAgICBdLFxyXG4gICAgbWVkaXVtOiBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMCwgMjksIDQsIDAsIDcsIDM0LCAxNiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLjA4LCAxLCAxLCAzLjE3LCAxLCAxLCAxLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDMuMzEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMC4xLCAxLCAxLCAyNC4xLCAxLCAxLCAxLCAyNCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLjE2LCAxLCAxLCAxLCAxNSwgMC4xMywgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjEzLCAxLCAxLCAwLjE2LCAxLCAxLCAxMCwgMTZdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMC4xLCAxLCAxLCAyNCwgMy4xNiwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAxNy4xNCwgMSwgMSwgMSwgMTcuMTEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMC4zLCAxLCAxLCAxLCAxLCAxLCAxLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMTgsIDEsIDEsIDEsIDAuMTMsIDEsIDEsIDBdLFxyXG4gICAgICAgIF0sXHJcbiAgICBdLFxyXG4gICAgaGFyZDogbmV3IEFycmF5KDEpLFxyXG4gICAgY2hhbGxlbmdpbmc6IG5ldyBBcnJheSgxKSxcclxuICAgIGV4dHJlbWU6IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAwLCA5LCAxMiwgMCwgMTIsIDM3LCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDM3LCA4LjAzLCAxLCAxLCA4LjE1LCAxLCAxLCA5XSxcclxuICAgICAgICAgICAgWzAsIDExLjQzLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMTQsIDEsIDEsIDEsIDYuMTEsIDEsIDEsIDEwLjA0LCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMSwgMSwgMSwgOS4wMywgMSwgMSwgNy4wNCwgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLjE1LCAxLCAxLCAxLCAyNi4xMywgMSwgMSwgMSwgMTZdLFxyXG4gICAgICAgICAgICBbMCwgMy4wOSwgMSwgMSwgNS4xMiwgMSwgMSwgMTAuMTIsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4wOSwgMSwgMSwgMTQuMDMsIDEsIDEsIDMuMTQsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC40LCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAuMSwgMSwgMSwgMC4wOCwgMSwgMSwgMCwgMCwgMF0sXHJcbiAgICAgICAgXSxcclxuICAgIF0sXHJcbn07XHJcbiIsImV4cG9ydCBjbGFzcyBNb2RlbCB7XHJcbiAgICBtYXRyaXg6IG51bWJlcltdW107XHJcbiAgICBzdW1UYWJsZTogbnVtYmVyW11bXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxldmVsOiBudW1iZXJbXVtdKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXggPSB0aGlzLmluaXRCaW5hcnlNYXRyaXgobGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuc3VtVGFibGUgPSB0aGlzLmluaXRTdW1UYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogMDAwMDAwIDAwMDAwMCAwMDAwMDAwMDBcclxuICAgICAqIGNvbCAgICByb3cgICAgY2FuZGlkYXRlc1xyXG4gICAgICogaWYgdGhlIG51bWJlciBpcyB6ZXJvLCB0aGUgdGlsZSBpcyB1bnBsYXlhYmxlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdEJpbmFyeU1hdHJpeChtYXRyaXg6IG51bWJlcltdW10pOiBudW1iZXJbXVtdIHtcclxuICAgICAgICBsZXQgbmV3TWF0cml4OiBhbnlbXVtdID0gW107XHJcbiAgICAgICAgbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcm93QXJyYXk6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd0FycmF5LnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByb3dBcnJheS5wdXNoKHBhcnNlSW50KFwiMVwiLnJlcGVhdCg5KSwgMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgYWxsIG90aGVyIGNhc2VzLCB3ZSBzZWUgdGhlbSBhcyBhIGRlY2ltYWwgbnVtYmVyLlxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIDB0aCBiaXQgaXMgMCxcclxuICAgICAgICAgICAgICAgIC8vIHRoZW4gdGhlIG5leHQgNiBiaXQgaW5jcmlwdCB0aGUgdHdvIG51bWJlcnMgdG8gdGhlIHJpZ2h0IG9mIHRoZSBjb21tYSxcclxuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgbGFzdCA2IGJpdCBpbmNyaXB0IHRoZSB0d28gbnVtYmVycyB0byB0aGUgbGVmdCBvZiB0aGUgY29tbWFcclxuICAgICAgICAgICAgICAgIGxldCBjb2xBbmRSb3cgPSB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoc3VtKSA9PiBwYXJzZUludChzdW0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvdy5sZW5ndGggIT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeCBhdCB4OiBcIiArIHggKyBcIiBhbmQgeTogXCIgKyB5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3dbMF0gPiA0NSB8fCBjb2xBbmRSb3dbMF0gPT0gMiB8fCBjb2xBbmRSb3dbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgaW5wdXQgbWF0cml4OiBzdW0gb2YgY29sIGF0IHk6IFwiICsgeSArIFwiIGFuZCB4OiBcIiArIHggKyBcIiBpcyBnaXZlbiBhcyBcIiArIGNvbEFuZFJvd1swXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93WzFdID4gNDUgfHwgY29sQW5kUm93WzFdID09IDIgfHwgY29sQW5kUm93WzFdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeDogc3VtIG9mIHJvdyBhdCB5OiBcIiArIHkgKyBcIiBhbmQgeDogXCIgKyB4ICsgXCIgaXMgZ2l2ZW4gYXMgXCIgKyBjb2xBbmRSb3dbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJvd0FycmF5LnB1c2goKChjb2xBbmRSb3dbMF0gPDwgNikgfCAoY29sQW5kUm93WzFdIDw8IDApKSA8PCA5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG5ld01hdHJpeC5wdXNoKHJvd0FycmF5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3TWF0cml4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaSB3YW50IHRvIGRvIGEgZ2VuZXJhbCB0YWJsZSB3aGVyZSBhbGwgdGhlIGNvbWJpbmF0aW9ucyBvZiAyIHVwIHRvIDkgbnVtYmVycyBhcmUgbGlzdGVkIGFuZCB0aGUgc3VtIG9mIHRoZW0gaXMgY2FsY3VsYXRlZFxyXG4gICAgICogdGhlIHJlc3VsdGluZyBzdW0gaXMgdGhlIGluZGV4IG9mIHdoZXJlIHRvIGZpbmQgdGhlc2UgY29tYmluYXRpb25zIGluIHRoZSB0YWJsZVxyXG4gICAgICogYXQgdGhhdCBpbmRleCwgdGhlIGNvbWJpbmF0aW9ucyBhcmUgc3RvcmVkIGFzIGEgOSBiaXQgbnVtYmVyLCB3aGVyZSB0aGUgYml0IGlzIDEgaWYgdGhlIG51bWJlciBpcyBpbiB0aGUgY29tYmluYXRpb25cclxuICAgICAqIHRoZSB0YWJsZSBpcyBhIDQ1IGVsZW1lbnQgYXJyYXlcclxuICAgICAqIGF0IGVhY2ggaW5kZXgsIHRoZSBhbW91bnQgb2YgbnVtYmVycyB0aGF0IG1ha2UgdXAgdGhlIHN1bSBpcyBzdG9yZWQgYXQgdGhlIGluZGV4IG9mIGl0J3MgYW1vdW50XHJcbiAgICAgKiB0aGUgbWF0cml4IGxvb2tzIGFzIGZvbGxvd3M6XHJcbiAgICAgKlxyXG4gICAgICogW1tdLCAgICAgICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgKiAgW10sICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAqICBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMlxyXG4gICAgICogIFtbXSxbXSxbM11dLCAgICAgICAgICAgICAgICAzXHJcbiAgICAgKiAgW1tdLFtdLFs1XV0sICAgICAgICAgICAgICAgIDRcclxuICAgICAqICBbW10sW10sWzYsOV1dLCAgICAgICAgICAgICAgNVxyXG4gICAgICogIFtbXSxbXSxbMTAsMTddLFs3XV1dICAgICAgICA2XHJcbiAgICAgKiAgW1tdLFtdLFszMywxOCwgMTJdLFsxMV1dICAgIDdcclxuICAgICAqIHRoZSBmaXJzdCBpbmRleCBpcyB0aGUgc3VtICgjNDUpLCB0aGUgc2Vjb25kIGluZGV4IGlzIHRoZSBhbW91bnQgb2YgbnVtYmVycyB0aGF0IG1ha2UgdXAgdGhlIHN1bSgjOSksXHJcbiAgICAgKiBlYWNoIG9mIHRoZSBudW1iZXJzIGZyb20gdGhhdCBwb2ludCBhcmUgbWVhbnQgdG8gYmUgcmVhZCBpbiBiaW5hcnksIGhhdmluZyBhIDEgZXZlcnl3aGVyZSB0aGUgbnVtYmVyIGlzIGluIHRoZSBjb21iaW5hdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRTdW1UYWJsZSgpOiBudW1iZXJbXVtdW10ge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBhIDQ1eDl4PyBlbXB0eSBhcnJheVxyXG4gICAgICAgIGxldCB0YWJsZTogbnVtYmVyW11bXVtdID0gQXJyYXkoNDYpXHJcbiAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgIC5tYXAoKCkgPT5cclxuICAgICAgICAgICAgICAgIEFycmF5KDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoKSA9PiBbXSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYmluQ29tYmluYXRpb24gPSAxOyBiaW5Db21iaW5hdGlvbiA8PSBwYXJzZUludChcIjExMTExMTExMVwiLCAyKTsgYmluQ29tYmluYXRpb24rKykge1xyXG4gICAgICAgICAgICBsZXQgY2FuZGlkYXRlc0RlY0FyciA9IHRoaXMuY2FuZGlkYXRlc0FzUmVhZGFibGVBcnJheShiaW5Db21iaW5hdGlvbik7XHJcbiAgICAgICAgICAgIGxldCBzdW0gPSBjYW5kaWRhdGVzRGVjQXJyLnJlZHVjZSgoYWNjLCBjdXIpID0+IGFjYyArIGN1ciwgMCk7XHJcbiAgICAgICAgICAgIHRhYmxlW3N1bV1bY2FuZGlkYXRlc0RlY0Fyci5sZW5ndGhdLnB1c2goYmluQ29tYmluYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb2x2ZUFsbCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2hhbmdlc01hZGUgPSB0cnVlO1xyXG4gICAgICAgIHdoaWxlIChjaGFuZ2VzTWFkZSkge1xyXG4gICAgICAgICAgICBsZXQgb2xkTWF0cml4ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLm1hdHJpeCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNvbHZlU3RlcCgpO1xyXG4gICAgICAgICAgICBjaGFuZ2VzTWFkZSA9IEpTT04uc3RyaW5naWZ5KG9sZE1hdHJpeCkgIT09IEpTT04uc3RyaW5naWZ5KHRoaXMubWF0cml4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNvbHZlU3RlcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goKHRpbGUsIHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghKHRpbGUgJiA1MTEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zb2x2ZVRpbGUodGlsZSwgeSwgeCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLSBzb2x2ZWQgc3RlcCAtLS1cIik7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc29sdmVUaWxlKGNhbmRpZGF0ZXM6IG51bWJlciwgeTogbnVtYmVyLCB4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAvLyB0aGlzIHdheSwgSSBjYW4gd2lydGUgd2hhdGV2ZXIgSSB3YW50IGludG8gY2FuZGlkYXRlcyB3aXRob3V0IGNoYW5naW5nIHRoZSBtYXRyaXhcclxuICAgICAgICAvLyBvbmx5IHdoZW4gSSdtIGRvbmUsIEkgY2FuIHdyaXRlIHRoZSBjYW5kaWRhdGVzIGJhY2sgaW50byB0aGUgbWF0cml4XHJcbiAgICAgICAgLy8gdGhpcy5tYXRyaXhbeV1beF0gPSBjYW5kaWRhdGVzO1xyXG5cclxuICAgICAgICBsZXQgY29sSW5mbyA9IHRoaXMuZ2V0Q29sdW1uSW5mbyh5LCB4KTtcclxuICAgICAgICBsZXQgcm93SW5mbyA9IHRoaXMuZ2V0Um93SW5mbyh5LCB4KTtcclxuXHJcbiAgICAgICAgLy8gYWxsIHBlcm11dGF0aW9ucyB3aGVyZSB0aGUgZ2l2ZW4gam9pbnRUaWxlcyBhbW91bnQgdG8gc3VtXHJcbiAgICAgICAgbGV0IGNvbFBlcm11dGF0aW9ucyA9IHRoaXMuc3VtVGFibGVbY29sSW5mby5zdW1dW2NvbEluZm8uam9pbnRUaWxlcy5sZW5ndGhdO1xyXG4gICAgICAgIGxldCByb3dQZXJtdXRhdGlvbnMgPSB0aGlzLnN1bVRhYmxlW3Jvd0luZm8uc3VtXVtyb3dJbmZvLmpvaW50VGlsZXMubGVuZ3RoXTtcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZpbmcgcGVybXV0YXRpb25zIHRoYXQgZG9uJ3QgaW5jbHVkZSBhbnkgb2YgdGhlIHRpbGVzIGNhbmRpZGF0ZXNcclxuICAgICAgICAvLyB0aGlzIGNhbiBwcm9iYWJseSBiZSBzcGVjaWZpZWQgbW9yZSBwcmVjaWNlbHkgYnkgbm90IG9ubHkgZmlsdGVyaW5nIHdoYXQgdGhlIGNhbmRpZGF0ZXMgaW4gdGhpcyB0aWxlIGFyZSwgYnV0IGFsc28gd2hhdCB0aGUgZml4ZWQgbnVtYmVycyBpbiB0aGUgb3RoZXIgdGlsZXMgYXJlXHJcbiAgICAgICAgY29sUGVybXV0YXRpb25zID0gY29sUGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IHBlcm11dGF0aW9uICYgY2FuZGlkYXRlcyk7XHJcbiAgICAgICAgcm93UGVybXV0YXRpb25zID0gcm93UGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IHBlcm11dGF0aW9uICYgY2FuZGlkYXRlcyk7XHJcblxyXG4gICAgICAgIC8vIC0tLSBzdWRva3UgcnVsZXMgLS0tXHJcbiAgICAgICAgLy8gaSBub3Qgb25seSB3YW50IHRvIGNoZWNrIGZvciBudW1iZXJzIHRoYXQgYXJlIGZpeGVkIGluIG90aGVyIHRpbGVzIGJ1dCBhbHNvIGZvciB0aWxlcyB0aGF0IGhhdmUgb3ZlcmxhcHBpbmcgY2FuZGlkYXRlc1xyXG4gICAgICAgIC8vIG1lYW5pbmcgb2YgY291cnNlLCBpZiBhbm90aGVyIHRpbGUgaGFzIGEgZml4ZWQgMiBpbiBpdCwgd2Ugd2FudCB0byBzdHJpa2Ugb3V0IHRoZSAyIGluIHRoaXMgdGlsZVxyXG4gICAgICAgIC8vIGJ1dCB3aGF0IGlmIGZvciBleGFtcGxlIHR3byBkaWZmZXJlbnQgdGlsZXMgaW4gdGhlIHNhbWUgcm93IGJvdGggaGF2ZSBvbmx5IHRoZSA4IG9yIDkgYXMgY2FuZGlkYXRlcyBsZWZ0P1xyXG4gICAgICAgIC8vIHRoZW4gd2UgY2FuIHN0cmlrZSBvdXQgdGhlIDggYW5kIDkgaW4gdGhpcyB0aWxlIGJlY2F1c2UgdGhleSBoYXZlIHRvIGJlIGluIHRob3NlIG90aGVyIHRpbGVzIG9uZSBlYWNoXHJcbiAgICAgICAgLy8gc2FtZSBnb2VzIGZvciB0aHJlZSB0aWxlcyBpbiBhIHJvdyB0aGF0IGhhdmUgOCwgOSBhbmQgNyBhcyBjYW5kaWRhdGVzIGxlZnQuIFRoZSBoYXJkIHBhcnQgaXMgdG8gY3Jvc3MgcmVmZXJlbmNlIHRocmVlIHRpbGVzIHdoZXJlIG9uZSBoYXMgOCBhbmQgOSwgb25lIGhhcyA4IGFuZCA3IGFuZCBvbmUgaGFzIDkgYW5kIDdcclxuICAgICAgICAvLyBpbiB0aGF0IGNhc2UgYWxsIHRocmVlIG51bWJlcnMgYXJlIHVzZWQgYW5kIGNhbiBubyBsb25nZXIgb2Njb3VyIGluIHRoaXMgdGlsZSBidXQgaG93IHRvIGNoZWNrIGZvciB0aGF0P1xyXG5cclxuICAgICAgICAvLyBsZXQgdGVtcCA9IHRoaXMuY2FuZGlkYXRlc0FzUmVhZGFibGVBcnJheShjYW5kaWRhdGVzKTtcclxuICAgICAgICAvLyBpZiAodGVtcC5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAvLyAgICAgY29sSW5mby5qb2ludFRpbGVzLmZvckVhY2goKHRpbGU6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgaWYgKHRpbGUueCA9PT0geCAmJiB0aWxlLnkgPT09IHkpIHJldHVybjtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubWF0cml4W3RpbGUueV1bdGlsZS54XSAmPSB+Y2FuZGlkYXRlcztcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgIHJvd0luZm8uam9pbnRUaWxlcy5mb3JFYWNoKCh0aWxlOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0pID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIGlmICh0aWxlLnggPT09IHggJiYgdGlsZS55ID09PSB5KSByZXR1cm47XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1hdHJpeFt0aWxlLnldW3RpbGUueF0gJj0gfmNhbmRpZGF0ZXM7XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gdGVtcG9yYXJ5LCBuZWVkcyB0byBiZSBtYWRlIGludG8gc2V2ZXJhbCBzdGVwc1xyXG4gICAgICAgIHRoaXMubWF0cml4W3ldW3hdID0gdGhpcy5yZWR1Y2VUb1N1cGVycG9zaXRpb24oY29sUGVybXV0YXRpb25zKSAmIHRoaXMucmVkdWNlVG9TdXBlcnBvc2l0aW9uKHJvd1Blcm11dGF0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmb3IgcHJldHR5IGNvbnNvbGUgb3V0cHV0XHJcbiAgICBwcml2YXRlIHZpc3VhbGl6ZVN0YXRlT2ZUaWxlKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNhbmRpZGF0ZVN0cmluZyA9IChcIjAwMDAwMDAwMFwiICsgdGhpcy5tYXRyaXhbeV1beF0udG9TdHJpbmcoMikpLnNsaWNlKC05KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgU3RhdGUgb2YgVGlsZSBhdCB4OiAke3h9IGFuZCB5OiAke3l9IGlzIFxcbiR7Y2FuZGlkYXRlU3RyaW5nfSBvciAke3RoaXMuY2FuZGlkYXRlc0FzUmVhZGFibGVBcnJheSh0aGlzLm1hdHJpeFt5XVt4XSl9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDb2x1bW5JbmZvKHk6IG51bWJlciwgeDogbnVtYmVyKTogeyBzdW06IG51bWJlcjsgam9pbnRUaWxlczogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9W10gfSB7XHJcbiAgICAgICAgd2hpbGUgKHkgPj0gMCAmJiB0aGlzLm1hdHJpeFt5XVt4XSAmIDUxMSkge1xyXG4gICAgICAgICAgICB5LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb2xDb29yZGluYXRlczogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9W10gPSBbXTtcclxuICAgICAgICB3aGlsZSAoeSArIGNvbENvb3JkaW5hdGVzLmxlbmd0aCA8IDkgJiYgdGhpcy5tYXRyaXhbeSArIGNvbENvb3JkaW5hdGVzLmxlbmd0aCArIDFdW3hdICYgNTExKSB7XHJcbiAgICAgICAgICAgIGNvbENvb3JkaW5hdGVzLnB1c2goeyB5OiB5ICsgY29sQ29vcmRpbmF0ZXMubGVuZ3RoICsgMSwgeDogeCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IHN1bTogdGhpcy5tYXRyaXhbeV1beF0gPj4gMTUsIGpvaW50VGlsZXM6IGNvbENvb3JkaW5hdGVzIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSb3dJbmZvKHk6IG51bWJlciwgeDogbnVtYmVyKTogeyBzdW06IG51bWJlcjsgam9pbnRUaWxlczogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9W10gfSB7XHJcbiAgICAgICAgd2hpbGUgKHggPj0gMCAmJiB0aGlzLm1hdHJpeFt5XVt4XSAmIDUxMSkge1xyXG4gICAgICAgICAgICB4LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByb3dDb29yZGluYXRlczogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9W10gPSBbXTtcclxuICAgICAgICB3aGlsZSAoeCArIHJvd0Nvb3JkaW5hdGVzLmxlbmd0aCA8IDkgJiYgdGhpcy5tYXRyaXhbeV1beCArIHJvd0Nvb3JkaW5hdGVzLmxlbmd0aCArIDFdICYgNTExKSB7XHJcbiAgICAgICAgICAgIHJvd0Nvb3JkaW5hdGVzLnB1c2goeyB5OiB5LCB4OiB4ICsgcm93Q29vcmRpbmF0ZXMubGVuZ3RoICsgMSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IHN1bTogKHRoaXMubWF0cml4W3ldW3hdID4+IDkpICYgNjMsIGpvaW50VGlsZXM6IHJvd0Nvb3JkaW5hdGVzIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWR1Y2VUb1N1cGVycG9zaXRpb24ocGVybXV0YXRpb25zOiBudW1iZXJbXSk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHBlcm11dGF0aW9ucy5yZWR1Y2UoKGFjYywgY3VyKSA9PiB7XHJcbiAgICAgICAgICAgIGFjYyB8PSBjdXI7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYW5kaWRhdGVzQXNSZWFkYWJsZUFycmF5KGJpbmFyeTogbnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIGxldCBjYW5kaWRhdGVzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChiaW5hcnkgJiAoMiAqKiBpKSkge1xyXG4gICAgICAgICAgICAgICAgY2FuZGlkYXRlcy5wdXNoKGkgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FuZGlkYXRlcztcclxuICAgIH1cclxufVxyXG5cclxuLy8gICAgIHB1YmxpYyBzb2x2ZVN0ZXAoKTogdm9pZCB7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgbGV0IHJvd0luZm8gPSB0aGlzLmdldFJvd0luZm8oeSwgeCk7XHJcbi8vICAgICAgICAgICAgICAgICBsZXQgY29sSW5mbyA9IHRoaXMuZ2V0Q29sdW1uSW5mbyh5LCB4KTtcclxuXHJcbi8vICAgICAgICAgICAgICAgICAvLyBhbGwgcGVybXV0YXRpb25zIHdpdGggZ2l2ZW4gdGlsZSBhbW91bnQgdG8gc3VtXHJcbi8vICAgICAgICAgICAgICAgICBsZXQgcm93UGVybXV0YXRpb25zID0gdGhpcy5zdW1UYWJsZVtyb3dJbmZvLnN1bV1bcm93SW5mby50aWxlQ29vcmRzLmxlbmd0aF07XHJcbi8vICAgICAgICAgICAgICAgICBsZXQgY29sUGVybXV0YXRpb25zID0gdGhpcy5zdW1UYWJsZVtjb2xJbmZvLnN1bV1bY29sSW5mby50aWxlQ29vcmRzLmxlbmd0aF07XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgcm93UGVybXV0YXRpb25zID0gcm93UGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IHBlcm11dGF0aW9uICYgdGlsZS5udW0pO1xyXG4vLyAgICAgICAgICAgICAgICAgY29sUGVybXV0YXRpb25zID0gY29sUGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IHBlcm11dGF0aW9uICYgdGlsZS5udW0pO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIC8vIGlmIHRoZSByb3cgKG9yIGNvbHVtbikgaXMgYWxyZWFkeSBoYXMgZml4ZWQgdGlsZXMsIHRoZSBwZXJtdXRhdGlvbnMgaGF2ZSB0byBpbmNsdWRlIHRoZXNlIGZpeGVkIG51bWJlcnNcclxuLy8gICAgICAgICAgICAgICAgIGxldCBmaXhlZEluUm93ID0gMDtcclxuLy8gICAgICAgICAgICAgICAgIHJvd0luZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm9ubHlQb3NzaWJsZU51bWJlcigpICE9PSAwKSB7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkSW5Sb3cgfD0gdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW07XHJcbi8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgICAgICAgICBsZXQgZml4ZWRJbkNvbCA9IDA7XHJcbi8vICAgICAgICAgICAgICAgICBjb2xJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5vbmx5UG9zc2libGVOdW1iZXIoKSAhPT0gMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEluQ29sIHw9IHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIC8vIGZpbHRlciB0aGUgcGVybXV0YXRpb25zIGJ5IHRoZSBudW1iZXJzIHRoYXQgYXJlIGFscmVhZHkgZml4ZWQgaW4gdGhlIHRpbGUsIHRoZXJlZm9yZSBoYXZpbmcgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHBlcm11dGF0aW9uXHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZml4ZWRJblJvdykge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHJvd1Blcm11dGF0aW9ucyA9IHJvd1Blcm11dGF0aW9ucy5maWx0ZXIoKHBlcm11dGF0aW9uKSA9PiAocGVybXV0YXRpb24gJiBmaXhlZEluUm93KSA9PT0gZml4ZWRJblJvdyk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoZml4ZWRJbkNvbCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbFBlcm11dGF0aW9ucyA9IGNvbFBlcm11dGF0aW9ucy5maWx0ZXIoKHBlcm11dGF0aW9uKSA9PiAocGVybXV0YXRpb24gJiBmaXhlZEluQ29sKSA9PT0gZml4ZWRJbkNvbCk7XHJcbi8vICAgICAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgLy8gZm9yIHRoaXMgY3VycmVudCB0aWxlLCB0aGUgcGVybXV0YXRpb25zIGFyZSBjb21iaW5lZCB0byBhIHN1cGVycG9zaXRpb25cclxuLy8gICAgICAgICAgICAgICAgIGxldCBjb21iaW5lZFJvd1Blcm11dGF0aW9ucyA9IHRoaXMucmVkdWNlVG9TdXBlcnBvc2l0aW9uKHJvd1Blcm11dGF0aW9ucyk7XHJcbi8vICAgICAgICAgICAgICAgICBsZXQgY29tYmluZWRDb2xQZXJtdXRhdGlvbnMgPSB0aGlzLnJlZHVjZVRvU3VwZXJwb3NpdGlvbihjb2xQZXJtdXRhdGlvbnMpO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIC8vIHRoZSBzdXBlcnBvc2l0aW9uIGluY2x1ZGVzIHRoZSBhbGwgbGVmdG92ZXIgcGVybXV0YXRpb25zIGFmdGVyIGZpbHRlcmluZywgc28gdGhlIHBlcm11dGF0aW9ucyBpbiB0aGUgb3RoZXIgdGlsZXMgaW4gdGhlIHJvdyBhbmQgY29sdW1uIGNhbiBiZSByZWR1Y2VkXHJcbi8vICAgICAgICAgICAgICAgICByb3dJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSAmPSBjb21iaW5lZFJvd1Blcm11dGF0aW9ucztcclxuLy8gICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuLy8gICAgICAgICAgICAgICAgIGNvbEluZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtICY9IGNvbWJpbmVkQ29sUGVybXV0YXRpb25zO1xyXG4vLyAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4vLyAgICAgICAgICAgICAgICAgLy8gYm90aCBzdXBlcnBvc2l0aW9ucyBhcmUgYmVpbmcgY29tYmluZWQgYW5kIHRoZW4gYXBwbGllZCB0byB0aGUgdGlsZVxyXG4vLyAgICAgICAgICAgICAgICAgdGlsZS5udW0gJj0gY29tYmluZWRSb3dQZXJtdXRhdGlvbnMgJiBjb21iaW5lZENvbFBlcm11dGF0aW9ucztcclxuXHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLnN1ZG9rdVJ1bGVzKHksIHgpO1xyXG5cclxuLy8gICAgICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHJpdmF0ZSBzdWRva3VSdWxlcyh5OiBudW1iZXIsIHg6IG51bWJlcik6IHZvaWQge1xyXG4vLyAgICAgICAgIC8vIHdlIGNoZWNrLCBob3cgbWFueSBwb3NzaWJsZSBudW1iZXJzIHRoZSBjdXJyZW50IHRpbGUgaGFzXHJcbi8vICAgICAgICAgLy8gaWYgdGhlIHRpbGUgaXMgYWxyZWFkeSBmaXhlZCwgaXQgc2hvdWxkIHJldHVybiAxIG51bWJlclxyXG4vLyAgICAgICAgIGxldCBwb3NzaWJsZU51bWJlcnMgPSB0aGlzLm1hdHJpeFt5XVt4XS5udW0udG9TdHJpbmcoMikuc3BsaXQoXCIxXCIpLmxlbmd0aCAtIDE7XHJcblxyXG4vLyAgICAgICAgIGxldCBjb2xJbmZvID0gdGhpcy5nZXRDb2x1bW5JbmZvKHksIHgpO1xyXG4vLyAgICAgICAgIGNvbEluZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4vLyAgICAgICAgICAgICAvLyB3aXRoaW4gdGhpcyBpZiwgdGhlcmUgbWlnaHQgYmUgYSB3YXkgdG8gZml4L2luY2x1ZGUgdGhlIHNvbHV0aW9uIDggZm9yIHRoZSB0aWxlIGF0IHk6IDEgYW5kIHg6IDYgb24gbWVkaXVtWzBdXHJcbi8vICAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSA9PT0gdGhpcy5tYXRyaXhbeV1beF0ubnVtKSB7XHJcbi8vICAgICAgICAgICAgICAgICBwb3NzaWJsZU51bWJlcnMgLT0gMTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgIGlmIChwb3NzaWJsZU51bWJlcnMgPT09IDApIHtcclxuLy8gICAgICAgICAgICAgY29sSW5mby50aWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbeV1beF0ubnVtID09IHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtKSByZXR1cm47XHJcbi8vICAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSAmPSB+dGhpcy5tYXRyaXhbeV1beF0ubnVtO1xyXG4vLyAgICAgICAgICAgICB9KTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIHBvc3NpYmxlTnVtYmVycyA9IHRoaXMubWF0cml4W3ldW3hdLm51bS50b1N0cmluZygyKS5zcGxpdChcIjFcIikubGVuZ3RoIC0gMTtcclxuLy8gICAgICAgICBsZXQgcm93SW5mbyA9IHRoaXMuZ2V0Um93SW5mbyh5LCB4KTtcclxuLy8gICAgICAgICByb3dJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuLy8gICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtID09PSB0aGlzLm1hdHJpeFt5XVt4XS5udW0pIHtcclxuLy8gICAgICAgICAgICAgICAgIHBvc3NpYmxlTnVtYmVycyAtPSAxO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICAgICAgaWYgKHBvc3NpYmxlTnVtYmVycyA9PT0gMCkge1xyXG4vLyAgICAgICAgICAgICByb3dJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuLy8gICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFt5XVt4XS5udW0gPT0gdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0pIHJldHVybjtcclxuLy8gICAgICAgICAgICAgICAgIHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtICY9IH50aGlzLm1hdHJpeFt5XVt4XS5udW07XHJcbi8vICAgICAgICAgICAgIH0pO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm47XHJcbi8vICAgICB9XHJcblxyXG4vKipcclxuICogVE9ETzpcclxuICogLSBhZXN0aGV0aWNzOiAgICAgICAgICAgICAgICBtYWtlIHRoZSBjb2xvcnMgcHJldHRpZXIgdG8gbG9vayBhdCBpbiB2aWV3IChtYXliZSBvbmx5IHNob3cgbGl0dGxlIG51bWJlcnMgaWYgYW55IHNvcnQgb2Ygc29sdmluZyBoYXMgYmVlbiBzdGFydGVkKVxyXG4gKiAtIGFlc3RoZXRpY3MgKyBtZWNoYW5pY3M6ICAgIGFmdGVyIGVhY2ggY2xpY2sgb2YgdGhlIHNvbHZlU3RlcCBidXR0b24sIGNvbG9yIHRoZSB0aWxlcyB0aGF0IGhhdmUgYmVlbiBhZmZlY3RlZCBieSB0aGUgc29sdmUgY2hhbmdlIGZ1bmN0aW9uICh0aGlzIHJlcXVpcmVzIHRvIHNhdmUgYSBjb3B5IG9mIHRoZSBwcmV2aW91cyBzdGF0ZSBvZiB0aGUgbWF0cml4KVxyXG4gKiAtIG1lY2hhbmljczogICAgICAgICAgICAgICAgIG1ha2UgYSBzb2x2ZUFsbCBidXR0b24gdGhhdCByZXBlYXRlZGx5L3JlY3Vyc2l2ZWx5IGNhbGxzIHRoZSBzb2x2ZSBmdW5jdGlvbiB1bnRpbCBubyBtb3JlIGNoYW5nZXMgY2FuIGJlIG1hZGVcclxuICogLSByZWFkYWJpbGl0eTogICAgICAgICAgICAgICBtYWtlIHRoZSBjb2RlIG1vcmUgcmVhZGFibGUgYnkgc3BsaXR0aW5nIHRoZSBzb2x2ZVN0ZXAgZnVuY3Rpb24gaW50byBzbWFsbGVyIGZ1bmN0aW9ucyBpZiBwb3NzaWJsZVxyXG4gKiAtIHJlYWRhYmlsaXR5OiAgICAgICAgICAgICAgIG1ha2UgdGhlIGNvZGUgbW9yZSByZWFkYWJsZSBieSBhZGRpbmcgY29tbWVudHMgdG8gdGhlIGNvZGVcclxuICogLSBlcnJvciBoYW5kbGluZzogICAgICAgICAgICBhZGQgZXJyb3IgaGFuZGxpbmcgZm9yIHRoZSBjYXNlIHRoYXQgdGhlIGlucHV0IG1hdHJpeCBpcyBub3QgdmFsaWRcclxuICogLSBlcnJvciBoYW5kbGluZzogICAgICAgICAgICBhZGQgZXJyb3IgaGFuZGxpbmcgZm9yIHRoZSBjYXNlIHRoYXQgdGhlIHN1bSBvZiB0aGUgcm93IG9yIHRoZSBjb2x1bW4gaXNuJ3QgdmFsaWRcclxuICogLSBydWxlczogICAgICAgICAgICAgICAgICAgICBmb3IgZWFzeVsxXSwgc3BlY2lmeSBhIHJ1bGUgdGhhdCwgaW4gY2FzZSBzb21lIG51bWJlcnMgYXJlIGFscmVhZHkgZml4ZWQgYXMgdGhlIGZpbmFsIG51bWJlcnMsIHJlYXBwbGllcyB0aGUgc3VtVGFibGUgKGlmIHlvdSBoYXZlIHRocmVlIHRpbGVzIGluIGEgcm93IGFuZCBvbmUgaXMgYWxyZWFkeSBzYWZlLCB0aGUgc3VtIG9mIHRoZSBvdGhlciB0d28gdGlsZXMgY2FuIGJlIHJlY2FsY3VsYXRlZCBhbmQgdGVzdGVkIGFnYWluc3QgdGhlIHN1bVRhYmxlKVxyXG4gKiAtIHJ1bGVzOiAgICAgICAgICAgICAgICAgICAgIGZvciBlYXN5WzFdLCBzcGVjaWZ5IGEgcnVsZSB0aGF0IHNvbHZlcyByb3cgMiBieSByZWFsaXppbmcgdGhhdCBvbmx5IDggYW5kIDkgYXJlIGFscmVhZHkgZml4ZWQgZm9yIHRoZSBmaW5hbCBwZXJtdXRhdGlvbiBhbmQgYWRqdXN0IHRoZSBvdGhlciB0aWxlcyBhY2NvcmRpbmdseVxyXG4gKlxyXG4gKlxyXG4gKi9cclxuIiwiZXhwb3J0IGNsYXNzIFZpZXcge1xyXG4gICAgYm9hcmQ6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgdGlsZVNpemU6IG51bWJlcjtcclxuICAgIHRpbGVQYWRkaW5nOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvYXJkU2lkZUxlbmd0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBib3JkZXJSYWRpdXM6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHJpdmF0ZSBib2FyZENvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuYm9yZGVyUmFkaXVzID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd0JvYXJkKG1hdHJpeDogbnVtYmVyW11bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQ2FudmFzKG1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy5kcmF3QmFja2dyb3VuZCgpO1xyXG5cclxuICAgICAgICBtYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUNvcm5lclkgPSB5ICogdGhpcy50aWxlU2l6ZTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlQ29ybmVyWCA9IHggKiB0aGlzLnRpbGVTaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSB1bnBsYXlhYmxlIHRpbGVzIHdpdGggc3Vtc1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgJiA1MTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdQbGF5YWJsZVRpbGUodGlsZSwgbm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VW5wbGF5YWJsZVRpbGUodGlsZSwgbm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhd0dyaWRsaW5lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1VucGxheWFibGVUaWxlKHRpbGU6IG51bWJlciwgbm9kZUNvcm5lclg6IG51bWJlciwgbm9kZUNvcm5lclk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjb2xWYWx1ZSA9IHRpbGUgPj4gMTU7XHJcbiAgICAgICAgaWYgKGNvbFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KGNvbFZhbHVlLnRvU3RyaW5nKCksIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDEsIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDMgLSB0aGlzLnRpbGVQYWRkaW5nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb3dWYWx1ZSA9ICh0aWxlID4+IDkpICYgNjM7XHJcbiAgICAgICAgaWYgKHJvd1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgcm93VmFsdWUudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIgLSB0aGlzLnRpbGVQYWRkaW5nIC8gMixcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIgLSB0aGlzLnRpbGVQYWRkaW5nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29sVmFsdWUgJiYgcm93VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhub2RlQ29ybmVyWCwgbm9kZUNvcm5lclkpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8obm9kZUNvcm5lclggKyB0aGlzLnRpbGVTaXplLCBub2RlQ29ybmVyWSArIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLnRpbGVTaXplIC8gMjU7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3UGxheWFibGVUaWxlKHRpbGU6IG51bWJlciwgbm9kZUNvcm5lclg6IG51bWJlciwgbm9kZUNvcm5lclk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIC8vIGJhY2tncm91bmQgZm9yIHBsYXlhYmxlIHRpbGVcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImxpZ2h0Z3JheVwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnJlY3Qobm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZLCB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgIC8vIHRoZSBhbHJlYWR5IHNhZmUgbnVtYmVycyBpbiB0aGUgdGlsZXMgKGUuZy4gaWYgdGhlIHRpbGUgaGFzIDAwMCAwMDEgMDAwIHdyaXR0ZW4sIDQgaXMgdGhlIG9ubHkgbnVtYmVyIGxlZnQgdG8gYmUgcGxhY2VkIGluIHRoZSB0aWxlKVxyXG4gICAgICAgIC8vIDAwMCAwMDEgMDAwIC0+IG5hY2ggc3BsaXQgLT4gW1wiMDAwMDBcIiwgXCIwMDBcIl1cclxuICAgICAgICBsZXQgb25seVBvc3NpYmxlTnVtYmVyID0gdGlsZS50b1N0cmluZygyKS5zcGxpdChcIjFcIik7XHJcbiAgICAgICAgaWYgKG9ubHlQb3NzaWJsZU51bWJlci5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICAob25seVBvc3NpYmxlTnVtYmVyWzFdLmxlbmd0aCArIDEpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAwICsgdGhpcy50aWxlUGFkZGluZyAqIDMsXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAzIC0gdGhpcy50aWxlUGFkZGluZyAqIDJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhlIGNhbmRpZGF0ZSBudW1iZXJzIGluIHRoZSB0aWxlc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghKHRpbGUgJiAoMiAqKiBpKSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ3JleVwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIChpICsgMSkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIChpICUgMykgKyB0aGlzLnRpbGVQYWRkaW5nLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogTWF0aC5mbG9vcigoaSArIDMpIC8gMykgLSB0aGlzLnRpbGVQYWRkaW5nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlQ2FudmFzKG1hdHJpeDogbnVtYmVyW11bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuaWQgPSBcImJvYXJkXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5ib3hTaGFkb3cgPSBcIjVweCA1cHggMjBweCBncmF5XCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5ib3JkZXJSYWRpdXMgPSB0aGlzLmJvcmRlclJhZGl1cyArIFwiJVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUubWFyZ2luID0gXCIxJVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQud2lkdGggPSB0aGlzLmJvYXJkQ29udGFpbmVyLmNsaWVudFdpZHRoICogMC45ODtcclxuICAgICAgICB0aGlzLmJvYXJkLmhlaWdodCA9IHRoaXMuYm9hcmRDb250YWluZXIuY2xpZW50SGVpZ2h0ICogMC45ODtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmJvYXJkKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmJvYXJkLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLmJvYXJkU2lkZUxlbmd0aCA9IHRoaXMuYm9hcmQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdGhpcy50aWxlU2l6ZSA9IHRoaXMuYm9hcmRTaWRlTGVuZ3RoIC8gbWF0cml4Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLnRpbGVQYWRkaW5nID0gdGhpcy50aWxlU2l6ZSAvIDE1O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0JhY2tncm91bmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIHRoaXMuY3R4LnJvdW5kUmVjdCgwLCAwLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoICogKHRoaXMuYm9yZGVyUmFkaXVzIC8gMTAwKSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0dyaWRsaW5lcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8PSB0aGlzLmJvYXJkU2lkZUxlbmd0aDsgbCArPSB0aGlzLnRpbGVTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhsLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKGwsIHRoaXMuYm9hcmRTaWRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIGwpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy5ib2FyZFNpZGVMZW5ndGgsIGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLnRpbGVTaXplIC8gMjU7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL21vZGVsXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XHJcbmltcG9ydCB7IGxldmVscyB9IGZyb20gXCIuL2xldmVsc1wiO1xyXG5cclxuLyoqIGhhbmRsZXMgYWxsIGlucHV0LCBjaGVja3MgaW4gd2l0aCBtb2RlbCBhbmQgZGlzcGxheXMgdGhlIHJlc3VsdCB3aXRoIHZpZXcgKi9cclxuXHJcbmNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgbW9kZWw6IE1vZGVsO1xyXG4gICAgdmlldzogVmlldztcclxuXHJcbiAgICAvLyBidXR0b25zXHJcbiAgICBzb2x2ZU9uZVN0ZXBCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgc29sdmVBbGxCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgZGVidWcxOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKGxldmVscy5lYXN5WzBdKTtcclxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLmdldERvbUVsZW1lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREb21FbGVtZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvbHZlT25lU3RlcEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic29sdmUtc3RlcFwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLnNvbHZlQWxsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x2ZS1hbGxcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5kZWJ1ZzEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImIxXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29sdmVPbmVTdGVwQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc29sdmVTdGVwKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvbHZlQWxsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc29sdmVBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGVidWcxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52aWV3LmRyYXdCb2FyZCh0aGlzLm1vZGVsLm1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy52aWV3LmJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHRoaXMuYm9hcmRDbGlja2VkKGV2ZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBib2FyZENsaWNrZWQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJvYXJkIGNsaWNrZWRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBDb250cm9sbGVyKCk7XHJcblxyXG4vLyBcIm5wbSBydW4gc3RhcnRcIiBpbiB0ZXJtaW5hbCB0byBzdGFydCBsaXZlIHNlcnZlclxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
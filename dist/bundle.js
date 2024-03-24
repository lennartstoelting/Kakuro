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
        var leftoverColPermutations = 0;
        var leftoverRowPermutations = 0;
        possibleNumbers.forEach(function (num) {
            var colPermutationsForNum = _this.sumTable[colInfo.sum][colInfo.jointTiles.length].filter(function (permutation) { return permutation & (Math.pow(2, (num - 1))); });
            colPermutationsForNum = colPermutationsForNum.map(function (permutation) { return permutation & ~(Math.pow(2, (num - 1))); });
            colPermutationsForNum.forEach(function (permutation) {
                leftoverColPermutations |= permutation;
            });
            var rowPermutationsForNum = _this.sumTable[rowInfo.sum][rowInfo.jointTiles.length].filter(function (permutation) { return permutation & (Math.pow(2, (num - 1))); });
            rowPermutationsForNum = rowPermutationsForNum.map(function (permutation) { return permutation & ~(Math.pow(2, (num - 1))); });
            rowPermutationsForNum.forEach(function (permutation) {
                leftoverRowPermutations |= permutation;
            });
        });
        colInfo.jointTiles.forEach(function (coords) {
            if (coords.x === x && coords.y === y)
                return;
            _this.matrix[coords.y][coords.x] &= leftoverColPermutations;
        });
        rowInfo.jointTiles.forEach(function (coords) {
            if (coords.x === x && coords.y === y)
                return;
            _this.matrix[coords.y][coords.x] &= leftoverRowPermutations;
        });
        // --- end of rule out permutations in other tiles based on possible permutations from this tile ---
        var colSuperPosition = this.reduceToSuperposition(colPermutations);
        var rowSuperPosition = this.reduceToSuperposition(rowPermutations);
        // temporary, needs to be made into several steps
        this.matrix[y][x] &= colSuperPosition & rowSuperPosition;
        return;
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
        this.model = new _model__WEBPACK_IMPORTED_MODULE_0__.Model(_levels__WEBPACK_IMPORTED_MODULE_2__.levels.extreme[0]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTSxNQUFNLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUNEO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEM7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkM7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM3QixDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNyQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QztLQUNKO0lBQ0QsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6QixPQUFPLEVBQUU7UUFDTDtZQUNJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFD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QVUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDMUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QixLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtZQUNsQyxLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLCtCQUFVLEdBQWxCO1FBQUEsaUJBR0M7UUFGRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQWlCLElBQUssWUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFTyxpQ0FBWSxHQUFwQixVQUFxQixLQUFpQjtRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUM7QUFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0FBRTdCLG1EQUFtRCIsInNvdXJjZXMiOlsid2VicGFjazovL2tha3Vyby8uL3NyYy9sZXZlbHMudHMiLCJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL21vZGVsLnRzIiwid2VicGFjazovL2tha3Vyby8uL3NyYy92aWV3LnRzIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tha3Vyby8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgbGV2ZWxzID0ge1xyXG4gICAgZWFzeTogW1xyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDAsIDQ1LCAzLCAwLCAwLCAwLCAzLCA0NSwgMF0sXHJcbiAgICAgICAgICAgIFswLCAxNy4wOCwgMSwgMSwgMCwgMTYsIDQuMDMsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMC4xMSwgMSwgMSwgMSwgMTYuMTcsIDEsIDEsIDEsIDEsIDE3XSxcclxuICAgICAgICAgICAgWzAuMTcsIDEsIDEsIDMuMTcsIDEsIDEsIDEsIDAuMTYsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMC4xOCwgMSwgMSwgMSwgMCwgMCwgMTcuMTMsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMTcuMDQsIDEsIDEsIDAsIDAsIDMuMTEsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMC4wOSwgMSwgMSwgMCwgMTYsIDMuMTYsIDEsIDEsIDEsIDRdLFxyXG4gICAgICAgICAgICBbMC4xNCwgMSwgMSwgMy4xLCAxLCAxLCAxLCAxNi4xMiwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLjE5LCAxLCAxLCAxLCAxLCAwLjE4LCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAuMDUsIDEsIDEsIDAsIDAsIDAuMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAyMywgMjksIDQsIDAsIDAsIDAsIDAsIDMsIDE3XSxcclxuICAgICAgICAgICAgWzAuMTcsIDEsIDEsIDEsIDQsIDAsIDMwLCAxNy4xLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMjEsIDEsIDEsIDEsIDEsIDQuMjQsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4xNCwgMSwgMSwgMTYuMiwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLjEyLCAxLCAxLCAxMC4xMSwgMSwgMSwgMywgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjExLCAxLCAxLCAxNy4xLCAxLCAxLCAzMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAxNi4xLCAxLCAxLCA0LjA4LCAxLCAxLCA3XSxcclxuICAgICAgICAgICAgWzAsIDQsIDMuMjQsIDEsIDEsIDEsIDEsIDE2LjEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4xMywgMSwgMSwgMSwgMSwgMC4xOCwgMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjA0LCAxLCAxLCAwLCAwLCAwLCAwLjIsIDEsIDEsIDFdLFxyXG4gICAgICAgIF0sXHJcbiAgICBdLFxyXG4gICAgbWVkaXVtOiBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMCwgMjksIDQsIDAsIDcsIDM0LCAxNiwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLjA4LCAxLCAxLCAzLjE3LCAxLCAxLCAxLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDMuMzEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMC4xLCAxLCAxLCAyNC4xLCAxLCAxLCAxLCAyNCwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLjE2LCAxLCAxLCAxLCAxNSwgMC4xMywgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjEzLCAxLCAxLCAwLjE2LCAxLCAxLCAxMCwgMTZdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMC4xLCAxLCAxLCAyNCwgMy4xNiwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLCAxNy4xNCwgMSwgMSwgMSwgMTcuMTEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMC4zLCAxLCAxLCAxLCAxLCAxLCAxLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMTgsIDEsIDEsIDEsIDAuMTMsIDEsIDEsIDBdLFxyXG4gICAgICAgIF0sXHJcbiAgICBdLFxyXG4gICAgaGFyZDogW1xyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDAsIDcsIDM4LCAwLCAwLCAwLCA0LCAxMV0sXHJcbiAgICAgICAgICAgIFswLCAzLjA3LCAxLCAxLCAwLCAxNywgMTYuMDMsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMC4xNCwgMSwgMSwgMSwgNi4yMSwgMSwgMSwgMSwgMSwgMTddLFxyXG4gICAgICAgICAgICBbMC4zLCAxLCAxLCAxLCAxLCAxLCAxLCAzOS4xMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjA3LCAxLCAxLCAwLCA3LjIyLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDE2LCAxMS4wOSwgMSwgMSwgMC4wOSwgMSwgMSwgMjQsIDRdLFxyXG4gICAgICAgICAgICBbMC4xNCwgMSwgMSwgMSwgMTYsIDMuMDcsIDEsIDEsIDI0LCA0XSxcclxuICAgICAgICAgICAgWzAuMTIsIDEsIDEsIDE2LjMyLCAxLCAxLCAxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAuMjEsIDEsIDEsIDEsIDEsIDAuMTIsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMC4xLCAxLCAxLCAwLCAwLCAwLjE0LCAxLCAxLCAwXSxcclxuICAgICAgICBdLFxyXG4gICAgXSxcclxuICAgIGNoYWxsZW5naW5nOiBuZXcgQXJyYXkoMSksXHJcbiAgICBleHRyZW1lOiBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMCwgOSwgMTIsIDAsIDEyLCAzNywgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAzNywgOC4wMywgMSwgMSwgOC4xNSwgMSwgMSwgOV0sXHJcbiAgICAgICAgICAgIFswLCAxMS40MywgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjE0LCAxLCAxLCAxLCA2LjExLCAxLCAxLCAxMC4wNCwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjEsIDEsIDEsIDkuMDMsIDEsIDEsIDcuMDQsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMC4xNSwgMSwgMSwgMSwgMjYuMTMsIDEsIDEsIDEsIDE2XSxcclxuICAgICAgICAgICAgWzAsIDMuMDksIDEsIDEsIDUuMTIsIDEsIDEsIDEwLjEyLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMDksIDEsIDEsIDE0LjAzLCAxLCAxLCAzLjE0LCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuNCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLjEsIDEsIDEsIDAuMDgsIDEsIDEsIDAsIDAsIDBdLFxyXG4gICAgICAgIF0sXHJcbiAgICBdLFxyXG59O1xyXG4iLCJleHBvcnQgY2xhc3MgTW9kZWwge1xyXG4gICAgbWF0cml4OiBudW1iZXJbXVtdO1xyXG4gICAgc3VtVGFibGU6IG51bWJlcltdW11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihsZXZlbDogbnVtYmVyW11bXSkge1xyXG4gICAgICAgIHRoaXMubWF0cml4ID0gdGhpcy5pbml0QmluYXJ5TWF0cml4KGxldmVsKTtcclxuICAgICAgICB0aGlzLnN1bVRhYmxlID0gdGhpcy5pbml0U3VtVGFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIDAwMDAwMCAwMDAwMDAgMDAwMDAwMDAwXHJcbiAgICAgKiBjb2wgICAgcm93ICAgIGNhbmRpZGF0ZXNcclxuICAgICAqIGlmIHRoZSBudW1iZXIgaXMgemVybywgdGhlIHRpbGUgaXMgdW5wbGF5YWJsZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRCaW5hcnlNYXRyaXgobWF0cml4OiBudW1iZXJbXVtdKTogbnVtYmVyW11bXSB7XHJcbiAgICAgICAgbGV0IG5ld01hdHJpeDogYW55W11bXSA9IFtdO1xyXG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJvd0FycmF5OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByb3dBcnJheS5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93QXJyYXkucHVzaChwYXJzZUludChcIjFcIi5yZXBlYXQoOSksIDIpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGFsbCBvdGhlciBjYXNlcywgd2Ugc2VlIHRoZW0gYXMgYSBkZWNpbWFsIG51bWJlci5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSAwdGggYml0IGlzIDAsXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVuIHRoZSBuZXh0IDYgYml0IGluY3JpcHQgdGhlIHR3byBudW1iZXJzIHRvIHRoZSByaWdodCBvZiB0aGUgY29tbWEsXHJcbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIGxhc3QgNiBiaXQgaW5jcmlwdCB0aGUgdHdvIG51bWJlcnMgdG8gdGhlIGxlZnQgb2YgdGhlIGNvbW1hXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sQW5kUm93ID0gdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgIC50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHN1bSkgPT4gcGFyc2VJbnQoc3VtKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3cubGVuZ3RoICE9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXggYXQgeDogXCIgKyB4ICsgXCIgYW5kIHk6IFwiICsgeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93WzBdID4gNDUgfHwgY29sQW5kUm93WzBdID09IDIgfHwgY29sQW5kUm93WzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeDogc3VtIG9mIGNvbCBhdCB5OiBcIiArIHkgKyBcIiBhbmQgeDogXCIgKyB4ICsgXCIgaXMgZ2l2ZW4gYXMgXCIgKyBjb2xBbmRSb3dbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvd1sxXSA+IDQ1IHx8IGNvbEFuZFJvd1sxXSA9PSAyIHx8IGNvbEFuZFJvd1sxXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXg6IHN1bSBvZiByb3cgYXQgeTogXCIgKyB5ICsgXCIgYW5kIHg6IFwiICsgeCArIFwiIGlzIGdpdmVuIGFzIFwiICsgY29sQW5kUm93WzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByb3dBcnJheS5wdXNoKCgoY29sQW5kUm93WzBdIDw8IDYpIHwgKGNvbEFuZFJvd1sxXSA8PCAwKSkgPDwgOSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBuZXdNYXRyaXgucHVzaChyb3dBcnJheSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld01hdHJpeDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGkgd2FudCB0byBkbyBhIGdlbmVyYWwgdGFibGUgd2hlcmUgYWxsIHRoZSBjb21iaW5hdGlvbnMgb2YgMiB1cCB0byA5IG51bWJlcnMgYXJlIGxpc3RlZCBhbmQgdGhlIHN1bSBvZiB0aGVtIGlzIGNhbGN1bGF0ZWRcclxuICAgICAqIHRoZSByZXN1bHRpbmcgc3VtIGlzIHRoZSBpbmRleCBvZiB3aGVyZSB0byBmaW5kIHRoZXNlIGNvbWJpbmF0aW9ucyBpbiB0aGUgdGFibGVcclxuICAgICAqIGF0IHRoYXQgaW5kZXgsIHRoZSBjb21iaW5hdGlvbnMgYXJlIHN0b3JlZCBhcyBhIDkgYml0IG51bWJlciwgd2hlcmUgdGhlIGJpdCBpcyAxIGlmIHRoZSBudW1iZXIgaXMgaW4gdGhlIGNvbWJpbmF0aW9uXHJcbiAgICAgKiB0aGUgdGFibGUgaXMgYSA0NSBlbGVtZW50IGFycmF5XHJcbiAgICAgKiBhdCBlYWNoIGluZGV4LCB0aGUgYW1vdW50IG9mIG51bWJlcnMgdGhhdCBtYWtlIHVwIHRoZSBzdW0gaXMgc3RvcmVkIGF0IHRoZSBpbmRleCBvZiBpdCdzIGFtb3VudFxyXG4gICAgICogdGhlIG1hdHJpeCBsb29rcyBhcyBmb2xsb3dzOlxyXG4gICAgICpcclxuICAgICAqIFtbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMFxyXG4gICAgICogIFtdLCAgICAgICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgKiAgW10sICAgICAgICAgICAgICAgICAgICAgICAgIDJcclxuICAgICAqICBbW10sW10sWzNdXSwgICAgICAgICAgICAgICAgM1xyXG4gICAgICogIFtbXSxbXSxbNV1dLCAgICAgICAgICAgICAgICA0XHJcbiAgICAgKiAgW1tdLFtdLFs2LDldXSwgICAgICAgICAgICAgIDVcclxuICAgICAqICBbW10sW10sWzEwLDE3XSxbN11dXSAgICAgICAgNlxyXG4gICAgICogIFtbXSxbXSxbMzMsMTgsIDEyXSxbMTFdXSAgICA3XHJcbiAgICAgKiB0aGUgZmlyc3QgaW5kZXggaXMgdGhlIHN1bSAoIzQ1KSwgdGhlIHNlY29uZCBpbmRleCBpcyB0aGUgYW1vdW50IG9mIG51bWJlcnMgdGhhdCBtYWtlIHVwIHRoZSBzdW0oIzkpLFxyXG4gICAgICogZWFjaCBvZiB0aGUgbnVtYmVycyBmcm9tIHRoYXQgcG9pbnQgYXJlIG1lYW50IHRvIGJlIHJlYWQgaW4gYmluYXJ5LCBoYXZpbmcgYSAxIGV2ZXJ5d2hlcmUgdGhlIG51bWJlciBpcyBpbiB0aGUgY29tYmluYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0U3VtVGFibGUoKTogbnVtYmVyW11bXVtdIHtcclxuICAgICAgICAvLyBjcmVhdGUgYSA0NXg5eD8gZW1wdHkgYXJyYXlcclxuICAgICAgICBsZXQgdGFibGU6IG51bWJlcltdW11bXSA9IEFycmF5KDQ2KVxyXG4gICAgICAgICAgICAuZmlsbCgwKVxyXG4gICAgICAgICAgICAubWFwKCgpID0+XHJcbiAgICAgICAgICAgICAgICBBcnJheSgxMClcclxuICAgICAgICAgICAgICAgICAgICAuZmlsbCgwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKCkgPT4gW10pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGJpbkNvbWJpbmF0aW9uID0gMTsgYmluQ29tYmluYXRpb24gPD0gcGFyc2VJbnQoXCIxMTExMTExMTFcIiwgMik7IGJpbkNvbWJpbmF0aW9uKyspIHtcclxuICAgICAgICAgICAgbGV0IGNhbmRpZGF0ZXNEZWNBcnIgPSB0aGlzLmNhbmRpZGF0ZXNBc1JlYWRhYmxlQXJyYXkoYmluQ29tYmluYXRpb24pO1xyXG4gICAgICAgICAgICBsZXQgc3VtID0gY2FuZGlkYXRlc0RlY0Fyci5yZWR1Y2UoKGFjYywgY3VyKSA9PiBhY2MgKyBjdXIsIDApO1xyXG4gICAgICAgICAgICB0YWJsZVtzdW1dW2NhbmRpZGF0ZXNEZWNBcnIubGVuZ3RoXS5wdXNoKGJpbkNvbWJpbmF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc29sdmVBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNoYW5nZXNNYWRlID0gdHJ1ZTtcclxuICAgICAgICB3aGlsZSAoY2hhbmdlc01hZGUpIHtcclxuICAgICAgICAgICAgbGV0IG9sZE1hdHJpeCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRyaXgpKTtcclxuICAgICAgICAgICAgdGhpcy5zb2x2ZVN0ZXAoKTtcclxuICAgICAgICAgICAgY2hhbmdlc01hZGUgPSBKU09OLnN0cmluZ2lmeShvbGRNYXRyaXgpICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdHJpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb2x2ZVN0ZXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISh0aWxlICYgNTExKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc29sdmVUaWxlKHksIHgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0gc29sdmVkIHN0ZXAgLS0tXCIpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNvbHZlVGlsZSh5OiBudW1iZXIsIHg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjb2xJbmZvID0gdGhpcy5nZXRDb2x1bW5JbmZvKHksIHgpO1xyXG4gICAgICAgIGxldCByb3dJbmZvID0gdGhpcy5nZXRSb3dJbmZvKHksIHgpO1xyXG5cclxuICAgICAgICAvLyBhbGwgcGVybXV0YXRpb25zIHdoZXJlIHRoZSBnaXZlbiBqb2ludFRpbGVzIGFtb3VudCB0byBzdW1cclxuICAgICAgICBsZXQgY29sUGVybXV0YXRpb25zID0gdGhpcy5zdW1UYWJsZVtjb2xJbmZvLnN1bV1bY29sSW5mby5qb2ludFRpbGVzLmxlbmd0aF07XHJcbiAgICAgICAgbGV0IHJvd1Blcm11dGF0aW9ucyA9IHRoaXMuc3VtVGFibGVbcm93SW5mby5zdW1dW3Jvd0luZm8uam9pbnRUaWxlcy5sZW5ndGhdO1xyXG5cclxuICAgICAgICAvLyByZW1vdmluZyBwZXJtdXRhdGlvbnMgdGhhdCBkb24ndCBpbmNsdWRlIGFueSBvZiB0aGUgdGlsZXMgY2FuZGlkYXRlc1xyXG4gICAgICAgIGNvbEluZm8uam9pbnRUaWxlcy5mb3JFYWNoKCh0aWxlOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0pID0+IHtcclxuICAgICAgICAgICAgY29sUGVybXV0YXRpb25zID0gY29sUGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IHBlcm11dGF0aW9uICYgdGhpcy5tYXRyaXhbdGlsZS55XVt0aWxlLnhdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByb3dJbmZvLmpvaW50VGlsZXMuZm9yRWFjaCgodGlsZTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgICAgIHJvd1Blcm11dGF0aW9ucyA9IHJvd1Blcm11dGF0aW9ucy5maWx0ZXIoKHBlcm11dGF0aW9uKSA9PiBwZXJtdXRhdGlvbiAmIHRoaXMubWF0cml4W3RpbGUueV1bdGlsZS54XSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIC0tLSBzdWRva3UgcnVsZXMgLS0tXHJcblxyXG4gICAgICAgIGxldCBvdGhlckNhbmRpZGF0ZXNpblJvdzogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICByb3dJbmZvLmpvaW50VGlsZXMuZm9yRWFjaCgodGlsZTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aWxlLnggPT09IHggJiYgdGlsZS55ID09PSB5KSByZXR1cm47XHJcbiAgICAgICAgICAgIG90aGVyQ2FuZGlkYXRlc2luUm93LnB1c2godGhpcy5tYXRyaXhbdGlsZS55XVt0aWxlLnhdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgcm93Q2FuZGlkYXRlc0NvdW50ZWQgPSBvdGhlckNhbmRpZGF0ZXNpblJvdy5yZWR1Y2UoKGNudDogYW55LCBjdXI6IGFueSkgPT4gKChjbnRbY3VyXSA9IGNudFtjdXJdICsgMSB8fCAxKSwgY250KSwge30pO1xyXG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHJvd0NhbmRpZGF0ZXNDb3VudGVkKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW5kaWRhdGVzQXNSZWFkYWJsZUFycmF5KHBhcnNlSW50KGtleSkpLmxlbmd0aCAhPT0gdmFsdWUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAvLyBJIGNhbiBjcm9zcyBvZmYgdGhlIG1hdHJpeCBjYW5kaWRhdGVzIHN1ZG9rdSBzdHlsZVxyXG4gICAgICAgICAgICB0aGlzLm1hdHJpeFt5XVt4XSAmPSB+cGFyc2VJbnQoa2V5KTtcclxuICAgICAgICAgICAgLy8gYW5kIEkgY2FuIGFkYXB0IHRoZSBwZXJtdXRhdGlvbnNcclxuICAgICAgICAgICAgcm93UGVybXV0YXRpb25zID0gcm93UGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IChwZXJtdXRhdGlvbiAmIHBhcnNlSW50KGtleSkpID09IHBhcnNlSW50KGtleSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG90aGVyQ2FuZGlkYXRlc2luQ29sOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGNvbEluZm8uam9pbnRUaWxlcy5mb3JFYWNoKCh0aWxlOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRpbGUueCA9PT0geCAmJiB0aWxlLnkgPT09IHkpIHJldHVybjtcclxuICAgICAgICAgICAgb3RoZXJDYW5kaWRhdGVzaW5Db2wucHVzaCh0aGlzLm1hdHJpeFt0aWxlLnldW3RpbGUueF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBjb2xDYW5kaWRhdGVzQ291bnRlZCA9IG90aGVyQ2FuZGlkYXRlc2luQ29sLnJlZHVjZSgoY250OiBhbnksIGN1cjogYW55KSA9PiAoKGNudFtjdXJdID0gY250W2N1cl0gKyAxIHx8IDEpLCBjbnQpLCB7fSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoY29sQ2FuZGlkYXRlc0NvdW50ZWQpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbmRpZGF0ZXNBc1JlYWRhYmxlQXJyYXkocGFyc2VJbnQoa2V5KSkubGVuZ3RoICE9PSB2YWx1ZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIC8vIEkgY2FuIGNyb3NzIG9mZiB0aGUgbWF0cml4IGNhbmRpZGF0ZXMgc3Vkb2t1IHN0eWxlXHJcbiAgICAgICAgICAgIHRoaXMubWF0cml4W3ldW3hdICY9IH5wYXJzZUludChrZXkpO1xyXG4gICAgICAgICAgICAvLyBhbmQgSSBjYW4gYWRhcHQgdGhlIHBlcm11dGF0aW9uc1xyXG4gICAgICAgICAgICBjb2xQZXJtdXRhdGlvbnMgPSBjb2xQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gKHBlcm11dGF0aW9uICYgcGFyc2VJbnQoa2V5KSkgPT0gcGFyc2VJbnQoa2V5KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLS0gZW5kIG9mIHN1ZG9rdSBydWxlcyAtLS1cclxuXHJcbiAgICAgICAgLy8gLS0tIHJ1bGUgb3V0IHBlcm11dGF0aW9ucyBpbiBvdGhlciB0aWxlcyBiYXNlZCBvbiBwb3NzaWJsZSBwZXJtdXRhdGlvbnMgZnJvbSB0aGlzIHRpbGVcclxuXHJcbiAgICAgICAgbGV0IHBvc3NpYmxlTnVtYmVycyA9IHRoaXMuY2FuZGlkYXRlc0FzUmVhZGFibGVBcnJheSh0aGlzLm1hdHJpeFt5XVt4XSk7XHJcbiAgICAgICAgbGV0IGxlZnRvdmVyQ29sUGVybXV0YXRpb25zID0gMDtcclxuICAgICAgICBsZXQgbGVmdG92ZXJSb3dQZXJtdXRhdGlvbnMgPSAwO1xyXG5cclxuICAgICAgICBwb3NzaWJsZU51bWJlcnMuZm9yRWFjaCgobnVtKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb2xQZXJtdXRhdGlvbnNGb3JOdW0gPSB0aGlzLnN1bVRhYmxlW2NvbEluZm8uc3VtXVtjb2xJbmZvLmpvaW50VGlsZXMubGVuZ3RoXS5maWx0ZXIoKHBlcm11dGF0aW9uKSA9PiBwZXJtdXRhdGlvbiAmICgyICoqIChudW0gLSAxKSkpO1xyXG4gICAgICAgICAgICBjb2xQZXJtdXRhdGlvbnNGb3JOdW0gPSBjb2xQZXJtdXRhdGlvbnNGb3JOdW0ubWFwKChwZXJtdXRhdGlvbikgPT4gcGVybXV0YXRpb24gJiB+KDIgKiogKG51bSAtIDEpKSk7XHJcbiAgICAgICAgICAgIGNvbFBlcm11dGF0aW9uc0Zvck51bS5mb3JFYWNoKChwZXJtdXRhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGVmdG92ZXJDb2xQZXJtdXRhdGlvbnMgfD0gcGVybXV0YXRpb247XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJvd1Blcm11dGF0aW9uc0Zvck51bSA9IHRoaXMuc3VtVGFibGVbcm93SW5mby5zdW1dW3Jvd0luZm8uam9pbnRUaWxlcy5sZW5ndGhdLmZpbHRlcigocGVybXV0YXRpb24pID0+IHBlcm11dGF0aW9uICYgKDIgKiogKG51bSAtIDEpKSk7XHJcbiAgICAgICAgICAgIHJvd1Blcm11dGF0aW9uc0Zvck51bSA9IHJvd1Blcm11dGF0aW9uc0Zvck51bS5tYXAoKHBlcm11dGF0aW9uKSA9PiBwZXJtdXRhdGlvbiAmIH4oMiAqKiAobnVtIC0gMSkpKTtcclxuICAgICAgICAgICAgcm93UGVybXV0YXRpb25zRm9yTnVtLmZvckVhY2goKHBlcm11dGF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0b3ZlclJvd1Blcm11dGF0aW9ucyB8PSBwZXJtdXRhdGlvbjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbEluZm8uam9pbnRUaWxlcy5mb3JFYWNoKChjb29yZHM6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY29vcmRzLnggPT09IHggJiYgY29vcmRzLnkgPT09IHkpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XSAmPSBsZWZ0b3ZlckNvbFBlcm11dGF0aW9ucztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcm93SW5mby5qb2ludFRpbGVzLmZvckVhY2goKGNvb3JkczogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjb29yZHMueCA9PT0geCAmJiBjb29yZHMueSA9PT0geSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdICY9IGxlZnRvdmVyUm93UGVybXV0YXRpb25zO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAtLS0gZW5kIG9mIHJ1bGUgb3V0IHBlcm11dGF0aW9ucyBpbiBvdGhlciB0aWxlcyBiYXNlZCBvbiBwb3NzaWJsZSBwZXJtdXRhdGlvbnMgZnJvbSB0aGlzIHRpbGUgLS0tXHJcblxyXG4gICAgICAgIGxldCBjb2xTdXBlclBvc2l0aW9uID0gdGhpcy5yZWR1Y2VUb1N1cGVycG9zaXRpb24oY29sUGVybXV0YXRpb25zKTtcclxuICAgICAgICBsZXQgcm93U3VwZXJQb3NpdGlvbiA9IHRoaXMucmVkdWNlVG9TdXBlcnBvc2l0aW9uKHJvd1Blcm11dGF0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIHRlbXBvcmFyeSwgbmVlZHMgdG8gYmUgbWFkZSBpbnRvIHNldmVyYWwgc3RlcHNcclxuICAgICAgICB0aGlzLm1hdHJpeFt5XVt4XSAmPSBjb2xTdXBlclBvc2l0aW9uICYgcm93U3VwZXJQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q29sdW1uSW5mbyh5OiBudW1iZXIsIHg6IG51bWJlcik6IHsgc3VtOiBudW1iZXI7IGpvaW50VGlsZXM6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfVtdIH0ge1xyXG4gICAgICAgIHdoaWxlICh5ID49IDAgJiYgdGhpcy5tYXRyaXhbeV1beF0gJiA1MTEpIHtcclxuICAgICAgICAgICAgeS0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29sQ29vcmRpbmF0ZXM6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfVtdID0gW107XHJcbiAgICAgICAgd2hpbGUgKHkgKyBjb2xDb29yZGluYXRlcy5sZW5ndGggPCA5ICYmIHRoaXMubWF0cml4W3kgKyBjb2xDb29yZGluYXRlcy5sZW5ndGggKyAxXVt4XSAmIDUxMSkge1xyXG4gICAgICAgICAgICBjb2xDb29yZGluYXRlcy5wdXNoKHsgeTogeSArIGNvbENvb3JkaW5hdGVzLmxlbmd0aCArIDEsIHg6IHggfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBzdW06IHRoaXMubWF0cml4W3ldW3hdID4+IDE1LCBqb2ludFRpbGVzOiBjb2xDb29yZGluYXRlcyB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Um93SW5mbyh5OiBudW1iZXIsIHg6IG51bWJlcik6IHsgc3VtOiBudW1iZXI7IGpvaW50VGlsZXM6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfVtdIH0ge1xyXG4gICAgICAgIHdoaWxlICh4ID49IDAgJiYgdGhpcy5tYXRyaXhbeV1beF0gJiA1MTEpIHtcclxuICAgICAgICAgICAgeC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcm93Q29vcmRpbmF0ZXM6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfVtdID0gW107XHJcbiAgICAgICAgd2hpbGUgKHggKyByb3dDb29yZGluYXRlcy5sZW5ndGggPCA5ICYmIHRoaXMubWF0cml4W3ldW3ggKyByb3dDb29yZGluYXRlcy5sZW5ndGggKyAxXSAmIDUxMSkge1xyXG4gICAgICAgICAgICByb3dDb29yZGluYXRlcy5wdXNoKHsgeTogeSwgeDogeCArIHJvd0Nvb3JkaW5hdGVzLmxlbmd0aCArIDEgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBzdW06ICh0aGlzLm1hdHJpeFt5XVt4XSA+PiA5KSAmIDYzLCBqb2ludFRpbGVzOiByb3dDb29yZGluYXRlcyB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVkdWNlVG9TdXBlcnBvc2l0aW9uKHBlcm11dGF0aW9uczogbnVtYmVyW10pOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBwZXJtdXRhdGlvbnMucmVkdWNlKChhY2MsIGN1cikgPT4ge1xyXG4gICAgICAgICAgICBhY2MgfD0gY3VyO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FuZGlkYXRlc0FzUmVhZGFibGVBcnJheShiaW5hcnk6IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICBsZXQgY2FuZGlkYXRlczogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoYmluYXJ5ICYgKDIgKiogaSkpIHtcclxuICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXMucHVzaChpICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUT0RPOlxyXG4gKiAtIGFlc3RoZXRpY3M6ICAgICAgICAgICAgICAgIG1ha2UgdGhlIGNvbG9ycyBwcmV0dGllciB0byBsb29rIGF0IGluIHZpZXcgKG1heWJlIG9ubHkgc2hvdyBsaXR0bGUgbnVtYmVycyBpZiBhbnkgc29ydCBvZiBzb2x2aW5nIGhhcyBiZWVuIHN0YXJ0ZWQpXHJcbiAqIC0gYWVzdGhldGljcyArIG1lY2hhbmljczogICAgYWZ0ZXIgZWFjaCBjbGljayBvZiB0aGUgc29sdmVTdGVwIGJ1dHRvbiwgY29sb3IgdGhlIHRpbGVzIHRoYXQgaGF2ZSBiZWVuIGFmZmVjdGVkIGJ5IHRoZSBzb2x2ZSBjaGFuZ2UgZnVuY3Rpb24gKHRoaXMgcmVxdWlyZXMgdG8gc2F2ZSBhIGNvcHkgb2YgdGhlIHByZXZpb3VzIHN0YXRlIG9mIHRoZSBtYXRyaXgpXHJcbiAqIC0gbWVjaGFuaWNzOiAgICAgICAgICAgICAgICAgbWFrZSBhIHNvbHZlQWxsIGJ1dHRvbiB0aGF0IHJlcGVhdGVkbHkvcmVjdXJzaXZlbHkgY2FsbHMgdGhlIHNvbHZlIGZ1bmN0aW9uIHVudGlsIG5vIG1vcmUgY2hhbmdlcyBjYW4gYmUgbWFkZVxyXG4gKiAtIHJlYWRhYmlsaXR5OiAgICAgICAgICAgICAgIG1ha2UgdGhlIGNvZGUgbW9yZSByZWFkYWJsZSBieSBzcGxpdHRpbmcgdGhlIHNvbHZlU3RlcCBmdW5jdGlvbiBpbnRvIHNtYWxsZXIgZnVuY3Rpb25zIGlmIHBvc3NpYmxlXHJcbiAqIC0gcmVhZGFiaWxpdHk6ICAgICAgICAgICAgICAgbWFrZSB0aGUgY29kZSBtb3JlIHJlYWRhYmxlIGJ5IGFkZGluZyBjb21tZW50cyB0byB0aGUgY29kZVxyXG4gKiAtIGVycm9yIGhhbmRsaW5nOiAgICAgICAgICAgIGFkZCBlcnJvciBoYW5kbGluZyBmb3IgdGhlIGNhc2UgdGhhdCB0aGUgaW5wdXQgbWF0cml4IGlzIG5vdCB2YWxpZFxyXG4gKiAtIGVycm9yIGhhbmRsaW5nOiAgICAgICAgICAgIGFkZCBlcnJvciBoYW5kbGluZyBmb3IgdGhlIGNhc2UgdGhhdCB0aGUgc3VtIG9mIHRoZSByb3cgb3IgdGhlIGNvbHVtbiBpc24ndCB2YWxpZFxyXG4gKiAtIHJ1bGVzOiAgICAgICAgICAgICAgICAgICAgIGZvciBlYXN5WzFdLCBzcGVjaWZ5IGEgcnVsZSB0aGF0LCBpbiBjYXNlIHNvbWUgbnVtYmVycyBhcmUgYWxyZWFkeSBmaXhlZCBhcyB0aGUgZmluYWwgbnVtYmVycywgcmVhcHBsaWVzIHRoZSBzdW1UYWJsZSAoaWYgeW91IGhhdmUgdGhyZWUgdGlsZXMgaW4gYSByb3cgYW5kIG9uZSBpcyBhbHJlYWR5IHNhZmUsIHRoZSBzdW0gb2YgdGhlIG90aGVyIHR3byB0aWxlcyBjYW4gYmUgcmVjYWxjdWxhdGVkIGFuZCB0ZXN0ZWQgYWdhaW5zdCB0aGUgc3VtVGFibGUpXHJcbiAqIC0gcnVsZXM6ICAgICAgICAgICAgICAgICAgICAgZm9yIGVhc3lbMV0sIHNwZWNpZnkgYSBydWxlIHRoYXQgc29sdmVzIHJvdyAyIGJ5IHJlYWxpemluZyB0aGF0IG9ubHkgOCBhbmQgOSBhcmUgYWxyZWFkeSBmaXhlZCBmb3IgdGhlIGZpbmFsIHBlcm11dGF0aW9uIGFuZCBhZGp1c3QgdGhlIG90aGVyIHRpbGVzIGFjY29yZGluZ2x5XHJcbiAqXHJcbiAqXHJcbiAqL1xyXG4iLCJleHBvcnQgY2xhc3MgVmlldyB7XHJcbiAgICBib2FyZDogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICB0aWxlU2l6ZTogbnVtYmVyO1xyXG4gICAgdGlsZVBhZGRpbmc6IG51bWJlcjtcclxuICAgIHByaXZhdGUgYm9hcmRTaWRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvcmRlclJhZGl1czogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIGJvYXJkQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1jb250YWluZXJcIikgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ib3JkZXJSYWRpdXMgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3Qm9hcmQobWF0cml4OiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDYW52YXMobWF0cml4KTtcclxuICAgICAgICB0aGlzLmRyYXdCYWNrZ3JvdW5kKCk7XHJcblxyXG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goKHRpbGUsIHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlQ29ybmVyWSA9IHkgKiB0aGlzLnRpbGVTaXplO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVDb3JuZXJYID0geCAqIHRoaXMudGlsZVNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIHVucGxheWFibGUgdGlsZXMgd2l0aCBzdW1zXHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAmIDUxMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BsYXlhYmxlVGlsZSh0aWxlLCBub2RlQ29ybmVyWCwgbm9kZUNvcm5lclkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdVbnBsYXlhYmxlVGlsZSh0aWxlLCBub2RlQ29ybmVyWCwgbm9kZUNvcm5lclkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3R3JpZGxpbmVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3VW5wbGF5YWJsZVRpbGUodGlsZTogbnVtYmVyLCBub2RlQ29ybmVyWDogbnVtYmVyLCBub2RlQ29ybmVyWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNvbFZhbHVlID0gdGlsZSA+PiAxNTtcclxuICAgICAgICBpZiAoY29sVmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoY29sVmFsdWUudG9TdHJpbmcoKSwgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMSwgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMyAtIHRoaXMudGlsZVBhZGRpbmcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJvd1ZhbHVlID0gKHRpbGUgPj4gOSkgJiA2MztcclxuICAgICAgICBpZiAocm93VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICAoXCIgIFwiICsgcm93VmFsdWUudG9TdHJpbmcoKSkuc2xpY2UoLTIpLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMiAtIHRoaXMudGlsZVBhZGRpbmcgLyAyLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMiAtIHRoaXMudGlsZVBhZGRpbmdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb2xWYWx1ZSAmJiByb3dWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKG5vZGVDb3JuZXJYLCBub2RlQ29ybmVyWSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhub2RlQ29ybmVyWCArIHRoaXMudGlsZVNpemUsIG5vZGVDb3JuZXJZICsgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMudGlsZVNpemUgLyAyNTtcclxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdQbGF5YWJsZVRpbGUodGlsZTogbnVtYmVyLCBub2RlQ29ybmVyWDogbnVtYmVyLCBub2RlQ29ybmVyWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gYmFja2dyb3VuZCBmb3IgcGxheWFibGUgdGlsZVxyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwibGlnaHRncmF5XCI7XHJcbiAgICAgICAgdGhpcy5jdHgucmVjdChub2RlQ29ybmVyWCwgbm9kZUNvcm5lclksIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuXHJcbiAgICAgICAgLy8gdGhlIGFscmVhZHkgc2FmZSBudW1iZXJzIGluIHRoZSB0aWxlcyAoZS5nLiBpZiB0aGUgdGlsZSBoYXMgMDAwIDAwMSAwMDAgd3JpdHRlbiwgNCBpcyB0aGUgb25seSBudW1iZXIgbGVmdCB0byBiZSBwbGFjZWQgaW4gdGhlIHRpbGUpXHJcbiAgICAgICAgLy8gMDAwIDAwMSAwMDAgLT4gbmFjaCBzcGxpdCAtPiBbXCIwMDAwMFwiLCBcIjAwMFwiXVxyXG4gICAgICAgIGxldCBvbmx5UG9zc2libGVOdW1iZXIgPSB0aWxlLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKTtcclxuICAgICAgICBpZiAob25seVBvc3NpYmxlTnVtYmVyLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIChvbmx5UG9zc2libGVOdW1iZXJbMV0ubGVuZ3RoICsgMSkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDAgKyB0aGlzLnRpbGVQYWRkaW5nICogMyxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDMgLSB0aGlzLnRpbGVQYWRkaW5nICogMlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0aGUgY2FuZGlkYXRlIG51bWJlcnMgaW4gdGhlIHRpbGVzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCEodGlsZSAmICgyICoqIGkpKSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJncmV5XCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgKGkgKyAxKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogKGkgJSAzKSArIHRoaXMudGlsZVBhZGRpbmcsXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiBNYXRoLmZsb29yKChpICsgMykgLyAzKSAtIHRoaXMudGlsZVBhZGRpbmdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVDYW52YXMobWF0cml4OiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5pZCA9IFwiYm9hcmRcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLmJveFNoYWRvdyA9IFwiNXB4IDVweCAyMHB4IGdyYXlcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLmJvcmRlclJhZGl1cyA9IHRoaXMuYm9yZGVyUmFkaXVzICsgXCIlXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5tYXJnaW4gPSBcIjElXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC53aWR0aCA9IHRoaXMuYm9hcmRDb250YWluZXIuY2xpZW50V2lkdGggKiAwLjk4O1xyXG4gICAgICAgIHRoaXMuYm9hcmQuaGVpZ2h0ID0gdGhpcy5ib2FyZENvbnRhaW5lci5jbGllbnRIZWlnaHQgKiAwLjk4O1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuYm9hcmQpO1xyXG5cclxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuYm9hcmQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMuYm9hcmRTaWRlTGVuZ3RoID0gdGhpcy5ib2FyZC5jbGllbnRXaWR0aDtcclxuICAgICAgICB0aGlzLnRpbGVTaXplID0gdGhpcy5ib2FyZFNpZGVMZW5ndGggLyBtYXRyaXgubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMudGlsZVBhZGRpbmcgPSB0aGlzLnRpbGVTaXplIC8gMTU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3QmFja2dyb3VuZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgdGhpcy5jdHgucm91bmRSZWN0KDAsIDAsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGgsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGgsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGggKiAodGhpcy5ib3JkZXJSYWRpdXMgLyAxMDApKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3R3JpZGxpbmVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDw9IHRoaXMuYm9hcmRTaWRlTGVuZ3RoOyBsICs9IHRoaXMudGlsZVNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKGwsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8obCwgdGhpcy5ib2FyZFNpZGVMZW5ndGgpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmJvYXJkU2lkZUxlbmd0aCwgbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMudGlsZVNpemUgLyAyNTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcclxuaW1wb3J0IHsgbGV2ZWxzIH0gZnJvbSBcIi4vbGV2ZWxzXCI7XHJcblxyXG4vKiogaGFuZGxlcyBhbGwgaW5wdXQsIGNoZWNrcyBpbiB3aXRoIG1vZGVsIGFuZCBkaXNwbGF5cyB0aGUgcmVzdWx0IHdpdGggdmlldyAqL1xyXG5cclxuY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgICBtb2RlbDogTW9kZWw7XHJcbiAgICB2aWV3OiBWaWV3O1xyXG5cclxuICAgIC8vIGJ1dHRvbnNcclxuICAgIHNvbHZlT25lU3RlcEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBzb2x2ZUFsbEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBkZWJ1ZzE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWwobGV2ZWxzLmV4dHJlbWVbMF0pO1xyXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudHMoKTtcclxuICAgICAgICB0aGlzLmluaXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERvbUVsZW1lbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29sdmVPbmVTdGVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x2ZS1zdGVwXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMuc29sdmVBbGxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvbHZlLWFsbFwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLmRlYnVnMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYjFcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0RXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2x2ZU9uZVN0ZXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb2x2ZVN0ZXAoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29sdmVBbGxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb2x2ZUFsbCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kZWJ1ZzEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb2x2ZVRpbGUoNSwgNCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZpZXcuZHJhd0JvYXJkKHRoaXMubW9kZWwubWF0cml4KTtcclxuICAgICAgICB0aGlzLnZpZXcuYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4gdGhpcy5ib2FyZENsaWNrZWQoZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJvYXJkQ2xpY2tlZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm9hcmQgY2xpY2tlZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYXBwID0gbmV3IENvbnRyb2xsZXIoKTtcclxuXHJcbi8vIFwibnBtIHJ1biBzdGFydFwiIGluIHRlcm1pbmFsIHRvIHN0YXJ0IGxpdmUgc2VydmVyXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
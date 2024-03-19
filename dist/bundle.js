/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Model = /** @class */ (function () {
    function Model() {
        // grundsätzlich: unspielbar, Summenfeld, spielbar
        // Idee: 13 bit Zahl (bit 0: spielbar ja oder nein? bit 1-12: Summenfeld)
        this.matrix = this.initBinaryMatrix(easy1);
        this.sumTable = this.initSumTable();
        // console.log(this.matrix);
        // console.log(this.sumTable);
    }
    Model.prototype.initBinaryMatrix = function (matrix) {
        var binaryMatrix = [];
        matrix.forEach(function (row, y) {
            var binaryRow = [];
            row.forEach(function (tile, x) {
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
                var colAndRow = tile
                    .toFixed(2)
                    .split(".")
                    .map(function (sum) { return parseInt(sum); });
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
                var colAndRowBinary = colAndRow.map(function (sum) { return ("000000" + sum.toString(2)).slice(-6); });
                var binary = parseInt(colAndRowBinary[0] + colAndRowBinary[1], 2) << 1;
                binaryRow.push(binary);
            });
            binaryMatrix.push(binaryRow);
        });
        return binaryMatrix;
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
        var table = Array(46)
            .fill(0)
            .map(function () {
            return Array(10)
                .fill(0)
                .map(function () { return []; });
        });
        for (var binaryCombination = 3; binaryCombination <= parseInt("111111111", 2); binaryCombination++) {
            var amountOfOnes = binaryCombination.toString(2).split("1").length - 1;
            if (amountOfOnes === 1) {
                continue;
            }
            var sum = 0;
            for (var j = 0; j < 9; j++) {
                if (binaryCombination & (Math.pow(2, j))) {
                    sum += j + 1;
                }
            }
            // console.log("sum: " + sum + " amountOfOnes: " + amountOfOnes + " binaryCombination: " + binaryCombination.toString(2));
            table[sum][amountOfOnes].push(binaryCombination);
        }
        return table;
    };
    Model.prototype.solve = function () {
        var _this = this;
        var yTest = 3;
        var xTest = 8;
        this.matrix.forEach(function (row, y) {
            row.forEach(function (tile, x) {
                // only solve the empty tiles
                if (!(_this.matrix[y][x] & 1)) {
                    return;
                }
                _this.matrix[y][x] &= _this._crossReferenceSumTableEntries(y, x);
                _this.matrix[y][x] &= _this._sudokuRules(y, x);
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
    };
    Model.prototype._crossReferenceSumTableEntries = function (y, x) {
        var colInfo = this._getColumnInfo(y, x);
        var rowInfo = this._getRowInfo(y, x);
        var rowCombinations = this.sumTable[rowInfo.sum][rowInfo.tileAmount].reduce(function (acc, cur) {
            acc |= cur;
            return acc;
        }, 0);
        var colCombinations = this.sumTable[colInfo.sum][colInfo.tileAmount].reduce(function (acc, cur) {
            acc |= cur;
            return acc;
        }, 0);
        var possibleCombinations = rowCombinations & colCombinations;
        return (possibleCombinations << 1) | 1;
    };
    /**
     * loops up to find the sum of the column
     * loops down from there to find the empty tiles below that sum
     * @returns array with the sum to the right and the amount of empty tiles in the column
     */
    Model.prototype._getColumnInfo = function (y, x) {
        while (y >= 0 && this.matrix[y][x] & 1) {
            y--;
        }
        var emptyTilesInColumn = 1;
        while (y + emptyTilesInColumn < 9 && this.matrix[y + emptyTilesInColumn + 1][x] & 1) {
            emptyTilesInColumn++;
        }
        return { sum: (this.matrix[y][x] >> 7) & 63, tileAmount: emptyTilesInColumn };
    };
    Model.prototype._getRowInfo = function (y, x) {
        while (x >= 0 && this.matrix[y][x] & 1) {
            x--;
        }
        var emptyTilesInRow = 1;
        while (x + emptyTilesInRow < 9 && this.matrix[y][x + emptyTilesInRow + 1] & 1) {
            emptyTilesInRow++;
        }
        return { sum: (this.matrix[y][x] >> 1) & 63, tileAmount: emptyTilesInRow };
        // return [(this.matrix[y][x] >> 1) & 63, emptyTilesInRow];
    };
    Model.prototype._sudokuRules = function (y, x) {
        return 1023;
    };
    return Model;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Model);
var easy1 = [
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
var medium2 = [
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


/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var View = /** @class */ (function () {
    function View() {
        this.boardContainer = document.getElementById("board-container");
        this.borderRadius = 1;
    }
    View.prototype.drawBoard = function (matrix) {
        var _this = this;
        this._createCanvas(matrix);
        this._drawBackground();
        matrix.forEach(function (row, y) {
            row.forEach(function (tile, x) {
                var nodeCornerX = x * _this.tileSize;
                var nodeCornerY = y * _this.tileSize;
                // the unplayable tiles with sums
                if (!(tile & 1)) {
                    var sumToRight = (tile >> 1) & 63;
                    if (sumToRight) {
                        _this.ctx.font = _this.tileSize / 3.5 + "px Arial";
                        _this.ctx.fillStyle = "white";
                        _this.ctx.fillText(sumToRight.toString(), nodeCornerX + (_this.tileSize / 3) * 2 - _this.tilePadding / 2, nodeCornerY + (_this.tileSize / 3) * 2 - _this.tilePadding);
                    }
                    var sumToDown = (tile >> 7) & 63;
                    if (sumToDown) {
                        _this.ctx.font = _this.tileSize / 3.5 + "px Arial";
                        _this.ctx.fillStyle = "white";
                        _this.ctx.fillText(sumToDown.toString(), nodeCornerX + (_this.tileSize / 3) * 1, nodeCornerY + (_this.tileSize / 3) * 3 - _this.tilePadding);
                    }
                    if (sumToDown && sumToRight) {
                        _this.ctx.beginPath();
                        _this.ctx.moveTo(nodeCornerX, nodeCornerY);
                        _this.ctx.lineTo(nodeCornerX + _this.tileSize, nodeCornerY + _this.tileSize);
                        _this.ctx.lineWidth = _this.tileSize / 25;
                        _this.ctx.strokeStyle = "white";
                        _this.ctx.stroke();
                    }
                    return;
                }
                // the empty, playable tiles
                _this.ctx.beginPath();
                _this.ctx.fillStyle = "lightgray";
                _this.ctx.rect(nodeCornerX, nodeCornerY, _this.tileSize, _this.tileSize);
                _this.ctx.stroke();
                _this.ctx.fill();
                // the already safe numbers in the tiles (e.g. if the tile has 0010000001 written, 7 is the only number left to be placed in the tile)
                if (tile.toString(2).split("1").length == 3) {
                    var safeNumber = tile.toString(2).split("1")[1].length + 1;
                    _this.ctx.font = _this.tileSize + "px Arial";
                    _this.ctx.fillStyle = "black";
                    _this.ctx.fillText(safeNumber.toString(), nodeCornerX + (_this.tileSize / 3) * 0 + _this.tilePadding * 3, nodeCornerY + (_this.tileSize / 3) * 3 - _this.tilePadding * 2);
                    return;
                }
                // the noted numbers in the tiles
                for (var i = 1; i <= 9; i++) {
                    if (!(tile & (Math.pow(2, i))))
                        continue;
                    _this.ctx.font = _this.tileSize / 3.5 + "px Arial";
                    _this.ctx.fillStyle = "grey";
                    _this.ctx.fillText(i.toString(), nodeCornerX + (_this.tileSize / 3) * ((i - 1) % 3) + _this.tilePadding, nodeCornerY + (_this.tileSize / 3) * Math.floor((i + 2) / 3) - _this.tilePadding);
                }
                // this.ctx.font = this.tileSize / 3.5 + "px Arial";
                // this.ctx.fillStyle = "grey";
                // this.ctx.fillText("1", nodeCornerX + (this.tileSize / 3) * 0, nodeCornerY + (this.tileSize / 3) * 3);
            });
        });
        // there needs to be a little adjustments because of the way the canvas draws the numbers but that is purely cosmetic
        this._drawGridlines();
    };
    View.prototype._createCanvas = function (matrix) {
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
    View.prototype._drawBackground = function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.roundRect(0, 0, this.board.clientWidth, this.board.clientWidth, this.board.clientWidth * (this.borderRadius / 100));
        this.ctx.stroke();
        this.ctx.fill();
    };
    View.prototype._drawGridlines = function () {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (View);


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


/** handles all input, checks in with model and displays the result with view */
var Controller = /** @class */ (function () {
    function Controller() {
        this.model = new _model__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.view = new _view__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this._getDomElements();
        this._initEventListeners();
        this._updateView();
    }
    Controller.prototype._getDomElements = function () {
        this.solveButton = document.getElementById("solve");
    };
    Controller.prototype._initEventListeners = function () {
        var _this = this;
        window.addEventListener("resize", function () {
            _this._updateView();
        });
        this.solveButton.addEventListener("click", function () {
            _this.model.solve();
            _this._updateView();
        });
    };
    Controller.prototype._updateView = function () {
        var _this = this;
        this.view.drawBoard(this.model.matrix);
        this.view.board.addEventListener("click", function (event) { return _this._boardClicked(event); });
    };
    Controller.prototype._boardClicked = function (event) {
        console.log("board clicked");
    };
    return Controller;
}());
var app = new Controller();
// "npm run start" in terminal to start live server

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUN0QyxDQUFDO0FBRUYsSUFBTSxPQUFPLEdBQWU7SUFDeEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDdkMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDL01GO0lBVUk7UUFDSSxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQW1CLENBQUM7UUFDbkYsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLHdCQUFTLEdBQWhCLFVBQWlCLE1BQWtCO1FBQW5DLGlCQXFGQztRQXBGRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV2QixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUM7WUFDbEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQixJQUFJLFdBQVcsR0FBRyxDQUFDLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQztnQkFDcEMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUM7Z0JBRXBDLGlDQUFpQztnQkFDakMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ2QsSUFBSSxVQUFVLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNsQyxJQUFJLFVBQVUsRUFBRSxDQUFDO3dCQUNiLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQzt3QkFDakQsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO3dCQUM3QixLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDYixVQUFVLENBQUMsUUFBUSxFQUFFLEVBQ3JCLFdBQVcsR0FBRyxDQUFDLEtBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUM1RCxXQUFXLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUMzRCxDQUFDO29CQUNOLENBQUM7b0JBRUQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNqQyxJQUFJLFNBQVMsRUFBRSxDQUFDO3dCQUNaLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQzt3QkFDakQsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO3dCQUM3QixLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDYixTQUFTLENBQUMsUUFBUSxFQUFFLEVBQ3BCLFdBQVcsR0FBRyxDQUFDLEtBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUNyQyxXQUFXLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUMzRCxDQUFDO29CQUNOLENBQUM7b0JBRUQsSUFBSSxT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QUFDLE9BQU8sQ0FBc0IsQ0FBQztJQUM3RSxDQUFDO0lBRU8sd0NBQW1CLEdBQTNCO1FBQUEsaUJBU0M7UUFSRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1lBQzlCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBQ3ZDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGdDQUFXLEdBQW5CO1FBQUEsaUJBR0M7UUFGRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQWlCLElBQUssWUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFTyxrQ0FBYSxHQUFyQixVQUFzQixLQUFpQjtRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUM7QUFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0FBRTdCLG1EQUFtRCIsInNvdXJjZXMiOlsid2VicGFjazovL2tha3Vyby8uL3NyYy9tb2RlbC50cyIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvdmlldy50cyIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTW9kZWwge1xyXG4gICAgbWF0cml4OiBudW1iZXJbXVtdO1xyXG4gICAgc3VtVGFibGU6IG51bWJlcltdW11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvLyBncnVuZHPDpHR6bGljaDogdW5zcGllbGJhciwgU3VtbWVuZmVsZCwgc3BpZWxiYXJcclxuICAgICAgICAvLyBJZGVlOiAxMyBiaXQgWmFobCAoYml0IDA6IHNwaWVsYmFyIGphIG9kZXIgbmVpbj8gYml0IDEtMTI6IFN1bW1lbmZlbGQpXHJcbiAgICAgICAgdGhpcy5tYXRyaXggPSB0aGlzLmluaXRCaW5hcnlNYXRyaXgoZWFzeTEpO1xyXG4gICAgICAgIHRoaXMuc3VtVGFibGUgPSB0aGlzLmluaXRTdW1UYWJsZSgpO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1hdHJpeCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdW1UYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEJpbmFyeU1hdHJpeChtYXRyaXg6IG51bWJlcltdW10pOiBudW1iZXJbXVtdIHtcclxuICAgICAgICBsZXQgYmluYXJ5TWF0cml4OiBudW1iZXJbXVtdID0gW107XHJcbiAgICAgICAgbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYmluYXJ5Um93OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBiaW5hcnlSb3cucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVJvdy5wdXNoKHBhcnNlSW50KFwiMVwiLnJlcGVhdCgxMCksIDIpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGFsbCBvdGhlciBjYXNlcywgd2Ugc2VlIHRoZW0gYXMgYSBkZWNpbWFsIG51bWJlci5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSAwdGggYml0IGlzIDAsXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVuIHRoZSBuZXh0IDYgYml0IGluY3JpcHQgdGhlIHR3byBudW1iZXJzIHRvIHRoZSByaWdodCBvZiB0aGUgY29tbWEsXHJcbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIGxhc3QgNiBiaXQgaW5jcmlwdCB0aGUgdHdvIG51bWJlcnMgdG8gdGhlIGxlZnQgb2YgdGhlIGNvbW1hXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sQW5kUm93ID0gdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgIC50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHN1bSkgPT4gcGFyc2VJbnQoc3VtKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3cubGVuZ3RoICE9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXggYXQgeDogXCIgKyB4ICsgXCIgYW5kIHk6IFwiICsgeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93WzBdID4gNDUgfHwgY29sQW5kUm93WzBdID09IDIgfHwgY29sQW5kUm93WzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeDogc3VtIG9mIGNvbCBhdCB4OiBcIiArIHggKyBcIiBhbmQgeTogXCIgKyB5ICsgXCIgaXMgZ2l2ZW4gYXMgXCIgKyBjb2xBbmRSb3dbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvd1sxXSA+IDQ1IHx8IGNvbEFuZFJvd1sxXSA9PSAyIHx8IGNvbEFuZFJvd1sxXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXg6IHN1bSBvZiByb3cgYXQgeDogXCIgKyB4ICsgXCIgYW5kIHk6IFwiICsgeSArIFwiIGlzIGdpdmVuIGFzIFwiICsgY29sQW5kUm93WzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sQW5kUm93QmluYXJ5ID0gY29sQW5kUm93Lm1hcCgoc3VtKSA9PiAoXCIwMDAwMDBcIiArIHN1bS50b1N0cmluZygyKSkuc2xpY2UoLTYpKTtcclxuICAgICAgICAgICAgICAgIGxldCBiaW5hcnkgPSBwYXJzZUludChjb2xBbmRSb3dCaW5hcnlbMF0gKyBjb2xBbmRSb3dCaW5hcnlbMV0sIDIpIDw8IDE7XHJcbiAgICAgICAgICAgICAgICBiaW5hcnlSb3cucHVzaChiaW5hcnkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYmluYXJ5TWF0cml4LnB1c2goYmluYXJ5Um93KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYmluYXJ5TWF0cml4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaSB3YW50IHRvIGRvIGEgZ2VuZXJhbCB0YWJsZSB3aGVyZSBhbGwgdGhlIGNvbWJpbmF0aW9ucyBvZiAyIHVwIHRvIDkgbnVtYmVycyBhcmUgbGlzdGVkIGFuZCB0aGUgc3VtIG9mIHRoZW0gaXMgY2FsY3VsYXRlZFxyXG4gICAgICogdGhlIHJlc3VsdGluZyBzdW0gaXMgdGhlIGluZGV4IG9mIHdoZXJlIHRvIGZpbmQgdGhlc2UgY29tYmluYXRpb25zIGluIHRoZSB0YWJsZVxyXG4gICAgICogYXQgdGhhdCBpbmRleCwgdGhlIGNvbWJpbmF0aW9ucyBhcmUgc3RvcmVkIGFzIGEgOSBiaXQgbnVtYmVyLCB3aGVyZSB0aGUgYml0IGlzIDEgaWYgdGhlIG51bWJlciBpcyBpbiB0aGUgY29tYmluYXRpb25cclxuICAgICAqIHRoZSB0YWJsZSBpcyBhIDQ1IGVsZW1lbnQgYXJyYXlcclxuICAgICAqIGF0IGVhY2ggaW5kZXgsIHRoZSBhbW91bnQgb2YgbnVtYmVycyB0aGF0IG1ha2UgdXAgdGhlIHN1bSBpcyBzdG9yZWQgYXQgdGhlIGluZGV4IG9mIGl0J3MgYW1vdW50XHJcbiAgICAgKiB0aGUgbWF0cml4IGxvb2tzIGFzIGZvbGxvd3M6XHJcbiAgICAgKlxyXG4gICAgICogW1tdLCAgICAgICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgKiAgW10sICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAqICBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMlxyXG4gICAgICogIFtbXSxbXSxbM11dLCAgICAgICAgICAgICAgICAzXHJcbiAgICAgKiAgW1tdLFtdLFs1XV0sICAgICAgICAgICAgICAgIDRcclxuICAgICAqICBbW10sW10sWzYsOV1dLCAgICAgICAgICAgICAgNVxyXG4gICAgICogIFtbXSxbXSxbMTAsMTddLFs3XV1dICAgICAgICA2XHJcbiAgICAgKiAgW1tdLFtdLFszMywxOCwgMTJdLFsxMV1dICAgIDdcclxuICAgICAqIHRoZSBmaXJzdCBpbmRleCBpcyB0aGUgc3VtICgjNDUpLCB0aGUgc2Vjb25kIGluZGV4IGlzIHRoZSBhbW91bnQgb2YgbnVtYmVycyB0aGF0IG1ha2UgdXAgdGhlIHN1bSgjOSksXHJcbiAgICAgKiBlYWNoIG9mIHRoZSBudW1iZXJzIGZyb20gdGhhdCBwb2ludCBhcmUgbWVhbnQgdG8gYmUgcmVhZCBpbiBiaW5hcnksIGhhdmluZyBhIDEgZXZlcnl3aGVyZSB0aGUgbnVtYmVyIGlzIGluIHRoZSBjb21iaW5hdGlvblxyXG4gICAgICovXHJcbiAgICBpbml0U3VtVGFibGUoKTogbnVtYmVyW11bXVtdIHtcclxuICAgICAgICBsZXQgdGFibGU6IG51bWJlcltdW11bXSA9IEFycmF5KDQ2KVxyXG4gICAgICAgICAgICAuZmlsbCgwKVxyXG4gICAgICAgICAgICAubWFwKCgpID0+XHJcbiAgICAgICAgICAgICAgICBBcnJheSgxMClcclxuICAgICAgICAgICAgICAgICAgICAuZmlsbCgwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKCkgPT4gW10pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGJpbmFyeUNvbWJpbmF0aW9uID0gMzsgYmluYXJ5Q29tYmluYXRpb24gPD0gcGFyc2VJbnQoXCIxMTExMTExMTFcIiwgMik7IGJpbmFyeUNvbWJpbmF0aW9uKyspIHtcclxuICAgICAgICAgICAgbGV0IGFtb3VudE9mT25lcyA9IGJpbmFyeUNvbWJpbmF0aW9uLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKS5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBpZiAoYW1vdW50T2ZPbmVzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA5OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChiaW5hcnlDb21iaW5hdGlvbiAmICgyICoqIGopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGogKyAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3VtOiBcIiArIHN1bSArIFwiIGFtb3VudE9mT25lczogXCIgKyBhbW91bnRPZk9uZXMgKyBcIiBiaW5hcnlDb21iaW5hdGlvbjogXCIgKyBiaW5hcnlDb21iaW5hdGlvbi50b1N0cmluZygyKSk7XHJcbiAgICAgICAgICAgIHRhYmxlW3N1bV1bYW1vdW50T2ZPbmVzXS5wdXNoKGJpbmFyeUNvbWJpbmF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBzb2x2ZSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgeVRlc3QgPSAzO1xyXG4gICAgICAgIGxldCB4VGVzdCA9IDg7XHJcblxyXG4gICAgICAgIHRoaXMubWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gb25seSBzb2x2ZSB0aGUgZW1wdHkgdGlsZXNcclxuICAgICAgICAgICAgICAgIGlmICghKHRoaXMubWF0cml4W3ldW3hdICYgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbeV1beF0gJj0gdGhpcy5fY3Jvc3NSZWZlcmVuY2VTdW1UYWJsZUVudHJpZXMoeSwgeCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFt5XVt4XSAmPSB0aGlzLl9zdWRva3VSdWxlcyh5LCB4KTtcclxuICAgICAgICAgICAgICAgIC8vIG5leHQgZnVuY3Rpb246IHN1ZG9rdSBydWxlcywgY2hlY2tzIGluIHJvdyBhbmQgY29sdW0gaWYgdGhlcmUgYXJlIGFscmVhZHkgZml4ZWQgbnVtYmVycyBhbmQgcmVtb3ZlcyB0aGVtIGZyb20gdGhlIHBvc3NpYmxlIGNvbWJpbmF0aW9uc1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBvbmUgYWxyZWFkeSBtaWdodCBuZWVkIHRvIGJlIGEgcmVjdXJzaXZlIGZ1bmN0aW9uIHRvIGdhaW4gb2Ygb2YgZWFjaCB3b24gc3RlcFxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vIHRoZW4gZnVuY3Rpb25zIGNvdWxkIGJlIHRoZSBvbmVzIGluIGNhc2VzIHdoZXJlIHR3byB0aWxlcyBvbmx5IGVhY2ggaGF2ZSB0d28gbnVtYmVycyBsZWZ0IG9yIHRocmVlIHRpbGVzIGVhY2ggaGF2ZSB0aHJlZSBudW1iZXJzIGxlZnQuXHJcbiAgICAgICAgICAgICAgICAvLyB0aG9zZSBjYW4gYWxzbyBiZSBlbGltaW5hdGVkIGZyb20gdGhlIG90aGVycywgc2ltaWxhciB0byBzdWRva3UgcnVsZXNcclxuICAgICAgICAgICAgICAgIC8vIGUuZy4gaWYgdHdvIHRpbGVzIG9ubHkgaGF2ZSAyIGFuZCAzIGxlZnQsIHRoZSBvdGhlciB0aWxlcyBjYW4ndCBoYXZlIDIgYW5kIDMgaW4gdGhlbVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vIGFsc28gbW9yZSBmdW5jdGlvbnMgd2l0aCB0aGUgc3VtdGFibGUsIGUuZy4gaWYgZm9yIGV4YW1wbGUgaW4gYSByb3cgd2l0aCB0aHJlZSBudW1iZXJzLCB0aGVyZSBpcyBhbHJlYWR5IGEgc2FmZSA3IGluIHRoZXJlLCB0aGUgb25seSBjb21iaW5hdGlvbnMgbGVmdCBoYXZlIHRvIGluY2x1ZGUgYSA3XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzIG1pZ2h0IGdldCByaWQgb2Ygc29tZSBjb21iaW5hdGlvbnMgaW4gdGhlIHN1bXRhYmxlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB0aGlzLm1hdHJpeFt5VGVzdF1beFRlc3RdID0gcGFyc2VJbnQoXCIxMTAxMTExMTExXCIsIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jcm9zc1JlZmVyZW5jZVN1bVRhYmxlRW50cmllcyh5OiBudW1iZXIsIHg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGNvbEluZm8gPSB0aGlzLl9nZXRDb2x1bW5JbmZvKHksIHgpO1xyXG4gICAgICAgIGxldCByb3dJbmZvID0gdGhpcy5fZ2V0Um93SW5mbyh5LCB4KTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0NvbWJpbmF0aW9ucyA9IHRoaXMuc3VtVGFibGVbcm93SW5mby5zdW1dW3Jvd0luZm8udGlsZUFtb3VudF0ucmVkdWNlKChhY2MsIGN1cikgPT4ge1xyXG4gICAgICAgICAgICBhY2MgfD0gY3VyO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICBsZXQgY29sQ29tYmluYXRpb25zID0gdGhpcy5zdW1UYWJsZVtjb2xJbmZvLnN1bV1bY29sSW5mby50aWxlQW1vdW50XS5yZWR1Y2UoKGFjYywgY3VyKSA9PiB7XHJcbiAgICAgICAgICAgIGFjYyB8PSBjdXI7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwgMCk7XHJcblxyXG4gICAgICAgIGxldCBwb3NzaWJsZUNvbWJpbmF0aW9ucyA9IHJvd0NvbWJpbmF0aW9ucyAmIGNvbENvbWJpbmF0aW9ucztcclxuICAgICAgICByZXR1cm4gKHBvc3NpYmxlQ29tYmluYXRpb25zIDw8IDEpIHwgMTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogbG9vcHMgdXAgdG8gZmluZCB0aGUgc3VtIG9mIHRoZSBjb2x1bW5cclxuICAgICAqIGxvb3BzIGRvd24gZnJvbSB0aGVyZSB0byBmaW5kIHRoZSBlbXB0eSB0aWxlcyBiZWxvdyB0aGF0IHN1bVxyXG4gICAgICogQHJldHVybnMgYXJyYXkgd2l0aCB0aGUgc3VtIHRvIHRoZSByaWdodCBhbmQgdGhlIGFtb3VudCBvZiBlbXB0eSB0aWxlcyBpbiB0aGUgY29sdW1uXHJcbiAgICAgKi9cclxuICAgIF9nZXRDb2x1bW5JbmZvKHk6IG51bWJlciwgeDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICB3aGlsZSAoeSA+PSAwICYmIHRoaXMubWF0cml4W3ldW3hdICYgMSkge1xyXG4gICAgICAgICAgICB5LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbXB0eVRpbGVzSW5Db2x1bW4gPSAxO1xyXG4gICAgICAgIHdoaWxlICh5ICsgZW1wdHlUaWxlc0luQ29sdW1uIDwgOSAmJiB0aGlzLm1hdHJpeFt5ICsgZW1wdHlUaWxlc0luQ29sdW1uICsgMV1beF0gJiAxKSB7XHJcbiAgICAgICAgICAgIGVtcHR5VGlsZXNJbkNvbHVtbisrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBzdW06ICh0aGlzLm1hdHJpeFt5XVt4XSA+PiA3KSAmIDYzLCB0aWxlQW1vdW50OiBlbXB0eVRpbGVzSW5Db2x1bW4gfTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Um93SW5mbyh5OiBudW1iZXIsIHg6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgd2hpbGUgKHggPj0gMCAmJiB0aGlzLm1hdHJpeFt5XVt4XSAmIDEpIHtcclxuICAgICAgICAgICAgeC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZW1wdHlUaWxlc0luUm93ID0gMTtcclxuICAgICAgICB3aGlsZSAoeCArIGVtcHR5VGlsZXNJblJvdyA8IDkgJiYgdGhpcy5tYXRyaXhbeV1beCArIGVtcHR5VGlsZXNJblJvdyArIDFdICYgMSkge1xyXG4gICAgICAgICAgICBlbXB0eVRpbGVzSW5Sb3crKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgc3VtOiAodGhpcy5tYXRyaXhbeV1beF0gPj4gMSkgJiA2MywgdGlsZUFtb3VudDogZW1wdHlUaWxlc0luUm93IH07XHJcbiAgICAgICAgLy8gcmV0dXJuIFsodGhpcy5tYXRyaXhbeV1beF0gPj4gMSkgJiA2MywgZW1wdHlUaWxlc0luUm93XTtcclxuICAgIH1cclxuXHJcbiAgICBfc3Vkb2t1UnVsZXMoeTogbnVtYmVyLCB4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMDIzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuXHJcbmNvbnN0IGVhc3kxOiBudW1iZXJbXVtdID0gW1xyXG4gICAgWzAsIDAsIDQ1LCAzLCAwLCAwLCAwLCAzLCA0NSwgMF0sXHJcbiAgICBbMCwgMTcuMDgsIDEsIDEsIDAsIDE2LCA0LjAzLCAxLCAxLCAwXSxcclxuICAgIFswLjExLCAxLCAxLCAxLCAxNi4xNywgMSwgMSwgMSwgMSwgMTddLFxyXG4gICAgWzAuMTcsIDEsIDEsIDMuMTcsIDEsIDEsIDEsIDAuMTYsIDEsIDFdLFxyXG4gICAgWzAsIDAuMTgsIDEsIDEsIDEsIDAsIDAsIDE3LjEzLCAxLCAxXSxcclxuICAgIFswLCAxNy4wNCwgMSwgMSwgMCwgMCwgMy4xMSwgMSwgMSwgMF0sXHJcbiAgICBbMC4wOSwgMSwgMSwgMCwgMTYsIDMuMTYsIDEsIDEsIDEsIDRdLFxyXG4gICAgWzAuMTQsIDEsIDEsIDMuMSwgMSwgMSwgMSwgMTYuMTIsIDEsIDFdLFxyXG4gICAgWzAsIDAuMTksIDEsIDEsIDEsIDEsIDAuMTgsIDEsIDEsIDFdLFxyXG4gICAgWzAsIDAuMDUsIDEsIDEsIDAsIDAsIDAuMSwgMSwgMSwgMF0sXHJcbl07XHJcblxyXG5jb25zdCBtZWRpdW0yOiBudW1iZXJbXVtdID0gW1xyXG4gICAgWzAsIDAsIDI5LCA0LCAwLCA3LCAzNCwgMTYsIDAsIDBdLFxyXG4gICAgWzAsIDAuMDgsIDEsIDEsIDMuMTcsIDEsIDEsIDEsIDAsIDBdLFxyXG4gICAgWzAsIDMuMzEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDBdLFxyXG4gICAgWzAuMSwgMSwgMSwgMjQuMSwgMSwgMSwgMSwgMjQsIDAsIDBdLFxyXG4gICAgWzAuMTYsIDEsIDEsIDEsIDE1LCAwLjEzLCAxLCAxLCAwLCAwXSxcclxuICAgIFswLCAwLCAwLjEzLCAxLCAxLCAwLjE2LCAxLCAxLCAxMCwgMTZdLFxyXG4gICAgWzAsIDAsIDAuMSwgMSwgMSwgMjQsIDMuMTYsIDEsIDEsIDFdLFxyXG4gICAgWzAsIDAsIDAsIDE3LjE0LCAxLCAxLCAxLCAxNy4xMSwgMSwgMV0sXHJcbiAgICBbMCwgMCwgMC4zLCAxLCAxLCAxLCAxLCAxLCAxLCAwXSxcclxuICAgIFswLCAwLCAwLjE4LCAxLCAxLCAxLCAwLjEzLCAxLCAxLCAwXSxcclxuXTtcclxuIiwiY2xhc3MgVmlldyB7XHJcbiAgICBib2FyZDogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICB0aWxlU2l6ZTogbnVtYmVyO1xyXG4gICAgdGlsZVBhZGRpbmc6IG51bWJlcjtcclxuICAgIHByaXZhdGUgYm9hcmRTaWRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvcmRlclJhZGl1czogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIGJvYXJkQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1jb250YWluZXJcIikgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ib3JkZXJSYWRpdXMgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3Qm9hcmQobWF0cml4OiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQ2FudmFzKG1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy5fZHJhd0JhY2tncm91bmQoKTtcclxuXHJcbiAgICAgICAgbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVDb3JuZXJYID0geCAqIHRoaXMudGlsZVNpemU7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUNvcm5lclkgPSB5ICogdGhpcy50aWxlU2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgdW5wbGF5YWJsZSB0aWxlcyB3aXRoIHN1bXNcclxuICAgICAgICAgICAgICAgIGlmICghKHRpbGUgJiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdW1Ub1JpZ2h0ID0gKHRpbGUgPj4gMSkgJiA2MztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VtVG9SaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bVRvUmlnaHQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIgLSB0aGlzLnRpbGVQYWRkaW5nIC8gMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIgLSB0aGlzLnRpbGVQYWRkaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3VtVG9Eb3duID0gKHRpbGUgPj4gNykgJiA2MztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VtVG9Eb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtVG9Eb3duLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMyAtIHRoaXMudGlsZVBhZGRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW1Ub0Rvd24gJiYgc3VtVG9SaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKG5vZGVDb3JuZXJYLCBub2RlQ29ybmVyWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhub2RlQ29ybmVyWCArIHRoaXMudGlsZVNpemUsIG5vZGVDb3JuZXJZICsgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMudGlsZVNpemUgLyAyNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGVtcHR5LCBwbGF5YWJsZSB0aWxlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImxpZ2h0Z3JheVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgucmVjdChub2RlQ29ybmVyWCwgbm9kZUNvcm5lclksIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGFscmVhZHkgc2FmZSBudW1iZXJzIGluIHRoZSB0aWxlcyAoZS5nLiBpZiB0aGUgdGlsZSBoYXMgMDAxMDAwMDAwMSB3cml0dGVuLCA3IGlzIHRoZSBvbmx5IG51bWJlciBsZWZ0IHRvIGJlIHBsYWNlZCBpbiB0aGUgdGlsZSlcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKS5sZW5ndGggPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzYWZlTnVtYmVyID0gdGlsZS50b1N0cmluZygyKS5zcGxpdChcIjFcIilbMV0ubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVOdW1iZXIudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMCArIHRoaXMudGlsZVBhZGRpbmcgKiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAzIC0gdGhpcy50aWxlUGFkZGluZyAqIDJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgbm90ZWQgbnVtYmVycyBpbiB0aGUgdGlsZXNcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHRpbGUgJiAoMiAqKiBpKSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImdyZXlcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAoKGkgLSAxKSAlIDMpICsgdGhpcy50aWxlUGFkZGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogTWF0aC5mbG9vcigoaSArIDIpIC8gMykgLSB0aGlzLnRpbGVQYWRkaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ3JleVwiO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jdHguZmlsbFRleHQoXCIxXCIsIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDAsIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdGhlcmUgbmVlZHMgdG8gYmUgYSBsaXR0bGUgYWRqdXN0bWVudHMgYmVjYXVzZSBvZiB0aGUgd2F5IHRoZSBjYW52YXMgZHJhd3MgdGhlIG51bWJlcnMgYnV0IHRoYXQgaXMgcHVyZWx5IGNvc21ldGljXHJcbiAgICAgICAgdGhpcy5fZHJhd0dyaWRsaW5lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NyZWF0ZUNhbnZhcyhtYXRyaXg6IG51bWJlcltdW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLmJvYXJkLmlkID0gXCJib2FyZFwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUuYm94U2hhZG93ID0gXCI1cHggNXB4IDIwcHggZ3JheVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUuYm9yZGVyUmFkaXVzID0gdGhpcy5ib3JkZXJSYWRpdXMgKyBcIiVcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLm1hcmdpbiA9IFwiMSVcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLndpZHRoID0gdGhpcy5ib2FyZENvbnRhaW5lci5jbGllbnRXaWR0aCAqIDAuOTg7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5oZWlnaHQgPSB0aGlzLmJvYXJkQ29udGFpbmVyLmNsaWVudEhlaWdodCAqIDAuOTg7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5ib2FyZCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5ib2FyZC5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5ib2FyZFNpZGVMZW5ndGggPSB0aGlzLmJvYXJkLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIHRoaXMudGlsZVNpemUgPSB0aGlzLmJvYXJkU2lkZUxlbmd0aCAvIG1hdHJpeC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy50aWxlUGFkZGluZyA9IHRoaXMudGlsZVNpemUgLyAxNTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kcmF3QmFja2dyb3VuZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgdGhpcy5jdHgucm91bmRSZWN0KDAsIDAsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGgsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGgsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGggKiAodGhpcy5ib3JkZXJSYWRpdXMgLyAxMDApKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZHJhd0dyaWRsaW5lcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8PSB0aGlzLmJvYXJkU2lkZUxlbmd0aDsgbCArPSB0aGlzLnRpbGVTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhsLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKGwsIHRoaXMuYm9hcmRTaWRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIGwpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy5ib2FyZFNpZGVMZW5ndGgsIGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLnRpbGVTaXplIC8gMjU7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IE1vZGVsIGZyb20gXCIuL21vZGVsXCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXdcIjtcclxuXHJcbi8qKiBoYW5kbGVzIGFsbCBpbnB1dCwgY2hlY2tzIGluIHdpdGggbW9kZWwgYW5kIGRpc3BsYXlzIHRoZSByZXN1bHQgd2l0aCB2aWV3ICovXHJcblxyXG5jbGFzcyBDb250cm9sbGVyIHtcclxuICAgIG1vZGVsOiBNb2RlbDtcclxuICAgIHZpZXc6IFZpZXc7XHJcblxyXG4gICAgLy8gYnV0dG9uc1xyXG4gICAgc29sdmVCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWwoKTtcclxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLl9nZXREb21FbGVtZW50cygpO1xyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0RG9tRWxlbWVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2x2ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic29sdmVcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvbHZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc29sdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZVZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52aWV3LmRyYXdCb2FyZCh0aGlzLm1vZGVsLm1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy52aWV3LmJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHRoaXMuX2JvYXJkQ2xpY2tlZChldmVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JvYXJkQ2xpY2tlZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm9hcmQgY2xpY2tlZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYXBwID0gbmV3IENvbnRyb2xsZXIoKTtcclxuXHJcbi8vIFwibnBtIHJ1biBzdGFydFwiIGluIHRlcm1pbmFsIHRvIHN0YXJ0IGxpdmUgc2VydmVyXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
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
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ "./src/tile.ts");

var Model = /** @class */ (function () {
    function Model() {
        this.matrix = this.initBinaryMatrix(easy1);
        this.sumTable = this.initSumTable();
        console.log(this._getRowInfo(4, 3));
    }
    Model.prototype.initBinaryMatrix = function (matrix) {
        var newMatrix = [];
        matrix.forEach(function (row, y) {
            var rowArray = [];
            row.forEach(function (tile, x) {
                if (tile === 0) {
                    rowArray.push(new _tile__WEBPACK_IMPORTED_MODULE_0__.UnplayableTile(0, 0));
                    return;
                }
                if (tile === 1) {
                    rowArray.push(new _tile__WEBPACK_IMPORTED_MODULE_0__.PlayableTile(parseInt("1".repeat(9), 2)));
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
                rowArray.push(new _tile__WEBPACK_IMPORTED_MODULE_0__.UnplayableTile(colAndRow[0], colAndRow[1]));
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
                if (_this.matrix[y][x] instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.UnplayableTile) {
                    return;
                }
                // console.log(this._permutationsFromSumTable(y, x));
                _this.matrix[y][x].possibleNumbers &= _this._permutationsFromSumTable(y, x);
                _this.matrix[y][x].possibleNumbers &= _this._sudokuRules(y, x);
                /**
                 * next function: sudoku rules, checks in row and colum if there are already fixed numbers and removes them from the possible combinations
                 * this one already might need to be a recursive function to gain of of each won step
                 *
                 * then functions could be the ones in cases where two tiles only each have two numbers left or three tiles each have three numbers left.
                 * those can also be eliminated from the others, similar to sudoku rules
                 * e.g. if two tiles only have 2 and 3 left, the other tiles can't have 2 and 3 in them
                 *
                 * also more functions with the sumtable, e.g. if for example in a row with three numbers, there is already a safe 7 in there, the only combinations left have to include a 7
                 * this might get rid of some combinations in the sumtable
                 */
            });
        });
        console.log(this.matrix);
    };
    Model.prototype._permutationsFromSumTable = function (y, x) {
        var colInfo = this._getColumnInfo(y, x);
        var rowInfo = this._getRowInfo(y, x);
        var colCombinations = this.sumTable[colInfo.sum][colInfo.emptyTileCoords.length].reduce(function (acc, cur) {
            acc |= cur;
            return acc;
        }, 0);
        var rowCombinations = this.sumTable[rowInfo.sum][rowInfo.emptyTileCoords.length].reduce(function (acc, cur) {
            acc |= cur;
            return acc;
        }, 0);
        var possibleCombinations = rowCombinations & colCombinations;
        return possibleCombinations;
    };
    /**
     * loops up to find the sum of the column
     * loops down from there to find the empty tiles below that sum
     * @returns array with the sum to the right and the amount of empty tiles in the column
     */
    Model.prototype._getColumnInfo = function (y, x) {
        while (y >= 0 && this.matrix[y][x] instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.PlayableTile) {
            y--;
        }
        var emptyTilesInfo = [];
        while (y + emptyTilesInfo.length < 9 && this.matrix[y + emptyTilesInfo.length + 1][x] instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.PlayableTile) {
            emptyTilesInfo.push([y + emptyTilesInfo.length + 1, x]);
        }
        return { sum: this.matrix[y][x].colSum, emptyTileCoords: emptyTilesInfo };
    };
    Model.prototype._getRowInfo = function (y, x) {
        while (x >= 0 && this.matrix[y][x] instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.PlayableTile) {
            x--;
        }
        var emptyTilesInfo = [];
        while (x + emptyTilesInfo.length < 9 && this.matrix[y][x + emptyTilesInfo.length + 1] instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.PlayableTile) {
            emptyTilesInfo.push([y, x + emptyTilesInfo.length + 1]);
        }
        return { sum: this.matrix[y][x].rowSum, emptyTileCoords: emptyTilesInfo };
    };
    /**
     * loops up to find the sum of the column
     * loops down from there to find the empty tiles below that sum
     * @returns array with the sum to the right and the amount of empty tiles in the column
     */
    Model.prototype._sudokuRules = function (y, x) {
        return 511;
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

/***/ "./src/tile.ts":
/*!*********************!*\
  !*** ./src/tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlayableTile: () => (/* binding */ PlayableTile),
/* harmony export */   Tile: () => (/* binding */ Tile),
/* harmony export */   UnplayableTile: () => (/* binding */ UnplayableTile)
/* harmony export */ });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tile = /** @class */ (function () {
    function Tile() {
        // Common properties and methods for all tiles
    }
    return Tile;
}());

var PlayableTile = /** @class */ (function (_super) {
    __extends(PlayableTile, _super);
    function PlayableTile(possibleNumbers) {
        var _this = _super.call(this) || this;
        _this.possibleNumbers = possibleNumbers;
        return _this;
    }
    // 001000000 -> 7
    // 110110100 -> 0
    PlayableTile.prototype.onlyPossibleNumber = function () {
        if (this.possibleNumbers.toString(2).split("1").length > 2) {
            return 0;
        }
        return this.possibleNumbers.toString(2).split("1")[1].length + 1;
    };
    return PlayableTile;
}(Tile));

var UnplayableTile = /** @class */ (function (_super) {
    __extends(UnplayableTile, _super);
    function UnplayableTile(colSum, rowSum) {
        var _this = _super.call(this) || this;
        _this.colSum = colSum;
        _this.rowSum = rowSum;
        return _this;
    }
    UnplayableTile.prototype.isEmpty = function () {
        return this.colSum === 0 && this.rowSum === 0;
    };
    return UnplayableTile;
}(Tile));



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
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ "./src/tile.ts");

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
                if (tile instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.UnplayableTile) {
                    var sumToRight = tile.rowSum;
                    if (sumToRight) {
                        _this.ctx.font = _this.tileSize / 3.5 + "px Arial";
                        _this.ctx.fillStyle = "white";
                        _this.ctx.fillText(sumToRight.toString(), nodeCornerX + (_this.tileSize / 3) * 2 - _this.tilePadding / 2, nodeCornerY + (_this.tileSize / 3) * 2 - _this.tilePadding);
                    }
                    var sumToDown = tile.colSum;
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
                var onlyPossibleNumber = tile.onlyPossibleNumber();
                if (onlyPossibleNumber) {
                    _this.ctx.font = _this.tileSize + "px Arial";
                    _this.ctx.fillStyle = "black";
                    _this.ctx.fillText(onlyPossibleNumber.toString(), nodeCornerX + (_this.tileSize / 3) * 0 + _this.tilePadding * 3, nodeCornerY + (_this.tileSize / 3) * 3 - _this.tilePadding * 2);
                    return;
                }
                // the noted numbers in the tiles
                for (var i = 0; i < 9; i++) {
                    if (!(tile.possibleNumbers & (Math.pow(2, i))))
                        continue;
                    _this.ctx.font = _this.tileSize / 3.5 + "px Arial";
                    _this.ctx.fillStyle = "grey";
                    _this.ctx.fillText((i + 1).toString(), nodeCornerX + (_this.tileSize / 3) * (i % 3) + _this.tilePadding, nodeCornerY + (_this.tileSize / 3) * Math.floor((i + 3) / 3) - _this.tilePadding);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7SUFDaEMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDdEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDdEMsQ0FBQztBQUVGLElBQU0sT0FBTyxHQUFlO0lBQ3hCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVB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dkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sZ0NBQVcsR0FBbkI7UUFBQSxpQkFHQztRQUZHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBaUIsSUFBSyxZQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVPLGtDQUFhLEdBQXJCLFVBQXNCLEtBQWlCO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQztBQUVELElBQU0sR0FBRyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFFN0IsbURBQW1EIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL21vZGVsLnRzIiwid2VicGFjazovL2tha3Vyby8uL3NyYy90aWxlLnRzIiwid2VicGFjazovL2tha3Vyby8uL3NyYy92aWV3LnRzIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tha3Vyby8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaWxlLCBQbGF5YWJsZVRpbGUsIFVucGxheWFibGVUaWxlIH0gZnJvbSBcIi4vdGlsZVwiO1xyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gICAgbWF0cml4OiBhbnlbXVtdO1xyXG4gICAgc3VtVGFibGU6IG51bWJlcltdW11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1hdHJpeCA9IHRoaXMuaW5pdEJpbmFyeU1hdHJpeChlYXN5MSk7XHJcbiAgICAgICAgdGhpcy5zdW1UYWJsZSA9IHRoaXMuaW5pdFN1bVRhYmxlKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2dldFJvd0luZm8oNCwgMykpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRCaW5hcnlNYXRyaXgobWF0cml4OiBudW1iZXJbXVtdKTogVGlsZVtdW10ge1xyXG4gICAgICAgIGxldCBuZXdNYXRyaXg6IGFueVtdW10gPSBbXTtcclxuICAgICAgICBtYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByb3dBcnJheTogVGlsZVtdID0gW107XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd0FycmF5LnB1c2gobmV3IFVucGxheWFibGVUaWxlKDAsIDApKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd0FycmF5LnB1c2gobmV3IFBsYXlhYmxlVGlsZShwYXJzZUludChcIjFcIi5yZXBlYXQoOSksIDIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZvciBhbGwgb3RoZXIgY2FzZXMsIHdlIHNlZSB0aGVtIGFzIGEgZGVjaW1hbCBudW1iZXIuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgMHRoIGJpdCBpcyAwLFxyXG4gICAgICAgICAgICAgICAgLy8gdGhlbiB0aGUgbmV4dCA2IGJpdCBpbmNyaXB0IHRoZSB0d28gbnVtYmVycyB0byB0aGUgcmlnaHQgb2YgdGhlIGNvbW1hLFxyXG4gICAgICAgICAgICAgICAgLy8gYW5kIHRoZSBsYXN0IDYgYml0IGluY3JpcHQgdGhlIHR3byBudW1iZXJzIHRvIHRoZSBsZWZ0IG9mIHRoZSBjb21tYVxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbEFuZFJvdyA9IHRpbGVcclxuICAgICAgICAgICAgICAgICAgICAudG9GaXhlZCgyKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdChcIi5cIilcclxuICAgICAgICAgICAgICAgICAgICAubWFwKChzdW0pID0+IHBhcnNlSW50KHN1bSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93Lmxlbmd0aCAhPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgaW5wdXQgbWF0cml4IGF0IHg6IFwiICsgeCArIFwiIGFuZCB5OiBcIiArIHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvd1swXSA+IDQ1IHx8IGNvbEFuZFJvd1swXSA9PSAyIHx8IGNvbEFuZFJvd1swXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXg6IHN1bSBvZiBjb2wgYXQgeDogXCIgKyB4ICsgXCIgYW5kIHk6IFwiICsgeSArIFwiIGlzIGdpdmVuIGFzIFwiICsgY29sQW5kUm93WzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3dbMV0gPiA0NSB8fCBjb2xBbmRSb3dbMV0gPT0gMiB8fCBjb2xBbmRSb3dbMV0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgaW5wdXQgbWF0cml4OiBzdW0gb2Ygcm93IGF0IHg6IFwiICsgeCArIFwiIGFuZCB5OiBcIiArIHkgKyBcIiBpcyBnaXZlbiBhcyBcIiArIGNvbEFuZFJvd1sxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcm93QXJyYXkucHVzaChuZXcgVW5wbGF5YWJsZVRpbGUoY29sQW5kUm93WzBdLCBjb2xBbmRSb3dbMV0pKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG5ld01hdHJpeC5wdXNoKHJvd0FycmF5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbmV3TWF0cml4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaSB3YW50IHRvIGRvIGEgZ2VuZXJhbCB0YWJsZSB3aGVyZSBhbGwgdGhlIGNvbWJpbmF0aW9ucyBvZiAyIHVwIHRvIDkgbnVtYmVycyBhcmUgbGlzdGVkIGFuZCB0aGUgc3VtIG9mIHRoZW0gaXMgY2FsY3VsYXRlZFxyXG4gICAgICogdGhlIHJlc3VsdGluZyBzdW0gaXMgdGhlIGluZGV4IG9mIHdoZXJlIHRvIGZpbmQgdGhlc2UgY29tYmluYXRpb25zIGluIHRoZSB0YWJsZVxyXG4gICAgICogYXQgdGhhdCBpbmRleCwgdGhlIGNvbWJpbmF0aW9ucyBhcmUgc3RvcmVkIGFzIGEgOSBiaXQgbnVtYmVyLCB3aGVyZSB0aGUgYml0IGlzIDEgaWYgdGhlIG51bWJlciBpcyBpbiB0aGUgY29tYmluYXRpb25cclxuICAgICAqIHRoZSB0YWJsZSBpcyBhIDQ1IGVsZW1lbnQgYXJyYXlcclxuICAgICAqIGF0IGVhY2ggaW5kZXgsIHRoZSBhbW91bnQgb2YgbnVtYmVycyB0aGF0IG1ha2UgdXAgdGhlIHN1bSBpcyBzdG9yZWQgYXQgdGhlIGluZGV4IG9mIGl0J3MgYW1vdW50XHJcbiAgICAgKiB0aGUgbWF0cml4IGxvb2tzIGFzIGZvbGxvd3M6XHJcbiAgICAgKlxyXG4gICAgICogW1tdLCAgICAgICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgKiAgW10sICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAqICBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMlxyXG4gICAgICogIFtbXSxbXSxbM11dLCAgICAgICAgICAgICAgICAzXHJcbiAgICAgKiAgW1tdLFtdLFs1XV0sICAgICAgICAgICAgICAgIDRcclxuICAgICAqICBbW10sW10sWzYsOV1dLCAgICAgICAgICAgICAgNVxyXG4gICAgICogIFtbXSxbXSxbMTAsMTddLFs3XV1dICAgICAgICA2XHJcbiAgICAgKiAgW1tdLFtdLFszMywxOCwgMTJdLFsxMV1dICAgIDdcclxuICAgICAqIHRoZSBmaXJzdCBpbmRleCBpcyB0aGUgc3VtICgjNDUpLCB0aGUgc2Vjb25kIGluZGV4IGlzIHRoZSBhbW91bnQgb2YgbnVtYmVycyB0aGF0IG1ha2UgdXAgdGhlIHN1bSgjOSksXHJcbiAgICAgKiBlYWNoIG9mIHRoZSBudW1iZXJzIGZyb20gdGhhdCBwb2ludCBhcmUgbWVhbnQgdG8gYmUgcmVhZCBpbiBiaW5hcnksIGhhdmluZyBhIDEgZXZlcnl3aGVyZSB0aGUgbnVtYmVyIGlzIGluIHRoZSBjb21iaW5hdGlvblxyXG4gICAgICovXHJcbiAgICBpbml0U3VtVGFibGUoKTogbnVtYmVyW11bXVtdIHtcclxuICAgICAgICAvLyBjcmVhdGUgYSA0NXg5eD8gZW1wdHkgYXJyYXlcclxuICAgICAgICBsZXQgdGFibGU6IG51bWJlcltdW11bXSA9IEFycmF5KDQ2KVxyXG4gICAgICAgICAgICAuZmlsbCgwKVxyXG4gICAgICAgICAgICAubWFwKCgpID0+XHJcbiAgICAgICAgICAgICAgICBBcnJheSgxMClcclxuICAgICAgICAgICAgICAgICAgICAuZmlsbCgwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKCkgPT4gW10pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGJpbmFyeUNvbWJpbmF0aW9uID0gMzsgYmluYXJ5Q29tYmluYXRpb24gPD0gcGFyc2VJbnQoXCIxMTExMTExMTFcIiwgMik7IGJpbmFyeUNvbWJpbmF0aW9uKyspIHtcclxuICAgICAgICAgICAgbGV0IGFtb3VudE9mT25lcyA9IGJpbmFyeUNvbWJpbmF0aW9uLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKS5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBpZiAoYW1vdW50T2ZPbmVzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA5OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChiaW5hcnlDb21iaW5hdGlvbiAmICgyICoqIGopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGogKyAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3VtOiBcIiArIHN1bSArIFwiIGFtb3VudE9mT25lczogXCIgKyBhbW91bnRPZk9uZXMgKyBcIiBiaW5hcnlDb21iaW5hdGlvbjogXCIgKyBiaW5hcnlDb21iaW5hdGlvbi50b1N0cmluZygyKSk7XHJcbiAgICAgICAgICAgIHRhYmxlW3N1bV1bYW1vdW50T2ZPbmVzXS5wdXNoKGJpbmFyeUNvbWJpbmF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBzb2x2ZSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgeVRlc3QgPSAzO1xyXG4gICAgICAgIGxldCB4VGVzdCA9IDg7XHJcblxyXG4gICAgICAgIHRoaXMubWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gb25seSBzb2x2ZSB0aGUgZW1wdHkgdGlsZXNcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFt5XVt4XSBpbnN0YW5jZW9mIFVucGxheWFibGVUaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuX3Blcm11dGF0aW9uc0Zyb21TdW1UYWJsZSh5LCB4KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFt5XVt4XS5wb3NzaWJsZU51bWJlcnMgJj0gdGhpcy5fcGVybXV0YXRpb25zRnJvbVN1bVRhYmxlKHksIHgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbeV1beF0ucG9zc2libGVOdW1iZXJzICY9IHRoaXMuX3N1ZG9rdVJ1bGVzKHksIHgpO1xyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBuZXh0IGZ1bmN0aW9uOiBzdWRva3UgcnVsZXMsIGNoZWNrcyBpbiByb3cgYW5kIGNvbHVtIGlmIHRoZXJlIGFyZSBhbHJlYWR5IGZpeGVkIG51bWJlcnMgYW5kIHJlbW92ZXMgdGhlbSBmcm9tIHRoZSBwb3NzaWJsZSBjb21iaW5hdGlvbnNcclxuICAgICAgICAgICAgICAgICAqIHRoaXMgb25lIGFscmVhZHkgbWlnaHQgbmVlZCB0byBiZSBhIHJlY3Vyc2l2ZSBmdW5jdGlvbiB0byBnYWluIG9mIG9mIGVhY2ggd29uIHN0ZXBcclxuICAgICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAgICAgKiB0aGVuIGZ1bmN0aW9ucyBjb3VsZCBiZSB0aGUgb25lcyBpbiBjYXNlcyB3aGVyZSB0d28gdGlsZXMgb25seSBlYWNoIGhhdmUgdHdvIG51bWJlcnMgbGVmdCBvciB0aHJlZSB0aWxlcyBlYWNoIGhhdmUgdGhyZWUgbnVtYmVycyBsZWZ0LlxyXG4gICAgICAgICAgICAgICAgICogdGhvc2UgY2FuIGFsc28gYmUgZWxpbWluYXRlZCBmcm9tIHRoZSBvdGhlcnMsIHNpbWlsYXIgdG8gc3Vkb2t1IHJ1bGVzXHJcbiAgICAgICAgICAgICAgICAgKiBlLmcuIGlmIHR3byB0aWxlcyBvbmx5IGhhdmUgMiBhbmQgMyBsZWZ0LCB0aGUgb3RoZXIgdGlsZXMgY2FuJ3QgaGF2ZSAyIGFuZCAzIGluIHRoZW1cclxuICAgICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAgICAgKiBhbHNvIG1vcmUgZnVuY3Rpb25zIHdpdGggdGhlIHN1bXRhYmxlLCBlLmcuIGlmIGZvciBleGFtcGxlIGluIGEgcm93IHdpdGggdGhyZWUgbnVtYmVycywgdGhlcmUgaXMgYWxyZWFkeSBhIHNhZmUgNyBpbiB0aGVyZSwgdGhlIG9ubHkgY29tYmluYXRpb25zIGxlZnQgaGF2ZSB0byBpbmNsdWRlIGEgN1xyXG4gICAgICAgICAgICAgICAgICogdGhpcyBtaWdodCBnZXQgcmlkIG9mIHNvbWUgY29tYmluYXRpb25zIGluIHRoZSBzdW10YWJsZVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubWF0cml4KTtcclxuICAgIH1cclxuXHJcbiAgICBfcGVybXV0YXRpb25zRnJvbVN1bVRhYmxlKHk6IG51bWJlciwgeDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgY29sSW5mbyA9IHRoaXMuX2dldENvbHVtbkluZm8oeSwgeCk7XHJcbiAgICAgICAgbGV0IHJvd0luZm8gPSB0aGlzLl9nZXRSb3dJbmZvKHksIHgpO1xyXG5cclxuICAgICAgICBsZXQgY29sQ29tYmluYXRpb25zID0gdGhpcy5zdW1UYWJsZVtjb2xJbmZvLnN1bV1bY29sSW5mby5lbXB0eVRpbGVDb29yZHMubGVuZ3RoXS5yZWR1Y2UoKGFjYywgY3VyKSA9PiB7XHJcbiAgICAgICAgICAgIGFjYyB8PSBjdXI7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwgMCk7XHJcblxyXG4gICAgICAgIGxldCByb3dDb21iaW5hdGlvbnMgPSB0aGlzLnN1bVRhYmxlW3Jvd0luZm8uc3VtXVtyb3dJbmZvLmVtcHR5VGlsZUNvb3Jkcy5sZW5ndGhdLnJlZHVjZSgoYWNjLCBjdXIpID0+IHtcclxuICAgICAgICAgICAgYWNjIHw9IGN1cjtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCAwKTtcclxuXHJcbiAgICAgICAgbGV0IHBvc3NpYmxlQ29tYmluYXRpb25zID0gcm93Q29tYmluYXRpb25zICYgY29sQ29tYmluYXRpb25zO1xyXG4gICAgICAgIHJldHVybiBwb3NzaWJsZUNvbWJpbmF0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGxvb3BzIHVwIHRvIGZpbmQgdGhlIHN1bSBvZiB0aGUgY29sdW1uXHJcbiAgICAgKiBsb29wcyBkb3duIGZyb20gdGhlcmUgdG8gZmluZCB0aGUgZW1wdHkgdGlsZXMgYmVsb3cgdGhhdCBzdW1cclxuICAgICAqIEByZXR1cm5zIGFycmF5IHdpdGggdGhlIHN1bSB0byB0aGUgcmlnaHQgYW5kIHRoZSBhbW91bnQgb2YgZW1wdHkgdGlsZXMgaW4gdGhlIGNvbHVtblxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29sdW1uSW5mbyh5OiBudW1iZXIsIHg6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgd2hpbGUgKHkgPj0gMCAmJiB0aGlzLm1hdHJpeFt5XVt4XSBpbnN0YW5jZW9mIFBsYXlhYmxlVGlsZSkge1xyXG4gICAgICAgICAgICB5LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbXB0eVRpbGVzSW5mbyA9IFtdO1xyXG4gICAgICAgIHdoaWxlICh5ICsgZW1wdHlUaWxlc0luZm8ubGVuZ3RoIDwgOSAmJiB0aGlzLm1hdHJpeFt5ICsgZW1wdHlUaWxlc0luZm8ubGVuZ3RoICsgMV1beF0gaW5zdGFuY2VvZiBQbGF5YWJsZVRpbGUpIHtcclxuICAgICAgICAgICAgZW1wdHlUaWxlc0luZm8ucHVzaChbeSArIGVtcHR5VGlsZXNJbmZvLmxlbmd0aCArIDEsIHhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IHN1bTogdGhpcy5tYXRyaXhbeV1beF0uY29sU3VtLCBlbXB0eVRpbGVDb29yZHM6IGVtcHR5VGlsZXNJbmZvIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFJvd0luZm8oeTogbnVtYmVyLCB4OiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIHdoaWxlICh4ID49IDAgJiYgdGhpcy5tYXRyaXhbeV1beF0gaW5zdGFuY2VvZiBQbGF5YWJsZVRpbGUpIHtcclxuICAgICAgICAgICAgeC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZW1wdHlUaWxlc0luZm8gPSBbXTtcclxuICAgICAgICB3aGlsZSAoeCArIGVtcHR5VGlsZXNJbmZvLmxlbmd0aCA8IDkgJiYgdGhpcy5tYXRyaXhbeV1beCArIGVtcHR5VGlsZXNJbmZvLmxlbmd0aCArIDFdIGluc3RhbmNlb2YgUGxheWFibGVUaWxlKSB7XHJcbiAgICAgICAgICAgIGVtcHR5VGlsZXNJbmZvLnB1c2goW3ksIHggKyBlbXB0eVRpbGVzSW5mby5sZW5ndGggKyAxXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBzdW06IHRoaXMubWF0cml4W3ldW3hdLnJvd1N1bSwgZW1wdHlUaWxlQ29vcmRzOiBlbXB0eVRpbGVzSW5mbyB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbG9vcHMgdXAgdG8gZmluZCB0aGUgc3VtIG9mIHRoZSBjb2x1bW5cclxuICAgICAqIGxvb3BzIGRvd24gZnJvbSB0aGVyZSB0byBmaW5kIHRoZSBlbXB0eSB0aWxlcyBiZWxvdyB0aGF0IHN1bVxyXG4gICAgICogQHJldHVybnMgYXJyYXkgd2l0aCB0aGUgc3VtIHRvIHRoZSByaWdodCBhbmQgdGhlIGFtb3VudCBvZiBlbXB0eSB0aWxlcyBpbiB0aGUgY29sdW1uXHJcbiAgICAgKi9cclxuXHJcbiAgICBfc3Vkb2t1UnVsZXMoeTogbnVtYmVyLCB4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA1MTE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cclxuY29uc3QgZWFzeTE6IG51bWJlcltdW10gPSBbXHJcbiAgICBbMCwgMCwgNDUsIDMsIDAsIDAsIDAsIDMsIDQ1LCAwXSxcclxuICAgIFswLCAxNy4wOCwgMSwgMSwgMCwgMTYsIDQuMDMsIDEsIDEsIDBdLFxyXG4gICAgWzAuMTEsIDEsIDEsIDEsIDE2LjE3LCAxLCAxLCAxLCAxLCAxN10sXHJcbiAgICBbMC4xNywgMSwgMSwgMy4xNywgMSwgMSwgMSwgMC4xNiwgMSwgMV0sXHJcbiAgICBbMCwgMC4xOCwgMSwgMSwgMSwgMCwgMCwgMTcuMTMsIDEsIDFdLFxyXG4gICAgWzAsIDE3LjA0LCAxLCAxLCAwLCAwLCAzLjExLCAxLCAxLCAwXSxcclxuICAgIFswLjA5LCAxLCAxLCAwLCAxNiwgMy4xNiwgMSwgMSwgMSwgNF0sXHJcbiAgICBbMC4xNCwgMSwgMSwgMy4xLCAxLCAxLCAxLCAxNi4xMiwgMSwgMV0sXHJcbiAgICBbMCwgMC4xOSwgMSwgMSwgMSwgMSwgMC4xOCwgMSwgMSwgMV0sXHJcbiAgICBbMCwgMC4wNSwgMSwgMSwgMCwgMCwgMC4xLCAxLCAxLCAwXSxcclxuXTtcclxuXHJcbmNvbnN0IG1lZGl1bTI6IG51bWJlcltdW10gPSBbXHJcbiAgICBbMCwgMCwgMjksIDQsIDAsIDcsIDM0LCAxNiwgMCwgMF0sXHJcbiAgICBbMCwgMC4wOCwgMSwgMSwgMy4xNywgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICBbMCwgMy4zMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICBbMC4xLCAxLCAxLCAyNC4xLCAxLCAxLCAxLCAyNCwgMCwgMF0sXHJcbiAgICBbMC4xNiwgMSwgMSwgMSwgMTUsIDAuMTMsIDEsIDEsIDAsIDBdLFxyXG4gICAgWzAsIDAsIDAuMTMsIDEsIDEsIDAuMTYsIDEsIDEsIDEwLCAxNl0sXHJcbiAgICBbMCwgMCwgMC4xLCAxLCAxLCAyNCwgMy4xNiwgMSwgMSwgMV0sXHJcbiAgICBbMCwgMCwgMCwgMTcuMTQsIDEsIDEsIDEsIDE3LjExLCAxLCAxXSxcclxuICAgIFswLCAwLCAwLjMsIDEsIDEsIDEsIDEsIDEsIDEsIDBdLFxyXG4gICAgWzAsIDAsIDAuMTgsIDEsIDEsIDEsIDAuMTMsIDEsIDEsIDBdLFxyXG5dO1xyXG4iLCJleHBvcnQgY2xhc3MgVGlsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvLyBDb21tb24gcHJvcGVydGllcyBhbmQgbWV0aG9kcyBmb3IgYWxsIHRpbGVzXHJcbiAgICB9XHJcbiAgICAvLyBDb21tb24gcHJvcGVydGllcyBhbmQgbWV0aG9kcyBmb3IgYWxsIHRpbGVzXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF5YWJsZVRpbGUgZXh0ZW5kcyBUaWxlIHtcclxuICAgIHBvc3NpYmxlTnVtYmVyczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBvc3NpYmxlTnVtYmVyczogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnBvc3NpYmxlTnVtYmVycyA9IHBvc3NpYmxlTnVtYmVycztcclxuICAgIH1cclxuXHJcbiAgICAvLyAwMDEwMDAwMDAgLT4gN1xyXG4gICAgLy8gMTEwMTEwMTAwIC0+IDBcclxuICAgIG9ubHlQb3NzaWJsZU51bWJlcigpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLnBvc3NpYmxlTnVtYmVycy50b1N0cmluZygyKS5zcGxpdChcIjFcIikubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zc2libGVOdW1iZXJzLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKVsxXS5sZW5ndGggKyAxO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVW5wbGF5YWJsZVRpbGUgZXh0ZW5kcyBUaWxlIHtcclxuICAgIGNvbFN1bTogbnVtYmVyO1xyXG4gICAgcm93U3VtOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29sU3VtOiBudW1iZXIsIHJvd1N1bTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmNvbFN1bSA9IGNvbFN1bTtcclxuICAgICAgICB0aGlzLnJvd1N1bSA9IHJvd1N1bTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbFN1bSA9PT0gMCAmJiB0aGlzLnJvd1N1bSA9PT0gMDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBUaWxlLCBQbGF5YWJsZVRpbGUsIFVucGxheWFibGVUaWxlIH0gZnJvbSBcIi4vdGlsZVwiO1xyXG5cclxuY2xhc3MgVmlldyB7XHJcbiAgICBib2FyZDogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICB0aWxlU2l6ZTogbnVtYmVyO1xyXG4gICAgdGlsZVBhZGRpbmc6IG51bWJlcjtcclxuICAgIHByaXZhdGUgYm9hcmRTaWRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvcmRlclJhZGl1czogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIGJvYXJkQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1jb250YWluZXJcIikgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ib3JkZXJSYWRpdXMgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3Qm9hcmQobWF0cml4OiBhbnlbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQ2FudmFzKG1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy5fZHJhd0JhY2tncm91bmQoKTtcclxuXHJcbiAgICAgICAgbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVDb3JuZXJYID0geCAqIHRoaXMudGlsZVNpemU7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUNvcm5lclkgPSB5ICogdGhpcy50aWxlU2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgdW5wbGF5YWJsZSB0aWxlcyB3aXRoIHN1bXNcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlIGluc3RhbmNlb2YgVW5wbGF5YWJsZVRpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3VtVG9SaWdodCA9IHRpbGUucm93U3VtO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW1Ub1JpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtVG9SaWdodC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMiAtIHRoaXMudGlsZVBhZGRpbmcgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMiAtIHRoaXMudGlsZVBhZGRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdW1Ub0Rvd24gPSB0aWxlLmNvbFN1bTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VtVG9Eb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtVG9Eb3duLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMyAtIHRoaXMudGlsZVBhZGRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW1Ub0Rvd24gJiYgc3VtVG9SaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKG5vZGVDb3JuZXJYLCBub2RlQ29ybmVyWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhub2RlQ29ybmVyWCArIHRoaXMudGlsZVNpemUsIG5vZGVDb3JuZXJZICsgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMudGlsZVNpemUgLyAyNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGVtcHR5LCBwbGF5YWJsZSB0aWxlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImxpZ2h0Z3JheVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgucmVjdChub2RlQ29ybmVyWCwgbm9kZUNvcm5lclksIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGFscmVhZHkgc2FmZSBudW1iZXJzIGluIHRoZSB0aWxlcyAoZS5nLiBpZiB0aGUgdGlsZSBoYXMgMDAxMDAwMDAwMSB3cml0dGVuLCA3IGlzIHRoZSBvbmx5IG51bWJlciBsZWZ0IHRvIGJlIHBsYWNlZCBpbiB0aGUgdGlsZSlcclxuICAgICAgICAgICAgICAgIGxldCBvbmx5UG9zc2libGVOdW1iZXIgPSB0aWxlLm9ubHlQb3NzaWJsZU51bWJlcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9ubHlQb3NzaWJsZU51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25seVBvc3NpYmxlTnVtYmVyLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDAgKyB0aGlzLnRpbGVQYWRkaW5nICogMyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMyAtIHRoaXMudGlsZVBhZGRpbmcgKiAyXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIG5vdGVkIG51bWJlcnMgaW4gdGhlIHRpbGVzXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHRpbGUucG9zc2libGVOdW1iZXJzICYgKDIgKiogaSkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJncmV5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChpICsgMSkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogKGkgJSAzKSArIHRoaXMudGlsZVBhZGRpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIE1hdGguZmxvb3IoKGkgKyAzKSAvIDMpIC0gdGhpcy50aWxlUGFkZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImdyZXlcIjtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY3R4LmZpbGxUZXh0KFwiMVwiLCBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAwLCBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHRoZXJlIG5lZWRzIHRvIGJlIGEgbGl0dGxlIGFkanVzdG1lbnRzIGJlY2F1c2Ugb2YgdGhlIHdheSB0aGUgY2FudmFzIGRyYXdzIHRoZSBudW1iZXJzIGJ1dCB0aGF0IGlzIHB1cmVseSBjb3NtZXRpY1xyXG4gICAgICAgIHRoaXMuX2RyYXdHcmlkbGluZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVDYW52YXMobWF0cml4OiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5pZCA9IFwiYm9hcmRcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLmJveFNoYWRvdyA9IFwiNXB4IDVweCAyMHB4IGdyYXlcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLmJvcmRlclJhZGl1cyA9IHRoaXMuYm9yZGVyUmFkaXVzICsgXCIlXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5tYXJnaW4gPSBcIjElXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC53aWR0aCA9IHRoaXMuYm9hcmRDb250YWluZXIuY2xpZW50V2lkdGggKiAwLjk4O1xyXG4gICAgICAgIHRoaXMuYm9hcmQuaGVpZ2h0ID0gdGhpcy5ib2FyZENvbnRhaW5lci5jbGllbnRIZWlnaHQgKiAwLjk4O1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuYm9hcmQpO1xyXG5cclxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuYm9hcmQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMuYm9hcmRTaWRlTGVuZ3RoID0gdGhpcy5ib2FyZC5jbGllbnRXaWR0aDtcclxuICAgICAgICB0aGlzLnRpbGVTaXplID0gdGhpcy5ib2FyZFNpZGVMZW5ndGggLyBtYXRyaXgubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMudGlsZVBhZGRpbmcgPSB0aGlzLnRpbGVTaXplIC8gMTU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZHJhd0JhY2tncm91bmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIHRoaXMuY3R4LnJvdW5kUmVjdCgwLCAwLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoICogKHRoaXMuYm9yZGVyUmFkaXVzIC8gMTAwKSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RyYXdHcmlkbGluZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPD0gdGhpcy5ib2FyZFNpZGVMZW5ndGg7IGwgKz0gdGhpcy50aWxlU2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8obCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhsLCB0aGlzLmJvYXJkU2lkZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbygwLCBsKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHRoaXMuYm9hcmRTaWRlTGVuZ3RoLCBsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gdGhpcy50aWxlU2l6ZSAvIDI1O1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaWV3O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBNb2RlbCBmcm9tIFwiLi9tb2RlbFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3XCI7XHJcblxyXG4vKiogaGFuZGxlcyBhbGwgaW5wdXQsIGNoZWNrcyBpbiB3aXRoIG1vZGVsIGFuZCBkaXNwbGF5cyB0aGUgcmVzdWx0IHdpdGggdmlldyAqL1xyXG5cclxuY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgICBtb2RlbDogTW9kZWw7XHJcbiAgICB2aWV3OiBWaWV3O1xyXG5cclxuICAgIC8vIGJ1dHRvbnNcclxuICAgIHNvbHZlQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKCk7XHJcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZ2V0RG9tRWxlbWVudHMoKTtcclxuICAgICAgICB0aGlzLl9pbml0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldERvbUVsZW1lbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29sdmVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvbHZlXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRFdmVudExpc3RlbmVycygpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2x2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNvbHZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVWaWV3KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmlldy5kcmF3Qm9hcmQodGhpcy5tb2RlbC5tYXRyaXgpO1xyXG4gICAgICAgIHRoaXMudmlldy5ib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB0aGlzLl9ib2FyZENsaWNrZWQoZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9ib2FyZENsaWNrZWQoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJvYXJkIGNsaWNrZWRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGFwcCA9IG5ldyBDb250cm9sbGVyKCk7XHJcblxyXG4vLyBcIm5wbSBydW4gc3RhcnRcIiBpbiB0ZXJtaW5hbCB0byBzdGFydCBsaXZlIHNlcnZlclxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
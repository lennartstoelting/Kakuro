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
                _this._crossReferenceSumTableEntries(y, x);
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
        this.matrix[y][x] = (possibleCombinations << 1) | 1;
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
                        _this.ctx.fillText(sumToRight.toString(), nodeCornerX + (_this.tileSize / 3) * 2, nodeCornerY + (_this.tileSize / 3) * 2);
                    }
                    var sumToDown = (tile >> 7) & 63;
                    if (sumToDown) {
                        _this.ctx.font = _this.tileSize / 3.5 + "px Arial";
                        _this.ctx.fillStyle = "white";
                        _this.ctx.fillText(sumToDown.toString(), nodeCornerX + (_this.tileSize / 3) * 1, nodeCornerY + (_this.tileSize / 3) * 3);
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
                    _this.ctx.fillText(safeNumber.toString(), nodeCornerX + (_this.tileSize / 3) * 0, nodeCornerY + (_this.tileSize / 3) * 3);
                    return;
                }
                // the noted numbers in the tiles
                for (var i = 1; i <= 9; i++) {
                    if (!(tile & (Math.pow(2, i))))
                        continue;
                    _this.ctx.font = _this.tileSize / 3.5 + "px Arial";
                    _this.ctx.fillStyle = "grey";
                    _this.ctx.fillText(i.toString(), nodeCornerX + (_this.tileSize / 3) * ((i - 1) % 3), nodeCornerY + (_this.tileSize / 3) * Math.floor((i + 2) / 3));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3RDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3RDLENBQUM7QUFFRixJQUFNLE9BQU8sR0FBZTtJQUN4QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN0QyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsRUFBRSxDQUFD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QUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sb0NBQWUsR0FBdkI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFzQixDQUFDO0lBQzdFLENBQUM7SUFFTyx3Q0FBbUIsR0FBM0I7UUFBQSxpQkFTQztRQVJHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7WUFDOUIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDdkMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sZ0NBQVcsR0FBbkI7UUFBQSxpQkFHQztRQUZHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBaUIsSUFBSyxZQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVPLGtDQUFhLEdBQXJCLFVBQXNCLEtBQWlCO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQztBQUVELElBQU0sR0FBRyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFFN0IsbURBQW1EIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL21vZGVsLnRzIiwid2VicGFjazovL2tha3Vyby8uL3NyYy92aWV3LnRzIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tha3Vyby8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBNb2RlbCB7XHJcbiAgICBtYXRyaXg6IG51bWJlcltdW107XHJcbiAgICBzdW1UYWJsZTogbnVtYmVyW11bXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vIGdydW5kc8OkdHpsaWNoOiB1bnNwaWVsYmFyLCBTdW1tZW5mZWxkLCBzcGllbGJhclxyXG4gICAgICAgIC8vIElkZWU6IDEzIGJpdCBaYWhsIChiaXQgMDogc3BpZWxiYXIgamEgb2RlciBuZWluPyBiaXQgMS0xMjogU3VtbWVuZmVsZClcclxuICAgICAgICB0aGlzLm1hdHJpeCA9IHRoaXMuaW5pdEJpbmFyeU1hdHJpeChlYXN5MSk7XHJcbiAgICAgICAgdGhpcy5zdW1UYWJsZSA9IHRoaXMuaW5pdFN1bVRhYmxlKCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubWF0cml4KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN1bVRhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0QmluYXJ5TWF0cml4KG1hdHJpeDogbnVtYmVyW11bXSk6IG51bWJlcltdW10ge1xyXG4gICAgICAgIGxldCBiaW5hcnlNYXRyaXg6IG51bWJlcltdW10gPSBbXTtcclxuICAgICAgICBtYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBiaW5hcnlSb3c6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVJvdy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluYXJ5Um93LnB1c2gocGFyc2VJbnQoXCIxXCIucmVwZWF0KDEwKSwgMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgYWxsIG90aGVyIGNhc2VzLCB3ZSBzZWUgdGhlbSBhcyBhIGRlY2ltYWwgbnVtYmVyLlxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIDB0aCBiaXQgaXMgMCxcclxuICAgICAgICAgICAgICAgIC8vIHRoZW4gdGhlIG5leHQgNiBiaXQgaW5jcmlwdCB0aGUgdHdvIG51bWJlcnMgdG8gdGhlIHJpZ2h0IG9mIHRoZSBjb21tYSxcclxuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgbGFzdCA2IGJpdCBpbmNyaXB0IHRoZSB0d28gbnVtYmVycyB0byB0aGUgbGVmdCBvZiB0aGUgY29tbWFcclxuICAgICAgICAgICAgICAgIGxldCBjb2xBbmRSb3cgPSB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoc3VtKSA9PiBwYXJzZUludChzdW0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvdy5sZW5ndGggIT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeCBhdCB4OiBcIiArIHggKyBcIiBhbmQgeTogXCIgKyB5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3dbMF0gPiA0NSB8fCBjb2xBbmRSb3dbMF0gPT0gMiB8fCBjb2xBbmRSb3dbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgaW5wdXQgbWF0cml4OiBzdW0gb2YgY29sIGF0IHg6IFwiICsgeCArIFwiIGFuZCB5OiBcIiArIHkgKyBcIiBpcyBnaXZlbiBhcyBcIiArIGNvbEFuZFJvd1swXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93WzFdID4gNDUgfHwgY29sQW5kUm93WzFdID09IDIgfHwgY29sQW5kUm93WzFdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeDogc3VtIG9mIHJvdyBhdCB4OiBcIiArIHggKyBcIiBhbmQgeTogXCIgKyB5ICsgXCIgaXMgZ2l2ZW4gYXMgXCIgKyBjb2xBbmRSb3dbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjb2xBbmRSb3dCaW5hcnkgPSBjb2xBbmRSb3cubWFwKChzdW0pID0+IChcIjAwMDAwMFwiICsgc3VtLnRvU3RyaW5nKDIpKS5zbGljZSgtNikpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJpbmFyeSA9IHBhcnNlSW50KGNvbEFuZFJvd0JpbmFyeVswXSArIGNvbEFuZFJvd0JpbmFyeVsxXSwgMikgPDwgMTtcclxuICAgICAgICAgICAgICAgIGJpbmFyeVJvdy5wdXNoKGJpbmFyeSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBiaW5hcnlNYXRyaXgucHVzaChiaW5hcnlSb3cpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBiaW5hcnlNYXRyaXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpIHdhbnQgdG8gZG8gYSBnZW5lcmFsIHRhYmxlIHdoZXJlIGFsbCB0aGUgY29tYmluYXRpb25zIG9mIDIgdXAgdG8gOSBudW1iZXJzIGFyZSBsaXN0ZWQgYW5kIHRoZSBzdW0gb2YgdGhlbSBpcyBjYWxjdWxhdGVkXHJcbiAgICAgKiB0aGUgcmVzdWx0aW5nIHN1bSBpcyB0aGUgaW5kZXggb2Ygd2hlcmUgdG8gZmluZCB0aGVzZSBjb21iaW5hdGlvbnMgaW4gdGhlIHRhYmxlXHJcbiAgICAgKiBhdCB0aGF0IGluZGV4LCB0aGUgY29tYmluYXRpb25zIGFyZSBzdG9yZWQgYXMgYSA5IGJpdCBudW1iZXIsIHdoZXJlIHRoZSBiaXQgaXMgMSBpZiB0aGUgbnVtYmVyIGlzIGluIHRoZSBjb21iaW5hdGlvblxyXG4gICAgICogdGhlIHRhYmxlIGlzIGEgNDUgZWxlbWVudCBhcnJheVxyXG4gICAgICogYXQgZWFjaCBpbmRleCwgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtIGlzIHN0b3JlZCBhdCB0aGUgaW5kZXggb2YgaXQncyBhbW91bnRcclxuICAgICAqIHRoZSBtYXRyaXggbG9va3MgYXMgZm9sbG93czpcclxuICAgICAqXHJcbiAgICAgKiBbW10sICAgICAgICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAqICBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICogIFtdLCAgICAgICAgICAgICAgICAgICAgICAgICAyXHJcbiAgICAgKiAgW1tdLFtdLFszXV0sICAgICAgICAgICAgICAgIDNcclxuICAgICAqICBbW10sW10sWzVdXSwgICAgICAgICAgICAgICAgNFxyXG4gICAgICogIFtbXSxbXSxbNiw5XV0sICAgICAgICAgICAgICA1XHJcbiAgICAgKiAgW1tdLFtdLFsxMCwxN10sWzddXV0gICAgICAgIDZcclxuICAgICAqICBbW10sW10sWzMzLDE4LCAxMl0sWzExXV0gICAgN1xyXG4gICAgICogdGhlIGZpcnN0IGluZGV4IGlzIHRoZSBzdW0gKCM0NSksIHRoZSBzZWNvbmQgaW5kZXggaXMgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtKCM5KSxcclxuICAgICAqIGVhY2ggb2YgdGhlIG51bWJlcnMgZnJvbSB0aGF0IHBvaW50IGFyZSBtZWFudCB0byBiZSByZWFkIGluIGJpbmFyeSwgaGF2aW5nIGEgMSBldmVyeXdoZXJlIHRoZSBudW1iZXIgaXMgaW4gdGhlIGNvbWJpbmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGluaXRTdW1UYWJsZSgpOiBudW1iZXJbXVtdW10ge1xyXG4gICAgICAgIGxldCB0YWJsZTogbnVtYmVyW11bXVtdID0gQXJyYXkoNDYpXHJcbiAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgIC5tYXAoKCkgPT5cclxuICAgICAgICAgICAgICAgIEFycmF5KDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoKSA9PiBbXSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYmluYXJ5Q29tYmluYXRpb24gPSAzOyBiaW5hcnlDb21iaW5hdGlvbiA8PSBwYXJzZUludChcIjExMTExMTExMVwiLCAyKTsgYmluYXJ5Q29tYmluYXRpb24rKykge1xyXG4gICAgICAgICAgICBsZXQgYW1vdW50T2ZPbmVzID0gYmluYXJ5Q29tYmluYXRpb24udG9TdHJpbmcoMikuc3BsaXQoXCIxXCIpLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGlmIChhbW91bnRPZk9uZXMgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDk7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJpbmFyeUNvbWJpbmF0aW9uICYgKDIgKiogaikpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gaiArIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdW06IFwiICsgc3VtICsgXCIgYW1vdW50T2ZPbmVzOiBcIiArIGFtb3VudE9mT25lcyArIFwiIGJpbmFyeUNvbWJpbmF0aW9uOiBcIiArIGJpbmFyeUNvbWJpbmF0aW9uLnRvU3RyaW5nKDIpKTtcclxuICAgICAgICAgICAgdGFibGVbc3VtXVthbW91bnRPZk9uZXNdLnB1c2goYmluYXJ5Q29tYmluYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHNvbHZlKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB5VGVzdCA9IDM7XHJcbiAgICAgICAgbGV0IHhUZXN0ID0gODtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHNvbHZlIHRoZSBlbXB0eSB0aWxlc1xyXG4gICAgICAgICAgICAgICAgaWYgKCEodGhpcy5tYXRyaXhbeV1beF0gJiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jcm9zc1JlZmVyZW5jZVN1bVRhYmxlRW50cmllcyh5LCB4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBuZXh0IGZ1bmN0aW9uOiBzdWRva3UgcnVsZXMsIGNoZWNrcyBpbiByb3cgYW5kIGNvbHVtIGlmIHRoZXJlIGFyZSBhbHJlYWR5IGZpeGVkIG51bWJlcnMgYW5kIHJlbW92ZXMgdGhlbSBmcm9tIHRoZSBwb3NzaWJsZSBjb21iaW5hdGlvbnNcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMgb25lIGFscmVhZHkgbWlnaHQgbmVlZCB0byBiZSBhIHJlY3Vyc2l2ZSBmdW5jdGlvbiB0byBnYWluIG9mIG9mIGVhY2ggd29uIHN0ZXBcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVuIGZ1bmN0aW9ucyBjb3VsZCBiZSB0aGUgb25lcyBpbiBjYXNlcyB3aGVyZSB0d28gdGlsZXMgb25seSBlYWNoIGhhdmUgdHdvIG51bWJlcnMgbGVmdCBvciB0aHJlZSB0aWxlcyBlYWNoIGhhdmUgdGhyZWUgbnVtYmVycyBsZWZ0LlxyXG4gICAgICAgICAgICAgICAgLy8gdGhvc2UgY2FuIGFsc28gYmUgZWxpbWluYXRlZCBmcm9tIHRoZSBvdGhlcnMsIHNpbWlsYXIgdG8gc3Vkb2t1IHJ1bGVzXHJcbiAgICAgICAgICAgICAgICAvLyBlLmcuIGlmIHR3byB0aWxlcyBvbmx5IGhhdmUgMiBhbmQgMyBsZWZ0LCB0aGUgb3RoZXIgdGlsZXMgY2FuJ3QgaGF2ZSAyIGFuZCAzIGluIHRoZW1cclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyBhbHNvIG1vcmUgZnVuY3Rpb25zIHdpdGggdGhlIHN1bXRhYmxlLCBlLmcuIGlmIGZvciBleGFtcGxlIGluIGEgcm93IHdpdGggdGhyZWUgbnVtYmVycywgdGhlcmUgaXMgYWxyZWFkeSBhIHNhZmUgNyBpbiB0aGVyZSwgdGhlIG9ubHkgY29tYmluYXRpb25zIGxlZnQgaGF2ZSB0byBpbmNsdWRlIGEgN1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBtaWdodCBnZXQgcmlkIG9mIHNvbWUgY29tYmluYXRpb25zIGluIHRoZSBzdW10YWJsZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5tYXRyaXhbeVRlc3RdW3hUZXN0XSA9IHBhcnNlSW50KFwiMTEwMTExMTExMVwiLCAyKTtcclxuICAgIH1cclxuXHJcbiAgICBfY3Jvc3NSZWZlcmVuY2VTdW1UYWJsZUVudHJpZXMoeTogbnVtYmVyLCB4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY29sSW5mbyA9IHRoaXMuX2dldENvbHVtbkluZm8oeSwgeCk7XHJcbiAgICAgICAgbGV0IHJvd0luZm8gPSB0aGlzLl9nZXRSb3dJbmZvKHksIHgpO1xyXG5cclxuICAgICAgICBsZXQgcm93Q29tYmluYXRpb25zID0gdGhpcy5zdW1UYWJsZVtyb3dJbmZvLnN1bV1bcm93SW5mby50aWxlQW1vdW50XS5yZWR1Y2UoKGFjYywgY3VyKSA9PiB7XHJcbiAgICAgICAgICAgIGFjYyB8PSBjdXI7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwgMCk7XHJcblxyXG4gICAgICAgIGxldCBjb2xDb21iaW5hdGlvbnMgPSB0aGlzLnN1bVRhYmxlW2NvbEluZm8uc3VtXVtjb2xJbmZvLnRpbGVBbW91bnRdLnJlZHVjZSgoYWNjLCBjdXIpID0+IHtcclxuICAgICAgICAgICAgYWNjIHw9IGN1cjtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCAwKTtcclxuXHJcbiAgICAgICAgbGV0IHBvc3NpYmxlQ29tYmluYXRpb25zID0gcm93Q29tYmluYXRpb25zICYgY29sQ29tYmluYXRpb25zO1xyXG4gICAgICAgIHRoaXMubWF0cml4W3ldW3hdID0gKHBvc3NpYmxlQ29tYmluYXRpb25zIDw8IDEpIHwgMTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogbG9vcHMgdXAgdG8gZmluZCB0aGUgc3VtIG9mIHRoZSBjb2x1bW5cclxuICAgICAqIGxvb3BzIGRvd24gZnJvbSB0aGVyZSB0byBmaW5kIHRoZSBlbXB0eSB0aWxlcyBiZWxvdyB0aGF0IHN1bVxyXG4gICAgICogQHJldHVybnMgYXJyYXkgd2l0aCB0aGUgc3VtIHRvIHRoZSByaWdodCBhbmQgdGhlIGFtb3VudCBvZiBlbXB0eSB0aWxlcyBpbiB0aGUgY29sdW1uXHJcbiAgICAgKi9cclxuICAgIF9nZXRDb2x1bW5JbmZvKHk6IG51bWJlciwgeDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICB3aGlsZSAoeSA+PSAwICYmIHRoaXMubWF0cml4W3ldW3hdICYgMSkge1xyXG4gICAgICAgICAgICB5LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbXB0eVRpbGVzSW5Db2x1bW4gPSAxO1xyXG4gICAgICAgIHdoaWxlICh5ICsgZW1wdHlUaWxlc0luQ29sdW1uIDwgOSAmJiB0aGlzLm1hdHJpeFt5ICsgZW1wdHlUaWxlc0luQ29sdW1uICsgMV1beF0gJiAxKSB7XHJcbiAgICAgICAgICAgIGVtcHR5VGlsZXNJbkNvbHVtbisrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBzdW06ICh0aGlzLm1hdHJpeFt5XVt4XSA+PiA3KSAmIDYzLCB0aWxlQW1vdW50OiBlbXB0eVRpbGVzSW5Db2x1bW4gfTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Um93SW5mbyh5OiBudW1iZXIsIHg6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgd2hpbGUgKHggPj0gMCAmJiB0aGlzLm1hdHJpeFt5XVt4XSAmIDEpIHtcclxuICAgICAgICAgICAgeC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZW1wdHlUaWxlc0luUm93ID0gMTtcclxuICAgICAgICB3aGlsZSAoeCArIGVtcHR5VGlsZXNJblJvdyA8IDkgJiYgdGhpcy5tYXRyaXhbeV1beCArIGVtcHR5VGlsZXNJblJvdyArIDFdICYgMSkge1xyXG4gICAgICAgICAgICBlbXB0eVRpbGVzSW5Sb3crKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgc3VtOiAodGhpcy5tYXRyaXhbeV1beF0gPj4gMSkgJiA2MywgdGlsZUFtb3VudDogZW1wdHlUaWxlc0luUm93IH07XHJcbiAgICAgICAgLy8gcmV0dXJuIFsodGhpcy5tYXRyaXhbeV1beF0gPj4gMSkgJiA2MywgZW1wdHlUaWxlc0luUm93XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XHJcblxyXG5jb25zdCBlYXN5MTogbnVtYmVyW11bXSA9IFtcclxuICAgIFswLCAwLCA0NSwgMywgMCwgMCwgMCwgMywgNDUsIDBdLFxyXG4gICAgWzAsIDE3LjA4LCAxLCAxLCAwLCAxNiwgNC4wMywgMSwgMSwgMF0sXHJcbiAgICBbMC4xMSwgMSwgMSwgMSwgMTYuMTcsIDEsIDEsIDEsIDEsIDE3XSxcclxuICAgIFswLjE3LCAxLCAxLCAzLjE3LCAxLCAxLCAxLCAwLjE2LCAxLCAxXSxcclxuICAgIFswLCAwLjE4LCAxLCAxLCAxLCAwLCAwLCAxNy4xMywgMSwgMV0sXHJcbiAgICBbMCwgMTcuMDQsIDEsIDEsIDAsIDAsIDMuMTEsIDEsIDEsIDBdLFxyXG4gICAgWzAuMDksIDEsIDEsIDAsIDE2LCAzLjE2LCAxLCAxLCAxLCA0XSxcclxuICAgIFswLjE0LCAxLCAxLCAzLjEsIDEsIDEsIDEsIDE2LjEyLCAxLCAxXSxcclxuICAgIFswLCAwLjE5LCAxLCAxLCAxLCAxLCAwLjE4LCAxLCAxLCAxXSxcclxuICAgIFswLCAwLjA1LCAxLCAxLCAwLCAwLCAwLjEsIDEsIDEsIDBdLFxyXG5dO1xyXG5cclxuY29uc3QgbWVkaXVtMjogbnVtYmVyW11bXSA9IFtcclxuICAgIFswLCAwLCAyOSwgNCwgMCwgNywgMzQsIDE2LCAwLCAwXSxcclxuICAgIFswLCAwLjA4LCAxLCAxLCAzLjE3LCAxLCAxLCAxLCAwLCAwXSxcclxuICAgIFswLCAzLjMxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwXSxcclxuICAgIFswLjEsIDEsIDEsIDI0LjEsIDEsIDEsIDEsIDI0LCAwLCAwXSxcclxuICAgIFswLjE2LCAxLCAxLCAxLCAxNSwgMC4xMywgMSwgMSwgMCwgMF0sXHJcbiAgICBbMCwgMCwgMC4xMywgMSwgMSwgMC4xNiwgMSwgMSwgMTAsIDE2XSxcclxuICAgIFswLCAwLCAwLjEsIDEsIDEsIDI0LCAzLjE2LCAxLCAxLCAxXSxcclxuICAgIFswLCAwLCAwLCAxNy4xNCwgMSwgMSwgMSwgMTcuMTEsIDEsIDFdLFxyXG4gICAgWzAsIDAsIDAuMywgMSwgMSwgMSwgMSwgMSwgMSwgMF0sXHJcbiAgICBbMCwgMCwgMC4xOCwgMSwgMSwgMSwgMC4xMywgMSwgMSwgMF0sXHJcbl07XHJcbiIsImNsYXNzIFZpZXcge1xyXG4gICAgYm9hcmQ6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgdGlsZVNpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgYm9hcmRTaWRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvcmRlclJhZGl1czogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIGJvYXJkQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1jb250YWluZXJcIikgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ib3JkZXJSYWRpdXMgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3Qm9hcmQobWF0cml4OiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQ2FudmFzKG1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy5fZHJhd0JhY2tncm91bmQoKTtcclxuXHJcbiAgICAgICAgbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVDb3JuZXJYID0geCAqIHRoaXMudGlsZVNpemU7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUNvcm5lclkgPSB5ICogdGhpcy50aWxlU2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgdW5wbGF5YWJsZSB0aWxlcyB3aXRoIHN1bXNcclxuICAgICAgICAgICAgICAgIGlmICghKHRpbGUgJiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdW1Ub1JpZ2h0ID0gKHRpbGUgPj4gMSkgJiA2MztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VtVG9SaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChzdW1Ub1JpZ2h0LnRvU3RyaW5nKCksIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIsIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1bVRvRG93biA9ICh0aWxlID4+IDcpICYgNjM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bVRvRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChzdW1Ub0Rvd24udG9TdHJpbmcoKSwgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMSwgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgZW1wdHksIHBsYXlhYmxlIHRpbGVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwibGlnaHRncmF5XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5yZWN0KG5vZGVDb3JuZXJYLCBub2RlQ29ybmVyWSwgdGhpcy50aWxlU2l6ZSwgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgYWxyZWFkeSBzYWZlIG51bWJlcnMgaW4gdGhlIHRpbGVzIChlLmcuIGlmIHRoZSB0aWxlIGhhcyAwMDEwMDAwMDAxIHdyaXR0ZW4sIDcgaXMgdGhlIG9ubHkgbnVtYmVyIGxlZnQgdG8gYmUgcGxhY2VkIGluIHRoZSB0aWxlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUudG9TdHJpbmcoMikuc3BsaXQoXCIxXCIpLmxlbmd0aCA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNhZmVOdW1iZXIgPSB0aWxlLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKVsxXS5sZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChzYWZlTnVtYmVyLnRvU3RyaW5nKCksIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDAsIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgbm90ZWQgbnVtYmVycyBpbiB0aGUgdGlsZXNcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHRpbGUgJiAoMiAqKiBpKSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImdyZXlcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAoKGkgLSAxKSAlIDMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiBNYXRoLmZsb29yKChpICsgMikgLyAzKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImdyZXlcIjtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY3R4LmZpbGxUZXh0KFwiMVwiLCBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAwLCBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHRoZXJlIG5lZWRzIHRvIGJlIGEgbGl0dGxlIGFkanVzdG1lbnRzIGJlY2F1c2Ugb2YgdGhlIHdheSB0aGUgY2FudmFzIGRyYXdzIHRoZSBudW1iZXJzIGJ1dCB0aGF0IGlzIHB1cmVseSBjb3NtZXRpY1xyXG4gICAgICAgIHRoaXMuX2RyYXdHcmlkbGluZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVDYW52YXMobWF0cml4OiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5pZCA9IFwiYm9hcmRcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLmJveFNoYWRvdyA9IFwiNXB4IDVweCAyMHB4IGdyYXlcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLmJvcmRlclJhZGl1cyA9IHRoaXMuYm9yZGVyUmFkaXVzICsgXCIlXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5tYXJnaW4gPSBcIjElXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC53aWR0aCA9IHRoaXMuYm9hcmRDb250YWluZXIuY2xpZW50V2lkdGggKiAwLjk4O1xyXG4gICAgICAgIHRoaXMuYm9hcmQuaGVpZ2h0ID0gdGhpcy5ib2FyZENvbnRhaW5lci5jbGllbnRIZWlnaHQgKiAwLjk4O1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuYm9hcmQpO1xyXG5cclxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuYm9hcmQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMuYm9hcmRTaWRlTGVuZ3RoID0gdGhpcy5ib2FyZC5jbGllbnRXaWR0aDtcclxuICAgICAgICB0aGlzLnRpbGVTaXplID0gdGhpcy5ib2FyZFNpZGVMZW5ndGggLyBtYXRyaXgubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RyYXdCYWNrZ3JvdW5kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICB0aGlzLmN0eC5yb3VuZFJlY3QoMCwgMCwgdGhpcy5ib2FyZC5jbGllbnRXaWR0aCwgdGhpcy5ib2FyZC5jbGllbnRXaWR0aCwgdGhpcy5ib2FyZC5jbGllbnRXaWR0aCAqICh0aGlzLmJvcmRlclJhZGl1cyAvIDEwMCkpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kcmF3R3JpZGxpbmVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDw9IHRoaXMuYm9hcmRTaWRlTGVuZ3RoOyBsICs9IHRoaXMudGlsZVNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKGwsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8obCwgdGhpcy5ib2FyZFNpZGVMZW5ndGgpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmJvYXJkU2lkZUxlbmd0aCwgbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMudGlsZVNpemUgLyAyNTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlldztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgTW9kZWwgZnJvbSBcIi4vbW9kZWxcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlld1wiO1xyXG5cclxuLyoqIGhhbmRsZXMgYWxsIGlucHV0LCBjaGVja3MgaW4gd2l0aCBtb2RlbCBhbmQgZGlzcGxheXMgdGhlIHJlc3VsdCB3aXRoIHZpZXcgKi9cclxuXHJcbmNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgbW9kZWw6IE1vZGVsO1xyXG4gICAgdmlldzogVmlldztcclxuXHJcbiAgICAvLyBidXR0b25zXHJcbiAgICBzb2x2ZUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2dldERvbUVsZW1lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXREb21FbGVtZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvbHZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x2ZVwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0RXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29sdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb2x2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlVmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZpZXcuZHJhd0JvYXJkKHRoaXMubW9kZWwubWF0cml4KTtcclxuICAgICAgICB0aGlzLnZpZXcuYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4gdGhpcy5fYm9hcmRDbGlja2VkKGV2ZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYm9hcmRDbGlja2VkKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJib2FyZCBjbGlja2VkXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBhcHAgPSBuZXcgQ29udHJvbGxlcigpO1xyXG5cclxuLy8gXCJucG0gcnVuIHN0YXJ0XCIgaW4gdGVybWluYWwgdG8gc3RhcnQgbGl2ZSBzZXJ2ZXJcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
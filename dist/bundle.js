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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3RDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3RDLENBQUM7QUFFRixJQUFNLE9BQU8sR0FBZTtJQUN4QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN0QyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FB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dkI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFzQixDQUFDO0lBQzdFLENBQUM7SUFFTyx3Q0FBbUIsR0FBM0I7UUFBQSxpQkFTQztRQVJHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7WUFDOUIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDdkMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sZ0NBQVcsR0FBbkI7UUFBQSxpQkFHQztRQUZHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBaUIsSUFBSyxZQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVPLGtDQUFhLEdBQXJCLFVBQXNCLEtBQWlCO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQztBQUVELElBQU0sR0FBRyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFFN0IsbURBQW1EIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL21vZGVsLnRzIiwid2VicGFjazovL2tha3Vyby8uL3NyYy92aWV3LnRzIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tha3Vyby8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBNb2RlbCB7XHJcbiAgICBtYXRyaXg6IG51bWJlcltdW107XHJcbiAgICBzdW1UYWJsZTogbnVtYmVyW11bXVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vIGdydW5kc8OkdHpsaWNoOiB1bnNwaWVsYmFyLCBTdW1tZW5mZWxkLCBzcGllbGJhclxyXG4gICAgICAgIC8vIElkZWU6IDEzIGJpdCBaYWhsIChiaXQgMDogc3BpZWxiYXIgamEgb2RlciBuZWluPyBiaXQgMS0xMjogU3VtbWVuZmVsZClcclxuICAgICAgICB0aGlzLm1hdHJpeCA9IHRoaXMuaW5pdEJpbmFyeU1hdHJpeChlYXN5MSk7XHJcbiAgICAgICAgdGhpcy5zdW1UYWJsZSA9IHRoaXMuaW5pdFN1bVRhYmxlKCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubWF0cml4KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN1bVRhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0QmluYXJ5TWF0cml4KG1hdHJpeDogbnVtYmVyW11bXSk6IG51bWJlcltdW10ge1xyXG4gICAgICAgIGxldCBiaW5hcnlNYXRyaXg6IG51bWJlcltdW10gPSBbXTtcclxuICAgICAgICBtYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBiaW5hcnlSb3c6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVJvdy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluYXJ5Um93LnB1c2gocGFyc2VJbnQoXCIxXCIucmVwZWF0KDEwKSwgMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgYWxsIG90aGVyIGNhc2VzLCB3ZSBzZWUgdGhlbSBhcyBhIGRlY2ltYWwgbnVtYmVyLlxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIDB0aCBiaXQgaXMgMCxcclxuICAgICAgICAgICAgICAgIC8vIHRoZW4gdGhlIG5leHQgNiBiaXQgaW5jcmlwdCB0aGUgdHdvIG51bWJlcnMgdG8gdGhlIHJpZ2h0IG9mIHRoZSBjb21tYSxcclxuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgbGFzdCA2IGJpdCBpbmNyaXB0IHRoZSB0d28gbnVtYmVycyB0byB0aGUgbGVmdCBvZiB0aGUgY29tbWFcclxuICAgICAgICAgICAgICAgIGxldCBjb2xBbmRSb3cgPSB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoc3VtKSA9PiBwYXJzZUludChzdW0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvdy5sZW5ndGggIT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeCBhdCB4OiBcIiArIHggKyBcIiBhbmQgeTogXCIgKyB5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3dbMF0gPiA0NSB8fCBjb2xBbmRSb3dbMF0gPT0gMiB8fCBjb2xBbmRSb3dbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgaW5wdXQgbWF0cml4OiBzdW0gb2YgY29sIGF0IHg6IFwiICsgeCArIFwiIGFuZCB5OiBcIiArIHkgKyBcIiBpcyBnaXZlbiBhcyBcIiArIGNvbEFuZFJvd1swXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93WzFdID4gNDUgfHwgY29sQW5kUm93WzFdID09IDIgfHwgY29sQW5kUm93WzFdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeDogc3VtIG9mIHJvdyBhdCB4OiBcIiArIHggKyBcIiBhbmQgeTogXCIgKyB5ICsgXCIgaXMgZ2l2ZW4gYXMgXCIgKyBjb2xBbmRSb3dbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjb2xBbmRSb3dCaW5hcnkgPSBjb2xBbmRSb3cubWFwKChzdW0pID0+IChcIjAwMDAwMFwiICsgc3VtLnRvU3RyaW5nKDIpKS5zbGljZSgtNikpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJpbmFyeSA9IHBhcnNlSW50KGNvbEFuZFJvd0JpbmFyeVswXSArIGNvbEFuZFJvd0JpbmFyeVsxXSwgMikgPDwgMTtcclxuICAgICAgICAgICAgICAgIGJpbmFyeVJvdy5wdXNoKGJpbmFyeSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBiaW5hcnlNYXRyaXgucHVzaChiaW5hcnlSb3cpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBiaW5hcnlNYXRyaXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpIHdhbnQgdG8gZG8gYSBnZW5lcmFsIHRhYmxlIHdoZXJlIGFsbCB0aGUgY29tYmluYXRpb25zIG9mIDIgdXAgdG8gOSBudW1iZXJzIGFyZSBsaXN0ZWQgYW5kIHRoZSBzdW0gb2YgdGhlbSBpcyBjYWxjdWxhdGVkXHJcbiAgICAgKiB0aGUgcmVzdWx0aW5nIHN1bSBpcyB0aGUgaW5kZXggb2Ygd2hlcmUgdG8gZmluZCB0aGVzZSBjb21iaW5hdGlvbnMgaW4gdGhlIHRhYmxlXHJcbiAgICAgKiBhdCB0aGF0IGluZGV4LCB0aGUgY29tYmluYXRpb25zIGFyZSBzdG9yZWQgYXMgYSA5IGJpdCBudW1iZXIsIHdoZXJlIHRoZSBiaXQgaXMgMSBpZiB0aGUgbnVtYmVyIGlzIGluIHRoZSBjb21iaW5hdGlvblxyXG4gICAgICogdGhlIHRhYmxlIGlzIGEgNDUgZWxlbWVudCBhcnJheVxyXG4gICAgICogYXQgZWFjaCBpbmRleCwgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtIGlzIHN0b3JlZCBhdCB0aGUgaW5kZXggb2YgaXQncyBhbW91bnRcclxuICAgICAqIHRoZSBtYXRyaXggbG9va3MgYXMgZm9sbG93czpcclxuICAgICAqXHJcbiAgICAgKiBbW10sICAgICAgICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAqICBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICogIFtdLCAgICAgICAgICAgICAgICAgICAgICAgICAyXHJcbiAgICAgKiAgW1tdLFtdLFszXV0sICAgICAgICAgICAgICAgIDNcclxuICAgICAqICBbW10sW10sWzVdXSwgICAgICAgICAgICAgICAgNFxyXG4gICAgICogIFtbXSxbXSxbNiw5XV0sICAgICAgICAgICAgICA1XHJcbiAgICAgKiAgW1tdLFtdLFsxMCwxN10sWzddXV0gICAgICAgIDZcclxuICAgICAqICBbW10sW10sWzMzLDE4LCAxMl0sWzExXV0gICAgN1xyXG4gICAgICogdGhlIGZpcnN0IGluZGV4IGlzIHRoZSBzdW0gKCM0NSksIHRoZSBzZWNvbmQgaW5kZXggaXMgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtKCM5KSxcclxuICAgICAqIGVhY2ggb2YgdGhlIG51bWJlcnMgZnJvbSB0aGF0IHBvaW50IGFyZSBtZWFudCB0byBiZSByZWFkIGluIGJpbmFyeSwgaGF2aW5nIGEgMSBldmVyeXdoZXJlIHRoZSBudW1iZXIgaXMgaW4gdGhlIGNvbWJpbmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGluaXRTdW1UYWJsZSgpOiBudW1iZXJbXVtdW10ge1xyXG4gICAgICAgIGxldCB0YWJsZTogbnVtYmVyW11bXVtdID0gQXJyYXkoNDYpXHJcbiAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgIC5tYXAoKCkgPT5cclxuICAgICAgICAgICAgICAgIEFycmF5KDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoKSA9PiBbXSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYmluYXJ5Q29tYmluYXRpb24gPSAzOyBiaW5hcnlDb21iaW5hdGlvbiA8PSBwYXJzZUludChcIjExMTExMTExMVwiLCAyKTsgYmluYXJ5Q29tYmluYXRpb24rKykge1xyXG4gICAgICAgICAgICBsZXQgYW1vdW50T2ZPbmVzID0gYmluYXJ5Q29tYmluYXRpb24udG9TdHJpbmcoMikuc3BsaXQoXCIxXCIpLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGlmIChhbW91bnRPZk9uZXMgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDk7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJpbmFyeUNvbWJpbmF0aW9uICYgKDIgKiogaikpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gaiArIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdW06IFwiICsgc3VtICsgXCIgYW1vdW50T2ZPbmVzOiBcIiArIGFtb3VudE9mT25lcyArIFwiIGJpbmFyeUNvbWJpbmF0aW9uOiBcIiArIGJpbmFyeUNvbWJpbmF0aW9uLnRvU3RyaW5nKDIpKTtcclxuICAgICAgICAgICAgdGFibGVbc3VtXVthbW91bnRPZk9uZXNdLnB1c2goYmluYXJ5Q29tYmluYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHNvbHZlKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB5VGVzdCA9IDM7XHJcbiAgICAgICAgbGV0IHhUZXN0ID0gODtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHNvbHZlIHRoZSBlbXB0eSB0aWxlc1xyXG4gICAgICAgICAgICAgICAgaWYgKCEodGhpcy5tYXRyaXhbeV1beF0gJiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jcm9zc1JlZmVyZW5jZVN1bVRhYmxlRW50cmllcyh5LCB4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBuZXh0IGZ1bmN0aW9uOiBzdWRva3UgcnVsZXMsIGNoZWNrcyBpbiByb3cgYW5kIGNvbHVtIGlmIHRoZXJlIGFyZSBhbHJlYWR5IGZpeGVkIG51bWJlcnMgYW5kIHJlbW92ZXMgdGhlbSBmcm9tIHRoZSBwb3NzaWJsZSBjb21iaW5hdGlvbnNcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMgb25lIGFscmVhZHkgbWlnaHQgbmVlZCB0byBiZSBhIHJlY3Vyc2l2ZSBmdW5jdGlvbiB0byBnYWluIG9mIG9mIGVhY2ggd29uIHN0ZXBcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVuIGZ1bmN0aW9ucyBjb3VsZCBiZSB0aGUgb25lcyBpbiBjYXNlcyB3aGVyZSB0d28gdGlsZXMgb25seSBlYWNoIGhhdmUgdHdvIG51bWJlcnMgbGVmdCBvciB0aHJlZSB0aWxlcyBlYWNoIGhhdmUgdGhyZWUgbnVtYmVycyBsZWZ0LlxyXG4gICAgICAgICAgICAgICAgLy8gdGhvc2UgY2FuIGFsc28gYmUgZWxpbWluYXRlZCBmcm9tIHRoZSBvdGhlcnMsIHNpbWlsYXIgdG8gc3Vkb2t1IHJ1bGVzXHJcbiAgICAgICAgICAgICAgICAvLyBlLmcuIGlmIHR3byB0aWxlcyBvbmx5IGhhdmUgMiBhbmQgMyBsZWZ0LCB0aGUgb3RoZXIgdGlsZXMgY2FuJ3QgaGF2ZSAyIGFuZCAzIGluIHRoZW1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMubWF0cml4W3lUZXN0XVt4VGVzdF0gPSBwYXJzZUludChcIjExMDExMTExMTFcIiwgMik7XHJcbiAgICB9XHJcblxyXG4gICAgX2Nyb3NzUmVmZXJlbmNlU3VtVGFibGVFbnRyaWVzKHk6IG51bWJlciwgeDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNvbEluZm8gPSB0aGlzLl9nZXRDb2x1bW5JbmZvKHksIHgpO1xyXG4gICAgICAgIGxldCByb3dJbmZvID0gdGhpcy5fZ2V0Um93SW5mbyh5LCB4KTtcclxuXHJcbiAgICAgICAgbGV0IHJvd0NvbWJpbmF0aW9ucyA9IHRoaXMuc3VtVGFibGVbcm93SW5mby5zdW1dW3Jvd0luZm8udGlsZUFtb3VudF0ucmVkdWNlKChhY2MsIGN1cikgPT4ge1xyXG4gICAgICAgICAgICBhY2MgfD0gY3VyO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICBsZXQgY29sQ29tYmluYXRpb25zID0gdGhpcy5zdW1UYWJsZVtjb2xJbmZvLnN1bV1bY29sSW5mby50aWxlQW1vdW50XS5yZWR1Y2UoKGFjYywgY3VyKSA9PiB7XHJcbiAgICAgICAgICAgIGFjYyB8PSBjdXI7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwgMCk7XHJcblxyXG4gICAgICAgIGxldCBwb3NzaWJsZUNvbWJpbmF0aW9ucyA9IHJvd0NvbWJpbmF0aW9ucyAmIGNvbENvbWJpbmF0aW9ucztcclxuICAgICAgICB0aGlzLm1hdHJpeFt5XVt4XSA9IChwb3NzaWJsZUNvbWJpbmF0aW9ucyA8PCAxKSB8IDE7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGxvb3BzIHVwIHRvIGZpbmQgdGhlIHN1bSBvZiB0aGUgY29sdW1uXHJcbiAgICAgKiBsb29wcyBkb3duIGZyb20gdGhlcmUgdG8gZmluZCB0aGUgZW1wdHkgdGlsZXMgYmVsb3cgdGhhdCBzdW1cclxuICAgICAqIEByZXR1cm5zIGFycmF5IHdpdGggdGhlIHN1bSB0byB0aGUgcmlnaHQgYW5kIHRoZSBhbW91bnQgb2YgZW1wdHkgdGlsZXMgaW4gdGhlIGNvbHVtblxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29sdW1uSW5mbyh5OiBudW1iZXIsIHg6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgd2hpbGUgKHkgPj0gMCAmJiB0aGlzLm1hdHJpeFt5XVt4XSAmIDEpIHtcclxuICAgICAgICAgICAgeS0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZW1wdHlUaWxlc0luQ29sdW1uID0gMTtcclxuICAgICAgICB3aGlsZSAoeSArIGVtcHR5VGlsZXNJbkNvbHVtbiA8IDkgJiYgdGhpcy5tYXRyaXhbeSArIGVtcHR5VGlsZXNJbkNvbHVtbiArIDFdW3hdICYgMSkge1xyXG4gICAgICAgICAgICBlbXB0eVRpbGVzSW5Db2x1bW4rKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgc3VtOiAodGhpcy5tYXRyaXhbeV1beF0gPj4gNykgJiA2MywgdGlsZUFtb3VudDogZW1wdHlUaWxlc0luQ29sdW1uIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFJvd0luZm8oeTogbnVtYmVyLCB4OiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIHdoaWxlICh4ID49IDAgJiYgdGhpcy5tYXRyaXhbeV1beF0gJiAxKSB7XHJcbiAgICAgICAgICAgIHgtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVtcHR5VGlsZXNJblJvdyA9IDE7XHJcbiAgICAgICAgd2hpbGUgKHggKyBlbXB0eVRpbGVzSW5Sb3cgPCA5ICYmIHRoaXMubWF0cml4W3ldW3ggKyBlbXB0eVRpbGVzSW5Sb3cgKyAxXSAmIDEpIHtcclxuICAgICAgICAgICAgZW1wdHlUaWxlc0luUm93Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IHN1bTogKHRoaXMubWF0cml4W3ldW3hdID4+IDEpICYgNjMsIHRpbGVBbW91bnQ6IGVtcHR5VGlsZXNJblJvdyB9O1xyXG4gICAgICAgIC8vIHJldHVybiBbKHRoaXMubWF0cml4W3ldW3hdID4+IDEpICYgNjMsIGVtcHR5VGlsZXNJblJvd107XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cclxuY29uc3QgZWFzeTE6IG51bWJlcltdW10gPSBbXHJcbiAgICBbMCwgMCwgNDUsIDMsIDAsIDAsIDAsIDMsIDQ1LCAwXSxcclxuICAgIFswLCAxNy4wOCwgMSwgMSwgMCwgMTYsIDQuMDMsIDEsIDEsIDBdLFxyXG4gICAgWzAuMTEsIDEsIDEsIDEsIDE2LjE3LCAxLCAxLCAxLCAxLCAxN10sXHJcbiAgICBbMC4xNywgMSwgMSwgMy4xNywgMSwgMSwgMSwgMC4xNiwgMSwgMV0sXHJcbiAgICBbMCwgMC4xOCwgMSwgMSwgMSwgMCwgMCwgMTcuMTMsIDEsIDFdLFxyXG4gICAgWzAsIDE3LjA0LCAxLCAxLCAwLCAwLCAzLjExLCAxLCAxLCAwXSxcclxuICAgIFswLjA5LCAxLCAxLCAwLCAxNiwgMy4xNiwgMSwgMSwgMSwgNF0sXHJcbiAgICBbMC4xNCwgMSwgMSwgMy4xLCAxLCAxLCAxLCAxNi4xMiwgMSwgMV0sXHJcbiAgICBbMCwgMC4xOSwgMSwgMSwgMSwgMSwgMC4xOCwgMSwgMSwgMV0sXHJcbiAgICBbMCwgMC4wNSwgMSwgMSwgMCwgMCwgMC4xLCAxLCAxLCAwXSxcclxuXTtcclxuXHJcbmNvbnN0IG1lZGl1bTI6IG51bWJlcltdW10gPSBbXHJcbiAgICBbMCwgMCwgMjksIDQsIDAsIDcsIDM0LCAxNiwgMCwgMF0sXHJcbiAgICBbMCwgMC4wOCwgMSwgMSwgMy4xNywgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICBbMCwgMy4zMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICBbMC4xLCAxLCAxLCAyNC4xLCAxLCAxLCAxLCAyNCwgMCwgMF0sXHJcbiAgICBbMC4xNiwgMSwgMSwgMSwgMTUsIDAuMTMsIDEsIDEsIDAsIDBdLFxyXG4gICAgWzAsIDAsIDAuMTMsIDEsIDEsIDAuMTYsIDEsIDEsIDEwLCAxNl0sXHJcbiAgICBbMCwgMCwgMC4xLCAxLCAxLCAyNCwgMy4xNiwgMSwgMSwgMV0sXHJcbiAgICBbMCwgMCwgMCwgMTcuMTQsIDEsIDEsIDEsIDE3LjExLCAxLCAxXSxcclxuICAgIFswLCAwLCAwLjMsIDEsIDEsIDEsIDEsIDEsIDEsIDBdLFxyXG4gICAgWzAsIDAsIDAuMTgsIDEsIDEsIDEsIDAuMTMsIDEsIDEsIDBdLFxyXG5dO1xyXG4iLCJjbGFzcyBWaWV3IHtcclxuICAgIGJvYXJkOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHRpbGVTaXplOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvYXJkU2lkZUxlbmd0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBib3JkZXJSYWRpdXM6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHJpdmF0ZSBib2FyZENvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuYm9yZGVyUmFkaXVzID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd0JvYXJkKG1hdHJpeDogbnVtYmVyW11bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZUNhbnZhcyhtYXRyaXgpO1xyXG4gICAgICAgIHRoaXMuX2RyYXdCYWNrZ3JvdW5kKCk7XHJcblxyXG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goKHRpbGUsIHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlQ29ybmVyWCA9IHggKiB0aGlzLnRpbGVTaXplO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVDb3JuZXJZID0geSAqIHRoaXMudGlsZVNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIHVucGxheWFibGUgdGlsZXMgd2l0aCBzdW1zXHJcbiAgICAgICAgICAgICAgICBpZiAoISh0aWxlICYgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3VtVG9SaWdodCA9ICh0aWxlID4+IDEpICYgNjM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bVRvUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoc3VtVG9SaWdodC50b1N0cmluZygpLCBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAyLCBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdW1Ub0Rvd24gPSAodGlsZSA+PiA3KSAmIDYzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW1Ub0Rvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoc3VtVG9Eb3duLnRvU3RyaW5nKCksIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDEsIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGVtcHR5LCBwbGF5YWJsZSB0aWxlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImxpZ2h0Z3JheVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgucmVjdChub2RlQ29ybmVyWCwgbm9kZUNvcm5lclksIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIGFscmVhZHkgc2FmZSBudW1iZXJzIGluIHRoZSB0aWxlcyAoZS5nLiBpZiB0aGUgdGlsZSBoYXMgMDAxMDAwMDAwMSB3cml0dGVuLCA3IGlzIHRoZSBvbmx5IG51bWJlciBsZWZ0IHRvIGJlIHBsYWNlZCBpbiB0aGUgdGlsZSlcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKS5sZW5ndGggPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzYWZlTnVtYmVyID0gdGlsZS50b1N0cmluZygyKS5zcGxpdChcIjFcIilbMV0ubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoc2FmZU51bWJlci50b1N0cmluZygpLCBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAwLCBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIG5vdGVkIG51bWJlcnMgaW4gdGhlIHRpbGVzXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA5OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0aWxlICYgKDIgKiogaSkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJncmV5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogKChpIC0gMSkgJSAzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogTWF0aC5mbG9vcigoaSArIDIpIC8gMylcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gXCJncmV5XCI7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmN0eC5maWxsVGV4dChcIjFcIiwgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMCwgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB0aGVyZSBuZWVkcyB0byBiZSBhIGxpdHRsZSBhZGp1c3RtZW50cyBiZWNhdXNlIG9mIHRoZSB3YXkgdGhlIGNhbnZhcyBkcmF3cyB0aGUgbnVtYmVycyBidXQgdGhhdCBpcyBwdXJlbHkgY29zbWV0aWNcclxuICAgICAgICB0aGlzLl9kcmF3R3JpZGxpbmVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY3JlYXRlQ2FudmFzKG1hdHJpeDogbnVtYmVyW11bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuaWQgPSBcImJvYXJkXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5ib3hTaGFkb3cgPSBcIjVweCA1cHggMjBweCBncmF5XCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5ib3JkZXJSYWRpdXMgPSB0aGlzLmJvcmRlclJhZGl1cyArIFwiJVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUubWFyZ2luID0gXCIxJVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQud2lkdGggPSB0aGlzLmJvYXJkQ29udGFpbmVyLmNsaWVudFdpZHRoICogMC45ODtcclxuICAgICAgICB0aGlzLmJvYXJkLmhlaWdodCA9IHRoaXMuYm9hcmRDb250YWluZXIuY2xpZW50SGVpZ2h0ICogMC45ODtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmJvYXJkKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmJvYXJkLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLmJvYXJkU2lkZUxlbmd0aCA9IHRoaXMuYm9hcmQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdGhpcy50aWxlU2l6ZSA9IHRoaXMuYm9hcmRTaWRlTGVuZ3RoIC8gbWF0cml4Lmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kcmF3QmFja2dyb3VuZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgdGhpcy5jdHgucm91bmRSZWN0KDAsIDAsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGgsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGgsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGggKiAodGhpcy5ib3JkZXJSYWRpdXMgLyAxMDApKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZHJhd0dyaWRsaW5lcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8PSB0aGlzLmJvYXJkU2lkZUxlbmd0aDsgbCArPSB0aGlzLnRpbGVTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhsLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKGwsIHRoaXMuYm9hcmRTaWRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIGwpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy5ib2FyZFNpZGVMZW5ndGgsIGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLnRpbGVTaXplIC8gMjU7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZXc7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IE1vZGVsIGZyb20gXCIuL21vZGVsXCI7XHJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXdcIjtcclxuXHJcbi8qKiBoYW5kbGVzIGFsbCBpbnB1dCwgY2hlY2tzIGluIHdpdGggbW9kZWwgYW5kIGRpc3BsYXlzIHRoZSByZXN1bHQgd2l0aCB2aWV3ICovXHJcblxyXG5jbGFzcyBDb250cm9sbGVyIHtcclxuICAgIG1vZGVsOiBNb2RlbDtcclxuICAgIHZpZXc6IFZpZXc7XHJcblxyXG4gICAgLy8gYnV0dG9uc1xyXG4gICAgc29sdmVCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWwoKTtcclxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLl9nZXREb21FbGVtZW50cygpO1xyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0RG9tRWxlbWVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2x2ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic29sdmVcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvbHZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc29sdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZVZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52aWV3LmRyYXdCb2FyZCh0aGlzLm1vZGVsLm1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy52aWV3LmJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHRoaXMuX2JvYXJkQ2xpY2tlZChldmVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JvYXJkQ2xpY2tlZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm9hcmQgY2xpY2tlZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYXBwID0gbmV3IENvbnRyb2xsZXIoKTtcclxuXHJcbi8vIFwibnBtIHJ1biBzdGFydFwiIGluIHRlcm1pbmFsIHRvIHN0YXJ0IGxpdmUgc2VydmVyXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
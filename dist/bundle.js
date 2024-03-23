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
     * the board is a 10x10 matrix
     * each tile is represented by a number (that should be thought of as binary)
     * 000000 000000 000000000
     * col    row    candidates
     * if the number is zero, the tile is unplayable
     * if the number is betweeen 1 and 511, the tile is playable
     * if the number the number is shifted to the right by 9, that's where the sum of the row is stored
     * if the number the number is shifted to the right by 9+6, that's where the sum of the column is stored
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
            var amountOfOnes = binCombination.toString(2).split("1").length - 1;
            var sum = 0;
            for (var j = 0; j < 9; j++) {
                if (binCombination & (Math.pow(2, j))) {
                    sum += j + 1;
                }
            }
            table[sum][amountOfOnes].push(binCombination);
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
        return;
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
        console.log(parseInt("1".repeat(6) + "0".repeat(9), 2));
        matrix.forEach(function (row, y) {
            row.forEach(function (tile, x) {
                var nodeCornerX = x * _this.tileSize;
                var nodeCornerY = y * _this.tileSize;
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
        var rowValue = (tile >> 9) & 63;
        if (rowValue) {
            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(rowValue.toString(), nodeCornerX + (this.tileSize / 3) * 2 - this.tilePadding / 2, nodeCornerY + (this.tileSize / 3) * 2 - this.tilePadding);
        }
        var colValue = tile >> 15;
        if (colValue) {
            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(colValue.toString(), nodeCornerX + (this.tileSize / 3) * 1, nodeCornerY + (this.tileSize / 3) * 3 - this.tilePadding);
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
        // the already safe numbers in the tiles (e.g. if the tile has 001 000 000 written, 7 is the only number left to be placed in the tile)
        var onlyPossibleNumber = tile.toString(2).split("1");
        if (onlyPossibleNumber.length === 2) {
            this.ctx.font = this.tileSize + "px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText((onlyPossibleNumber.toString()[1].length + 1).toString(), nodeCornerX + (this.tileSize / 3) * 0 + this.tilePadding * 3, nodeCornerY + (this.tileSize / 3) * 3 - this.tilePadding * 2);
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
        this.model = new _model__WEBPACK_IMPORTED_MODULE_0__.Model(_levels__WEBPACK_IMPORTED_MODULE_2__.levels.medium[0]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTSxNQUFNLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUNEO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEM7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkM7S0FDSjtJQUNELElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEIsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6QixPQUFPLEVBQUU7UUFDTDtZQUNJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxD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QyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsS0FBaUIsSUFBSyxZQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUF4QixDQUF3QixDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVPLGlDQUFZLEdBQXBCLFVBQXFCLEtBQWlCO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQztBQUVELElBQU0sR0FBRyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFFN0IsbURBQW1EIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL2xldmVscy50cyIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvbW9kZWwudHMiLCJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL3ZpZXcudHMiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBsZXZlbHMgPSB7XHJcbiAgICBlYXN5OiBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMCwgNDUsIDMsIDAsIDAsIDAsIDMsIDQ1LCAwXSxcclxuICAgICAgICAgICAgWzAsIDE3LjA4LCAxLCAxLCAwLCAxNiwgNC4wMywgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLjExLCAxLCAxLCAxLCAxNi4xNywgMSwgMSwgMSwgMSwgMTddLFxyXG4gICAgICAgICAgICBbMC4xNywgMSwgMSwgMy4xNywgMSwgMSwgMSwgMC4xNiwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLjE4LCAxLCAxLCAxLCAwLCAwLCAxNy4xMywgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAxNy4wNCwgMSwgMSwgMCwgMCwgMy4xMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLjA5LCAxLCAxLCAwLCAxNiwgMy4xNiwgMSwgMSwgMSwgNF0sXHJcbiAgICAgICAgICAgIFswLjE0LCAxLCAxLCAzLjEsIDEsIDEsIDEsIDE2LjEyLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAuMTksIDEsIDEsIDEsIDEsIDAuMTgsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMC4wNSwgMSwgMSwgMCwgMCwgMC4xLCAxLCAxLCAwXSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDIzLCAyOSwgNCwgMCwgMCwgMCwgMCwgMywgMTddLFxyXG4gICAgICAgICAgICBbMC4xNywgMSwgMSwgMSwgNCwgMCwgMzAsIDE3LjEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4yMSwgMSwgMSwgMSwgMSwgNC4yNCwgMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjE0LCAxLCAxLCAxNi4yLCAxLCAxLCAxLCAxLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAuMTIsIDEsIDEsIDEwLjExLCAxLCAxLCAzLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMTEsIDEsIDEsIDE3LjEsIDEsIDEsIDMwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDE2LjEsIDEsIDEsIDQuMDgsIDEsIDEsIDddLFxyXG4gICAgICAgICAgICBbMCwgNCwgMy4yNCwgMSwgMSwgMSwgMSwgMTYuMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjEzLCAxLCAxLCAxLCAxLCAwLjE4LCAxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMDQsIDEsIDEsIDAsIDAsIDAsIDAuMiwgMSwgMSwgMV0sXHJcbiAgICAgICAgXSxcclxuICAgIF0sXHJcbiAgICBtZWRpdW06IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAwLCAyOSwgNCwgMCwgNywgMzQsIDE2LCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAuMDgsIDEsIDEsIDMuMTcsIDEsIDEsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMy4zMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLjEsIDEsIDEsIDI0LjEsIDEsIDEsIDEsIDI0LCAwLCAwXSxcclxuICAgICAgICAgICAgWzAuMTYsIDEsIDEsIDEsIDE1LCAwLjEzLCAxLCAxLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMTMsIDEsIDEsIDAuMTYsIDEsIDEsIDEwLCAxNl0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjEsIDEsIDEsIDI0LCAzLjE2LCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDE3LjE0LCAxLCAxLCAxLCAxNy4xMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjMsIDEsIDEsIDEsIDEsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMC4xOCwgMSwgMSwgMSwgMC4xMywgMSwgMSwgMF0sXHJcbiAgICAgICAgXSxcclxuICAgIF0sXHJcbiAgICBoYXJkOiBuZXcgQXJyYXkoMSksXHJcbiAgICBjaGFsbGVuZ2luZzogbmV3IEFycmF5KDEpLFxyXG4gICAgZXh0cmVtZTogW1xyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDAsIDAsIDAsIDksIDEyLCAwLCAxMiwgMzcsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMzcsIDguMDMsIDEsIDEsIDguMTUsIDEsIDEsIDldLFxyXG4gICAgICAgICAgICBbMCwgMTEuNDMsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4xNCwgMSwgMSwgMSwgNi4xMSwgMSwgMSwgMTAuMDQsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4xLCAxLCAxLCA5LjAzLCAxLCAxLCA3LjA0LCAxLCAxLCAwXSxcclxuICAgICAgICAgICAgWzAsIDAuMTUsIDEsIDEsIDEsIDI2LjEzLCAxLCAxLCAxLCAxNl0sXHJcbiAgICAgICAgICAgIFswLCAzLjA5LCAxLCAxLCA1LjEyLCAxLCAxLCAxMC4xMiwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjA5LCAxLCAxLCAxNC4wMywgMSwgMSwgMy4xNCwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjQsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMC4xLCAxLCAxLCAwLjA4LCAxLCAxLCAwLCAwLCAwXSxcclxuICAgICAgICBdLFxyXG4gICAgXSxcclxufTtcclxuIiwiZXhwb3J0IGNsYXNzIE1vZGVsIHtcclxuICAgIG1hdHJpeDogbnVtYmVyW11bXTtcclxuICAgIHN1bVRhYmxlOiBudW1iZXJbXVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IobGV2ZWw6IG51bWJlcltdW10pIHtcclxuICAgICAgICB0aGlzLm1hdHJpeCA9IHRoaXMuaW5pdEJpbmFyeU1hdHJpeChsZXZlbCk7XHJcbiAgICAgICAgdGhpcy5zdW1UYWJsZSA9IHRoaXMuaW5pdFN1bVRhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgYm9hcmQgaXMgYSAxMHgxMCBtYXRyaXhcclxuICAgICAqIGVhY2ggdGlsZSBpcyByZXByZXNlbnRlZCBieSBhIG51bWJlciAodGhhdCBzaG91bGQgYmUgdGhvdWdodCBvZiBhcyBiaW5hcnkpXHJcbiAgICAgKiAwMDAwMDAgMDAwMDAwIDAwMDAwMDAwMFxyXG4gICAgICogY29sICAgIHJvdyAgICBjYW5kaWRhdGVzXHJcbiAgICAgKiBpZiB0aGUgbnVtYmVyIGlzIHplcm8sIHRoZSB0aWxlIGlzIHVucGxheWFibGVcclxuICAgICAqIGlmIHRoZSBudW1iZXIgaXMgYmV0d2VlZW4gMSBhbmQgNTExLCB0aGUgdGlsZSBpcyBwbGF5YWJsZVxyXG4gICAgICogaWYgdGhlIG51bWJlciB0aGUgbnVtYmVyIGlzIHNoaWZ0ZWQgdG8gdGhlIHJpZ2h0IGJ5IDksIHRoYXQncyB3aGVyZSB0aGUgc3VtIG9mIHRoZSByb3cgaXMgc3RvcmVkXHJcbiAgICAgKiBpZiB0aGUgbnVtYmVyIHRoZSBudW1iZXIgaXMgc2hpZnRlZCB0byB0aGUgcmlnaHQgYnkgOSs2LCB0aGF0J3Mgd2hlcmUgdGhlIHN1bSBvZiB0aGUgY29sdW1uIGlzIHN0b3JlZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRCaW5hcnlNYXRyaXgobWF0cml4OiBudW1iZXJbXVtdKTogbnVtYmVyW11bXSB7XHJcbiAgICAgICAgbGV0IG5ld01hdHJpeDogYW55W11bXSA9IFtdO1xyXG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJvd0FycmF5OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByb3dBcnJheS5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93QXJyYXkucHVzaChwYXJzZUludChcIjFcIi5yZXBlYXQoOSksIDIpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGFsbCBvdGhlciBjYXNlcywgd2Ugc2VlIHRoZW0gYXMgYSBkZWNpbWFsIG51bWJlci5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSAwdGggYml0IGlzIDAsXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVuIHRoZSBuZXh0IDYgYml0IGluY3JpcHQgdGhlIHR3byBudW1iZXJzIHRvIHRoZSByaWdodCBvZiB0aGUgY29tbWEsXHJcbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIGxhc3QgNiBiaXQgaW5jcmlwdCB0aGUgdHdvIG51bWJlcnMgdG8gdGhlIGxlZnQgb2YgdGhlIGNvbW1hXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sQW5kUm93ID0gdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgIC50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHN1bSkgPT4gcGFyc2VJbnQoc3VtKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3cubGVuZ3RoICE9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXggYXQgeDogXCIgKyB4ICsgXCIgYW5kIHk6IFwiICsgeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93WzBdID4gNDUgfHwgY29sQW5kUm93WzBdID09IDIgfHwgY29sQW5kUm93WzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeDogc3VtIG9mIGNvbCBhdCB5OiBcIiArIHkgKyBcIiBhbmQgeDogXCIgKyB4ICsgXCIgaXMgZ2l2ZW4gYXMgXCIgKyBjb2xBbmRSb3dbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvd1sxXSA+IDQ1IHx8IGNvbEFuZFJvd1sxXSA9PSAyIHx8IGNvbEFuZFJvd1sxXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXg6IHN1bSBvZiByb3cgYXQgeTogXCIgKyB5ICsgXCIgYW5kIHg6IFwiICsgeCArIFwiIGlzIGdpdmVuIGFzIFwiICsgY29sQW5kUm93WzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByb3dBcnJheS5wdXNoKCgoY29sQW5kUm93WzBdIDw8IDYpIHwgKGNvbEFuZFJvd1sxXSA8PCAwKSkgPDwgOSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBuZXdNYXRyaXgucHVzaChyb3dBcnJheSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld01hdHJpeDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGkgd2FudCB0byBkbyBhIGdlbmVyYWwgdGFibGUgd2hlcmUgYWxsIHRoZSBjb21iaW5hdGlvbnMgb2YgMiB1cCB0byA5IG51bWJlcnMgYXJlIGxpc3RlZCBhbmQgdGhlIHN1bSBvZiB0aGVtIGlzIGNhbGN1bGF0ZWRcclxuICAgICAqIHRoZSByZXN1bHRpbmcgc3VtIGlzIHRoZSBpbmRleCBvZiB3aGVyZSB0byBmaW5kIHRoZXNlIGNvbWJpbmF0aW9ucyBpbiB0aGUgdGFibGVcclxuICAgICAqIGF0IHRoYXQgaW5kZXgsIHRoZSBjb21iaW5hdGlvbnMgYXJlIHN0b3JlZCBhcyBhIDkgYml0IG51bWJlciwgd2hlcmUgdGhlIGJpdCBpcyAxIGlmIHRoZSBudW1iZXIgaXMgaW4gdGhlIGNvbWJpbmF0aW9uXHJcbiAgICAgKiB0aGUgdGFibGUgaXMgYSA0NSBlbGVtZW50IGFycmF5XHJcbiAgICAgKiBhdCBlYWNoIGluZGV4LCB0aGUgYW1vdW50IG9mIG51bWJlcnMgdGhhdCBtYWtlIHVwIHRoZSBzdW0gaXMgc3RvcmVkIGF0IHRoZSBpbmRleCBvZiBpdCdzIGFtb3VudFxyXG4gICAgICogdGhlIG1hdHJpeCBsb29rcyBhcyBmb2xsb3dzOlxyXG4gICAgICpcclxuICAgICAqIFtbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMFxyXG4gICAgICogIFtdLCAgICAgICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgKiAgW10sICAgICAgICAgICAgICAgICAgICAgICAgIDJcclxuICAgICAqICBbW10sW10sWzNdXSwgICAgICAgICAgICAgICAgM1xyXG4gICAgICogIFtbXSxbXSxbNV1dLCAgICAgICAgICAgICAgICA0XHJcbiAgICAgKiAgW1tdLFtdLFs2LDldXSwgICAgICAgICAgICAgIDVcclxuICAgICAqICBbW10sW10sWzEwLDE3XSxbN11dXSAgICAgICAgNlxyXG4gICAgICogIFtbXSxbXSxbMzMsMTgsIDEyXSxbMTFdXSAgICA3XHJcbiAgICAgKiB0aGUgZmlyc3QgaW5kZXggaXMgdGhlIHN1bSAoIzQ1KSwgdGhlIHNlY29uZCBpbmRleCBpcyB0aGUgYW1vdW50IG9mIG51bWJlcnMgdGhhdCBtYWtlIHVwIHRoZSBzdW0oIzkpLFxyXG4gICAgICogZWFjaCBvZiB0aGUgbnVtYmVycyBmcm9tIHRoYXQgcG9pbnQgYXJlIG1lYW50IHRvIGJlIHJlYWQgaW4gYmluYXJ5LCBoYXZpbmcgYSAxIGV2ZXJ5d2hlcmUgdGhlIG51bWJlciBpcyBpbiB0aGUgY29tYmluYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0U3VtVGFibGUoKTogbnVtYmVyW11bXVtdIHtcclxuICAgICAgICAvLyBjcmVhdGUgYSA0NXg5eD8gZW1wdHkgYXJyYXlcclxuICAgICAgICBsZXQgdGFibGU6IG51bWJlcltdW11bXSA9IEFycmF5KDQ2KVxyXG4gICAgICAgICAgICAuZmlsbCgwKVxyXG4gICAgICAgICAgICAubWFwKCgpID0+XHJcbiAgICAgICAgICAgICAgICBBcnJheSgxMClcclxuICAgICAgICAgICAgICAgICAgICAuZmlsbCgwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKCkgPT4gW10pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGJpbkNvbWJpbmF0aW9uID0gMTsgYmluQ29tYmluYXRpb24gPD0gcGFyc2VJbnQoXCIxMTExMTExMTFcIiwgMik7IGJpbkNvbWJpbmF0aW9uKyspIHtcclxuICAgICAgICAgICAgbGV0IGFtb3VudE9mT25lcyA9IGJpbkNvbWJpbmF0aW9uLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKS5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBsZXQgc3VtID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA5OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChiaW5Db21iaW5hdGlvbiAmICgyICoqIGopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGogKyAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRhYmxlW3N1bV1bYW1vdW50T2ZPbmVzXS5wdXNoKGJpbkNvbWJpbmF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc29sdmVBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNoYW5nZXNNYWRlID0gdHJ1ZTtcclxuICAgICAgICB3aGlsZSAoY2hhbmdlc01hZGUpIHtcclxuICAgICAgICAgICAgbGV0IG9sZE1hdHJpeCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5tYXRyaXgpKTtcclxuICAgICAgICAgICAgdGhpcy5zb2x2ZVN0ZXAoKTtcclxuICAgICAgICAgICAgY2hhbmdlc01hZGUgPSBKU09OLnN0cmluZ2lmeShvbGRNYXRyaXgpICE9PSBKU09OLnN0cmluZ2lmeSh0aGlzLm1hdHJpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb2x2ZVN0ZXAoKTogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICAgICBwdWJsaWMgc29sdmVTdGVwKCk6IHZvaWQge1xyXG4gICAgLy8gICAgICAgICB0aGlzLm1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKHRpbGUgaW5zdGFuY2VvZiBVbnBsYXlhYmxlVGlsZSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgcm93SW5mbyA9IHRoaXMuZ2V0Um93SW5mbyh5LCB4KTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY29sSW5mbyA9IHRoaXMuZ2V0Q29sdW1uSW5mbyh5LCB4KTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gcHV0dGluZyBzb21lIG9mIHRoYXQgaW5mbyBpbnRvIHNwZWNpZmljIHZhcmlhYmxlcyBmb3IgYmV0dGVyIHJlYWRhYmlsaXR5IG1pZ2h0IGJlIGhlbHBmdWxcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBhbHNvLCBtYXliZSB0byBnZXQgcmlkIG9mIHRoZSBuZWNlc3NlaXR5IG9mIHRoZSAubnVtIGF0IHRoZSBlbmQgb2YgZWFjaCBtYXRyaXggY2FsbCwgSSBjb3VsZCBjb25zaWRlciBoYXZpbmcgdGhlIG1hdHJpeCBpbiB0aGUgZm9ybSBvZiBtYXRyaXg6IChVbnBsYXlhYmxlVGlsZSB8IG51bWJlcilbXVtdXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGFsbCBwZXJtdXRhdGlvbnMgd2l0aCBnaXZlbiB0aWxlIGFtb3VudCB0byBzdW1cclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgcm93UGVybXV0YXRpb25zID0gdGhpcy5zdW1UYWJsZVtyb3dJbmZvLnN1bV1bcm93SW5mby50aWxlQ29vcmRzLmxlbmd0aF07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGNvbFBlcm11dGF0aW9ucyA9IHRoaXMuc3VtVGFibGVbY29sSW5mby5zdW1dW2NvbEluZm8udGlsZUNvb3Jkcy5sZW5ndGhdO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICByb3dQZXJtdXRhdGlvbnMgPSByb3dQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gcGVybXV0YXRpb24gJiB0aWxlLm51bSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29sUGVybXV0YXRpb25zID0gY29sUGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IHBlcm11dGF0aW9uICYgdGlsZS5udW0pO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcm93IChvciBjb2x1bW4pIGlzIGFscmVhZHkgaGFzIGZpeGVkIHRpbGVzLCB0aGUgcGVybXV0YXRpb25zIGhhdmUgdG8gaW5jbHVkZSB0aGVzZSBmaXhlZCBudW1iZXJzXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGZpeGVkSW5Sb3cgPSAwO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHJvd0luZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5vbmx5UG9zc2libGVOdW1iZXIoKSAhPT0gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRJblJvdyB8PSB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBmaXhlZEluQ29sID0gMDtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb2xJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ub25seVBvc3NpYmxlTnVtYmVyKCkgIT09IDApIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkSW5Db2wgfD0gdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW07XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gZmlsdGVyIHRoZSBwZXJtdXRhdGlvbnMgYnkgdGhlIG51bWJlcnMgdGhhdCBhcmUgYWxyZWFkeSBmaXhlZCBpbiB0aGUgdGlsZSwgdGhlcmVmb3JlIGhhdmluZyB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgcGVybXV0YXRpb25cclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAoZml4ZWRJblJvdykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICByb3dQZXJtdXRhdGlvbnMgPSByb3dQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gKHBlcm11dGF0aW9uICYgZml4ZWRJblJvdykgPT09IGZpeGVkSW5Sb3cpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAoZml4ZWRJbkNvbCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xQZXJtdXRhdGlvbnMgPSBjb2xQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gKHBlcm11dGF0aW9uICYgZml4ZWRJbkNvbCkgPT09IGZpeGVkSW5Db2wpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gZm9yIHRoaXMgY3VycmVudCB0aWxlLCB0aGUgcGVybXV0YXRpb25zIGFyZSBjb21iaW5lZCB0byBhIHN1cGVycG9zaXRpb25cclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY29tYmluZWRSb3dQZXJtdXRhdGlvbnMgPSB0aGlzLnJlZHVjZVRvU3VwZXJwb3NpdGlvbihyb3dQZXJtdXRhdGlvbnMpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGxldCBjb21iaW5lZENvbFBlcm11dGF0aW9ucyA9IHRoaXMucmVkdWNlVG9TdXBlcnBvc2l0aW9uKGNvbFBlcm11dGF0aW9ucyk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIHRoZSBzdXBlcnBvc2l0aW9uIGluY2x1ZGVzIHRoZSBhbGwgbGVmdG92ZXIgcGVybXV0YXRpb25zIGFmdGVyIGZpbHRlcmluZywgc28gdGhlIHBlcm11dGF0aW9ucyBpbiB0aGUgb3RoZXIgdGlsZXMgaW4gdGhlIHJvdyBhbmQgY29sdW1uIGNhbiBiZSByZWR1Y2VkXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcm93SW5mby50aWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtICY9IGNvbWJpbmVkUm93UGVybXV0YXRpb25zO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICBjb2xJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0gJj0gY29tYmluZWRDb2xQZXJtdXRhdGlvbnM7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGJvdGggc3VwZXJwb3NpdGlvbnMgYXJlIGJlaW5nIGNvbWJpbmVkIGFuZCB0aGVuIGFwcGxpZWQgdG8gdGhlIHRpbGVcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aWxlLm51bSAmPSBjb21iaW5lZFJvd1Blcm11dGF0aW9ucyAmIGNvbWJpbmVkQ29sUGVybXV0YXRpb25zO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnN1ZG9rdVJ1bGVzKHksIHgpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dpbmcgY29uc29sZSBsb2dzXHJcblxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGlmICh5IDwgMyAmJiB4ID09IDYpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgICBcInk6IFwiICtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB5ICtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBcIiB4OiBcIiArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgeCArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCJjdXJyZW50IFN0YXRlIG9mIHRpbGU6IFwiICtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB0aWxlLm51bS50b1N0cmluZygyKSArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgcm93SW5mby50aWxlQ29vcmRzLmxlbmd0aCArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCIgdGlsZXMgaW4gdGhpcyByb3cgc3VtIHRvIFwiICtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICByb3dJbmZvLnN1bSArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCJcXG5wb3NzaWJsZSByb3dQZXJtdXRhdGlvbnMgXCIgK1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJvd1Blcm11dGF0aW9ucy5tYXAoKGVsKSA9PiBlbC50b1N0cmluZygyKSkgK1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIFwiXFxuY29tYmluZWRSb3dQZXJtdXRhdGlvbnMgXCIgK1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbWJpbmVkUm93UGVybXV0YXRpb25zLnRvU3RyaW5nKDIpICtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjb2xJbmZvLnRpbGVDb29yZHMubGVuZ3RoICtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBcIiB0aWxlcyBpbiB0aGlzIGNvbHVtbiBzdW0gdG8gXCIgK1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbEluZm8uc3VtICtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBcIlxcbnBvc3NpYmxlIGNvbFBlcm11dGF0aW9ucyBcIiArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29sUGVybXV0YXRpb25zLm1hcCgoZWwpID0+IGVsLnRvU3RyaW5nKDIpKSArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCJcXG5jb21iaW5lZENvbFBlcm11dGF0aW9ucyBcIiArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29tYmluZWRDb2xQZXJtdXRhdGlvbnMudG9TdHJpbmcoMilcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyAgICAgKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBwcml2YXRlIHJlZHVjZVRvU3VwZXJwb3NpdGlvbihwZXJtdXRhdGlvbnM6IG51bWJlcltdKTogbnVtYmVyIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIHBlcm11dGF0aW9ucy5yZWR1Y2UoKGFjYywgY3VyKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICBhY2MgfD0gY3VyO1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgIC8vICAgICAgICAgfSwgMCk7XHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBwcml2YXRlIHN1ZG9rdVJ1bGVzKHk6IG51bWJlciwgeDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAvLyAgICAgICAgIC8vIHdlIGNoZWNrLCBob3cgbWFueSBwb3NzaWJsZSBudW1iZXJzIHRoZSBjdXJyZW50IHRpbGUgaGFzXHJcbiAgICAvLyAgICAgICAgIC8vIGlmIHRoZSB0aWxlIGlzIGFscmVhZHkgZml4ZWQsIGl0IHNob3VsZCByZXR1cm4gMSBudW1iZXJcclxuICAgIC8vICAgICAgICAgbGV0IHBvc3NpYmxlTnVtYmVycyA9IHRoaXMubWF0cml4W3ldW3hdLm51bS50b1N0cmluZygyKS5zcGxpdChcIjFcIikubGVuZ3RoIC0gMTtcclxuXHJcbiAgICAvLyAgICAgICAgIGxldCBjb2xJbmZvID0gdGhpcy5nZXRDb2x1bW5JbmZvKHksIHgpO1xyXG4gICAgLy8gICAgICAgICBjb2xJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIC8vIHdpdGhpbiB0aGlzIGlmLCB0aGVyZSBtaWdodCBiZSBhIHdheSB0byBmaXgvaW5jbHVkZSB0aGUgc29sdXRpb24gOCBmb3IgdGhlIHRpbGUgYXQgeTogMSBhbmQgeDogNiBvbiBtZWRpdW1bMF1cclxuICAgIC8vICAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSA9PT0gdGhpcy5tYXRyaXhbeV1beF0ubnVtKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcG9zc2libGVOdW1iZXJzIC09IDE7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICBpZiAocG9zc2libGVOdW1iZXJzID09PSAwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb2xJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbeV1beF0ubnVtID09IHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtKSByZXR1cm47XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0gJj0gfnRoaXMubWF0cml4W3ldW3hdLm51bTtcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICBwb3NzaWJsZU51bWJlcnMgPSB0aGlzLm1hdHJpeFt5XVt4XS5udW0udG9TdHJpbmcoMikuc3BsaXQoXCIxXCIpLmxlbmd0aCAtIDE7XHJcbiAgICAvLyAgICAgICAgIGxldCByb3dJbmZvID0gdGhpcy5nZXRSb3dJbmZvKHksIHgpO1xyXG4gICAgLy8gICAgICAgICByb3dJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSA9PT0gdGhpcy5tYXRyaXhbeV1beF0ubnVtKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcG9zc2libGVOdW1iZXJzIC09IDE7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICBpZiAocG9zc2libGVOdW1iZXJzID09PSAwKSB7XHJcbiAgICAvLyAgICAgICAgICAgICByb3dJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbeV1beF0ubnVtID09IHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtKSByZXR1cm47XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0gJj0gfnRoaXMubWF0cml4W3ldW3hdLm51bTtcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIC8qKlxyXG4gICAgLy8gICAgICAqIGxvb3BzIHVwIHRvIGZpbmQgdGhlIHN1bSBvZiB0aGUgY29sdW1uXHJcbiAgICAvLyAgICAgICogbG9vcHMgZG93biBmcm9tIHRoZXJlIHRvIGZpbmQgdGhlIGVtcHR5IHRpbGVzIGJlbG93IHRoYXQgc3VtXHJcbiAgICAvLyAgICAgICogQHJldHVybnMgYXJyYXkgd2l0aCB0aGUgc3VtIHRvIHRoZSByaWdodCBhbmQgdGhlIGFtb3VudCBvZiBlbXB0eSB0aWxlcyBpbiB0aGUgY29sdW1uXHJcbiAgICAvLyAgICAgICovXHJcbiAgICAvLyAgICAgcHJpdmF0ZSBnZXRDb2x1bW5JbmZvKHk6IG51bWJlciwgeDogbnVtYmVyKTogYW55IHtcclxuICAgIC8vICAgICAgICAgd2hpbGUgKHkgPj0gMCAmJiB0aGlzLm1hdHJpeFt5XVt4XSBpbnN0YW5jZW9mIFBsYXlhYmxlVGlsZSkge1xyXG4gICAgLy8gICAgICAgICAgICAgeS0tO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGxldCB0aWxlc0luZm8gPSBbXTtcclxuICAgIC8vICAgICAgICAgd2hpbGUgKHkgKyB0aWxlc0luZm8ubGVuZ3RoIDwgOSAmJiB0aGlzLm1hdHJpeFt5ICsgdGlsZXNJbmZvLmxlbmd0aCArIDFdW3hdIGluc3RhbmNlb2YgUGxheWFibGVUaWxlKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aWxlc0luZm8ucHVzaCh7IHk6IHkgKyB0aWxlc0luZm8ubGVuZ3RoICsgMSwgeDogeCB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgcmV0dXJuIHsgc3VtOiB0aGlzLm1hdHJpeFt5XVt4XS5jb2xTdW0sIHRpbGVDb29yZHM6IHRpbGVzSW5mbyB9O1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgcHJpdmF0ZSBnZXRSb3dJbmZvKHk6IG51bWJlciwgeDogbnVtYmVyKTogYW55IHtcclxuICAgIC8vICAgICAgICAgd2hpbGUgKHggPj0gMCAmJiB0aGlzLm1hdHJpeFt5XVt4XSBpbnN0YW5jZW9mIFBsYXlhYmxlVGlsZSkge1xyXG4gICAgLy8gICAgICAgICAgICAgeC0tO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGxldCB0aWxlc0luZm8gPSBbXTtcclxuICAgIC8vICAgICAgICAgd2hpbGUgKHggKyB0aWxlc0luZm8ubGVuZ3RoIDwgOSAmJiB0aGlzLm1hdHJpeFt5XVt4ICsgdGlsZXNJbmZvLmxlbmd0aCArIDFdIGluc3RhbmNlb2YgUGxheWFibGVUaWxlKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aWxlc0luZm8ucHVzaCh7IHk6IHksIHg6IHggKyB0aWxlc0luZm8ubGVuZ3RoICsgMSB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgcmV0dXJuIHsgc3VtOiB0aGlzLm1hdHJpeFt5XVt4XS5yb3dTdW0sIHRpbGVDb29yZHM6IHRpbGVzSW5mbyB9O1xyXG4gICAgLy8gICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRPRE86XHJcbiAqIC0gYWVzdGhldGljczogICAgICAgICAgICAgICAgbWFrZSB0aGUgY29sb3JzIHByZXR0aWVyIHRvIGxvb2sgYXQgaW4gdmlldyAobWF5YmUgb25seSBzaG93IGxpdHRsZSBudW1iZXJzIGlmIGFueSBzb3J0IG9mIHNvbHZpbmcgaGFzIGJlZW4gc3RhcnRlZClcclxuICogLSBhZXN0aGV0aWNzICsgbWVjaGFuaWNzOiAgICBhZnRlciBlYWNoIGNsaWNrIG9mIHRoZSBzb2x2ZVN0ZXAgYnV0dG9uLCBjb2xvciB0aGUgdGlsZXMgdGhhdCBoYXZlIGJlZW4gYWZmZWN0ZWQgYnkgdGhlIHNvbHZlIGNoYW5nZSBmdW5jdGlvbiAodGhpcyByZXF1aXJlcyB0byBzYXZlIGEgY29weSBvZiB0aGUgcHJldmlvdXMgc3RhdGUgb2YgdGhlIG1hdHJpeClcclxuICogLSBtZWNoYW5pY3M6ICAgICAgICAgICAgICAgICBtYWtlIGEgc29sdmVBbGwgYnV0dG9uIHRoYXQgcmVwZWF0ZWRseS9yZWN1cnNpdmVseSBjYWxscyB0aGUgc29sdmUgZnVuY3Rpb24gdW50aWwgbm8gbW9yZSBjaGFuZ2VzIGNhbiBiZSBtYWRlXHJcbiAqIC0gcmVhZGFiaWxpdHk6ICAgICAgICAgICAgICAgbWFrZSB0aGUgY29kZSBtb3JlIHJlYWRhYmxlIGJ5IHNwbGl0dGluZyB0aGUgc29sdmVTdGVwIGZ1bmN0aW9uIGludG8gc21hbGxlciBmdW5jdGlvbnMgaWYgcG9zc2libGVcclxuICogLSByZWFkYWJpbGl0eTogICAgICAgICAgICAgICBtYWtlIHRoZSBjb2RlIG1vcmUgcmVhZGFibGUgYnkgYWRkaW5nIGNvbW1lbnRzIHRvIHRoZSBjb2RlXHJcbiAqIC0gZXJyb3IgaGFuZGxpbmc6ICAgICAgICAgICAgYWRkIGVycm9yIGhhbmRsaW5nIGZvciB0aGUgY2FzZSB0aGF0IHRoZSBpbnB1dCBtYXRyaXggaXMgbm90IHZhbGlkXHJcbiAqIC0gZXJyb3IgaGFuZGxpbmc6ICAgICAgICAgICAgYWRkIGVycm9yIGhhbmRsaW5nIGZvciB0aGUgY2FzZSB0aGF0IHRoZSBzdW0gb2YgdGhlIHJvdyBvciB0aGUgY29sdW1uIGlzbid0IHZhbGlkXHJcbiAqIC0gcnVsZXM6ICAgICAgICAgICAgICAgICAgICAgZm9yIGVhc3lbMV0sIHNwZWNpZnkgYSBydWxlIHRoYXQsIGluIGNhc2Ugc29tZSBudW1iZXJzIGFyZSBhbHJlYWR5IGZpeGVkIGFzIHRoZSBmaW5hbCBudW1iZXJzLCByZWFwcGxpZXMgdGhlIHN1bVRhYmxlIChpZiB5b3UgaGF2ZSB0aHJlZSB0aWxlcyBpbiBhIHJvdyBhbmQgb25lIGlzIGFscmVhZHkgc2FmZSwgdGhlIHN1bSBvZiB0aGUgb3RoZXIgdHdvIHRpbGVzIGNhbiBiZSByZWNhbGN1bGF0ZWQgYW5kIHRlc3RlZCBhZ2FpbnN0IHRoZSBzdW1UYWJsZSlcclxuICogLSBydWxlczogICAgICAgICAgICAgICAgICAgICBmb3IgZWFzeVsxXSwgc3BlY2lmeSBhIHJ1bGUgdGhhdCBzb2x2ZXMgcm93IDIgYnkgcmVhbGl6aW5nIHRoYXQgb25seSA4IGFuZCA5IGFyZSBhbHJlYWR5IGZpeGVkIGZvciB0aGUgZmluYWwgcGVybXV0YXRpb24gYW5kIGFkanVzdCB0aGUgb3RoZXIgdGlsZXMgYWNjb3JkaW5nbHlcclxuICpcclxuICpcclxuICovXHJcbiIsImltcG9ydCB7IFRpbGUsIFBsYXlhYmxlVGlsZSwgVW5wbGF5YWJsZVRpbGUgfSBmcm9tIFwiLi90aWxlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmlldyB7XHJcbiAgICBib2FyZDogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICB0aWxlU2l6ZTogbnVtYmVyO1xyXG4gICAgdGlsZVBhZGRpbmc6IG51bWJlcjtcclxuICAgIHByaXZhdGUgYm9hcmRTaWRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvcmRlclJhZGl1czogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIGJvYXJkQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1jb250YWluZXJcIikgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ib3JkZXJSYWRpdXMgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3Qm9hcmQobWF0cml4OiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDYW52YXMobWF0cml4KTtcclxuICAgICAgICB0aGlzLmRyYXdCYWNrZ3JvdW5kKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcnNlSW50KFwiMVwiLnJlcGVhdCg2KSArIFwiMFwiLnJlcGVhdCg5KSwgMikpO1xyXG5cclxuICAgICAgICBtYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUNvcm5lclggPSB4ICogdGhpcy50aWxlU2l6ZTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlQ29ybmVyWSA9IHkgKiB0aGlzLnRpbGVTaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSB1bnBsYXlhYmxlIHRpbGVzIHdpdGggc3Vtc1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgJiA1MTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdQbGF5YWJsZVRpbGUodGlsZSwgbm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VW5wbGF5YWJsZVRpbGUodGlsZSwgbm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhd0dyaWRsaW5lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd1VucGxheWFibGVUaWxlKHRpbGU6IG51bWJlciwgbm9kZUNvcm5lclg6IG51bWJlciwgbm9kZUNvcm5lclk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCByb3dWYWx1ZSA9ICh0aWxlID4+IDkpICYgNjM7XHJcbiAgICAgICAgaWYgKHJvd1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgcm93VmFsdWUudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIgLSB0aGlzLnRpbGVQYWRkaW5nIC8gMixcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIgLSB0aGlzLnRpbGVQYWRkaW5nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY29sVmFsdWUgPSB0aWxlID4+IDE1O1xyXG4gICAgICAgIGlmIChjb2xWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChjb2xWYWx1ZS50b1N0cmluZygpLCBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAxLCBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAzIC0gdGhpcy50aWxlUGFkZGluZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29sVmFsdWUgJiYgcm93VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhub2RlQ29ybmVyWCwgbm9kZUNvcm5lclkpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8obm9kZUNvcm5lclggKyB0aGlzLnRpbGVTaXplLCBub2RlQ29ybmVyWSArIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLnRpbGVTaXplIC8gMjU7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3UGxheWFibGVUaWxlKHRpbGU6IG51bWJlciwgbm9kZUNvcm5lclg6IG51bWJlciwgbm9kZUNvcm5lclk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIC8vIGJhY2tncm91bmQgZm9yIHBsYXlhYmxlIHRpbGVcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImxpZ2h0Z3JheVwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnJlY3Qobm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZLCB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgIC8vIHRoZSBhbHJlYWR5IHNhZmUgbnVtYmVycyBpbiB0aGUgdGlsZXMgKGUuZy4gaWYgdGhlIHRpbGUgaGFzIDAwMSAwMDAgMDAwIHdyaXR0ZW4sIDcgaXMgdGhlIG9ubHkgbnVtYmVyIGxlZnQgdG8gYmUgcGxhY2VkIGluIHRoZSB0aWxlKVxyXG4gICAgICAgIGxldCBvbmx5UG9zc2libGVOdW1iZXIgPSB0aWxlLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKTtcclxuICAgICAgICBpZiAob25seVBvc3NpYmxlTnVtYmVyLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIChvbmx5UG9zc2libGVOdW1iZXIudG9TdHJpbmcoKVsxXS5sZW5ndGggKyAxKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMCArIHRoaXMudGlsZVBhZGRpbmcgKiAzLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMyAtIHRoaXMudGlsZVBhZGRpbmcgKiAyXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRoZSBjYW5kaWRhdGUgbnVtYmVycyBpbiB0aGUgdGlsZXNcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoISh0aWxlICYgKDIgKiogaSkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImdyZXlcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICAoaSArIDEpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAoaSAlIDMpICsgdGhpcy50aWxlUGFkZGluZyxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIE1hdGguZmxvb3IoKGkgKyAzKSAvIDMpIC0gdGhpcy50aWxlUGFkZGluZ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUNhbnZhcyhtYXRyaXg6IG51bWJlcltdW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLmJvYXJkLmlkID0gXCJib2FyZFwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUuYm94U2hhZG93ID0gXCI1cHggNXB4IDIwcHggZ3JheVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUuYm9yZGVyUmFkaXVzID0gdGhpcy5ib3JkZXJSYWRpdXMgKyBcIiVcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLm1hcmdpbiA9IFwiMSVcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLndpZHRoID0gdGhpcy5ib2FyZENvbnRhaW5lci5jbGllbnRXaWR0aCAqIDAuOTg7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5oZWlnaHQgPSB0aGlzLmJvYXJkQ29udGFpbmVyLmNsaWVudEhlaWdodCAqIDAuOTg7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5ib2FyZCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5ib2FyZC5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5ib2FyZFNpZGVMZW5ndGggPSB0aGlzLmJvYXJkLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIHRoaXMudGlsZVNpemUgPSB0aGlzLmJvYXJkU2lkZUxlbmd0aCAvIG1hdHJpeC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy50aWxlUGFkZGluZyA9IHRoaXMudGlsZVNpemUgLyAxNTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdCYWNrZ3JvdW5kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICB0aGlzLmN0eC5yb3VuZFJlY3QoMCwgMCwgdGhpcy5ib2FyZC5jbGllbnRXaWR0aCwgdGhpcy5ib2FyZC5jbGllbnRXaWR0aCwgdGhpcy5ib2FyZC5jbGllbnRXaWR0aCAqICh0aGlzLmJvcmRlclJhZGl1cyAvIDEwMCkpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdHcmlkbGluZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPD0gdGhpcy5ib2FyZFNpZGVMZW5ndGg7IGwgKz0gdGhpcy50aWxlU2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8obCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhsLCB0aGlzLmJvYXJkU2lkZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbygwLCBsKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHRoaXMuYm9hcmRTaWRlTGVuZ3RoLCBsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gdGhpcy50aWxlU2l6ZSAvIDI1O1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9tb2RlbFwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIi4vdmlld1wiO1xyXG5pbXBvcnQgeyBsZXZlbHMgfSBmcm9tIFwiLi9sZXZlbHNcIjtcclxuXHJcbi8qKiBoYW5kbGVzIGFsbCBpbnB1dCwgY2hlY2tzIGluIHdpdGggbW9kZWwgYW5kIGRpc3BsYXlzIHRoZSByZXN1bHQgd2l0aCB2aWV3ICovXHJcblxyXG5jbGFzcyBDb250cm9sbGVyIHtcclxuICAgIG1vZGVsOiBNb2RlbDtcclxuICAgIHZpZXc6IFZpZXc7XHJcblxyXG4gICAgLy8gYnV0dG9uc1xyXG4gICAgc29sdmVPbmVTdGVwQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHNvbHZlQWxsQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gbmV3IE1vZGVsKGxldmVscy5tZWRpdW1bMF0pO1xyXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0RG9tRWxlbWVudHMoKTtcclxuICAgICAgICB0aGlzLmluaXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERvbUVsZW1lbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29sdmVPbmVTdGVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x2ZS1zdGVwXCIpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMuc29sdmVBbGxCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvbHZlLWFsbFwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRFdmVudExpc3RlbmVycygpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvbHZlT25lU3RlcEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNvbHZlU3RlcCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2x2ZUFsbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNvbHZlQWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZpZXcuZHJhd0JvYXJkKHRoaXMubW9kZWwubWF0cml4KTtcclxuICAgICAgICB0aGlzLnZpZXcuYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4gdGhpcy5ib2FyZENsaWNrZWQoZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJvYXJkQ2xpY2tlZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm9hcmQgY2xpY2tlZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYXBwID0gbmV3IENvbnRyb2xsZXIoKTtcclxuXHJcbi8vIFwibnBtIHJ1biBzdGFydFwiIGluIHRlcm1pbmFsIHRvIHN0YXJ0IGxpdmUgc2VydmVyXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
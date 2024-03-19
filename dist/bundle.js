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
        this.matrix = this.initBinaryMatrix(medium2);
        this.sumTable = this.initSumTable();
        console.log(this.matrix);
        console.log(this.sumTable);
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
        var yTest = 3;
        var xTest = 6;
        if (!(this.matrix[yTest][xTest] & 1)) {
            console.log("tile is not playable");
            return;
        }
        var columnInfo = this._getColumnInfo(yTest, xTest);
        var rowInfo = this._getRowInfo(yTest, xTest);
        console.log("columnInfo: " + columnInfo + " rowInfo: " + rowInfo);
        this.matrix[yTest][xTest] = parseInt("1101111111", 2);
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
        return [(this.matrix[y][x] >> 7) & 63, emptyTilesInColumn];
    };
    Model.prototype._getRowInfo = function (y, x) {
        while (x >= 0 && this.matrix[y][x] & 1) {
            x--;
        }
        var emptyTilesInRow = 1;
        while (x + emptyTilesInRow < 9 && this.matrix[y][x + emptyTilesInRow + 1] & 1) {
            emptyTilesInRow++;
        }
        return [(this.matrix[y][x] >> 1) & 63, emptyTilesInRow];
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
                }
                // the empty, playable tiles
                if (tile & 1) {
                    _this.ctx.beginPath();
                    _this.ctx.fillStyle = "lightgray";
                    _this.ctx.rect(nodeCornerX, nodeCornerY, _this.tileSize, _this.tileSize);
                    _this.ctx.stroke();
                    _this.ctx.fill();
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
                }
            });
        });
        // there needs to be a little adjustments because of the way the canvas draws the numbers but that is purely cosmetic
        this._drawGridlines();
        // matrix.forEach((row, y) => {
        //     row.forEach((tile, x) => {
        //         let nodeCenterX = x * this.tileSize + this.tileSize / 2;
        //         let nodeCenterY = y * this.tileSize + this.tileSize / 2;
        //         if (tile === 1) {
        //             this.ctx.font = "30px Arial";
        //             this.ctx.fillStyle = "black";
        //             this.ctx.fillText("1", nodeCenterX, nodeCenterY);
        //         }
        //     });
        // });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3RDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ3RDLENBQUM7QUFFRixJQUFNLE9BQU8sR0FBZTtJQUN4QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN0QyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUs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QztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBQ3ZDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGdDQUFXLEdBQW5CO1FBQUEsaUJBR0M7UUFGRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQWlCLElBQUssWUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFTyxrQ0FBYSxHQUFyQixVQUFzQixLQUFpQjtRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUM7QUFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0FBRTdCLG1EQUFtRCIsInNvdXJjZXMiOlsid2VicGFjazovL2tha3Vyby8uL3NyYy9tb2RlbC50cyIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvdmlldy50cyIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTW9kZWwge1xyXG4gICAgbWF0cml4OiBudW1iZXJbXVtdO1xyXG4gICAgc3VtVGFibGU6IG51bWJlcltdW11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvLyBncnVuZHPDpHR6bGljaDogdW5zcGllbGJhciwgU3VtbWVuZmVsZCwgc3BpZWxiYXJcclxuICAgICAgICAvLyBJZGVlOiAxMyBiaXQgWmFobCAoYml0IDA6IHNwaWVsYmFyIGphIG9kZXIgbmVpbj8gYml0IDEtMTI6IFN1bW1lbmZlbGQpXHJcbiAgICAgICAgdGhpcy5tYXRyaXggPSB0aGlzLmluaXRCaW5hcnlNYXRyaXgobWVkaXVtMik7XHJcbiAgICAgICAgdGhpcy5zdW1UYWJsZSA9IHRoaXMuaW5pdFN1bVRhYmxlKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubWF0cml4KTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN1bVRhYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0QmluYXJ5TWF0cml4KG1hdHJpeDogbnVtYmVyW11bXSk6IG51bWJlcltdW10ge1xyXG4gICAgICAgIGxldCBiaW5hcnlNYXRyaXg6IG51bWJlcltdW10gPSBbXTtcclxuICAgICAgICBtYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBiaW5hcnlSb3c6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVJvdy5wdXNoKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluYXJ5Um93LnB1c2gocGFyc2VJbnQoXCIxXCIucmVwZWF0KDEwKSwgMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgYWxsIG90aGVyIGNhc2VzLCB3ZSBzZWUgdGhlbSBhcyBhIGRlY2ltYWwgbnVtYmVyLlxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIDB0aCBiaXQgaXMgMCxcclxuICAgICAgICAgICAgICAgIC8vIHRoZW4gdGhlIG5leHQgNiBiaXQgaW5jcmlwdCB0aGUgdHdvIG51bWJlcnMgdG8gdGhlIHJpZ2h0IG9mIHRoZSBjb21tYSxcclxuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgbGFzdCA2IGJpdCBpbmNyaXB0IHRoZSB0d28gbnVtYmVycyB0byB0aGUgbGVmdCBvZiB0aGUgY29tbWFcclxuICAgICAgICAgICAgICAgIGxldCBjb2xBbmRSb3cgPSB0aWxlXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCIuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoc3VtKSA9PiBwYXJzZUludChzdW0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvdy5sZW5ndGggIT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeCBhdCB4OiBcIiArIHggKyBcIiBhbmQgeTogXCIgKyB5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3dbMF0gPiA0NSB8fCBjb2xBbmRSb3dbMF0gPT0gMiB8fCBjb2xBbmRSb3dbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgaW5wdXQgbWF0cml4OiBzdW0gb2YgY29sIGF0IHg6IFwiICsgeCArIFwiIGFuZCB5OiBcIiArIHkgKyBcIiBpcyBnaXZlbiBhcyBcIiArIGNvbEFuZFJvd1swXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93WzFdID4gNDUgfHwgY29sQW5kUm93WzFdID09IDIgfHwgY29sQW5kUm93WzFdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeDogc3VtIG9mIHJvdyBhdCB4OiBcIiArIHggKyBcIiBhbmQgeTogXCIgKyB5ICsgXCIgaXMgZ2l2ZW4gYXMgXCIgKyBjb2xBbmRSb3dbMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjb2xBbmRSb3dCaW5hcnkgPSBjb2xBbmRSb3cubWFwKChzdW0pID0+IChcIjAwMDAwMFwiICsgc3VtLnRvU3RyaW5nKDIpKS5zbGljZSgtNikpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJpbmFyeSA9IHBhcnNlSW50KGNvbEFuZFJvd0JpbmFyeVswXSArIGNvbEFuZFJvd0JpbmFyeVsxXSwgMikgPDwgMTtcclxuICAgICAgICAgICAgICAgIGJpbmFyeVJvdy5wdXNoKGJpbmFyeSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBiaW5hcnlNYXRyaXgucHVzaChiaW5hcnlSb3cpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBiaW5hcnlNYXRyaXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpIHdhbnQgdG8gZG8gYSBnZW5lcmFsIHRhYmxlIHdoZXJlIGFsbCB0aGUgY29tYmluYXRpb25zIG9mIDIgdXAgdG8gOSBudW1iZXJzIGFyZSBsaXN0ZWQgYW5kIHRoZSBzdW0gb2YgdGhlbSBpcyBjYWxjdWxhdGVkXHJcbiAgICAgKiB0aGUgcmVzdWx0aW5nIHN1bSBpcyB0aGUgaW5kZXggb2Ygd2hlcmUgdG8gZmluZCB0aGVzZSBjb21iaW5hdGlvbnMgaW4gdGhlIHRhYmxlXHJcbiAgICAgKiBhdCB0aGF0IGluZGV4LCB0aGUgY29tYmluYXRpb25zIGFyZSBzdG9yZWQgYXMgYSA5IGJpdCBudW1iZXIsIHdoZXJlIHRoZSBiaXQgaXMgMSBpZiB0aGUgbnVtYmVyIGlzIGluIHRoZSBjb21iaW5hdGlvblxyXG4gICAgICogdGhlIHRhYmxlIGlzIGEgNDUgZWxlbWVudCBhcnJheVxyXG4gICAgICogYXQgZWFjaCBpbmRleCwgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtIGlzIHN0b3JlZCBhdCB0aGUgaW5kZXggb2YgaXQncyBhbW91bnRcclxuICAgICAqIHRoZSBtYXRyaXggbG9va3MgYXMgZm9sbG93czpcclxuICAgICAqXHJcbiAgICAgKiBbW10sICAgICAgICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAqICBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICogIFtdLCAgICAgICAgICAgICAgICAgICAgICAgICAyXHJcbiAgICAgKiAgW1tdLFtdLFszXV0sICAgICAgICAgICAgICAgIDNcclxuICAgICAqICBbW10sW10sWzVdXSwgICAgICAgICAgICAgICAgNFxyXG4gICAgICogIFtbXSxbXSxbNiw5XV0sICAgICAgICAgICAgICA1XHJcbiAgICAgKiAgW1tdLFtdLFsxMCwxN10sWzddXV0gICAgICAgIDZcclxuICAgICAqICBbW10sW10sWzMzLDE4LCAxMl0sWzExXV0gICAgN1xyXG4gICAgICogdGhlIGZpcnN0IGluZGV4IGlzIHRoZSBzdW0gKCM0NSksIHRoZSBzZWNvbmQgaW5kZXggaXMgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtKCM5KSxcclxuICAgICAqIGVhY2ggb2YgdGhlIG51bWJlcnMgZnJvbSB0aGF0IHBvaW50IGFyZSBtZWFudCB0byBiZSByZWFkIGluIGJpbmFyeSwgaGF2aW5nIGEgMSBldmVyeXdoZXJlIHRoZSBudW1iZXIgaXMgaW4gdGhlIGNvbWJpbmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGluaXRTdW1UYWJsZSgpOiBudW1iZXJbXVtdW10ge1xyXG4gICAgICAgIGxldCB0YWJsZTogbnVtYmVyW11bXVtdID0gQXJyYXkoNDYpXHJcbiAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgIC5tYXAoKCkgPT5cclxuICAgICAgICAgICAgICAgIEFycmF5KDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoKSA9PiBbXSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYmluYXJ5Q29tYmluYXRpb24gPSAzOyBiaW5hcnlDb21iaW5hdGlvbiA8PSBwYXJzZUludChcIjExMTExMTExMVwiLCAyKTsgYmluYXJ5Q29tYmluYXRpb24rKykge1xyXG4gICAgICAgICAgICBsZXQgYW1vdW50T2ZPbmVzID0gYmluYXJ5Q29tYmluYXRpb24udG9TdHJpbmcoMikuc3BsaXQoXCIxXCIpLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGlmIChhbW91bnRPZk9uZXMgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDk7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJpbmFyeUNvbWJpbmF0aW9uICYgKDIgKiogaikpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gaiArIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdW06IFwiICsgc3VtICsgXCIgYW1vdW50T2ZPbmVzOiBcIiArIGFtb3VudE9mT25lcyArIFwiIGJpbmFyeUNvbWJpbmF0aW9uOiBcIiArIGJpbmFyeUNvbWJpbmF0aW9uLnRvU3RyaW5nKDIpKTtcclxuICAgICAgICAgICAgdGFibGVbc3VtXVthbW91bnRPZk9uZXNdLnB1c2goYmluYXJ5Q29tYmluYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHNvbHZlKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB5VGVzdCA9IDM7XHJcbiAgICAgICAgbGV0IHhUZXN0ID0gNjtcclxuXHJcbiAgICAgICAgaWYgKCEodGhpcy5tYXRyaXhbeVRlc3RdW3hUZXN0XSAmIDEpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGlsZSBpcyBub3QgcGxheWFibGVcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb2x1bW5JbmZvID0gdGhpcy5fZ2V0Q29sdW1uSW5mbyh5VGVzdCwgeFRlc3QpO1xyXG4gICAgICAgIGxldCByb3dJbmZvID0gdGhpcy5fZ2V0Um93SW5mbyh5VGVzdCwgeFRlc3QpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29sdW1uSW5mbzogXCIgKyBjb2x1bW5JbmZvICsgXCIgcm93SW5mbzogXCIgKyByb3dJbmZvKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXRyaXhbeVRlc3RdW3hUZXN0XSA9IHBhcnNlSW50KFwiMTEwMTExMTExMVwiLCAyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGxvb3BzIHVwIHRvIGZpbmQgdGhlIHN1bSBvZiB0aGUgY29sdW1uXHJcbiAgICAgKiBsb29wcyBkb3duIGZyb20gdGhlcmUgdG8gZmluZCB0aGUgZW1wdHkgdGlsZXMgYmVsb3cgdGhhdCBzdW1cclxuICAgICAqIEByZXR1cm5zIGFycmF5IHdpdGggdGhlIHN1bSB0byB0aGUgcmlnaHQgYW5kIHRoZSBhbW91bnQgb2YgZW1wdHkgdGlsZXMgaW4gdGhlIGNvbHVtblxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29sdW1uSW5mbyh5OiBudW1iZXIsIHg6IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICB3aGlsZSAoeSA+PSAwICYmIHRoaXMubWF0cml4W3ldW3hdICYgMSkge1xyXG4gICAgICAgICAgICB5LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbXB0eVRpbGVzSW5Db2x1bW4gPSAxO1xyXG4gICAgICAgIHdoaWxlICh5ICsgZW1wdHlUaWxlc0luQ29sdW1uIDwgOSAmJiB0aGlzLm1hdHJpeFt5ICsgZW1wdHlUaWxlc0luQ29sdW1uICsgMV1beF0gJiAxKSB7XHJcbiAgICAgICAgICAgIGVtcHR5VGlsZXNJbkNvbHVtbisrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gWyh0aGlzLm1hdHJpeFt5XVt4XSA+PiA3KSAmIDYzLCBlbXB0eVRpbGVzSW5Db2x1bW5dO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRSb3dJbmZvKHk6IG51bWJlciwgeDogbnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHdoaWxlICh4ID49IDAgJiYgdGhpcy5tYXRyaXhbeV1beF0gJiAxKSB7XHJcbiAgICAgICAgICAgIHgtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVtcHR5VGlsZXNJblJvdyA9IDE7XHJcbiAgICAgICAgd2hpbGUgKHggKyBlbXB0eVRpbGVzSW5Sb3cgPCA5ICYmIHRoaXMubWF0cml4W3ldW3ggKyBlbXB0eVRpbGVzSW5Sb3cgKyAxXSAmIDEpIHtcclxuICAgICAgICAgICAgZW1wdHlUaWxlc0luUm93Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbKHRoaXMubWF0cml4W3ldW3hdID4+IDEpICYgNjMsIGVtcHR5VGlsZXNJblJvd107XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGVsO1xyXG5cclxuY29uc3QgZWFzeTE6IG51bWJlcltdW10gPSBbXHJcbiAgICBbMCwgMCwgNDUsIDMsIDAsIDAsIDAsIDMsIDQ1LCAwXSxcclxuICAgIFswLCAxNy4wOCwgMSwgMSwgMCwgMTYsIDQuMDMsIDEsIDEsIDBdLFxyXG4gICAgWzAuMTEsIDEsIDEsIDEsIDE2LjE3LCAxLCAxLCAxLCAxLCAxN10sXHJcbiAgICBbMC4xNywgMSwgMSwgMy4xNywgMSwgMSwgMSwgMC4xNiwgMSwgMV0sXHJcbiAgICBbMCwgMC4xOCwgMSwgMSwgMSwgMCwgMCwgMTcuMTMsIDEsIDFdLFxyXG4gICAgWzAsIDE3LjA0LCAxLCAxLCAwLCAwLCAzLjExLCAxLCAxLCAwXSxcclxuICAgIFswLjA5LCAxLCAxLCAwLCAxNiwgMy4xNiwgMSwgMSwgMSwgNF0sXHJcbiAgICBbMC4xNCwgMSwgMSwgMy4xLCAxLCAxLCAxLCAxNi4xMiwgMSwgMV0sXHJcbiAgICBbMCwgMC4xOSwgMSwgMSwgMSwgMSwgMC4xOCwgMSwgMSwgMV0sXHJcbiAgICBbMCwgMC4wNSwgMSwgMSwgMCwgMCwgMC4xLCAxLCAxLCAwXSxcclxuXTtcclxuXHJcbmNvbnN0IG1lZGl1bTI6IG51bWJlcltdW10gPSBbXHJcbiAgICBbMCwgMCwgMjksIDQsIDAsIDcsIDM0LCAxNiwgMCwgMF0sXHJcbiAgICBbMCwgMC4wOCwgMSwgMSwgMy4xNywgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICBbMCwgMy4zMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICBbMC4xLCAxLCAxLCAyNC4xLCAxLCAxLCAxLCAyNCwgMCwgMF0sXHJcbiAgICBbMC4xNiwgMSwgMSwgMSwgMTUsIDAuMTMsIDEsIDEsIDAsIDBdLFxyXG4gICAgWzAsIDAsIDAuMTMsIDEsIDEsIDAuMTYsIDEsIDEsIDEwLCAxNl0sXHJcbiAgICBbMCwgMCwgMC4xLCAxLCAxLCAyNCwgMy4xNiwgMSwgMSwgMV0sXHJcbiAgICBbMCwgMCwgMCwgMTcuMTQsIDEsIDEsIDEsIDE3LjExLCAxLCAxXSxcclxuICAgIFswLCAwLCAwLjMsIDEsIDEsIDEsIDEsIDEsIDEsIDBdLFxyXG4gICAgWzAsIDAsIDAuMTgsIDEsIDEsIDEsIDAuMTMsIDEsIDEsIDBdLFxyXG5dO1xyXG4iLCJjbGFzcyBWaWV3IHtcclxuICAgIGJvYXJkOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHRpbGVTaXplOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvYXJkU2lkZUxlbmd0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBib3JkZXJSYWRpdXM6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHJpdmF0ZSBib2FyZENvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuYm9yZGVyUmFkaXVzID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd0JvYXJkKG1hdHJpeDogbnVtYmVyW11bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZUNhbnZhcyhtYXRyaXgpO1xyXG4gICAgICAgIHRoaXMuX2RyYXdCYWNrZ3JvdW5kKCk7XHJcblxyXG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goKHRpbGUsIHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlQ29ybmVyWCA9IHggKiB0aGlzLnRpbGVTaXplO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVDb3JuZXJZID0geSAqIHRoaXMudGlsZVNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIHVucGxheWFibGUgdGlsZXMgd2l0aCBzdW1zXHJcbiAgICAgICAgICAgICAgICBpZiAoISh0aWxlICYgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3VtVG9SaWdodCA9ICh0aWxlID4+IDEpICYgNjM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bVRvUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoc3VtVG9SaWdodC50b1N0cmluZygpLCBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAyLCBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdW1Ub0Rvd24gPSAodGlsZSA+PiA3KSAmIDYzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW1Ub0Rvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoc3VtVG9Eb3duLnRvU3RyaW5nKCksIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDEsIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgZW1wdHksIHBsYXlhYmxlIHRpbGVzXHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSAmIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImxpZ2h0Z3JheVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LnJlY3Qobm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZLCB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0aWxlICYgKDIgKiogaSkpKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImdyZXlcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAoKGkgLSAxKSAlIDMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogTWF0aC5mbG9vcigoaSArIDIpIC8gMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplIC8gMy41ICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ3JleVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3R4LmZpbGxUZXh0KFwiMVwiLCBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAwLCBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHRoZXJlIG5lZWRzIHRvIGJlIGEgbGl0dGxlIGFkanVzdG1lbnRzIGJlY2F1c2Ugb2YgdGhlIHdheSB0aGUgY2FudmFzIGRyYXdzIHRoZSBudW1iZXJzIGJ1dCB0aGF0IGlzIHB1cmVseSBjb3NtZXRpY1xyXG4gICAgICAgIHRoaXMuX2RyYXdHcmlkbGluZXMoKTtcclxuXHJcbiAgICAgICAgLy8gbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgIC8vICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IG5vZGVDZW50ZXJYID0geCAqIHRoaXMudGlsZVNpemUgKyB0aGlzLnRpbGVTaXplIC8gMjtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBub2RlQ2VudGVyWSA9IHkgKiB0aGlzLnRpbGVTaXplICsgdGhpcy50aWxlU2l6ZSAvIDI7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgaWYgKHRpbGUgPT09IDEpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiMVwiLCBub2RlQ2VudGVyWCwgbm9kZUNlbnRlclkpO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAvLyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVDYW52YXMobWF0cml4OiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5pZCA9IFwiYm9hcmRcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLmJveFNoYWRvdyA9IFwiNXB4IDVweCAyMHB4IGdyYXlcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLmJvcmRlclJhZGl1cyA9IHRoaXMuYm9yZGVyUmFkaXVzICsgXCIlXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5tYXJnaW4gPSBcIjElXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC53aWR0aCA9IHRoaXMuYm9hcmRDb250YWluZXIuY2xpZW50V2lkdGggKiAwLjk4O1xyXG4gICAgICAgIHRoaXMuYm9hcmQuaGVpZ2h0ID0gdGhpcy5ib2FyZENvbnRhaW5lci5jbGllbnRIZWlnaHQgKiAwLjk4O1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuYm9hcmQpO1xyXG5cclxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuYm9hcmQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMuYm9hcmRTaWRlTGVuZ3RoID0gdGhpcy5ib2FyZC5jbGllbnRXaWR0aDtcclxuICAgICAgICB0aGlzLnRpbGVTaXplID0gdGhpcy5ib2FyZFNpZGVMZW5ndGggLyBtYXRyaXgubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RyYXdCYWNrZ3JvdW5kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICB0aGlzLmN0eC5yb3VuZFJlY3QoMCwgMCwgdGhpcy5ib2FyZC5jbGllbnRXaWR0aCwgdGhpcy5ib2FyZC5jbGllbnRXaWR0aCwgdGhpcy5ib2FyZC5jbGllbnRXaWR0aCAqICh0aGlzLmJvcmRlclJhZGl1cyAvIDEwMCkpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kcmF3R3JpZGxpbmVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDw9IHRoaXMuYm9hcmRTaWRlTGVuZ3RoOyBsICs9IHRoaXMudGlsZVNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKGwsIDApO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8obCwgdGhpcy5ib2FyZFNpZGVMZW5ndGgpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmJvYXJkU2lkZUxlbmd0aCwgbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMudGlsZVNpemUgLyAyNTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmlldztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgTW9kZWwgZnJvbSBcIi4vbW9kZWxcIjtcclxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlld1wiO1xyXG5cclxuLyoqIGhhbmRsZXMgYWxsIGlucHV0LCBjaGVja3MgaW4gd2l0aCBtb2RlbCBhbmQgZGlzcGxheXMgdGhlIHJlc3VsdCB3aXRoIHZpZXcgKi9cclxuXHJcbmNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgbW9kZWw6IE1vZGVsO1xyXG4gICAgdmlldzogVmlldztcclxuXHJcbiAgICAvLyBidXR0b25zXHJcbiAgICBzb2x2ZUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2dldERvbUVsZW1lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5faW5pdEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9nZXREb21FbGVtZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvbHZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x2ZVwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0RXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29sdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb2x2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlVmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZpZXcuZHJhd0JvYXJkKHRoaXMubW9kZWwubWF0cml4KTtcclxuICAgICAgICB0aGlzLnZpZXcuYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4gdGhpcy5fYm9hcmRDbGlja2VkKGV2ZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYm9hcmRDbGlja2VkKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJib2FyZCBjbGlja2VkXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBhcHAgPSBuZXcgQ29udHJvbGxlcigpO1xyXG5cclxuLy8gXCJucG0gcnVuIHN0YXJ0XCIgaW4gdGVybWluYWwgdG8gc3RhcnQgbGl2ZSBzZXJ2ZXJcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
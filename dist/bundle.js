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
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ "./src/tile.ts");

var Model = /** @class */ (function () {
    function Model(level) {
        this.matrix = this.initBinaryMatrix(level);
        this.sumTable = this.initSumTable();
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
                    throw new Error("invalid input matrix: sum of col at y: " + y + " and x: " + x + " is given as " + colAndRow[0]);
                }
                if (colAndRow[1] > 45 || colAndRow[1] == 2 || colAndRow[1] == 1) {
                    throw new Error("invalid input matrix: sum of row at y: " + y + " and x: " + x + " is given as " + colAndRow[1]);
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
        for (var binaryCombination = 1; binaryCombination <= parseInt("111111111", 2); binaryCombination++) {
            var amountOfOnes = binaryCombination.toString(2).split("1").length - 1;
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
        this.matrix.forEach(function (row, y) {
            row.forEach(function (tile, x) {
                if (tile instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.UnplayableTile) {
                    return;
                }
                var rowInfo = _this.getRowInfo(y, x);
                var colInfo = _this.getColumnInfo(y, x);
                // putting some of that info into specific variables for better readability might be helpful
                // also, maybe to get rid of the necesseity of the .num at the end of each matrix call, I could consider having the matrix in the form of matrix: (UnplayableTile | number)[][]
                // all permutations with given tile amount to sum
                var rowPermutations = _this.sumTable[rowInfo.sum][rowInfo.tileCoords.length];
                var colPermutations = _this.sumTable[colInfo.sum][colInfo.tileCoords.length];
                rowPermutations = rowPermutations.filter(function (permutation) { return permutation & tile.num; });
                colPermutations = colPermutations.filter(function (permutation) { return permutation & tile.num; });
                // if the row (or column) is already has fixed tiles, the permutations have to include these fixed numbers
                var fixedInRow = 0;
                rowInfo.tileCoords.forEach(function (coords) {
                    if (_this.matrix[coords.y][coords.x].onlyPossibleNumber() !== 0) {
                        fixedInRow |= _this.matrix[coords.y][coords.x].num;
                    }
                });
                var fixedInCol = 0;
                colInfo.tileCoords.forEach(function (coords) {
                    if (_this.matrix[coords.y][coords.x].onlyPossibleNumber() !== 0) {
                        fixedInCol |= _this.matrix[coords.y][coords.x].num;
                    }
                });
                // filter the permutations by the numbers that are already fixed in the tile, therefore having to be included in the final permutation
                if (fixedInRow) {
                    rowPermutations = rowPermutations.filter(function (permutation) { return (permutation & fixedInRow) === fixedInRow; });
                }
                if (fixedInCol) {
                    colPermutations = colPermutations.filter(function (permutation) { return (permutation & fixedInCol) === fixedInCol; });
                }
                // for this current tile, the permutations are combined to a superposition
                var combinedRowPermutations = _this.reduceToSuperposition(rowPermutations);
                var combinedColPermutations = _this.reduceToSuperposition(colPermutations);
                // the superposition includes the all leftover permutations after filtering, so the permutations in the other tiles in the row and column can be reduced
                rowInfo.tileCoords.forEach(function (coords) {
                    _this.matrix[coords.y][coords.x].num &= combinedRowPermutations;
                });
                colInfo.tileCoords.forEach(function (coords) {
                    _this.matrix[coords.y][coords.x].num &= combinedColPermutations;
                });
                // both superpositions are being combined and then applied to the tile
                tile.num &= combinedRowPermutations & combinedColPermutations;
                _this.sudokuRules(y, x);
                // debugging console logs
                // if (y < 3 && x == 6) {
                //     console.log(
                //         "y: " +
                //             y +
                //             " x: " +
                //             x +
                //             "\n" +
                //             "current State of tile: " +
                //             tile.num.toString(2) +
                //             "\n" +
                //             rowInfo.tileCoords.length +
                //             " tiles in this row sum to " +
                //             rowInfo.sum +
                //             "\npossible rowPermutations " +
                //             rowPermutations.map((el) => el.toString(2)) +
                //             "\ncombinedRowPermutations " +
                //             combinedRowPermutations.toString(2) +
                //             "\n" +
                //             colInfo.tileCoords.length +
                //             " tiles in this column sum to " +
                //             colInfo.sum +
                //             "\npossible colPermutations " +
                //             colPermutations.map((el) => el.toString(2)) +
                //             "\ncombinedColPermutations " +
                //             combinedColPermutations.toString(2)
                //     );
                // }
            });
        });
    };
    Model.prototype.reduceToSuperposition = function (permutations) {
        return permutations.reduce(function (acc, cur) {
            acc |= cur;
            return acc;
        }, 0);
    };
    Model.prototype.sudokuRules = function (y, x) {
        var _this = this;
        // we check, how many possible numbers the current tile has
        // if the tile is already fixed, it should return 1 number
        var possibleNumbers = this.matrix[y][x].num.toString(2).split("1").length - 1;
        var colInfo = this.getColumnInfo(y, x);
        colInfo.tileCoords.forEach(function (coords) {
            // within this if, there might be a way to fix/include the solution 8 for the tile at y: 1 and x: 6 on medium[0]
            if (_this.matrix[coords.y][coords.x].num === _this.matrix[y][x].num) {
                possibleNumbers -= 1;
            }
        });
        if (possibleNumbers === 0) {
            colInfo.tileCoords.forEach(function (coords) {
                if (_this.matrix[y][x].num == _this.matrix[coords.y][coords.x].num)
                    return;
                _this.matrix[coords.y][coords.x].num &= ~_this.matrix[y][x].num;
            });
        }
        possibleNumbers = this.matrix[y][x].num.toString(2).split("1").length - 1;
        var rowInfo = this.getRowInfo(y, x);
        rowInfo.tileCoords.forEach(function (coords) {
            if (_this.matrix[coords.y][coords.x].num === _this.matrix[y][x].num) {
                possibleNumbers -= 1;
            }
        });
        if (possibleNumbers === 0) {
            rowInfo.tileCoords.forEach(function (coords) {
                if (_this.matrix[y][x].num == _this.matrix[coords.y][coords.x].num)
                    return;
                _this.matrix[coords.y][coords.x].num &= ~_this.matrix[y][x].num;
            });
        }
        return;
    };
    /**
     * loops up to find the sum of the column
     * loops down from there to find the empty tiles below that sum
     * @returns array with the sum to the right and the amount of empty tiles in the column
     */
    Model.prototype.getColumnInfo = function (y, x) {
        while (y >= 0 && this.matrix[y][x] instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.PlayableTile) {
            y--;
        }
        var tilesInfo = [];
        while (y + tilesInfo.length < 9 && this.matrix[y + tilesInfo.length + 1][x] instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.PlayableTile) {
            tilesInfo.push({ y: y + tilesInfo.length + 1, x: x });
        }
        return { sum: this.matrix[y][x].colSum, tileCoords: tilesInfo };
    };
    Model.prototype.getRowInfo = function (y, x) {
        while (x >= 0 && this.matrix[y][x] instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.PlayableTile) {
            x--;
        }
        var tilesInfo = [];
        while (x + tilesInfo.length < 9 && this.matrix[y][x + tilesInfo.length + 1] instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.PlayableTile) {
            tilesInfo.push({ y: y, x: x + tilesInfo.length + 1 });
        }
        return { sum: this.matrix[y][x].rowSum, tileCoords: tilesInfo };
    };
    return Model;
}());

/**
 * TODO:
 * - aesthetics:                make the colors prettier to look at in view (maybe only show little numbers if any sort of solving has been started)
 * - aesthetics + mechanics:    after each click of the solve button, color the tiles that have been affected by the solve change function (this requires to save a copy of the previous state of the matrix)
 * - mechanics:                 make a solveAll button that repeatedly/recursively calls the solve function until no more changes can be made
 * - readability:               make the code more readable by splitting the solve function into smaller functions if possible
 * - readability:               make the code more readable by adding comments to the code
 * - error handling:            add error handling for the case that the input matrix is not valid
 * - error handling:            add error handling for the case that the sum of the row or the column isn't valid
 * - rules:                     for easy[1], specify a rule that, in case some numbers are already fixed as the final numbers, reapplies the sumTable (if you have three tiles in a row and one is already safe, the sum of the other two tiles can be recalculated and tested against the sumTable)
 * - rules:                     for easy[1], specify a rule that solves row 2 by realizing that only 8 and 9 are already fixed for the final permutation and adjust the other tiles accordingly
 */


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
    }
    return Tile;
}());

var PlayableTile = /** @class */ (function (_super) {
    __extends(PlayableTile, _super);
    function PlayableTile(num) {
        var _this = _super.call(this) || this;
        _this.num = num;
        return _this;
    }
    // 001000000 -> 7
    // 110110100 -> 0
    PlayableTile.prototype.onlyPossibleNumber = function () {
        if (this.num.toString(2).split("1").length > 2) {
            return 0;
        }
        return this.num.toString(2).split("1")[1].length + 1;
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
/* harmony export */   View: () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ "./src/tile.ts");

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
                var nodeCornerX = x * _this.tileSize;
                var nodeCornerY = y * _this.tileSize;
                // the unplayable tiles with sums
                if (tile instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.UnplayableTile) {
                    _this.drawUnplayableTile(tile, nodeCornerX, nodeCornerY);
                    return;
                }
                else {
                    _this.drawPlayableTile(tile, nodeCornerX, nodeCornerY);
                }
            });
        });
        this.drawGridlines();
    };
    View.prototype.drawUnplayableTile = function (tile, nodeCornerX, nodeCornerY) {
        var sumRight = tile.rowSum;
        if (sumRight) {
            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(sumRight.toString(), nodeCornerX + (this.tileSize / 3) * 2 - this.tilePadding / 2, nodeCornerY + (this.tileSize / 3) * 2 - this.tilePadding);
        }
        var sumDown = tile.colSum;
        if (sumDown) {
            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(sumDown.toString(), nodeCornerX + (this.tileSize / 3) * 1, nodeCornerY + (this.tileSize / 3) * 3 - this.tilePadding);
        }
        if (sumDown && sumRight) {
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
        // the already safe numbers in the tiles (e.g. if the tile has 0010000001 written, 7 is the only number left to be placed in the tile)
        var onlyPossibleNumber = tile.onlyPossibleNumber();
        if (onlyPossibleNumber) {
            this.ctx.font = this.tileSize + "px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(onlyPossibleNumber.toString(), nodeCornerX + (this.tileSize / 3) * 0 + this.tilePadding * 3, nodeCornerY + (this.tileSize / 3) * 3 - this.tilePadding * 2);
            return;
        }
        // the noted numbers in the tiles
        for (var i = 0; i < 9; i++) {
            if (!(tile.num & (Math.pow(2, i))))
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
        this.solveButton = document.getElementById("solve");
    };
    Controller.prototype.initEventListeners = function () {
        var _this = this;
        window.addEventListener("resize", function () {
            _this.updateView();
        });
        this.solveButton.addEventListener("click", function () {
            _this.model.solve();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTSxNQUFNLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUNEO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEM7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkM7S0FDSjtJQUNELElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEIsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6QixPQUFPLEVBQUU7UUFDTDtZQUNJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxD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SUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztBQUU3QixtREFBbUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvbGV2ZWxzLnRzIiwid2VicGFjazovL2tha3Vyby8uL3NyYy9tb2RlbC50cyIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvdGlsZS50cyIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvdmlldy50cyIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGxldmVscyA9IHtcclxuICAgIGVhc3k6IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAwLCA0NSwgMywgMCwgMCwgMCwgMywgNDUsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMTcuMDgsIDEsIDEsIDAsIDE2LCA0LjAzLCAxLCAxLCAwXSxcclxuICAgICAgICAgICAgWzAuMTEsIDEsIDEsIDEsIDE2LjE3LCAxLCAxLCAxLCAxLCAxN10sXHJcbiAgICAgICAgICAgIFswLjE3LCAxLCAxLCAzLjE3LCAxLCAxLCAxLCAwLjE2LCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAuMTgsIDEsIDEsIDEsIDAsIDAsIDE3LjEzLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDE3LjA0LCAxLCAxLCAwLCAwLCAzLjExLCAxLCAxLCAwXSxcclxuICAgICAgICAgICAgWzAuMDksIDEsIDEsIDAsIDE2LCAzLjE2LCAxLCAxLCAxLCA0XSxcclxuICAgICAgICAgICAgWzAuMTQsIDEsIDEsIDMuMSwgMSwgMSwgMSwgMTYuMTIsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMC4xOSwgMSwgMSwgMSwgMSwgMC4xOCwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLjA1LCAxLCAxLCAwLCAwLCAwLjEsIDEsIDEsIDBdLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMjMsIDI5LCA0LCAwLCAwLCAwLCAwLCAzLCAxN10sXHJcbiAgICAgICAgICAgIFswLjE3LCAxLCAxLCAxLCA0LCAwLCAzMCwgMTcuMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjIxLCAxLCAxLCAxLCAxLCA0LjI0LCAxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMTQsIDEsIDEsIDE2LjIsIDEsIDEsIDEsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMC4xMiwgMSwgMSwgMTAuMTEsIDEsIDEsIDMsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMC4xMSwgMSwgMSwgMTcuMSwgMSwgMSwgMzAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMTYuMSwgMSwgMSwgNC4wOCwgMSwgMSwgN10sXHJcbiAgICAgICAgICAgIFswLCA0LCAzLjI0LCAxLCAxLCAxLCAxLCAxNi4xLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMTMsIDEsIDEsIDEsIDEsIDAuMTgsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4wNCwgMSwgMSwgMCwgMCwgMCwgMC4yLCAxLCAxLCAxXSxcclxuICAgICAgICBdLFxyXG4gICAgXSxcclxuICAgIG1lZGl1bTogW1xyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDAsIDI5LCA0LCAwLCA3LCAzNCwgMTYsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMC4wOCwgMSwgMSwgMy4xNywgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAzLjMxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAuMSwgMSwgMSwgMjQuMSwgMSwgMSwgMSwgMjQsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMC4xNiwgMSwgMSwgMSwgMTUsIDAuMTMsIDEsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMC4xMywgMSwgMSwgMC4xNiwgMSwgMSwgMTAsIDE2XSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMSwgMSwgMSwgMjQsIDMuMTYsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMTcuMTQsIDEsIDEsIDEsIDE3LjExLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMywgMSwgMSwgMSwgMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjE4LCAxLCAxLCAxLCAwLjEzLCAxLCAxLCAwXSxcclxuICAgICAgICBdLFxyXG4gICAgXSxcclxuICAgIGhhcmQ6IG5ldyBBcnJheSgxKSxcclxuICAgIGNoYWxsZW5naW5nOiBuZXcgQXJyYXkoMSksXHJcbiAgICBleHRyZW1lOiBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMCwgOSwgMTIsIDAsIDEyLCAzNywgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAzNywgOC4wMywgMSwgMSwgOC4xNSwgMSwgMSwgOV0sXHJcbiAgICAgICAgICAgIFswLCAxMS40MywgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjE0LCAxLCAxLCAxLCA2LjExLCAxLCAxLCAxMC4wNCwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjEsIDEsIDEsIDkuMDMsIDEsIDEsIDcuMDQsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMC4xNSwgMSwgMSwgMSwgMjYuMTMsIDEsIDEsIDEsIDE2XSxcclxuICAgICAgICAgICAgWzAsIDMuMDksIDEsIDEsIDUuMTIsIDEsIDEsIDEwLjEyLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMDksIDEsIDEsIDE0LjAzLCAxLCAxLCAzLjE0LCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuNCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLjEsIDEsIDEsIDAuMDgsIDEsIDEsIDAsIDAsIDBdLFxyXG4gICAgICAgIF0sXHJcbiAgICBdLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBUaWxlLCBQbGF5YWJsZVRpbGUsIFVucGxheWFibGVUaWxlIH0gZnJvbSBcIi4vdGlsZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcclxuICAgIG1hdHJpeDogYW55W11bXTtcclxuICAgIHN1bVRhYmxlOiBudW1iZXJbXVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IobGV2ZWw6IG51bWJlcltdW10pIHtcclxuICAgICAgICB0aGlzLm1hdHJpeCA9IHRoaXMuaW5pdEJpbmFyeU1hdHJpeChsZXZlbCk7XHJcbiAgICAgICAgdGhpcy5zdW1UYWJsZSA9IHRoaXMuaW5pdFN1bVRhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEJpbmFyeU1hdHJpeChtYXRyaXg6IG51bWJlcltdW10pOiBUaWxlW11bXSB7XHJcbiAgICAgICAgbGV0IG5ld01hdHJpeDogYW55W11bXSA9IFtdO1xyXG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJvd0FycmF5OiBUaWxlW10gPSBbXTtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goKHRpbGUsIHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93QXJyYXkucHVzaChuZXcgVW5wbGF5YWJsZVRpbGUoMCwgMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93QXJyYXkucHVzaChuZXcgUGxheWFibGVUaWxlKHBhcnNlSW50KFwiMVwiLnJlcGVhdCg5KSwgMikpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGFsbCBvdGhlciBjYXNlcywgd2Ugc2VlIHRoZW0gYXMgYSBkZWNpbWFsIG51bWJlci5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSAwdGggYml0IGlzIDAsXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVuIHRoZSBuZXh0IDYgYml0IGluY3JpcHQgdGhlIHR3byBudW1iZXJzIHRvIHRoZSByaWdodCBvZiB0aGUgY29tbWEsXHJcbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIGxhc3QgNiBiaXQgaW5jcmlwdCB0aGUgdHdvIG51bWJlcnMgdG8gdGhlIGxlZnQgb2YgdGhlIGNvbW1hXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sQW5kUm93ID0gdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgIC50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHN1bSkgPT4gcGFyc2VJbnQoc3VtKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3cubGVuZ3RoICE9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXggYXQgeDogXCIgKyB4ICsgXCIgYW5kIHk6IFwiICsgeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93WzBdID4gNDUgfHwgY29sQW5kUm93WzBdID09IDIgfHwgY29sQW5kUm93WzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeDogc3VtIG9mIGNvbCBhdCB5OiBcIiArIHkgKyBcIiBhbmQgeDogXCIgKyB4ICsgXCIgaXMgZ2l2ZW4gYXMgXCIgKyBjb2xBbmRSb3dbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvd1sxXSA+IDQ1IHx8IGNvbEFuZFJvd1sxXSA9PSAyIHx8IGNvbEFuZFJvd1sxXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXg6IHN1bSBvZiByb3cgYXQgeTogXCIgKyB5ICsgXCIgYW5kIHg6IFwiICsgeCArIFwiIGlzIGdpdmVuIGFzIFwiICsgY29sQW5kUm93WzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByb3dBcnJheS5wdXNoKG5ldyBVbnBsYXlhYmxlVGlsZShjb2xBbmRSb3dbMF0sIGNvbEFuZFJvd1sxXSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbmV3TWF0cml4LnB1c2gocm93QXJyYXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXdNYXRyaXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpIHdhbnQgdG8gZG8gYSBnZW5lcmFsIHRhYmxlIHdoZXJlIGFsbCB0aGUgY29tYmluYXRpb25zIG9mIDIgdXAgdG8gOSBudW1iZXJzIGFyZSBsaXN0ZWQgYW5kIHRoZSBzdW0gb2YgdGhlbSBpcyBjYWxjdWxhdGVkXHJcbiAgICAgKiB0aGUgcmVzdWx0aW5nIHN1bSBpcyB0aGUgaW5kZXggb2Ygd2hlcmUgdG8gZmluZCB0aGVzZSBjb21iaW5hdGlvbnMgaW4gdGhlIHRhYmxlXHJcbiAgICAgKiBhdCB0aGF0IGluZGV4LCB0aGUgY29tYmluYXRpb25zIGFyZSBzdG9yZWQgYXMgYSA5IGJpdCBudW1iZXIsIHdoZXJlIHRoZSBiaXQgaXMgMSBpZiB0aGUgbnVtYmVyIGlzIGluIHRoZSBjb21iaW5hdGlvblxyXG4gICAgICogdGhlIHRhYmxlIGlzIGEgNDUgZWxlbWVudCBhcnJheVxyXG4gICAgICogYXQgZWFjaCBpbmRleCwgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtIGlzIHN0b3JlZCBhdCB0aGUgaW5kZXggb2YgaXQncyBhbW91bnRcclxuICAgICAqIHRoZSBtYXRyaXggbG9va3MgYXMgZm9sbG93czpcclxuICAgICAqXHJcbiAgICAgKiBbW10sICAgICAgICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAqICBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICogIFtdLCAgICAgICAgICAgICAgICAgICAgICAgICAyXHJcbiAgICAgKiAgW1tdLFtdLFszXV0sICAgICAgICAgICAgICAgIDNcclxuICAgICAqICBbW10sW10sWzVdXSwgICAgICAgICAgICAgICAgNFxyXG4gICAgICogIFtbXSxbXSxbNiw5XV0sICAgICAgICAgICAgICA1XHJcbiAgICAgKiAgW1tdLFtdLFsxMCwxN10sWzddXV0gICAgICAgIDZcclxuICAgICAqICBbW10sW10sWzMzLDE4LCAxMl0sWzExXV0gICAgN1xyXG4gICAgICogdGhlIGZpcnN0IGluZGV4IGlzIHRoZSBzdW0gKCM0NSksIHRoZSBzZWNvbmQgaW5kZXggaXMgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtKCM5KSxcclxuICAgICAqIGVhY2ggb2YgdGhlIG51bWJlcnMgZnJvbSB0aGF0IHBvaW50IGFyZSBtZWFudCB0byBiZSByZWFkIGluIGJpbmFyeSwgaGF2aW5nIGEgMSBldmVyeXdoZXJlIHRoZSBudW1iZXIgaXMgaW4gdGhlIGNvbWJpbmF0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdFN1bVRhYmxlKCk6IG51bWJlcltdW11bXSB7XHJcbiAgICAgICAgLy8gY3JlYXRlIGEgNDV4OXg/IGVtcHR5IGFycmF5XHJcbiAgICAgICAgbGV0IHRhYmxlOiBudW1iZXJbXVtdW10gPSBBcnJheSg0NilcclxuICAgICAgICAgICAgLmZpbGwoMClcclxuICAgICAgICAgICAgLm1hcCgoKSA9PlxyXG4gICAgICAgICAgICAgICAgQXJyYXkoMTApXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbGwoMClcclxuICAgICAgICAgICAgICAgICAgICAubWFwKCgpID0+IFtdKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBiaW5hcnlDb21iaW5hdGlvbiA9IDE7IGJpbmFyeUNvbWJpbmF0aW9uIDw9IHBhcnNlSW50KFwiMTExMTExMTExXCIsIDIpOyBiaW5hcnlDb21iaW5hdGlvbisrKSB7XHJcbiAgICAgICAgICAgIGxldCBhbW91bnRPZk9uZXMgPSBiaW5hcnlDb21iaW5hdGlvbi50b1N0cmluZygyKS5zcGxpdChcIjFcIikubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgbGV0IHN1bSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgOTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmluYXJ5Q29tYmluYXRpb24gJiAoMiAqKiBqKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBqICsgMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN1bTogXCIgKyBzdW0gKyBcIiBhbW91bnRPZk9uZXM6IFwiICsgYW1vdW50T2ZPbmVzICsgXCIgYmluYXJ5Q29tYmluYXRpb246IFwiICsgYmluYXJ5Q29tYmluYXRpb24udG9TdHJpbmcoMikpO1xyXG4gICAgICAgICAgICB0YWJsZVtzdW1dW2Ftb3VudE9mT25lc10ucHVzaChiaW5hcnlDb21iaW5hdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNvbHZlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgaW5zdGFuY2VvZiBVbnBsYXlhYmxlVGlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcm93SW5mbyA9IHRoaXMuZ2V0Um93SW5mbyh5LCB4KTtcclxuICAgICAgICAgICAgICAgIGxldCBjb2xJbmZvID0gdGhpcy5nZXRDb2x1bW5JbmZvKHksIHgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHB1dHRpbmcgc29tZSBvZiB0aGF0IGluZm8gaW50byBzcGVjaWZpYyB2YXJpYWJsZXMgZm9yIGJldHRlciByZWFkYWJpbGl0eSBtaWdodCBiZSBoZWxwZnVsXHJcbiAgICAgICAgICAgICAgICAvLyBhbHNvLCBtYXliZSB0byBnZXQgcmlkIG9mIHRoZSBuZWNlc3NlaXR5IG9mIHRoZSAubnVtIGF0IHRoZSBlbmQgb2YgZWFjaCBtYXRyaXggY2FsbCwgSSBjb3VsZCBjb25zaWRlciBoYXZpbmcgdGhlIG1hdHJpeCBpbiB0aGUgZm9ybSBvZiBtYXRyaXg6IChVbnBsYXlhYmxlVGlsZSB8IG51bWJlcilbXVtdXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWxsIHBlcm11dGF0aW9ucyB3aXRoIGdpdmVuIHRpbGUgYW1vdW50IHRvIHN1bVxyXG4gICAgICAgICAgICAgICAgbGV0IHJvd1Blcm11dGF0aW9ucyA9IHRoaXMuc3VtVGFibGVbcm93SW5mby5zdW1dW3Jvd0luZm8udGlsZUNvb3Jkcy5sZW5ndGhdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbFBlcm11dGF0aW9ucyA9IHRoaXMuc3VtVGFibGVbY29sSW5mby5zdW1dW2NvbEluZm8udGlsZUNvb3Jkcy5sZW5ndGhdO1xyXG5cclxuICAgICAgICAgICAgICAgIHJvd1Blcm11dGF0aW9ucyA9IHJvd1Blcm11dGF0aW9ucy5maWx0ZXIoKHBlcm11dGF0aW9uKSA9PiBwZXJtdXRhdGlvbiAmIHRpbGUubnVtKTtcclxuICAgICAgICAgICAgICAgIGNvbFBlcm11dGF0aW9ucyA9IGNvbFBlcm11dGF0aW9ucy5maWx0ZXIoKHBlcm11dGF0aW9uKSA9PiBwZXJtdXRhdGlvbiAmIHRpbGUubnVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcm93IChvciBjb2x1bW4pIGlzIGFscmVhZHkgaGFzIGZpeGVkIHRpbGVzLCB0aGUgcGVybXV0YXRpb25zIGhhdmUgdG8gaW5jbHVkZSB0aGVzZSBmaXhlZCBudW1iZXJzXHJcbiAgICAgICAgICAgICAgICBsZXQgZml4ZWRJblJvdyA9IDA7XHJcbiAgICAgICAgICAgICAgICByb3dJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5vbmx5UG9zc2libGVOdW1iZXIoKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEluUm93IHw9IHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpeGVkSW5Db2wgPSAwO1xyXG4gICAgICAgICAgICAgICAgY29sSW5mby50aWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ub25seVBvc3NpYmxlTnVtYmVyKCkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRJbkNvbCB8PSB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmaWx0ZXIgdGhlIHBlcm11dGF0aW9ucyBieSB0aGUgbnVtYmVycyB0aGF0IGFyZSBhbHJlYWR5IGZpeGVkIGluIHRoZSB0aWxlLCB0aGVyZWZvcmUgaGF2aW5nIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCBwZXJtdXRhdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKGZpeGVkSW5Sb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICByb3dQZXJtdXRhdGlvbnMgPSByb3dQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gKHBlcm11dGF0aW9uICYgZml4ZWRJblJvdykgPT09IGZpeGVkSW5Sb3cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGZpeGVkSW5Db2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xQZXJtdXRhdGlvbnMgPSBjb2xQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gKHBlcm11dGF0aW9uICYgZml4ZWRJbkNvbCkgPT09IGZpeGVkSW5Db2wpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZvciB0aGlzIGN1cnJlbnQgdGlsZSwgdGhlIHBlcm11dGF0aW9ucyBhcmUgY29tYmluZWQgdG8gYSBzdXBlcnBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBsZXQgY29tYmluZWRSb3dQZXJtdXRhdGlvbnMgPSB0aGlzLnJlZHVjZVRvU3VwZXJwb3NpdGlvbihyb3dQZXJtdXRhdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbWJpbmVkQ29sUGVybXV0YXRpb25zID0gdGhpcy5yZWR1Y2VUb1N1cGVycG9zaXRpb24oY29sUGVybXV0YXRpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgc3VwZXJwb3NpdGlvbiBpbmNsdWRlcyB0aGUgYWxsIGxlZnRvdmVyIHBlcm11dGF0aW9ucyBhZnRlciBmaWx0ZXJpbmcsIHNvIHRoZSBwZXJtdXRhdGlvbnMgaW4gdGhlIG90aGVyIHRpbGVzIGluIHRoZSByb3cgYW5kIGNvbHVtbiBjYW4gYmUgcmVkdWNlZFxyXG4gICAgICAgICAgICAgICAgcm93SW5mby50aWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0gJj0gY29tYmluZWRSb3dQZXJtdXRhdGlvbnM7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb2xJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSAmPSBjb21iaW5lZENvbFBlcm11dGF0aW9ucztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJvdGggc3VwZXJwb3NpdGlvbnMgYXJlIGJlaW5nIGNvbWJpbmVkIGFuZCB0aGVuIGFwcGxpZWQgdG8gdGhlIHRpbGVcclxuICAgICAgICAgICAgICAgIHRpbGUubnVtICY9IGNvbWJpbmVkUm93UGVybXV0YXRpb25zICYgY29tYmluZWRDb2xQZXJtdXRhdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWRva3VSdWxlcyh5LCB4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dpbmcgY29uc29sZSBsb2dzXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgKHkgPCAzICYmIHggPT0gNikge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBcInk6IFwiICtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHkgK1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCIgeDogXCIgK1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgeCArXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIFwiY3VycmVudCBTdGF0ZSBvZiB0aWxlOiBcIiArXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICB0aWxlLm51bS50b1N0cmluZygyKSArXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJvd0luZm8udGlsZUNvb3Jkcy5sZW5ndGggK1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCIgdGlsZXMgaW4gdGhpcyByb3cgc3VtIHRvIFwiICtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJvd0luZm8uc3VtICtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIFwiXFxucG9zc2libGUgcm93UGVybXV0YXRpb25zIFwiICtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJvd1Blcm11dGF0aW9ucy5tYXAoKGVsKSA9PiBlbC50b1N0cmluZygyKSkgK1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCJcXG5jb21iaW5lZFJvd1Blcm11dGF0aW9ucyBcIiArXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjb21iaW5lZFJvd1Blcm11dGF0aW9ucy50b1N0cmluZygyKSArXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbEluZm8udGlsZUNvb3Jkcy5sZW5ndGggK1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCIgdGlsZXMgaW4gdGhpcyBjb2x1bW4gc3VtIHRvIFwiICtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbEluZm8uc3VtICtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIFwiXFxucG9zc2libGUgY29sUGVybXV0YXRpb25zIFwiICtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNvbFBlcm11dGF0aW9ucy5tYXAoKGVsKSA9PiBlbC50b1N0cmluZygyKSkgK1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgXCJcXG5jb21iaW5lZENvbFBlcm11dGF0aW9ucyBcIiArXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjb21iaW5lZENvbFBlcm11dGF0aW9ucy50b1N0cmluZygyKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVkdWNlVG9TdXBlcnBvc2l0aW9uKHBlcm11dGF0aW9uczogbnVtYmVyW10pOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBwZXJtdXRhdGlvbnMucmVkdWNlKChhY2MsIGN1cikgPT4ge1xyXG4gICAgICAgICAgICBhY2MgfD0gY3VyO1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3Vkb2t1UnVsZXMoeTogbnVtYmVyLCB4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAvLyB3ZSBjaGVjaywgaG93IG1hbnkgcG9zc2libGUgbnVtYmVycyB0aGUgY3VycmVudCB0aWxlIGhhc1xyXG4gICAgICAgIC8vIGlmIHRoZSB0aWxlIGlzIGFscmVhZHkgZml4ZWQsIGl0IHNob3VsZCByZXR1cm4gMSBudW1iZXJcclxuICAgICAgICBsZXQgcG9zc2libGVOdW1iZXJzID0gdGhpcy5tYXRyaXhbeV1beF0ubnVtLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKS5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICBsZXQgY29sSW5mbyA9IHRoaXMuZ2V0Q29sdW1uSW5mbyh5LCB4KTtcclxuICAgICAgICBjb2xJbmZvLnRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgLy8gd2l0aGluIHRoaXMgaWYsIHRoZXJlIG1pZ2h0IGJlIGEgd2F5IHRvIGZpeC9pbmNsdWRlIHRoZSBzb2x1dGlvbiA4IGZvciB0aGUgdGlsZSBhdCB5OiAxIGFuZCB4OiA2IG9uIG1lZGl1bVswXVxyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0gPT09IHRoaXMubWF0cml4W3ldW3hdLm51bSkge1xyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOdW1iZXJzIC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocG9zc2libGVOdW1iZXJzID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbEluZm8udGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W3ldW3hdLm51bSA9PSB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRyaXhbY29vcmRzLnldW2Nvb3Jkcy54XS5udW0gJj0gfnRoaXMubWF0cml4W3ldW3hdLm51bTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3NzaWJsZU51bWJlcnMgPSB0aGlzLm1hdHJpeFt5XVt4XS5udW0udG9TdHJpbmcoMikuc3BsaXQoXCIxXCIpLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgbGV0IHJvd0luZm8gPSB0aGlzLmdldFJvd0luZm8oeSwgeCk7XHJcbiAgICAgICAgcm93SW5mby50aWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSA9PT0gdGhpcy5tYXRyaXhbeV1beF0ubnVtKSB7XHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZU51bWJlcnMgLT0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChwb3NzaWJsZU51bWJlcnMgPT09IDApIHtcclxuICAgICAgICAgICAgcm93SW5mby50aWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbeV1beF0ubnVtID09IHRoaXMubWF0cml4W2Nvb3Jkcy55XVtjb29yZHMueF0ubnVtKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFtjb29yZHMueV1bY29vcmRzLnhdLm51bSAmPSB+dGhpcy5tYXRyaXhbeV1beF0ubnVtO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbG9vcHMgdXAgdG8gZmluZCB0aGUgc3VtIG9mIHRoZSBjb2x1bW5cclxuICAgICAqIGxvb3BzIGRvd24gZnJvbSB0aGVyZSB0byBmaW5kIHRoZSBlbXB0eSB0aWxlcyBiZWxvdyB0aGF0IHN1bVxyXG4gICAgICogQHJldHVybnMgYXJyYXkgd2l0aCB0aGUgc3VtIHRvIHRoZSByaWdodCBhbmQgdGhlIGFtb3VudCBvZiBlbXB0eSB0aWxlcyBpbiB0aGUgY29sdW1uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q29sdW1uSW5mbyh5OiBudW1iZXIsIHg6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgd2hpbGUgKHkgPj0gMCAmJiB0aGlzLm1hdHJpeFt5XVt4XSBpbnN0YW5jZW9mIFBsYXlhYmxlVGlsZSkge1xyXG4gICAgICAgICAgICB5LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0aWxlc0luZm8gPSBbXTtcclxuICAgICAgICB3aGlsZSAoeSArIHRpbGVzSW5mby5sZW5ndGggPCA5ICYmIHRoaXMubWF0cml4W3kgKyB0aWxlc0luZm8ubGVuZ3RoICsgMV1beF0gaW5zdGFuY2VvZiBQbGF5YWJsZVRpbGUpIHtcclxuICAgICAgICAgICAgdGlsZXNJbmZvLnB1c2goeyB5OiB5ICsgdGlsZXNJbmZvLmxlbmd0aCArIDEsIHg6IHggfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBzdW06IHRoaXMubWF0cml4W3ldW3hdLmNvbFN1bSwgdGlsZUNvb3JkczogdGlsZXNJbmZvIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSb3dJbmZvKHk6IG51bWJlciwgeDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICB3aGlsZSAoeCA+PSAwICYmIHRoaXMubWF0cml4W3ldW3hdIGluc3RhbmNlb2YgUGxheWFibGVUaWxlKSB7XHJcbiAgICAgICAgICAgIHgtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRpbGVzSW5mbyA9IFtdO1xyXG4gICAgICAgIHdoaWxlICh4ICsgdGlsZXNJbmZvLmxlbmd0aCA8IDkgJiYgdGhpcy5tYXRyaXhbeV1beCArIHRpbGVzSW5mby5sZW5ndGggKyAxXSBpbnN0YW5jZW9mIFBsYXlhYmxlVGlsZSkge1xyXG4gICAgICAgICAgICB0aWxlc0luZm8ucHVzaCh7IHk6IHksIHg6IHggKyB0aWxlc0luZm8ubGVuZ3RoICsgMSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IHN1bTogdGhpcy5tYXRyaXhbeV1beF0ucm93U3VtLCB0aWxlQ29vcmRzOiB0aWxlc0luZm8gfTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRPRE86XHJcbiAqIC0gYWVzdGhldGljczogICAgICAgICAgICAgICAgbWFrZSB0aGUgY29sb3JzIHByZXR0aWVyIHRvIGxvb2sgYXQgaW4gdmlldyAobWF5YmUgb25seSBzaG93IGxpdHRsZSBudW1iZXJzIGlmIGFueSBzb3J0IG9mIHNvbHZpbmcgaGFzIGJlZW4gc3RhcnRlZClcclxuICogLSBhZXN0aGV0aWNzICsgbWVjaGFuaWNzOiAgICBhZnRlciBlYWNoIGNsaWNrIG9mIHRoZSBzb2x2ZSBidXR0b24sIGNvbG9yIHRoZSB0aWxlcyB0aGF0IGhhdmUgYmVlbiBhZmZlY3RlZCBieSB0aGUgc29sdmUgY2hhbmdlIGZ1bmN0aW9uICh0aGlzIHJlcXVpcmVzIHRvIHNhdmUgYSBjb3B5IG9mIHRoZSBwcmV2aW91cyBzdGF0ZSBvZiB0aGUgbWF0cml4KVxyXG4gKiAtIG1lY2hhbmljczogICAgICAgICAgICAgICAgIG1ha2UgYSBzb2x2ZUFsbCBidXR0b24gdGhhdCByZXBlYXRlZGx5L3JlY3Vyc2l2ZWx5IGNhbGxzIHRoZSBzb2x2ZSBmdW5jdGlvbiB1bnRpbCBubyBtb3JlIGNoYW5nZXMgY2FuIGJlIG1hZGVcclxuICogLSByZWFkYWJpbGl0eTogICAgICAgICAgICAgICBtYWtlIHRoZSBjb2RlIG1vcmUgcmVhZGFibGUgYnkgc3BsaXR0aW5nIHRoZSBzb2x2ZSBmdW5jdGlvbiBpbnRvIHNtYWxsZXIgZnVuY3Rpb25zIGlmIHBvc3NpYmxlXHJcbiAqIC0gcmVhZGFiaWxpdHk6ICAgICAgICAgICAgICAgbWFrZSB0aGUgY29kZSBtb3JlIHJlYWRhYmxlIGJ5IGFkZGluZyBjb21tZW50cyB0byB0aGUgY29kZVxyXG4gKiAtIGVycm9yIGhhbmRsaW5nOiAgICAgICAgICAgIGFkZCBlcnJvciBoYW5kbGluZyBmb3IgdGhlIGNhc2UgdGhhdCB0aGUgaW5wdXQgbWF0cml4IGlzIG5vdCB2YWxpZFxyXG4gKiAtIGVycm9yIGhhbmRsaW5nOiAgICAgICAgICAgIGFkZCBlcnJvciBoYW5kbGluZyBmb3IgdGhlIGNhc2UgdGhhdCB0aGUgc3VtIG9mIHRoZSByb3cgb3IgdGhlIGNvbHVtbiBpc24ndCB2YWxpZFxyXG4gKiAtIHJ1bGVzOiAgICAgICAgICAgICAgICAgICAgIGZvciBlYXN5WzFdLCBzcGVjaWZ5IGEgcnVsZSB0aGF0LCBpbiBjYXNlIHNvbWUgbnVtYmVycyBhcmUgYWxyZWFkeSBmaXhlZCBhcyB0aGUgZmluYWwgbnVtYmVycywgcmVhcHBsaWVzIHRoZSBzdW1UYWJsZSAoaWYgeW91IGhhdmUgdGhyZWUgdGlsZXMgaW4gYSByb3cgYW5kIG9uZSBpcyBhbHJlYWR5IHNhZmUsIHRoZSBzdW0gb2YgdGhlIG90aGVyIHR3byB0aWxlcyBjYW4gYmUgcmVjYWxjdWxhdGVkIGFuZCB0ZXN0ZWQgYWdhaW5zdCB0aGUgc3VtVGFibGUpXHJcbiAqIC0gcnVsZXM6ICAgICAgICAgICAgICAgICAgICAgZm9yIGVhc3lbMV0sIHNwZWNpZnkgYSBydWxlIHRoYXQgc29sdmVzIHJvdyAyIGJ5IHJlYWxpemluZyB0aGF0IG9ubHkgOCBhbmQgOSBhcmUgYWxyZWFkeSBmaXhlZCBmb3IgdGhlIGZpbmFsIHBlcm11dGF0aW9uIGFuZCBhZGp1c3QgdGhlIG90aGVyIHRpbGVzIGFjY29yZGluZ2x5XHJcbiAqL1xyXG4iLCJleHBvcnQgY2xhc3MgVGlsZSB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIFBsYXlhYmxlVGlsZSBleHRlbmRzIFRpbGUge1xyXG4gICAgbnVtOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IobnVtOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubnVtID0gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDAwMTAwMDAwMCAtPiA3XHJcbiAgICAvLyAxMTAxMTAxMDAgLT4gMFxyXG4gICAgb25seVBvc3NpYmxlTnVtYmVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMubnVtLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKS5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5udW0udG9TdHJpbmcoMikuc3BsaXQoXCIxXCIpWzFdLmxlbmd0aCArIDE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVbnBsYXlhYmxlVGlsZSBleHRlbmRzIFRpbGUge1xyXG4gICAgY29sU3VtOiBudW1iZXI7XHJcbiAgICByb3dTdW06IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xTdW06IG51bWJlciwgcm93U3VtOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuY29sU3VtID0gY29sU3VtO1xyXG4gICAgICAgIHRoaXMucm93U3VtID0gcm93U3VtO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sU3VtID09PSAwICYmIHRoaXMucm93U3VtID09PSAwO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFRpbGUsIFBsYXlhYmxlVGlsZSwgVW5wbGF5YWJsZVRpbGUgfSBmcm9tIFwiLi90aWxlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmlldyB7XHJcbiAgICBib2FyZDogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICB0aWxlU2l6ZTogbnVtYmVyO1xyXG4gICAgdGlsZVBhZGRpbmc6IG51bWJlcjtcclxuICAgIHByaXZhdGUgYm9hcmRTaWRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvcmRlclJhZGl1czogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIGJvYXJkQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1jb250YWluZXJcIikgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ib3JkZXJSYWRpdXMgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3Qm9hcmQobWF0cml4OiBhbnlbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDYW52YXMobWF0cml4KTtcclxuICAgICAgICB0aGlzLmRyYXdCYWNrZ3JvdW5kKCk7XHJcblxyXG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goKHRpbGUsIHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlQ29ybmVyWCA9IHggKiB0aGlzLnRpbGVTaXplO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVDb3JuZXJZID0geSAqIHRoaXMudGlsZVNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhlIHVucGxheWFibGUgdGlsZXMgd2l0aCBzdW1zXHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSBpbnN0YW5jZW9mIFVucGxheWFibGVUaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3VW5wbGF5YWJsZVRpbGUodGlsZSwgbm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BsYXlhYmxlVGlsZSh0aWxlLCBub2RlQ29ybmVyWCwgbm9kZUNvcm5lclkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3R3JpZGxpbmVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3VW5wbGF5YWJsZVRpbGUodGlsZTogVW5wbGF5YWJsZVRpbGUsIG5vZGVDb3JuZXJYOiBudW1iZXIsIG5vZGVDb3JuZXJZOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc3VtUmlnaHQgPSB0aWxlLnJvd1N1bTtcclxuICAgICAgICBpZiAoc3VtUmlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXHJcbiAgICAgICAgICAgICAgICBzdW1SaWdodC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMiAtIHRoaXMudGlsZVBhZGRpbmcgLyAyLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMiAtIHRoaXMudGlsZVBhZGRpbmdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzdW1Eb3duID0gdGlsZS5jb2xTdW07XHJcbiAgICAgICAgaWYgKHN1bURvd24pIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoc3VtRG93bi50b1N0cmluZygpLCBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAxLCBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAzIC0gdGhpcy50aWxlUGFkZGluZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3VtRG93biAmJiBzdW1SaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKG5vZGVDb3JuZXJYLCBub2RlQ29ybmVyWSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhub2RlQ29ybmVyWCArIHRoaXMudGlsZVNpemUsIG5vZGVDb3JuZXJZICsgdGhpcy50aWxlU2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IHRoaXMudGlsZVNpemUgLyAyNTtcclxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdQbGF5YWJsZVRpbGUodGlsZTogUGxheWFibGVUaWxlLCBub2RlQ29ybmVyWDogbnVtYmVyLCBub2RlQ29ybmVyWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gYmFja2dyb3VuZCBmb3IgcGxheWFibGUgdGlsZVxyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwibGlnaHRncmF5XCI7XHJcbiAgICAgICAgdGhpcy5jdHgucmVjdChub2RlQ29ybmVyWCwgbm9kZUNvcm5lclksIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuXHJcbiAgICAgICAgLy8gdGhlIGFscmVhZHkgc2FmZSBudW1iZXJzIGluIHRoZSB0aWxlcyAoZS5nLiBpZiB0aGUgdGlsZSBoYXMgMDAxMDAwMDAwMSB3cml0dGVuLCA3IGlzIHRoZSBvbmx5IG51bWJlciBsZWZ0IHRvIGJlIHBsYWNlZCBpbiB0aGUgdGlsZSlcclxuICAgICAgICBsZXQgb25seVBvc3NpYmxlTnVtYmVyID0gdGlsZS5vbmx5UG9zc2libGVOdW1iZXIoKTtcclxuICAgICAgICBpZiAob25seVBvc3NpYmxlTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgb25seVBvc3NpYmxlTnVtYmVyLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAwICsgdGhpcy50aWxlUGFkZGluZyAqIDMsXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAzIC0gdGhpcy50aWxlUGFkZGluZyAqIDJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhlIG5vdGVkIG51bWJlcnMgaW4gdGhlIHRpbGVzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCEodGlsZS5udW0gJiAoMiAqKiBpKSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ3JleVwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIChpICsgMSkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIChpICUgMykgKyB0aGlzLnRpbGVQYWRkaW5nLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogTWF0aC5mbG9vcigoaSArIDMpIC8gMykgLSB0aGlzLnRpbGVQYWRkaW5nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlQ2FudmFzKG1hdHJpeDogbnVtYmVyW11bXSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuaWQgPSBcImJvYXJkXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5ib3hTaGFkb3cgPSBcIjVweCA1cHggMjBweCBncmF5XCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5zdHlsZS5ib3JkZXJSYWRpdXMgPSB0aGlzLmJvcmRlclJhZGl1cyArIFwiJVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUubWFyZ2luID0gXCIxJVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQud2lkdGggPSB0aGlzLmJvYXJkQ29udGFpbmVyLmNsaWVudFdpZHRoICogMC45ODtcclxuICAgICAgICB0aGlzLmJvYXJkLmhlaWdodCA9IHRoaXMuYm9hcmRDb250YWluZXIuY2xpZW50SGVpZ2h0ICogMC45ODtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmJvYXJkKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmJvYXJkLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLmJvYXJkU2lkZUxlbmd0aCA9IHRoaXMuYm9hcmQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdGhpcy50aWxlU2l6ZSA9IHRoaXMuYm9hcmRTaWRlTGVuZ3RoIC8gbWF0cml4Lmxlbmd0aDtcclxuICAgICAgICB0aGlzLnRpbGVQYWRkaW5nID0gdGhpcy50aWxlU2l6ZSAvIDE1O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0JhY2tncm91bmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIHRoaXMuY3R4LnJvdW5kUmVjdCgwLCAwLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoICogKHRoaXMuYm9yZGVyUmFkaXVzIC8gMTAwKSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhd0dyaWRsaW5lcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8PSB0aGlzLmJvYXJkU2lkZUxlbmd0aDsgbCArPSB0aGlzLnRpbGVTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhsLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKGwsIHRoaXMuYm9hcmRTaWRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIGwpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy5ib2FyZFNpZGVMZW5ndGgsIGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLnRpbGVTaXplIC8gMjU7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL21vZGVsXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XHJcbmltcG9ydCB7IGxldmVscyB9IGZyb20gXCIuL2xldmVsc1wiO1xyXG5cclxuLyoqIGhhbmRsZXMgYWxsIGlucHV0LCBjaGVja3MgaW4gd2l0aCBtb2RlbCBhbmQgZGlzcGxheXMgdGhlIHJlc3VsdCB3aXRoIHZpZXcgKi9cclxuXHJcbmNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgbW9kZWw6IE1vZGVsO1xyXG4gICAgdmlldzogVmlldztcclxuXHJcbiAgICAvLyBidXR0b25zXHJcbiAgICBzb2x2ZUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbChsZXZlbHMubWVkaXVtWzBdKTtcclxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLmdldERvbUVsZW1lbnRzKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREb21FbGVtZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvbHZlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzb2x2ZVwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRFdmVudExpc3RlbmVycygpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvbHZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc29sdmUoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVWaWV3KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmlldy5kcmF3Qm9hcmQodGhpcy5tb2RlbC5tYXRyaXgpO1xyXG4gICAgICAgIHRoaXMudmlldy5ib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB0aGlzLmJvYXJkQ2xpY2tlZChldmVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYm9hcmRDbGlja2VkKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJib2FyZCBjbGlja2VkXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBhcHAgPSBuZXcgQ29udHJvbGxlcigpO1xyXG5cclxuLy8gXCJucG0gcnVuIHN0YXJ0XCIgaW4gdGVybWluYWwgdG8gc3RhcnQgbGl2ZSBzZXJ2ZXJcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
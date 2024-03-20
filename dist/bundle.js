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
                var rowInfo = _this._getRowInfo(y, x);
                var colInfo = _this._getColumnInfo(y, x);
                // all permutations with given tile amount to sum
                var rowPermutations = _this.sumTable[rowInfo.sum][rowInfo.emptyTileCoords.length];
                var colPermutations = _this.sumTable[colInfo.sum][colInfo.emptyTileCoords.length];
                rowPermutations = rowPermutations.filter(function (permutation) { return permutation & tile.num; });
                colPermutations = colPermutations.filter(function (permutation) { return permutation & tile.num; });
                // if the row (or column) is already has fixed tiles, the permutations have to include these fixed numbers
                var fixedInRow = 0;
                rowInfo.emptyTileCoords.forEach(function (coords) {
                    if (_this.matrix[coords[0]][coords[1]].onlyPossibleNumber() !== 0) {
                        fixedInRow |= _this.matrix[coords[0]][coords[1]].num;
                    }
                });
                var fixedInCol = 0;
                colInfo.emptyTileCoords.forEach(function (coords) {
                    if (_this.matrix[coords[0]][coords[1]].onlyPossibleNumber() !== 0) {
                        fixedInCol |= _this.matrix[coords[0]][coords[1]].num;
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
                var combinedRowPermutations = _this._reduceToSuperposition(rowPermutations);
                var combinedColPermutations = _this._reduceToSuperposition(colPermutations);
                // the superposition includes the all leftover permutations after filtering, so the permutations in the other tiles in the row and column can be reduced
                rowInfo.emptyTileCoords.forEach(function (coords) {
                    _this.matrix[coords[0]][coords[1]].num &= combinedRowPermutations;
                });
                colInfo.emptyTileCoords.forEach(function (coords) {
                    _this.matrix[coords[0]][coords[1]].num &= combinedColPermutations;
                });
                // both superpositions are being combined and then applied to the tile
                tile.num &= combinedRowPermutations & combinedColPermutations;
                _this._sudokuRules(y, x);
                // debugging console logs
                /*
                if (y == 3 && x > 4) {
                    console.log(
                        "y: " +
                            y +
                            " x: " +
                            x +
                            "\n" +
                            "current State of tile: " +
                            tile.num.toString(2) +
                            "\n" +
                            rowInfo.emptyTileCoords.length +
                            " tiles in this row sum to " +
                            rowInfo.sum +
                            "\npossible rowPermutations " +
                            rowPermutations.map((el) => el.toString(2)) +
                            "\ncombinedRowPermutations " +
                            combinedRowPermutations.toString(2) +
                            "\nfixedInRow " +
                            fixedInRow.toString(2) +
                            "\nrowPermutations with only fixed numbers " +
                            rowPermutations.filter((permutation) => (permutation & fixedInRow) === fixedInRow).map((el) => el.toString(2)) +
                            "\n" +
                            colInfo.emptyTileCoords.length +
                            " tiles in this column sum to " +
                            colInfo.sum +
                            "\npossible colPermutations " +
                            colPermutations.map((el) => el.toString(2)) +
                            "\ncombinedColPermutations " +
                            combinedColPermutations.toString(2)
                    );
                }
                */
            });
        });
        console.log("this.matrix: ", this.matrix);
    };
    Model.prototype._reduceToSuperposition = function (permutations) {
        return permutations.reduce(function (acc, cur) {
            acc |= cur;
            return acc;
        }, 0);
    };
    Model.prototype._sudokuRules = function (y, x) {
        var _this = this;
        // all of this needs to be rewritten
        // we check, how many possible numbers the current tile has
        // if the tile is already fixed, it should return 1 number
        var possibleNumbers = this.matrix[y][x].num.toString(2).split("1").length - 1;
        var colInfo = this._getColumnInfo(y, x);
        colInfo.emptyTileCoords.forEach(function (coords) {
            if (_this.matrix[coords[0]][coords[1]].num === _this.matrix[y][x].num) {
                possibleNumbers -= 1;
            }
        });
        if (possibleNumbers === 0) {
            colInfo.emptyTileCoords.forEach(function (coords) {
                if (_this.matrix[y][x].num == _this.matrix[coords[0]][coords[1]].num)
                    return;
                _this.matrix[coords[0]][coords[1]].num &= ~_this.matrix[y][x].num;
            });
        }
        possibleNumbers = this.matrix[y][x].num.toString(2).split("1").length - 1;
        var rowInfo = this._getRowInfo(y, x);
        rowInfo.emptyTileCoords.forEach(function (coords) {
            if (_this.matrix[coords[0]][coords[1]].num === _this.matrix[y][x].num) {
                possibleNumbers -= 1;
            }
        });
        if (possibleNumbers === 0) {
            rowInfo.emptyTileCoords.forEach(function (coords) {
                if (_this.matrix[y][x].num == _this.matrix[coords[0]][coords[1]].num)
                    return;
                _this.matrix[coords[0]][coords[1]].num &= ~_this.matrix[y][x].num;
            });
        }
        // if the tile still has the numbers e.g. 1 and 2, we look out for another tile that has only 1 or 2 as possible number
        // if that is the case, then all the other tiles in the row or column should have the number 1 and 2 removed from their possible numbers
        // //currently only deletes numbers in other tiles, when current tile is fixed
        // let onlyPossibleNumber = this.matrix[y][x].onlyPossibleNumber();
        // if (!onlyPossibleNumber) {
        //     return;
        // }
        // // get all other tiles, ignore the one that is currently being checked and delete the number from the other tiles that is fixed in the current tile
        // let colInfo = this._getColumnInfo(y, x);
        // colInfo.emptyTileCoords.forEach((coords: any) => {
        //     if (coords[0] === y && coords[1] === x) return;
        //     this.matrix[coords[0]][coords[1]].num &= ~this.matrix[y][x].num;
        // });
        // let rowInfo = this._getRowInfo(y, x);
        // rowInfo.emptyTileCoords.forEach((coords: any) => {
        //     if (coords[0] === y && coords[1] === x) return;
        //     this.matrix[coords[0]][coords[1]].num &= ~this.matrix[y][x].num;
        // });
        return;
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
        this._createCanvas(matrix);
        this._drawBackground();
        matrix.forEach(function (row, y) {
            row.forEach(function (tile, x) {
                var nodeCornerX = x * _this.tileSize;
                var nodeCornerY = y * _this.tileSize;
                // the unplayable tiles with sums
                if (tile instanceof _tile__WEBPACK_IMPORTED_MODULE_0__.UnplayableTile) {
                    _this._drawUnplayableTile(tile, nodeCornerX, nodeCornerY);
                    return;
                }
                else {
                    _this._drawPlayableTile(tile, nodeCornerX, nodeCornerY);
                }
            });
        });
        this._drawGridlines();
    };
    View.prototype._drawUnplayableTile = function (tile, nodeCornerX, nodeCornerY) {
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
    View.prototype._drawPlayableTile = function (tile, nodeCornerX, nodeCornerY) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sSUFBTSxNQUFNLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0Y7WUFDSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0QztRQUNEO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEM7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdkM7S0FDSjtJQUNELElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEIsV0FBVyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6QixPQUFPLEVBQUU7UUFDTDtZQUNJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxD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LENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDM0QsQ0FBQztRQUNOLENBQUM7UUFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUM7WUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0ksQ0FBQztRQUVELElBQUksT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUFFTyxnQ0FBaUIsR0FBekIsVUFBMEIsSUFB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SUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztBQUU3QixtREFBbUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvbGV2ZWxzLnRzIiwid2VicGFjazovL2tha3Vyby8uL3NyYy9tb2RlbC50cyIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvdGlsZS50cyIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvdmlldy50cyIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rYWt1cm8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGxldmVscyA9IHtcclxuICAgIGVhc3k6IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFswLCAwLCA0NSwgMywgMCwgMCwgMCwgMywgNDUsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMTcuMDgsIDEsIDEsIDAsIDE2LCA0LjAzLCAxLCAxLCAwXSxcclxuICAgICAgICAgICAgWzAuMTEsIDEsIDEsIDEsIDE2LjE3LCAxLCAxLCAxLCAxLCAxN10sXHJcbiAgICAgICAgICAgIFswLjE3LCAxLCAxLCAzLjE3LCAxLCAxLCAxLCAwLjE2LCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAuMTgsIDEsIDEsIDEsIDAsIDAsIDE3LjEzLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDE3LjA0LCAxLCAxLCAwLCAwLCAzLjExLCAxLCAxLCAwXSxcclxuICAgICAgICAgICAgWzAuMDksIDEsIDEsIDAsIDE2LCAzLjE2LCAxLCAxLCAxLCA0XSxcclxuICAgICAgICAgICAgWzAuMTQsIDEsIDEsIDMuMSwgMSwgMSwgMSwgMTYuMTIsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMC4xOSwgMSwgMSwgMSwgMSwgMC4xOCwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLCAwLjA1LCAxLCAxLCAwLCAwLCAwLjEsIDEsIDEsIDBdLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMjMsIDI5LCA0LCAwLCAwLCAwLCAwLCAzLCAxN10sXHJcbiAgICAgICAgICAgIFswLjE3LCAxLCAxLCAxLCA0LCAwLCAzMCwgMTcuMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjIxLCAxLCAxLCAxLCAxLCA0LjI0LCAxLCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMTQsIDEsIDEsIDE2LjIsIDEsIDEsIDEsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMC4xMiwgMSwgMSwgMTAuMTEsIDEsIDEsIDMsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMC4xMSwgMSwgMSwgMTcuMSwgMSwgMSwgMzAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMTYuMSwgMSwgMSwgNC4wOCwgMSwgMSwgN10sXHJcbiAgICAgICAgICAgIFswLCA0LCAzLjI0LCAxLCAxLCAxLCAxLCAxNi4xLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMTMsIDEsIDEsIDEsIDEsIDAuMTgsIDEsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMC4wNCwgMSwgMSwgMCwgMCwgMCwgMC4yLCAxLCAxLCAxXSxcclxuICAgICAgICBdLFxyXG4gICAgXSxcclxuICAgIG1lZGl1bTogW1xyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgWzAsIDAsIDI5LCA0LCAwLCA3LCAzNCwgMTYsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMC4wOCwgMSwgMSwgMy4xNywgMSwgMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgIFswLCAzLjMxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwXSxcclxuICAgICAgICAgICAgWzAuMSwgMSwgMSwgMjQuMSwgMSwgMSwgMSwgMjQsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMC4xNiwgMSwgMSwgMSwgMTUsIDAuMTMsIDEsIDEsIDAsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMC4xMywgMSwgMSwgMC4xNiwgMSwgMSwgMTAsIDE2XSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMSwgMSwgMSwgMjQsIDMuMTYsIDEsIDEsIDFdLFxyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMTcuMTQsIDEsIDEsIDEsIDE3LjExLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAsIDAsIDAuMywgMSwgMSwgMSwgMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAwLjE4LCAxLCAxLCAxLCAwLjEzLCAxLCAxLCAwXSxcclxuICAgICAgICBdLFxyXG4gICAgXSxcclxuICAgIGhhcmQ6IG5ldyBBcnJheSgxKSxcclxuICAgIGNoYWxsZW5naW5nOiBuZXcgQXJyYXkoMSksXHJcbiAgICBleHRyZW1lOiBbXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICBbMCwgMCwgMCwgMCwgOSwgMTIsIDAsIDEyLCAzNywgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLCAzNywgOC4wMywgMSwgMSwgOC4xNSwgMSwgMSwgOV0sXHJcbiAgICAgICAgICAgIFswLCAxMS40MywgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjE0LCAxLCAxLCAxLCA2LjExLCAxLCAxLCAxMC4wNCwgMSwgMV0sXHJcbiAgICAgICAgICAgIFswLjEsIDEsIDEsIDkuMDMsIDEsIDEsIDcuMDQsIDEsIDEsIDBdLFxyXG4gICAgICAgICAgICBbMCwgMC4xNSwgMSwgMSwgMSwgMjYuMTMsIDEsIDEsIDEsIDE2XSxcclxuICAgICAgICAgICAgWzAsIDMuMDksIDEsIDEsIDUuMTIsIDEsIDEsIDEwLjEyLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuMDksIDEsIDEsIDE0LjAzLCAxLCAxLCAzLjE0LCAxLCAxLCAxXSxcclxuICAgICAgICAgICAgWzAuNCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgICAgIFswLCAwLjEsIDEsIDEsIDAuMDgsIDEsIDEsIDAsIDAsIDBdLFxyXG4gICAgICAgIF0sXHJcbiAgICBdLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBUaWxlLCBQbGF5YWJsZVRpbGUsIFVucGxheWFibGVUaWxlIH0gZnJvbSBcIi4vdGlsZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcclxuICAgIG1hdHJpeDogYW55W11bXTtcclxuICAgIHN1bVRhYmxlOiBudW1iZXJbXVtdW107XHJcblxyXG4gICAgY29uc3RydWN0b3IobGV2ZWw6IG51bWJlcltdW10pIHtcclxuICAgICAgICB0aGlzLm1hdHJpeCA9IHRoaXMuaW5pdEJpbmFyeU1hdHJpeChsZXZlbCk7XHJcbiAgICAgICAgdGhpcy5zdW1UYWJsZSA9IHRoaXMuaW5pdFN1bVRhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEJpbmFyeU1hdHJpeChtYXRyaXg6IG51bWJlcltdW10pOiBUaWxlW11bXSB7XHJcbiAgICAgICAgbGV0IG5ld01hdHJpeDogYW55W11bXSA9IFtdO1xyXG4gICAgICAgIG1hdHJpeC5mb3JFYWNoKChyb3csIHkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJvd0FycmF5OiBUaWxlW10gPSBbXTtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goKHRpbGUsIHgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93QXJyYXkucHVzaChuZXcgVW5wbGF5YWJsZVRpbGUoMCwgMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aWxlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93QXJyYXkucHVzaChuZXcgUGxheWFibGVUaWxlKHBhcnNlSW50KFwiMVwiLnJlcGVhdCg5KSwgMikpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGFsbCBvdGhlciBjYXNlcywgd2Ugc2VlIHRoZW0gYXMgYSBkZWNpbWFsIG51bWJlci5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSAwdGggYml0IGlzIDAsXHJcbiAgICAgICAgICAgICAgICAvLyB0aGVuIHRoZSBuZXh0IDYgYml0IGluY3JpcHQgdGhlIHR3byBudW1iZXJzIHRvIHRoZSByaWdodCBvZiB0aGUgY29tbWEsXHJcbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIGxhc3QgNiBiaXQgaW5jcmlwdCB0aGUgdHdvIG51bWJlcnMgdG8gdGhlIGxlZnQgb2YgdGhlIGNvbW1hXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sQW5kUm93ID0gdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgIC50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHN1bSkgPT4gcGFyc2VJbnQoc3VtKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3cubGVuZ3RoICE9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXggYXQgeDogXCIgKyB4ICsgXCIgYW5kIHk6IFwiICsgeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93WzBdID4gNDUgfHwgY29sQW5kUm93WzBdID09IDIgfHwgY29sQW5kUm93WzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeDogc3VtIG9mIGNvbCBhdCB5OiBcIiArIHkgKyBcIiBhbmQgeDogXCIgKyB4ICsgXCIgaXMgZ2l2ZW4gYXMgXCIgKyBjb2xBbmRSb3dbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvd1sxXSA+IDQ1IHx8IGNvbEFuZFJvd1sxXSA9PSAyIHx8IGNvbEFuZFJvd1sxXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXg6IHN1bSBvZiByb3cgYXQgeTogXCIgKyB5ICsgXCIgYW5kIHg6IFwiICsgeCArIFwiIGlzIGdpdmVuIGFzIFwiICsgY29sQW5kUm93WzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByb3dBcnJheS5wdXNoKG5ldyBVbnBsYXlhYmxlVGlsZShjb2xBbmRSb3dbMF0sIGNvbEFuZFJvd1sxXSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbmV3TWF0cml4LnB1c2gocm93QXJyYXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXdNYXRyaXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpIHdhbnQgdG8gZG8gYSBnZW5lcmFsIHRhYmxlIHdoZXJlIGFsbCB0aGUgY29tYmluYXRpb25zIG9mIDIgdXAgdG8gOSBudW1iZXJzIGFyZSBsaXN0ZWQgYW5kIHRoZSBzdW0gb2YgdGhlbSBpcyBjYWxjdWxhdGVkXHJcbiAgICAgKiB0aGUgcmVzdWx0aW5nIHN1bSBpcyB0aGUgaW5kZXggb2Ygd2hlcmUgdG8gZmluZCB0aGVzZSBjb21iaW5hdGlvbnMgaW4gdGhlIHRhYmxlXHJcbiAgICAgKiBhdCB0aGF0IGluZGV4LCB0aGUgY29tYmluYXRpb25zIGFyZSBzdG9yZWQgYXMgYSA5IGJpdCBudW1iZXIsIHdoZXJlIHRoZSBiaXQgaXMgMSBpZiB0aGUgbnVtYmVyIGlzIGluIHRoZSBjb21iaW5hdGlvblxyXG4gICAgICogdGhlIHRhYmxlIGlzIGEgNDUgZWxlbWVudCBhcnJheVxyXG4gICAgICogYXQgZWFjaCBpbmRleCwgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtIGlzIHN0b3JlZCBhdCB0aGUgaW5kZXggb2YgaXQncyBhbW91bnRcclxuICAgICAqIHRoZSBtYXRyaXggbG9va3MgYXMgZm9sbG93czpcclxuICAgICAqXHJcbiAgICAgKiBbW10sICAgICAgICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAqICBbXSwgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICogIFtdLCAgICAgICAgICAgICAgICAgICAgICAgICAyXHJcbiAgICAgKiAgW1tdLFtdLFszXV0sICAgICAgICAgICAgICAgIDNcclxuICAgICAqICBbW10sW10sWzVdXSwgICAgICAgICAgICAgICAgNFxyXG4gICAgICogIFtbXSxbXSxbNiw5XV0sICAgICAgICAgICAgICA1XHJcbiAgICAgKiAgW1tdLFtdLFsxMCwxN10sWzddXV0gICAgICAgIDZcclxuICAgICAqICBbW10sW10sWzMzLDE4LCAxMl0sWzExXV0gICAgN1xyXG4gICAgICogdGhlIGZpcnN0IGluZGV4IGlzIHRoZSBzdW0gKCM0NSksIHRoZSBzZWNvbmQgaW5kZXggaXMgdGhlIGFtb3VudCBvZiBudW1iZXJzIHRoYXQgbWFrZSB1cCB0aGUgc3VtKCM5KSxcclxuICAgICAqIGVhY2ggb2YgdGhlIG51bWJlcnMgZnJvbSB0aGF0IHBvaW50IGFyZSBtZWFudCB0byBiZSByZWFkIGluIGJpbmFyeSwgaGF2aW5nIGEgMSBldmVyeXdoZXJlIHRoZSBudW1iZXIgaXMgaW4gdGhlIGNvbWJpbmF0aW9uXHJcbiAgICAgKi9cclxuICAgIGluaXRTdW1UYWJsZSgpOiBudW1iZXJbXVtdW10ge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBhIDQ1eDl4PyBlbXB0eSBhcnJheVxyXG4gICAgICAgIGxldCB0YWJsZTogbnVtYmVyW11bXVtdID0gQXJyYXkoNDYpXHJcbiAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgIC5tYXAoKCkgPT5cclxuICAgICAgICAgICAgICAgIEFycmF5KDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWxsKDApXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoKSA9PiBbXSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYmluYXJ5Q29tYmluYXRpb24gPSAxOyBiaW5hcnlDb21iaW5hdGlvbiA8PSBwYXJzZUludChcIjExMTExMTExMVwiLCAyKTsgYmluYXJ5Q29tYmluYXRpb24rKykge1xyXG4gICAgICAgICAgICBsZXQgYW1vdW50T2ZPbmVzID0gYmluYXJ5Q29tYmluYXRpb24udG9TdHJpbmcoMikuc3BsaXQoXCIxXCIpLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGxldCBzdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDk7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJpbmFyeUNvbWJpbmF0aW9uICYgKDIgKiogaikpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gaiArIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdW06IFwiICsgc3VtICsgXCIgYW1vdW50T2ZPbmVzOiBcIiArIGFtb3VudE9mT25lcyArIFwiIGJpbmFyeUNvbWJpbmF0aW9uOiBcIiArIGJpbmFyeUNvbWJpbmF0aW9uLnRvU3RyaW5nKDIpKTtcclxuICAgICAgICAgICAgdGFibGVbc3VtXVthbW91bnRPZk9uZXNdLnB1c2goYmluYXJ5Q29tYmluYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRhYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHNvbHZlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgaW5zdGFuY2VvZiBVbnBsYXlhYmxlVGlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcm93SW5mbyA9IHRoaXMuX2dldFJvd0luZm8oeSwgeCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sSW5mbyA9IHRoaXMuX2dldENvbHVtbkluZm8oeSwgeCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWxsIHBlcm11dGF0aW9ucyB3aXRoIGdpdmVuIHRpbGUgYW1vdW50IHRvIHN1bVxyXG4gICAgICAgICAgICAgICAgbGV0IHJvd1Blcm11dGF0aW9ucyA9IHRoaXMuc3VtVGFibGVbcm93SW5mby5zdW1dW3Jvd0luZm8uZW1wdHlUaWxlQ29vcmRzLmxlbmd0aF07XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sUGVybXV0YXRpb25zID0gdGhpcy5zdW1UYWJsZVtjb2xJbmZvLnN1bV1bY29sSW5mby5lbXB0eVRpbGVDb29yZHMubGVuZ3RoXTtcclxuXHJcbiAgICAgICAgICAgICAgICByb3dQZXJtdXRhdGlvbnMgPSByb3dQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gcGVybXV0YXRpb24gJiB0aWxlLm51bSk7XHJcbiAgICAgICAgICAgICAgICBjb2xQZXJtdXRhdGlvbnMgPSBjb2xQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gcGVybXV0YXRpb24gJiB0aWxlLm51bSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHJvdyAob3IgY29sdW1uKSBpcyBhbHJlYWR5IGhhcyBmaXhlZCB0aWxlcywgdGhlIHBlcm11dGF0aW9ucyBoYXZlIHRvIGluY2x1ZGUgdGhlc2UgZml4ZWQgbnVtYmVyc1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpeGVkSW5Sb3cgPSAwO1xyXG4gICAgICAgICAgICAgICAgcm93SW5mby5lbXB0eVRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbY29vcmRzWzBdXVtjb29yZHNbMV1dLm9ubHlQb3NzaWJsZU51bWJlcigpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpeGVkSW5Sb3cgfD0gdGhpcy5tYXRyaXhbY29vcmRzWzBdXVtjb29yZHNbMV1dLm51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBmaXhlZEluQ29sID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbEluZm8uZW1wdHlUaWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5vbmx5UG9zc2libGVOdW1iZXIoKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXhlZEluQ29sIHw9IHRoaXMubWF0cml4W2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5udW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZmlsdGVyIHRoZSBwZXJtdXRhdGlvbnMgYnkgdGhlIG51bWJlcnMgdGhhdCBhcmUgYWxyZWFkeSBmaXhlZCBpbiB0aGUgdGlsZSwgdGhlcmVmb3JlIGhhdmluZyB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgcGVybXV0YXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChmaXhlZEluUm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93UGVybXV0YXRpb25zID0gcm93UGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IChwZXJtdXRhdGlvbiAmIGZpeGVkSW5Sb3cpID09PSBmaXhlZEluUm93KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChmaXhlZEluQ29sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sUGVybXV0YXRpb25zID0gY29sUGVybXV0YXRpb25zLmZpbHRlcigocGVybXV0YXRpb24pID0+IChwZXJtdXRhdGlvbiAmIGZpeGVkSW5Db2wpID09PSBmaXhlZEluQ29sKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgdGhpcyBjdXJyZW50IHRpbGUsIHRoZSBwZXJtdXRhdGlvbnMgYXJlIGNvbWJpbmVkIHRvIGEgc3VwZXJwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgbGV0IGNvbWJpbmVkUm93UGVybXV0YXRpb25zID0gdGhpcy5fcmVkdWNlVG9TdXBlcnBvc2l0aW9uKHJvd1Blcm11dGF0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29tYmluZWRDb2xQZXJtdXRhdGlvbnMgPSB0aGlzLl9yZWR1Y2VUb1N1cGVycG9zaXRpb24oY29sUGVybXV0YXRpb25zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgc3VwZXJwb3NpdGlvbiBpbmNsdWRlcyB0aGUgYWxsIGxlZnRvdmVyIHBlcm11dGF0aW9ucyBhZnRlciBmaWx0ZXJpbmcsIHNvIHRoZSBwZXJtdXRhdGlvbnMgaW4gdGhlIG90aGVyIHRpbGVzIGluIHRoZSByb3cgYW5kIGNvbHVtbiBjYW4gYmUgcmVkdWNlZFxyXG4gICAgICAgICAgICAgICAgcm93SW5mby5lbXB0eVRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0ubnVtICY9IGNvbWJpbmVkUm93UGVybXV0YXRpb25zO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29sSW5mby5lbXB0eVRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0ubnVtICY9IGNvbWJpbmVkQ29sUGVybXV0YXRpb25zO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYm90aCBzdXBlcnBvc2l0aW9ucyBhcmUgYmVpbmcgY29tYmluZWQgYW5kIHRoZW4gYXBwbGllZCB0byB0aGUgdGlsZVxyXG4gICAgICAgICAgICAgICAgdGlsZS5udW0gJj0gY29tYmluZWRSb3dQZXJtdXRhdGlvbnMgJiBjb21iaW5lZENvbFBlcm11dGF0aW9ucztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWRva3VSdWxlcyh5LCB4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dpbmcgY29uc29sZSBsb2dzXHJcblxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgIGlmICh5ID09IDMgJiYgeCA+IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ5OiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIHg6IFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHggK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImN1cnJlbnQgU3RhdGUgb2YgdGlsZTogXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsZS5udW0udG9TdHJpbmcoMikgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dJbmZvLmVtcHR5VGlsZUNvb3Jkcy5sZW5ndGggK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgdGlsZXMgaW4gdGhpcyByb3cgc3VtIHRvIFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0luZm8uc3VtICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxucG9zc2libGUgcm93UGVybXV0YXRpb25zIFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd1Blcm11dGF0aW9ucy5tYXAoKGVsKSA9PiBlbC50b1N0cmluZygyKSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG5jb21iaW5lZFJvd1Blcm11dGF0aW9ucyBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21iaW5lZFJvd1Blcm11dGF0aW9ucy50b1N0cmluZygyKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbmZpeGVkSW5Sb3cgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWRJblJvdy50b1N0cmluZygyKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbnJvd1Blcm11dGF0aW9ucyB3aXRoIG9ubHkgZml4ZWQgbnVtYmVycyBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dQZXJtdXRhdGlvbnMuZmlsdGVyKChwZXJtdXRhdGlvbikgPT4gKHBlcm11dGF0aW9uICYgZml4ZWRJblJvdykgPT09IGZpeGVkSW5Sb3cpLm1hcCgoZWwpID0+IGVsLnRvU3RyaW5nKDIpKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbEluZm8uZW1wdHlUaWxlQ29vcmRzLmxlbmd0aCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiB0aWxlcyBpbiB0aGlzIGNvbHVtbiBzdW0gdG8gXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sSW5mby5zdW0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG5wb3NzaWJsZSBjb2xQZXJtdXRhdGlvbnMgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sUGVybXV0YXRpb25zLm1hcCgoZWwpID0+IGVsLnRvU3RyaW5nKDIpKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbmNvbWJpbmVkQ29sUGVybXV0YXRpb25zIFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmVkQ29sUGVybXV0YXRpb25zLnRvU3RyaW5nKDIpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5tYXRyaXg6IFwiLCB0aGlzLm1hdHJpeCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlZHVjZVRvU3VwZXJwb3NpdGlvbihwZXJtdXRhdGlvbnM6IG51bWJlcltdKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gcGVybXV0YXRpb25zLnJlZHVjZSgoYWNjLCBjdXIpID0+IHtcclxuICAgICAgICAgICAgYWNjIHw9IGN1cjtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBfc3Vkb2t1UnVsZXMoeTogbnVtYmVyLCB4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAvLyBhbGwgb2YgdGhpcyBuZWVkcyB0byBiZSByZXdyaXR0ZW5cclxuICAgICAgICAvLyB3ZSBjaGVjaywgaG93IG1hbnkgcG9zc2libGUgbnVtYmVycyB0aGUgY3VycmVudCB0aWxlIGhhc1xyXG4gICAgICAgIC8vIGlmIHRoZSB0aWxlIGlzIGFscmVhZHkgZml4ZWQsIGl0IHNob3VsZCByZXR1cm4gMSBudW1iZXJcclxuICAgICAgICBsZXQgcG9zc2libGVOdW1iZXJzID0gdGhpcy5tYXRyaXhbeV1beF0ubnVtLnRvU3RyaW5nKDIpLnNwbGl0KFwiMVwiKS5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICBsZXQgY29sSW5mbyA9IHRoaXMuX2dldENvbHVtbkluZm8oeSwgeCk7XHJcbiAgICAgICAgY29sSW5mby5lbXB0eVRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5udW0gPT09IHRoaXMubWF0cml4W3ldW3hdLm51bSkge1xyXG4gICAgICAgICAgICAgICAgcG9zc2libGVOdW1iZXJzIC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocG9zc2libGVOdW1iZXJzID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbEluZm8uZW1wdHlUaWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRyaXhbeV1beF0ubnVtID09IHRoaXMubWF0cml4W2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5udW0pIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0cml4W2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5udW0gJj0gfnRoaXMubWF0cml4W3ldW3hdLm51bTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3NzaWJsZU51bWJlcnMgPSB0aGlzLm1hdHJpeFt5XVt4XS5udW0udG9TdHJpbmcoMikuc3BsaXQoXCIxXCIpLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgbGV0IHJvd0luZm8gPSB0aGlzLl9nZXRSb3dJbmZvKHksIHgpO1xyXG4gICAgICAgIHJvd0luZm8uZW1wdHlUaWxlQ29vcmRzLmZvckVhY2goKGNvb3JkczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1hdHJpeFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0ubnVtID09PSB0aGlzLm1hdHJpeFt5XVt4XS5udW0pIHtcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlTnVtYmVycyAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHBvc3NpYmxlTnVtYmVycyA9PT0gMCkge1xyXG4gICAgICAgICAgICByb3dJbmZvLmVtcHR5VGlsZUNvb3Jkcy5mb3JFYWNoKChjb29yZHM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0cml4W3ldW3hdLm51bSA9PSB0aGlzLm1hdHJpeFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0ubnVtKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdHJpeFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0ubnVtICY9IH50aGlzLm1hdHJpeFt5XVt4XS5udW07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIHRpbGUgc3RpbGwgaGFzIHRoZSBudW1iZXJzIGUuZy4gMSBhbmQgMiwgd2UgbG9vayBvdXQgZm9yIGFub3RoZXIgdGlsZSB0aGF0IGhhcyBvbmx5IDEgb3IgMiBhcyBwb3NzaWJsZSBudW1iZXJcclxuICAgICAgICAvLyBpZiB0aGF0IGlzIHRoZSBjYXNlLCB0aGVuIGFsbCB0aGUgb3RoZXIgdGlsZXMgaW4gdGhlIHJvdyBvciBjb2x1bW4gc2hvdWxkIGhhdmUgdGhlIG51bWJlciAxIGFuZCAyIHJlbW92ZWQgZnJvbSB0aGVpciBwb3NzaWJsZSBudW1iZXJzXHJcblxyXG4gICAgICAgIC8vIC8vY3VycmVudGx5IG9ubHkgZGVsZXRlcyBudW1iZXJzIGluIG90aGVyIHRpbGVzLCB3aGVuIGN1cnJlbnQgdGlsZSBpcyBmaXhlZFxyXG4gICAgICAgIC8vIGxldCBvbmx5UG9zc2libGVOdW1iZXIgPSB0aGlzLm1hdHJpeFt5XVt4XS5vbmx5UG9zc2libGVOdW1iZXIoKTtcclxuICAgICAgICAvLyBpZiAoIW9ubHlQb3NzaWJsZU51bWJlcikge1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyAvLyBnZXQgYWxsIG90aGVyIHRpbGVzLCBpZ25vcmUgdGhlIG9uZSB0aGF0IGlzIGN1cnJlbnRseSBiZWluZyBjaGVja2VkIGFuZCBkZWxldGUgdGhlIG51bWJlciBmcm9tIHRoZSBvdGhlciB0aWxlcyB0aGF0IGlzIGZpeGVkIGluIHRoZSBjdXJyZW50IHRpbGVcclxuICAgICAgICAvLyBsZXQgY29sSW5mbyA9IHRoaXMuX2dldENvbHVtbkluZm8oeSwgeCk7XHJcbiAgICAgICAgLy8gY29sSW5mby5lbXB0eVRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgaWYgKGNvb3Jkc1swXSA9PT0geSAmJiBjb29yZHNbMV0gPT09IHgpIHJldHVybjtcclxuICAgICAgICAvLyAgICAgdGhpcy5tYXRyaXhbY29vcmRzWzBdXVtjb29yZHNbMV1dLm51bSAmPSB+dGhpcy5tYXRyaXhbeV1beF0ubnVtO1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAvLyBsZXQgcm93SW5mbyA9IHRoaXMuX2dldFJvd0luZm8oeSwgeCk7XHJcbiAgICAgICAgLy8gcm93SW5mby5lbXB0eVRpbGVDb29yZHMuZm9yRWFjaCgoY29vcmRzOiBhbnkpID0+IHtcclxuICAgICAgICAvLyAgICAgaWYgKGNvb3Jkc1swXSA9PT0geSAmJiBjb29yZHNbMV0gPT09IHgpIHJldHVybjtcclxuICAgICAgICAvLyAgICAgdGhpcy5tYXRyaXhbY29vcmRzWzBdXVtjb29yZHNbMV1dLm51bSAmPSB+dGhpcy5tYXRyaXhbeV1beF0ubnVtO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGxvb3BzIHVwIHRvIGZpbmQgdGhlIHN1bSBvZiB0aGUgY29sdW1uXHJcbiAgICAgKiBsb29wcyBkb3duIGZyb20gdGhlcmUgdG8gZmluZCB0aGUgZW1wdHkgdGlsZXMgYmVsb3cgdGhhdCBzdW1cclxuICAgICAqIEByZXR1cm5zIGFycmF5IHdpdGggdGhlIHN1bSB0byB0aGUgcmlnaHQgYW5kIHRoZSBhbW91bnQgb2YgZW1wdHkgdGlsZXMgaW4gdGhlIGNvbHVtblxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29sdW1uSW5mbyh5OiBudW1iZXIsIHg6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgd2hpbGUgKHkgPj0gMCAmJiB0aGlzLm1hdHJpeFt5XVt4XSBpbnN0YW5jZW9mIFBsYXlhYmxlVGlsZSkge1xyXG4gICAgICAgICAgICB5LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbXB0eVRpbGVzSW5mbyA9IFtdO1xyXG4gICAgICAgIHdoaWxlICh5ICsgZW1wdHlUaWxlc0luZm8ubGVuZ3RoIDwgOSAmJiB0aGlzLm1hdHJpeFt5ICsgZW1wdHlUaWxlc0luZm8ubGVuZ3RoICsgMV1beF0gaW5zdGFuY2VvZiBQbGF5YWJsZVRpbGUpIHtcclxuICAgICAgICAgICAgZW1wdHlUaWxlc0luZm8ucHVzaChbeSArIGVtcHR5VGlsZXNJbmZvLmxlbmd0aCArIDEsIHhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7IHN1bTogdGhpcy5tYXRyaXhbeV1beF0uY29sU3VtLCBlbXB0eVRpbGVDb29yZHM6IGVtcHR5VGlsZXNJbmZvIH07XHJcbiAgICB9XHJcblxyXG4gICAgX2dldFJvd0luZm8oeTogbnVtYmVyLCB4OiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIHdoaWxlICh4ID49IDAgJiYgdGhpcy5tYXRyaXhbeV1beF0gaW5zdGFuY2VvZiBQbGF5YWJsZVRpbGUpIHtcclxuICAgICAgICAgICAgeC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZW1wdHlUaWxlc0luZm8gPSBbXTtcclxuICAgICAgICB3aGlsZSAoeCArIGVtcHR5VGlsZXNJbmZvLmxlbmd0aCA8IDkgJiYgdGhpcy5tYXRyaXhbeV1beCArIGVtcHR5VGlsZXNJbmZvLmxlbmd0aCArIDFdIGluc3RhbmNlb2YgUGxheWFibGVUaWxlKSB7XHJcbiAgICAgICAgICAgIGVtcHR5VGlsZXNJbmZvLnB1c2goW3ksIHggKyBlbXB0eVRpbGVzSW5mby5sZW5ndGggKyAxXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4geyBzdW06IHRoaXMubWF0cml4W3ldW3hdLnJvd1N1bSwgZW1wdHlUaWxlQ29vcmRzOiBlbXB0eVRpbGVzSW5mbyB9O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVE9ETzpcclxuICogLSBhZXN0aGV0aWNzOiAgICAgICAgICAgICAgICBtYWtlIHRoZSBjb2xvcnMgcHJldHRpZXIgdG8gbG9vayBhdCBpbiB2aWV3IChtYXliZSBvbmx5IHNob3cgbGl0dGxlIG51bWJlcnMgaWYgYW55IHNvcnQgb2Ygc29sdmluZyBoYXMgYmVlbiBzdGFydGVkKVxyXG4gKiAtIGFlc3RoZXRpY3MgKyBtZWNoYW5pY3M6ICAgIGFmdGVyIGVhY2ggY2xpY2sgb2YgdGhlIHNvbHZlIGJ1dHRvbiwgY29sb3IgdGhlIHRpbGVzIHRoYXQgaGF2ZSBiZWVuIGFmZmVjdGVkIGJ5IHRoZSBzb2x2ZSBjaGFuZ2UgZnVuY3Rpb24gKHRoaXMgcmVxdWlyZXMgdG8gc2F2ZSBhIGNvcHkgb2YgdGhlIHByZXZpb3VzIHN0YXRlIG9mIHRoZSBtYXRyaXgpXHJcbiAqIC0gbWVjaGFuaWNzOiAgICAgICAgICAgICAgICAgbWFrZSBhIHNvbHZlQWxsIGJ1dHRvbiB0aGF0IHJlcGVhdGVkbHkvcmVjdXJzaXZlbHkgY2FsbHMgdGhlIHNvbHZlIGZ1bmN0aW9uIHVudGlsIG5vIG1vcmUgY2hhbmdlcyBjYW4gYmUgbWFkZVxyXG4gKiAtIHJlYWRhYmlsaXR5OiAgICAgICAgICAgICAgIG1ha2UgdGhlIGNvZGUgbW9yZSByZWFkYWJsZSBieSBzcGxpdHRpbmcgdGhlIHNvbHZlIGZ1bmN0aW9uIGludG8gc21hbGxlciBmdW5jdGlvbnMgaWYgcG9zc2libGVcclxuICogLSByZWFkYWJpbGl0eTogICAgICAgICAgICAgICBtYWtlIHRoZSBjb2RlIG1vcmUgcmVhZGFibGUgYnkgYWRkaW5nIGNvbW1lbnRzIHRvIHRoZSBjb2RlXHJcbiAqIC0gZXJyb3IgaGFuZGxpbmc6ICAgICAgICAgICAgYWRkIGVycm9yIGhhbmRsaW5nIGZvciB0aGUgY2FzZSB0aGF0IHRoZSBpbnB1dCBtYXRyaXggaXMgbm90IHZhbGlkXHJcbiAqIC0gZXJyb3IgaGFuZGxpbmc6ICAgICAgICAgICAgYWRkIGVycm9yIGhhbmRsaW5nIGZvciB0aGUgY2FzZSB0aGF0IHRoZSBzdW0gb2YgdGhlIHJvdyBvciB0aGUgY29sdW1uIGlzbid0IHZhbGlkXHJcbiAqIC0gcnVsZXM6ICAgICAgICAgICAgICAgICAgICAgZm9yIGVhc3lbMV0sIHNwZWNpZnkgYSBydWxlIHRoYXQsIGluIGNhc2Ugc29tZSBudW1iZXJzIGFyZSBhbHJlYWR5IGZpeGVkIGFzIHRoZSBmaW5hbCBudW1iZXJzLCByZWFwcGxpZXMgdGhlIHN1bVRhYmxlIChpZiB5b3UgaGF2ZSB0aHJlZSB0aWxlcyBpbiBhIHJvdyBhbmQgb25lIGlzIGFscmVhZHkgc2FmZSwgdGhlIHN1bSBvZiB0aGUgb3RoZXIgdHdvIHRpbGVzIGNhbiBiZSByZWNhbGN1bGF0ZWQgYW5kIHRlc3RlZCBhZ2FpbnN0IHRoZSBzdW1UYWJsZSlcclxuICogLSBydWxlczogICAgICAgICAgICAgICAgICAgICBmb3IgZWFzeVsxXSwgc3BlY2lmeSBhIHJ1bGUgdGhhdCBzb2x2ZXMgcm93IDIgYnkgcmVhbGl6aW5nIHRoYXQgb25seSA4IGFuZCA5IGFyZSBhbHJlYWR5IGZpeGVkIGZvciB0aGUgZmluYWwgcGVybXV0YXRpb24gYW5kIGFkanVzdCB0aGUgb3RoZXIgdGlsZXMgYWNjb3JkaW5nbHlcclxuICovXHJcbiIsImV4cG9ydCBjbGFzcyBUaWxlIHt9XHJcblxyXG5leHBvcnQgY2xhc3MgUGxheWFibGVUaWxlIGV4dGVuZHMgVGlsZSB7XHJcbiAgICBudW06IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihudW06IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5udW0gPSBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMDAxMDAwMDAwIC0+IDdcclxuICAgIC8vIDExMDExMDEwMCAtPiAwXHJcbiAgICBvbmx5UG9zc2libGVOdW1iZXIoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5udW0udG9TdHJpbmcoMikuc3BsaXQoXCIxXCIpLmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLm51bS50b1N0cmluZygyKS5zcGxpdChcIjFcIilbMV0ubGVuZ3RoICsgMTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFVucGxheWFibGVUaWxlIGV4dGVuZHMgVGlsZSB7XHJcbiAgICBjb2xTdW06IG51bWJlcjtcclxuICAgIHJvd1N1bTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbFN1bTogbnVtYmVyLCByb3dTdW06IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5jb2xTdW0gPSBjb2xTdW07XHJcbiAgICAgICAgdGhpcy5yb3dTdW0gPSByb3dTdW07XHJcbiAgICB9XHJcblxyXG4gICAgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xTdW0gPT09IDAgJiYgdGhpcy5yb3dTdW0gPT09IDA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgVGlsZSwgUGxheWFibGVUaWxlLCBVbnBsYXlhYmxlVGlsZSB9IGZyb20gXCIuL3RpbGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBWaWV3IHtcclxuICAgIGJvYXJkOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHRpbGVTaXplOiBudW1iZXI7XHJcbiAgICB0aWxlUGFkZGluZzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBib2FyZFNpZGVMZW5ndGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgYm9yZGVyUmFkaXVzOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIHByaXZhdGUgYm9hcmRDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkLWNvbnRhaW5lclwiKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICB0aGlzLmJvcmRlclJhZGl1cyA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXdCb2FyZChtYXRyaXg6IGFueVtdW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jcmVhdGVDYW52YXMobWF0cml4KTtcclxuICAgICAgICB0aGlzLl9kcmF3QmFja2dyb3VuZCgpO1xyXG5cclxuICAgICAgICBtYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUNvcm5lclggPSB4ICogdGhpcy50aWxlU2l6ZTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlQ29ybmVyWSA9IHkgKiB0aGlzLnRpbGVTaXplO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSB1bnBsYXlhYmxlIHRpbGVzIHdpdGggc3Vtc1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgaW5zdGFuY2VvZiBVbnBsYXlhYmxlVGlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdVbnBsYXlhYmxlVGlsZSh0aWxlLCBub2RlQ29ybmVyWCwgbm9kZUNvcm5lclkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhd1BsYXlhYmxlVGlsZSh0aWxlLCBub2RlQ29ybmVyWCwgbm9kZUNvcm5lclkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fZHJhd0dyaWRsaW5lcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RyYXdVbnBsYXlhYmxlVGlsZSh0aWxlOiBVbnBsYXlhYmxlVGlsZSwgbm9kZUNvcm5lclg6IG51bWJlciwgbm9kZUNvcm5lclk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBzdW1SaWdodCA9IHRpbGUucm93U3VtO1xyXG4gICAgICAgIGlmIChzdW1SaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIHN1bVJpZ2h0LnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAyIC0gdGhpcy50aWxlUGFkZGluZyAvIDIsXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAyIC0gdGhpcy50aWxlUGFkZGluZ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN1bURvd24gPSB0aWxlLmNvbFN1bTtcclxuICAgICAgICBpZiAoc3VtRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChzdW1Eb3duLnRvU3RyaW5nKCksIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDEsIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDMgLSB0aGlzLnRpbGVQYWRkaW5nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdW1Eb3duICYmIHN1bVJpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8obm9kZUNvcm5lclgsIG5vZGVDb3JuZXJZKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKG5vZGVDb3JuZXJYICsgdGhpcy50aWxlU2l6ZSwgbm9kZUNvcm5lclkgKyB0aGlzLnRpbGVTaXplKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gdGhpcy50aWxlU2l6ZSAvIDI1O1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RyYXdQbGF5YWJsZVRpbGUodGlsZTogUGxheWFibGVUaWxlLCBub2RlQ29ybmVyWDogbnVtYmVyLCBub2RlQ29ybmVyWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gYmFja2dyb3VuZCBmb3IgcGxheWFibGUgdGlsZVxyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwibGlnaHRncmF5XCI7XHJcbiAgICAgICAgdGhpcy5jdHgucmVjdChub2RlQ29ybmVyWCwgbm9kZUNvcm5lclksIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuXHJcbiAgICAgICAgLy8gdGhlIGFscmVhZHkgc2FmZSBudW1iZXJzIGluIHRoZSB0aWxlcyAoZS5nLiBpZiB0aGUgdGlsZSBoYXMgMDAxMDAwMDAwMSB3cml0dGVuLCA3IGlzIHRoZSBvbmx5IG51bWJlciBsZWZ0IHRvIGJlIHBsYWNlZCBpbiB0aGUgdGlsZSlcclxuICAgICAgICBsZXQgb25seVBvc3NpYmxlTnVtYmVyID0gdGlsZS5vbmx5UG9zc2libGVOdW1iZXIoKTtcclxuICAgICAgICBpZiAob25seVBvc3NpYmxlTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSB0aGlzLnRpbGVTaXplICsgXCJweCBBcmlhbFwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxyXG4gICAgICAgICAgICAgICAgb25seVBvc3NpYmxlTnVtYmVyLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWCArICh0aGlzLnRpbGVTaXplIC8gMykgKiAwICsgdGhpcy50aWxlUGFkZGluZyAqIDMsXHJcbiAgICAgICAgICAgICAgICBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiAzIC0gdGhpcy50aWxlUGFkZGluZyAqIDJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhlIG5vdGVkIG51bWJlcnMgaW4gdGhlIHRpbGVzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCEodGlsZS5udW0gJiAoMiAqKiBpKSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ3JleVwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgIChpICsgMSkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIChpICUgMykgKyB0aGlzLnRpbGVQYWRkaW5nLFxyXG4gICAgICAgICAgICAgICAgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogTWF0aC5mbG9vcigoaSArIDMpIC8gMykgLSB0aGlzLnRpbGVQYWRkaW5nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NyZWF0ZUNhbnZhcyhtYXRyaXg6IG51bWJlcltdW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLmJvYXJkLmlkID0gXCJib2FyZFwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUuYm94U2hhZG93ID0gXCI1cHggNXB4IDIwcHggZ3JheVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUuYm9yZGVyUmFkaXVzID0gdGhpcy5ib3JkZXJSYWRpdXMgKyBcIiVcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLm1hcmdpbiA9IFwiMSVcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLndpZHRoID0gdGhpcy5ib2FyZENvbnRhaW5lci5jbGllbnRXaWR0aCAqIDAuOTg7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5oZWlnaHQgPSB0aGlzLmJvYXJkQ29udGFpbmVyLmNsaWVudEhlaWdodCAqIDAuOTg7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5ib2FyZCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5ib2FyZC5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5ib2FyZFNpZGVMZW5ndGggPSB0aGlzLmJvYXJkLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIHRoaXMudGlsZVNpemUgPSB0aGlzLmJvYXJkU2lkZUxlbmd0aCAvIG1hdHJpeC5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy50aWxlUGFkZGluZyA9IHRoaXMudGlsZVNpemUgLyAxNTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kcmF3QmFja2dyb3VuZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgdGhpcy5jdHgucm91bmRSZWN0KDAsIDAsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGgsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGgsIHRoaXMuYm9hcmQuY2xpZW50V2lkdGggKiAodGhpcy5ib3JkZXJSYWRpdXMgLyAxMDApKTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZHJhd0dyaWRsaW5lcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8PSB0aGlzLmJvYXJkU2lkZUxlbmd0aDsgbCArPSB0aGlzLnRpbGVTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhsLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKGwsIHRoaXMuYm9hcmRTaWRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIGwpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy5ib2FyZFNpZGVMZW5ndGgsIGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB0aGlzLnRpbGVTaXplIC8gMjU7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBNb2RlbCB9IGZyb20gXCIuL21vZGVsXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XHJcbmltcG9ydCB7IGxldmVscyB9IGZyb20gXCIuL2xldmVsc1wiO1xyXG5cclxuLyoqIGhhbmRsZXMgYWxsIGlucHV0LCBjaGVja3MgaW4gd2l0aCBtb2RlbCBhbmQgZGlzcGxheXMgdGhlIHJlc3VsdCB3aXRoIHZpZXcgKi9cclxuXHJcbmNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgbW9kZWw6IE1vZGVsO1xyXG4gICAgdmlldzogVmlldztcclxuXHJcbiAgICAvLyBidXR0b25zXHJcbiAgICBzb2x2ZUJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IG5ldyBNb2RlbChsZXZlbHMubWVkaXVtWzBdKTtcclxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLl9nZXREb21FbGVtZW50cygpO1xyXG4gICAgICAgIHRoaXMuX2luaXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0RG9tRWxlbWVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb2x2ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic29sdmVcIikgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvbHZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc29sdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZVZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52aWV3LmRyYXdCb2FyZCh0aGlzLm1vZGVsLm1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy52aWV3LmJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHRoaXMuX2JvYXJkQ2xpY2tlZChldmVudCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2JvYXJkQ2xpY2tlZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYm9hcmQgY2xpY2tlZFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYXBwID0gbmV3IENvbnRyb2xsZXIoKTtcclxuXHJcbi8vIFwibnBtIHJ1biBzdGFydFwiIGluIHRlcm1pbmFsIHRvIHN0YXJ0IGxpdmUgc2VydmVyXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
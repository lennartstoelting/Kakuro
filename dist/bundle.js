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
    function Model(tilesAcross) {
        // grundsätzlich: unspielbar, Summenfeld, spielbar
        // Idee: 13 bit Zahl (bit 0: spielbar ja oder nein? bit 1-12: Summenfeld)
        this.matrix = this.initBinaryMatrix(easy1);
        console.log(this.matrix);
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
                // for all other cases, we see them as a decimal number. the 0th bit is 0, then the next 6 bit incript the two numbers to the right of the comma, and the last 6 bit incript the two numbers to the left of the comma
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
var tilesAcrossDefault = 10;
var Controller = /** @class */ (function () {
    function Controller() {
        this.model = new _model__WEBPACK_IMPORTED_MODULE_0__["default"](tilesAcrossDefault);
        this.view = new _view__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this._initEventListeners();
        this._updateView();
    }
    Controller.prototype._initEventListeners = function () {
        var _this = this;
        window.addEventListener("resize", function () {
            _this._updateView();
        });
    };
    Controller.prototype._updateView = function () {
        this.view.drawBoard(this.model.matrix);
        // this.view.board.addEventListener("click", (event: MouseEvent) => this._boardClicked(event));
    };
    return Controller;
}());
var app = new Controller();
// "npm run start" in terminal to start live server

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFHSSxlQUFZLFdBQW1CO1FBQzNCLGtEQUFrRDtRQUNsRCx5RUFBeUU7UUFDekUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGdDQUFnQixHQUFoQixVQUFpQixNQUFrQjtRQUMvQixJQUFJLFlBQVksR0FBZSxFQUFFLENBQUM7UUFDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLElBQUksU0FBUyxHQUFhLEVBQUUsQ0FBQztZQUM3QixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hCLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNiLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLE9BQU87Z0JBQ1gsQ0FBQztnQkFDRCxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDYixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLE9BQU87Z0JBQ1gsQ0FBQztnQkFFRCxxTkFBcU47Z0JBQ3JOLElBQUksU0FBUyxHQUFHLElBQUk7cUJBQ2YsT0FBTyxDQUFDLENBQUMsQ0FBQztxQkFDVixLQUFLLENBQUMsR0FBRyxDQUFDO3FCQUNWLEdBQUcsQ0FBQyxVQUFDLEdBQUcsSUFBSyxlQUFRLENBQUMsR0FBRyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7Z0JBRWpDLGlCQUFpQjtnQkFDakIsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixHQUFHLENBQUMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLENBQUM7Z0JBQ0QsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUM5RCxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxHQUFHLENBQUMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxHQUFHLGVBQWUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckgsQ0FBQztnQkFDRCxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQzlELE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsZUFBZSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNySCxDQUFDO2dCQUVELElBQUksZUFBZSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLElBQUssUUFBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUM7Z0JBQ3JGLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkUsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUNILFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBQ0wsWUFBQztBQUFELENBQUM7QUFFRCxpRUFBZSxLQUFLLEVBQUM7QUFFckIsSUFBTSxLQUFLLEdBQWU7SUFDdEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDdEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENB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QU0sQ0FBQyxDQUFDO1FBQ3ZDLCtGQUErRjtJQUNuRyxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDO0FBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztBQUU3QixtREFBbUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rYWt1cm8vLi9zcmMvbW9kZWwudHMiLCJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL3ZpZXcudHMiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tha3Vyby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va2FrdXJvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va2FrdXJvLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE1vZGVsIHtcclxuICAgIG1hdHJpeDogbnVtYmVyW11bXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0aWxlc0Fjcm9zczogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gZ3J1bmRzw6R0emxpY2g6IHVuc3BpZWxiYXIsIFN1bW1lbmZlbGQsIHNwaWVsYmFyXHJcbiAgICAgICAgLy8gSWRlZTogMTMgYml0IFphaGwgKGJpdCAwOiBzcGllbGJhciBqYSBvZGVyIG5laW4/IGJpdCAxLTEyOiBTdW1tZW5mZWxkKVxyXG4gICAgICAgIHRoaXMubWF0cml4ID0gdGhpcy5pbml0QmluYXJ5TWF0cml4KGVhc3kxKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1hdHJpeCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEJpbmFyeU1hdHJpeChtYXRyaXg6IG51bWJlcltdW10pOiBudW1iZXJbXVtdIHtcclxuICAgICAgICBsZXQgYmluYXJ5TWF0cml4OiBudW1iZXJbXVtdID0gW107XHJcbiAgICAgICAgbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYmluYXJ5Um93OiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBiaW5hcnlSb3cucHVzaCgwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGlsZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmFyeVJvdy5wdXNoKHBhcnNlSW50KFwiMVwiLnJlcGVhdCgxMCksIDIpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGFsbCBvdGhlciBjYXNlcywgd2Ugc2VlIHRoZW0gYXMgYSBkZWNpbWFsIG51bWJlci4gdGhlIDB0aCBiaXQgaXMgMCwgdGhlbiB0aGUgbmV4dCA2IGJpdCBpbmNyaXB0IHRoZSB0d28gbnVtYmVycyB0byB0aGUgcmlnaHQgb2YgdGhlIGNvbW1hLCBhbmQgdGhlIGxhc3QgNiBiaXQgaW5jcmlwdCB0aGUgdHdvIG51bWJlcnMgdG8gdGhlIGxlZnQgb2YgdGhlIGNvbW1hXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sQW5kUm93ID0gdGlsZVxyXG4gICAgICAgICAgICAgICAgICAgIC50b0ZpeGVkKDIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHN1bSkgPT4gcGFyc2VJbnQoc3VtKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcclxuICAgICAgICAgICAgICAgIGlmIChjb2xBbmRSb3cubGVuZ3RoICE9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXggYXQgeDogXCIgKyB4ICsgXCIgYW5kIHk6IFwiICsgeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sQW5kUm93WzBdID4gNDUgfHwgY29sQW5kUm93WzBdID09IDIgfHwgY29sQW5kUm93WzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIGlucHV0IG1hdHJpeDogc3VtIG9mIGNvbCBhdCB4OiBcIiArIHggKyBcIiBhbmQgeTogXCIgKyB5ICsgXCIgaXMgZ2l2ZW4gYXMgXCIgKyBjb2xBbmRSb3dbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbEFuZFJvd1sxXSA+IDQ1IHx8IGNvbEFuZFJvd1sxXSA9PSAyIHx8IGNvbEFuZFJvd1sxXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBpbnB1dCBtYXRyaXg6IHN1bSBvZiByb3cgYXQgeDogXCIgKyB4ICsgXCIgYW5kIHk6IFwiICsgeSArIFwiIGlzIGdpdmVuIGFzIFwiICsgY29sQW5kUm93WzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sQW5kUm93QmluYXJ5ID0gY29sQW5kUm93Lm1hcCgoc3VtKSA9PiAoXCIwMDAwMDBcIiArIHN1bS50b1N0cmluZygyKSkuc2xpY2UoLTYpKTtcclxuICAgICAgICAgICAgICAgIGxldCBiaW5hcnkgPSBwYXJzZUludChjb2xBbmRSb3dCaW5hcnlbMF0gKyBjb2xBbmRSb3dCaW5hcnlbMV0sIDIpIDw8IDE7XHJcbiAgICAgICAgICAgICAgICBiaW5hcnlSb3cucHVzaChiaW5hcnkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYmluYXJ5TWF0cml4LnB1c2goYmluYXJ5Um93KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYmluYXJ5TWF0cml4O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2RlbDtcclxuXHJcbmNvbnN0IGVhc3kxOiBudW1iZXJbXVtdID0gW1xyXG4gICAgWzAsIDAsIDQ1LCAzLCAwLCAwLCAwLCAzLCA0NSwgMF0sXHJcbiAgICBbMCwgMTcuMDgsIDEsIDEsIDAsIDE2LCA0LjAzLCAxLCAxLCAwXSxcclxuICAgIFswLjExLCAxLCAxLCAxLCAxNi4xNywgMSwgMSwgMSwgMSwgMTddLFxyXG4gICAgWzAuMTcsIDEsIDEsIDMuMTcsIDEsIDEsIDEsIDAuMTYsIDEsIDFdLFxyXG4gICAgWzAsIDAuMTgsIDEsIDEsIDEsIDAsIDAsIDE3LjEzLCAxLCAxXSxcclxuICAgIFswLCAxNy4wNCwgMSwgMSwgMCwgMCwgMy4xMSwgMSwgMSwgMF0sXHJcbiAgICBbMC4wOSwgMSwgMSwgMCwgMTYsIDMuMTYsIDEsIDEsIDEsIDRdLFxyXG4gICAgWzAuMTQsIDEsIDEsIDMuMSwgMSwgMSwgMSwgMTYuMTIsIDEsIDFdLFxyXG4gICAgWzAsIDAuMTksIDEsIDEsIDEsIDEsIDAuMTgsIDEsIDEsIDFdLFxyXG4gICAgWzAsIDAuMDUsIDEsIDEsIDAsIDAsIDAuMSwgMSwgMSwgMF0sXHJcbl07XHJcbiIsImNsYXNzIFZpZXcge1xyXG4gICAgYm9hcmQ6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgdGlsZVNpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgYm9hcmRTaWRlTGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGJvcmRlclJhZGl1czogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwcml2YXRlIGJvYXJkQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZC1jb250YWluZXJcIikgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5ib3JkZXJSYWRpdXMgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3Qm9hcmQobWF0cml4OiBudW1iZXJbXVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlQ2FudmFzKG1hdHJpeCk7XHJcbiAgICAgICAgdGhpcy5fZHJhd0JhY2tncm91bmQoKTtcclxuXHJcbiAgICAgICAgbWF0cml4LmZvckVhY2goKHJvdywgeSkgPT4ge1xyXG4gICAgICAgICAgICByb3cuZm9yRWFjaCgodGlsZSwgeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVDb3JuZXJYID0geCAqIHRoaXMudGlsZVNpemU7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZUNvcm5lclkgPSB5ICogdGhpcy50aWxlU2l6ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgdW5wbGF5YWJsZSB0aWxlcyB3aXRoIHN1bXNcclxuICAgICAgICAgICAgICAgIGlmICghKHRpbGUgJiAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdW1Ub1JpZ2h0ID0gKHRpbGUgPj4gMSkgJiA2MztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VtVG9SaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChzdW1Ub1JpZ2h0LnRvU3RyaW5nKCksIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIsIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1bVRvRG93biA9ICh0aWxlID4+IDcpICYgNjM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bVRvRG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5mb250ID0gdGhpcy50aWxlU2l6ZSAvIDMuNSArIFwicHggQXJpYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChzdW1Ub0Rvd24udG9TdHJpbmcoKSwgbm9kZUNvcm5lclggKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMSwgbm9kZUNvcm5lclkgKyAodGhpcy50aWxlU2l6ZSAvIDMpICogMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRoZSBlbXB0eSwgcGxheWFibGUgdGlsZXNcclxuICAgICAgICAgICAgICAgIGlmICh0aWxlICYgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwibGlnaHRncmF5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHgucmVjdChub2RlQ29ybmVyWCwgbm9kZUNvcm5lclksIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gOTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRpbGUgJiAoMiAqKiBpKSkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ3JleVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqICgoaSAtIDEpICUgMyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlQ29ybmVyWSArICh0aGlzLnRpbGVTaXplIC8gMykgKiBNYXRoLmZsb29yKChpICsgMikgLyAzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jdHguZm9udCA9IHRoaXMudGlsZVNpemUgLyAzLjUgKyBcInB4IEFyaWFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gXCJncmV5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jdHguZmlsbFRleHQoXCIxXCIsIG5vZGVDb3JuZXJYICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDAsIG5vZGVDb3JuZXJZICsgKHRoaXMudGlsZVNpemUgLyAzKSAqIDMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gdGhlcmUgbmVlZHMgdG8gYmUgYSBsaXR0bGUgYWRqdXN0bWVudHMgYmVjYXVzZSBvZiB0aGUgd2F5IHRoZSBjYW52YXMgZHJhd3MgdGhlIG51bWJlcnMgYnV0IHRoYXQgaXMgcHVyZWx5IGNvc21ldGljXHJcbiAgICAgICAgdGhpcy5fZHJhd0dyaWRsaW5lcygpO1xyXG5cclxuICAgICAgICAvLyBtYXRyaXguZm9yRWFjaCgocm93LCB5KSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHJvdy5mb3JFYWNoKCh0aWxlLCB4KSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbm9kZUNlbnRlclggPSB4ICogdGhpcy50aWxlU2l6ZSArIHRoaXMudGlsZVNpemUgLyAyO1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IG5vZGVDZW50ZXJZID0geSAqIHRoaXMudGlsZVNpemUgKyB0aGlzLnRpbGVTaXplIC8gMjtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBpZiAodGlsZSA9PT0gMSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjMwcHggQXJpYWxcIjtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCIxXCIsIG5vZGVDZW50ZXJYLCBub2RlQ2VudGVyWSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NyZWF0ZUNhbnZhcyhtYXRyaXg6IG51bWJlcltdW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLmJvYXJkLmlkID0gXCJib2FyZFwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUuYm94U2hhZG93ID0gXCI1cHggNXB4IDIwcHggZ3JheVwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmQuc3R5bGUuYm9yZGVyUmFkaXVzID0gdGhpcy5ib3JkZXJSYWRpdXMgKyBcIiVcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLnN0eWxlLm1hcmdpbiA9IFwiMSVcIjtcclxuICAgICAgICB0aGlzLmJvYXJkLndpZHRoID0gdGhpcy5ib2FyZENvbnRhaW5lci5jbGllbnRXaWR0aCAqIDAuOTg7XHJcbiAgICAgICAgdGhpcy5ib2FyZC5oZWlnaHQgPSB0aGlzLmJvYXJkQ29udGFpbmVyLmNsaWVudEhlaWdodCAqIDAuOTg7XHJcbiAgICAgICAgdGhpcy5ib2FyZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5ib2FyZCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5ib2FyZC5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5ib2FyZFNpZGVMZW5ndGggPSB0aGlzLmJvYXJkLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIHRoaXMudGlsZVNpemUgPSB0aGlzLmJvYXJkU2lkZUxlbmd0aCAvIG1hdHJpeC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZHJhd0JhY2tncm91bmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIHRoaXMuY3R4LnJvdW5kUmVjdCgwLCAwLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoLCB0aGlzLmJvYXJkLmNsaWVudFdpZHRoICogKHRoaXMuYm9yZGVyUmFkaXVzIC8gMTAwKSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RyYXdHcmlkbGluZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPD0gdGhpcy5ib2FyZFNpZGVMZW5ndGg7IGwgKz0gdGhpcy50aWxlU2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8obCwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhsLCB0aGlzLmJvYXJkU2lkZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbygwLCBsKTtcclxuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHRoaXMuYm9hcmRTaWRlTGVuZ3RoLCBsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gdGhpcy50aWxlU2l6ZSAvIDI1O1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWaWV3O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBNb2RlbCBmcm9tIFwiLi9tb2RlbFwiO1xyXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3XCI7XHJcblxyXG4vKiogaGFuZGxlcyBhbGwgaW5wdXQsIGNoZWNrcyBpbiB3aXRoIG1vZGVsIGFuZCBkaXNwbGF5cyB0aGUgcmVzdWx0IHdpdGggdmlldyAqL1xyXG5cclxudmFyIHRpbGVzQWNyb3NzRGVmYXVsdCA9IDEwO1xyXG5cclxuY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgICBtb2RlbDogTW9kZWw7XHJcbiAgICB2aWV3OiBWaWV3O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBuZXcgTW9kZWwodGlsZXNBY3Jvc3NEZWZhdWx0KTtcclxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLl9pbml0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRFdmVudExpc3RlbmVycygpOiB2b2lkIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91cGRhdGVWaWV3KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmlldy5kcmF3Qm9hcmQodGhpcy5tb2RlbC5tYXRyaXgpO1xyXG4gICAgICAgIC8vIHRoaXMudmlldy5ib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB0aGlzLl9ib2FyZENsaWNrZWQoZXZlbnQpKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYXBwID0gbmV3IENvbnRyb2xsZXIoKTtcclxuXHJcbi8vIFwibnBtIHJ1biBzdGFydFwiIGluIHRlcm1pbmFsIHRvIHN0YXJ0IGxpdmUgc2VydmVyXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
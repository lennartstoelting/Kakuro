class View {
    board: HTMLCanvasElement;
    tileSize: number;
    private boardSideLength: number;
    private borderRadius: number;

    private ctx: CanvasRenderingContext2D;
    private boardContainer: HTMLDivElement;

    constructor() {
        this.boardContainer = document.getElementById("board-container") as HTMLDivElement;
        this.borderRadius = 1;
    }

    public drawBoard(matrix: number[][]): void {
        this._createCanvas(matrix);
        this._drawBackground();
        this._drawGridlines();

        matrix.forEach((row, y) => {
            row.forEach((tile, x) => {
                let nodeCornerX = x * this.tileSize;
                let nodeCornerY = y * this.tileSize;

                // the unplayable tiles without sums
                if (!tile) {
                    return;
                }

                // the unplayable tiles with sums
                if (!(tile & 1)) {
                    let sumToRight = (tile >> 1) & 63;
                    if (sumToRight >= 2 && sumToRight <= 45) {
                        this.ctx.font = this.tileSize / 3.5 + "px Arial";
                        this.ctx.fillStyle = "white";
                        this.ctx.fillText(sumToRight.toString(), nodeCornerX + (this.tileSize / 3) * 2, nodeCornerY + (this.tileSize / 3) * 2);
                    }

                    let sumToDown = (tile >> 7) & 63;
                    if (sumToDown >= 2 && sumToDown <= 45) {
                        this.ctx.font = this.tileSize / 3.5 + "px Arial";
                        this.ctx.fillStyle = "white";
                        this.ctx.fillText(sumToDown.toString(), nodeCornerX + (this.tileSize / 3) * 1, nodeCornerY + (this.tileSize / 3) * 3);
                    }
                }

                // the empty, playable tiles
                if (tile & 1) {
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "lightgray";
                    this.ctx.rect(nodeCornerX, nodeCornerY, this.tileSize, this.tileSize);
                    this.ctx.stroke();
                    this.ctx.fill();

                    this.ctx.font = this.tileSize / 3.5 + "px Arial";
                    this.ctx.fillStyle = "grey";
                    this.ctx.fillText("1", nodeCornerX + (this.tileSize / 3) * 0, nodeCornerY + (this.tileSize / 3) * 3);
                }
            });
        });

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
    }

    private _createCanvas(matrix: number[][]): void {
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
    }

    private _drawBackground(): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.roundRect(0, 0, this.board.clientWidth, this.board.clientWidth, this.board.clientWidth * (this.borderRadius / 100));
        this.ctx.stroke();
        this.ctx.fill();
    }

    private _drawGridlines(): void {
        this.ctx.beginPath();
        for (let l = 0; l <= this.boardSideLength; l += this.tileSize) {
            this.ctx.moveTo(l, 0);
            this.ctx.lineTo(l, this.boardSideLength);
            this.ctx.moveTo(0, l);
            this.ctx.lineTo(this.boardSideLength, l);
        }
        this.ctx.lineWidth = this.tileSize / 25;
        this.ctx.strokeStyle = "white";
        this.ctx.stroke();
    }
}

export default View;

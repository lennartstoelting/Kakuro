class View {
    board: HTMLCanvasElement;
    tileSize: number;
    tilePadding: number;
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

        matrix.forEach((row, y) => {
            row.forEach((tile, x) => {
                let nodeCornerX = x * this.tileSize;
                let nodeCornerY = y * this.tileSize;

                // the unplayable tiles with sums
                if (!(tile & 1)) {
                    let sumToRight = (tile >> 1) & 63;
                    if (sumToRight) {
                        this.ctx.font = this.tileSize / 3.5 + "px Arial";
                        this.ctx.fillStyle = "white";
                        this.ctx.fillText(
                            sumToRight.toString(),
                            nodeCornerX + (this.tileSize / 3) * 2 - this.tilePadding / 2,
                            nodeCornerY + (this.tileSize / 3) * 2 - this.tilePadding
                        );
                    }

                    let sumToDown = (tile >> 7) & 63;
                    if (sumToDown) {
                        this.ctx.font = this.tileSize / 3.5 + "px Arial";
                        this.ctx.fillStyle = "white";
                        this.ctx.fillText(
                            sumToDown.toString(),
                            nodeCornerX + (this.tileSize / 3) * 1,
                            nodeCornerY + (this.tileSize / 3) * 3 - this.tilePadding
                        );
                    }

                    if (sumToDown && sumToRight) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(nodeCornerX, nodeCornerY);
                        this.ctx.lineTo(nodeCornerX + this.tileSize, nodeCornerY + this.tileSize);
                        this.ctx.lineWidth = this.tileSize / 25;
                        this.ctx.strokeStyle = "white";
                        this.ctx.stroke();
                    }
                    return;
                }

                // the empty, playable tiles
                this.ctx.beginPath();
                this.ctx.fillStyle = "lightgray";
                this.ctx.rect(nodeCornerX, nodeCornerY, this.tileSize, this.tileSize);
                this.ctx.stroke();
                this.ctx.fill();

                // the already safe numbers in the tiles (e.g. if the tile has 0010000001 written, 7 is the only number left to be placed in the tile)
                if (tile.toString(2).split("1").length == 3) {
                    let safeNumber = tile.toString(2).split("1")[1].length + 1;
                    this.ctx.font = this.tileSize + "px Arial";
                    this.ctx.fillStyle = "black";
                    this.ctx.fillText(
                        safeNumber.toString(),
                        nodeCornerX + (this.tileSize / 3) * 0 + this.tilePadding * 3,
                        nodeCornerY + (this.tileSize / 3) * 3 - this.tilePadding * 2
                    );
                    return;
                }

                // the noted numbers in the tiles
                for (let i = 1; i <= 9; i++) {
                    if (!(tile & (2 ** i))) continue;

                    this.ctx.font = this.tileSize / 3.5 + "px Arial";
                    this.ctx.fillStyle = "grey";
                    this.ctx.fillText(
                        i.toString(),
                        nodeCornerX + (this.tileSize / 3) * ((i - 1) % 3) + this.tilePadding,
                        nodeCornerY + (this.tileSize / 3) * Math.floor((i + 2) / 3) - this.tilePadding
                    );
                }

                // this.ctx.font = this.tileSize / 3.5 + "px Arial";
                // this.ctx.fillStyle = "grey";
                // this.ctx.fillText("1", nodeCornerX + (this.tileSize / 3) * 0, nodeCornerY + (this.tileSize / 3) * 3);
            });
        });

        // there needs to be a little adjustments because of the way the canvas draws the numbers but that is purely cosmetic
        this._drawGridlines();
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
        this.tilePadding = this.tileSize / 15;
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

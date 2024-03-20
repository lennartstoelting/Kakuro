import { Tile, PlayableTile, UnplayableTile } from "./tile";

export class View {
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

    public drawBoard(matrix: any[][]): void {
        this._createCanvas(matrix);
        this._drawBackground();

        matrix.forEach((row, y) => {
            row.forEach((tile, x) => {
                let nodeCornerX = x * this.tileSize;
                let nodeCornerY = y * this.tileSize;

                // the unplayable tiles with sums
                if (tile instanceof UnplayableTile) {
                    this._drawUnplayableTile(tile, nodeCornerX, nodeCornerY);
                    return;
                } else {
                    this._drawPlayableTile(tile, nodeCornerX, nodeCornerY);
                }
            });
        });

        this._drawGridlines();
    }

    private _drawUnplayableTile(tile: UnplayableTile, nodeCornerX: number, nodeCornerY: number): void {
        let sumRight = tile.rowSum;
        if (sumRight) {
            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(
                sumRight.toString(),
                nodeCornerX + (this.tileSize / 3) * 2 - this.tilePadding / 2,
                nodeCornerY + (this.tileSize / 3) * 2 - this.tilePadding
            );
        }

        let sumDown = tile.colSum;
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
    }

    private _drawPlayableTile(tile: PlayableTile, nodeCornerX: number, nodeCornerY: number): void {
        // background for playable tile
        this.ctx.beginPath();
        this.ctx.fillStyle = "lightgray";
        this.ctx.rect(nodeCornerX, nodeCornerY, this.tileSize, this.tileSize);
        this.ctx.stroke();
        this.ctx.fill();

        // the already safe numbers in the tiles (e.g. if the tile has 0010000001 written, 7 is the only number left to be placed in the tile)
        let onlyPossibleNumber = tile.onlyPossibleNumber();
        if (onlyPossibleNumber) {
            this.ctx.font = this.tileSize + "px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(
                onlyPossibleNumber.toString(),
                nodeCornerX + (this.tileSize / 3) * 0 + this.tilePadding * 3,
                nodeCornerY + (this.tileSize / 3) * 3 - this.tilePadding * 2
            );
            return;
        }

        // the noted numbers in the tiles
        for (let i = 0; i < 9; i++) {
            if (!(tile.num & (2 ** i))) continue;

            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "grey";
            this.ctx.fillText(
                (i + 1).toString(),
                nodeCornerX + (this.tileSize / 3) * (i % 3) + this.tilePadding,
                nodeCornerY + (this.tileSize / 3) * Math.floor((i + 3) / 3) - this.tilePadding
            );
        }
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

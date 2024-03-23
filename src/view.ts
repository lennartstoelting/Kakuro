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

    public drawBoard(matrix: number[][]): void {
        this.createCanvas(matrix);
        this.drawBackground();

        matrix.forEach((row, y) => {
            row.forEach((tile, x) => {
                let nodeCornerY = y * this.tileSize;
                let nodeCornerX = x * this.tileSize;

                // the unplayable tiles with sums
                if (tile & 511) {
                    this.drawPlayableTile(tile, nodeCornerX, nodeCornerY);
                } else {
                    this.drawUnplayableTile(tile, nodeCornerX, nodeCornerY);
                }
            });
        });

        this.drawGridlines();
    }

    private drawUnplayableTile(tile: number, nodeCornerX: number, nodeCornerY: number): void {
        let colValue = tile >> 15;
        if (colValue) {
            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(colValue.toString(), nodeCornerX + (this.tileSize / 3) * 1, nodeCornerY + (this.tileSize / 3) * 3 - this.tilePadding);
        }

        let rowValue = (tile >> 9) & 63;
        if (rowValue) {
            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(
                rowValue.toString(),
                nodeCornerX + (this.tileSize / 3) * 2 - this.tilePadding / 2,
                nodeCornerY + (this.tileSize / 3) * 2 - this.tilePadding
            );
        }

        if (colValue && rowValue) {
            this.ctx.beginPath();
            this.ctx.moveTo(nodeCornerX, nodeCornerY);
            this.ctx.lineTo(nodeCornerX + this.tileSize, nodeCornerY + this.tileSize);
            this.ctx.lineWidth = this.tileSize / 25;
            this.ctx.strokeStyle = "white";
            this.ctx.stroke();
        }
    }

    private drawPlayableTile(tile: number, nodeCornerX: number, nodeCornerY: number): void {
        // background for playable tile
        this.ctx.beginPath();
        this.ctx.fillStyle = "lightgray";
        this.ctx.rect(nodeCornerX, nodeCornerY, this.tileSize, this.tileSize);
        this.ctx.stroke();
        this.ctx.fill();

        // the already safe numbers in the tiles (e.g. if the tile has 000 001 000 written, 4 is the only number left to be placed in the tile)
        // 000 001 000 -> nach split -> ["00000", "000"]
        let onlyPossibleNumber = tile.toString(2).split("1");
        if (onlyPossibleNumber.length === 2) {
            this.ctx.font = this.tileSize + "px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(
                (onlyPossibleNumber[1].length + 1).toString(),
                nodeCornerX + (this.tileSize / 3) * 0 + this.tilePadding * 3,
                nodeCornerY + (this.tileSize / 3) * 3 - this.tilePadding * 2
            );
            return;
        }

        // the candidate numbers in the tiles
        for (let i = 0; i < 9; i++) {
            if (!(tile & (2 ** i))) continue;

            this.ctx.font = this.tileSize / 3.5 + "px Arial";
            this.ctx.fillStyle = "grey";
            this.ctx.fillText(
                (i + 1).toString(),
                nodeCornerX + (this.tileSize / 3) * (i % 3) + this.tilePadding,
                nodeCornerY + (this.tileSize / 3) * Math.floor((i + 3) / 3) - this.tilePadding
            );
        }
    }

    private createCanvas(matrix: number[][]): void {
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

    private drawBackground(): void {
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.roundRect(0, 0, this.board.clientWidth, this.board.clientWidth, this.board.clientWidth * (this.borderRadius / 100));
        this.ctx.stroke();
        this.ctx.fill();
    }

    private drawGridlines(): void {
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

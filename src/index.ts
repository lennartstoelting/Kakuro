import { Model } from "./model";
import { View } from "./view";
import { levels } from "./levels";

/** handles all input, checks in with model and displays the result with view */

class Controller {
    model: Model;
    view: View;

    // buttons
    solveButton: HTMLButtonElement;

    constructor() {
        this.model = new Model(levels.medium[0]);
        this.view = new View();

        this._getDomElements();
        this._initEventListeners();

        this._updateView();
    }

    private _getDomElements(): void {
        this.solveButton = document.getElementById("solve") as HTMLButtonElement;
    }

    private _initEventListeners(): void {
        window.addEventListener("resize", () => {
            this._updateView();
        });

        this.solveButton.addEventListener("click", () => {
            this.model.solve();
            this._updateView();
        });
    }

    private _updateView(): void {
        this.view.drawBoard(this.model.matrix);
        this.view.board.addEventListener("click", (event: MouseEvent) => this._boardClicked(event));
    }

    private _boardClicked(event: MouseEvent): void {
        console.log("board clicked");
    }
}

const app = new Controller();

// "npm run start" in terminal to start live server

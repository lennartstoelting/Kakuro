import Model from "./model";
import View from "./view";

/** handles all input, checks in with model and displays the result with view */

class Controller {
    model: Model;
    view: View;

    constructor() {
        this.model = new Model();
        this.view = new View();

        this._initEventListeners();

        this._updateView();
    }

    private _initEventListeners(): void {
        window.addEventListener("resize", () => {
            this._updateView();
        });
    }

    private _updateView(): void {
        this.view.drawBoard(this.model.matrix);
        // this.view.board.addEventListener("click", (event: MouseEvent) => this._boardClicked(event));
    }
}

const app = new Controller();

// "npm run start" in terminal to start live server

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

        this.getDomElements();
        this.initEventListeners();

        this.updateView();
    }

    private getDomElements(): void {
        this.solveButton = document.getElementById("solve") as HTMLButtonElement;
    }

    private initEventListeners(): void {
        window.addEventListener("resize", () => {
            this.updateView();
        });

        this.solveButton.addEventListener("click", () => {
            this.model.solve();
            this.updateView();
        });
    }

    private updateView(): void {
        this.view.drawBoard(this.model.matrix);
        this.view.board.addEventListener("click", (event: MouseEvent) => this.boardClicked(event));
    }

    private boardClicked(event: MouseEvent): void {
        console.log("board clicked");
    }
}

const app = new Controller();

// "npm run start" in terminal to start live server

import { Model } from "./model";
import { View } from "./view";
import { levels } from "./levels";

/** handles all input, checks in with model and displays the result with view */

class Controller {
    model: Model;
    view: View;

    // buttons
    solveOneStepButton: HTMLButtonElement;
    solveAllButton: HTMLButtonElement;

    constructor() {
        this.model = new Model(levels.easy[0]);
        this.view = new View();

        this.getDomElements();
        this.initEventListeners();

        this.updateView();
    }

    private getDomElements(): void {
        this.solveOneStepButton = document.getElementById("solve-step") as HTMLButtonElement;
        this.solveAllButton = document.getElementById("solve-all") as HTMLButtonElement;
    }

    private initEventListeners(): void {
        window.addEventListener("resize", () => {
            this.updateView();
        });

        this.solveOneStepButton.addEventListener("click", () => {
            this.model.solveStep();
            this.updateView();
        });

        this.solveAllButton.addEventListener("click", () => {
            this.model.solveAll();
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

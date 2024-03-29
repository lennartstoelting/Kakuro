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
    debug1: HTMLButtonElement;

    constructor() {
        this.model = new Model(levels.medium[0]);
        this.view = new View();

        this.getDomElements();
        this.initEventListeners();

        this.updateView();
    }

    private getDomElements(): void {
        this.solveOneStepButton = document.getElementById("solve-step") as HTMLButtonElement;
        this.solveAllButton = document.getElementById("solve-all") as HTMLButtonElement;
        this.debug1 = document.getElementById("b1") as HTMLButtonElement;
    }

    private initEventListeners(): void {
        window.addEventListener("resize", () => {
            this.updateView();
        });

        this.solveOneStepButton.addEventListener("click", () => {
            this.view.solvingInProgress = true;
            this.model.solveStep();
            this.updateView();
        });

        this.solveAllButton.addEventListener("click", () => {
            this.view.solvingInProgress = true;
            this.model.solveAll();
            this.updateView();
        });

        this.debug1.addEventListener("click", () => {
            this.model.solveTile(5, 4);
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

/**
 * TODO:
 * - aesthetics:                make the colors prettier to look at in view (maybe only show little numbers if any sort of solving has been started)
 * - aesthetics + mechanics:    after each click of the solveStep button, color the tiles that have been affected by the solve change function (this requires to save a copy of the previous state of the matrix)
 * - mechanics:                 make a solveAll button that repeatedly/recursively calls the solve function until no more changes can be made
 * - readability:               make the code more readable by splitting the solveStep function into smaller functions if possible
 * - readability:               make the code more readable by adding comments to the code
 * - error handling:            add error handling for the case that the input matrix is not valid
 * - error handling:            add error handling for the case that the sum of the row or the column isn't valid
 * - mechanics:                 level selection and level change
 * - mechanics:                 similar to solve, add a create level function that creates a level randomly
 *
 * DONE:
 * - rules:                     for easy[1], specify a rule that solves row 2 by realizing that only 8 and 9 are already fixed for the final permutation and adjust the other tiles accordingly
 * - rules:                     for easy[1], specify a rule that, in case some numbers are already fixed as the final numbers, reapplies the sumTable (if you have three tiles in a row and one is already safe, the sum of the other two tiles can be recalculated and tested against the sumTable)
 */

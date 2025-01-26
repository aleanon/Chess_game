import { Page } from "./page.js";
import { Model } from "../model.js";

export class HomePage implements Page {
    public readonly urlElement: string = "home/";
    private readonly CONTAINER_ID = "home-page";
    private readonly BUTTON_CONTAINER_ID = "home-button-container";
    private readonly COMPUTER_BTN_ID = "computer-mode-btn";
    private readonly FRIEND_BTN_ID = "friend-mode-btn";
    private readonly PRACTICE_BTN_ID = "practice-mode-btn";

    private container!: HTMLElement;
    private computerButton!: HTMLButtonElement;
    private friendButton!: HTMLButtonElement;
    private practiceButton!: HTMLButtonElement;

    constructor() {
        document.body.innerHTML = this.createHTML();

        this.initializeElements();

        this.setupEventListeners();
    }

    private createHTML(): string {
        return /*HTML*/ `
            <div id="${this.CONTAINER_ID}" class="container">
                <header>
                    <h1>Chess</h1>
                </header>
                <main>
                    <div id="${this.BUTTON_CONTAINER_ID}" class="button-container">
                        <button id="${this.COMPUTER_BTN_ID}" class="game-btn">
                            Play vs Computer
                        </button>
                        <button id="${this.FRIEND_BTN_ID}" class="game-btn">
                            Play vs Friend
                        </button>
                        <button id="${this.PRACTICE_BTN_ID}" class="game-btn">
                            Practice Mode
                        </button>
                    </div>
                </main>
            </div>
        `;
    }

    private initializeElements(): void {
        // Get all element references once and store them
        this.container = document.getElementById(
            this.CONTAINER_ID
        ) as HTMLElement;
        this.computerButton = document.getElementById(
            this.COMPUTER_BTN_ID
        ) as HTMLButtonElement;
        this.friendButton = document.getElementById(
            this.FRIEND_BTN_ID
        ) as HTMLButtonElement;
        this.practiceButton = document.getElementById(
            this.PRACTICE_BTN_ID
        ) as HTMLButtonElement;
    }

    private setupEventListeners(): void {
        // Now we can use our stored references directly
        this.computerButton.addEventListener("click", () =>
            this.startComputerGame()
        );
        this.friendButton.addEventListener("click", () =>
            this.startFriendGame()
        );
        this.practiceButton.addEventListener("click", () =>
            this.startPracticeMode()
        );
    }

    private startComputerGame(): void {
        console.log("Starting computer game...");
    }

    private startFriendGame(): void {
        console.log("Starting friend game...");
    }

    private startPracticeMode(): void {
        console.log("Starting practice mode...");
    }

    update(model: Model): void {}

    updateView(): void {
        this.container.style.display = "block";
    }

    hide(): void {
        this.container.style.display = "none";
    }
}

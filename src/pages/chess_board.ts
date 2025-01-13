import { Page } from "./page";

export class ChessBoard implements Page {
    public readonly urlElement: string;
    
    private readonly BOARD_CONTAINER_ID = 'chess-board-container';
    private readonly BOARD_ID = 'chess-board';

    private readonly BOARD_CONTAINER_ELEMENT: HTMLElement;

    constructor(sessionId: string) {
        this.urlElement = "board/" + sessionId;
        
        document.body.innerHTML = this.createHTML();

        this.BOARD_CONTAINER_ELEMENT = document.getElementById(this.BOARD_CONTAINER_ID) as HTMLElement;
    }

    private createHTML(): string {
        return /*HTML*/`
            <div id="${this.BOARD_CONTAINER_ID}" class="board-container">
                <div id="${this.BOARD_ID}" class="chess-board">
                    ${this.createBoardRows()}
                </div>
            </div>
        `;
    }

    private createBoardRows(): string {
        let board = '';
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        
        // Create rows from 8 to 1 (top to bottom)
        for (let rank = 8; rank >= 1; rank--) {
            board += `<div class="board-row">`;
            
            // Create squares within each row (a to h)
            for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
                const file = files[fileIndex];
                const squareColor = (rank + fileIndex) % 2 === 0 ? 'light' : 'dark';
                const squareId = `${file}${rank}`;
                
                board += `
                    <div id="${squareId}" 
                         class="square ${squareColor}" 
                         data-file="${file}" 
                         data-rank="${rank}">
                    </div>`;
            }
            
            board += `</div>`;
        }
        
        return board;
    }

    view(): void {
        this.BOARD_CONTAINER_ELEMENT.style.display = 'block';
    }
    hide(): void {
        this.BOARD_CONTAINER_ELEMENT.style.display = 'none';
    }
    update(): void {}

}
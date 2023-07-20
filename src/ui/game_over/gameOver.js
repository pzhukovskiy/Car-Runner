import { Config } from "../../config/Config";

export class gameOver {
    constructor() {
        this.text = Config.game_over.text;
        this.text_restart = Config.game_over_restart.text
    }

    init() {
        document.getElementById('game_over').style = "display: flex";
        document.getElementById('game_over').innerText = this.text;

        document.getElementById('restart').style = "display: flex";
        document.getElementById('restart').innerText = this.text_restart;

        document.getElementById('restart').addEventListener('click', () => {
            location.reload();
        })
    }
}

const game_over = new gameOver();

export {game_over}
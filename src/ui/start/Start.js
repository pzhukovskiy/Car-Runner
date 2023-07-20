import { Config } from "../../config/Config";
import { player } from "../../player/Player";
import { score } from "../score/Score";
import { speed } from "../speed/Speed";

export class Start {
    constructor() {
        this.text = Config.start.text
    }
    
    init(func) {
        document.getElementById('start').innerText = this.text
        document.getElementById('start').addEventListener('click', () => {
            document.getElementById('start').style = "display: none";
            score.update();
            speed.update();
            player.movePlayer();
            return func();
        })
    }
}

const start_play = new Start();

export {start_play}
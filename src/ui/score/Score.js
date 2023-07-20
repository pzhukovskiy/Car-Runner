import { Config } from "../../config/Config";

export class Score {
    constructor() {
        this.score = Config.score.text;
        this.points = Config.points.text;
    }

    update() {
        document.getElementById('score').innerText = 'Счёт: ' + this.score;
        this.score += this.points;
    }
}

const score = new Score();

export {score};
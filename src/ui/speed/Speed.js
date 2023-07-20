import { Config } from "../../config/Config";

export class Speed {
    constructor() {
        this.speed = Config.player_speed.speed;
    }

    update() {
        document.getElementById('speed').innerText = 'Скорость: ' + this.speed;
    }
}

const speed = new Speed();

export {speed}
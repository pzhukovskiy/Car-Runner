import * as THREE from "three";

export class Time {
    constructor() {
        this.time = new THREE.Clock();
    }

    update() {
        this.time.getDelta();
        document.getElementById('time').innerText = 'Время: ' + this.time.elapsedTime.toFixed(0)
    }
}

const time = new Time();

export {time}
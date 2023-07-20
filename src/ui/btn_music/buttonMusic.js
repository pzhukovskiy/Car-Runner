import { soundPlay } from "../../music/Music";
import image from '../../../assets/images/music.png';

export class buttonMusic {
    constructor() {

    }

    init() {
        this.img = document.createElement('img');
        this.img.src = image;
        this.img.height = 70;
        document.getElementById('music').appendChild(this.img);
    }

    update() {
        document.getElementById('music').addEventListener('click', () => {
            soundPlay();
        })
    }
}

const btn_music = new buttonMusic();

export {btn_music}
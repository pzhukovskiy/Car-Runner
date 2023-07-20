import { coin } from "../coin/Coin";
import { obstacle } from "../obstacle/Obstacle";
import { player } from "../player/Player";
import { road } from "../road/Road";
import { tree } from "../tree/Tree";

export class gameLoader {//сюда загрузить все модели + текстуры и выгружать от сюда

    init() {
        road.init();
        obstacle.loadFbx();
        tree.loadFbx();
        coin.loadFbx();
    }

    collision() {
        coin.checkCollision(player);
        obstacle.checkCollision(player);
    }
}
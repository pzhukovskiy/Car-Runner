import * as THREE from "three";
import { scene } from "./scene/Scene";
import { renderer } from "./renderer/Renderer";
import { player } from "./player/Player";
import { camera, lookPlayer } from "./camera/Camera";
import { time } from "./ui/time/Time";
import { btn_music } from "./ui/btn_music/buttonMusic";
import { start_play } from "./ui/start/Start";
import { road } from "./road/Road";
import { gameLoader } from "./gameLoader/gameLoader";
import { obstacle } from "./obstacle/Obstacle";
import { coin } from "./coin/Coin";
import { statsInit } from "./stats/Stats";
import { tree } from "./tree/Tree";
import '../style.css';

const delta = new THREE.Clock();
let anim;

//загрузка всех моделей
const loader = new gameLoader();
loader.init();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function update() {
    anim = requestAnimationFrame(update);//анимация
    
    // statsInit();//показать fps
    const deltaTime = delta.getDelta();//получаем delta

    obstacle.delete();//удаляем препятствия, когда игрок пересекает дорогу
    coin.delete();//удаляем монетки, когда игрок пересекает дорогу
    tree.delete();//удаляем деревья, когда игрок пересекает дорогу
    loader.collision()
    animate();//рендер
    player.startMove(deltaTime);//движение игрока
    lookPlayer();//следование за игроком
    road.updateRoad();//генерация новой дороги
    time.update();//обновление игрового времени
}

function init() {
    window.addEventListener("resize", onWindowResize);
    btn_music.init();//загрузка из-ия музыки
    start_play.init(update);//начать игру
    btn_music.update();//стоп/продолжить музыку
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
init();

export {anim}
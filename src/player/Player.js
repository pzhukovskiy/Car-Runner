import { scene } from "../scene/Scene";
import { resourceLoader } from "../resourceLoader/resourceLoader";
import { controller } from "../controller/Controller";
import { Config } from "../config/Config";
import { Road } from "../road/Road";
import carTexture from '../../assets/images/car-texture-atlas.jpg';
import carModel from '../../assets/models/car.fbx';

controller.update();

export class Player {
    constructor() {
        this.road = new Road().roadPositions;
        this.speed = Config.player_speed.speed;
        this.playerPosition = 0;
    }

    async loadModel() {
        const loadingCar = await resourceLoader.loadFbxTexture(carModel, carTexture);
        this.obj = loadingCar.obj;
        this.obj.position.set(0, 1.5, 10);
        this.obj.rotation.set(Math.PI/2, 0, Math.PI);
        scene.add(this.obj);
    }

    startMove(deltaTime) {
        this.obj.position.z -= this.speed * deltaTime;
    }

    _jump() {
        const jumpHeight = 7.5;
        const jumpDuration = 750;
    
        const initialPositionY = this.obj.position.y;
    
        const startTime = performance.now();
    
        const animateJump = (currentTime) => {
            const elapsedTime = currentTime - startTime;
    
            if (elapsedTime < jumpDuration) {
                const progress = elapsedTime / jumpDuration;
                const deltaY = Math.sin(progress * Math.PI) * jumpHeight;
    
                this.obj.position.y = initialPositionY + deltaY;
                requestAnimationFrame(animateJump);
            } else {
                this.obj.position.y = initialPositionY;
            }
        }
    
        requestAnimationFrame(animateJump);
    }

    movePlayer() {
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case "KeyA": {
                    if (this.playerPosition > 0) {
                        this.playerPosition--;
                        this.obj.position.x = this.road[this.playerPosition];
                        break;
                    }
                }
                case "KeyD": {
                    if (this.playerPosition < this.road.length - 1) {
                        this.playerPosition++;
                        this.obj.position.x = this.road[this.playerPosition];
                        break;
                    }
                }

                case "ArrowLeft": {
                    if (this.playerPosition > 0) {
                        this.playerPosition--;
                        this.obj.position.x = this.road[this.playerPosition];
                        break;
                    }
                }
                case "ArrowRight": {
                    if (this.playerPosition < this.road.length - 1) {
                        this.playerPosition++;
                        this.obj.position.x = this.road[this.playerPosition];
                        break;
                    }
                }

                case "Space": {
                    this._jump();
                    break;
                }
            }
        });
    }
}

const player = new Player(); 
player.loadModel();

export {player}
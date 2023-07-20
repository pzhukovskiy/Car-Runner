import { scene } from "../scene/Scene";
import { fbxloader, textureLoader } from "../resourceLoader/resourceLoader";
import { crush_music } from "../music/Music";
import obstacleModel from '../../assets/models/barrier.fbx';
import obstacleTexture from '../../assets/images/objects-texture-atlas.png';
import { game_over } from "../ui/game_over/gameOver";
import { player } from "../player/Player";
import { anim } from "../main";

export class Obstacle {
  constructor() {
    this.musics = crush_music;
    this.obstacles = [];
    this.obstaclesPositions = [-7.5, 0, 7.5];
    this.value = 3;
    this.roadLength = 90;
  }

  loadFbx() {
    textureLoader.load(obstacleTexture, (texture) => {
      for (let i = 0; i < this.value; i++) {
        fbxloader.load(obstacleModel, (loadedObject) => {
          this.obj = loadedObject.clone(); 
          this.obj.traverse((child) => {
          if (child.isMesh) {
            child.material.map = texture;
          }
        });

          const obstacleX = this.obstaclesPositions[i % 3];
          const obstacleY = 0;
          const obstacleZ = Math.random() * (-40 - (-10)) + (-10);
  
          this.obj.position.set(obstacleX, obstacleY, obstacleZ);
          this.obj.scale.set(3, 3, 3);
          this.obj.rotation.set(0, 0, 0);
          scene.add(this.obj);
          this.obstacles.push(this.obj);
      }); 
      }
    });
  }

  checkCollision(player) {
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      if (player && player.obj && obstacle && obstacle.position) {
        const distance = player.obj.position.distanceTo(obstacle.position);
        if (distance - 1 <= player.obj.scale.z + obstacle.scale.z) {
          scene.remove(obstacle);
          this.musics.play();
          game_over.init(); 
          cancelAnimationFrame(anim);
          this.obstacles.splice(i, 1);
          break;
        }
      }
    }
  }

  delete() {
    if(player.obj.position.z <= -this.roadLength/1.25) {
      for(let i = 0; i < this.obstacles.length - this.value; i++) {
          scene.remove(this.obstacles[i])
      }
    }
  }

  generateObstaclesForRoad(roadIndex) {
    textureLoader.load(obstacleTexture, (texture) => {
      for (let i = 0; i < this.value; i++) {
        fbxloader.load(obstacleModel, (loadedObject) => {
          this.obj = loadedObject.clone(); 
          this.obj.traverse((child) => {
            if (child.isMesh) {
              child.material.map = texture;
            }
          });

          this.obj.position.set(this.obstaclesPositions[i % 3], 1, -this.roadLength * (roadIndex) - Math.random() * (-this.roadLength - (-this.roadLength/2)) + (-this.roadLength/2));
          this.obj.scale.set(3, 3, 3);
          this.obj.rotation.set(0, 0, 0);
          this.obstacles.push(this.obj);
          scene.add(this.obj);
        }); 
        }
    });
  }
}

const obstacle = new Obstacle();

export {obstacle}
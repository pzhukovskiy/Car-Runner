import { scene } from "../scene/Scene";
import {coin_1_music, coin_2_music, coin_3_music, coin_4_music} from "../music/Music";
import { fbxloader } from "../resourceLoader/resourceLoader";
import { score } from "../ui/score/Score";
import { player } from "../player/Player";
import { coinColor } from "../colors/Colors";
import coinModel from '../../assets/models/coin.fbx';

export class Coin {
  constructor() {
    this.musics = [coin_1_music, coin_2_music, coin_3_music, coin_4_music];
    this.coins = [];
    this.value = 10;
    this.roadLength = 90;
    this.coinPositions = [-7.5, 0, 7.5]
  }

  loadFbx() {
    fbxloader.load(coinModel, (loadedObject) => {
      for (let i = 0; i < this.value; i++) {
        this.obj = loadedObject.clone();
        this.obj.traverse((child) => {
          if (child.isMesh) {
            child.material = coinColor;
          }
        });
        this.obj.position.set(this.coinPositions[i % 3], 1, Math.random() * (-40 - (-10)) + (-10));
        this.obj.scale.set(0.01, 0.01, 0.01);
        this.obj.rotation.set(Math.PI / 2, 0, Math.PI);
        this.coins.push(this.obj);
        scene.add(this.obj);
      }
    });
  }

  generateCoinsForRoad(roadIndex) {
    fbxloader.load(coinModel, (loadedObject) => {
      for (let i = 0; i < this.value; i++) {
        this.obj = loadedObject.clone();
        this.obj.traverse((child) => {
          if (child.isMesh) {
            child.material = coinColor;
          }
        });

        this.obj.position.set(this.coinPositions[i % 3], 1, -this.roadLength * (roadIndex) - Math.random() * (-this.roadLength - (-this.roadLength/2)) + (-this.roadLength/2));
        this.obj.scale.set(0.01, 0.01, 0.01);
        this.obj.rotation.set(Math.PI / 2, 0, Math.PI);
        this.coins.push(this.obj);
        scene.add(this.obj);
      }
    });
  }

  checkCollision(player) {
    for (let i = 0; i < this.coins.length; i++) {
      const coin = this.coins[i];
      if (player && player.obj && coin && coin.position) {
        const distance = player.obj.position.distanceTo(coin.position);
        if (distance - 4 <= player.obj.scale.z + coin.scale.z) {
          score.update();
          scene.remove(coin);
          this.musics[Math.floor(Math.random() * this.musics.length)].play();
          this.coins.splice(i, 1);
          break;
        }
      }
    }
  }

  delete() {
    if(player.obj.position.z <= -this.roadLength/1.25) {
      for(let i = 0; i < this.coins.length - this.value; i++) {
          scene.remove(this.coins[i])
      }
    }
  }
}

const coin = new Coin();

export {coin}
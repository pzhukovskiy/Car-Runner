import { fbxloader } from "../resourceLoader/resourceLoader";
import { scene } from "../scene/Scene";
import { player } from "../player/Player";
import treeModel from '../../assets/models/tree.fbx';
import { treeColor } from "../colors/Colors";

export class Tree {
  constructor() {
    this.treePositions = [-16.5, 16.5];
    this.trees = [];
    this.value = 5;
    this.roadLength = 90;
  }

  loadFbx() {
    fbxloader.load(treeModel, (loadedObject) => {
      for (let i = 0; i < this.value; i++) {
        this.obj = loadedObject.clone();
        this.obj.traverse((child) => {
          if (child.isMesh) {
            child.material = treeColor;
          }
        });

        this.obj.position.set(this.treePositions[i % 2], 0, Math.random() * (-40 - (10)) + 10);
        this.obj.scale.set(3, 3, 3);
        this.obj.rotation.set(0, 0, 0);
        scene.add(this.obj);
        this.trees.push(this.obj);
        }
    });
  };

  delete() {
    if(player.obj.position.z <= -this.roadLength/1.25) {
      for(let i = 0; i < this.trees.length - this.value; i++) {
          scene.remove(this.trees[i])
      }
    }
  }

  generateTreesForRoad(roadIndex) {
    fbxloader.load(treeModel, (loadedObject) => {
      for (let i = 0; i < this.value; i++) {
        this.obj = loadedObject.clone();
        this.obj.traverse((child) => {
          if (child.isMesh) {
            child.material = treeColor;
          }
        });

        this.obj.position.set(this.treePositions[i % 2], 1, -this.roadLength * (roadIndex) - Math.random() * (-this.roadLength - (-this.roadLength/2)) + (-this.roadLength/2));
        this.obj.scale.set(3, 3, 3);
        this.obj.rotation.set(0, 0, 0);
        this.trees.push(this.obj);
        scene.add(this.obj);
      }
    });
  }
}

const tree = new Tree();

export {tree}
import * as THREE from "three";
import { scene } from "../scene/Scene";
import { player } from "../player/Player";
import { coin } from "../coin/Coin";
import roadTexture from '../../assets/images/road-texture.jpg';
import grassTexture from '../../assets/images/grass-texture.jpg';
import { tree } from "../tree/Tree";
import { obstacle } from "../obstacle/Obstacle";

export class Road {
    constructor() {
        this.roadPositions = [-7.5, 0, 7.5];
        this.roadContainer = new THREE.Object3D();
        this.roadLength = 90;
        this.currentRoadIndex = 0;
    }

    init() {
        const initialRoad = this._generateRoad();
        initialRoad.position.set(0, 0, 0);
        this.roadContainer.add(initialRoad);

        scene.add(this.roadContainer);
    }

    _generateRoad() {
        const roadMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(roadTexture) });
        roadMaterial.colorSpace = THREE.SRGBColorSpace;
        const roadGeometry = new THREE.PlaneGeometry(23, 90);
        roadGeometry.rotateX(Math.PI * 0.5);
        const road = new THREE.Mesh(roadGeometry, roadMaterial);
        road.rotation.set(0, 0, Math.PI);
        road.position.set(0, 0, -20);
      
        const propsGeometry = new THREE.PlaneGeometry(10, 90);
        propsGeometry.rotateX(Math.PI * 0.5);
        const propsMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(grassTexture) });
        propsMaterial.colorSpace = THREE.SRGBColorSpace;
      
        const propsLeft = new THREE.Mesh(propsGeometry, propsMaterial);
        propsLeft.position.set(-16.5, 0, 0);
      
        const propsRight = new THREE.Mesh(propsGeometry, propsMaterial);
        propsRight.position.set(16.5, 0, 0);
      
        road.add(propsLeft);
        road.add(propsRight);
      
        return road;
    }

    updateRoad() {
        const crossedRoads = Math.floor(player.obj.position.z / -this.roadLength);
        if (player.obj.position.z + 40 <= -this.roadLength * this.currentRoadIndex) {
            const oldRoad = this.roadContainer.children[this.currentRoadIndex];
            this.roadContainer.remove(oldRoad);
      
            const newRoad = this._generateRoad();
            newRoad.position.z = (this.currentRoadIndex + 1) * -this.roadLength;
            this.roadContainer.add(newRoad);
        
            this.currentRoadIndex++;
        
            for (let i = 0; i < crossedRoads; i++) {
                const oldRoad = this.roadContainer.children[i];
                this.roadContainer.remove(oldRoad);
            }
        
            coin.generateCoinsForRoad(this.currentRoadIndex);
            tree.generateTreesForRoad(this.currentRoadIndex);
            obstacle.generateObstaclesForRoad(this.currentRoadIndex);

            
        }
    }
}

const road = new Road();

export {road};
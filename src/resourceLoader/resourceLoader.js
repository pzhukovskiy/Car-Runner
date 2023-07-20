import * as THREE from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const fbxloader = new FBXLoader();
const textureLoader = new THREE.TextureLoader();

export class resourceLoader {
    static async loadFbxTexture(model, texture) {
        const result = await new Promise(resolve => {
            textureLoader.load(texture, loadedTexture => {
                fbxloader.load(model, loadedObject => {
                    this.obj = loadedObject;
                    this.obj.traverse((child) => {
                        if (child.isMesh) {
                            child.material.map = loadedTexture;
                        } 
                    });
                    resolve({ obj: loadedObject, texture: loadedTexture });
                });
            });
        }); 
        return result  
    };
};

export {fbxloader, textureLoader}
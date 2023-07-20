import * as THREE from "three";
import { Config } from "../config/Config";
import { ambientLight, directionalLight } from "../light/Light";

const scene = new THREE.Scene();
scene.background = new THREE.Color(Config.backgroud.color);
scene.add(ambientLight);
scene.add(directionalLight);

export {scene}
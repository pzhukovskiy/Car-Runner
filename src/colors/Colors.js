import * as THREE from "three";
import { Config } from "../config/Config";

const treeColor = new THREE.MeshStandardMaterial({
    color: `#${Config.tree_color.color}`,
    metalness: 0.5,
    roughness: 0.35,
});

const coinColor = new THREE.MeshStandardMaterial({
    color: `#${Config.coin_color.color}`,
    metalness: 0.5,
    roughness: 0.35,
  });

export {treeColor, coinColor}
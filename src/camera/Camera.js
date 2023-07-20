import * as THREE from "three";
import { player } from "../player/Player";

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 25, 20);
camera.lookAt(0, 0, 0);

function lookPlayer() {
    camera.position.copy(player.obj.position);
    camera.position.x += 0;
    camera.position.y += 20;
    camera.position.z += 15;
  
    camera.lookAt(player.obj.position);
}

export {camera, lookPlayer}
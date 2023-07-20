import { camera } from "../camera/Camera";
import { renderer } from "../renderer/Renderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const controller = new OrbitControls(camera, renderer.domElement);
controller.dampingFactor = 0.05;
controller.screenSpacePanning = false;
controller.minDistance = 10;
controller.maxDistance = 50;
controller.maxPolarAngle = Math.PI / 2;

export {controller}
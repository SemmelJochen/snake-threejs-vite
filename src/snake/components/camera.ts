import { PerspectiveCamera } from 'three';
import { Constants } from '../util/Constants';

function createCamera() {
	const camera = new PerspectiveCamera(
		75, // fov = Field Of View
		Constants.SCREEN_WIDTH / Constants.SCREEN_HEIGHT, // aspect ratio 
		0.1, // near clipping plane
		10000, // far clipping plane
	);

	//move camera to scene
	const cameraPos = Constants.CAMERA_POSITITON;
	camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);

	return camera;
}

export { createCamera };

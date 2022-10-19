import { AmbientLight, PointLight } from 'three';
import { Constants } from '../util/Constants';

function createLights() {
	// Create a directional light
	const pointLight = new PointLight(0xfff12f, 10 * Constants.BLOCK_SIZE, 20 * Constants.BLOCK_SIZE);
	const ambientLight = new AmbientLight(0xffa132, .1);

	// move the light right, up, and towards us
	pointLight.position.set(10, 10, Constants.CAMERA_POSITITON.z / 2);
	pointLight.lookAt(0, 0, 1);
	ambientLight.position.set(0, 0, 1)
	return [pointLight, ambientLight];
}

export { createLights };

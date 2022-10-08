import { AmbientLight, DirectionalLight, PointLight } from 'three';
import { Constants } from './Constants';

function createLights() {
	// Create a directional light
	const pointLight = new PointLight(0xffffaf, 100, 1000);
	const ambientLight = new AmbientLight(0xffacff, .6);

	// move the light right, up, and towards us
	pointLight.position.set(0, 0, Constants.CAMERA_POSITITON.z / 2);
	ambientLight.position.set(0, 0, 10)

	return [pointLight, ambientLight];
}

export { createLights };
import { WebGLRenderer } from 'three';
import { Constants } from '../util/Constants';

function createRenderer(container: HTMLElement) {
	const renderer = new WebGLRenderer({
		antialias: true,
		canvas: container,
	});

	renderer.physicallyCorrectLights = true;
	renderer.setSize(Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT);
	renderer.setPixelRatio(window.devicePixelRatio);
	return renderer;
}

export { createRenderer };

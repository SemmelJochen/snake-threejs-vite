import { Color, Scene } from 'three';

function createScene() {
  const scene = new Scene();

  scene.background = new Color(Color.NAMES.black)

  return scene;
}

export { createScene };

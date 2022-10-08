import { Clock, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { Entity } from '../components/Entity';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Snake } from '../components/Snake';

const clock = new Clock();

class Loop {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private updatables: Array<Entity>;
  private controls: OrbitControls;

  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer, updatables: Array<Entity>) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = updatables;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();
    this.controls.update();
 
    for (const object of this.updatables) {
      if (object instanceof Snake) {
        var relativeCameraOffset = new Vector3(0, -50, 200);
        var cameraOffset = relativeCameraOffset.applyMatrix4(object.getMesh().matrixWorld)
        let x = cameraOffset.x;
        let y = cameraOffset.y
        this.camera.position.setX(x);
        this.camera.position.setY(y);
        this.camera.lookAt(object.getMesh().position);
      }
      object.tick(delta);
    }
  }
}

export { Loop };

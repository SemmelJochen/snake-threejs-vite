import { Clock, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { Entity } from '../game/components/Entity';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Snake } from '../game/components/Snake';
import { Constants } from '../util/Constants';

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
        var relativeCameraOffset = Constants.CAMERA_POSITITON.clone();
        let head = object.getEntityMeshes()[0];
        var cameraOffset = relativeCameraOffset.applyMatrix4(head.matrixWorld)
        let x = cameraOffset.x;
        let y = cameraOffset.y
        this.camera.position.setX(x);
        this.camera.position.setY(y);
        this.camera.lookAt(head.position);
      }
      object.tick(delta);
    }
  }
}

export { Loop };

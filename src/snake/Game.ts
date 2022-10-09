import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { createCamera } from "./components/camera";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";
import { Food } from "./game/components/Food";
import { GameBoard } from "./game/components/GameBoard";
import { GameState } from "./game/components/GameState";
import { Snake } from "./game/components/Snake";
import { Loop } from "./systems/Loop";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";

export class Game {
	private state: GameState = GameState.STOPPED;
	private snake: Snake;
	private food: Food;
	private board: GameBoard;

	private renderer: WebGLRenderer;
	private scene: Scene;
	private camera: PerspectiveCamera;

	private loop: Loop;

	constructor(container: HTMLElement) {
		this.board = new GameBoard();
		this.snake = new Snake();
		this.food = new Food();

		this.scene = createScene();
		this.addGameBoardToScene();
		this.camera = createCamera()
		this.renderer = createRenderer(container);
		const lights = createLights();
		this.scene.add(...lights);

		new Resizer(container, this.camera, this.renderer);
		this.loop = new Loop(this.camera, this.scene, this.renderer, [this.snake, this.food]);
	}

	private addGameBoardToScene() {
		const tiles = this.board.getTiles();
		const border = this.board.getBorder();
		for (let tile of tiles.values()) {
			this.scene.add(tile);
		}
		for (let tile of border.values()) {
			this.scene.add(tile);
		}

		this.scene.add(...this.snake.getEntityMeshes());
	}

	public startGame() {
		if (this.state === GameState.STOPPED) {
			this.state = GameState.RUNNING;
			this.loop.start();
		}
	}
	public stopGame() {
		this.state = GameState.STOPPED;
		this.loop.stop();
	}
	public activateHelpers() {

	}

}
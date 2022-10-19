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
import { Constants } from './util/Constants'
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
		this.loop.appendCustomTickHandler(this.validateRules.bind(this));
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
	public validateRules(delta: number) {
		this.hasSnakeEatenFood();
		this.hasSnakeHitBorder();
		this.hasSnakeHitItself();
	}
	public hasSnakeEatenFood() {
		if (this.snake.getEntityMeshes()[0].position.equals(this.food.getEntityMeshes()[0].position)) {
			this.snake.levelUp();
			this.food.respawn();
		}
		return false;
	}
	public hasSnakeHitBorder() {
		const boardLength = Constants.BOARD_SIZE * Constants.BLOCK_SIZE;
		const snakeHead = this.snake.getEntityMeshes()[0];
		if (snakeHead.position.x <= - boardLength / 2
			|| snakeHead.position.x > boardLength / 2
			|| snakeHead.position.y <= - boardLength / 2
			|| snakeHead.position.y > boardLength / 2) {
			this.stopGame();
			return true;
		}
		return false;
	}
	public hasSnakeHitItself() {
		const snakeHead = this.snake.getEntityMeshes()[0];
		for (let i = 1; i < this.snake.getEntityMeshes().length; i++) {
			if (snakeHead.position.equals(this.snake.getEntityMeshes()[i].position)) {
				//this.stopGame();
				return true;
			}
		}
		return false;
	}
}
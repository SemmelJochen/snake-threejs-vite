import { BoxGeometry, Mesh, MeshStandardMaterial, Object3D, Vector2 } from "three";
import { Constants } from "./Constants";
import { Entity } from "./Entity";
export enum Direction {
	UP,
	DOWN,
	LEFT,
	RIGHT
}

export class Snake implements Entity {
	private body: Array<Object3D>;
	private material: MeshStandardMaterial;
	private geometry: BoxGeometry;
	private cube: Mesh;
	private bodyParts: Array<Object3D>;
	private velocity: Vector2;
	private moveActions: Array<Direction>

	constructor() {
		this.body = new Array<Object3D>();
		this.material = new MeshStandardMaterial({ color: 0x00ff00 });
		this.geometry = new BoxGeometry(Constants.TILE_SIZE, Constants.TILE_SIZE, Constants.TILE_SIZE);
		this.bodyParts = new Array<Object3D>();
		this.cube = new Mesh(this.geometry, this.material);
		this.cube.position.z = Constants.TILE_SIZE;
		this.bodyParts.push(this.cube)
		this.velocity = new Vector2(Constants.SNAKE_VELOCITY, 0);
		this.moveActions = new Array<Direction>();
		this.initInputController();
	}
	initInputController() {
		document.addEventListener('keydown', (event) => {
			const keyName = event.key;
			if (keyName === "ArrowUp" && this.velocity.y != -Constants.SNAKE_VELOCITY) {
				this.moveActions.push(Direction.UP);
			}
			if (keyName === "ArrowDown" && this.velocity.y != Constants.SNAKE_VELOCITY) {
				this.moveActions.push(Direction.DOWN);
			}
			if (keyName === "ArrowLeft" && this.velocity.x != Constants.SNAKE_VELOCITY) {
				this.moveActions.push(Direction.LEFT);
			}
			if (keyName === "ArrowRight" && this.velocity.x != -Constants.SNAKE_VELOCITY) {
				this.moveActions.push(Direction.RIGHT);

			}

		});

	}

	handleMove() {
		if (this.cube.position.x % Constants.TILE_SIZE == 0
			&& this.cube.position.y % Constants.TILE_SIZE == 0
			&& this.moveActions.length > 0) {
			for (let action in this.moveActions) {
				switch (this.moveActions.shift()) {
					case Direction.UP:
						this.velocity = new Vector2(0, Constants.SNAKE_VELOCITY);
						break;
					case Direction.DOWN:
						this.velocity = new Vector2(0, -Constants.SNAKE_VELOCITY);
						break;
					case Direction.LEFT:
						this.velocity = new Vector2(-Constants.SNAKE_VELOCITY, 0);
						break;
					case Direction.RIGHT:
						this.velocity = new Vector2(Constants.SNAKE_VELOCITY, 0);
				};
			}
		}
	}
	tick(delta: number): void {
		this.cube.position.y += this.velocity.y;
		this.cube.position.x += this.velocity.x;
		this.handleMove();
	}

	getMesh() {
		return this.cube;
	}

}



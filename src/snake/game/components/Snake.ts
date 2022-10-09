import { BoxGeometry, Mesh, MeshStandardMaterial, Vector2, Vector3 } from "three";
import { Constants } from "../../util/Constants";
import { Entity } from "./Entity";

class Direction {
	public static UP = new Direction("y", 1);
	public static DOWN = new Direction("y", -1);
	public static LEFT = new Direction("x", -1);
	public static RIGHT = new Direction("x", 1);;
	//public static NONE: DirectionNode = { axis: "none", value: 0 };
	public axis: "x" | "y";
	public value: number;
	private constructor(axis: "x" | "y", value: number) {
		this.axis = axis;
		this.value = value;
	}
}

export class Snake implements Entity {
	private body: Array<Mesh>;
	private velocity: Vector2;
	private moveActions: Array<Direction>
	private direction: Direction;

	constructor() {
		this.body = new Array<Mesh>();
		this.velocity = new Vector2(Constants.SNAKE_VELOCITY, 0);
		this.moveActions = new Array<Direction>();
		this.direction = Direction.DOWN;
		this.initInputController();
		this.initializeSnake();
	}
	private initializeSnake() {
		const material = new MeshStandardMaterial({ color: 0x00ff00 });
		const geometry = new BoxGeometry(Constants.BLOCK_SIZE, Constants.BLOCK_SIZE, Constants.BLOCK_SIZE);
		const head = new Mesh(geometry, material);
		head.position.setZ(Constants.Z_AXIS_FOCUS_POSITION);
		this.body.push(head)
		for (let i = 0; i < 1; i++) {
			this.levelUp();
		}
	}
	private initInputController() {
		document.addEventListener('keydown', (event) => {
			const keyName = event.key;
			if ((keyName === "ArrowUp" || keyName === "w") && this.direction != Direction.DOWN) {
				this.moveActions.push(Direction.UP);
			}
			if ((keyName === "ArrowDown" || keyName === "s") && this.direction != Direction.UP) {
				this.moveActions.push(Direction.DOWN);
			}
			if ((keyName === "ArrowLeft" || keyName === "a") && this.direction != Direction.RIGHT) {
				this.moveActions.push(Direction.LEFT);
			}
			if ((keyName === "ArrowRight" || keyName === "d") && this.direction != Direction.LEFT) {
				this.moveActions.push(Direction.RIGHT);

			}

		});

	}

	private checkForInput() {
		let head = this.body.at(0)!;
		if (head.position.x % Constants.BLOCK_SIZE == 0
			&& head.position.y % Constants.BLOCK_SIZE == 0
			&& this.moveActions.length > 0) {
			for (let action of this.moveActions) {
				this.direction = action;
				switch (action) {
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
				this.moveActions.shift();
			}
		}
	}

	public levelUp() {
		const material = new MeshStandardMaterial({ color: 0xff9aaa });
		const geometry = new BoxGeometry(Constants.BLOCK_SIZE, Constants.BLOCK_SIZE, Constants.BLOCK_SIZE);
		const newBodyPart = new Mesh(geometry, material);
		newBodyPart.position.setZ(Constants.Z_AXIS_FOCUS_POSITION);
		this.body.push(newBodyPart);
	}

	private move() {
		var next: Vector3 | null = null;
		for (let i = 0; i < this.body.length; i++) {
			let cube = this.body.at(i)!;
			var temp = null;
			if (!next) {
				//head
				next = new Vector3(cube.position.x, cube.position.y, cube.position.z);
				cube.position.add(new Vector3(this.velocity.x, this.velocity.y, 0));
			} else {
				//other body parts
				temp = { x: cube.position.x, y: cube.position.y, z: cube.position.z };
				//cube.position.set(next.x - (this.velocity.x * Constants.TILE_SIZE), next.y - (this.velocity.y * Constants.TILE_SIZE), next.z);
				cube.position.setX(next.x - this.velocity.x);
				cube.position.setY(next.y -	 this.velocity.y);
				next = new Vector3(temp.x, temp.y, temp.z);
			}

			//this.renderCube(cube);
		};
	}

	tick(delta: number): void {
		this.move();
		this.checkForInput();
	}

	public getEntityMeshes() {
		let arr = new Array<Mesh>();
		this.body.forEach((value, key) => {
			arr.push(value);
		});
		return arr;
	}

}



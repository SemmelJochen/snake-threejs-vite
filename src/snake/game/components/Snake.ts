import { BoxGeometry, Mesh, MeshStandardMaterial, ShaderMaterial, Vector3 } from "three";
import { Constants } from "../../util/Constants";
import { Entity } from "./Entity";

class Direction {
	public static UP = new Direction(new Vector3(0, Constants.SNAKE_VELOCITY, 0));
	public static DOWN = new Direction(new Vector3(0, -Constants.SNAKE_VELOCITY, 0));
	public static LEFT = new Direction(new Vector3(-Constants.SNAKE_VELOCITY, 0, 0));
	public static RIGHT = new Direction(new Vector3(Constants.SNAKE_VELOCITY, 0, 0));
	//public static NONE: DirectionNode = { axis: "none", value: 0 };
	public velocity: Vector3;
	private constructor(velocity: Vector3) {
		this.velocity = velocity
	}
}

export class Snake implements Entity {
	private tail: Array<Mesh>;
	private head: Mesh;
	//private velocity: Vector3;
	private moveActions: Array<Direction>
	private direction: Direction;

	constructor() {
		this.tail = new Array<Mesh>();
		this.levelUp()
		this.levelUp()
		this.levelUp()

		this.head = this.createHead();
		//this.velocity = new Vector3(Constants.SNAKE_VELOCITY, 0, 0);
		this.moveActions = new Array<Direction>();
		this.direction = Direction.DOWN;
		this.initInputController();
	}
	private createHead() {
		//const material = new MeshStandardMaterial({ color: 0x00ff00 });
		const _vertexShader = `
		void main() { 
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`
		const _fragmentShader = `
		void main() {
			gl_FragColor = vec4( 0.0, 1.0, 0.0, 1.0 );
		}`
		const material = new ShaderMaterial({
			uniforms: {},
			vertexShader: _vertexShader,
			fragmentShader: _fragmentShader,
		})
		const geometry = new BoxGeometry(Constants.BLOCK_SIZE, Constants.BLOCK_SIZE, Constants.BLOCK_SIZE);
		const head = new Mesh(geometry, material);
		head.position.setZ(Constants.Z_AXIS_FOCUS_POSITION);
		return head;
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

	private handleUserInput() {
		if (this.moveActions.length > 0 && this.head.position.x % Constants.BLOCK_SIZE == 0 && this.head.position.y % Constants.BLOCK_SIZE == 0) {
			for (let action of this.moveActions) {
				this.direction = action;
				switch (action) {
					case Direction.UP:
						this.direction = Direction.UP;
						break;
					case Direction.DOWN:
						this.direction = Direction.DOWN;
						break;
					case Direction.LEFT:
						this.direction = Direction.LEFT;
						break;
					case Direction.RIGHT:
						this.direction = Direction.RIGHT;
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
		for (let i = 0; i < Constants.BLOCK_SIZE; i++) {
			this.tail.push(newBodyPart.clone());
		}

	}

	private move() {
		let prevHeadPos = this.head.position.clone();
		this.head.position.add(this.direction.velocity);
		this.tail.forEach((value, key) => {
			let temp = value.position.clone();
			value.position.copy(prevHeadPos);
			prevHeadPos = temp;
		});
	}

	tick(delta: number): void {
		this.handleUserInput();
		this.move();
	}

	public getEntityMeshes() {
		let arr = new Array<Mesh>();
		arr.push(this.head);
		this.tail.forEach((value, key) => {
			arr.push(value);
		});
		return arr;
	}

}



export class Coordinate {
	private x: number;
	private y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	setX(x: number) {
		this.x = x;
	}
	setY(y: number) {
		this.y = y;
	}
	set(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	equals(coordinate: Coordinate) {
		return this.x == coordinate.getX() && this.y == coordinate.getY();
	}
}
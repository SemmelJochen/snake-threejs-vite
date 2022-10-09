import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";
import { Constants } from "../../util/Constants";
import { Coordinate } from "./Coordinate";

export class GameBoard {
	private boardSize = Constants.BOARD_SIZE;
	private tileSize = Constants.BLOCK_SIZE;
	private tiles: Map<Coordinate, Mesh>;
	private border: Map<Coordinate, Mesh>;
	private materialForEvenTiles = new MeshStandardMaterial({ color: 0xfffacf });
	private materialForOddTiles = new MeshStandardMaterial({ color: 0x62cff0 });
	private tileGeometry = new BoxGeometry(this.tileSize, this.tileSize, this.tileSize);

	constructor() {
		this.tiles = new Map<Coordinate, Mesh>();
		for (let x = -this.boardSize / 2; x < this.boardSize / 2; x++) {
			for (let y = - this.boardSize / 2; y < this.boardSize / 2; y++) {
				let tile = new Mesh(this.tileGeometry, (x + y) % 2 == 0 ? this.materialForEvenTiles : this.materialForOddTiles);
				tile.position.set(x * this.tileSize, y * this.tileSize, Constants.Z_AXIS_DEFAULT_POSITION);
				this.tiles.set(new Coordinate(x, y), tile);
			}
		}
		this.border = new Map<Coordinate, Mesh>();
		for (let x = -this.boardSize / 2 - 1; x < this.boardSize / 2 + 1; x++) {
			for (let y = - this.boardSize / 2 - 1; y < this.boardSize / 2 + 1; y++) {
				if (x == -this.boardSize / 2 - 1 || y == -this.boardSize / 2 - 1 || x == this.boardSize / 2 || y == this.boardSize / 2) {
					let tile = new Mesh(this.tileGeometry, new MeshStandardMaterial({ color: 0xf12345 }));
					let borderX = x * this.tileSize
					let borderY = y * this.tileSize
					tile.position.set(borderX, borderY, Constants.Z_AXIS_FOCUS_POSITION);
					this.border.set(new Coordinate(x, y), tile);
				}
			}
		}
	}

	getTiles() {
		return this.tiles;
	}

	getBorder() {
		return this.border;
	}
}
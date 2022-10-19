import { Mesh, BufferGeometry, Material, BoxGeometry, MeshStandardMaterial, Vector3 } from "three";
import { Constants } from "../../util/Constants";
import { Entity } from "./Entity";

export class Food implements Entity {
	private foodMesh: Mesh;
	constructor() {
		const material = new MeshStandardMaterial({ color: 0xa1ef70 });
		const geometry = new BoxGeometry(Constants.BLOCK_SIZE, Constants.BLOCK_SIZE, Constants.BLOCK_SIZE);
		this.foodMesh = new Mesh(geometry, material);
		this.respawn();
	}
	respawn() {
		this.foodMesh.position.copy(this.generateRandomPosition());
	}

	private generateRandomPosition() {
		const x = Math.floor(Math.random() * Constants.BOARD_SIZE );
		const y = Math.floor(Math.random() * Constants.BLOCK_SIZE );	
		return new Vector3(x, y, Constants.Z_AXIS_FOCUS_POSITION);
	}


	getEntityMeshes(): Mesh<BufferGeometry, Material | Material[]>[] {
		return [this.foodMesh];
	}

	tick(delta: number): void {

	}

}
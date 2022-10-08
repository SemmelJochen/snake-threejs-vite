import { Mesh, BufferGeometry, Material } from "three";
import { Entity } from "./Entity";

export class Food implements Entity {
	getMesh(): Mesh<BufferGeometry, Material | Material[]> {
		//throw new Error("Method not implemented.");
		return new Mesh();
	}
	tick(delta: number): void {
		//throw new Error("Method not implemented.");
	}

}
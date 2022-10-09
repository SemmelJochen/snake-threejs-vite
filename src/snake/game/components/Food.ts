import { Mesh, BufferGeometry, Material } from "three";
import { Entity } from "./Entity";

export class Food implements Entity {
	getEntityMeshes(): Mesh<BufferGeometry, Material | Material[]>[] {
		return [];
	}

	tick(delta: number): void {
		//throw new Error("Method not implemented.");
	}

}
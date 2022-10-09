import { Mesh } from "three";

export interface Entity {
	getEntityMeshes(): Array<Mesh>;
	tick(delta: number): void;
}
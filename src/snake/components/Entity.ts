import { Mesh } from "three";

export interface Entity {
	getMesh(): Mesh;
	tick(delta: number): void;
}
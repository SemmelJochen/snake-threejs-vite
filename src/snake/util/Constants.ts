import { Vector3 } from "three";

export class Constants {
	public static BLOCK_SIZE = 10;
	public static Z_AXIS_FOCUS_POSITION = this.BLOCK_SIZE;
	public static Z_AXIS_DEFAULT_POSITION = 0;
	public static SNAKE_VELOCITY = 1;
	public static CAMERA_POSITITON = new Vector3(0, 0, 100);
	public static BOARD_SIZE = 12
	public static SCREEN_WIDTH = window.innerWidth;
	public static SCREEN_HEIGHT = window.innerHeight;
}

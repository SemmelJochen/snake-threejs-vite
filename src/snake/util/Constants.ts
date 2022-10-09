import { Vector3 } from "three";

export class Constants {
	public static BLOCK_SIZE = 10;
	public static Z_AXIS_FOCUS_POSITION = this.BLOCK_SIZE;
	public static Z_AXIS_DEFAULT_POSITION = 0;
	public static SNAKE_VELOCITY = 2;
	public static CAMERA_POSITITON = new Vector3(0, -5 * Constants.BLOCK_SIZE, 20 * Constants.BLOCK_SIZE);
	public static BOARD_SIZE = 14
	public static SCREEN_WIDTH = window.innerWidth;
	public static SCREEN_HEIGHT = window.innerHeight;
}

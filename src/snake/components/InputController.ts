type KeyHandler = (event: KeyboardEvent) => void;

export const InputController = (onKeyDown: KeyHandler, onKeyUp: KeyHandler, onKeyLeft: KeyHandler, onKeyRight: KeyHandler) => {
	window.addEventListener("keydown", (e) => onKeyDown(e));
	window.addEventListener("keyup", (e) => onKeyUp(e));
	window.addEventListener("keydown", (e) => onKeyLeft(e));
	window.addEventListener("keyup", (e) => onKeyRight(e));
}
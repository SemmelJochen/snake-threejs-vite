import { Game } from './snake/Game';
import './style.css';

function main() {
  const container: HTMLElement = document.querySelector("#canvas")!;

  const game = new Game(container);
  game.startGame();
}
main();
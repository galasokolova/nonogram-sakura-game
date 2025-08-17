import { drawGrid } from '../view/grid.js';
import { drawHints } from '../view/hints.js';
import { drawUserBoard } from '../view/board.js';
import { createUserBoard } from '../model/userBoard.js';
import { resizeCanvas } from '../view/canvas.js';
import { setupInteraction } from '../view/interaction.js';


let userBoard;

export function initGame(level) {
  resizeCanvas(level);

  userBoard = createUserBoard(level);
  drawGrid(level);
  drawHints(level);
  drawUserBoard(level, userBoard);
  setupInteraction(level, userBoard);


}
// controller/gameController.js
import { drawGrid } from '../view/grid.js';
import { drawHints } from '../view/hints.js';
import { drawUserBoard } from '../view/board.js';
import { createUserBoard } from '../model/userBoard.js';
import { resizeCanvas, ctx, canvas } from '../view/canvas.js';
import { setupInteraction } from '../controller/interaction.js'; // проверь путь!

let currentLevel = null;
let userBoard = null;

export function initGame(level) {
  currentLevel = level;              // сохраняем уровень
  resizeCanvas(level);

  userBoard = createUserBoard(level); // создаём один раз
  drawGrid(level);
  drawHints(level, userBoard);        // передаём userBoard, чтобы подсказки подсвечивались
  drawUserBoard(level, userBoard);

  setupInteraction(level, userBoard); // interaction будет мутировать этот же массив
}

export function reloadBoard() {
  if (!currentLevel || !userBoard) return;

  // Сбрасываем поле "на месте", чтобы сохранить ссылку на массив
  for (let r = 0; r < currentLevel.rows; r++) {
    for (let c = 0; c < currentLevel.cols; c++) {
      userBoard[r][c] = 0; // CELL.EMPTY, если хочешь — импортируй константу и поставь её
    }
  }

  // Перерисовываем
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resizeCanvas(currentLevel);
  drawGrid(currentLevel);
  drawHints(currentLevel, userBoard);
  drawUserBoard(currentLevel, userBoard);
}

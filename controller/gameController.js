import { getCellSize, drawGrid } from '../view/grid.js';
import { drawHints } from '../view/hints.js';
import { drawUserBoard } from '../view/board.js';
import { createUserBoard } from '../model/userBoard.js';
import { level1 } from '../levels/level1.js';
import { getTool } from '../model/tools.js';
import { canvas, ctx } from '../view/canvas.js';
import { getGridOffsets } from '../utils/offsets.js';
import { checkWin } from '../utils/checkWin.js';

let userBoard = createUserBoard(level1);

export function initGame() {
  drawGrid(level1);
  drawHints(level1);
  drawUserBoard(level1, userBoard);

  canvas.addEventListener("click", event => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const { width: cellWidth, height: cellHeight } = getCellSize(level1);
    const { x: gridOffsetX, y: gridOffsetY } = getGridOffsets(level1, cellWidth, cellHeight);

    const col = Math.floor((x - gridOffsetX) / cellWidth);
    const row = Math.floor((y - gridOffsetY) / cellHeight);

    if (row >= 0 && row < level1.rows && col >= 0 && col < level1.cols) {
      userBoard[row][col] = getTool();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(level1);
    drawHints(level1);
    drawUserBoard(level1, userBoard);

     if (checkWin(level1, userBoard)) {
    alert("WOW! Well done! 🎉");
  }
  });
}





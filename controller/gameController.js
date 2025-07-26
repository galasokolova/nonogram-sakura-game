import { getCellSize, drawGrid } from '../view/grid.js';
import { drawHints } from '../view/hints.js';
import { drawUserBoard } from '../view/board.js';
import { createUserBoard } from '../model/userBoard.js';
import { getTool } from '../model/tools.js';
import { getGridOffsets } from '../utils/offsets.js';
import { checkWin } from '../utils/checkWin.js';
import { canvas, ctx, resizeCanvas } from '../view/canvas.js';


let userBoard;

export function initGame(level) {
  resizeCanvas(level);

  userBoard = createUserBoard(level);
  drawGrid(level);
  drawHints(level);
  drawUserBoard(level, userBoard);

  canvas.addEventListener("click", event => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const { width: cellWidth, height: cellHeight } = getCellSize(level);
    const { x: gridOffsetX, y: gridOffsetY } = getGridOffsets(level, cellWidth, cellHeight);

    const col = Math.floor((x - gridOffsetX) / cellWidth);
    const row = Math.floor((y - gridOffsetY) / cellHeight);

    if (row >= 0 && row < level.rows && col >= 0 && col < level.cols) {
      userBoard[row][col] = getTool();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    drawGrid(level);
    drawHints(level);
    drawUserBoard(level, userBoard);

    if (checkWin(level, userBoard)) {
      alert("WOW! Well done! 🎉");
    }
  });
}







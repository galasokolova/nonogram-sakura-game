// view/board.js
import { ctx } from './canvas.js';
import { config } from '../config/config.js';
import { drawCross, drawDot } from './symbols.js';
import { getCellSize } from './grid.js';
import { getGridOffsets } from '../utils/offsets.js'; // можно убрать, если везде перейдёшь на getCellRect
import { getCellRect } from '../utils/coords.js';     // ← НОВОЕ

export function drawUserBoard(level, board) {
  const { width: cellWidth, height: cellHeight } = getCellSize(level);
  const { x: gridOffsetX, y: gridOffsetY } = getGridOffsets(level, cellWidth, cellHeight);

  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      const value = board[r][c];

      // если хочешь учесть внутренние паддинги клетки — скорректируй прямоугольник:
      const rect = getCellRect(level, r, c);
      const x = rect.x + config.cellPadding;
      const y = rect.y + config.cellPadding;
      const w = rect.w - config.cellBorderAdjust;
      const h = rect.h - config.cellBorderAdjust;

      drawCellByValue(value, x, y, w, h);
    }
  }
}

function drawCellByValue(value, x, y, w, h) {
  switch (value) {
    case 1: ctx.fillStyle = config.colorFilled; ctx.fillRect(x, y, w, h); break;
    case 2: ctx.strokeStyle = '#888'; drawCross(x, y, w, h); break;
    case 3: ctx.strokeStyle = '#222'; drawCross(x, y, w, h); break;
    case 4: drawDot(x, y, w, h); break;
  }
}

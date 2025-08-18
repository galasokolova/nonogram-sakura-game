// src\view\board.js
import { ctx } from './canvas.js';  // src\view\canvas.js
import { config } from '../config/config.js';  // src\config\config.js
import { drawCross, drawDot } from './symbols.js'; // src\view\symbols.js
import { getCellSize } from './grid.js'; // src\view\grid.js
import { getGridOffsets } from '../utils/offsets.js';  // src\utils\offsets.js
import { getCellRect } from '../utils/coords.js'; 
import { CELL } from '../config/constants.js';   //   src\utils\coords.js

export function drawUserBoard(level, board) {
  const { width: cellWidth, height: cellHeight } = getCellSize(level);
  const { x: gridOffsetX, y: gridOffsetY } = getGridOffsets(level, cellWidth, cellHeight);

  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      const value = board[r][c];

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
    case 1:
      ctx.fillStyle = config.colorFilled;
      ctx.fillRect(x, y, w, h);
      break;

    case 2: // auto cross
      ctx.strokeStyle = config.cross.auto.color;
      ctx.lineWidth = config.cross.auto.lineWidth;
      drawCross(x, y, w, h);
      break;

    case 3: // manual cross
      ctx.strokeStyle = config.cross.manual.color;
      ctx.lineWidth = config.cross.manual.lineWidth;
      drawCross(x, y, w, h);
      break;

    case 4:
      drawDot(x, y, w, h);
      break;
  }
}


import { ctx } from './canvas.js';
import { getCellSize } from './grid.js';
import { config } from '../config/config.js';
import { drawCross, drawDot } from './symbols.js';
import { getGridOffsets } from '../utils/offsets.js';


export function drawUserBoard(level, board) {
  const { width: cellWidth, height: cellHeight } = getCellSize(level);
  const { x: gridOffsetX, y: gridOffsetY } = getGridOffsets(level, cellWidth, cellHeight);

  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {

      const value = board[r][c];
      const { x, y, w, h } = getCellCoordinates(r, c, cellWidth, cellHeight, gridOffsetX, gridOffsetY);

      drawCellByValue(value, x, y, w, h);

    }
  }
}


function drawCellByValue(value, x, y, w, h) {
  switch (value) {
    case 1: // black square
      ctx.fillStyle = config.colorFilled;
      ctx.fillRect(x, y, w, h);
      break;

    case 2: // autofilled cross
      ctx.strokeStyle = '#888'; 
      drawCross(x, y, w, h);
      break;

    case 3: // manual cross
      ctx.strokeStyle = '#222'; 
      drawCross(x, y, w, h);
      break;

    case 4: // dot
      drawDot(x, y, w, h);
      break;
  }
}


function getCellCoordinates(r, c, cellWidth, cellHeight, gridOffsetX, gridOffsetY) {
  return {
    x: c * cellWidth + config.cellPadding + gridOffsetX,
    y: r * cellHeight + config.cellPadding + gridOffsetY,
    w: cellWidth - config.cellBorderAdjust,
    h: cellHeight - config.cellBorderAdjust
  };
}

import { ctx } from './canvas.js';
import { config } from '../config/config.js';
import { getGridOffsets } from '../utils/offsets.js';

export function getCellSize(level) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const maxRowHints = Math.max(...level.rowHints.map(h => h.length));
  const maxColHints = Math.max(...level.colHints.map(h => h.length));

  const availableWidth = screenWidth - config.screenPaddingX;
  const availableHeight = screenHeight - config.screenPaddingY;

  const cellWidth = Math.floor(
    availableWidth / (level.cols + maxRowHints)
  );
  const cellHeight = Math.floor(
    availableHeight / (level.rows + maxColHints)
  );

  const size = Math.max(config.minCellSize, Math.min(cellWidth, cellHeight));

  return {
    width: size,
    height: size
  };
}

export function drawGrid(level) {
  const { width: cellWidth, height: cellHeight } = getCellSize(level);
  const { x: gridOffsetX, y: gridOffsetY } = getGridOffsets(level, cellWidth, cellHeight);

  const maxRowHints = Math.max(...level.rowHints.map(h => h.length));
  const maxColHints = Math.max(...level.colHints.map(h => h.length));

  drawGridLines(level, cellWidth, cellHeight, gridOffsetX, gridOffsetY);
  drawColHintMargins(level, cellWidth, cellHeight, gridOffsetX, gridOffsetY, maxColHints);
  drawRowHintMargins(level, cellWidth, cellHeight, gridOffsetX, gridOffsetY, maxRowHints);
}

function drawRowHintMargins(level, cellWidth, cellHeight, offsetX, offsetY, maxRowHints) {
  for (let r = 0; r <= level.rows; r++) {
    const y = offsetY + r * cellHeight;
    ctx.strokeStyle = config.gridColor;
    ctx.lineWidth = (r % config.blockSize === 0) ? config.thickLine : config.thinLine;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(offsetX, y);
    ctx.stroke();
  }

  for (let c = 0; c <= maxRowHints; c++) {
    const x = c * cellWidth;
    ctx.strokeStyle = config.gridColor;
    ctx.beginPath();
    ctx.moveTo(x, offsetY);
    ctx.lineTo(x, offsetY + level.rows * cellHeight);
    ctx.stroke();
  }
}

function drawColHintMargins(level, cellWidth, cellHeight, offsetX, offsetY, maxColHints) {
  for (let c = 0; c <= level.cols; c++) {
    const x = offsetX + c * cellWidth;
    ctx.strokeStyle = config.gridColor;
    ctx.lineWidth = (c % config.blockSize === 0) ? config.thickLine : config.thinLine;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, offsetY);
    ctx.stroke();
  }

  for (let r = 0; r <= maxColHints; r++) {
    const y = r * cellHeight;
    ctx.strokeStyle = config.gridColor;
    ctx.beginPath();
    ctx.moveTo(offsetX, y);
    ctx.lineTo(offsetX + level.cols * cellWidth, y);
    ctx.stroke();
  }
}

function drawGridLines(level, cellWidth, cellHeight, offsetX, offsetY) {
  for (let r = 0; r <= level.rows; r++) {
    ctx.strokeStyle = config.gridColor;
    ctx.lineWidth = (r % config.blockSize === 0) ? config.thickLine : config.thinLine;
    ctx.beginPath();
    ctx.moveTo(offsetX, r * cellHeight + offsetY);
    ctx.lineTo(offsetX + level.cols * cellWidth, r * cellHeight + offsetY);
    ctx.stroke();
  }

  for (let c = 0; c <= level.cols; c++) {
    ctx.strokeStyle = config.gridColor;
    ctx.lineWidth = (c % config.blockSize === 0) ? config.thickLine : config.thinLine;
    ctx.beginPath();
    ctx.moveTo(c * cellWidth + offsetX, offsetY);
    ctx.lineTo(c * cellWidth + offsetX, offsetY + level.rows * cellHeight);
    ctx.stroke();
  }
}

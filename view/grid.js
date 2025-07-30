import { ctx, canvas } from './canvas.js';
import { config } from '../config/config.js';
import { getGridOffsets } from '../utils/offsets.js';


export function getCellSize(level) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const maxRowHints = Math.max(...level.rowHints.map(h => h.length));
  const maxColHints = Math.max(...level.colHints.map(h => h.length));

  const availableWidth = screenWidth - 40; // немного отступов
  const availableHeight = screenHeight - 180; // учёт заголовков и кнопок

  const cellWidth = Math.floor(
    availableWidth / (level.cols + maxRowHints)
  );
  const cellHeight = Math.floor(
    availableHeight / (level.rows + maxColHints)
  );

  const size = Math.max(10, Math.min(cellWidth, cellHeight)); // не меньше 10px

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

  // Горизонтальные линии
  for (let r = 0; r <= level.rows; r++) {
    ctx.strokeStyle = "#000"; 
    ctx.beginPath();
    ctx.lineWidth = (r % config.blockSize === 0) ? 2 : 1;
    ctx.moveTo(gridOffsetX, r * cellHeight + gridOffsetY);
    ctx.lineTo(gridOffsetX + level.cols * cellWidth, r * cellHeight + gridOffsetY);
    ctx.stroke();
  }

  // Вертикальные линии
  for (let c = 0; c <= level.cols; c++) {
    ctx.strokeStyle = "#000"; 
    ctx.beginPath();
    ctx.lineWidth = (c % config.blockSize === 0) ? 2 : 1;
    ctx.moveTo(c * cellWidth + gridOffsetX, gridOffsetY);
    ctx.lineTo(c * cellWidth + gridOffsetX, gridOffsetY + level.rows * cellHeight);
    ctx.stroke();
  }

  // Вертикальные линии в margin сверху (для colHints)
for (let c = 0; c <= level.cols; c++) {
  ctx.strokeStyle = "#000"; 
  ctx.beginPath();
  ctx.lineWidth = (c % config.blockSize === 0) ? 2 : 1;

  const x = gridOffsetX + c * cellWidth;
  ctx.moveTo(x, 0);
  ctx.lineTo(x, gridOffsetY);
  ctx.stroke();
}
// Горизонтальные линии для верхнего margin (подсказки сверху)
for (let r = 0; r <= maxColHints; r++) {
  ctx.strokeStyle = "#000"; 
  const y = r * cellHeight;
  ctx.beginPath();
  ctx.moveTo(gridOffsetX, y);
  ctx.lineTo(gridOffsetX + level.cols * cellWidth, y);
  ctx.stroke();
}


// Горизонтальные линии в margin слева (для rowHints)
for (let r = 0; r <= level.rows; r++) {
  ctx.strokeStyle = "#000"; 
  ctx.beginPath();
  ctx.lineWidth = (r % config.blockSize === 0) ? 2 : 1;

  const y = gridOffsetY + r * cellHeight;
  ctx.moveTo(0, y);
  ctx.lineTo(gridOffsetX, y);
  ctx.stroke();
}

// Вертикальные линии для левого margin (подсказки слева)
for (let c = 0; c <= maxRowHints; c++) {
  ctx.strokeStyle = "#000"; 
  const x = c * cellWidth;
  ctx.beginPath();
  ctx.moveTo(x, gridOffsetY);
  ctx.lineTo(x, gridOffsetY + level.rows * cellHeight);
  ctx.stroke();
}


}



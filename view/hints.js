// Импорты
import { ctx } from './canvas.js';
import { getCellSize } from './grid.js';
import { config } from '../config/config.js';

// Централизованный стиль
let HINT_STYLE = {};

function updateHintStyle() {
  const root = document.documentElement;
  const computed = getComputedStyle(root);

  HINT_STYLE = {
    font: computed.getPropertyValue('--hint-font').trim() || '12px Arial',
    fillStyle: computed.getPropertyValue('--hint-color').trim() || '#000000ff',
    backgroundColor: computed.getPropertyValue('--hint-bg').trim() || '#f4ffecff',
    borderColor: computed.getPropertyValue('--hint-border').trim() || '#CCCCCC'
  };
}


function setupHintTextStyle() {
  ctx.font = HINT_STYLE.font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = HINT_STYLE.fillStyle;
}

export function drawHints(level) {

     updateHintStyle(); 
     
  const { width: cellWidth, height: cellHeight } = getCellSize(level);

  const maxRowHints = getMaxHintLength(level.rowHints);
  const maxColHints = getMaxHintLength(level.colHints);

  const gridOffsetX = maxRowHints * cellWidth;
  const gridOffsetY = maxColHints * cellHeight;

  // Заливаем угловой квадрат
  ctx.save();
  ctx.fillStyle = HINT_STYLE.backgroundColor;
  ctx.fillRect(0, 0, gridOffsetX, gridOffsetY);
  ctx.strokeStyle = "#fffefeff";
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, gridOffsetX, gridOffsetY);
  ctx.restore();

  drawColHints(level.colHints, cellWidth, cellHeight, gridOffsetX, gridOffsetY, maxColHints);
  drawRowHints(level.rowHints, cellWidth, cellHeight, gridOffsetX, gridOffsetY, maxRowHints);
}

function getMaxHintLength(hintArray) {
  if (!hintArray || hintArray.length === 0) return 0;
  return Math.max(...hintArray.map(hints => hints.length));
}

function drawColHints(colHints, cellWidth, cellHeight, offsetX, offsetY, maxColHints) {
  colHints.forEach((hintsForOneCol, colIndex) => {
    for (let i = 0; i < maxColHints; i++) {
      const x = offsetX + colIndex * cellWidth;
      const y = offsetY - (maxColHints - i) * cellHeight;

      ctx.save();
      ctx.fillStyle = HINT_STYLE.backgroundColor;
      ctx.fillRect(x, y, cellWidth, cellHeight);

      ctx.strokeStyle = HINT_STYLE.borderColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cellWidth, cellHeight);

      const hintIndex = i - (maxColHints - hintsForOneCol.length);
      if (hintIndex >= 0 && hintIndex < hintsForOneCol.length) {
        setupHintTextStyle();
        const hint = hintsForOneCol[hintIndex];
        const textX = x + cellWidth / 2;
        const textY = y + cellHeight / 2;
        ctx.fillText(hint, textX, textY);
      }

      ctx.restore();
    }
  });
}

function drawRowHints(rowHints, cellWidth, cellHeight, offsetX, offsetY, maxRowHints) {
  rowHints.forEach((hintsForOneRow, rowIndex) => {
    for (let i = 0; i < maxRowHints; i++) {
      const x = offsetX - (maxRowHints - i) * cellWidth;
      const y = offsetY + rowIndex * cellHeight;

      ctx.save();
      ctx.fillStyle = HINT_STYLE.backgroundColor;
      ctx.fillRect(x, y, cellWidth, cellHeight);

      ctx.strokeStyle = HINT_STYLE.borderColor;
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cellWidth, cellHeight);

      const hintIndex = i - (maxRowHints - hintsForOneRow.length);
      if (hintIndex >= 0 && hintIndex < hintsForOneRow.length) {
        setupHintTextStyle();
        const hint = hintsForOneRow[hintIndex];
        const textX = x + cellWidth / 2;
        const textY = y + cellHeight / 2;
        ctx.fillText(hint, textX, textY);
      }

      ctx.restore();
    }
  });
}

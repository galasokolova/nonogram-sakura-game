// Импорты
import { ctx } from './canvas.js';
import { getCellSize } from './grid.js';

// Централизованный стиль
let HINT_STYLE = {};

function updateHintStyle() {
  const root = document.documentElement;
  const computed = getComputedStyle(root);

  HINT_STYLE = {
    font: computed.getPropertyValue('--hint-font').trim() || '12px Arial',
    fillStyle: computed.getPropertyValue('--hint-color').trim() || '#000000ff',
    backgroundColor: computed.getPropertyValue('--hint-bg').trim() || '#f4ffecff',
    borderColor: computed.getPropertyValue('--hint-border').trim() || '#CCCCCC',
    solvedColor: computed.getPropertyValue('--hint-solved')?.trim() || '#aaaaaa'
  };
}

function setupHintTextStyle(color = null) {
  ctx.font = HINT_STYLE.font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color !== null ? color : HINT_STYLE.fillStyle;
}

function getMaxHintLength(hintArray) {
  if (!hintArray || hintArray.length === 0) return 0;
  return Math.max(...hintArray.map(hints => hints.length));
}

function getColumns(board) {
  const cols = [];
  const colsCount = board[0].length;
  for (let c = 0; c < colsCount; c++) {
    cols.push(board.map(row => row[c]));
  }
  return cols;
}

function getHintFromLine(line) {
  const hints = [];
  let count = 0;

  for (let cell of line) {
    if (cell === 1) {
      count++;
    } else if (count > 0) {
      hints.push(count);
      count = 0;
    }
  }

  if (count > 0) hints.push(count);
  return hints.length ? hints : [0];
}

export function drawHints(level, userBoard = null) {
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
  ctx.strokeStyle = "#ffffffff";
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, gridOffsetX, gridOffsetY);
  ctx.restore();

  drawColHints(level, cellWidth, cellHeight, gridOffsetX, gridOffsetY, maxColHints, userBoard);
  drawRowHints(level, cellWidth, cellHeight, gridOffsetX, gridOffsetY, maxRowHints, userBoard);
}

function drawColHints(level, cellWidth, cellHeight, offsetX, offsetY, maxColHints, userBoard) {
  const cols = userBoard ? getColumns(userBoard) : null;
  level.colHints.forEach((hintsForOneCol, colIndex) => {
    const userHints = cols ? getHintFromLine(cols[colIndex]) : [];

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
        const hint = hintsForOneCol[hintIndex];
        const userHint = userHints[hintIndex];
        const isHintSolved = hint === userHint;

        const textX = x + cellWidth / 2;
        const textY = y + cellHeight / 2;

        setupHintTextStyle(isHintSolved ? HINT_STYLE.solvedColor : null);
        ctx.fillText(hint, textX, textY);
      }

      ctx.restore();
    }
  });
}


function drawRowHints(level, cellWidth, cellHeight, offsetX, offsetY, maxRowHints, userBoard) {
  level.rowHints.forEach((hintsForOneRow, rowIndex) => {
    const userHints = userBoard ? getHintFromLine(userBoard[rowIndex]) : [];

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
        const hint = hintsForOneRow[hintIndex];
        const userHint = userHints[hintIndex];
        const isHintSolved = hint === userHint;

        const textX = x + cellWidth / 2;
        const textY = y + cellHeight / 2;

        setupHintTextStyle(isHintSolved ? HINT_STYLE.solvedColor : null);
        ctx.fillText(hint, textX, textY);
      }

      ctx.restore();
    }
  });
}


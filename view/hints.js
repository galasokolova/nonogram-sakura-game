import { ctx } from './canvas.js';
import { getCellSize } from './grid.js';
import { getHintStyle, applyHintTextStyle } from '../utils/hintStyle.js';
import { getMaxHintLength, getColumns, getHintFromLine } from '../utils/hintCalc.js';
import { fillCell, strokeCell, drawHintNumber } from './hintPrimitives.js';

export function drawHints(level, userBoard = null) {
  const STYLE = getHintStyle();

  const { width: cellWidth, height: cellHeight } = getCellSize(level);
  const maxRowHints = getMaxHintLength(level.rowHints);
  const maxColHints = getMaxHintLength(level.colHints);
  const gridOffsetX = maxRowHints * cellWidth;
  const gridOffsetY = maxColHints * cellHeight;

  // corner square
  fillCell(ctx, 0, 0, gridOffsetX, gridOffsetY, STYLE.backgroundColor);
  strokeCell(ctx, 0, 0, gridOffsetX, gridOffsetY, STYLE.cornerStrokeColor, STYLE.lineWidth);

  drawColHints(level, STYLE, cellWidth, cellHeight, gridOffsetX, gridOffsetY, maxColHints, userBoard);
  drawRowHints(level, STYLE, cellWidth, cellHeight, gridOffsetX, gridOffsetY, maxRowHints, userBoard);
}

function drawColHints(level, STYLE, cellW, cellH, offX, offY, maxColHints, userBoard) {
  const cols = userBoard ? getColumns(userBoard) : null;

  level.colHints.forEach((hintsForCol, colIndex) => {
    const userHints = cols ? getHintFromLine(cols[colIndex]) : [];

    for (let i = 0; i < maxColHints; i++) {
      const x = offX + colIndex * cellW;
      const y = offY - (maxColHints - i) * cellH;

      fillCell(ctx, x, y, cellW, cellH, STYLE.backgroundColor);
      strokeCell(ctx, x, y, cellW, cellH, STYLE.borderColor, STYLE.lineWidth);

      const hintIndex = i - (maxColHints - hintsForCol.length);
      if (hintIndex >= 0 && hintIndex < hintsForCol.length) {
        const hint = hintsForCol[hintIndex];
        const solved = hint === userHints[hintIndex];
        const textX = x + cellW / 2;
        const textY = y + cellH / 2;

        drawHintNumber(ctx, hint, textX, textY, solved ? STYLE.solvedColor : null, (color) =>
          applyHintTextStyle(ctx, STYLE, color)
        );
      }
    }
  });
}

function drawRowHints(level, STYLE, cellW, cellH, offX, offY, maxRowHints, userBoard) {
  level.rowHints.forEach((hintsForRow, rowIndex) => {
    const userHints = userBoard ? getHintFromLine(userBoard[rowIndex]) : [];

    for (let i = 0; i < maxRowHints; i++) {
      const x = offX - (maxRowHints - i) * cellW;
      const y = offY + rowIndex * cellH;

      fillCell(ctx, x, y, cellW, cellH, STYLE.backgroundColor);
      strokeCell(ctx, x, y, cellW, cellH, STYLE.borderColor, STYLE.lineWidth);

      const hintIndex = i - (maxRowHints - hintsForRow.length);
      if (hintIndex >= 0 && hintIndex < hintsForRow.length) {
        const hint = hintsForRow[hintIndex];
        const solved = hint === userHints[hintIndex];
        const textX = x + cellW / 2;
        const textY = y + cellH / 2;

        drawHintNumber(ctx, hint, textX, textY, solved ? STYLE.solvedColor : null, (color) =>
          applyHintTextStyle(ctx, STYLE, color)
        );
      }
    }
  });
}

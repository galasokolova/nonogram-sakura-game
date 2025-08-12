import { ctx, canvas } from './canvas.js';
import { getCellSize } from './grid.js';
import { getGridOffsets } from '../utils/offsets.js';
import { config } from '../config/config.js';

let highlight = { row: null, col: null };

export function clearHighlight() {
  highlight.row = null;
  highlight.col = null;
}

/**
 * Рисуем подсветку строки и колонки так, чтобы она покрывала И подсказки, и поле.
 */
export function drawHighlights(level) {
  const { width: cw, height: ch } = getCellSize(level);
  const { x: offX, y: offY } = getGridOffsets(level, cw, ch);

  const gridW  = level.cols * cw;
  const gridH  = level.rows * ch;

  // Подсветка строки: от самого левого края (включая подсказки) до конца сетки
  if (highlight.row !== null) {
    ctx.save();
    ctx.fillStyle = (config.highlight && config.highlight.row) || 'rgba(0,0,0,0.06)';
    const y = offY + highlight.row * ch;
    ctx.fillRect(
      0,            // включая левую область подсказок
      y,
      offX + gridW, // ширина подсказок слева + ширина сетки
      ch
    );
    ctx.restore();
  }

  // Подсветка колонки: от самого верха (включая подсказки) до низа сетки
  if (highlight.col !== null) {
    ctx.save();
    ctx.fillStyle = (config.highlight && config.highlight.col) || 'rgba(0,0,0,0.06)';
    const x = offX + highlight.col * cw;
    ctx.fillRect(
      x,
      0,            // включая верхнюю область подсказок
      cw,
      offY + gridH  // высота подсказок сверху + высота сетки
    );
    ctx.restore();
  }
}

/**
 * Вычисляем, какую строку/колонку подсветить по координатам указателя.
 * Поддерживает ховер/тап и по подсказкам, и по сетке.
 * Возвращает true, если состояние подсветки изменилось.
 */
export function handleHighlightPointer(level, clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  const { width: cw, height: ch } = getCellSize(level);
  const { x: offX, y: offY } = getGridOffsets(level, cw, ch);

  const gridW  = level.cols * cw;
  const gridH  = level.rows * ch;

  let nextRow = null;
  let nextCol = null;

  const inRowBand = y >= offY && y < offY + gridH;   // вертикально на уровне строк
  const inColBand = x >= offX && x < offX + gridW;   // горизонтально на уровне колонок
  const inGrid    = inRowBand && inColBand;

  if (inGrid) {
    // Наводка на саму сетку
    nextRow = Math.floor((y - offY) / ch);
    nextCol = Math.floor((x - offX) / cw);
  } else if (inRowBand && x >= 0 && x < offX) {
    // Наводка на подсказки слева — подсвечиваем СТРОКУ
    nextRow = Math.floor((y - offY) / ch);
  } else if (inColBand && y >= 0 && y < offY) {
    // Наводка на подсказки сверху — подсвечиваем КОЛОНКУ
    nextCol = Math.floor((x - offX) / cw);
  } else {
    // Вне поля и подсказок — снимаем подсветку
    nextRow = null;
    nextCol = null;
  }

  const changed = nextRow !== highlight.row || nextCol !== highlight.col;
  if (changed) {
    highlight.row = nextRow;
    highlight.col = nextCol;
  }
  return changed;
}

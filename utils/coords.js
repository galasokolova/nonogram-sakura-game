// utils/coords.js
import { getCellSize } from '../view/grid.js';
import { getGridOffsets } from '../utils/offsets.js';

/** Возвращает метрики сетки для уровня */
export function getGridMetrics(level) {
  const { width: cellW, height: cellH } = getCellSize(level);
  const { x: offX, y: offY } = getGridOffsets(level, cellW, cellH);
  return { cellW, cellH, offX, offY };
}

/** Преобразует координаты указателя (clientX/Y) в индексы ячейки */
export function clientToCell(level, canvas, clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const { cellW, cellH, offX, offY } = getGridMetrics(level);

  const relX = clientX - rect.left;
  const relY = clientY - rect.top;

  const col = Math.floor((relX - offX) / cellW);
  const row = Math.floor((relY - offY) / cellH);

  const inside = row >= 0 && row < level.rows && col >= 0 && col < level.cols;
  return { row, col, inside };
}

/** Геометрия клетки в пикселях (для рисования) */
export function getCellRect(level, row, col) {
  const { cellW, cellH, offX, offY } = getGridMetrics(level);
  return {
    x: offX + col * cellW,
    y: offY + row * cellH,
    w: cellW,
    h: cellH
  };
}

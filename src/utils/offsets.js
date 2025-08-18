// src\utils\offsets.js
export function getGridOffsets(level, cellWidth, cellHeight) {
  const maxRowHints = Math.max(...level.rowHints.map(h => h.length));
  const maxColHints = Math.max(...level.colHints.map(h => h.length));

  return {
    x: maxRowHints * cellWidth,
    y: maxColHints * cellHeight
  };
}


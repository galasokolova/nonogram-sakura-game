import { config } from "../config/config.js";
import { getCellSize } from "../view/grid.js";
import { getGridOffsets } from "../utils/offsets.js";

export let canvas = document.getElementById("nonogram");
export let ctx = canvas.getContext("2d");

export function resizeCanvas(level) {
  const { width: cellWidth, height: cellHeight } = getCellSize(level);
  const { x: gridOffsetX, y: gridOffsetY } = getGridOffsets(level, cellWidth, cellHeight);

  canvas.width = gridOffsetX + level.cols * cellWidth;
  canvas.height = gridOffsetY + level.rows * cellHeight;
}

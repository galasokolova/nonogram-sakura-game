import { config } from "../config/config.js";
import { level1 } from "../levels/level1.js";
import { getCellSize } from "../view/grid.js";
import { getGridOffsets } from "../utils/offsets.js";

const { width: cellWidth, height: cellHeight } = getCellSize(level1);
const { x: gridOffsetX, y: gridOffsetY } = getGridOffsets(level1, cellWidth, cellHeight);

export const canvas = document.getElementById("nonogram");
canvas.width = gridOffsetX + level1.cols * cellWidth;
canvas.height = gridOffsetY + level1.rows * cellHeight;

export const ctx = canvas.getContext("2d");

import { getCellSize } from './grid.js';
import { drawGrid } from './grid.js';
import { drawHints } from './hints.js';
import { drawUserBoard } from './board.js';
import { getGridOffsets } from '../utils/offsets.js';
import { getTool } from '../model/tools.js';
import { checkWin } from '../utils/checkWin.js';
import { resizeCanvas, canvas, ctx } from './canvas.js';
import { refreshCrosses } from '../utils/checkWin.js';


export function setupInteraction(level, userBoard) {
  let isDrawing = false;
  let moved = false; // флаг: мышь двигалась после нажатия


  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resizeCanvas(level);
    drawGrid(level);
    drawHints(level, userBoard);
    drawUserBoard(level, userBoard); // ← Никаких refreshCrosses здесь
    if (checkWin(level, userBoard)) {
      alert("WOW! Well done! 🎉");
    }
  }




  function getCellFromEvent(x, y) {
    const rect = canvas.getBoundingClientRect();
    const { width: cellWidth, height: cellHeight } = getCellSize(level);
    const { x: gridOffsetX, y: gridOffsetY } = getGridOffsets(level, cellWidth, cellHeight);

    const col = Math.floor((x - rect.left - gridOffsetX) / cellWidth);
    const row = Math.floor((y - rect.top - gridOffsetY) / cellHeight);

    return { row, col };
  }

  function drawAt(x, y) {
    const { row, col } = getCellFromEvent(x, y);
    if (row >= 0 && row < level.rows && col >= 0 && col < level.cols) {
      const tool = getTool();

      if (tool === 2) return; // нельзя вручную ставить автокрестики

      if (tool === 0) {
        if (userBoard[row][col] !== 2) { // не стираем автокрестики
          userBoard[row][col] = 0;
          redraw();
        }
        return;
      }

      if (userBoard[row][col] !== tool) {
        userBoard[row][col] = tool;
        if (tool === 1) refreshCrosses(level, userBoard);
        redraw();
      }
    }
  }



  function toggleCell(x, y) {
    const { row, col } = getCellFromEvent(x, y);
    if (row >= 0 && row < level.rows && col >= 0 && col < level.cols) {
      const tool = getTool();

      if (tool === 2) return; // автокрестики вручную не ставим

      if (tool === 0) {
        if (userBoard[row][col] !== 2) { // не трогаем автокрестики
          userBoard[row][col] = 0;
          redraw();
        }
        return;
      }

      if (userBoard[row][col] === tool) {
        userBoard[row][col] = 0;
      } else {
        userBoard[row][col] = tool;
      }

      if (tool === 1) refreshCrosses(level, userBoard);
      redraw();
    }
  }




  // Mouse events
  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    moved = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
      moved = true;
      drawAt(e.clientX, e.clientY);
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!moved) {
      toggleCell(e.clientX, e.clientY);
    }
    isDrawing = false;
  });

  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });

  // Touch events (for phones/tablets)
  canvas.addEventListener("touchstart", (e) => {
    isDrawing = true;
    moved = false;
    const touch = e.touches[0];
    drawAt(touch.clientX, touch.clientY);
  });

  canvas.addEventListener("touchmove", (e) => {
    moved = true;
    const touch = e.touches[0];
    drawAt(touch.clientX, touch.clientY);
  });

  canvas.addEventListener("touchend", (e) => {
    if (!moved) {
      const touch = e.changedTouches[0];
      toggleCell(touch.clientX, touch.clientY);
    }
    isDrawing = false;
  });
}

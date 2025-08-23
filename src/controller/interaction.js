// view/interaction.js
import { drawGrid } from '../view/grid.js';
import { drawHints } from '../view/hints.js';
import { drawUserBoard } from '../view/board.js';
import { getTool } from '../model/tools.js';
import { checkWin } from '../utils/checkWin.js';
import { resizeCanvas, canvas, ctx } from '../view/canvas.js';
import { refreshCrosses } from '../utils/autofill.js';
import { clientToCell } from '../utils/coords.js';
import { drawHighlights, handleHighlightPointer, clearHighlight } from '../view/highlight.js';
import { reloadBoard } from '../controller/gameController.js';
import { CELL } from '../config/constants.js'; // если нет CELL.RELOAD — не страшно

export function setupInteraction(level, userBoard) {
  let isDrawing = false;
  let moved = false; 
  let hasWon = false;

  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resizeCanvas(level);
    drawGrid(level);
    drawHints(level, userBoard);
    drawHighlights(level);
    drawUserBoard(level, userBoard);

    if (!hasWon && checkWin(level, userBoard)) {
      hasWon = true;
      alert("WOW! Well done! 🎉");
    }
  }

  function getCellFromEvent(x, y) {
    const { row, col, inside } = clientToCell(level, canvas, x, y);
    return { row, col, inside };
  }

  function handlePotentialReset(tool) {
    // Если вдруг «ресет» выбран как инструмент — выполняем сброс и ничего не пишем в доску
    if (tool === CELL.RELOAD || tool === 5) {
      reloadBoard();
      return true;
    }
    return false;
  }

  function drawAt(x, y) {
    handleHighlightPointer(level, x, y, canvas);
    const { row, col, inside } = getCellFromEvent(x, y);
    if (!inside) { redraw(); return; }

    const tool = getTool();
    if (handlePotentialReset(tool)) return;

    if (tool === CELL.AUTO_CROSS) return; // автокрест руками не ставим

    if (tool === CELL.EMPTY) {
      if (userBoard[row][col] !== CELL.AUTO_CROSS) {
        userBoard[row][col] = CELL.EMPTY;
      }
      redraw();
      return;
    }

    if (userBoard[row][col] !== tool) {
      userBoard[row][col] = tool;
      if (tool === CELL.FILLED) refreshCrosses(level, userBoard);
    }
    redraw();
  }

  function toggleCell(x, y) {
    handleHighlightPointer(level, x, y, canvas);
    const { row, col, inside } = getCellFromEvent(x, y);
    if (!inside) { redraw(); return; }

    const tool = getTool();
    if (handlePotentialReset(tool)) return;

    if (tool === CELL.AUTO_CROSS) { redraw(); return; }

    if (tool === CELL.EMPTY) {
      if (userBoard[row][col] !== CELL.AUTO_CROSS) {
        userBoard[row][col] = CELL.EMPTY;
      }
      redraw();
      return;
    }

    userBoard[row][col] = (userBoard[row][col] === tool) ? CELL.EMPTY : tool;
    if (tool === CELL.FILLED) refreshCrosses(level, userBoard);
    redraw();
  }

  // ---------------- Mouse ----------------
  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    moved = false;
    handleHighlightPointer(level, e.clientX, e.clientY, canvas);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
      moved = true;
      drawAt(e.clientX, e.clientY);
    } else {
      handleHighlightPointer(level, e.clientX, e.clientY, canvas);
      redraw();
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!moved) {
      toggleCell(e.clientX, e.clientY);
    } else {
      redraw();
    }
    isDrawing = false;
  });

  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });

  // клик вне canvas — снимаем подсветку
  document.addEventListener('mousedown', (e) => {
    if (!canvas.contains(e.target)) {
      clearHighlight();
      redraw();
    }
  });

  // ---------------- Touch ----------------
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isDrawing = true;
    moved = false;
    const t = e.touches[0];
    handleHighlightPointer(level, t.clientX, t.clientY, canvas);
  }, { passive: false });

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    moved = true;
    const t = e.touches[0];
    drawAt(t.clientX, t.clientY);
  }, { passive: false });

  canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    if (!moved) {
      const t = e.changedTouches[0];
      toggleCell(t.clientX, t.clientY);
    } else {
      redraw();
    }
    isDrawing = false;
  }, { passive: false });
}

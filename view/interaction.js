import { drawGrid } from './grid.js';
import { drawHints } from './hints.js';
import { drawUserBoard } from './board.js';
import { getTool } from '../model/tools.js';
import { checkWin } from '../utils/checkWin.js';
import { resizeCanvas, canvas, ctx } from './canvas.js';
import { refreshCrosses } from '../utils/autofill.js';
import { clientToCell } from '../utils/coords.js';
import { drawHighlights, handleHighlightPointer, clearHighlight } from './highlight.js';

export function setupInteraction(level, userBoard) {
  let isDrawing = false;
  let moved = false; // был ли сдвиг курсора после нажатия

  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resizeCanvas(level);

    drawGrid(level);
    drawHints(level, userBoard);
    drawHighlights(level);        // ← рисуем подсветку ДО пользовательского поля,
    drawUserBoard(level, userBoard); //   чтобы она была под содержимым

    if (checkWin(level, userBoard)) {
      alert("WOW! Well done! 🎉");
    }
  }

  function getCellFromEvent(x, y) {
    const { row, col, inside } = clientToCell(level, canvas, x, y);
    return { row, col, inside };
  }

  function drawAt(x, y) {
    // обновляем подсветку при любом движении
    handleHighlightPointer(level, x, y, canvas);

    const { row, col, inside } = getCellFromEvent(x, y);
    if (!inside) { redraw(); return; }

    const tool = getTool();

    // нельзя вручную ставить автокрестики
    if (tool === 2) return;

    // резинка не стирает автокрестики
    if (tool === 0) {
      if (userBoard[row][col] !== 2) {
        userBoard[row][col] = 0;
        redraw();
      } else {
        // только перерисовать подсветку
        redraw();
      }
      return;
    }

    // обычная постановка инструмента во время «протягивания»
    if (userBoard[row][col] !== tool) {
      userBoard[row][col] = tool;
      if (tool === 1) refreshCrosses(level, userBoard); // авто-кресты только после закраски
      redraw();
    } else {
      // даже если значение не изменилось — обновим подсветку
      redraw();
    }
  }

  function toggleCell(x, y) {
    // клик без движения — переключаем/стираем
    handleHighlightPointer(level, x, y, canvas);

    const { row, col, inside } = getCellFromEvent(x, y);
    if (!inside) { redraw(); return; }

    const tool = getTool();

    if (tool === 2) return; // автокрестики руками не ставим

    if (tool === 0) {
      if (userBoard[row][col] !== 2) {
        userBoard[row][col] = 0;
      }
      redraw();
      return;
    }

    if (userBoard[row][col] === tool) {
      userBoard[row][col] = 0;
    } else {
      userBoard[row][col] = tool;
      if (tool === 1) refreshCrosses(level, userBoard);
    }

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
      // обновлять подсветку и без рисования — при hover
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

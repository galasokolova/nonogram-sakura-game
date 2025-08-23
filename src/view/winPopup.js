import { CELL } from '../config/constants.js';

export function showWinPopup(level, userBoard) {
  // Создаём затемнённый фон
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = 9999;

  // Внутренний контейнер
  const modal = document.createElement('div');
  modal.style.background = 'white';
  modal.style.padding = '20px';
  modal.style.borderRadius = '12px';
  modal.style.boxShadow = '0 0 20px rgba(0,0,0,0.4)';
  modal.style.textAlign = 'center';

  // Заголовок
  const title = document.createElement('h2');
  title.textContent = "🎉 Well done! 🎉";
  modal.appendChild(title);

  // Мини-канвас
  const canvas = document.createElement('canvas');
  const cellSize = 20; // фиксированный размер клеточки
  canvas.width = level.cols * cellSize;
  canvas.height = level.rows * cellSize;
  const ctx = canvas.getContext('2d');

  // Рисуем только закрашенные клетки
  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      if (userBoard[r][c] === CELL.FILLED) {
        ctx.fillStyle = '#000';
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }
  modal.appendChild(canvas);

  // Кнопка закрытия
  const btn = document.createElement('button');
  btn.textContent = "Close";
  btn.style.marginTop = "10px";
  btn.addEventListener("click", () => overlay.remove());
  modal.appendChild(btn);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

import { CELL } from '../config/constants.js';
import { config } from '../config/config.js';

export function showWinPopup(level, userBoard) {
  const { winPopup } = config;

  // Затемнённый фон
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = winPopup.overlayColor;
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = 9999;

  // Модалка
  const modal = document.createElement('div');
  modal.style.background = winPopup.modal.background;
  modal.style.padding = winPopup.modal.padding;
  modal.style.borderRadius = winPopup.modal.borderRadius;
  modal.style.boxShadow = winPopup.modal.boxShadow;
  modal.style.textAlign = 'center';
  modal.style.display = 'flex';
  modal.style.flexDirection = 'column';
  modal.style.alignItems = 'center';
  modal.style.gap = winPopup.modal.gap;

  // Заголовок
  const title = document.createElement('h2');
  title.textContent = "🎉 Well done! 🎉";
  title.style.margin = '0';
  modal.appendChild(title);

  // Мини-канвас
  const canvas = document.createElement('canvas');
  const cellSize = winPopup.cellSize;
  canvas.width = level.cols * cellSize;
  canvas.height = level.rows * cellSize;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');

  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      if (userBoard[r][c] === CELL.FILLED) {
        ctx.fillStyle = winPopup.filledColor;
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }
  modal.appendChild(canvas);

  // Кнопка закрытия
  const btn = document.createElement('button');
  btn.textContent = "Close";
  Object.assign(btn.style, {
    background: winPopup.button.background,
    color: winPopup.button.color,
    borderRadius: winPopup.button.borderRadius,
    padding: winPopup.button.padding,
    cursor: winPopup.button.cursor,
    border: 'none'
  });
  btn.addEventListener('click', () => overlay.remove());
  modal.appendChild(btn);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

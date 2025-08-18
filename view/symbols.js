import { ctx } from './canvas.js';

export function drawCross(x, y, w, h) {
  ctx.save(); // сохраняем текущие стили

  ctx.strokeStyle = '#888'; // серый цвет для крестика
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y + h);
  ctx.moveTo(x + w, y);
  ctx.lineTo(x, y + h);
  ctx.stroke();

  ctx.restore(); // возвращаем старые стили
}


export function drawDot(x, y, w, h) {
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 6, 0, 2 * Math.PI);
  ctx.fill();
}

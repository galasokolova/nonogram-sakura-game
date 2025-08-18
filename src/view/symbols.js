import { ctx } from './canvas.js';
import { config } from '../config/config.js';

export function drawCross(x, y, w, h, style = null) {
  ctx.save();

  // Используем стиль только если он передан
  if (style) {
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.lineWidth;
  }

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y + h);
  ctx.moveTo(x + w, y);
  ctx.lineTo(x, y + h);
  ctx.stroke();

  ctx.restore();
}

export function drawDot(x, y, w, h, style = config.dot) {
  ctx.save();

  ctx.fillStyle = style.color;
  ctx.beginPath();
  ctx.arc(
    x + w / 2,
    y + h / 2,
    Math.min(w, h) * style.radiusRatio,
    0,
    2 * Math.PI
  );
  ctx.fill();

  ctx.restore();
}

export function fillCell(ctx, x, y, w, h, bg) {
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, w, h);
}

export function strokeCell(ctx, x, y, w, h, color, lineWidth = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(x, y, w, h);
}

export function drawHintNumber(ctx, text, x, y, styleColor, setupTextStyle) {
  setupTextStyle(styleColor);
  ctx.fillText(text, x, y);
}

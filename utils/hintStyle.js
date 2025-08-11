import { config } from '../config/config.js';

// Кэшируем последний снимок стиля (чтобы не дёргать getComputedStyle постоянно)
let cached = null;

export function getHintStyle() {
  const root = document.documentElement;
  const css = getComputedStyle(root);

  cached = {
    font: (css.getPropertyValue('--hint-font') || '').trim() || config.hint.font,
    fillStyle: (css.getPropertyValue('--hint-color') || '').trim() || config.hint.color,
    backgroundColor: (css.getPropertyValue('--hint-bg') || '').trim() || config.hint.backgroundColor,
    borderColor: (css.getPropertyValue('--hint-border') || '').trim() || config.hint.borderColor,
    solvedColor: (css.getPropertyValue('--hint-solved') || '').trim() || config.hint.solvedColor,
    lineWidth: config.hint.lineWidth,
    cornerStrokeColor: config.hint.cornerStrokeColor,
  };

  return cached;
}

// Опционально: если хочешь обновлять кэш без перерисовки
export function refreshHintStyleCache() {
  cached = null;
}

export function applyHintTextStyle(ctx, style, color = null) {
  ctx.font = style.font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color ?? style.fillStyle;
}

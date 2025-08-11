import { config } from "../config/config.js";

let cached = null;

export function getHintStyle() {
  const root = document.documentElement;
  const cs = getComputedStyle(root);

  const val = (name, fallback) => (cs.getPropertyValue(name).trim() || fallback);

  cached = {
    font:            val("--hint-font",            config.hint.font),
    fillStyle:       val("--hint-color",           config.hint.color),
    backgroundColor: val("--hint-bg",              config.hint.backgroundColor),
    borderColor:     val("--hint-border",          config.hint.borderColor),
    solvedColor:     val("--hint-solved",          config.hint.solvedColor),
    cornerStrokeColor: config.hint.cornerStrokeColor,
    lineWidth:         config.hint.lineWidth,
  };
  return cached;
}

export function applyHintTextStyle(ctx, STYLE, color = null) {
  ctx.font = STYLE.font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color ?? STYLE.fillStyle;
}

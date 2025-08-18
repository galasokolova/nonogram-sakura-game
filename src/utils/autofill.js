// utils/autofill.js
import { CELL } from "../config/constants.js";
import { getColumns, getHintFromLine } from "./hintCalc.js"; // всё из одного места

function arraysEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Ставит авто-крестики (CELL.AUTO_CROSS) там, где подсказки полностью совпали.
 */
export function autoFillCrosses(level, userBoard) {
  // строки
  for (let r = 0; r < level.rows; r++) {
    const userHints = getHintFromLine(userBoard[r]);
    if (arraysEqual(userHints, level.rowHints[r])) {
      for (let c = 0; c < level.cols; c++) {
        if (userBoard[r][c] === CELL.EMPTY) {
          userBoard[r][c] = CELL.AUTO_CROSS; // ← ВАЖНО: правильная константа
        }
      }
    }
  }

  // колонки
  const cols = getColumns(userBoard);
  for (let c = 0; c < level.cols; c++) {
    const userColHints = getHintFromLine(cols[c]);
    if (arraysEqual(userColHints, level.colHints[c])) {
      for (let r = 0; r < level.rows; r++) {
        if (userBoard[r][c] === CELL.EMPTY) {
          userBoard[r][c] = CELL.AUTO_CROSS; // ← ВАЖНО
        }
      }
    }
  }
}

/**
 * Сбрасывает авто-крестики и проставляет заново.
 */
export function refreshCrosses(level, userBoard) {
  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      if (userBoard[r][c] === CELL.AUTO_CROSS) {
        userBoard[r][c] = CELL.EMPTY;
      }
    }
  }
  autoFillCrosses(level, userBoard);
}

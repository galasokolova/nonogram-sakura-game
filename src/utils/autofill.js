// utils/autofill.js
import { CELL } from "../config/constants.js";
import { getColumns } from "./hintCalc.js";          // уже есть у тебя
import { arraysEqual } from "../view/hints.js"; // если arraysEqual нет — см. ниже
import { getHintFromLine } from "./checkWin.js"

/**
 * Автоматически ставит крестики (CELL.CROSS) в строках/колонках,
 * где подсказки полностью совпали с тем, что закрасил пользователь.
 * Ничего не рисует — только правит userBoard.
 */
export function autoFillCrosses(level, userBoard) {
  // строки
  for (let r = 0; r < level.rows; r++) {
    const userHints = getHintFromLine(userBoard[r]);
    if (arraysEqual(userHints, level.rowHints[r])) {
      for (let c = 0; c < level.cols; c++) {
        if (userBoard[r][c] === CELL.EMPTY) {
          userBoard[r][c] = CELL.CROSS; // авто-крестик
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
          userBoard[r][c] = CELL.CROSS; // авто-крестик
        }
      }
    }
  }
}

/**
 * Сначала снимает все авто-крестики (CELL.CROSS), потом снова запускает авторасстановку.
 */
export function refreshCrosses(level, userBoard) {
  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      if (userBoard[r][c] === CELL.CROSS) {
        userBoard[r][c] = CELL.EMPTY;
      }
    }
  }
  autoFillCrosses(level, userBoard);
}



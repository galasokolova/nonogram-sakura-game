import { CELL } from "../config/constants.js";

export function getHintFromLine(line) {
  const hints = [];
  let count = 0;

  for (let cell of line) {
    if (cell === CELL.FILLED) {
      count++;
    } else if (count > 0) {
      hints.push(count);
      count = 0;
    }
  }

  if (count > 0) {
    hints.push(count);
  }

  return hints.length ? hints : [CELL.EMPTY];
}


/**
 * compairing with solution
 */
export function checkWin(level, userBoard) {
  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      const expected = level.solution[r][c];
      const actual = userBoard[r][c] === CELL.FILLED ? CELL.FILLED : CELL.EMPTY; 
      if (expected !== actual) return false;
    }
  }
  return true;
}

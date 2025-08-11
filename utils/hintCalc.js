import { CELL } from "../config/constants.js";

export function getMaxHintLength(hintArray) {
  if (!hintArray || hintArray.length === 0) return 0;
  return Math.max(...hintArray.map(hints => hints.length));
}

export function getColumns(board) {
  const cols = [];
  const colsCount = board[0].length;
  for (let c = 0; c < colsCount; c++) {
    cols.push(board.map(row => row[c]));
  }
  return cols;
}

export function getHintFromLine(line) {
  const hints = [];
  let count = 0;
  for (let cell of line) {
    if (cell === CELL.FILLED) count++;
    else if (count > 0) { hints.push(count); count = 0; }
  }
  if (count > 0) hints.push(count);
  return hints.length ? hints : [0];
}

import { CELL } from '../config/constants.js';

export function createUserBoard(level) {
  return Array.from(
    { length: level.rows }, 
    () => Array(level.cols).fill(CELL.EMPTY)
  );
}

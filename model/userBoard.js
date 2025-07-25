export function createUserBoard(level) {
  return Array.from({ length: level.rows }, () => Array(level.cols).fill(0));
}

export function checkWin(level, userBoard) {
  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      const correct = level.solution[r][c];
      const actual = userBoard[r][c];

      if (correct === 1 && actual !== 1) {
        return false; // нужна закраска, но её нет
      }
      if (correct === 0 && actual === 1) {
        return false; // закрасил лишнее
      }
    }
  }
  return true;
}

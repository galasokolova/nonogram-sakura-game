function getHintFromLine(line) {
  const hints = [];
  let count = 0;
  for (let cell of line) {
    if (cell === 1) {
      count++;
    } else if (count > 0) {
      hints.push(count);
      count = 0;
    }
  }
  if (count > 0) hints.push(count);
  return hints.length ? hints : [0];
}

function getColumns(board) {
  const cols = [];
  const colsCount = board[0].length;
  for (let c = 0; c < colsCount; c++) {
    cols.push(board.map(row => row[c]));
  }
  return cols;
}

export function checkWin(level, userBoard) {
  const rowHintsFromUser = userBoard.map(getHintFromLine);
  const colHintsFromUser = getColumns(userBoard).map(getHintFromLine);

  return JSON.stringify(rowHintsFromUser) === JSON.stringify(level.rowHints) &&
         JSON.stringify(colHintsFromUser) === JSON.stringify(level.colHints);
}

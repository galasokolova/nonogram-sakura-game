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

/**
 * Получает колонки из двумерного массива
 * @param {number[][]} board 
 */
function getColumns(board) { 
  const cols = [];    
  const colsCount = board[0].length;  
  for (let c = 0; c < colsCount; c++) { 
    cols.push(board.map(row => row[c])); 
  }
  return cols;
}

/**
 * Проверяет победу, сравнивая с solution
 */
export function checkWin(level, userBoard) {
  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      const expected = level.solution[r][c];
      const actual = userBoard[r][c] === 1 ? 1 : 0; // считаем только закрашенные
      if (expected !== actual) return false;
    }
  }
  return true;
}

/**
 * Автоматически ставит крестики, если закрашенные клетки совпадают с подсказками
 */
export function autoFillCrosses(level, userBoard) {
  // Проверяем строки
  for (let r = 0; r < level.rows; r++) {
    const userHints = getHintFromLine(userBoard[r]);
    const correctHints = level.rowHints[r];
    if (JSON.stringify(userHints) === JSON.stringify(correctHints)) {
      for (let c = 0; c < level.cols; c++) {
        if (userBoard[r][c] === 0) userBoard[r][c] = 2; // ставим крестик
      }
    }
  }

  // Проверяем колонки
  const cols = getColumns(userBoard);
  for (let c = 0; c < level.cols; c++) {
    const userColHints = getHintFromLine(cols[c]);
    const correctColHints = level.colHints[c];
    if (JSON.stringify(userColHints) === JSON.stringify(correctColHints)) {
      for (let r = 0; r < level.rows; r++) {
        if (userBoard[r][c] === 0) userBoard[r][c] = 2; // ставим крестик
      }
    }
  }
}

/**
 * Удаляет все старые крестики и заново обновляет
 */
export function refreshCrosses(level, userBoard) {
  // Удаляем только автокрестики — если ты хранишь их, например, как 2
  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      // Заменяем только те, что были автоматически поставлены ранее
      if (userBoard[r][c] === 2) {
        userBoard[r][c] = 0;
      }
    }
  }

  autoFillCrosses(level, userBoard);
}


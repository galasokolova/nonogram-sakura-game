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

export function checkWinBySolution(level, userBoard) {
  if (!level.solution) return false; // если в уровне нет solution — не с чем сравнивать

  for (let r = 0; r < level.rows; r++) {
    for (let c = 0; c < level.cols; c++) {
      const expected = level.solution[r][c];
      const actual = userBoard[r][c];

      // Победа возможна только если:
      // - клетка закрашена правильно (1 === 1)
      // - клетка оставлена пустой правильно (0 === 0)
      // Игнорируем крестики, точки и т.д. — считаем 1 только закрашенные
      if ((expected === 1 && actual !== 1) || (expected === 0 && actual === 1)) {
        return false; // хотя бы одна клетка неправильная
      }
    }
  }

  return true; // все клетки совпали
}

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


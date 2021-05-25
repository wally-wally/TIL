const countBattleships = (board) => {
  const rowLength = board.length;
  const colLength = board[0].length;

  const battleshipCell = 'X';
  
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  const directionCount = 4;
  
  const findBattleshipRegion = (r, c) => {
    const queue = [[r, c]];
    
    while (!!queue.length) {
      const [popRow, popCol] = queue.shift();
      board[popRow][popCol] = '.';
      
      for (let idx = 0; idx < directionCount; idx++) {
        const newRow = popRow + dr[idx];
        const newCol = popCol + dc[idx];
        
        if (newRow < 0 || newRow >= rowLength || newCol < 0 || newCol >= colLength) {
          continue;
        }
        
        if (board[newRow][newCol] === battleshipCell) {
          queue.push([newRow, newCol]);
        }
      }
    }
  }
  
  let battleshipCount = 0;

  for (let row = 0; row < rowLength; row++) {
    for (let col = 0; col < colLength; col++) {
      if (board[row][col] === battleshipCell) {
        findBattleshipRegion(row, col);
        battleshipCount += 1;
      }
    }
  }

  return battleshipCount;
}

console.log(countBattleships([['X','.','.','X'],['.','.','.','X'],['.','.','.','X']])); // 2
console.log(countBattleships([['.']])); // 0
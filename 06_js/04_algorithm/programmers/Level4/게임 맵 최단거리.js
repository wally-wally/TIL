const direction = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function solution(maps) {
  const rowLength = maps.length;
  const colLength = maps[0].length;
  let queue = [[0, 0, 1]];
  while (queue.length > 0) {
    const [popRow, popCol, moveCount] = queue.shift();
    if (popRow === rowLength - 1 && popCol === colLength - 1) {
      return moveCount;
    }
    maps[popRow][popCol] = 0;
    for (const dir of direction) {
      const newRow = popRow + dir[0];
      const newCol = popCol + dir[1];
      if (newRow >= 0 && newRow < rowLength && newCol >= 0 && newCol < colLength) {
        if (maps[newRow][newCol] === 1) {
          maps[newRow][newCol] = 0;
          queue.push([newRow, newCol, moveCount + 1]);
        }
      }
    }
  }
  return -1;
}

console.log(solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]))
console.log(solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]]))
console.log(solution([[1,1,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,1,1,1]]))
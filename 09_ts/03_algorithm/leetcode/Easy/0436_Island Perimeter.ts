const islandPerimeter = (grid: number[][]): number => {
  const rowLength = grid.length - 1;
  const colLength = grid[0].length - 1;
  
  // [utils-1] grid 영역 밖인지 체크
  const isOutOfRange = (row: number, col: number) => {
    return row < 0 || row > rowLength || col < 0 || col > colLength;
  }

  // [utils-2] 인접한 cell이 육지인지 체크
  const isIsland = (row: number, col: number) => {
    return grid[row][col] === 1;
  }
  
  // 동, 서, 남, 북 체크를 위한 변수
  const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  
  // 인접한 영역들이 물인지 확인하는 로직
  const waterSurfaceCount = (row: number, col: number) => {
    if (grid[row][col] === 0) {
      return 0;
    }
    
    return directions.reduce((count, [dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;

      if (isOutOfRange(newRow, newCol)) {
        return count + 1;
      }

      return count + (isIsland(newRow, newCol) ? 0 : 1);
    }, 0);
  }
  
  let perimeter = 0;

  for (let row = 0; row <= rowLength; row++) {
    for (let col = 0; col <= colLength; col++) {
      perimeter += waterSurfaceCount(row, col);
    }
  }

  return perimeter;
};

console.log(islandPerimeter([[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]])); // 16
console.log(islandPerimeter([[1]])); // 2
console.log(islandPerimeter([[1, 0]])); // 4
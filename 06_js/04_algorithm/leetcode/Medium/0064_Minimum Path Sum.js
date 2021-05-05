const minPathSum = (grid) => {
  for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
    for (let colIdx = 0; colIdx < grid[0].length; colIdx++) {
      if (rowIdx === 0 && colIdx === 0) {
        continue;
      }

      if (rowIdx === 0) {
        grid[rowIdx][colIdx] += grid[rowIdx][colIdx - 1];
        continue;
      }

      if (colIdx === 0) {
        grid[rowIdx][colIdx] += grid[rowIdx - 1][colIdx];
        continue;
      }

      grid[rowIdx][colIdx] += Math.min(grid[rowIdx][colIdx - 1], grid[rowIdx - 1][colIdx]);
    }
  }
  
  return grid[grid.length - 1][grid[0].length - 1];
}

console.log(minPathSum([1, 3, 1], [1, 5, 1], [4, 2, 1])); // 7
console.log(minPathSum([1, 2, 3], [4, 5, 6])); // 12
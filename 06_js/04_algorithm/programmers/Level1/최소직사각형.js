const solution = (sizes) => {
  const { rows, columns } = sizes.reduce(({ rows, columns }, currentSize) => {
    const maxSize = Math.max(...currentSize);
    const minSize = Math.min(...currentSize);

    return {
      rows: [...rows, maxSize],
      columns: [...columns, minSize],
    }
  }, {
    rows: [],
    columns: [],
  });

  const maxRowSize = Math.max(...rows);
  const maxColumnSize = Math.max(...columns);

  return maxRowSize * maxColumnSize;
}

console.log(solution([[60, 50], [30, 70], [60, 30], [80, 40]])); // 4000
console.log(solution([[10, 7], [12, 3], [8, 15], [14, 7], [5, 15]])); // 120
console.log(solution([[14, 4], [19, 6], [6, 16], [18, 7], [7, 11]])); // 133
const isToeplitzMatrix = (matrix) => {
  const rowLength = matrix.length;
  const colLength = matrix[0].length;

  // [prechecker] matrix의 행 또는 열의 길이가 1이면 무조건 true 반환
  if (rowLength === 1 || colLength === 1) {
    return true;
  }

  // toeplitz 판별을 위한 시작 index 값 모음 생성
  const getStartIndexes = () => {
    const indexBasedRow = Array(rowLength - 1).fill().map((_, index) => {
      return [index, 0];
    }).reverse();
    const indexBasedCol = Array(colLength - 1).fill().map((_, index) => {
      return [0, index + 1];
    });

    return [...indexBasedRow, ...indexBasedCol];
  }

  const indexes = getStartIndexes();

  // 각 대각선에 위치한 숫자들이 모두 같은지 확인하는 로직
  const isToeplitz = (row, col) => {
    const criteriaNumber = matrix[row][col];
    let nowRowIndex = row + 1;
    let nowColIndex = col + 1;

    while (nowRowIndex < rowLength && nowColIndex < colLength) {
      if (criteriaNumber !== matrix[nowRowIndex][nowColIndex]) {
        return false;
      }

      nowRowIndex += 1;
      nowColIndex += 1;
    }

    return true;
  }

  return indexes.every(([ row, col ]) => isToeplitz(row, col));
}

console.log(isToeplitzMatrix([[1, 2, 3, 4], [5, 1, 2, 3], [9, 5, 1, 2]])); // true
console.log(isToeplitzMatrix([[1, 2], [2, 2]])); // false
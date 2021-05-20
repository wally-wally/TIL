const matrixReshape = (mat, r, c) => {
  // 기존 matrix의 원소 개수와 r X c의 값이 다르면 새로운 reshaped matrix를 만들 수 없으므로 기존 matrix를 반환
  const originalMatrixElementCount = mat.length * mat[0].length;
  const reshapedMatrixElementCount = r * c;

  if (originalMatrixElementCount !== reshapedMatrixElementCount) {
    return mat;
  }

  // 기존 matrix인 2차원 배열을 Array의 flat 메소드를 이용해서 1차원 배열로 평탄화하는 작업 진행
  const flattedMatrix = mat.flat();

  // idx 값을 받아서 reshaped matrix의 각 line에 들어갈 부분 배열 반환
  const getLineFlattendMatrix = (idx) => {
    const startIdx = c * idx;
    const endIdx = c * (idx + 1);

    return flattedMatrix.slice(startIdx, endIdx);
  };

  return Array(r).fill().map((_, idx) => getLineFlattendMatrix(idx));
}

console.log(matrixReshape([[1, 2], [3, 4]], 1, 4)); // [[1, 2, 3, 4]]
console.log(matrixReshape([[1, 2], [3, 4]], 2, 4)); // [[1, 2], [3, 4]]
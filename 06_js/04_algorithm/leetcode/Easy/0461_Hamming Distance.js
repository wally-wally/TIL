const hammingDistance = (x, y) => {
  const binaryX = x.toString(2);
  const binaryY = y.toString(2);

  const maxLength = Math.max(binaryX.length, binaryY.length);

  const adjustX = `${'0'.repeat(maxLength - binaryX.length)}${binaryX}`;
  const adjustY = `${'0'.repeat(maxLength - binaryY.length)}${binaryY}`;

  const indexes = Array(maxLength).fill().map((_, index) => index);

  return indexes.reduce((diffCount, index) => {
    const addValue = adjustX[index] === adjustY[index] ? 0 : 1;
    return diffCount + addValue;
  }, 0);
}

console.log(hammingDistance(1, 4)); // 2
console.log(hammingDistance(3, 1)); // 1
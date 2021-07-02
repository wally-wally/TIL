const imageSmoother = (img: number[][]): number[][] => {
  const rowLength = img.length;
  const colLength = img[0].length;

  const smoothImage = Array(rowLength).fill(0).map(() => Array(colLength).fill(0));

  const calcSmoothImage = (r: number, c: number) => {
    let validCellCount = 0;
    let value = 0;

    for (let row = r; row < r + 3; row++) {
      for (let col = c; col < c + 3; col++) {
        if (row < 0 || row >= rowLength || col < 0 || col >= colLength) {
          continue;
        }

        value += img[row][col];
        validCellCount += 1;
      }
    }

    return Math.floor(value / validCellCount);
  }

  for (let row = -1; row < rowLength - 1; row++) {
    for (let col = -1; col < colLength - 1; col++) {
      smoothImage[row + 1][col + 1] = calcSmoothImage(row, col);
    }
  }

  return smoothImage;
};

console.log(imageSmoother([[1,1,1],[1,0,1],[1,1,1]])); // [[0,0,0],[0,0,0],[0,0,0]]
console.log(imageSmoother([[100,200,100],[200,50,200],[100,200,100]])); // [[137,141,137],[141,138,141],[137,141,137]]
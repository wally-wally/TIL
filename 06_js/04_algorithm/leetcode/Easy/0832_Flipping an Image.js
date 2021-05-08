const flipAndInvertImage = (image) => {
  return image.map((imageLine) => imageLine.reverse().map((num) => ~(num - 2)));
}

console.log(flipAndInvertImage([[1,1,0],[1,0,1],[0,0,0]])); // [[1,0,0],[0,1,0],[1,1,1]]
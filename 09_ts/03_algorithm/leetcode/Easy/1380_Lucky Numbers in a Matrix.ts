const luckyNumbers = (matrix: number[][]): number[] => {
  const zipFunc = (originalMatrix: number[][]) => originalMatrix[0].map((_, index) => originalMatrix.map(row=>row[index]));

  const minNumbers = matrix.map((numbers) => Math.min(...numbers));

  const maxNumbers = zipFunc(matrix).map((numbers) => Math.max(...numbers));

  return minNumbers.filter((number) => maxNumbers.includes(number));
};

console.log(luckyNumbers([[3, 7, 8], [9, 11, 13], [15, 16, 17]])); // [15]
console.log(luckyNumbers([[1, 10, 4, 2], [9, 3, 8, 7], [15, 16, 17, 12]])); // [12]
console.log(luckyNumbers([[7, 8], [1, 2]])); // [7]
console.log(luckyNumbers([
  [36376, 85652, 21002, 4510],
  [68246, 64237, 42962, 9974],
  [32768, 97721, 47338, 5841],
  [55103, 18179, 79062, 46542]
])); // []
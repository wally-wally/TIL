const heightChecker = (heights) => {
  const orderedHeights = [...heights].sort((a, b) => a - b);

  return orderedHeights.reduce((acc, curr, index) => acc + (curr !== heights[index] ? 1 : 0), 0);
}

console.log(heightChecker([1,1,4,2,1,3])); // 3
console.log(heightChecker([5,1,2,3,4])); // 5
console.log(heightChecker([10,6,6,10,10,9,8,8,3,3,8,2,1,5,1,9,5,2,7,4,7,7])); // 22
const canBeEqual = (target, arr) => {
  const sortedTarget = target.sort((a, b) => a - b);
  const sortedArr = arr.sort((a, b) => a - b);
  
  return sortedTarget.every((number, index) => number === sortedArr[index]);
}

console.log(canBeEqual([1, 2, 3, 4], [2, 4, 1, 3])); // true
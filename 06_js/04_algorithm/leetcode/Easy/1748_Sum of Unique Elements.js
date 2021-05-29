const sumOfUnique = (nums) => {
  const numberMap = nums.reduce((acc, curr) => {
    acc.set(curr, (acc.get(curr) || 0) + 1);
    return acc;
  }, new Map());

  const uniqueNumbers = [...numberMap.entries()]
    .filter(([_, count]) => count === 1)
    .map(([number]) => number);

  return uniqueNumbers.reduce((acc, curr) => acc += curr, 0);
}

console.log(sumOfUnique([1, 2, 3, 2])); // 4
console.log(sumOfUnique([1, 1, 1, 1, 1])); // 0
console.log(sumOfUnique([1, 2, 3, 4, 5])); // 15
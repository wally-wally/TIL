const missingNumber = (nums: number[]): number => {
  const sortedNumbers = nums.sort((a, b) => a - b);

  for (let idx = 0; idx < nums.length; idx++) {
    if (idx !== sortedNumbers[idx]) {
      return idx;
    }
  }

  return nums.length;
};

console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1])); // 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
console.log(missingNumber([0])); // 1
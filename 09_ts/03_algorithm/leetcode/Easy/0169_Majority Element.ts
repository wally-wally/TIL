const majorityElement = (nums: number[]): number => {
  nums.sort((a, b) => a - b);

  const midIndex = Math.floor(nums.length / 2);

  return nums[midIndex];
};

console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
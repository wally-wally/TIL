const maxAscendingSum = (nums: number[]): number => {
  let answer = nums[0];
  let tempSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] < nums[i]) {
      tempSum += nums[i];
    } else {
      tempSum = nums[i];
    }

    answer = Math.max(answer, tempSum);
  }

  return answer;
};

console.log(maxAscendingSum([10, 20, 30, 5, 10, 50])); // 65
console.log(maxAscendingSum([10, 20, 30, 40, 50])); // 150
console.log(maxAscendingSum([12, 17, 15, 13, 10, 11, 12])); // 33
console.log(maxAscendingSum([100, 10, 1])); // 100
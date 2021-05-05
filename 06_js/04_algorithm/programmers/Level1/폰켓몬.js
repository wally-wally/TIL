const solution = (nums) => {
  const maxSelectedMonsterCount = nums.length / 2;
  const noDuplicatedNumberCount = new Set(nums).size;
  return Math.min(maxSelectedMonsterCount, noDuplicatedNumberCount);
}

console.log(solution([3, 1, 2, 3])); // 2
console.log(solution([3, 3, 3, 2, 2, 4])); // 3
console.log(solution([3, 3, 3, 2, 2, 2])); // 2
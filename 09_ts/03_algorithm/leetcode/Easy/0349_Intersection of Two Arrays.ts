const intersection = (nums1: number[], nums2: number[]): number[] => {
  const getUniqueNumbers = (nums: number[]) => new Set(nums);

  const intersectionNumbers = new Set([...getUniqueNumbers(nums1)].filter(num => getUniqueNumbers(nums2).has(num)));

  return [...intersectionNumbers];
};

console.log(intersection([1, 2, 2, 1], [2, 2])); // [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4])); // [9, 4]
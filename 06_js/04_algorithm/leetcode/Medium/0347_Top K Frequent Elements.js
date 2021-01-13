/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
let topKFrequent = function(nums, k) {
  let numInfo = new Map();
  nums.forEach(num => {
    if (!numInfo.has(num)) {
      numInfo.set(num, 1);
    } else {
      const INIT_COUNT = numInfo.get(num);
      numInfo.set(num, INIT_COUNT + 1);
    }
  });
  return Array.from(numInfo.entries()).sort((a, b) => b[1] - a[1]).slice(0, k).map(v => v[0]);
};

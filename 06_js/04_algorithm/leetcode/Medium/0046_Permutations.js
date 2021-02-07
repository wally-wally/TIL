/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = (nums) => {
  const numberCount = nums.length;
  let visited = Array(numberCount).fill(false);
  let answer = [];
  
  const makePermutation = (nowCollectedNumbers) => {
    if (nowCollectedNumbers.length === numberCount) {
      answer.push([...nowCollectedNumbers]);
      return;
    }
    for (let idx = 0; idx < numberCount; idx += 1) {
      if (!visited[idx]) {
        visited[idx] = true;
        nowCollectedNumbers.push(nums[idx]);
        makePermutation(nowCollectedNumbers);
        visited[idx] = false;
        nowCollectedNumbers.pop();
      }
    }
  };
  
  makePermutation([]);
  
  return answer;
};

console.log(permute([1, 2, 3]));

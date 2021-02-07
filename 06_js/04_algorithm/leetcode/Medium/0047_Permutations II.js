/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteUnique = (nums) => {
  const numberCount = nums.length;
  let visited = Array(numberCount).fill(false);
  let tempAnswerArr = [];
  let answer = [];
  
  const makeString = (arr) => arr.reduce((acc, curr) => acc += String(curr), '');
  
  const makePermutation = (nowCollectedNumbers) => {
    if (nowCollectedNumbers.length === numberCount) {
      const tempNumbers = [...nowCollectedNumbers];
      const stringizeValue = makeString(tempNumbers);
      if (!tempAnswerArr.includes(stringizeValue)) {
        tempAnswerArr.push(stringizeValue);
        answer.push(tempNumbers);
      }
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

console.log(permuteUnique([1, 1, 2]));

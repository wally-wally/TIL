const findMaxConsecutiveOnes = (nums) => {
  // #1) Array의 reduce 메소드를 활용한 방식
  const findConsecutiveInfo = nums.reduce((acc, curr) => {
    if (curr === 0) {
      return {
        answer: Math.max(...Object.values(acc)),
        maxConsecutiveLength: 0,
      }
    }

    return {
      ...acc,
      maxConsecutiveLength: acc.maxConsecutiveLength + 1
    }
  }, {
    answer: 0,
    maxConsecutiveLength: 0,
  });

  return Math.max(...Object.values(findConsecutiveInfo));

  // #2) 단순 for 문을 이용한 방식
  // let answer = 0;
  // let maxConsecutiveLength = 0;

  // for (const num of nums) {
  //   if (num === 0) {
  //     answer = Math.max(answer, maxConsecutiveLength);
  //     maxConsecutiveLength = 0;

  //     continue;
  //   }

  //   maxConsecutiveLength += 1;
  // }

  // return Math.max(answer, maxConsecutiveLength);
};

console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // 3
console.log(findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1])); // 2
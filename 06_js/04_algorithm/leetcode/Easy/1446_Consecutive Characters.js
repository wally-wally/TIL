const maxPower = (s) => {
  const stringLength = s.length;
  let criteriaCharacter = s[0];
  let maxConsecutiveCount = 0;
  let answer = 0;

  for (let idx = 0; idx < stringLength; idx++) {
    // 기준 글자와 같으면 count 1 증가
    if (criteriaCharacter === s[idx]) {
      maxConsecutiveCount += 1;
      continue;
    }

    // 기준 글자와 다르면 기존 answer와 count 값 비교해서 큰 값을 answer로 대체
    // 그리고 기준 글자와 count 값 초기화
    answer = Math.max(answer, maxConsecutiveCount);
    criteriaCharacter = s[idx];
    maxConsecutiveCount = 1;

    // 만약 앞으로 남은 글자수가 answer 값 이하이면 더 이상 할 필요 없음
    if (answer >= stringLength - idx) {
      break;
    }
  }

  return Math.max(answer, maxConsecutiveCount);
}

console.log(maxPower('leetcode')); // 2
console.log(maxPower('abbcccddddeeeeedcba')); // 5
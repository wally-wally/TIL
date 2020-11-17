function solution(n, lost, reserve) {
  let answer = 0;
  let checkReserve = Array(n + 1).fill(0);

  const lostReserve = reserve.filter(idx => lost.includes(idx));
  if (lostReserve.length > 0) {
    lost = lost.filter(idx => !lostReserve.includes(idx));
    reserve = reserve.filter(idx => !lostReserve.includes(idx));
  }

  answer = n - lost.length;
  for (const reserveIdx of reserve) {
    checkReserve[reserveIdx] = 1;
  }

  const checkAvailableReserve = (lostIdx, variable) => checkReserve[lostIdx + variable];

  for (const lostIdx of lost) {
    if (lostIdx === 1) {
      const checkValue = checkAvailableReserve(lostIdx, 1);
      if (checkValue === 1) {
        answer += 1;
        checkReserve[2] = 0;
      }
      continue;
    }
    if (lostIdx === n) {
      const checkValue = checkAvailableReserve(lostIdx, -1);
      if (checkValue === 1) {
        answer += 1;
        checkReserve[n - 1] = 0;
      }
      continue;
    }
    const leftCheckValue = checkAvailableReserve(lostIdx, -1);
    const rightCheckValue = checkAvailableReserve(lostIdx, 1);
    if (leftCheckValue === 1) {
      answer += 1;
      checkReserve[lostIdx - 1] = 0;
      continue;
    }
    if (rightCheckValue === 1) {
      answer += 1;
      checkReserve[lostIdx + 1] = 0;
      continue;
    }
  }
  return answer;
}

console.log(solution(5, [2, 4], [1, 3, 5])); // 5
console.log(solution(5, [2, 4], [3])); // 4
console.log(solution(3, [3], [1])); // 2
console.log(solution(5, [2, 4], [1, 2, 5])); // 5
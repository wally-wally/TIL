function solution(N, number) {
  let answer = -1;

  const findMinCount = (usedCount, nowResult) => {
    if (usedCount > 8) {
      return
    }
    if (nowResult === number) {
      if (usedCount < answer || answer === -1) {
        answer = usedCount;
      }
      return
    }
    let newNumber = 0;
    for (let i = 0; i <= 8; i++) {
      newNumber = newNumber * 10 + N;
      const newUsedCount = usedCount + 1 + i;
      findMinCount(newUsedCount, nowResult + newNumber);
      findMinCount(newUsedCount, nowResult - newNumber);
      findMinCount(newUsedCount, nowResult * newNumber);
      findMinCount(newUsedCount, nowResult / newNumber);
    }
  }

  findMinCount(0, 0);

  return answer;
}

console.log(solution(5, 12)); // 4
console.log(solution(2, 11)); // 3
console.log(solution(5, 31168)); // -1
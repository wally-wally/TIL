function solution(n) {
  let answer = [0, 3, 11];
  let sumValues = [0, 3, 14];
  if (n % 2 !== 0) { // 홀수는 불가능
    return 0;
  }

  const answerIdx = parseInt(n / 2);
  if (answerIdx < 3) {
    return answer[answerIdx];
  }

  for (let i = 3; i <= answerIdx; i++) {
    answer.push((answer[i - 1] + sumValues[i - 1] * 2 + 2) % 1000000007);
    sumValues.push(sumValues[sumValues.length - 1] + answer[answer.length - 1]);
  }
  return answer[answer.length - 1];
}

console.log(solution(4)); // 11
console.log(solution(5)); // 0
console.log(solution(6)); // 41
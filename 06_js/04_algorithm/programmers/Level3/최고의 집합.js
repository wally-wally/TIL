function solution(n, s) {
  let answer = [];
  const defaultValue = parseInt(s / n);
  if (defaultValue === 0) {
    return [-1];
  }
  for (let i = 0; i < n; i++) {
    answer.push(n - i > s % n ? defaultValue : defaultValue + 1);
  }
  return answer;
}

console.log(solution(2, 9));
console.log(solution(2, 1));
console.log(solution(2, 8));
console.log(solution(5, 22));
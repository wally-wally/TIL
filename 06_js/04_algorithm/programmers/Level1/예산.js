function solution(d, budget) {
  let answer = 0;
  d.sort((a, b) => Number(a) - Number(b));
  for (const cost of d) {
    budget -= cost;
    answer += 1;
    if (budget < 0) {
      answer -= 1;
      break
    }
  }
  return answer;
}

console.log(solution([1, 3, 2, 5, 4], 9));
console.log(solution([2, 2, 3, 3], 10));
function solution(n, a, b) {
  let answer = 0;

  while (a !== b) {
    answer += 1;
    a = parseInt((a + 1) / 2);
    b = parseInt((b + 1) / 2);
  }

  return answer;
}

console.log(solution(8, 4, 7)); // 3
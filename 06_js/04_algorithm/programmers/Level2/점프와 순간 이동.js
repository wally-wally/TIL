function solution(n) {
  let answer = 0;
  while (n > 0) {
    let mok = parseInt(n / 2);
    let nmg = n % 2;
    answer += nmg;
    n = mok;
  }
  return answer;
}

console.log(solution(5)); // 2
console.log(solution(6)); // 2
console.log(solution(5000)); // 5
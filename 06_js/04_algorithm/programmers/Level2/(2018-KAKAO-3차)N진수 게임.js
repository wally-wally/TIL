function solution(n, t, m, p) {
  let answer = '';
  let number = 0;
  let playerOrder = 0;
  while (answer.length < t) {
    let convertedNumber = number.toString(n);
    for (const num of convertedNumber) {
      if (playerOrder % m === p - 1) {
        answer += num.toUpperCase();
      }
      if (answer.length === t) {
        break
      }
      playerOrder += 1;
    }
    number += 1;
  }
  return answer;
}

console.log(solution(2, 4, 2, 1));
console.log(solution(16, 16, 2, 1));
console.log(solution(16, 16, 2, 2));
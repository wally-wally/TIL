function solution(n) {
  let answer = '';
  while (n > 0) {
    n -= 1;
    if (n % 3 === 0) {
      answer = '1' + answer;
    } else if (n % 3 === 1) {
      answer = '2' + answer; 
    } else {
      answer = '4' + answer;
    }
    n = parseInt(n / 3);
  }
  return answer;
}


console.log(solution(1)); // 1
console.log(solution(2)); // 2
console.log(solution(3)); // 4
console.log(solution(4)); // 11
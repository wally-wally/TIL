function solution(number, k) {
  let answer = '';

  if (number === '0') {
    return number;
  }

  let idx = 0;
  for (let i = 0; i < number.length - k; i++) {
    let maxValue = '0';
    for (let j = idx; j <= k + i; j++) {
      if (maxValue < number[j]) {
        maxValue = number[j];
        idx = j + 1;
      }
      if (maxValue === '9') {
        break
      }
    }
    answer += maxValue;
  }
  return answer;
}

console.log(solution('1924', 2)); // '94'
console.log(solution('1231234', 3)); // '3234'
console.log(solution('4177252841', 4)); // '775841'
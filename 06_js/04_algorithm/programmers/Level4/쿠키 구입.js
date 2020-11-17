function solution(cookie) {
  let answer = 0;
  for (let i = 0; i < cookie.length - 1; i++) {
    let frontInfo = {
      index: i,
      value: cookie[i]
    }
    let backInfo = {
      index: i + 1,
      value: cookie[i + 1]
    }
    while (true) {
      if (frontInfo.value === backInfo.value && frontInfo.value > answer) {
        answer = frontInfo.value;
      }
      if (frontInfo.index > 0 && frontInfo.value <= backInfo.value) {
        frontInfo.index -= 1;
        frontInfo.value += cookie[frontInfo.index];
      } else if (backInfo.index < cookie.length - 1 && frontInfo.value >= backInfo.value) {
        backInfo.index += 1;
        backInfo.value += cookie[backInfo.index];
      } else {
        break
      }
    }

  }
  return answer;
}

console.log(solution([1, 1, 2, 3]));
console.log(solution([1, 2, 4, 5]));
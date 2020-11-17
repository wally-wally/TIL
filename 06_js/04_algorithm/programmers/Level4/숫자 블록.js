function solution(begin, end) {
  let answer = [];
  
  if (begin === 1) {
    answer.push(0);
    begin += 1;
  }
  
  for (let i = begin; i <= end; i++) {
    let checkBreak = false;
    let sqrtValue = parseInt(Math.sqrt(i));
    for (let j = 2; j <= sqrtValue; j++) {
      const mok = parseInt(i / j);
      if (mok > 10000000) {
        continue;
      }
      if (i % j === 0) {
        answer.push(mok);
        checkBreak = true;
        break;
      }
    }
    if (!checkBreak) {
      answer.push(1);
    }
  }
  return answer;
}

console.log(solution(1, 10));
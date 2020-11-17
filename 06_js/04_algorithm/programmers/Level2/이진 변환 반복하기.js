function solution(s) {
  let changeBinaryCount = 0;
  let eliminateZeroCount = 0;
  while (true) {
    changeBinaryCount += 1;
    const checkZero = s.match(/0/g);
    if (checkZero) {
      eliminateZeroCount += checkZero.length;
    }
    s = s.replace(/0/gi, '');
    s = s.length.toString(2);
    if (s === '1') {
      break
    }
  }
  return [changeBinaryCount, eliminateZeroCount];
}

console.log(solution('01110'));
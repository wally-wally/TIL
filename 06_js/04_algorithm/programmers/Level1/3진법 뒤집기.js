function solution(n) {
  const notation = '012';
  const makeTriNumber = num => {
    const mok = parseInt(num / 3);
    const nmg = num % 3;
    const n = notation[nmg];
    return mok ? makeTriNumber(mok) + n : n;
  }
  
  const reversedTriNumber = makeTriNumber(n).split('').reverse().join('');
  return parseInt(reversedTriNumber, 3);
}

console.log(solution(45)); // 7
console.log(solution(125)); // 229
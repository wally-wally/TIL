function solution(n) {
  return String(n).split('').reduce((acc, curr) => acc += Number(curr), 0);
}

console.log(solution(123));
console.log(solution(987));
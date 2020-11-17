function solution(brown, yellow) {
  let x = yellow;
  let y = 0;
  while (true) {
    if (yellow % x === 0) {
      y = parseInt(yellow / x);
      if (2 * (x + y) + 4 === brown) {
        return [x + 2, y + 2];
      }
    }
    x -= 1;
  }
}

console.log(solution(10, 2)); // [4, 3]
console.log(solution(8, 1)); // [3, 3]
console.log(solution(24, 24)); // [8, 6]
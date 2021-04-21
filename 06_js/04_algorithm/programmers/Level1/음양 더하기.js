const solution = (absolutes, signs) => {
  const setSign = (idx) => signs[idx] ? 1 : -1;

  return absolutes.reduce((acc, curr, idx) => {
    return acc + (setSign(idx) * curr);
  }, 0);
}

console.log(solution([4, 7, 12], [true, false, true])); // 9
console.log(solution([1, 2, 3], [false, false, true])); // 0

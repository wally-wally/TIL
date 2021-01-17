/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  m--; n--;
  if (m === 0 || n === 0) {
    return 1;
  }
  
  const factorial = (start, end, value = 1) => start === end ? value : factorial(start - 1, end, value * start);
  
  // 순열 nCr 공식 적용
  return factorial(m + n, n) / factorial(m, 1);
};
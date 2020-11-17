function solution(n) {
  let squareRoot = n ** 0.5
  return squareRoot === parseInt(squareRoot) ? (squareRoot + 1) ** 2 : -1
}

console.log(solution(121))
console.log(solution(3))
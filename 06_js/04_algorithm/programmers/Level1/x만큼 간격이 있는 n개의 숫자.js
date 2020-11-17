function solution(x, n) {
  let answer = []
  for (let i = 0; i < n; ++i) {
      answer.push(x * (i + 1))
  }
  return answer
}

console.log(soltuion(2, 5))
console.log(soltuion(4, 3))
console.log(soltuion(-4, 2))
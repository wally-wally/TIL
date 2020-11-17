function solution(n) {
  let answer = 0
  for (let i = 0; i < n / 2 + 1; i++) {
      if (!(n % i)) {
          answer += i
      }
  }
  return n <= 1 ? n : answer + n
}

console.log(solution(12))
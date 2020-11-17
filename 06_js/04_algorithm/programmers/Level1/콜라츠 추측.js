function solution(num) {
  let answer = -1
  let cnt = 1
  if (num != 1) {
      while (cnt < 501) {
          if (num % 2 === 0) {
              num = num / 2
          } else {
              num = num * 3 + 1
          }
          if (num === 1) {
              answer = cnt
              break
          }
          cnt = cnt + 1
      }
  } else {
      return 0
  }
  return answer
}

console.log(solution(6))
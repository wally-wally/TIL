function solution(citations) {
  let answer = 0
  let countArray = []
  for (let i = 0; i < 10001; ++i) {
      countArray.push(0)
  }
  for (let citation of citations) {
      countArray[citation] += 1
  }
  for (let j = 10000; j > -1; --j) {
      let sumValue = countArray.slice(j, 10001).reduce((a, b) => a + b, 0)
      if (sumValue >= j) {
          answer = j
          break
      }
  }
  return answer
}

console.log(solution([3, 0, 6, 1, 5]))
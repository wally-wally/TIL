function solution(answers) {
  let answer = []
  let answer_cnt = []
  const patterns = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
  ]
  patterns.forEach(pattern => {
    let count = 0
    let patternCount = pattern.length
    for (let i = 0; i < answers.length; ++i) {
      if (answers[i] === pattern[i % patternCount]) {
        count += 1
      }
    }
    answer_cnt.push(count) 
  })
  const max_value = Math.max.apply(null, answer_cnt)
  for (let i = 0; i < 3; ++i) {
    if (answer_cnt[i] === max_value) {
      answer.push(i + 1)
    }
  }
  return answer
}

console.log(solution([1, 2, 3, 4, 5]))
console.log(solution([1, 3, 2, 4, 2]))
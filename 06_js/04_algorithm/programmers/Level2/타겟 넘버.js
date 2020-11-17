function solution(numbers, target) {
  let answer = 0
  let answerArr = [0]
  for (let i = 0; i < numbers.length; i++) {
    let tempArr = new Array()
    for (let j = 0; j < answerArr.length; j++) {
      tempArr.push(answerArr[j] + numbers[i], answerArr[j] - numbers[i])
    }
    answerArr = tempArr
  }
  return answerArr.filter(num => target === num).length
}

console.log(solution([1, 1, 1, 1, 1], 3))
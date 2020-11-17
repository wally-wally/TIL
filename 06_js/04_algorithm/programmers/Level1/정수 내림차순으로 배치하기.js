function solution(n) {
  let answer = ''
  let numberCnt = {}
  let splitNumber = String(n).split('')
  splitNumber.forEach(digit => {
      numberCnt[digit] = !numberCnt.hasOwnProperty(digit) ? 1 : numberCnt[digit] + 1
  })
  for (let num in numberCnt) {
      answer = num.repeat(numberCnt[num]) + answer
  }
  return Number(answer)
}

console.log(solution(118732))
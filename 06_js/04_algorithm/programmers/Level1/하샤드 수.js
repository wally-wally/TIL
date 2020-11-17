function solution(x) {
  let str_num = x.toString()
  let sum_value = 0
  for (let i = 0; i < str_num.length; i++) {
      sum_value += parseInt(str_num[i])
  }
  if (x % sum_value === 0) {
      return true
  } else {
      return false
  }
}

console.log(solution(10))
console.log(solution(11))
console.log(solution(12))
console.log(solution(13))
console.log(solution(144))
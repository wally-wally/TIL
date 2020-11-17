// 1. 내가 푼 방법
function solution(s) {
  let letters = []
  for (let i = 0; i < s.length; i++) {
      letters.push(s[i])
  }
  let sorted_string = letters.sort(function (a, b) {
      if (a > b) return -1
      if (b > a) return 1
      return 0
  })
  return sorted_string.join('')
}

// 2. 더 간단하게!
// function soultion(s) {
//   return s.split('').sort().reverse().join('')
// }
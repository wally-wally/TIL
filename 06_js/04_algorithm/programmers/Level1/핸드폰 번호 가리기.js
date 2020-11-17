function solution(phone_number) {
  let answer = ''
  for (let i = 0; i < phone_number.length - 4; i++) {
      answer += '*'
  }
  answer += phone_number.substr(phone_number.length - 4, phone_number.length)
  return answer
}

function solution(phone_number) {
  let answer = ''
  answer += '*'.repeat(phone_number.length - 4) // for문 -> .repeat() 사용
  answer += phone_number.substr(phone_number.length - 4, phone_number.length)
  return answer
}
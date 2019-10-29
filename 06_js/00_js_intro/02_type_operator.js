// Numbers
const a = 13
const b = -3
const c = 3.14 // float
const d = 2.998e8 // 2.998 * 10^8 = 299,800,000
const e = Infinity
const f = -Infinity
const g = NaN

console.log(a, b, c, d, e, f, g)

// Strings
const sentence1 = 'sentence'
const sentence2 = "sentence"
const sentence3 = `sentence`

// backtick(`)
// 줄 바꿈 가능, python의 f-string과 같은 기능(Template Literal) 사용 가능
// const word = "안녕
// 하세요"
// console.log(word)

const word1 = "안녕 \n하세요"
console.log(word1)

const word2 = `안녕
하세요`
console.log(word2)

// Template Literal
// JS 에서 문자열을 입력하는 방식
const age = 20
const message = `홍길동은 ${age}
세입니다.`
console.log(message)

// 문자열은 + 연산만 가능하다
const happy = 'hello'
const hacking = 'world' + 'lol' + '!!!'
console.log(happy, hacking)


// Number.isNaN() 함수는 값이 NaN 인지 여부를 판별.
// 주어진 값이 유형이 Number 이고 값이 NaN 이면 true
// 아니면 false
Number.isNaN(null) // false
Number.isNaN(undefined) // false
Number.isNaN(1 + null) // false (숫자임)
Number.isNaN(1 + undefined) // true (숫자가 아님)
Number.isNaN('abc') // false
isNaN('abc') // true
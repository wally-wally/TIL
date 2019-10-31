// 배열로 이루어진 숫자들을 모두 더하는 함수
const numberAddEach = numbers => {
  let sum = 0
  for (const number of numbers) {
    sum += number
  }
  return sum
}

// 배열로 이루어진 숫자들을 모두 뺴는 함수
const numberSubEach = numbers => {
  let sub = 0
  for (const number of numbers) {
    sub -= number
  }
  return sub
}

// 배열로 이루어진 숫자들을 모두 곱하는 함수
const numberMulEach = numbers => {
  let mul = 1
  for (const number of numbers) {
    mul *= number
  }
  return mul
}

// 그런데 매번 이렇게 함수를 새로 정의해야 되나...?
// 공통점 : 수사로 이루어진 배열의 요소들을 각각 [???] 한다.
// [???] 를 callback 함수에서 처리하는 일로 바꿔보자.

// base 템플릿 역할
const numbersEach = (numbers, callback) => {
  let acc
  for (const number of numbers) {
    acc = callback(number, acc)
  }
  return acc
}

// 더한다
const addEach = (number, acc = 0) => {
  return acc + number
}

// 뺀다
const subEach = (number, acc = 0) => {
  return acc - number
}

// 곱한다
const mulEach = (number, acc = 1) => {
  return acc * number
}

const NUMBERS = [1, 2, 3, 4, 5,]
console.log(numbersEach(NUMBERS, addEach))
console.log(numbersEach(NUMBERS, subEach))
console.log(numbersEach(NUMBERS, mulEach))


// 그런데 addEach, subEach, mulEach 얘네들 다시 사용 안할 것 같은데??
// numbersEach 이후의 제어를 함수 정의 없이 매번 자유롭게 하려면 어떻게 해야 할까?
// 익명함수로 쓰자
console.log(numbersEach(NUMBERS, (number, acc=0) => acc + number))
console.log(numbersEach(NUMBERS, (number, sub=0) => sub - number))
console.log(numbersEach(NUMBERS, (number, mul=1) => mul * number))
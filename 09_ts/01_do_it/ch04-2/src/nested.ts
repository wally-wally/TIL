// (2) 중첩 함수: 함수 안에 또 다른 함수를 중첩해서 구현

const calc = (value: number, cb: (number) => void): void => {
  let add = (a, b) => a + b
  function multiply(a, b) {
    return a * b
  }
  let result = multiply(add(1, 2), value)
  cb(result)
}

calc(30, (result: number) => console.log(`Result is ${result}!`)) // Result is 90
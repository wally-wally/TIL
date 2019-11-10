// const nothing = () => {
//   console.log('sleeping')
// }

// console.log('start')
// setTimeout(nothing, 3000)
// console.log('end')
// start
// end가 나온후
// 3초 뒤에 sleeping이 출력된다.

// function sleep_3s() {
//   setTimeout(() => console.log('wake up'), 3000)
// }
// console.log('Start sleeping')
// sleep_3s()
// console.log('End of program')


// function first() {
//   console.log('first')
// }

// function second() {
//   console.log('second')
// }

// function thrid() {
//   console.log('thrid')
// }
// first()
// setTimeout(second, 1000)
// thrid()

console.log('Hi')

setTimeout(function ssafy() {
  console.log('ssafy')
}, 5000) // [주의!] 5000이든 0이든 출력은 동일 - 이 시간은 콜백큐로 가는 시간이다. 비동기 처리가 모두 끝나야 출력된다!

console.log('bye')



function printHello() {
  console.log('hello from baz')
}

function baz() {
  setTimeout(printHello, 3000)
}

function bar() {
  baz()
}

function foo() {
  bar()
}

foo()
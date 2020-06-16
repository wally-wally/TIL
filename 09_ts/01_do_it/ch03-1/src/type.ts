// 1. 타입 선언
let n: number = 1;
let b: boolean = true // or false
let s: string = 'hello'
let o: object = {}

// 타입 불일치 오류 발생
// n = 'a'
// b = 123
// s = false

// cf) 타입 추론
// 타입 작성 부분을 아래와 같이 생략할 수 있다.
// 타입스크립트 컴파일러는 아래와 같은 코드에서는 = 연산자 오른쪽 값에 따라 변수의 타입을 지정하게 된다.
let num = 2
let str = 'Wow'
let obj = {'name': 'wally', 'age': 27}


// 2. any 타입, undefined 타입
// (1) any 타입
// 값의 타입과 무관하게 어떤 종류의 값도 저장할 수 있다.
let a: any = 0
a = 'hello'
// (2) undefined 타입
// JS에서 undefined는 값이다. 변수를 초기화하지 않으면 해당 변수는 undefined 값을 가진다.
// 하지만 TS에서 undefined는 타입이기도 하고 값이기도 한다.
let und: undefined = undefined // 변수 und에는 오직 undefined만 할당이 가능하다.
// u = 1 // 오류 발생


// 3. 템플릿 문자열
// JS에서와 동일하게 `${}` 형태로 작성한다.
let count = 20
let text = 'My age'
let message = `${text}: ${count}`
console.log(message)
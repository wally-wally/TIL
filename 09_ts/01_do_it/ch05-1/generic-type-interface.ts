// (10) 제네릭 함수의 타입 추론
const identity = <T>(n: T): T => n
console.log(identity<boolean>(true)) // true
console.log(identity(true)) // true

// 제네릭 형태로 구현된 함수는 원칙적으로는 3행처럼 타입 변수를 아래와 같은 형태로 명시해야 한다.
// 함수 이름<타입 변수>(매개변수)

// 하지만 이런 코드는 번거롭기 때문에 TS는 4행처럼 타입 변수 부분을 생략할 수 있게 한다.
// TS는 타입 변수가 생략된 제네릭 함수를 만나면 타입 추론을 통해 생략된 타입을 찾아낸다.
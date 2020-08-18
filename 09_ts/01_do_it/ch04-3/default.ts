// (1) 매개변수 기본값 지정하기
// 선택적 매개변수는 항상 그 값이 undefined로 고정된다.
// 만일, 함수 호출 시 인수를 전달하지 않더라도 매개변수에 어떤 값을 설정하고 싶다면
// 매개변수의 기본값을 지정할 수 있다.
// 이를 default parameter라고 한다.

export type Person = {
  name: string,
  age: number
}

// export const makePerson = (name: string, age: number = 27): Person => {
//   const person = { name, age }
//   return person
// }

// 화살표 함수로 코드 단축
export const makePerson = (name: string, age: number = 27): Person => ({ name, age })

console.log(makePerson('Wally')) // { name: 'Wally', age: 27 }
console.log(makePerson('Jone', 30)) // {name: 'Jone', age: 30 }
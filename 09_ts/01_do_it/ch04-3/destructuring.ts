// (2) 매개변수에 비구조화 할당문 사용
// 함수의 매개변수도 변수의 일종이므로 아래 코드와 같이 비구조화 할당문을 적용할 수 있다.

export type Person = {
  name: string,
  age: number
}

const printPerson = ({ name, age }: Person): void => {
  console.log(`name: ${name}, age: ${age}`)
}

printPerson({ name: 'Wally', age: 27 }) // name: Wally, age: 27
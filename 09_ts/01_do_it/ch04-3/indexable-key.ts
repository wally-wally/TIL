// (3) 색인 키와 값으로 객체 만들기(색인 가능 타입)
// ESNext 자바스크립트에서는 아래와 같이 코드를 작성할 수 있다.
const makeObject = (key, value) => ({[key]: value})

// 위 코드는 아래와 같이 객체의 속성 이름을 변수로 만들려고 할 때 사용한다.
// 즉, [key] 부분이 'name'이면 {name: value} 형태로, 'age'이면 {age: value} 형태로 객체를 생성한다.
console.log(makeObject('name', 'Wally')) // {name: 'Wally'}
console.log(makeObject('gender', 'M')) // {gender: 'M'}

// 타입스크립트에서는 {[key]: value} 형태의 타입을 '색인 가능 타입'(indexable type) 이라고 하며 아래와 같이 작성한다.
// type KeyType = { [key: string]: string }

export type KeyValueType = {
  [key: string]: string
}

export const makeObj = (key: string, value: string): KeyValueType => ({[key]: value})
console.log(makeObj('name', 'Wally')) // {name: 'Wally'}
console.log(makeObj('gender', 'M')) // {gender: 'M'}
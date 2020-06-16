// 4. 인터페이스
// (1) interface의 기본 사용법
// interface: 객체의 타입을 정의할 수 있는 키워드
// 기존 JS에서 object 타입은 마치 객체를 대상으로 하는 any 타입처럼 동작했다.
// TS에서는 이렇게 동작하지 않게 하기 위해 interface를 만들었다.
interface IPerson {
  name: string
  age: number
}

let wally: IPerson = {name: 'wally', age: 27} // O
let hong: IPerson = {name: 'hong'} // X(age 속성이 없으므로 오류)
let kim: IPerson = {} // X(name, age 속성 모두 없으므로 오류)
let park: IPerson = {name: 'park', age: '30'} // X(age 속성이 string 타입이므로 오류)
let choi: IPerson = {name: 'choi', age: 33, etc: true} // X(interface에서 정의하지 않은 etc 속성이 있으므로 오류)


// (2) 선택 속성
// 인터페이스를 만들 때 어떤 속성은 반드시 포함해야 하고 어떤 속성은 있어도 되고 없어도 되게 만들고 싶을 때가 있다.
// 이러한 속성을 선택 속성 이라고 하는데 interface 안에 속성을 정의할 때 : 앞에 '?'를 붙이면 선택 속성으로 바뀐다.
interface NewIPerson {
  name: string // 필수 속성
  age: number // 필수 속성
  etc?: boolean // 선택 속성
}
// person1, person2 둘 다 오류 없이 성공
let person1: NewIPerson = {name: 'wow', age: 30}
let person2: NewIPerson = {name: 'wow', age: 30, etc: false}


// (3)익명 인터페이스: 이름이 없는 인터페이스
let annoymousUser: {
  name: string
  age: number
  etc?: boolean
} = {name: 'James', age: 23, etc: true}

// 익명 인터페이스는 주로 아래와 같은 함수를 구현할 때 사용한다.
function showUserInfo(user: {name: string, age: number, etc?: boolean}) {
  console.log(user.etc ? `${user.name}'s age is ${user.age} / ${user.etc}` : `${user.name}'s age is ${user.age}`)
}

showUserInfo(annoymousUser)
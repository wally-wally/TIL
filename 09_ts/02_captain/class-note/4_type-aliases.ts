// interface Person {
//   name: string;
//   age: number;
// }

type Person = {
  name: string;
  age: number;
}

var wally: Person = {
  name: 'wally',
  age: 100 
}

// 타입 별칭: 새로운 값 하나를 생성하는 것이 아니라 정의한 타입에 대해 나중에 쉽게 참고할 수 있도록 이름을 부여하는 것
// 인터페이스와 다르게 타입 별칭은 확장 할 수 없다.
// 그래서 가능한한 type 보다는 interface로 선언해서 사용하는 것을 추천한다고 공식 문서에도 나와 있다.(확장 가능)
type MyString = string;
var str: MyString = 'hello';

type Todo = { id: string, title: string, done: boolean };
function getTodo(todo: Todo) {
  console.log(todo);
}

interface User {
  age: number;
  name: string;
}


// (1) 변수에 인터페이스 활용
var wally: User = {
  age: 27,
  name: 'wally'
}


// (2) 함수에 인터페이스 활용
function getUser(user: User) {
  console.log(user);
}

const capt = {
  name: 'captain',
  age: 100
}
getUser(capt);


// (3) 함수의 스펙(구조)에 인터페이스를 활용
interface SumFunction {
  (a: number, b: number): number;
}

var sum: SumFunction;
sum = function(a: number, b: number): number {
  return a + b;
}


// (4) 인덱싱
interface StringArray {
  [index: number]: string;
}

var arr: StringArray = ['a', 'b', 'c'];
// arr[0] = 10;
arr[0] = '10';


// (5) 딕셔너리 패턴
interface StringRegexDictionary {
  [key: string]: RegExp;
}

var obj: StringRegexDictionary = {
  // sth: /abc/,
  cssFile: /\.css$/,
  jsFile: /\.js$/,
}

// 콜백 함수의 인자인 value의 type이 string이라고 타입 추론을 할 수 있게 된다.
Object.keys(obj).forEach(function(value) {});


// (6) 인터페이스 확장
interface Person {
  name: string;
  age: number;
}

interface Developer extends Person {
  language: string;
}

var wallywally: Developer = {
  language: 'ts',
  name: 'wallywally',
  age: 27
}
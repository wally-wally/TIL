// (1) 타입 추론의 기본
var a = 'abc';

function getB(b = 10) {
  var c = 'hi';
  return b + c;
}

10 + '10' // '1010'


// (2) 인터페이스와 제네릭을 이용한 타입 추론 방식
// interface Dropdown<T> {
//   value: T;
//   title: string;
// }

// var shoppingItem: Dropdown<string> = {
//   value: 'abc',
//   title: 'hello'
// }


// (3) 복잡한 구조에서의 타입 추론 방식
interface Dropdown<T> {
  value: T;
  title: string;
}

// DetailDropdown의 제네릭으로 string이 들어오면
// extends에 작성된 Dropdown interface의 제네릭으로도 string이 들어가진다.
interface DetailedDropdown<K> extends Dropdown<K> {
  description: string;
  tag: K;
}

var detailedItem: DetailedDropdown<string> = {
  title: 'abc',
  description: 'ab',
  value: 'a',
  tag: 'a'
}


// (4) Best Common Type 추론 방식
// 가장 근접한 타입을 추론하는 방식 => union으로 묶어 나가는 방식
var arr = [1, 2, true, true, 'a']; // (string | number | boolean)[]
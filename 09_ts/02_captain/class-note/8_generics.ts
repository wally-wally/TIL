// function logText(text) {
//   console.log(text);
//   return text;
// }
// logText(10); // 숫자 10
// logText('wally'); // 문자열 wally
// logText(true); // 진위값 true


// 제네릭의 기본 문법
// 타입을 함수의 파라미터 처럼 넘길 수 있다.
// function logText<T>(text: T):T {
//   console.log(text);
//   return text;
// }
// logText<string>('wally');


// 기존 타입 정의 방식 vs 제네릭
// (1) 함수 중복 선언의 단점
// function logText(text: string) {
//   console.log(text);
//   // text.split('').reverse().join('');
//   return text;
// }

// function logNumber(num: number) {
//   console.log(num);
//   return num;
// }

// (2) 유니온 타입을 이용한 선언 방식의 문제점
// input 문제는 해결되었으나 return할 때의 문제는 해결되지 않았다.
// function logText(text: string | number) {
//   console.log(text);
//   return text;
// } 

// const a = logText('a');
// a.split(''); // a의 타입이 string이라고 타입 추론이 제대로 되지 않아 오류가 뜬다.
// logText(10);
// const num = logNumber(10);
// logText(true);


// 제네릭의 장점
// 제네릭을 사용해서 정확하게 타입 추론을 할 수 있게 된다.
function logText<T>(text: T): T {
  console.log(text);
  return text;
}

const str = logText<string>('abc');
str.split(''); // str 변수가 string type 이라는 것을 감지하게 된다.
const login = logText<boolean>(true); // login 변수가 boolean type 이라고 정확하게 타입을 추론하게 된다.


// 인터페이스에 제네릭을 선언하는 방법
// 인터페이스에 제네릭을 적용하면 재사용 가능한 인터페이스를 만들 수 있다.
interface Dropdown {
  value: string;
  selected: boolean;
}

// const obj1: Dropdown = { value: 10, selected: false }; // Dropdown interface의 value에는 string type이 정의되어 있으므로 오류 뜸
const obj2: Dropdown = { value: '10', selected: false };

interface Newdropdown<T> {
  value: T;
  selected: boolean;
}

const obj3: Newdropdown<number> = { value: 10, selected: false };
const obj4: Newdropdown<string> = { value: '10', selected: false };


// 제네릭의 타입 제한 1
// 함수의 인자의 타입을 정의할 때 T만 쓰는 것이 아니라 T[]와 같이 씀으로써 제네릭의 타입 힌트를 줄 수 있다.
// function logTextLength<T>(text: T[]): T[] {
//   console.log(text.length);
//   text.forEach(function (text) {
//     console.log(text);
//   })
//   return text;
// }
// logTextLength<string>(['hi', 'abc']);

// 제네릭의 타입 제한 2 - 정의된 타입 이용(interface, extends)
interface LengthType {
  length: number;
}
function logTextLength<T extends LengthType>(text: T): T {
  text.length;
  return text;
}
logTextLength('a');
// logTextLength(10); // number에는 length 속성이 없음
logTextLength({ length: 10 }); // 객체에 length가 정의되어 있으므로 가능

// 제네릭의 타입 제한 3 - keyof 예약어
interface ShoppingItem {
  name: string;
  price: number;
  stock: number;
}
// T extends keyof ShoppingItem => ShoppingItem의 key 들 중 하나가 제네릭 T가 된다는 의미(이외 것들은 제외)
function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
  return itemOption;
}
// getShoppingItemOption(10);
// getShoppingItemOption<string>('a');
getShoppingItemOption('name');
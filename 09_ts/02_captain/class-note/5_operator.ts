// function logMessage(value: string) {
//   console.log(value);
// }

// logMessage('hello');
// logMessage(100);

// Union Type(|): 하나 이상의 타입을 사용할 수 있도록 해 줌
var wally: string | number | boolean;
function logMessage(value: string | number) {
  // 타입 가드: 특정 타입으로 타입의 범위를 좁혀나가는(필터링 하는) 과정
  if (typeof value === 'number') {
    value.toLocaleString();
  }
  if (typeof value === 'string') {
    value.toString();
  }
  throw new TypeError('value must be string or number');
}

logMessage('hello');
logMessage(100);

interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

// (주의!) 인터페이스나 특정 구조체를 유니온 타입으로 지정하면 공통 속성에 대해서만 접근할 수 있다. => 별도의 타입 가드 필요
function askSomeone(someone: Developer | Person) {
  console.log(someone.name);
  // console.log(someone.skill); // 에러
}


// intersection type(&)
var user1: string | number | boolean;
var user2: string & number & boolean; // string, number, boolean을 모두 만족하는 타입

// Developer와 Person에 가지고 있는 속성들에 모두 접근할 수 있다. => 별도의 타입 가드 필요 없음
function askSomeone2(someone: Developer & Person) {
  console.log(someone.name);
  console.log(someone.skill);
}


// Union Type vs Intersection Type
// 실무에서는 상대적으로 Union Type이 더 많이 쓰인다.
function askSomeone3(someone: Developer | Person) {}
askSomeone3({ name: 'wally', skill: 'Frontend' });
askSomeone3({ name: 'wow', age: 100 });

function askSomeone4(someone: Developer & Person) {}
// askSomeone4({ name: 'wally', skill: 'Frontend' }); // Person의 age 속성이 없으므로 에러
askSomeone4({ name: 'wow', age: 100, skill: 'FE' });
// (1) 인터페이스, 클래스 타입 호환
// 내부적으로 존재하고 있는 속성과 타입에 대한 정의들의 규모를 고려하여 타입 호환을 구현할 수 있다.
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
}

class Person {
  name: string;
}

var developer: Developer;
var person: Person;
// person에는 name 속성만 있기 때문에 person이 developer에 할당될 수 없다.
// 그래서 오른쪽에 있는 변수의 타입이 더 많은 속성을 가지고 있거나 구조적으로 커야 타입 호환이 가능하다.
// developer = person; // 타입 호환 불가능
person = developer; // 타입 호환 가능

// developer = new Person(); // 불가능


// (2) 함수 타입 호환
// 내부적으로 구조가 큰 함수에다가 구조적으로 작은 함수를 할당하거나 호환하는 것은 가능하지만
// 내부적으로 구조가 작은 함수에다가 구조적으로 큰 함수를 할당하거나 호환하는 것은 불가능하다.
// add 함수보다 sum 함수의 내부적인 구조가 더 크다.
var add = function(a: number) {
  // ...
}
var sum = function(a: number, b: number) {
  // ..
}

// add = sum; // 타입 호환 불가능(오른쪽에 있는 함수가 구조적으로 더 크기 때문에 타입 호환 불가능)
sum = add; // 타입 호환 가능


// (3) 제네릭 타입 호환
interface Empty<T> {
  // ...
}

var empty1: Empty<string>;
var empty2: Empty<number>;
// Empty interface 내부적으로 아무것도 없이 비어있기 때문에 아래 두 코드 모두 가능하다.
empty1 = empty2;
empty2 = empty1;

interface NotEmpty<T> {
  data: T;
}

var notEmpty1: NotEmpty<string>;
var notEmpty2: NotEmpty<number>;
// 아래 두 코드 모두 타입 호환이 되지 않는다.
// notEmpty1, notEmpty2 둘 다 정의된 타입이 다르기 때문
// notEmpty1 = notEmpty2;
// notEmpty2 = notEmpty1;
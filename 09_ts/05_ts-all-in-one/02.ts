// union, intersection
// 간단하게만 쓸꺼면 type
type A = { a: string };
const a01: A = { a: 'hello' };

// 객체 지향같이 복잡하게 구현하고 싶으면 interface
interface B { a: string }
const b02: B = { a: 'hello' }

// 아래 처럼 타입 선언하는게 아주 잘못된 케이스다.
// 그래서 처음 타입 설계할 때 잘 해놔야 나중이 매우 편하다.
function add1(x: string | number, y: string | number): string | number { return x + y }
add1(1, 2)
add1('1', '2')
add1(1, '2')

// 아래처럼 intersection 쓰는건 말이 안되지만
type C = string & number;
const c: C = 1;

// 객체인 경우에는 아래처럼 가능하다.
type D = { hello: 'world' } & { zero: 'cho' }; // intersection 일 때는 모든 속성이 다 존재해야 한다.
type E = { hello: 'world' } | { zero: 'cho' }; // union 일 때는 여러 개 중에 하나만 있으면 된다.
const d1: D = { hello: 'world', zero: 'cho' };
const d2: E = { hello: 'world', zero: 'cho' };
const d3: E = { hello: 'world' };

// type에서 intersection은 아래 처럼 상속의 개념으로 사용할 수 있다.
// '그리고'의 의미가 아니다!
type Animal = { breath: true };
type Poyouru = Animal & { breed: true };
type Human = Poyouru & { think: true };

const wally: Human = { breath: true, breed: true, think: true };

// type과 interface의 표현적 차이가 중요하지 기능적 차이는 그렇게 엄청 중요하지 않다.

// cf) interface에서 상속의 예시
interface A1 {
    breath: true
}
// interface B1 extends Human 도 가능하다.
interface B1 extends A1 {
    breed: true
}
const bb: B1 = { breath: true, breed: true }

// 인터페이스는 아래 처럼 여러 번 선언할 수 있고 선언할 때마다 합쳐진다.
interface C1 { 
    talk: () => void;
}
interface C1 {
    eat: () => void;
}
const ccc: C1 = { talk() {}, eat() {}, sleep() {} }
interface C1 {
    sleep: () => void
}
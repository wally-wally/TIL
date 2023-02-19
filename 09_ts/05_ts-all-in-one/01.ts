// 추론 잘 되면 추론된거에 맡기고 타입은 최대한 좁게 적자
const a = '5';
const b = 5;
const c = true;
const d = undefined;
const e = null;

const f: true = true;

function addFunc(x: number, y: number) { return x + y }
const result = addFunc(1, 2);

// 위는 타입만 존재, 아래는 선언만 되어 있는 이런 패턴도 존재한다...
// function multiple(x: number, y: number): number;
// function multiple(x, y) {
//     return x * y;
// }

// 타입을 강제로 바꿔주는 as라는 키워드가 있는데 js로 변환시 없어진다.
// cf) 원래는 number -> string으로 타입 변환이 불가능하기 때문에 as unknown 혹은 as any를 붙여야 한다.
let aa = 123;
aa = 'hello' as unknown as number;

// 보통 함수위 타입 선언은 type alias 방식을 사용한다.
type Add = (x: number, y: number) => number;
const add: Add = (x, y) => x + y;

// interface로도 함수의 타입을 정할 수 있는데 흔한 케이스는 아니다.
interface Add2 {
    (x: number, y: number): number;
}
const add2: Add2 = (x, y) => x + y;

// 길이가 정해지지 않은 배열
const arr = ['123', '456'];
const arr2 = [123, 456];
const arr3 = [1, 2];

// tuple: 길이가 고정된 배열(각 원소별 타입도 정확히 일치해야 함)
const tuple: [number, number, string] = [1, 2, '3'];

// 객체
const obj = { lat: 37.5, lon: 127.5 };

try {
    // 빈 배열은 never 타입임
    const array = [];
    // array.push('hello');
} catch (error) {
    error;
}

// !연산자 -> null이나 undefined가 아님을 보증하는 역할(but 이 방식은 비추)
const head = document.querySelector('#head')!;
console.log(head);

const head2 = document.querySelector('#head');
if (head2) {
  console.log(head2);
}

// 원시 래퍼 타입(가급적이면 원시 래퍼 타입은 쓰지 말자)
const a1: string = 'hello';
const a2: String = 'hell';

// 템플릿 리터럴 타입
type World = 'world' | 'hell';
// type Greeting = "hello hell" | "hello world";
type Greeting = `hello ${World}`;

// rest
function rest(a, ...args: string[]) {
    console.log(a, args);
}
rest('1', '2', '3');

// 튜플
const tuple1: [string, number] = ['1', 1];
tuple1[2] = 'hello'; // typescript에서 튜플일 때 이건 안 되는데
tuple1.push('hello'); // 이건 된다?!

// enum
// js로 변환시 안 남겨 있다
const enum EDirection {
    Up,
    Down,
    Left,
    Right,
}

// js로 변환시 남겨 있다
// as const가 있고 없을 때를 꼭 비교해보자
const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
} as const;

const up = EDirection.Up; // 0
const right = EDirection.Right; // 3

// Using the enum as a parameter
function walk(dir: EDirection) {}
 
// It requires an extra line to pull out the keys
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}
 
walk(EDirection.Left);
run(ODirection.Right);

const obj1 = {
    a: '123',
    b: '456',
} as const;
// 값을 type으로 쓰고 싶을 때 typeof
// 객체 중 key만 뽑고 싶을 때 keyof까지 추가
// (keyof obj1만 썼을 때 오류나는 이유는 obj1은 타입이 아닌 값이기 때문이다.)
// 그리고 as const를 붙여야 아래처럼 정확히 타입을 추론할 수 있다.(없는 경우 value 추출시 'string'으로만 추론될 것임)
type Key1 = keyof typeof obj1; // 'a' | 'b'
type Value1 = typeof obj1[keyof typeof obj1]; // '123' | '456'
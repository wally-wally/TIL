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

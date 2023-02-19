// {} 와 Object
// 위 두 타입은 '모든 타입'이라고 이해하자.(단, null과 undefined는 제외)
const x: {} = 123;
const y: Object = 'hi';
const xx: object = 'hi';
const yy: object = { hello: 'world' }; // object는 지양하고 interface, type, class를 지향하자
const z: unknown = 'hi';

// 4.8 버전 부터는 아래 공식이 성립된다.
// unknown = {} | null | undefined
if (z) {
  z; // {}
} else {
  z;
}

// readonly: 읽기 전용 속성으로 속성 실수로 변경하는 거를 막아주는 역할을 함
interface AAA {
  readonly a: string;
  b: string;
}

const aaaa: AAA = { a: 'hello', b: 'world' };
// aaaa.a = '123';

// 인덱스 시그니처
type BBB = { a: number, b: number, c: number, d: number; };
type BBBB = { [key: string]: number }
const bbbb: BBBB = { a: 3, b: 4, c: 5, d: 6 };

// 맵드 타입
type CCC = 'Human' | 'Mammal' | 'Animal';
type CCCC = { [key in CCC]: number };
const cccc: CCCC = { Human: 123, Mammal: 5, Animal: 7 };
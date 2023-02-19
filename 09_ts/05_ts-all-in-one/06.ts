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
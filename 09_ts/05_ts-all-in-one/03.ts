// 좁은 타입에 넓은 타입을 대입이 가능하고, 넓은 타입에 좁은 타입을 대입이 불가능하다.
// 헷갈릴 때는 벤 다이어그램을 떠올리자.
// 비슷한 원리로 any는 전체집합, never는 공집합으로 볼 수 있다.

// primitive type인 경우
type A01 = string | number; // 넓은 타입
type B01 = string; // 좁은 타입
type C01 = string & number; // never(제일 좁음)

// 객체인 경우
// D01, E01이 더 넓은 타입이고 F01이 더 좁은 타입이다.
// 즉, 객체는 더 구체적이고 상세할수록 좁은 타입이다.
type D01 = { name: string };
type E01 = { age: number };
// DE이 더 넓은 타입이고, F01이 더 좁은 타입이다.
type DE = D01 | E01;
type F01 = { name: string; age: number; }; // 사실 얘는 D01 & E01로도 표현 가능하다.

// 불가능
const de: F01 = { name: 'wally' };
// 가능
const f01: DE = { name: 'wally', age: 30 };

// 하지만 아래와 같은 케이스는 좁은 타입에 넓은 타입을 대입이 불가능하다.
// 왜냐하면 이 경우는 타입의 넓음, 좁음 뿐만 아니라 객체의 리터럴 검사(잉여 속성 검사) 때문에 걸리는 것이다.
type G = D01 & E01; // { name: string; age: number; } -> 넓은 타입
const f02: G = { name: 'wally', age: 30, married: false }; // -> 좁은 타입

// 이런 경우에는 중간에 임시 데이터를 하나 만들어주면 에러가 사라지긴 한다.
const obj01 = { name: 'wally', age: 30, married: false };
const f03: G = obj01;

// 함수에도 넓은 타입, 좁은 타입이 존재하는데 '공변성', '반공변성' 이라는 새로운 개념이 도입된다.
// 추후 다시 Comming Soon...
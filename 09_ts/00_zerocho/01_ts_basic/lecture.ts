// (1-1) type 선언 방법
// let num; // type을 지정하지 않으면 any가 된다.
let num: number; // any형이 되지 않도록 type을 명시하여 막아준다.
// let num: Number; // type 선언시 맨 처음 알파벳을 대문자로 쓰지 말자!(전부 소문자로!)
num = 3;

// (1-2) type 선언 방법
// let str: string = num; // 이건 에러
// let str: string = num.toString(); // 방법(1)
let str: string = String(num); // 방법(2)


// (2) 배열 선언 방법
let arr: number[] = [1, 2, 3]; // 배열 표기법(1) => number나 string일 때 주로 이 방법
// let arr: Array<number> = [1, 2, 3]; // 배열 표기법(2) => 제네릭 쓸 때 주로 이 방법


// (3) 튜플
let newArr: (string | number | boolean)[] = [true, 2, '3']; // 여러 type이 있는 경우
// let newArr: (string | number | boolean)[] = [true, 2, {}]; // 배열 요소에 다른 type(여기선 객체로 넣어봄)을 넣으면 error
let newArray: [boolean, number, string] = [true, 2, '3']; // 더 엄격하게 배열 선언(배열 길이가 3이고 type 순서가 boolean, number, string인 경우)
// 위와 같이 특별한 경우를 tuple 이라고 한다.
// 단, tuple에 push하는 행위는 막지 못한다.
// 여기서 더 엄격하게 한다면?
let newArray2: [boolean, 2, string] = [true, 2, '3']; // 두 번째 요소를 숫자 2로 고정
let originalArr = [true, 2, '3']; // 사실 이렇게만 써도 originalArr에 마우스를 올리면 type이 어떻게 선언되는지 알아서 알려준다.


// (4) 상수, 객체(객체는 object라고 type을 선언하지 않는다. 워낙 형태가 다양...)
const fixArr = [true, 2, '3'] as const; // as const를 붙여주면 fixArr 내용을 바꿀 수 없다.(readonly)
const obj = { a: 'k' };
// obj = 'hello'; // const인 object 자체는 바꿀 수 없지만
// obj.a = 'c'; // 이거는 가능하다.
// 그래서 object 뒤에 as const 까지 붙여주면 object의 key-value 값을 바꿀 수 없다.
const secondObj = { a: 'k'} as const;
// secondObj.a = 'c'; // 불가능
const thridObj: { a: string, b: number } = { a: 'k', b: 1 };
// thridObj.a = 3; // string을 넣지 않았으므로 error
const fourthObj: { a: string, b?: number } = { a: 'k' }; // b가 나중에 생길지 안 생길지 모르는 경우 ?를 붙여준다.

// (5) enum
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
// Color[0] === 'Red';
// Color['Red'] === 0;
// Color[1] === 'Green';
// Color['Green'] === 1;
// Color[2] === 'Blue';
// Color['Blue'] === 2;
// enum은 위와 같이 모두 성립되게 할 수 있는 type이다.


// (6) optional chaining (추후 자세히 살펴봄)
// const a = abc?.name
// obj.method?.()


// (7) null, undefined
const n = null;
const u = undefined;


// (8) 함수
function add(a: number, b: number): number {
  return a + b;
}

function sayHi(a: string): void { // return이 없는 함수는 return type이 void 이다.
  console.log(a);
}

// typescript에서 함수형 프로그래밍으로 작성시 치명적인 단점(함수 안에 함수를 작성할 때 가독성이 매우 안 좋다...)
function mul(a: number, b: number): (c: string) => (d: string) => boolean { // 고차함수(함수 자체를 return으로 쓸 때)
  return (c: string) => {
    return (d: string) => {
      return false;
    }
  }
}

// 오버로딩 : 같은 이름의 함수(메서드)를 여러 개 정의하고, 매개변수의 유형과 개수를 다르게 해서 다양한 유형의 호출에 응답할 수 있다.
// 매개변수가 쓸 수도 있고 쓰지 않을 수도 있는 경우 ?를 변수 뒤에 붙여준다.
const obj2: { a: (b: number, c?: string) => string } = {
  a(b: number, c?: string) {
    return 'hello'
  }
}
// obj2.a(); // 매개변수 b는 필수인데 없으므로 error
obj2.a(3);
obj2.a(3, 'hello');


// (9) never: 주로 에러 발생 시에만 만나는 type이다.
const arr2: [] = [];
// arr2.push(3); // 배열을 잘못 만든 경우


// (10) any: 아무거나 어떤 type이든지 올 수 있다.
// 또는 타입 정의할 때 너무 복잡해서 못 만들 것 같은 경우 any를 쓴다.
const hi: any = '3';


// (11) 타입 변환(타입 캐스팅)
// 남이 만든 d.ts에서 type을 잘못 만든 경우 
// d.ts
const hello: number = 345;

// 불러오는 파일에서
// import hello from 'hello';
// hello.substr(); // 위에서 number로 잘못 만들었을 때 any로 변환해서 쓴다.
(hello as unknown as string).substr(1, 2); // 강제 type 변환 방법 - 1
// 타입이 겹치는 경우(ex. d.ts에서 interface에서 부모-자식 관계) as unknown을 쓰지 않아도 되지만 위와 같은 경우는 number와 string 명확히 다르므로 as unknown을 써줘야 한다.
(<string><unknown>hello).substr(1, 2); // 강제 type 변환 방법 - 2
// 가급적이면 as unknown을 쓰지 않는 것이 좋지만 프로젝트를 하다 보면 어쩔 수 없이 써야하는 경우가 생기므로 알아두자.

const div = document.createElement('div'); // HTMLDivElement
const a = div as HTMLElement; // 이럴 때는 타입이 겹치므로 as unknown을 쓰지 않아도 된다.(자식인 HTMLDivElement 타입은 부모인 HTMLElement를 상속 받음)
const b = div as unknown as number; // number와 HTMLDivElement는 겹치는 관계가 아예 없으므로 as unknown을 붙여서 강제로 타입 변환을 해줘야 한다.
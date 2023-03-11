// bind 타입 분석

function sayName(this: Window | typeof user, param: string) {
    console.log(this.name);
}

const user = { name: 'wally' };
const bindingUser = sayName.bind(user);
bindingUser('1'); // 'wally'

// Extracts the type of the 'this' parameter of a function type, or 'unknown' if the function type has no 'this' parameter.
type T = ThisParameterType<typeof sayName>;
// Removes the 'this' parameter from a function type.
type NoThis = OmitThisParameter<typeof sayName>;


// bind 사용 예제

// #1) this를 쓰는 경우
// bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>; 가 적용
const wallyUser = {
    name: 'wally',
    sayHello(this: { name: string }) {
        console.log(`hi, ${this.name}`);
    }
}

const sayHello =  wallyUser.sayHello;
const sayHi = wallyUser.sayHello.bind({ name: 'wally-wally' });
sayHi(); // 'hi, wally-wally'

// #2) this를 안 쓰는 경우
// 그 나머지 케이스들 (타입 분석이 헷갈리면 this parameter를 지우고 보면 편하다)
// bind<T, A0, A extends any[], R>(this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0): (...args: A) => R;
// bind<T, A0, A1, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1): (...args: A) => R;
// bind<T, A0, A1, A2, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2): (...args: A) => R;
// bind<T, A0, A1, A2, A3, A extends any[], R>(this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, ...args: A) => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3): (...args: A) => R;
// bind<T, AX, R>(this: (this: T, ...args: AX[]) => R, thisArg: T, ...args: AX[]): (...args: AX[]) => R;
function addFunc(a: number, b: number, c: number, d: number, e: number, f: number) {
    return a + b + c + d + e + f;
}

// 이건 bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>; 가 적용됨
const addFunc1 = addFunc.bind(null);
addFunc1(1, 2, 3, 4, 5, 6);

// bind<T, A0, A extends any[], R>(this: (this: T, arg0: A0, ...args: A) => R, thisArg: T, arg0: A0): (...args: A) => R;
// thisArg가 null, arg0이 1이다.
const addFunc2 = addFunc.bind(null, 1);
addFunc2(2, 3, 4, 5, 6);

const addFunc3 = addFunc.bind(null, 1, 2);
addFunc3(3, 4, 5, 6);

const addFunc4 = addFunc.bind(null, 1, 2, 3);
addFunc4(4, 5, 6);

const addFunc5 = addFunc.bind(null, 1, 2, 3, 4);
addFunc5(5, 6);

// 5개 이상일 때는 typescript의 bind 내부 타입으로 선언하지 않았다.
// 실제로 코딩하다보면 함수에서 이렇게 파라미터를 많이 만들지 않는다. 그래서 대부분 많이 존재하는 케이스까지만 만든 것 같다.
// 그래서 이 경우는 제일 마지막인 bind<T, AX, R>(this: (this: T, ...args: AX[]) => R, thisArg: T, ...args: AX[]): (...args: AX[]) => R; 가 적용된 것이다.
// 그리고 typescript 기술적 한계로 파라미터 개수에 따라 따로따로 만들지 않고 하나로 묶을 수 있는 방법이 없다는 문제도 있다...(앞으로 개선할 것이라고 기대중)
// 개선된 그 예로 https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types 에서 concat 타입을 한번 참고해보자.
const addFunc6 = addFunc.bind(null, 1, 2, 3, 4, 5);
addFunc6(6);

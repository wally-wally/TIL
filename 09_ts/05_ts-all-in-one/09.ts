// 제네릭
function addFn<T>(x: T, y: T): T { return x + y };
addFn<number>(1, 2);
addFn(1, 2);
addFn<string>('1', '2');
addFn('1', '2');
// addFn(1, '2');

// 제네릭 선언 위치
// function a<T>() {}
// class B<T>() {}
// interface C<T> {}
// type D<T> = {};
// const e = <T>() => {};

// 제네릭 기본값, extends
function addFunc<T extends number | string>(x: T, y: T): T { return x + y }
addFunc(1, 2);
addFunc('1', '2')

// 제네릭 제한 방법
// <T extends {...}> // 특정 객체
// <T extends any[]> // 모든 배열
// <T extends (...args: any) => any> // 모든 함수
// <T extends abstract new (...args: any) => any> // 생성자 타입 -> class A {} 같은게 있으면 add(A) 이렇게 사용 가능
// <T extends keyof any> // string | number | symbol
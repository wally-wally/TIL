// 함수의 return type으로 void인 경우 return만 있거나 return undefined를 제외한 나머지 return 들은 올 수 없다.
function f1(): void {

}
// const b = f1();

interface Human2 {
  talk: () => void;
}

const human: Human2 = {
  talk() { return 'abc'; }
}

// void type
// #1
// 직접적으로 return 값이 없다는 의미
function func(): void {}

// #2
// callback의 return 값을 사용하지 않겠다는 의미
function func2(callback: () => void) {}
func2(() => {
  return '3';
});

// #3
// return 값을 쓰지 않겠다는 의미
interface IF {
  f: () => void;
}

const objIf: IF = {
  f() { return 'abc'} 
}
// js에서는 'abc'로 나오겠지만 ts입장에서는 그 값을 무시하므로 타입이 void로 추론된다. (그래서 void면 원칙적으로 return을 넣지 않는게 맞다.)
const value = objIf.f();
const value2 = objIf.f() as unknown as number; // 타입 강제 변환은 이 방식을 권장
const value3 = <number><unknown>objIf.f(); // 이 방식은 리액트에서 간혹 문제가 있을 수 있다.

// (예시)
// declare가 없으면 직접 구현부를 작성해야하지만 declare를 쓰면 굳이 구현안하고 타입 선언만 가능하다.
// 단 js 파일로 변환시 해당 부분은 사라진다.
// (void를 number 혹은 undefined로 바꿔보고 어떤 에러가 뜨는지 확인하자. / void랑 undefined는 엄연히 다르다)
// declare: 타입스크립트한테 다른 곳에서 선언했음을 보장해주는 역할을 한다.
declare function forEach(arr: number[], callback: (el: number) => void): void;
declare const tempNumber: number;

let target: number[] = [];
forEach([1, 2, 3], el => { target.push(el) });
forEach([1, 2, 3], el => target.push(el));


// any와 unknown
// any는 타입 검사 자체를 포기한다는 의미다. (=> 타입스크립트 쓰는 의미가 사라짐, '나는 타입스크립트 쓰는 걸 포기하겠다')
// unknown은 지금 당장은 타입을 정확하게 정의하기 어렵고 나중에 다시 정확히 정의할 수 있을 때(내가 나중에 타입 정의를 꼭 해줘야 할 때)
try {
  
} catch (error) {
  // (error as Error).message
  // (error as AxiorError).message
}

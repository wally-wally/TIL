// 공변성, 반공변성(함수간의 대입 관계)

// 1) return type
// return 값은 좁은 타입에서 더 넓은 타입으로 대입할 수 있다.
function fn01(x: string): number {
  return +x;
}

type FN01 = (x: string) => number | string;

const fn1: FN01 = fn01;

function fn02(x: string): number | string { // (x: string) => string 또는 (x: string) => number
  return 0;
}

type FN02 = (x: string) => number;

// 반대로는 불가능하다.
// const fn2: FN02 = fn02;


// 2) paratmer
// 하지만 매개변수는 위에서 살펴본 return 값과 반대로 된다. (즉, 매개변수는 넓은 타입에서 좁은 타입으로 대입이 된다.)
function fn03(x: string | number): number {
  return 0;
}

type FN03 = (x: string) => number;
const fn3: FN03 = fn03;
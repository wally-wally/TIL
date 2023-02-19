// 타입 가드(타입 좁히기)
function numOrStr(a: number | string) {
  if (typeof a === 'string') {
    a.split(',');  
  } else {
    a.toFixed(1);
  }

  // 여기서 a는 never type으로 추론된다.
  // if (typeof a === 'boolean') {
  //   a.toString();
  // }
}

numOrStr('123');
numOrStr(1);

function numOrNumArr(a: number | number[]) {
  if (Array.isArray(a)) { // number[]
    a.slice(1);
  } else { // number
    a.toFixed(1);
  }
}

numOrNumArr(123);
numOrNumArr([1, 2, 3]);


// class는 클래스 자체가 타입 자리에 올 수 있는데
// 실제로 와야하는 값은 클래스 인스턴스(new A1())가 와야 한다.
// 참고로 클래스 자체의 타입은 typeof 클래스(ex. typeof A1) 이다.
class A1 {
  aaa() {}
}

class B1 {
  bbb() {}
}

function aOrB(param: A1 | B1) {
  if (param instanceof A1) {
    param.aaa();
  }
}
aOrB(new A1());
// aOrB(A1);

// 객체의 타입 구별법
type BT = { type: 'b', bbb: string };
type CT = { type: 'c', ccc: string };
type DT = { type: 'd', ddd: string };

// #1) 값으로 구분하는 방법
function typeCheck(a: BT | CT | DT) {
  if (a.type === 'b') {
    a.bbb;
  } else if (a.type === 'c') {
    a.ccc;
  } else {
    a.ddd;
  }
}
// #2) 속성으로 구분하는 방법
function typeCheck2(a: BT | CT | DT) {
  if ('bbb' in a) {
    a.bbb;
  } else if ('ccc' in a) {
    a.ccc;
  } else {
    a.ddd;
  }
}

// 커스텀 타입 가드(is)
interface Cat { meow: number }
interface Dog { bow: number }
// 타입을 구분해주는 커스텀 함수를 우리가 직접 만들 수 있다.
function catOrDog(a: Cat | Dog): a is Dog {
  // 여기에 타입 판별을 직접 만든다.
  if ((a as Cat).meow) { return false }
  return true;
}
const cat: Cat | Dog = { meow: 3 }
if (catOrDog(cat)) {
  // console.log(cat.meow);
}
if ('meow' in cat) {
  // console.log(cat.meow);
}

const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === 'rejected';
const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]);
const success = promises.filter(isFulfilled);
const errors = promises.filter(isRejected);

export {}
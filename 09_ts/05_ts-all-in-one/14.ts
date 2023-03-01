// 오버로딩

// 아래처럼 declare만 작성하면 typescript는 어딘가에 해당 함수의 구현부가 있겠구나하고 가정한다.
declare function addFn(x: number, y: number): number
declare function addFn(x: string, y: string): string
declare function addFn(x: number, y: number, z: number): number

addFn(1, 2);
addFn(2, 3, 4);
addFn('1', '2');

interface IAdd {
  (x: number, y: number): number;
  (x: string, y: string): string;
}

// 위와 같이 오버로딩할 때 타입을 정확히 선언해놓으면 아래와 같이 구현부에서는 any로 작성해도 괜찮다.
const addFunction: IAdd = (x: any, y: any) => x + y;

class ABC {
  // 아래 두 개꺼만 오버로딩 대상이다.
  add(x: number, y: number): number;
  add(x: string, y: string): string;
  add(x: any, y: any) {
    return x + y;
  }
}

const value01 = new ABC().add(1, 2);
const value02 = new ABC().add('1', '2');
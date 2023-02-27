interface Array<T> {
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
}

const array1: Array<number> = [1, 2, 3];
array1.forEach((value) => { console.log(value); });

['1', '2', '3'].forEach((value) => { console.log(value); });
[true, false, true].forEach((value) => { console.log(value); });
['123', 123, true].forEach((value) => { console.log(value); });

const array2 = [1, 2, 3].map((value) => value.toString()); // ['1', '2', '3'] string[]

const filtered = [1, 2, 3, 4, 5].filter((value) => value % 2);

// S extends T -> string extends string | number 가 가능하기 때문에
// 위 filter 타입 선언 부분 중 첫 번째꺼가 여기에 해당된다.
const predicate = (value: string | number): value is string => typeof value === 'string';
const filtered2 = ['1', 2, '3', 4, '5'].filter(predicate); // ['1', '3', '5'] string[]

// 아래 처럼 에러나는 이유는 predicate 부분이 위에서 선언한 커스텀 타입 가드 형태가 아니기 때문이다.
// const predicate2 = (value: string | number): value is string => typeof value === 'string'; // 얘가 커스텀 타입 가드 들어간 애
// const resultArr = ['1', 2].filter<string>((value) => typeof value === 'string');

// 제일 좋은 공부 방법은 타입스크립트 자체적으로 만들어놓은 타입 정의 파일을 훑어보는 것이다.
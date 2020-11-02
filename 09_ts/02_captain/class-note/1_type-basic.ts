// JS 문자열
// var str = 'Hello';

// TS 문자열
let str: string = 'Hello';

// TS 숫자
let num: number = 10;

// TS 배열
let arr: Array<number> = [1, 2, 3, 4];
let heros: Array<string> = ['Captain', 'Thor', 'Hulk']; // 배열에 숫자 10을 추가하면 에러 문구가 나온다.
let items: number[] = [1, 2, 3, 4];

// TS 튜플
// 배열의 특정 인덱스(순서)에 타입까지 정의하는 것을 튜플이라고 한다.
let address: [string, number] = ['cheonan', 10];

// TS 객체
let obj: object = {};
// let person: object = {
//   name: 'Wally',
//   age: 27
// };
let person: { name: string, age: number } = {
  name: 'Wally',
  age: 27
};

// TS 진위값
let show: boolean = true;
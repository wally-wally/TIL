const a: string = '5';
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: any = true;

// 무조건 특정 값만 받고 싶을 때
const g: true = true;
const h: 5 = 5;

// function add(x: number, y: number): number { return x + y }

// 보통 함수위 타입 선언은 type alias 방식을 사용한다.
type Add = (x: number, y: number) => number;
const add: Add = (x, y) => x + y;

// interface로도 함수의 타입을 정할 수 있는데 흔한 케이스는 아니다.
interface Add2 {
    (x: number, y: number): number;
}
const add2: Add2 = (x, y) => x + y;

// 길이가 정해지지 않은 배열
const arr: string[] = ['123', '456'];
const arr2: number[] = [123, 456];
const arr3: Array<number> = [1, 2];

// tuple: 길이가 고정된 배열(각 원소별 타입도 정확히 일치해야 함)
const tuple: [number, number, string] = [1, 2, '3'];

// 객체
const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };
// forEach, map, filter 타입 직접 만들기
// 처음부터 모든 케이스를 다 방어해서 타이핑하는 것은 어려우니 작업하면서 차차 추가하자. (다 만들고 정답과 한번 비교해보는 것도 좋다.)

interface Arr<T> {
    forEach(callback: (item: T, index: number) => void): void;
    map<S>(callback: (item: T, index: number) => S): S[];
    filter<S extends T>(callback: (item: T) => item is S): S[];
}

// forEach test
const arr01: Arr<number> = [1, 2, 3];
arr01.forEach((item, index) => {
    console.log(item, index);
    item.toFixed(1);
});
arr01.forEach((item) => {
    console.log(item);
    return '3';
});

const arr02: Arr<string> = ['1', '2', '3'];
arr02.forEach((item) => {
    console.log(item);
    item.charAt(3);
});
arr02.forEach((item) => {
    console.log(item);
    return '3';
});

// map test
const arr03 = arr01.map((v) => v + 1); // [2, 3, 4] number[]
const arr04 = arr01.map((v) => v.toString()); // ['1', '2', '3'] string[]
const arr05 = arr01.map((v) => v % 2 === 0); // [false, true, false] boolean[]
const arr06 = arr02.map((v) => +v); // [1, 2, 3] number[]

// filter test
// v is number, v is string 와 같이 선언한 이유는 커스텀 타입 가드여야 하기 때문!
const arr07 = arr01.filter((v): v is number => v % 2 === 0); // [2] number[]
const arr08: Arr<number | string> = [1, '2', 3, '4', 5];
const arr09 = arr08.filter((v): v is string => typeof v === 'string'); // ['2', '4'] string[]
const arr10 = arr08.filter((v): v is number => typeof v === 'number'); // [1, 3, 5] number[]
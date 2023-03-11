// flat 타입 분석
const originalArr1 = [1, 2, 3, [1, 2], [[1], [2]]].flat(); // [1, 2, 3, 1, 2, [1], [2]];
const originalArr2 = [1, 2, 3, [1, 2]].flat(); // [1, 2, 3, 1, 2];
const originalArr3 = [1, 2, 3, [1, 2], [[1], [2]]].flat(2); // [1, 2, 3, 1, 2, 1, 2];

type User = {
    name: string,
    age: number;
}
type UserType = User[1 extends number ? 'age' : 'name'];

// 타입스크립트에서는 아래 처럼 값의 빼기 연산이 안된다.
// flat 타입 내부에서는 depth 하나 빼기 연산을 [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth] 와 같이 했다.
// 하지만 이것도 depth가 20 이상일 때는 커버가 불가능하지만 솔직히 그렇게 데이터 구조 짜는 것도 신기방기하긴 하다.
// type C = 3 - 1;

// originalArr3 분석
// FlatArray<(number[] | number[][] | number[][][]), 2>[]
// FlatArray<(number | number[] | number[][]), 1>[]
// FlatArray<(number | number[]), 0>[] -> 사실 정확히는 FlatArray<(number | number | number[]), 0>[] 인데 number | number 부분은 어차피 같은 number이다.
// FlatArray<number, -1>[]
// number[]

// flat<A, D extends number = 1>(
//     this: A,
//     depth?: D
// ): FlatArray<A, D>[]

// type FlatArray<Arr, Depth extends number> = {
//     "done": Arr,
//     "recur": Arr extends ReadonlyArray<infer InnerArr>
//         ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
//         : Arr
// }[Depth extends -1 ? "done" : "recur"];
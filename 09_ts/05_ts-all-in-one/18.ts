// Promise, Awaited 타입 분석

const p1 = Promise.resolve(1).then((a) => a + 1).then((a) => a + 1).then((a) => a.toString()); // Promise<number>, Promise<number>, Promise<number>, Promise<string>
const p2 = Promise.resolve(2); // Promise<number>
const p3 = new Promise((res, rej) => {
    setTimeout(res, 1000);
}); // Promise<unknown>

// result 부분에 커서를 올리면 타입이 자동으로 잘 추론된다.
Promise.all([p1, p2, p3]).then((result) => {
    // { '0': string,  '1':  number, '2': unknown, length: 3 } -> ts에서 요런꼴은 배열이다.
    console.log(result); // ['3', 2, undefined]
});

// Awaited는 Promise로 중첩된 타입을 하나하나 풀어주는 역할을 한다.
type Result = Awaited<Promise<Promise<Promise<number>>>>; // number

// all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;

// Promise라고 안 쓰고 { then(onfulfilled: infer F, ...args: infer _): any } 형태로 쓴 이유는
// 타입스크립트는 Promise에도 then이 있고 객체에도 then이 있을 수 있는데 이 둘을 같은걸로 쳐준다.
// 이거를 흔히 'Duck Typing'이라고 한다.
type Result2 = Awaited<{ then(onfulfilled: (v: number) => number): any }>; // Awaited의 제네릭으로 들어가있는 객체를 'thenable한 객체'라고 한다.

// type Awaited<T> =
//     T extends null | undefined ? T : // special case for `null | undefined` when not in `--strictNullChecks` mode
//         T extends object & { then(onfulfilled: infer F, ...args: infer _): any } ? // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
//             F extends ((value: infer V, ...args: infer _) => any) ? // if the argument to `then` is callable, extracts the first argument
//                 Awaited<V> : // recursively unwrap the value
//                 never : // the argument to `then` was not callable
//         T; // non-object or non-thenable

// T = [p1, p2, p3] = { '0': p1, '1': p2, '2': p3 , length: 3 }
// keyof T = '0' | '1' | '2' | 'length'
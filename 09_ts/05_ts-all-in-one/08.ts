// 옵셔널
function abc(a: number, b?: number, c: number?) {}
abc(1);
abc(1, 2);
abc(1, 2, 3);

let obj: { a: string, b?: string }  = { a: 'hello', b: 'world' };
obj = { a: 'hello' };
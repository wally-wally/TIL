// 기본값 타이핑
// default parameter로 자동으로 타입 추론을 해준다.
const abcd = (b = 3, c = 5) => {}

const abcde = (b: { children: string } = { children: 'wally' }) => {}

const addFn2 = <T = unknown>(x: T, y: T) => ({ x, y });
const addFn3 = <T extends unknown>(x: T, y: T) => ({ x, y });
const result3 = addFn3(1, 2);
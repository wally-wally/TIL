// (12) range 함수 구현
// 전개 연산자를 사용하면 ramda라는 외부 패키지가 제공하는 R.range와 같은 함수를 쉽게 만들 수 있다.

export const range = (from: number, to: number): number[] =>
  from < to ? [from, ...range(from + 1, to)] : []
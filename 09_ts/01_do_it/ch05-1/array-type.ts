// (2) Array 타입
// TS 에서 배열의 타입은 '아이템 타입[]'와 같이 나타낸다.
// 예를 들어 아이템이 number 타입이면 타입은 number[]가 된다.
let numArr: number[] = [1, 2, 3]
let strArr: string[] = ['a', 'b', 'c']

type IPerson = {
  name: string,
  age?: number
}
let personArr: IPerson[] = [
  {
    name: 'wally',
    age: 27
  },
  {
    name: 'Hong'
  }
]
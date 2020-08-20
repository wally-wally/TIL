import { arrayLength, isEmpty } from './arrayLength'

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

console.log(arrayLength(numArr)) // 3
console.log(arrayLength(strArr)) // 3
console.log(arrayLength(personArr)) // 2
console.log(isEmpty([])) // true
console.log(isEmpty([23])) // false
console.log(isEmpty(numArr)) // false
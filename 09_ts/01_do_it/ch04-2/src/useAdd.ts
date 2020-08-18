import { NumberToNumberFunc, add } from './add'

let fn: NumberToNumberFunc = add(1)
let result = fn(2)
console.log(result) // 3
console.log(add(1)(2)) // 3
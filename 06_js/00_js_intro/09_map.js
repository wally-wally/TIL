// Array Helper Method
// 2. .map(callback())
// 배열 내의 모든 요소에 대하여 각각 주어진 함수(callback)를 호출한 결과를 모아 새로운 배열을 return
// 일정한 형식의 배열을 다른 형식으로 바꿔야 할 때 사용한다.
// map은 사본으로 return하고 원본을 유지한다.

// for
var numbers = [1, 2, 3,]
var doubleNumbers = []

for (var i = 0; i < numbers.length; i++) {
  doubleNumbers.push(numbers[i] * 2)
}
console.log(doubleNumbers) // [ 2, 4, 6 ]
console.log(numbers) // 원본 유지 ([ 1, 2, 3 ])

// map
const NUMBERS = [1, 2, 3]

// const DOUBLE_NUMBERS = NUMBERS.map(function(number) {
//   return number * 2 // 만약 return 안 쓰면 [ undefined, undefined, undefined ]와 같이 출력
// })

// refactoring 적용
const DOUBLE_NUMBERS = NUMBERS.map( number => number * 2)

console.log(DOUBLE_NUMBERS) // [ 2, 4, 6 ]
console.log(NUMBERS) // [ 1, 2, 3 ] - 원본 유지

// 2-1 map 연습
const newNumbers = [4, 9, 16,]

const roots = newNumbers.map(Math.sqrt)

console.log(roots)
console.log(newNumbers) // 원본 유지

// 2-2 map 연습
// Q. map을 사용해 images 배열 안의 Object 들의 height 들만 저장되어 있는 heights 배열 만들기
const images = [
  { height: '34px', width: '30px'},
  { height: '12px', width: '11px'},
  { height: '292px', width: '56px'},
]

// const heights = images.map( function (image) {
//   return image.height
// })

// refactoring 적용
const heights = images.map(image => image.height)
console.log(heights)

// 2-3 map 연습
// Q. map 을 사용해 trips 배열의 값들을 계산해서 속도 값을 저장하는 배열 speeds 만들기
const trips = [
  {distance: 35, time: 10},
  {distance: 90, time: 10},
  {distance: 60, time: 25},
]

// const speeds = trips.map( function (trip) {
//   return trip.distance / trip.time
// })
// console.log(speeds)

// refactoring 적용
const speeds = trips.map(trip => trip.distance / trip.time)
console.log(speeds)

// 2-4
const brands = ['Marvel', 'DC',]
const movies = ['IronMan', 'Batman',]

const comics = brands.map(function(x, i) {
  return { name: x, hero: movies[i] }
})

console.log(comics) // 아래와 같이 출력
// [
//   { name: 'Marvel', hero: 'Ironman'},
//   { name: 'DC', hero: 'Batman'},
// ]

// refactoring 적용
// const comics = brands.map( (x, i) => ({name: x, hero: movies[i]}))
// console.log(comics)
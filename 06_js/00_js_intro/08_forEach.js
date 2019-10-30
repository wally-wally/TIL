// Array Helper Method
// 1. .forEach(callback())
// 주어진 callback을 배열에 있는 각 요소에 대해 오름차순으로 한 번씩 실행
// callback 함수 : 인자로 다른 함수에 전달된 함수

// forEach가 나오기 전인 ES5
var colors = ['red', 'blue', 'green']

for (var i = 0; i < colors.length; i++) {
  console.log(colors[i])
}

// ES6에서 forEach 추가됨
const COLORS = ['red', 'blue', 'green']

COLORS.forEach(function (color) {
  console.log(color)
})

// 화살표 함수로 표현
COLORS.forEach(color => console.log(color))

// [주의] forEach는 아무것도 return 하지 않는다.(undefined)
const result = COLORS.forEach(color => console.log(color))
console.log(result) // undefined로 출력!

// 1-1 forEach 연습
function handlePosts() {
  const posts = [
    { id: 23, title: 'News'},
    { id: 52, title: 'Code City'},
    { id: 102, title: 'Python'},
  ]

  // for (let i = 0; i < posts.length; i++) {
  //   console.log(posts[i])
  //   console.log(posts[i].id)
  //   console.log(posts[i].title)
  // }

  posts.forEach(function (post) {
    console.log(post)
    console.log(post.id)
    console.log(post.title)
  })
}
handlePosts()

// 1-2 forEach 연습
// Q. images 배열 안에 있는 정보를 곱해서 넓이를 구하여 areas 라는 배열에 저장하시오.
const images = [
  { height: 10, width: 30},
  { height: 20, width: 90},
  { height: 54, width: 32},
]

const areas = [] // 배열 생성시 new Array보다 []로 쓰자
images.forEach(function (image) {
  areas.push(image.height * image.width)
})
console.log(areas) // [ 300, 1800, 1728 ] 출력
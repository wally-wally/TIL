// [1]object
const me = {
  name: 'ssafy', // key가 한 단어일 때는 그냥 변수인 것 처럼 쓸 수 있음
  'phone number': '01012345678', // key가 여러 단어 일 때 ''를 사용하여 씀
  appleProducts: {
    ipad: '2018pro',
    iphone: '7',
    macbook: '2019pro',
  }
}

// Object 접근하기
console.log(me.name) // 'ssafy' 출력
console.log(me['name']) // 위와 같은 출력
console.log(me['phone number']) // key가 여러 단어일 때는 반드시 []를 사용하여 접근

console.log(me.appleProducts) // { ipad: '2018pro', iphone: '7', macbook: '2019pro' }
console.log(me.appleProducts.ipad) // 2018pro

// Object Literal(객체 표현법)
var books = ['Learning JS', 'Eloquent JS']

var comics = {
  'DC': ['Joker', 'Aquaman'],
  'Marvel': ['Captain Marvel', 'Avengers'],
}

var magazines = null

// 1. ES5일 때
var bookShop = {
  books: books,
  comics: comics,
  magazines: magazines,
}

console.log(bookShop)
console.log(typeof bookShop) // object로 출력
console.log(bookShop.books[0]) // 'Learning JS'로 출력

// 2. ES6+ 이후부터
// object의 key와 value 가 같다면, 마치 배열처럼 한 번만 작성 가능
let bookShop2 = {
  books,
  comics,
  magazines,
}

console.log(bookShop2) // bookShop object 생성될 때와 같은 출력


//////////////////////////////////////////


// [2]JSON(Javascript Object Notation - JS 객체 표기법)
const jsonData = JSON.stringify({ // stringify : JSON -> String
  coffee: 'Americano',
  iceCream: 'Mint Choco',
})

console.log(jsonData) // '{"coffee":"Americano","iceCream":"Mint Choco"}'
console.log(typeof jsonData) // string

const parseData = JSON.parse(jsonData)
console.log(parseData) // { coffee: 'Americano', iceCream: 'Mint Choco' }
console.log(typeof parseData) // object
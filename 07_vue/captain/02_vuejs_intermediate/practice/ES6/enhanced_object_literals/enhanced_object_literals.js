var dictionary = {
  words: 100,
  // ES5
  lookup: function() {
    console.log('find words')
  }
  // ES6
  lookup() {
    console.log('find words')
  }
}

// 객체의 속성명과 값 명이 동일할 때 아래와 같이 축약 가능
var figures = 10
var dictionary = {
  // figures: figures
  figures
}
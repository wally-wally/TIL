function Person(name, age) {
  this.name = name;
  this.age = age;
}

var capt = new Person('captain', 100);

// class는 ES2015 (ES6)에서 나온 문법이다.
// 위의 코드와 아래 코드는 동일하다.(syntactic sugar)
class Person {
  // 클래스 로직
  constructor(name, age) {
    console.log('생성!');
    this.name = name;
    this.age = age;
  }
}

var wally = new Person('wally', 27); // '생성!'
console.log(wally);
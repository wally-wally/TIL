// 프로토타입 체인
let objA = {
  name: 'wally-wally',
  sayHi: function() {
    console.log(`Hi, ${this.name}!`);
  }
};

let objB = {
  name: 'sim-sim'
};

objB.__proto__ = objA;
let objC = {};
objC.__proto__ = objB;
objC.sayHi(); // Hi, sim-sim!


// new 연산자 동작 방식
function Circle(center, radius) {
  this.center = center;
  this.radius = radius;
}
Circle.prototype.area = function() {
  return Number((Math.PI * (this.radius ** 2)).toFixed(3));
}

let c1 = new Circle({x: 1, y: 1}, 3.0);


// 프로토타입 객체의 프로퍼티
function Func() {};
console.log(Func.prototype.constructor); // ƒ Func() {}

obj = new Func();
console.log(obj.constructor); // ƒ Func() {}

console.log(Func.prototype.__proto__);


// 프로토타입 객체의 교체 및 constructor 프로퍼티
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}
Rectangle.prototype = {
  constructor: Rectangle, // 생성자를 constructor로 대입
  area: function() {
    return this.width * this.height;
  }
}
let rect = new Rectangle(5, 10);
console.log(rect.constructor); // Function Rectangle
console.log(rect instanceof Rectangle); // true


// 프로토타입 확인
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = function() {
    return this.width * this.height;
  }
}

let rect1 = new Rectangle(2, 4);
console.log(rect1 instanceof Rectangle); // true
console.log(rect1 instanceof Object); // true
console.log(rect1 instanceof Date); // false

console.log(Rectangle.prototype.isPrototypeOf(rect1)); // true
console.log(Object.prototype.isPrototypeOf(rect1)); // true
console.log(Date.prototype.isPrototypeOf(rect1)); // false


// Object.create로 객체 생성
const product1 = {
  category: 'Clothes',
  name: 'Item A',
  description: function() {
    console.log(`This is ${this.name}(${this.category}).`);
  }
};
const product2 = Object.create(product1);

product2.category = 'Food';
product2.name = 'Item B';
product2.description(); // This is Item B(Food).

const product3 = Object.create(Object.prototype);
const product4 = Object.create(null);
product3.name = 'Item C';
product4.name = 'Item D';
console.log(product3); // __proto__가 없음
console.log(product4); // __proto__가 있음
console.log(product3.valueOf()); // {name: "Item C"}
console.log(product4.valueOf()); // Error
// 객체 생성하는 방법 세 가지
let card1 = {
  suit: '하트',
  rank: 'A'
};

console.log(card1);

function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
}

let card2 = new Card('하트', 'B');

console.log(card2);

let card3 = Object.create(Object.prototype, {
  suit: {
    value: '하트',
    writable: true,
    enumerable: true,
    configurable: true
  },
  rank: {
    value: 'C',
    writable: true,
    enumerable: true,
    configurable: true
  }
});

console.log(card3);


// 생성자 안에서 메서드를 정의하는 방식의 문제점
function Circle(center, radius) {
  this.center = center;
  this.radius = radius;
  this.area = function() {
    return Number((Math.PI * (this.radius ** 2)).toFixed(3));
  }
}

let circle1 = new Circle({x: 0, y: 0}, 2.0);
let circle2 = new Circle({x: 1, y: 2}, 3.0);
let circle3 = new Circle({x: 2, y: 0}, 4.0);

console.log(circle1.center);
console.log(circle2.radius);
console.log(circle3.area());


// 프로토타입
function Func() {};
console.log(Func.prototype); // {constructor: ƒ}.

Func.prototype.prop = 'prototype value';
let obj = new Func();
console.log(obj.prop); // prototype value

obj.prop = 'new prototype value';
console.log(obj.prop); // new prototype value
console.log(Func.prototype.prop); // prototype value
console.log('=====prototype 비교=====');
console.log(obj); // Func 안의 prop과 __proto__ 안의 prop 값 확인
console.log(Func.prototype); // 객체 안에 있는 prop 값 확인


// 프로토타입 객체를 적용한 Circle 함수
function Circle2(center, radius) {
  this.center = center;
  this.radius = radius;
}
// Circle2 생성자의 prototype 프로퍼티에 area 메서드를 추가
Circle2.prototype.area = function() {
  return Number((Math.PI * (this.radius ** 2)).toFixed(3));
}
let c1 = new Circle2({x: 0, y: 0}, 2.0);
let c2 = new Circle2({x: 1, y: 2}, 3.0);
let c3 = new Circle2({x: 2, y: 0}, 4.0);
// 위와 동일한 결과 확인
console.log(c1.center);
console.log(c2.radius);
console.log(c3.area());
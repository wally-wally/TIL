# Chapter1. this라나 뭐라나

<br>

## 1. 호출부

- 호출부는 현재 실행 중인 함수의 ‘직전’의 호출 코드 ‘내부’에 있다.

<br>

## 2. 단지 규칙일 뿐

> `this`의 바인딩의 케이스 4가지를 살펴보자.

### (1) 기본 바인딩

- (2) 단락부터 살펴볼 규칙들에 따르지 않으면 기본적으로 <b><u>전역 객체</u></b>를 가리킨다.
  - browser: `window` 객체
  - node.js: `global` 객체

```javascript
function foo() {
  // 이 때 this는 전역 객체가 된다.
  console.log(this.a);
}

var a = 2;
foo(); // 2
```

- 참고로 엄격 모드(strict mode)에서는 전역 객체가 기본 바인딩 대상에서 제외되므로 이 때 `this`는 `undefined`가 된다.

```javascript
function foo() {
  "use strict";
  // 이 때 this는 undefined가 된다.
  console.log(this.a);
}

var a = 2;
foo(); // Uncaught TypeError: Cannot read properties of undefined (reading 'a')
```

- [참고 자료] 자바스크립트의 엄격 모드
  - (자료 1) - [(바로 이동)](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/strict-mode.md)
  - (자료 2) - [(바로 이동)](https://beomy.tistory.com/13)
  - (자료 3) - [(바로 이동)](https://m.blog.naver.com/on21life/221654555798)

<br>

### (2) 암시적 바인딩

- 호출부에 콘텍스트 객체가 있는지, 즉 객체의 소유/포함 여부를 확인하는 것이다.

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo,
}

obj.foo(); // 2
```

- 위 코드에서는 `obj` 콘텍스트로 `foo()`를 참조하므로 `obj` 객체는 함수 호출 시점에 함수의 레퍼런스를 ‘소유’하거나 ‘포함’한다고 볼 수 있다.

```javascript
function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 42,
  foo,
}

var obj1 = {
  a: 2,
  obj2,
}

obj1.obj2.foo(); // 42
```

- 위 코드와 같이 객체 프로퍼티 참조나 체이닝된 형태라면 최상위/최하위 수준의 정보만 호출부와 연관된다.

<br>

#### :pushpin: 암시적 소실

- 아래 코드에서 `bar`는 `obj`의 `foo` 를 참조하는 변수처럼 보이지만 실은 `foo`를 직접 가리키는 또 다른 레퍼런스다.
  - 게다가 호출부에서 그냥 평범하게 `bar()`를 호출하므로 기본 바인딩이 적용된다.

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo,
}

var bar = obj.foo;

var a = 'global';

bar(); // 'global'
```

- 또한 아래 코드처럼 콜백함수로 전달하는 경우에도 인자로 전달하는 건 일종의 암시적인 할당이다.
  - 따라서 함수를 인자로 넘기면 암시적으로 레퍼런스가 할당되어 이전 예제와 결과가 같다.

```javascript
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  // 'fn'은 'foo'의 또 다른 레퍼런스일 뿐이다.
  fn(); // 호출부
}

var obj = {
  a: 2,
  foo,
}

var a = 'global';

doFoo(obj.foo); // 'global'
```

<br>

### (3) 명시적 바인딩

- `call`, `apply`, `bind`를 통해 명시적으로 `this`를 바인딩시킬 수 있다.

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
}

foo.call(obj); // 2
```

- `foo.call()` 에서 명시적으로 바인딩하여 함수를 호출하므로 `this`는 반드시 `obj`가 된다.
- 만약 객체 대신 단순 원시 값으로 인자를 전달하면 원시 값에 대응되는 객체 (ex. `new String()`, `new Boolean()`, `new Number()` )로 래핑된다. ⇒ ‘박싱’
- `call`과 `apply`는 `this` 의 명시적 바인딩이라는 기능으로 동일하고 추가 인자를 받아 처리할 때만 다르다.
  - `foo.call(obj, 'param1', 'param2', ...);`
  - `foo.apply(obj, ['param1', 'param2', ...]);`
- 그리고 ‘하드 바인딩’ 단락에서 좀 더 자세히 살펴볼 예정이지만 `bind` 는 새롭게 바인딩된 함수 자체를 return 해주며 실제로 함수 실행하는 동작은 따로 선언해야 한다.

```javascript
function a(x, y, z) {
  console.log(this, x, y, z);
}

var b = {
  x: 'eee'
}

var c = a.bind(b);
c(1, 2, 3); // {x: 'eee'} 1 2 3

var d = a.bind(b, 1, 2);
d(3); // {x: 'eee'} 1 2 3
d(); // {x: 'eee'} 1 2 undefined
```

<br>

#### :pushpin: `Function.prototype.apply`의 인수 개수 제한 - [MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#apply_%EC%99%80_%EB%82%B4%EC%9E%A5%ED%95%A8%EC%88%98_%EC%82%AC%EC%9A%A9)

- `apply`를 이용하여 `this` 바인딩시 주의해야하는 부분이 있다.
- javascript 엔진의 인수 최대 개수 제한을 초과하는 위험성이 있다는 것을 염두해야 한다.
- 엔진마다 인수의 최대 개수는 다르다.
- 이를 초과하여 인수를 주는 경우 에러를 뿜게 된다.

```javascript
function foo() {
  console.log(arguments);
}

foo.apply(null, Array(100000).fill().map((_, i) => i)); // [0, 1, 2, ..., 99999]

foo.apply(null, Array(1000000).fill().map((_, i) => i)); // Uncaught RangeError: Maximum call stack size exceeded
```

<br>

#### :pushpin: 하드 바인딩

- 아래 코드에서 함수 `bar()` 는 내부에서 `foo.call(obj)`로 `obj`를 `this`에 강제로 바인딩하도록 하드 코딩했다.
  - 이렇기 때문에 `bar`를 어떻게 호출하든 이 함수는 항상 `obj`를 바인딩하여 `foo`를 실행한다.

```javascript
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
}

var bar = function() {
  foo.call(obj);
}

bar(); // 2
setTimeout(bar, 100); // 2

// 하드 바인딩된 'bar'에서 재정의된 'this'는 의미 없다.
bar.call(window); // 2
```

- 하드 바인딩으로 함수를 감싸는 형태의 코드는 다음과 같이 인자를 넘기고 반환 값을 돌려받는 창구가 필요할 때 주로 쓰인다.

```javascript
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2,
}

var bar = function() {
  return foo.apply(obj, arguments);
}

var b = bar(3); // 2 3
console.log(b); // 5
```

- 또한 하드 바인딩은 매우 자주 쓰는 패턴이여서 ES5 내장 유틸리티 [Function.prototype.bind](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 에서도 하드 바인딩 기법으로 구현되어 있다.

```javascript
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2,
}

var bar = foo.bind(obj);

var b = bar(3); // 2 3
console.log(b); // 5
```

<br>

#### :pushpin: 콜백함수에서 `this`

- 기본적으로는`this` 가 가리키는 것이 함수 내부에서와 동일하다. ⇒ 전역 객체
- 하지만 제어권을 가진 함수가 콜백의 `this`를 명시한 경우 그에 따른다.
- 개발자가 `this`를 바인딩한 채로 콜백을 넘기면 그에 따른다.

```javascript
var callback = function() {
  console.dir(this); // window
}

var obj = {
  a: 1,
  b: function(cb) {
    cb();
  }
}

obj.b(callback);
```

```javascript
var callback = function() {
  console.dir(this); // obj 객체
}

var obj = {
  a: 1,
  b: function(cb) {
    cb.call(this); // 이 때 this는 obj이다.
  }
}

obj.b(callback);
```

```javascript
function foo(el) {
  console.log(el, this.id);
}

var obj = {
  id: 'good',
}

var arr = [1, 2, 3];

// 만약 제어권을 넘겨 받은 함수가 아래와 같이 this를 바인딩하면 이 때 this는 obj 객체 그 자체가 된다.
arr.forEach(foo, obj); // 1 'good' 2 'good' 3 'good'
arr.forEach(foo.bind(obj)); // 1 'good' 2 'good' 3 'good'
```

<br>

### (4) `new` 바인딩

- 일반적인 클래스 지향 언어에서의 `new`와 자바스크립트에서의 `new`는 다르다.
  - 자바스크립트의 생성자는 앞에 `new` 연산자가 있을 때 호출되는 일반 함수와 불과하다.
  - 클래스에 붙은 것도 아니고 클래스 인스턴스화 기능도 없다.
  - 심지어 특별한 형태의 함수도 아니다.
  - 단지 `new`를 이용하여 호출할 때 자동으로 붙들려 실행되는 **그저 평범한 함수**다.
  - 생성자 함수가 아니라 ‘**함수를 생성하는 호출**’이라고 하는 것이 맞다.
- `new` 연산자 사용시 생성자 함수로 호출한 인스턴스를 가리킨다.

```javascript
function Person(n, a) {
  this.name = n;
  this.age = a;
}

var wally = new Person('월리월리', 29);
console.log(wally);
```

- [참고 자료] `new`의 동작방식 [(바로 이동)](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/new.md)
- [참고 자료] `.prototype` vs `[[prototype]]` [(바로 이동)](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/prototype.md)

<br>

## 3. 모든 건 순서가 있는 법

> `this`를 확정짓는 규칙을 우선순위에 따라 차례대로 정리해보자.

### (1) `new` 바인딩

- 생성자 함수로 호출한 인스턴스를 가리킨다.

<br>

### (2) 명시적 바인딩

- `call`, `apply`, `bind`로 명시적으로 지정된 객체를 가리킨다.

<br>

### (3) 암시적 바인딩

- 메소드 호출시 메소드 호출 주체를 가리킨다.

```javascript
var a = {
  b: {
    c: function() {
      console.log(this); // a.b 객체
    }
  }
}

a.b.c();
```

<br>

### (4) 그 외의 경우

- (1) ~ (3) 중 하나라도 해당되지 않으면 비엄격 모드일 때는 전역 객체를, 엄격 모드일 때는 `undefined`를 가리킨다.

<br>

#### :pushpin: curry

- 책을 보다보면 ‘커링(currying)’이라는 용어가 나오는데 다음 절에서 더 자세히 살펴보겠지만 먼저 궁금하다면 아래 내용을 참고해보자.
  - `curry`는 함수를 값으로 다루면서 받은 함수를 내가 원하는 시점에 평가되도록 할 수 있다.
  - 함수를 받아 함수를 리턴하고 인자를 받아 인자가 원하는 개수만큼의 인자가 들어왔을 때 받아두었던 함수를 나중에 평가시키는 함수이다.
- [참고 자료] curry에 대해서 개인적으로 정리한 자료 [(바로 이동)](https://github.com/wally-wally/TIL/blob/master/06_js/09_functional_js/04_go_pipe_curry/04.md#3-curry)

<br>

## 4. 바인딩 예외

### (1) `this` 무시

- `call`, `apply`, `bind` 메서드에 첫 번째 인자로 `null` 또는 `undefined`를 넘기면`this` 바인딩이 무시되고 기본 바인딩 규칙이 적용된다.

```javascript
var obj = {
  a: 1,
  b: function() {
    return this.a;
  }
}

var a = 10;

console.log(obj.b()); // 1
console.log(obj.b.apply(null)); // 10
console.log(obj.b.apply(undefined)); // 10
```

- `apply`, `bind` 모두 반드시 첫 번째 인자로 `this` 바인딩을 지정해야 한다.
  - 하지만 `this`가 로직상 아무래도 좋다면 일종의 자리 끼움 값으로 `null` 정도의 값을 전달하는 편이 합리적이다.
- 하지만 이런 방식은 약간의 리스크가 있다.
  - 어떤 함수 호출시 `null` 값을 전달했는데 마침 그 함수가 내부적으로 `this`를 레퍼런스로 참조한다면 기본 바인딩이 적용되어 예상치 못한 일이 발생할 수 있다.
- 그래서 이러한 문제를 해결하기 위해 내용이 하나도 없으면서 전혀 위임되지 않은 객체 같은 것을 만들어서 해결할 수 있다. (⇒ 책에서는 `DMZ 객체` 라고 표현함)
  - 이 객체를 사용하면 받는 쪽에서 `this`를 어찌 사용하든지 어차피 대상은 빈 객체로 한정되므로 최소한 전역 객체를 건드리는 부작용은 방지할 수 있다.

```javascript
const arr = [1, 2, 3];

// {} 와는 달리 Object.prototype으로 위임하지 않아 {} 보다 '더 텅 빈' 객체라고 볼 수 있다.
const emptyObj = Object.create(null);

console.log(Math.max.apply(null, arr)); // 3
console.log(Math.max.apply(emptyObj , arr)); // 3

// ES6 이후 등장한 전개 연산자를 사용하자.
console.log(Math.max(...arr)); // 3
```

```javascript
const obj1 = {};
const obj2 = new Object();
const obj3 = Object.create(null);
const obj4 = Object.create(Object.prototype);

console.log(obj1.constructor === Object); // true
console.log(obj2.constructor === Object); // true
console.log(obj3.constructor === Object); // false
console.log(obj4.constructor === Object); // true
```

<br>

### (2) 간접 레퍼런스

- 아래 코드에서 `p.foo = o.foo` 의 결괏값은 원 함수 객체의 레퍼런스이므로 실제로 호출부는 `p.foo()`, `o.foo()` 가 아닌 `foo()` 이다.
  - 그래서 이 경우에는 기본 바인딩 규칙이 적용된다.

```javascript
function foo() {
  console.log(this.a);
}

var a = 2;

var o = {
  a: 3,
  foo,
};

var p = {
  a: 4,
};

o.foo(); // 3
(p.foo = o.foo)(); // 2
```

<br>

### (3) 소프트 바인딩

- 하드 바인딩(`Function.prototype.bind()`)은 함수의 유연성을 크게 떨어뜨리기 때문에 `this`를 암시적 바인딩 하거나 나중에 다시 명시적 바인딩 하는 식으로 수동으로 오버라이드하는 것이 불가능하다.
  - 그래서 사람들은 이른 바 소프트 바인딩이라는 유틸리티를 고안했다.
- (참고) 소프트 바인딩 코드

```javascript
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    var fn = this;
    // 커링된 인자는 죄다 포착한다.
    var curried = [].slice.call(arguments, 1);
    var bound = function() {
      return fn.apply((!this || this === (window || global)) ? obj: this, curried.concat.apply(curried, arguments));
    };
    bound.prototype = Object.create(fn.prototype);
    return bound;
  }
}
```

<br>

## 5. 어휘적 `this` (화살표 함수)

```javascript
function foo() {
  return (a) => {
    // 여기서 'this'는 어휘적으로 'foo()'에서 상속된다.
    console.log(this.a);
  };
}

var obj1 = {
  a: 2,
};

var obj2 = {
  a: 3,
};

var bar = foo.call(obj1);
bar.call(obj2); // 2
```

```javascript
var a = 0;
var obj = {
  a: 1,
  b: function() {
    var c = () => {
      return this.a;
    }

    c();
  }
};

obj.b(); // 1
```

- 화살표 함수는 표준 바인딩 규칙을 무시하고 렉시컬 스코프로 `this`를 바인딩 한다.
  - 즉, 에두른 함수 호출로부터 어떤 값이든 `this` 바인딩을 상속한다.
  - 이는 ES6 이전 시절 `self = this;` 구문을 대체한 장치다.
- 일반 함수는 함수를 선언할 때 `this`에 바인딩할 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.
- 화살표 함수는 함수를 선언할 때 `this`에 바인딩할 객체가 정적으로 결정된다.
  - 동적으로 결정되는 일반 함수와는 달리 <b>화살표 함수의 this는 언제나 상위 스코프의 this를 가리킨다.</b> 이를 <b>Lexical this</b>라 한다.
- `this` 스타일의 코드를 작성해야 할 경우 어휘적 `self = this;`든 화살표 함수 꼼수든 꼭 두 가지 중 하나만 선택하자.
- 화살표 함수만의 특징
  - this 바인딩
  - prototype 없음
  - arguments 없음
  - new 키워드로 인스턴스 생성 불가
  - non-constructor
  - super도 없음

<br>

## :question: Questions

- Javascript의 `"use strict"` 모드란 무엇입니까?
- Javascript의 `"use strict"` 모드를 쓰면 어떤 영향이 있는지 아는 대로 말해보세요.
- `call`, `apply`, `bind`에 대해서 간략히 설명해주세요.
- 다음 코드에서 console.log에는 어떤 결과가 출력될까요?

```javascript
var obj = {
  a: null,
  b: f1,
}

var f1 = function() {
  return {
    a: 1,
    y: this.a,
  }
}

var f2 = obj.b;

console.log(f2().y); // ?
```

```javascript
var obj = {
  a: null,
  b: f1,
}

function f1() {
  return {
    a: 1,
    y: this.a,
  }
}

var f2 = obj.b;

console.log(f2().y); // ?
```

```javascript
var obj = {
  a: null,
  b: f1,
}

function f1() {
  return {
    a: 1,
    y: this.a,
  }
}

console.log(obj.b().y); // ?
```

- 객체를 생성하는 방법 중 객체 리터럴과 `Object.create` 메서드 방식이 있는데 이 둘의 차이는 무엇입니까?
  - 그렇다면 `Object.create` 메서드를 사용했을 때 `Object.prototype` 을 상속 받으려면 어떻게 해야 할까요?
  - 객체 리터럴과 `Object.create` 메서드의 차이점이 `prototype` 상속 말고 다른 부분은 혹시 없을까요?
- 아래 코드에서 console.log의 출력 결과가 어떻게 될지 예측해보고 그 이유를 설명해주세요.

```javascript
var obj1 = {};
console.log(obj1.hasOwnProperty('a')); // ?

var obj2 = Object.create(null);
console.log(obj2.hasOwnProperty('a')); // ?

var obj3 = Object.create({});
console.log(obj3.hasOwnProperty('a')); // ?
```

- 화살표 함수란 무엇입니까?

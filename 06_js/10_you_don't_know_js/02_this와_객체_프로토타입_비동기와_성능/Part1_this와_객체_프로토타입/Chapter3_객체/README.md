# Chapter3. 객체

<br>

## 1. 구문 - JS에서 객체를 생성하는 방법

### (1) 리터럴 형식

- 한 번의 선언으로 다수의 키/값 쌍을 프로퍼티로 추가할 수 있다.

```javascript
var obj1 = {
  name: 'wally',
};
```

<br>

### (2) `Object` 생성자 함수 (빌트인 생성자 함수)

- 한 번에 한 프로퍼티만 추가할 수 있다.
- 반드시 `Object` 생성자 함수를 사용해 빈 객체를 생성해야 하는 것은 아니다.
- 객체를 생성하는 방법은 객체 리터럴을 사용하는 것이 더 간편하다.
- `Object` 생성자 함수를 사용해 객체를 생성하는 방식은 특별한 이유가 없다면 그다지 유용해 보이지 않는다.

```javascript
var obj2 = new Object();
obj2.name = 'wally';
```

<br>

### (3) `Object.create` 메서드

- 첫 번째 인자로 연결할 프로토타입을 쓸 수 있는데 `null`로 넘기면 일반적인 객체와 달리 `Object.prototype`을 상속받지 않는다.

```javascript
var obj3 = Object.create(null);
obj3.name = 'wally';
```

<br>

### (4) 생성자 함수 방식

- 생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.
- 객체 리터럴 방식으로 생성된 객체는 같은 형태의 객체를 재생성할 수 없으나 생성자 함수 방식으로 객체를 생성하면, 생성자 함수를 호출할 때 다른 인자를 넘김으로써 같은 형태의 서로 다른 객체를 생성할 수 있다.
- 또한 객체 리터럴 방식으로 생성된 객체는 `Object.prototype`을 프로토타입 객체(`__proto__`)로  생성자 함수 방식으로 생성된 객체는 자신을 생성한 생성자 함수 자체를 프로토타입 객체로 설정한다.
  - 객체 리터럴 방식에서는 객체 생성자 함수는 `Object()`이며, 생성자 함수 방식의 경우는 생성자 함수 자체이다.

```javascript
function Person(name) {
	this.name = name;
}

var obj4 = new Person('wally');
```

<br>

### :heavy_plus_sign: 내부 메서드 `[[Call]]`과 `[[Construct]]`

- 함수는 객체이지만 일반 객체와는 다르다. 일반 객체는 호출할 수 없지만 **함수는 호출할 수 있다.**
- 따라서 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드는 물론, 함수로서 동작하기 위해 함수 객체만을 위한 `[[Environment]]` , `[[FormalParameters]]` 등의 내부 슬롯과 `[[Call]]` , `[[Construct]]` 같은 내부 메서드를 추가로 가지고 있다.
- 함수가 <b><u>일반 함수로서 호출</u></b>되면 함수 객체의 내부 메서드 <b><u>`[[Call]]` 이 호출</u></b>되고 `new` 연산자와 함께 <b><u>생성자 함수로서 호출</u></b>되면 내부 메서드 <b><u>`[[Construct]]` 가 호출</u></b>된다.

```javascript
// 함수는 객체다.
function foo() {}

// 일반적인 함수로서 호출: [[Call]]이 호출
foo();

// 생성자 함수로서 호출: [[Construct]]가 호출
new foo();
```

- 내부 메서드 `[[Call]]` 을 갖는 함수 객체를 <u>callable</u>이라 하며 내부 메서드 `[[Construct]]` 를 갖는 함수 객체를 <u>constructor</u>, `[[Construct]]` 를 갖지 않는 함수 객체를 <u>non-constructor</u>라고 부른다. (함수는 호출할 수 있는 것이 당연하므로 <u>모든 함수 객체는 callable</u>이다.)
  - constructor: 일반 함수 또는 생성자 함수로서 호출할 수 있는 객체로 함수 선언문, 함수 표현식, 클래스(참고로 클래스도 함수임)가 해당된다.
  - non-constructor: 일반 함수로서만 호출할 수 있는 객체로 메서드(ES6 메서드 축약 표현), 화살표 함수가 해당된다.

```javascript
function foo() {}

foo(); // 에러 없음
new foo(); // 에러 없음
```

```javascript
const obj = {
  a() {}
};

obj.a(); // 에러 없음
new obj.a(); // Uncaught TypeError: obj.a is not a constructor
```

```javascript
const bar = () => {};

bar(); // 에러 없음
new bar(); // Uncaught TypeError: bar is not a constructor
```

- [참고 자료]  프로그래밍 용어 - ‘Formal Parameter’, ‘Actual Parameter’ [(바로 이동)](https://yunmap.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%96%B8%EC%96%B4-Formal-parameter-Actual-parameter-%EA%B7%B8%EB%A6%AC%EA%B3%A0-parameter-passing)

<br>

## 2. 타입

> 원시 타입: `number`, `string`, `boolean`, `null`, `undefined`, `symbol`
>
> 객체 타입(참조 타입): 위 6가지 원시 타입에 해당하지 않는 나머지

### (1) "자바스크립트 함수는 일급 객체입니다."

- 용어 정의

| 용어 | 의미                                                         |
| ---- | ------------------------------------------------------------ |
| 평가 | <ul><li>코드가 계산(evalutaion)되어 값을 만드는 것</li></ul> |
| 일급 | <ul><li> 값으로 다룰 수 있다.</li><li>변수에 담을 수 있다.</li><li>함수의 인자로 사용될 수 있다.</li><li>함수의 결과로 사용될 수 있다.</li></ul> |

- 일급 함수
  - 함수를 값으로 다룰 수 있다.
  - 즉, 함수를 변수에 담아 원할 때 평가(함수 호출)하는 것을 말한다.
  - 따라서 변수의 특성인 함수 인자로 전달 가능하며 return 값으로 사용 가능하다.

```javascript
const add5 = a => a + 5;
log(add5); // a => a + 5
log(add5(5)); // 10
```

<br>

### (2) 내장 객체 (빌트인 생성자 함수)

- 자바스크립트에서는 다음과 같은 내장 객체가 존재한다.
  - `String`, `Number`, `Boolean`, `Object`, `Function`, `Array`, `Date`, `RegExp`, `Error`
- 이들은 진짜 타입처럼 보이는 데다 클래스처럼 생겼지만 단지 자바스크립트의 내장 함수일 뿐 각각 생성자로 사용되어 주어진 하위 타입의 객체를 생성한다.

``` javascript
var str1 = 'hello'; // str1은 원시 래퍼 객체가 아닌 원시 리터럴이며 불변값
console.log(typeof str1); // 'string'
console.log(str1 instanceof String); // false

var str2 = new String('hello');
console.log(typeof str2); // 'object'
console.log(str2 instanceof String); // true
```

- 여러 자바스크립트 커뮤니티에서는 되도록 생성자 형식은 지양하고 리터럴 형식을 사용하라고 적극 권장한다.

- 특정 원시 값에 대해 프로퍼티/메서드를 호출하면 자바스크립트 엔진은 원시 값을 자동으로 원시 래퍼 객체로 강제변환하여 메서드 접근이 가능하게 도와준다.

- `null`, `undefined`는 원시 래퍼 객체가 존재하지 않고, `Date` 값은 리터럴 형식이 없어 반드시 생성자 형식으로 생성해야 한다.

- `Object`, `Function`, `Array`, `RegExp`는 형식과 무관하게 모두 객체다.

  - 추가 옵션이 필요한 경우에만 생성자 형식을 이용하고 일반적으로는 리터럴 방식을 이용하자.

  ```javascript
  // 생성자 형식
  const reg1 = new RegExp(/[0-9]/, 'g');
  
  // 리터럴 형식
  const reg2 = /[0-9]/g;
  ```

- `Error`는 생성자 형식으로 생성은 되지만 거의 쓸 일이 없다. 그냥 리터럴 방식만 기억하자.
- 원시 타입과 래퍼 객체는 거의 동등한 값처럼 다뤄져서 아래와 같은 결과가 나온다.

```javascript
var n = 1;
var N = new Number(1);

console.log(n == N); // true
console.log(n === N); // false
console.log(n === N.valueOf()); // true
```

- [참고 자료] `Object.prototype.valueOf()` [(바로 이동)](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
- [참고 자료] 원시 데이터 타입과 래퍼 객체 [(바로 이동)](https://medium.com/@yms0214/%EC%9B%90%EC%8B%9C%EB%8D%B0%EC%9D%B4%ED%84%B0%ED%83%80%EC%9E%85-primitive-type-%EA%B3%BC-%EB%9E%98%ED%8D%BC%EA%B0%9D%EC%B2%B4-wrapper-object-d8cda814022d)
- [참고 자료] 래퍼 객체 [(바로 이동)](https://includestdio.tistory.com/26)
- [참고 자료] effective typescript - Item10. 객체 래퍼 타입 피하기 [(바로 이동)](https://github.com/wally-wally/TIL/blob/master/09_ts/04_effective_typescript/Item06-10.md#item10-%EA%B0%9D%EC%B2%B4-%EB%9E%98%ED%8D%BC-%ED%83%80%EC%9E%85-%ED%94%BC%ED%95%98%EA%B8%B0)

<br>

## 3. 내용

### (1) 프로퍼티 키

- 프로퍼티 키는 프로퍼티 값에 접근할 수 있는 이름으로서 **식별자 역할**을 한다.

- 심벌 값도 프로퍼티 키로 사용할 수 있지만 일반적으로 문자열을 사용한다.

  - 이때 프로퍼티 키는 문자열이므로 따옴표로 묶어야 한다.
  - 하지만 식별자 네이밍 규칙을 준수하는 이름, 즉 자바스크립트에서 사용 가능한 유효한 이름인 경우 따옴표를 생략할 수 있다.
  - 반대로 말하면 식별자 네이밍 규칙을 따르지 않는 이름에는 반드시 따옴표를 사용해야 한다.

- 식별자 네이밍 규칙을 따르지 않는 프로퍼티 키를 사용한 경우

  ```javascript
  const person = {
    firstName: 'Ung-mo', // 식별자 네이밍 규칙 준수함
    'last-name': 'Lee', // 식별자 네이밍 규칙 준수하지 않음
  };
  
  console.log(person); // {firstName: 'Ung-mo', last-name: 'Lee'}
  ```

  - 위 코드에서 `firstName` 프로퍼티 키는 식별자 네이밍 규칙을 준수하므로 따옴표를 작성하지 않아도 되지만, `last-name`은 준수하지 않았기 때문에 반드시 따옴표를 작성해야 한다.
  - 자바스크립트 엔진은 따옴표를 생략한 `last-name`을 `` 연산자가 있는 표현식으로 해석한다.

  ```javascript
  const person = {
    firstName: 'Ung-mo',
    last-name: 'Lee',
  };
  
  // Uncaught SyntaxError: Unexpected token '-'
  ```

- 문자열 또는 문자열로 평가할 수 있는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수 있다.

  - 이 경우에는 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 한다.

  ```javascript
  let obj = {};
  const key = 'hello';
  
  // ES5: 프로퍼티 키 동적 생성
  obj[key] = 'world';
  
  // ES6: computed property name
  // obj = { [key]: 'world' };
  
  console.log(obj); // {hello: 'world'}
  ```

- 프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다.

  - 예를 들어, 프로퍼티 키로 숫자 리터럴을 사용하면 따옴표는 붙지 않지만 내부적으로는 문자열로 변환된다.

  ```javascript
  const obj1 = {
    0: 123,
    1: 456,
  };
  
  console.log(obj1); // {0: 123, 1: 456}
  
  console.log(obj1[0]); // 123
  console.log(obj1['0']); // 456
  console.log(obj1[true + false]); // ?
  ```

  ```javascript
  const obj2 = {
    true: 123,
    false: 456,
  };
  
  console.log(obj2); // {true: 123, false: 456}
  
  console.log(obj2[true]); // 123
  console.log(obj2['true']); // 123
  
  console.log(obj2[false]); // 456
  console.log(obj2['false']); // 456
  
  console.log(obj2[!!false]); // ?
  console.log(obj2[!!'false']); // ?
  ```

- `var`, `function`과 같은 예약어를 프로퍼티 키로 사용해도 에러가 발생하지 않으나 예상치 못한 에러가 발생할 여지가 있으므로 권장하지 않는다.

- 또한 이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티 키가 먼저 선언한 프로퍼티를 덮어쓴다.

  - 이때 에러가 발생하지 않는다는 점에 주의하자.

  ```javascript
  const obj1 = {
    name: 'mally',
    name: 'wally',
  };
  
  console.log(obj1.name); // 'wally'
  ```

<br>

### (2) 계산된 프로퍼티명(Computed Property Name)

- 문자열 또는 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있다.
  - 단, 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 하는데 이를 **계산된 프로퍼티 이름(computed property name)**이라 한다.

```javascript
// ES5
// 객체 리터럴 외부에서 대괄호 표기법을 사용해서 프로퍼티 키를 동적 생성함

var prefix = 'prop';
var index = 0;

var obj = {};

obj[prefix + '-' + ++index] = index;
obj[prefix + '-' + ++index] = index;
obj[prefix + '-' + ++index] = index;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

```javascript
// ES6
// 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성할 수 있음

const prefix = 'prop';
let index = 0;

const obj = {
  [`${prefix}-${++index}`]: index,
  [`${prefix}-${++index}`]: index,
  [`${prefix}-${++index}`]: index,
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

```javascript
// 다른 방식으로 코드 개선

const prefix = 'prop';
const indexArr = Array(3)
  .fill(undefined)
  .map((_, index) => index + 1);

const obj = indexArr.reduce((accObj, currentIndex) => {
  return {
    ...accObj,
    [`${prefix}-${currentIndex}`]: currentIndex,
  };
}, {});

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

- [참고 자료] Javascript의 Symbol 타입을 사용하는 이유 [(바로 이동)](https://another-light.tistory.com/105)

<br>

### (3) 프로퍼티 vs 메서드

```javascript
function foo() {
  console.log('foo');
}

var someFoo = foo; // 'foo'에 대한 변수 레퍼런스

var myObj = {
  someFoo: foo,
};

foo; // function foo(){ ... }

someFoo; // function foo(){ ... }

myObj.someFoo; // function foo() { ... }
```

- `someFoo`나 `myObj.someFoo` 모두 같은 함수를 가리키는 개별 레퍼런스일 뿐, 뭔가 특별한 다른 객체가 ‘소유한’ 함수라는 의미는 아니다.
  - `foo()` 안에 `this` 레퍼런스가 정의되어 있다면 `myObj.someFoo`에서 발생할 암시적 바인딩이 두 레퍼런스의 유일한 차이점이다.
- 자바스크립트에서 ‘함수’와 ‘메서드’란 말은 서로 바꿔 사용할 수 있다.

<br>

### (4) 배열

- 배열은 숫자 인덱싱으로 값을 저장한다.
- 인덱스는 양수지만 배열 자체는 객체여서 배열에 프로퍼티를 추가하는 것도 가능하다.
- `.`이나 `[]` 구문에 상관없이 이름 붙은 프로퍼티를 추가해도 배열 길이에는 변함이 없다.
- 배열에 프로퍼티를 추가할 때 프로퍼티명이 숫자와 유사하면 숫자 인덱스로 잘못 해석되어 배열 내용이 달라질 수 있으니 유의하자.

```javascript
var arr = ['a', 'b', 'c'];
console.log(arr.length); // 3
console.log(arr[0]); // 'a'

arr.baz = 'baz';
console.log(arr.length); // 3
console.log(arr.baz); // 'baz

arr['1'] = 'x';
console.log(arr); // ['a', 'x', 'c']
arr['3'] = 'y';
console.log(arr); // ['a', 'x', 'c', 'y']
console.log(arr[3]); // 'y'
```

<br>

#### :heavy_plus_sign: 유사 배열 객체(array-like object)

- 말 그대로 **배열이 아닌데 배열인 척** 하는 것을 유사 배열 객체라고 부른다.
- 유사 배열 객체가 되기 위한 조건
  - 반드시 **`length` 프로퍼티**를 갖고 있어야 한다.
  - 가급적이면 **index 번호가 0번부터 시작해서 1씩 증가**해야 한다. 만약 이를 지키지 않으면 예상치 못한 결과가 생긴다.
  - 그리고 객체에 선언한 키-값 쌍의 개수 만큼 `length` 프로퍼티의 값으로 지정해주는 것이 좋다.

```javascript
// 유사 배열 객체 예시
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

// 유사 배열 객체는 length 프로퍼티를 갖기 때문에 for 문으로 순회할 수 있다.
for (let index = 0; index < arrayLike.length; index += 1) {
  console.log(arrayLike[index]); // 1 2 3
}
```

```javascript
// index 번호가 0번부터 시작해서 1씩 증가하지 않은 경우
const arrayLike = {
  0: 1,
  2: 2,
  3: 3,
  length: 3,
};

for (let index = 0; index < arrayLike.length; index += 1) {
  console.log(arrayLike[index]); // 1 undefined 3
}

console.log(arrayLike); // {0: 1, 2: 2, 3: 3, length: 3}
console.log(Array.from(arrayLike)); // [1, undefined, 2]
```

```javascript
// length 프로퍼티가 객체에 선언한 키-값 쌍의 개수보다 적은 경우
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 1,
};

console.log(Array.from(arrayLike)); // [1]
```

- 일반적으로 유사 배열 객체는 이터러블이 아닌 일반 객체이므로 `Symbol.iterator` 메서드가 없어 `for ... of` 문으로 순회할 수 없다.

```javascript
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

for (const item of arrayLike) {
  console.log(item); // Uncaught TypeError: arrayLike is not iterable
}
```

- 단, `arguments`, `NodeList`, `HTMLCollection`은 유사 배열 객체이면서 이터러블이다.
  - 왜냐하면 이 객체에 `Symbol.iterator` 메서드를 구현되어 있기 때문이다.
  - 또한 이터러블이 된 이후에도 `length` 프로퍼티를 가지며 인덱스로 접근할 수 있는 것에는 변함이 없어 이들은 유사 배열 객체이면서 이터러블인 것이다.
- 모든 유사 배열 객체가 이터러블인 것은 아니기 때문에 이를 해결하기 위해 ES6에서 `Array.from()` 메서드가 등장했다.
  - 이는 유사 배열 객체를 진짜 배열로 변환(`Symbol.iterator` 메서드도 있음)해주는데 자세한 내용은 [MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)를 통해 살펴보자.

```javascript
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

const arr = Array.from(arrayLike);
console.log(arr); // [1, 2, 3]

for (const item of arr) {
  console.log(item); // 1 2 3
}
```

<br>

### (5) 객체 복사

```javascript
// 환형 참조(Circular Reference) 형태 예시
function anotherFunc() {
  console.log('another');
}

var anotherObj = {
  c: true,
};

var anotherArr = [];

var myObj = {
  a: 2,
  b: anotherObj, // 사본이 아닌 레퍼런스다!
  c: anotherArr, // 사본이 아닌 레퍼런스다!
  d: anotherFunc, // 사본이 아닌 레퍼런스다!
};

anotherArr.push(anotherObj, myObj);
```

<br>

#### :heavy_plus_sign: 객체의 얕은 복사(shallow copy) vs 깊은 복사(deep copy)

- <b>얕은 복사(shallow copy)</b>는 객체의 <b><u>한 단계까지만 복사</u></b>하는 것을 말하고 <b>깊은 복사(deep copy)</b>는 객체에 <b><u>중첩되어 있는 객체까지 모두 복사</u></b>하는 것을 말한다.
  - 얕은 복사와 깊은 복사로 생성된 객체는 원본과는 다른 객체다. 즉, 원본과 복사본은 참조 값이 다른 별개의 객체다.
  - 하지만 얕은 복사는 객체에 중첩되어 있는 객체의 경우 <b><u>참조 값을 복사</u></b>하고 깊은 복사는 객체에 중첩되어 있는 객체까지 <b><u>모두 복사해서 원시 값처럼 완전한 복사본을 만든다</u></b>는 차이가 있다.

##### :round_pushpin: 객체의 얕은 복사(shallow copy) 방법

- `Object.assign` 메서드 - [MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

```javascript
const obj = {
  x: 1,
  y: {
    z: 2,
  },
};

const newObj = Object.assign({}, obj);

newObj.x = 0;
newObj.y.z = 3;

console.log(obj); // {x: 1, y: {z: 3}}
console.log(newObj); // {x: 0, y: {z: 3}}
```

- 전개 연산자(Spread Operator) - [MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

```javascript
const obj = {
  x: 1,
  y: {
    z: 2,
  },
};

const newObj = { ...obj };

newObj.x = 0;
newObj.y.z = 3;

console.log(obj); // {x: 1, y: {z: 3}}
console.log(newObj); // {x: 0, y: {z: 3}}
```

<br>

##### :round_pushpin: 객체의 깊은 복사(deep copy) 방법

- `JSON` 객체 메서드 이용 - [`JSON.stringify()` 메서드 MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), [`JSON.parse()` 메서드 MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
  - 하지만 이 방법은 치명적인 단점 두 가지가 있다.
    - 다른 방법에 비해 성능이 느리다.
    - `JSON.stringify()` 메서드는 함수를 만났을 때 `undefined`로 처리한다.

```javascript
const obj = {
  x: 1,
  y: {
    z: 2,
  },
};

const newObj = JSON.parse(JSON.stringify(obj));

newObj.x = 0;
newObj.y.z = 3;

console.log(obj); // {x: 1, y: {z: 2}}
console.log(newObj); // {x: 0, y: {z: 3}}
```

```javascript
const obj = {
  x: 1,
  y: {
    z: 2,
  },
  f1: function() {
    return this.x;
  }
};

const newObj = JSON.parse(JSON.stringify(obj));

console.log(newObj); // {x: 1, y: {z: 2}}
console.log(newObj.f1); // undefined
```

- `lodash` 라이브러리의 `cloneDeep()` 메서드 - [공식 문서 (4.17.15 버전)](https://lodash.com/docs/4.17.15#cloneDeep)
  - 참고로 커스텀 재귀 함수로 구현할 수 있지만 많은 개발자들에 의해 검증되어 있고 오랫동안 쓰여온 `lodash`의 `cloneDeep()` 메서드 사용하는 것을 권장한다.

```bash
npm i lodash
```

```javascript
// tree shaking 기법을 이용해서 lodash의 메서드 중 사용할 메서드만 가져오는 방식
import cloneDeep from 'lodash/cloneDeep';

const obj = {
  x: 1,
  y: {
    z: 2,
  },
  f1: function() {
    return this.x;
  }
};

const newObj = cloneDeep(obj);

newObj.x = 0;
newObj.y.z = 3;

console.log(obj); // {x: 1, y: {z: 2}, f1: f()}
console.log(obj.f1()); // 1
console.log(newObj); // {x: 0, y: {z: 3}, f1: f()}
console.log(newObj.f1()); // 0
```

<br>

### (6) 프로퍼티 서술자

- `Object.defineProperty()` 메서드로 객체의 프로퍼티에 프로퍼티 디스크립터를 설정할 수 있다.
  - 첫 번째 인자는 참조할 객체를, 두 번째 인자는 프로퍼티 이름을 뜻하는 문자열을, 세 번째 인자는 프로퍼티 디스크립터의 참조다.
  - 실행 후에는 수정한 객체의 참조를 반환한다.
- 프로퍼티 디스크립터로 정의할 수 있는 속성(데이터 프로퍼티)

| 속성                         | 설명                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| 값 (`value`)                 | <ul><li>속성값으로 Javascript 에서 값으로 쓰일 수 있는 것은 모두 가능하고 기본값은 `undefined`이다.</li></ul> |
| 쓰기 가능 (`writable`)       | <ul><li>프로퍼티에 쓰기가 가능한지를 뜻하는 속성</li><li>이 값이` true`면 프로퍼티 값을 수정할 수 있다.</li></ul> |
| 열거 가능 (`enumerable`)     | <ul><li>프로퍼티의 for / in 문이나 `Object.keys` 등의 반복문으로 찾을 수 있는 대상인지를(열거 가능) 뜻하는 속성</li></ul> |
| 재정의 가능 (`configurable`) | <ul><li>프로퍼티의 내부 속성을 수정할 수 있는 지를 뜻하는 속성</li><li>이 값이 `true`면 `delete` 연산자로 해당 프로퍼티를 제거할 수 있으며 프로퍼티가 가진 내부 속성을 수정할 수 있다.</li></ul> |

```javascript
const obj = {};
Object.defineProperty(obj, 'id', {
  value: 1,
  writable: true,
  enumerable: false,
  configurable: true
});
Object.defineProperty(obj, 'name', {
  value: 'Macbook',
  writable: false,
  enumerable: true,
  configurable: false
});

console.log(obj); // {name: "Macbook", id: 1}
obj.name = 'Macbook2';
console.log(obj); // {name: "Macbook", id: 1}

for (const p in obj) {
  console.log(p);
}

delete obj.name;
console.log(obj.name); // Macbook
Object.defineProperty(obj, 'name', {writable: true}); // Uncaught TypeError: Cannot redefine property: name
```

- `name` 속성의 `writable` 속성(쓰기 가능)을 `false`로 정의했기 때문에 `name` 속성에 새로운 값을 할당해도 변하지 않는다.
  - 쓰기 금지된 값을 수정하려고 하면 조용히 실패하며 strict mode에서는 에러가 난다.
- 또한 `id` 속성의 `enumerable` 속성(열거 가능)을 `false`로 정의했기 때문에 for / in 문으로 `obj` 객체의 프로퍼티를 열거하면 `name` 만 출력하게 된다.
  - `enumerable: false`라고 해당 프로퍼티에 접근할 수 없는건 아니다.
  - 그리고 `enumerable: true`로 바꾸면 다시 열거할 수 있다.
- 그리고 `name` 속성의 `configurable` 속성(설정 가능)을 `false`로 정의했기 때문에 `delete` 연산자 동작은 무시되고 `writable`, `enumerable`, `configurable` 속성 값을 마음대로 바꿀 수 없다.
  - `configurable: false` 로 설정하면 돌아올 수 없는 강을 건너게 되어 절대로 복구되지 않으니 유의하자.
  - 예외) `configurable: false`인 프로퍼티라도 `writable`은 `true`에서 `false`로 예외 없이 변경되지만 반대로는 다시 돌이킬 수 없다.
- `writable`, `enumerable`, `configurable` 속성을 생략하면 기본값은 `false`가 된다.

<br>

#### :heavy_plus_sign: 자매품) `Object.defineProperties()` 메서드

- 객체가 가진 프로퍼티 여러 개에 각각의 프로퍼티 디스크립터를 설정할 수 있다.

```javascript
const newObj = Object.defineProperties({}, {
  id: {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
  },
  name: {
    value: 'Macbook',
    writable: false,
    enumerable: true,
    configurable: false
  }
});

console.log(newObj); // {name: "Macbook", id: 1}
```

<br>

#### :heavy_plus_sign: 자매품) `Object.create()` 메서드의 두 번째 인자

- `Object.create`의 두 번째 인자로 `Object.defineProperties` 메서드의 두 번째 인자와 마찬가지로 프로퍼티 디스크립터를 넘긴다.
- 아래 코드와 같이 `Object.create` 메서드를 사용하면 프로토타입, 프로퍼티 값, 프로퍼티 속성을 모두 설정한 객체를 생성할 수 있다.

```javascript
const product1 = {
  category: 'Clothes',
  name: 'Item A',
  description() {
    console.log(`This is ${this.name}(${this.category}).`);
  }
};
const product2 = Object.create(product1, {
  seller: {
    value: 'wally-wally',
    writable: false,
    enumerable: true,
    configurable: true
  },
  discountRate: {
    value: '10%',
    writable: false,
    enumerable: true,
    configurable: false
  }
})

product2.category = 'Food';
product2.name = 'Item B';
product2.description(); // This is Item B(Food).
console.log(product2.seller); // wally-wally
console.log(product2.discountRate); // 10%
```

<br>

### (7) 불변성

> 불변 객체 만드는 방법을 살펴보자.
>
> 참고로 잊지 말아야 할 부분은 아래 방법들은 <b><u>얕은 불변성</u></b>만 지원하기 때문에 객체 안에 다른 참조 타입의 값이 있는 경우 그 부분의 불변성은 보장해주지 않는다.

#### :round_pushpin: 프로퍼티 서술자 정의 방법

- `Object.defineProperty`의 프로퍼티 서술자로 `writable: false`와 `configurable: false`를 같이 쓰면 객체 프로퍼티를 상수처럼 쓸 수 있다.

```javascript
var myObj = {};
Object.defineProperty(myObj, 'num', {
  value: 10,
  writable: false,
  configurable: false,
});
```

<br>

#### :round_pushpin: 확장 금지

- `Object.preventExtensions()` 메서드는 현재 프로퍼티는 그대로 두고 추가하는 동작만 할 수 없도록 막는 기능을 한다.(즉, 할당, 삭제, 속성 변경은 모두 가능)
- 확장 금지 여부는 `Object.isExtensible()` 메서드로 알 수 있다.

```javascript
var myObj = {
  a: 2,
};

Object.preventExtensions(myObj);
myObj.b = 3;
console.log(myObj.b); // 에러는 발생하지 않으나 해당 프로퍼티가 없으므로 undefined가 출력된다.(단, strict mode에서는 TypeError)
```

<br>

#### :round_pushpin: 봉인

- `Object.seal()` 메서드로 봉인된 객체를 만들 수 있다.
  - 즉, 프로퍼티를 추가하거나 기존 프로퍼티를 변경, 삭제할 수 없다.
  - 물론 값은 얼마든지 바꿀 수 있다.
- `Object.preventExtensions()` 메서드를 실행하고 프로퍼티 전부 `configurable: false` 처리한다.
- 봉인 여부는 `Object.isSealed()` 메서드로 알 수 있다.

```javascript
var myObj = {};
Object.defineProperty(myObj, 'num', {
  value: 10,
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.seal(myObj);

// 프로퍼티 읽기 가능
console.log(myObj.num); // 10

// 프로퍼티 값 설정 가능
myObj.num = 20;
console.log(myObj.num); // 20

// 프로퍼티 속성 변경 불가능(Object.seal()로 봉인하지 않았으면 가능)
Object.defineProperty(myObj, 'num', { enumerable: false }); // Uncaught TypeError: Cannot redefine property: num

// 프로퍼티 삭제 불가능
delete myObj.num;
console.log(myObj); // {num: 20}
```

<br>

#### :round_pushpin: 동결

- `Object.freeze()` 메서드를 이용해서 프로퍼티 읽기만 가능한 동결 객체를 만들 수 있다.
- `Object.seal()` 메서드를 적용하고 데이터 프로퍼티를 모두 `writable: false` 처리해서 값도 못 바꾸게 한다.
- 동결 여부는 `Object.isFrozen()` 메서드로 알 수 있다.

```javascript
var obj = {
  a: {
    x: 2,
  },
  b: {
    y : 3
  },
};

Object.freeze(obj);

console.log(obj.a); // {x: 2}

obj.a = 5;
console.log(obj); // { a: {x: 2}, b: {y: 3} }

// 얕은 불변성만 지원하므로 그 안의 다른 참조 타입의 값이 있다면 재귀적으로 반복하면서 객체를 완전히 동결해야 한다.
obj.a.x = 3;
console.log(obj); // { a: {x: 2}, b: {y: 3} }
```

- (참고) 재귀 동결 함수

```javascript
// [출처] 모던 자바스크립트 Deep Dive - ‘Chapter16. 프로퍼티 어트리뷰트’ (p.233)에 나오는 코드를 발췌한 내용입니다.

function deepFreeze(target) {
  // 객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체만 동결한다.
  if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);
    // 모든 프로퍼티를 순회하며 재귀적으로 동결한다.
    Object.keys(target).forEach(key => deepFreeze(target[key]));
  }
  return target;
}

const obj = {
  a: {
    x: 2,
  },
  b: {
    y : 3
  },
};

deepFreeze(obj);

console.log(Object.isFrozen(obj)); // true
console.log(Object.isFrozen(obj.a)); // true

obj.a.x = 4;
console.log(obj); // { a: {x: 2}, b: {y: 3} }
```

| 동작               | 일반 객체 | 동결 객체(freeze) | 봉인 객체(seal) | 확장 금지 객체(preventExtensions) |
| ------------------ | --------- | ----------------- | --------------- | --------------------------------- |
| 프로퍼티 추가      | O         | X                 | X               | X                                 |
| 프로퍼티 읽기      | O         | O                 | O               | O                                 |
| 프로퍼티 값 설정   | O         | X                 | O               | O                                 |
| 프로퍼티 속성 변경 | O         | X                 | X               | O                                 |
| 프로퍼티 삭제      | O         | X                 | X               | O                                 |

<br>

### (8) 접근자 프로퍼티

- 객체 프로퍼티는 크게 두 가지로 나뉜다.
  - 데이터 프로퍼티: `value`, `writable`, `enumerable`, `configurable`
  - 접근자 프로퍼티: `get`, `set`
- 이 중 접근자 프로퍼티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티다.
  - 접근자 프로퍼티는 자체적으로 값(프로퍼티 어트리뷰트 `[[Value]]`)을 가지지 않으며 다만 데이터 프로퍼티의 값을 읽거나 저장할 때 관여할 뿐이다.
- 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.
  - 이 때 프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값인 내부 슬롯(ex. `[[Value]]`, `[[Writable]]` 등)이다.
  - 따라서 프로퍼티 어트리뷰트는 직접 접근할 수 없지만 `Object.getOwnPropertyDescriptor()` 메서드를 사용하여 간접적으로 확인할 수는 있다.

<br>

### (9) 접근자 프로퍼티 - `[[Get]]`, getter

- 그 중 `[[Get]]` 프로퍼티 어트리뷰트는 접근자 프로퍼티를 통해 **데이터 프로퍼티의 값을 읽을 때** 호출되는 접근자 함수다.

  - 접근자 프로퍼티 키로 프로퍼티 값에 접근하는 프로퍼티 어트리뷰트 `[[Get]]` 의 값, getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다.

- `[[Get]]` 내부 연산 과정

  ```javascript
  const obj = {
    // 일반적인 데이터 프로퍼티
    name: 'wally',
    age: 28,
  
    // user는 접근자 함수로 구성된 접근자 프로퍼티
    // getter 함수
    get user() {
      return `${this.name} - ${this.age}`;
    }
  }
  
  console.log(obj.user); // 'wally - 28'
  
  Object.getOwnPropertyDescriptor(obj, 'user');
  ```

  - 프로퍼티 키가 유효한지 확인
    - 프로퍼티 키는 문자열 또는 심벌이어야 함
  - 프로토타입 체인에서 프로퍼티를 검색
  - 검색한 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인
  - 접근자 프로퍼티인 경우 그 프로퍼티의 `[[Get]]` 의 값, 즉 getter 함수를 호출하여 그 결과를 반환
    - 접근자 프로퍼티의 `[[Get]]` 의 값은 `Object.getOwnPropertyDescriptor` 메서드가 반환하는 프로퍼티 서술자 객체의 `get` 프로퍼티 값과 같다.

<br>

### (10) 접근자 프로퍼티 - `[[Set]]`, setter

- `[[Set]]` 프로퍼티 어트리뷰트는 접근자 프로퍼티를 통해 **데이터 프로퍼티의 값을 저장할 때** 호출되는 접근자 함수다.

  - 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트 `[[Set]]` 의 값, setter 함수가 호출되고 그 결과가 프로퍼티 값으로 저장된다.

- 세터 함수 동작 예시

  ```javascript
  const obj = {
    name: 'wally',
    age: 28,
  
    get user() {
      return `${this.name} - ${this.age}`;
    },
  
    // setter 함수
    set user({ name, age }) {
      this.name = name;
      this.age = age;
    }
  }
  
  obj.user = {
    name: 'wally-wally',
    age: 29,
  };
  
  console.log(obj); // {name: 'wally-wally', age: 29}
  console.log(obj.user); // 'wally-wally - 29'
  ```

- 게터와 세터는 항상 둘 다 선언하는 것이 좋다.

  - 한쪽만 선언하면 예상외의 결과가 나올 수 있다.

<br>

### :heavy_plus_sign: Vue.js의 `computed` 속성에서 getter, setter 함수 타입 파해치기

```typescript
// vue/types/options.d.ts 일부 발췌

type DefaultComputed = { [key: string]: any };

export interface ComponentOptions<
  V extends Vue,
  Data=DefaultData<V>,
  Methods=DefaultMethods<V>,
  Computed=DefaultComputed,
  PropsDef=PropsDefinition<DefaultProps>,
  Props=DefaultProps
> {
  data?: Data;
  props?: PropsDef;
  propsData?: object;
  // 이 부분 집중!
  computed?: Accessors<Computed>;
  // 하략
}

export type Accessors<T> = {
  [K in keyof T]: (() => T[K]) | ComputedOptions<T[K]>
}

export interface ComputedOptions<T> {
  get?(): T;
  set?(value: T): void;
  cache?: boolean;
}
```

```typescript
// (() => T[K]) 에 매칭됨
computed: {
  mailBoxes(): Mailbox[] {
    return this.$store.getters[MailboxGettersType.GET_ALL_MAILBOXES];
  },

  tags(): Tag[] {
    return this.$store.getters[TagGettersType.GET_TAGS];
  },
},
```

```typescript
export default Vue.extend({
  data() {
    return {
      firstName: '',
      lastName: '',
    }
  },
  computed: {
    // ComputedOptions<T[K]> 에 매칭됨
    fullName: {
      get(): string {
        return `${this.firstName} ${this.lastName}`;
      },
      set(newValue: string) {
        const names = newValue.split(' ');
        [this.firstName] = names;
        this.lastName = names[names.length - 1];
      },
    },
  },
});
```

- [참고 자료] Vue.js - compute와 watch [(바로 이동)](https://kr.vuejs.org/v2/guide/computed.html#computed-%EC%86%8D%EC%84%B1%EC%9D%98-setter-%ED%95%A8%EC%88%98)

<br>

### (11) 존재 확인

```javascript
var obj = {
  a: 2,
}

console.log('a' in obj); // true
console.log('b' in obj); // false

console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('b')); // false
```

- `in` 연산자

  - 어떤 프로퍼티가 해당 객체에 존재하는지 아니면 이 객체의 `[[Prototype]]` 연쇄를 따라갔을 때 상위 단계에 존재하는지 확인
  - 참고로 배열도 객체의 일종이긴 하지만  `in` 연산자가 `key`의 존재 여부를 확인하기 때문에 배열의 원소 존재 여부는 확인할 수 없다.

  ```javascript
  var arr = ['5', '6', '7'];
  
  console.log('0' in arr); // true
  console.log('5' in arr); // false
  ```

- `Object.prototype.hasOwnProperty()` 메서드

  - 단지 프로퍼티가 객체에 있는지만 확인하고 <b><u>`[[Prototype]]` 연쇄는 찾지 않는다.</u></b>
  - 일반적인 경우에는 이 방식으로 존재 확인을 할 수 있지만 `Object.create(null)` 과 같은 예외적인 상황에서는 `Object.prototype`과 연결되어 있지 않아 사용할 수 없는 경우도 있다.
    - 이럴 때는 `Object.prototype.hasOwnProperty.call(obj, 'a');` 처럼 명시적으로 바인딩하면 좀 더 확실하게 확인할 수 있다.

- [참고 자료] 객체(Object) - `hasOwnProperty` [(바로 이동)](https://kohlee.tistory.com/entry/%EA%B0%9D%EC%B2%B4-Objects-hasOwnProperty)

<br>

### (12) 열거

```javascript
var obj = {};

Object.defineProperty(obj, 'a', {
  value: 1,
  enumerable: true,
});

Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false,
});

console.log(obj.b); // 2
console.log('b' in obj); // true
console.log(obj.hasOwnProperty('b')); // true

for (const k in obj) {
  console.log(k, obj[k]);
}
// 'a' 1
```

- `enumerable` 값을 `false`로 설정해도 그 값에 접근할 수도 있고 존재 확인도 판별이 되나 객체 프로퍼티 순회 리스트에는 포함되지 않는다.
- 열거 가능한지 확인하는 방법은 `Object.prototype.propertyIsEnumerable()` 메서드를 사용하면 된다.
  - 어떤 프로퍼티가 해당 객체의 직속 프로퍼티인 동시에 `enumerable: true` 인지 검사한다.

```javascript
var obj = {};

Object.defineProperty(obj, 'a', {
  value: 1,
  enumerable: true,
});

Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false,
});

console.log(obj.propertyIsEnumerable('a')); // true
console.log(obj.propertyIsEnumerable('b')); // false
```

- `Object.keys()` vs `Object.getOwnPropertyNames()`
  - `Object.keys()` : <b><u>열거 가능한</u></b> 프로퍼티를 배열 형태로 반환
  - `Object.getOwnPropertyNames()` : <b><u>열거 가능 여부와 상관없이</u></b> 객체에 있는 열거 가능 및 열거 불가능한 모든 프로퍼티를 배열로 반환

```javascript
var obj = {};

Object.defineProperty(obj, 'a', {
  value: 1,
  enumerable: true,
});

Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false,
});

console.log(Object.keys(obj)); // ['a']
console.log(Object.getOwnPropertyNames(obj)); // ['a', 'b']
// 배열
const arr = ['a', 'b', 'c', 'd'];
Object.keys(arr); // ['0', '1', '2', '3']
Object.getOwnPropertyNames(arr); // ['0', '1', '2', '3', 'length']

// 객체
// enumerable: false로 지정하지 않는 이상 두 결과값은 같다.
const obj = { 0: 'a', 1: 'b', 2: 'c' };
Object.keys(obj);  // ["0", "1", "2"]
Object.getOwnPropertyNames(obj);  // ["0", "1", "2"]
```

<br>

## 4. 순회

> [이것만은 꼭 기억하자!]
>
> ES6에서 순회하는 이터러블, 이터레이터의 개념에서 가장 중요한 것은 해당 값이 <b><u>순회가 가능하도록 하려면 `Symbol.iterator`가 구현되어있어야 한다!</u></b>

### (1) Array Helper Methods [(이미지 출처)](https://www.instagram.com/p/CZEmlPPhUHW/)

<img src="https://user-images.githubusercontent.com/52685250/162483614-2fb20d5a-8f3a-41fe-8050-c1a8dc9344ee.jpg" width="700" />

- 추가로 `forEach` 메서드는 배열 전체 값을 순회하지만 콜백 함수의 반환 값은 무시한다.

<br>

### (2) 기존 순회 방식

```javascript
// 배열
const arr = [1, 2, 3, 4];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1 2 3 4
}

// for ... in 루프를 통한 객체 순회
const obj = {
  a: 1,
  b: 2,
};

for (const k in obj) {
  console.log(k); // a b
  console.log(obj[k]); // 1 2
}
```

- 위 코드는 인덱스를 순회하면서 해당 값(`arr[i]`)을 사용할 뿐 값 자체를 순회하는 것은 아니다.
- 또한 `for ... in` 루프를 이용한 객체 순회는 실제로 열거 가능한 프로퍼티만 순회하고 그 값을 얻으려면 일일이 프로퍼티에 접근해야 하므로 간접적인 값 추출이다.

<br>

### (3) `for ... of` 루프

```javascript
const arr = [1, 2, 3, 4];

for (const v of arr) {
  console.log(v); // 1 2 3 4
}
```

- `for .. of` 루프는 순회할 원소의 순회자 객체(`@@iterator` = `[Symbol.iterator]`)가 있어야 한다.
  - 이러한 이터레이터를 return하는 `[Symbol.iterator]()` 를 가진 값을 <b><u>이터러블</u></b>이라 한다.
- 순회당 한 번씩 이 순회자 객체의 `next()` 메서드를 호출하여 연속적으로 반환 값을 순회한다.

```javascript
const arr = [1, 2, 3, 4];
const it = arr[Symbol.iterator]();

it.next(); // {value: 1, done: false}
it.next(); // {value: 2, done: false}
it.next(); // {value: 3, done: false}
it.next(); // {value: 4, done: false}
it.next(); // {value: undefined, done: true}
```

- `next()` 메서드의 결과값은 `{value: any, done: boolean}` 형태의 객체로, 여기서 `value`는 현재 순회 값, `done` 은 다음에 순회할 값의 유무를 나타내는 불리언 값이다.
  - 이러한 `{value, done}` 객체를 return 하는 `next()` 메서드를 가진 값을 <b><u>이터레이터</u></b>라고 한다.
  - 그리고 이터러블을 `for ... of` 혹은 전개 연산자 등과 함께 동작하도록 정의한 규약을 <b><u>이터러블/이터레이터 프로토콜</u></b>이라 한다.
- [참고 자료] `for ... in` 루프 vs `for ... of` 루프 [(바로 이동)](https://github.com/wally-wally/TIL/blob/master/06_js/09_functional_js/01_iterable/for_in_for_of.md)

<br>

### (4) 사용자 정의 `@@iterator`

```javascript
var myObj = {
  a: 2,
  b: 3,
  c: 4,
  d: 5,
  e: 6,
  [Symbol.iterator]() {
    var o = this;
    var idx = 0;
    var ks = Object.keys(o);
    return {
      next() {
        return {
          value: o[ks[idx++]],
          done: idx > ks.length,
        }
      }
    }
  }
}

var it = myObj[Symbol.iterator]();
it.next(); // {value: 2, done: false}
it.next(); // {value: 3, done: false}
it.next(); // {value: 4, done: false}
it.next(); // {value: 5, done: false}
it.next(); // {value: 6, done: false}
it.next(); // {value: undefined, done: true}

for (var v of myObj) {
  console.log(v); // 2 3 4 5 6
}
```

```javascript
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
  	return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false }
      }
    }    
  }
};

const iterator = iterable[Symbol.iterator]();
iterator.next(); // {value: 3, done: false}
iterator.next(); // {value: 2, done: false}
iterator.next(); // {value: 1, done: false}
iterator.next(); // {done: true}

// iterable 안에 Symbol.iterator가 구현되어 있으므로 for...of 문으로 순회할 수 있는 것이다.
for (const a of iterable) {
  console.log(a);
}
```

<br>

### :heavy_plus_sign: well-formed iterable

- 아래 코드처럼 배열과 같이 잘 구현된 이터러블인 경우는 `Symbol.iterator`를 통해 순회가 잘 된다.
- 그리고 `iter` 역시 `Symbol.iterator`를 가지고 있고 이를 실행한 값은 자기 자신이 된다.

```javascript
const arr = [1, 2, 3, 4];
for (const a of arr) {
  console.log(a);
}

const iter = arr[Symbol.iterator]();
iter.next();
for (const a of iter) {
  console.log(a); // iter.next();를 한 번 작성하면 한 번 진행한 이후의 값들부터 순회된다.
}
```

- 이와 같이 이터레이터가 자기 자신을 반환하는 `Symbol.iterator`를 가지고 있는 이터러블을 <b><u>well-formed iterable</u></b>이라고 한다.
- 이터레이터이면서 이터러블인 객체인데 쉽게 말하면 `iter[Symbol.iterable]() === iter` 인 경우에 해당한다.

```javascript
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
  	return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false }
      },
      [Symbol.iterator]() { // 자기 자신을 return 하는 코드 추가
        return this;
      }
    }    
  }
};

const iterator = iterable[Symbol.iterator]();

// 자기 자신을 return 하는 코드 추가하지 않으면 아래 구문은 오류
// iterator가 iterable이 아니라고 나옴
// Uncaught TypeError: iterator is not iterable
// iterable의 [Symbol.iterator]() 안에 Symbol.iterator가 없기 때문
for (const a of iterator) {
  console.log(a);
}

for (const a of iterable) {
  console.log(a);
}

// 당연히 for문 앞에 console.log(iterator.next());를 작성해서 어느 정도 이상 진행된 후에서부터 순회를 해도 가능하다.
```

- [참고 자료] well-formed 이터러블의 장점(feat. 피보나치 수열) [(바로 이동)](https://underbleu.com/Functional-programming/well-formed/)
- [참고 자료] iterable과 iterator 이해하기 [(바로 이동)](https://armadillo-dev.github.io/javascript/what-is-iterable-and-iterator/)

<br>

## :question: Questions

- 객체 리터럴 방식과 생성자 함수 방식으로 객체를 만들었을 때의 차이점을 간략히 설명해보세요.
- `Object.assign`, `Object.create`, `Object.defineProperty` 메서드의 차이점을 간략히 설명해보세요.
- `Object.defineProperty` 메서드로 정의할 수 있는 속성들은 어떤 것들이 있습니까?
- `Object.preventExtensions()`, `Object.seal()`, `Object.freeze()` 메서드를 간략히 설명해보세요.
- `Object.keys()` 메서드와 `Object.getOwnPropertyNames()` 메서드의 차이점을 간략히 설명해보세요.
- 다음 코드의 console.log 출력 결과는 어떻게 될까요?

```javascript
var obj1 = {};
console.log('toString' in obj1); // ?

var obj2 = Object.create(null);
console.log('toString' in obj2); // ?

var obj3 = Object.create({});
console.log('toString' in obj3); // ?
```

```javascript
var obj1 = {};
console.log(Object.prototype.hasOwnProperty.call(obj1, 'toString')); // ?

var obj2 = Object.create(null);
console.log(Object.prototype.hasOwnProperty.call(obj2, 'toString')); // ?

var obj3 = Object.create({a: 1});
console.log(Object.prototype.hasOwnProperty.call(obj3, 'a')); // ?
```

- 다음 코드의 console.log 출력 결과는 어떻게 될지 생각해보고 그 이유를 설명해보세요.

```javascript
var arr = [1, 2, 3];

console.log(3 in arr); // ?
console.log(arr.hasOwnProperty(3)); // ?

console.log(+[null] in arr); // ?
console.log(+[true] in arr); // ?

var obj = Object.create(null);
console.log(+obj in arr); // ?
```

- `for ... in`과 `for ... of`의 차이점을 설명해보세요.
- 아래 코드의 console.log 출력 결과는 어떻게 될까요?

```javascript
const user1 = {
  sayHi() {},
  sayIntroduce() {},
};

class User {
  sayHi() {}
  sayIntroduce() {}
}

const user2 = new User();

const user3 = Object.create(null);

console.log(Object.keys(user1).length); // ?
console.log(Object.keys(user2).length); // ?
console.log(Object.keys(user3).length); // ?

console.log(Object.getOwnPropertyNames(user1).length); // ?
console.log(Object.getOwnPropertyNames(user2).length); // ?
console.log(Object.getOwnPropertyNames(user3).length); // ?
```

```javascript
const user1 = {
  sayHi() {},
  sayIntroduce() {},
};

class User {
  sayHi() {}
  sayIntroduce() {}
}

const user2 = new User();

const user3 = Object.create(null);

console.log(Object.keys(Object.getPrototypeOf(user1)).length); // ?
console.log(Object.keys(Object.getPrototypeOf(user2)).length); // ?
console.log(Object.keys(Object.getPrototypeOf(user3)).length); // ?

console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(user1)).length); // ?
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(user2)).length); // ?
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(user3)).length); // ?
```

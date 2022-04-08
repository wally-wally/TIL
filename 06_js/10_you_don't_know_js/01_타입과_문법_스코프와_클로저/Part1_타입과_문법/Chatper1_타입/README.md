# Chapter1. 타입

<br>

## 1. 타입, 그 실체를 이해하자

- '타입'이란 자바스크립트 엔진, 개발자 모두에게 어떤 값을 다른 값과 분별할 수 있는, 고유한 내부 특성의 집합이다.
  - 다시 말해, 기계와 사람이 42(숫자)란 값을 '42'(문자열)란 값과 다르게 취급한다면, 두 값은 타입이 서로 다르다.
- 타입별로 내재된 특성을 제대로 알고 있어야 값을 다른 타입으로 변환하는 방법을 정확히 이해할 수 있다.
  - 어떤 형태로든 거의 모든 자바스크립트 프로그램에서 강제변환이 일어나므로 타입을 확실하게 인지하고 사용하는 것이 중요하다.

<br>

## 2. 내장 타입

- 원시 타입(Primitives)의 종류
  - <b>`null`, `undefined`, `boolean`, `number`, `string`, `object`, `symbol`</b>
- `typeof` 연산자를 이용해서 값의 타입을 알 수 있다.

```javascript
typeof undefined === 'undefined'; // true
typeof true === 'boolean'; // true
typeof 42 === 'number'; // true
typeof '42' === 'string'; // true
typeof { a: 1 } === 'object'; // true
typeof Symbol() === 'symbol'; // true
typeof null === 'object' // true
```

- 주의할 점은 `null`의 `typeof` 연산자의 결과가 `'object'`라는 것이다.
  - 거의 20년 동안 이 버그는 끈덕지게 버텨왔고 이제 와서 손은 대자니 다른 버그가 생겨 잘 돌아가던 웹 소프트웨어가 멈춰버릴 경우가 너무 많아 앞으로도 해결될 가능성은 좀처럼 없어 보인다.
- `null` 값 확인하는 방법

```javascript
var a = null;
(!a && typeof a === 'object'); // true
a === null; // true
```

- 참조 타입의 `typeof` 연산자 결과
  - 함수는 `'function'`이 최상위 레벨의 내장 타입처럼 보이지만 명세를 읽어보면 실제로는 `object`의 '하위 타입'이다.
  - 그리고 배열도 사실 내부적으로는 객체로 볼 수 있다.
    - 숫자 인덱스를 가지며, `length` 프로퍼티가 자동으로 관리되는 등의 추가 특성을 지닌, 객체의 '하위 타입'이라 할 수 있다.

```javascript
typeof { a: 1 } === 'object'; // true
typeof function a() { /* ... */ } === 'function'; // true
typeof [1, 2, 3] === 'object'; // true
```

<br>

## 3. 값은 타입을 가진다

### (1) `typeof` 연산자의 의미

- 값에는 타입이 있지만, 변수엔 따로 타입이란 없다.
  - 변수는 언제라도, 어떤 형태의 값이라도 가질 수 있다.
- 변수에 `typeof` 연산자를 대어보는 건 '이 변수의 타입은 무엇이니?'라는 질문과 같지만, 실은 타입이란 개념은 변수에 없으므로 정확히는 <b>'이 변수에 들어있는 값의 타입은 무엇이니?'</b>라고 묻는 것이다.

```javascript
var a = 42;
// a 라는 변수에 들어있는 값의 타입을 무엇이니?
typeof a; // 'number'

typeof typeof a; // 'string'
```

<br>

### (2) 값이 없는 vs 선언되지 않은

- 값이 없는 변수의 값은 `undefined`이며, `typeof` 결과는 `"undefined"`다.

```javascript
var a;
typeof a; // 'undefined'

var b = 42;
var c;

b = c;

typeof b; // 'undefined'
typeof c; // 'undefined'
```

- 'undefined' vs 'undeclared'

| 'undefined'                                                  | 'undeclared'                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 접근 가능한 스코프에 <b>변수가 선언</b>되었으나 현재 <b>아무런 값도 할당되지 않은</b> 상태 | 접근 가능한 스코프에 <b>변수 자체가 선언조차 되지 않은</b> 상태 |

```javascript
var a;

a; // undefined
b; // ReferenceError: b가 정의되지 않았습니다.
```

- `typeof` 만의 독특한 안전 가드
  - 선언되지 않은 변수를 `typeof` 하면 브라우저는 오류 처리를 하지 않고 `'undefined'`로 나온다.
  - 다음 절에서 좀 더 자세히 살펴보자.

```javascript
var a;

typeof a; // 'undefined'
typeof b; // 'undefined'
```

<br>

### (3) 선언되지 않은 변수

- 브라우저에서 자바스크립트 코드를 처리할 때, 특히 여러 스크립트 파일의 변수들이 전역 네임스페이스를 공유할 때 <b>`typeof`의 안전 가드</b>는 의외로 쓸모가 있다.
  - 아래 코드 처럼 임의로 정의한 변수를 쓰지 않더라도 `typeof`로 체크하는 것이 편리하며, 내장 API 기능을 체크할 때에도 에러가 나지 않게 도와준다.

```javascript
// Bad => ReferenceError 발생 가능
if (DEBUG) {
  console.log('start debugging');
}

// Recommand
if (typeof DEBUG === 'undefined') {
  console.log('start debugging');
}
```

- `typeof` 안전 가드 대신에 전역 변수를 체크하는 다른 방법은 <b>`window`라는 전역 객체의 프로퍼티</b>를 활용하는 것이다.
  - 선언되지 않은 변수 때와는 달리 어떤 객체의 프로퍼티를 접근할 때 그 프로퍼티가 조재하지 않아도 `ReferenceError`가 나지는 않는다.
  - 하지만 `window` 객체를 통한 전역 변수 참조는 가급적 삼가는 것이 좋다.

```javascript
if (window.DEBUG) {
  // ...
}
```

- 엄밀히 말해 `typeof `안전 가드는 전역 변수를 사용하지 않을 때에도 유용한데, 일부 개발자들은 이런 설계 방식이 그다지 바람직하지 않다고 말한다.
  - 아래 함수를 보면 `FeatureXYZ` 변수가 있으면 그대로 사용하고 없으면 함수 바디를 정의한다.
  - 이렇게 해야 다른 사람이 copy and paster를 해도 안전하게 `FeatureXYZ`가 존재하는지 체크할 수 있다.

```javascript
(function() {
  function FeatureXYZ() { /* ... 나의 XYZ 기능 ... */ }
    
  // 'doSomethingCool()'를 포함
  function doSomethingCool() {
    var helper = (typeof FeatureXYZ === 'undefined') ? FeatureXYZ : function() { /* ... 기본 XYZ 기능 ... */ };
  
    var val = helper();
    // ...
  }
    
  doSomethingCool();
})();
```

- 이와 다르게 <b>'의존성 주입'(Dependency Injection) 설계 패턴</b>을 선호하는 개발자들도 있다.
  - `FeatureXYZ`가 `doSomethingCool()`의 바깥이나 언저리에 정의되어 있는지 암시적으로 조사하는 대신, 아래 코드처럼 명시적으로 의존 관계를 전달하는 것이다.

```javascript
function doSomethingCool(FeatureXYZ) {
  var helper = FeatureXYZ || function() { /* ... 기본 XYZ 기능 ... */ }
  
  var val = helper();
  // ...
}
```

- 다양한 설계 옵션이 가능하지만 접근 방식에 따라 장단점이 고루 있어서 어떤 것이 완전히 '맞다'라고 '틀리다'라고 할 수는 없다.

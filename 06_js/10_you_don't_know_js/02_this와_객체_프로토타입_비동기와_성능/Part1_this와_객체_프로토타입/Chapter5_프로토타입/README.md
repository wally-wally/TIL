# Chapter5. 프로토타입

<br>

## 1. `[[Prototype]]`

### (1) `[[Prototype]]` 링크

- 명세에 따르면 자바스크립트 객체는 `[[Prototype]]` 이라는 내부 프로퍼티가 있고 다른 객체를 참조하는 단순 레퍼런스로 사용한다.

  - 거의 모든 객체가 이 프로퍼티에 `null` 아닌 값이 생성 시점에 할당된다.
  - 드물긴 하지만 이 링크가 텅 빈 객체도 가능하다.

- 객체 프로퍼티 참조 예시

  - 아래 코드를 보면 객체에서 `myObj.a` 처럼 객체 프로퍼티 참조시 `[[Get]]`이 호출된다.

  ```javascript
  var myObj = {
    a: 1,
  };
  
  console.log(myObj.a); // 1
  ```

  - 하지만 `myObj` 라는 객체에 `a`라는 프로퍼티가 없으면 다음 관심사는 `[[Prototype]]` 링크다.
  - `[[Get]]` 은 주어진 프로퍼티를 객체에서 찾지 못하면 곧바로 `[[Prototype]]` 링크를 따라가면서 수색 작전을 벌인다.
  - 아래 코드 처럼 `obj` 는 `anotherObj` 와 `[[Prototype]]` 이 링크됐다.
  - `obj.a`란 프로퍼티는 없지만 `anotherObj`에서 값을 대신 찾아 프로퍼티 접근의 결괏값을 반환한다.

  ```javascript
  var anotherObj = {
    a: 1,
  };
  
  var obj = Object.create(anotherObj);
  
  console.log(obj.a); // 1
  ```

  - 만약 여기에도 없다면 `[[Prototype]]` 링크를 계속 타고 올라가고 연쇄 끝에 이르러서도 프로퍼티가 발견되지 않으면 `[[Get]]`은 결괏값으로 `undefined`를 반환한다.

- 그리고 지난 Chapter에서도 살펴보았지만 `for ... in` 루프에서 객체를 순회할 때도 `[[Prototype]]` 연쇄의 검색 과정과 비슷한 방식으로 연쇄를 통해 손길이 닿는 프로퍼티라면 죄다 열거한다.

<br>

### (2) `Object.prototype`

- `[[Prototype]]` 연쇄가 끝나는 지점은 내장 프로토타입 `Object.prototype`이다.
  - 모든 자바스크립트 객체는 `Object.prototype` 객체의 자손이므로 `Object.prototype` 에는 자바스크립트에서 두루 쓰이는 다수의 공용 유틸리티가 포함되어 있다.

<br>

### (3) 프로퍼티 세팅과 가려짐

```javascript
myObj.foo = 'bar';
```

- `foo` 라는 이름의 데이터 접근 프로퍼티가 `myObj` 객체에 직속된 경우 위 할당문은 기존 프로퍼티 값을 고치는 단순한 기능을 할 뿐이다.
  - 만약 직속되지 않는다면 `[[Prototype]]` 연쇄를 순회하기 시작하고 그렇게 해도 발견되지 않으면 그제야 `foo` 라는 프로퍼티를 객체에 추가한 후 주어진 값을 할당한다.
- `foo` 라는 프로퍼티명이 `myObj` 객체와 이 객체를 기점으로 한 `[[Prototype]]` 연쇄의 상위 수준 두 곳에서 동시에 발견될 때 이를 <b><u>프로퍼티 가려짐(shadowing)</u></b>이라 한다.
  - `myObj`에 직속한 `foo` 때문에 상위 연쇄의 `foo`가 가려지는 것이다.
  - `myObj.foo`로 검색하면 언제나 연쇄의 최하위 수준에서 가장 먼저 `foo` 프로퍼티를 찾기 때문이다.

---

#### :round_pushpin: 직속한 프로퍼티는 없으나 `[[Prototype]]` 연쇄의 상위 수준에 해당 프로퍼티가 있을 경우 할당문의 경우의 수

| 케이스                                                       | 현상                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `[[Prototype]]` 연쇄의 상위 수준에서 해당 프로퍼티의 데이터 접근 프로퍼티가 존재하는데, 읽기 전용이 아닌 경우 | 직속 프로퍼티가 새로 추가되어 ‘프로퍼티 가려짐’ 현상 발생    |
| `[[Prototype]]` 연쇄의 상위 수준에서 해당 프로퍼티의 데이터 접근 프로퍼티가 존재하는데, 읽기 전용인 경우 | ‘프로퍼티 가려짐’ 현상 발생 안 함(엄격 모드: 에러, 비엄격 모드: 프로퍼티 세팅은 무시됨) |
| `[[Prototype]]` 연쇄의 상위 수준에서 해당 프로퍼티가 세터일 경우 | 항상 그 세터가 호출되고 ‘프로퍼티 가려짐’ 현상이 발생하지 않음(세터를 재정의하는 일도 없음) |

- 만약 두 번째, 세 번째 케이스에서 ‘프로퍼티 가려짐’ 현상을 발생시키려면 `=` 할당 연산자를 쓰면 안 되고 `Object.defineProperty()` 메서드를 사용하여 객체에 프로퍼티를 추가해야 한다.
  - 두 번째 케이스를 다시 살펴보면 읽기 전용 프로퍼티(`writable: false`)가 있으면 동일 이름을 가진 프로퍼티가 `[[Prototype]]` 연쇄의 하위 수준에서 암시적으로 생성되지 못하게 차단한다.
- 가려짐은 그 이용 가치에 비해 지나치게 복잡하고 애매한 구석이 있으니 될 수 있으면 사용하지 말자.
  - 나중에 뒤에서 대안적인 디자인 패턴을 살펴보면서 깔끔하게 가려짐을 대체하는 방법을 살펴보도록 하자.

---

- ‘프로퍼티 가려짐’ 현상의 미묘한 케이스

  ```javascript
  var anotherObj = {
    a: 1,
  };
  
  var myObj = Object.create(anotherObj);
  
  console.log(anotherObj.a); // 1
  console.log(myObj.a); // 1
  
  anotherObj.hasOwnProperty('a'); // true
  myObj.hasOwnProperty('a'); // false
  
  myObj.a++; // 암시적인 가려짐 발생!
  
  console.log(anotherObj.a); // 1
  console.log(myObj.a); // 2
  
  myObj.hasOwnProperty('a'); // true
  ```

  - 위 코드에서 `myObj.a++` 는 `myObj.a = myObj.a + 1`을 의미한다.
  - `[[Prototype]]` 을 경유하여 `[[Get]]`을 먼저 찾고 `anotherObj.a`에서 현재 값 1를 얻은 뒤 1만큼 증가시킨 후, 그 결괏값 2을 다시 `[[Put]]` 으로 `myObj` 에 새로운 가려짐 프로퍼티 `a`를 생성한 뒤 할당한다.
  - 그러므로 위임을 통해 프로퍼티를 수정할 땐 조심 또 조심해야 한다.
  - 만약 `anotherObj.a`를 1만큼 증가시킬 의도라면 `anotherObj.a++`가 유일한 정답이다.

<br>

## 2. 클래스

### (1) 클래스 함수

- 자바스크립트에서 `new` 연산자로 생성시 내부 동작

  ```javascript
  function Foo() {
    // ...
  }
  
  Foo.prototype; // { }
  
  var a = new Foo();
  Object.getPrototypeOf(a) === Foo.prototype; // true
  ```

  - `new Foo()` 로써 만들어진 모든 객체는 `Foo.prototype` 객체와 `[[Prototype]]` 링크로 연결된다.
    - 클래스 지향 언어에서는 클래스를 다중 복사할 수 있지만 자바스크립트에서는 이런 복사 과정이 전혀 없고 클래스에서 여러 인스턴스를 생성할 수도 없다.
    - `new Foo()`로 새 객체(`a`)가 만들어지고 이 객체는 `Foo.prototype` 객체와 내부적으로 `[[Prototype]]` 과 연결이 맺어진다.
    - 결국, 상호 연결된 두 개의 객체로 귀결되고 클래스 인스턴스화 과정 따윈 없다. 두 객체를 연결한게 전부다.
  - 사실 `new Foo()` 호출 자체는 이러한 ‘링크’의 생성 프로세스와 거의 관련이 없다.
    - 말하자면 일종의 우발적인 부수 효과다.
  - `Object.getPrototypeOf()` 메서드의 자세한 내용은 [MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)를 참고해보자.

- 자바스크립트는 어떤 객체(클래스)에서 다른 객체(클래스)로 복사하는 게 아니라 두 객체를 연결한다.

  - `[[Prototype]]` 체계를 다른 말로 프로토타입 상속이라고 하며 흔히 클래스 상속의 동적 언어 버전이라고 말한다.

- 상속은 기본을 복사를 수반하지만, 자바스크립트는 객체 프로퍼티를 복사하지 않는다.

  - 대신 두 객체에 링크를 걸어두고 한쪽이 다른 쪽의 프로퍼티/함수에 접근할 수 있게 위임한다.
  - 어떤 객체의 작동을 더 일반적인 객체와 비교했을 때 어느 부분이 다른지 기술하는 ‘차등 상속(Differential Inheritance)’이라는 용어를 사용하기도 한다.
  - 하지만 ‘차등 상속’ 용어는 자바스크립트 `[[Prototype]]` 체계의 작동 원리를 있는 그대로 설명하기 위해서는 적합하지 않을 수도 있다.(저자의 의견)

<br>

### (2) 생성자

> 자바스크립트에서 함수는 생성자가 아니지만 `new` 키워드를 사용하여 호출하면 ‘생성자 호출’이 된다.

```javascript
function Foo() {
  // ...
}

Foo.prototype.constructor === Foo; // true

var a = new Foo();
a.constructor === Foo; // true
```

- `Foo.prototype` 객체에는 기본적으로 (첫 번째 줄 `Foo` 선언 시) 열거 불가한 공용 프로퍼티인 `.constructor`가 세팅되는데, 이는 객체 생성과 관련된 함수 (`Foo`)를 다시 참조하기 위한 레퍼런스다.
  - 마찬가지로 생성자(`new Foo()`)로 만든 객체 `a`도 `.constructor` 프로퍼티를 갖고 있어서 ‘자신을 생성한 함수’를 가리킬 수 있다.
  - 사실 엄밀히 말하면 `a.constructor`가 `Foo` 함수에 대응되지만 ‘생성자’라는 단어 의미 그대로 ‘~에 의해 생성됨’을 의미하는 것은 아니다.
- `Foo` 는 ‘생성자’가 아닌 그냥 여느 함수일 뿐이다.
  - 함수는 결코 생성자가 아니지만, 그 앞에 `new`를 붙여 호출하는 순간 이 함수는 ‘생성자 호출’을 한다.
  - `new` 키워드는 일반 함수 호출을 도중에 가로채어 원래 수행할 작업 외에 객체 생성이라는 잔업을 더 부과하는 지시자다.

<br>

### (3) `new` 의 동작 방식 정리

```javascript
function Func() {}
const f = new Func();
```

- 빈 객체를 생성한다.
  - `{}` 객체가 만들어진다.
- `[[Prototype]]` 속성을 생성자 호출할 함수의 `prototype` 속성으로 지정한다.(만약 함수의 `prototype`의 속성이 원시값이라면 `Object.prototype`으로 지정된다.)
  - 위에서 만들어진 객체의 `[[Prototype]]`을 `Func.prototype`으로 지정한다.
- 객체를 생성하고 이 객체를 `this`로 지정한다.
  - 지금까지 만들어진 객체를 `this`로 지정한다.
- 함수를 호출하고 해당 함수의 `this`로 위에서 지정한 객체를 사용한다.
  - `Func()`를 호출하고 이 함수에서 `this`를 위에서 만든 객체로 지정한다.
- 함수의 리턴값이 원시값이라면 새로 만들어진 객체가 return되고 return 값이 객체라면 해당 객체가 return 된다.
  - 함수의 return 값이 `undefined` 즉, 원시값이므로 생성한 객체를 return 한다.

---

:page_facing_up: <b>참고 자료</b>

- `new`의 동작방식 [(바로 이동)](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/new.md)
- `new` 연산자와 생성자 함수 [(바로 이동)](https://ko.javascript.info/constructor-new)

---

<br>

### (4) 체계

- 자바스크립트에서 클래스 지향 언어 구현

  ```javascript
  function Foo(name) {
    this.name = name;
  }
  
  Foo.prototype.myName = function() {
    return this.name;
  }
  
  var a = new Foo('a');
  var b = new Foo('b');
  
  a.myName(); // 'a'
  b.myName(); // 'b'
  ```

  - `this.name = name` 할당 시, `.name` 프로퍼티가 `a`, `b` 두 객체에 추가된다.
    - 마치 클래스 인스턴스에서 데이터 값을 캡슐화하는 모습처럼 보인다.
  - `Foo.prototype` 객체의 프로퍼티/함수가 `a`, `b` 생성 시 각각의 객체로 복사될 거라 짐작하기 쉽지만 절대로 그런 일은 일어나지 않는다.
    - `a`, `b`는 생성 직후 각자의 내부 `[[Prototype]]`이 `Foo.prototype`에 링크된다.
    - `myName`은 `a`, `b` 에서 찾을 수 없으므로 위임을 통해 `Foo.prototype`에서 찾는다.

- 참고로 위 코드를 ES6 이후에 나오는 클래스 문법을 이용해서 작성하면 다음과 같다.

  ```javascript
  class Foo {
    constructor(name) {
      this.name = name;
    }
  
    myName() {
      return this.name;
    }
  }
  ```

<br>

#### :round_pushpin: 돌아온 '생성자'

```javascript
function Foo() {
  // ...
}

Foo.prototype.constructor === Foo; // true

var a = new Foo();
a.constructor === Foo; // true
```

- 이전 절에서 살펴본 코드를 다시 보면 `a.constructor === Foo;`에서 `.constructor` 프로퍼티는 `Foo.prototype`에 위임된 레퍼런스로서 `a.construtor`는 `Foo`를 가리킨다.

  - `Foo`에 의해 생성된 객체 `a`가 `.constructor` 프로퍼티를 통해 `Foo`에 접근할 수 있으니 언뜻 보면 매우 편리해 보이지만 보안 측면에서는 바람직하지 않다.
  - 왜 바람직하지 않은지 살펴보자.

- `Foo.prototype`의 `.constructor` 프로퍼티는 기본으로 선언된 `Foo` 함수에 의해 생성된 객체에만 존재한다.

  - 새로운 객체를 생성한 뒤 기본 `.prototype` 객체 레퍼런스를 변경하면 변경된 레퍼런스에 `.constructor` 프로퍼티가 붙지 않는다.

  ```javascript
  function Foo() { /* ... */ }
  Foo.prototype = { /* ... */ };
  
  var a1 = new Foo();
  a1.constructor === Foo; // false
  a1.constructor === Object; // true
  ```

  - `Foo()` 가 생성의 주체라고 여기지만 ‘생성자’가 ‘~에 의해 생성됨’이란 뜻이라고 착각하는 순간 그 때부터 혼돈의 카오스가 시작된다.
  - `a1`에는 `.constructor` 프로퍼티가 없으므로 `[[Prototype]]` 연쇄를 따라 올라가 `Foo.prototype` 객체에 위임한다.
  - 하지만 이 객체에도 `.constructor` 프로퍼티는 없으므로 계속 상위 객체로 위임하다가 결국 `[[Prorotype]]` 연쇄 끝자락의 `Object.prototype` 객체에 이르게 된다.
  - 이 객체는 `.constructor` 프로퍼티를 당연히 갖고 있으니 결국 내장 `Object()` 함수를 가리키게 된 것이다.
  - 물론 아래 예시와 같이 `.constructor` 프로퍼티를 지정할 수도 있지만 상당히 번거로운 일이다.

  ```javascript
  function Foo() { /* ... */ }
  Foo.prototype = { /* ... */ };
  
  Object.defineProperty(Foo.prototype, 'constructor', {
    enumerable: false,
    writable: true,
    configurable: true,
    value: Foo, // 'constructor'가 'Foo'를 가리키게 된다.
  });
  ```

  - 잊지 말아야 하는 사실은 <b><u>“생성자는 ‘생성됨’을 의미하지 않는다!”</u></b>

- 또, `.constructor` 프로퍼티는 마법의 불변 프로퍼티가 아니다.

  - 열거 불가지만 값은 쓰기가 가능하며 게다가 `[[Prototype]]` 연쇄에 존재하는 ‘constructor’라는 이름의 프로퍼티를 추가하거나 다른 값으로 덮어쓰는 것도 가능하다.
  - `.constructor` 프로퍼티가 우리가 예상하는 것과 전혀 다른 객체를 가리킬 수도 있다는 의미이다.

- 결론적으로, `a1.constructor` 같은 임의의 객체 프로퍼티는 실제로 기본 함수를 참조하는 레퍼런스라는 보장이 전혀 없다.

  - <b><u>`.constructor` 프로퍼티에 직접 접근하는 방식은 매우 불안정하고 신뢰할 수 없는 레퍼런스이므로 될 수 있는 대로 코드에서 직접 사용하지 않는 게 상책이다.</u></b>

<br>

### :heavy_plus_sign: 함수 객체의 `prototype` 프로퍼티

> [출처] 모던 자바스크립트 Deep Dive - ‘19.3.2 함수 객체의 prototype 프로퍼티’ 절에서 발췌한 내용입니다.

- 함수 객체만이 소유하는 `prototype` 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

```javascript
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function() {}).hasOwnProperty('prototype'); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}).hasOwnProperty('prototype'); // false
```

- `prototype` 프로퍼티는 생성자 함수가 생성할 객체(인스턴스)의 프로토타입을 가리킨다.
  - 따라서 생성자 함수로서 호출할 수 없는 함수, 즉 `non-constructor`인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 `prototype` 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.
- 모든 객체가 가지고 있는(엄밀히 말하면 `Object.prototype`으로부터 상속받은) `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 `prototype` 프로퍼티는 동일한 프로토타입을 가리킨다.
  - 하지만 이들 프로퍼티를 사용하는 주체가 다르다.

| 구분                        | 소유          | 값                | 사용 주체   | 사용 목적                                                    |
| --------------------------- | ------------- | ----------------- | ----------- | ------------------------------------------------------------ |
| `__proto__` 접근자 프로퍼티 | 모든 주체     | 프로토타입의 참조 | 모든 객체   | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용      |
| `prototype` 프로퍼티        | `constructor` | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('wally');

console.log(Person.prototype === me.__proto__); // true
```

<br>

## 3. 프로토타입 상속

(작성중...)

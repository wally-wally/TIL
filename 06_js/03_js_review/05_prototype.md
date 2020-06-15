# 05. prototype

<br>

## 1. prototype

- 자바스크립트의 모든 객체는 자신의 **"원형(Prototype)"** 이 되는 객체를 가지며 이를 프로토타입이라고 한다. 
- 보이지 않는 속성인 `[[Prototype]]` 이 자신의 프로토타입 객체를 참조한다. 이를 `__proto__` 라는 속성으로 참조할 수 있으나 이는 비표준이고 모든 브라우저에서 동작하는 것은 아니기 때문에 실제로 사용하는 것은 피해야 한다.
- 생성자 함수의 `prototype`(Prototype Object)과 인스턴스의 `__proto__`(Prototype Link)는 같은 객체를 참조한다.
  - 하지만 `__proto__`는 내부 프로퍼티에 접근할 때 생략할 수 있다.
- example - `Array`
  - `Array.prototype`은 객체 인데 이 안에 Array와 관련된 메소드들이 담겨 있다.

<img src="https://user-images.githubusercontent.com/52685250/84612377-71f30e00-aefb-11ea-9938-a847e91686ec.png" width="600">

<br>

## 2. 생성자 함수와 prototype

- 생성자 함수의 prototype에 접근 하는 방법
  - `[CONSTRUCTOR].prototype`
  - `[instance].__proto__`
  - `[instance]`
  - `Object.getPrototypeOf([instance])`

- 생성자 함수에 접근 하는 방법
  - `[CONSTRUCTOR]`
  - `[CONSTRUCTOR].prototype.constructor`
  - `[instance].__proto__.constructor`
  - `[instance.constructor]`
  - `(Object.getPrototypeOf([instance])).constructor`

- 간단하게 정리하면 아래와 같다.

```javascript
// 아래 두 구문은 Array() 함수라는 동일한 값을 출력한다.
[1, 2, 3].constructor
[1, 2, 3].__proto__.constructor
```

- 정리
  - `new` 연산자로 새로운 객체 `computer`를 생성하면, `computer`의 프로토타입 객체는 생성자 함수로 사용한 `Computer`의 속성인 `Computer.prototype`이 된다.
  - `Computer.prototype`은 `constructor` 속성을 가지며 이는 실제 객체 `Computer`를 가리킨다.
  - `Computer.prototype` 또한 객체이므로 `__proto__`를 가지고 있는 모든 객체의 원형이 되는 객체인 `Object.prototype`을 가리킨다.

```javascript
function Computer(n, p) {
  this.name = n;
  this.price = p;
}

var computer = new Computer('MacBook', 1500000);

var computer1 = new computer.__proto__.constructor('MacBook1', 1600000);

var computer2 = new computer.constructor('MackBook2', 2000000);

var computerProto = Object.getPrototypeOf(computer);
var computer3 = new computerProto.constructor('Macbook3', 2200000);

var computer4 = new Computer.prototype.constructor('Macbook4', 2500000);
```

<br>

## 3. 메소드 상속 및 동작 원리

```javascript
function student(n, a) {
  this.name = n;
  this.age = a;
}

var student1 = new Student('wally', 27);
var student2 = new Student('Hong', 25);

student1.setOlder = function() {
  this.age += 1;
}

student1.getAge = function() {
  return this.age;
}

student2.setOlder = function() {
  this.age += 1;
}

student2.getAge = function() {
  return this.age;
}
```

- 위 코드에서 `.setOlder`와 `.getAge` 부분이 반복되는 것을 볼 수 있다.
- 반복되는 코드를 줄이기 위해 `prototype`을 사용하면 아래와 같이 작성할 수 있다.

```javascript
function student(n, a) {
  this.name = n;
  this.age = a;
}

Person.prototype.setOlder = function() {
  this.age += 1;
}

Person.prototype.getAge = function() {
  return this.age;
}

var student1 = new Student('wally', 27);
var student2 = new Student('Hong', 25);
```

```javascript
// 왜냐하면 이 메소드의 this가 student1가 아니라 student1의 proto를 가리키기 때문이다.
student1.__proto__.setOlder();
student1.__proto__.getAge(); // NaN 출력

// __proto__는 생략이 가능하므로 이 때는 this가 마치 자신(student1)인 것처럼 메소드를 호출할 수 있다.
// 그래서 이 때는 올바르게 출력됨을 볼 수 있다.
student1.setOlder();
student1.getAge(); // 28 출력
```

```javascript
// 생성자 함수의 prototype에 age라고 하는 프로퍼티가 아래와 같이 있었다고 하면 결과가 달라진다.
Student.prototype.age = 50;
student1.__proto__.setOlder();
student1.__proto__.getAge(); // 51 출력

student1.setOlder();
student1.getAge(); // 28 출력
```

- `Student.prototype` === `student1.__proto__`이다.
- 그래서 `Student.prototype.age` === `student1.__proto__.age`가 되는 것이다.
- `student1.__proto__.setOlder()`를 실행하면 이는 메소드를 호출한 것이므로 이 때의 this는 `.` 앞에 까지 즉, `student1.__proto__`가 되고 이는 `Student.prototype`과 같기 때문에 `Student.prototype`의 age 값이 1 증가하게 된다.
- 한편 `student1.getAge()`를 실행하면 역시 메소드를 호출한 것이므로 이 때의 this는 `.` 앞에까지 즉, `stduent1`이 되므로 `student1`의 age 값이 1 증가하게 된다.
- <b>메소드 호출시 this가 어떻게 binding 되는지를 확실하게 구분하자!</b>

<br>

## 4. prototype chaining

### (1) prototype chaining 이란?

- 어떤 객체의 프로퍼티를 참조하거나 값을 할당할 때 **해당 객체에 프로퍼티가 없을 경우, 그 객체의 프로토타입 객체를 연쇄적으로 보면서 프로퍼티를 찾는 방식**
  - 단, 참조할 때와 값을 할당할 때의 메커니즘이 다르니 기억해두어야 한다.
- **프로퍼티를 참조할 때**
  * 찾고자 하는 프로퍼티가 객체에 존재하면 사용한다.
  * 없으면 `__proto__` 링크를 타고 끝까지 올라가면서 해당 프로퍼티를 찾는다.
  * 찾으면 그 값을 사용하고 없으면 `undefined` 를 반환한다.
- **프로퍼티에 값을 할당할 때**
  * 찾고자 하는 프로퍼티가 객체에 존재하면 값을 바꾼다.
  * 프로퍼티가 없고 `__proto__`  링크를 타고 올라가서 해당 프로퍼티를 찾았을 경우
    * 그 프로퍼티가 변경가능한 값, 즉 `writable: true` 라면 새로운 직속 프로퍼티를 할당해서 상위 프로퍼티가 가려지는 현상이 발생한다.
    * 그 프로퍼티가 변경불가능한 값, 즉 `writable: false` 라면 비엄격 모드에선 무시되고 엄격 모드에선 에러가 발생한다.
    * 해당 프로퍼티가 세터(setter) 일 경우, 이 세터가 호출되고 가려짐이 발생하지 않는다.

---

:heavy_check_mark: <b>프로퍼티를 참조할 때  vs 프로퍼티에 값을 할당할 때</b>

여기서 말하는 **"가려짐"** 이란, 상위 프로토타입 객체에 동일한 이름의 프로퍼티가 있는 경우, 하위 객체의 프로퍼티에 의해 가려지는 현상을 말한다.

```javascript
function Func() {}
Func.prototype.num = 2;
var a = new Func();
a.num = 1;
console.log(a.num); // 1
```

위 코드의 경우 객체 `a` 의 프로토타입 객체인 `Func.prototype` 에 `num` 이 있지만 `a.num = 1` 로 인해 가려짐 현상이 발생해서 1을 출력한다.

```javascript
function Func() {}
Object.defineProperty(Func.prototype, "num", {
  value: 2,
  writable: false
})
var a = new Func();
a.num = 1; // 무시됨
console.log(a.num); // 2
```

그러나 `defineProperty()` 를 사용해서 변경불가능한 프로퍼티로 만들면, 비엄격모드에서 무시되서 2를 출력한다.

---

- `Object.prototype` 안에는 Javascript를 통괄하는 모든 메소드들이 담겨 있다.
  - `hasOwnProperty()`
  - `toString()`
  - `valueOf()`
  - `isPrototypeOf()`
- 이 메소드들은 모든 데이터 타입이 prototype chaining을 통해서 접근이 가능하다.

- 하지만 객체(Object) 입장에서는 억울할 수 밖에 없다.
- `Object.prototype`에 있는 메소드들은 chaining을 통해 모든 데이터 타입에서 사용할 수 있기 때문에 객체 데이터 타입에서만 사용할 수 있는 메소드를 이 안에 적을 수 없다.
- 결국 어쩔 수 없이 객체 생성자 함수 `Object()`에 직접 메소드를 선언할 수 밖에 없다.
  - 그래서 객체 리터럴에는 `prototype` 키워드 없이  `Object.assign()`, `Object.freeze()`, `Object.create()`와 같은 메소드들이 자꾸 생겨나는 것도 바로 이러한 상속 구조 때문이다.

<br>

### (2) prototype chaining 예제

- <b>prototype chaining 예제(1) - `Array`</b>

```javascript
// 배열에는 .toString() 이라는 메소드가 없음에도 불구하고 chaining 때문에 접근이 가능하다.
var arr = [1, 2, 3];
console.log(arr.toString()); // 1,2,3

// 만약 내용은 다르지만 이름이 같은 메소드를 배열 리터럴에 직접 할당하면
arr.toString = function() {
  return this.join('_');
}

console.log(arr.toString()); // 직접 할당한 메소드가 바로 호출된다. 1_2_3

console.log(arr.__proto__.toString.call(arr)); // 1,2,3

console.log(arr.__proto__.__proto__.toString.call(arr)); // [object Array]
```

- 배열인 데이터는 모두 동일한 출력을 얻도록 하기 위해서는 아래와 같이 작성하면 된다.

```javascript
var arr = [1, 2, 3];
// 아래와 같이 작성하면 배열에서 직접 호출한 것과 prototype에서 호출한 것과 동일한 결과가 나온다.
Array.prototype.toString = function() {
  return '[' + this.join(', ') + '];
}

console.log(arr.toString()); // [1, 2, 3]

console.log(arr.__proto__.toString.call(arr)); //[1, 2, 3]

console.log(arr.__proto__.__proto__.toString.call(arr)); // [object Array]
```

<br>

- <b>prototype chaining 예제(2) - `Object`</b>

```javascript
var obj = {
  a: 1,
  b: {
    c: 'c'
  }
};

console.log(obj.toString()); // [object Object]
```

- 객체 내용을 문자열로 이쁘게 출력하기 위해 객체 리터럴에  `toString` 메소드를 obj 안에 작성했다.

```javascript
var obj = {
  a: 1,
  b: {
    c: 'c'
  },
  toString: function() {
    var res = [];
    for(var key in this) {
      res.push(key + ': ' + this[key].toString());
    }
    return '{' + res.join(', ') + '}';
  }
};

console.log(obj.toString());
```

- 하지만 위와 같이 작성하면 toString 안의 함수 내용이 그대로 출력되고 `b`에 대한 value도 `[object Object]`와 같이 나와서 이쁘지가 않다.

![00](https://user-images.githubusercontent.com/52685250/84633278-1fc9e100-af2b-11ea-9e40-5d1d55a6a70b.JPG)

- 그래서 Object.prototype의 toString을 아래와 같이 작성했다.

```javascript
var obj = {
  a: 1,
  b: {
    c: 'c'
  }
};

Object.prototype.toString = function() {
  var res = [];
  for(var key in this) {
    res.push(key + ': ' + this[key].toString());
  }
  return '{' + res.join(', ') + '}';
}

console.log(obj.toString());
```

<br>

- <b>prototype chaining 예제(3) - `객체 안에 배열이 있는 경우`</b>

```javascript
var obj = {
  a: 1,
  b: {
    c: 'c'
  },
  d: [5, 6, 7],
  e: function() {}
};

Object.prototype.toString = function() {
  var res = [];
  for(var key in this) {
    res.push(key + ': ' + this[key].toString());
  }
  return '{' + res.join(', ') + '}';
}

Array.prototype.toString = function() {
  return '[' + this.join(', ') + '];
}

console.log(obj.toString());
```


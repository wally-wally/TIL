# 05. this

>  EC(Execution Context)가 생성(함수를 호출)될 때마다 this의 바인딩이 일어난다.

<br>

## (1) 전역공간에서

- **전역객체**를 가리킨다.
  - browser상 : window 객체
  - node.js상 : global 객체



## (2) 함수 호출시

- **전역객체**를 가리킨다.

```js
function a() {
  console.log(this); // window
}

a();
```

```js
function b() {
  function c() {
    console.log(this); // window
  }
  c();
}

b();
```

```js
var d = {
  e: function() {
    function f() {
      console.log(this); // window
    }
    f();
  }
}

d.e();
```



## (3) 메소드 호출시

- **메소드 호출 주체 (메소드명 앞)**가 this가 된다. => 점 앞에꺼
- **객체의 메소드로 호출할 경우 해당 객체에 바인딩된다.**

```js
var a = {
  b: function() {
    console.log(this); // a
  }
}

a.b();
```

```js
var a = {
  b: {
    c: function() {
      console.log(this); // a.b
    }
  }
}

a.b.c();
```

- cf) 함수는 (전역객체의) 메서드이다.
  - 즉, c()는 window.c()가 생략된 것으로 생각하면 쉽다.

<br>

### :heavy_check_mark: 내부함수에서의 우회법

```js
var a = 10;
var obj = {
  a: 20,
  b: function() {
    console.log(this.a); // 20
      
    function c() {
      console.log(this.a); // 10
    }
    c();
  }
}

obj.b();
```

```js
var a = 10;
var obj = {
  a: 20,
  b: function() {
    var self = this; // 내부함수의 this가 전역객체를 참조하는 것을 회피하는 방법
    console.log(this.a); // 20
      
    function c() {
      console.log(self.a); // 20
    }
    c();
  }
}

obj.b();
```



## (4) call, apply, bind => 명시적으로 this 선언하는 방법

- **call, apply, bind와 같은 명시적 바인딩을 사용했을 때 인자로 전달된 객체에 바인딩된다.**

```JS
function a(x, y, z) {
  console.log(this, x, y, z);
}

var b = {
  c: 'eee'
};

a.call(b, 1, 2, 3); // a를 호출할 건데 this를 b로 하고 인수로 1, 2, 3으로 할 것이다.

a.apply(b, [1, 2, 3]); // call 메서드와 의미는 같고 넘기는 인수를 배열 형태로 정함

var c = a.bind(b); // this가 b를 가리키는 함수를 변수 c에 담은 것이다.
c(1, 2, 3);

var d = a.bind(b, 1, 2); // this를 b로 하고 해당 함수의 첫 번째 인자와 두 번째 인자를 1, 2로 고정시 킨 새로운 함수를 만들고 나머지 변수를 지정했을 때 함수를 호출한다.
d(3);
```

- 모두 실행 결과는 `Object {c: "eee"} 1 2 3`으로 동일하다.

```js
var a = 10;
var obj = {
  a: 20,
  b: function() {
    console.log(this.a); // 20
      
    function c() {
      console.log(this); // {a: 20, b: f}
    }
    c.apply(this);
  }
}

obj.b();
```

```js
var a = 10;
var obj = {
  a: 20,
  b: function() {
    console.log(this.a); // 20
      
    function c() {
      console.log(this); // {a: 20, b: f}
    }
    c.bind(this)();
  }
}

obj.b();
```

<br>

## (5) callback 함수로 호출시

- 기본적으로는 함수 내부에서와 동일하다. => 전역 객체
- 하지만 제어권을 가진 함수가 callback의 this를 명시한 경우 그에 따른다.
- 개발자가 this를 바인딩한 채로 callback을 넘기면 그에 따른다.

```js
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

```js
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

<br>

## (6) 생성자함수 호출시

- `new` 연산자 사용시 => 생성자함수로 호출한 인스턴스를 가리킴

<br>

### :heavy_check_mark: 그 외의 경우

- strict mode일 때는 `undefined`로 초기화된다.
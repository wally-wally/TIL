# 03. this

<br>

## 1. 전역공간에서 => 전역 객체(`window`, `global`)

- 브라우저 콘솔에서 : `window` 객체
- node.js에서 : `global` 객체

<br>

## 2. 함수 내부에서 => 전역 객체(`window`, `global`)

- 함수 내부에서 `this`는 기본적으로 전역 객체를 가리킨다.

<br>

## 3. 메소드 호출시 => 메소드 호출 주체 (`메소드명 앞`)

- 즉 <b>`.` 앞에 있는게 호출</b>된다고 생각하면 쉽다.
- 함수는 (전역객체의) 메소드다!(라고 생각하자)

```javascript
var a = {
  b: function() {
    console.log(this); // a 객체
  }
}

a.b();
```

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

- 내부함수에서의 우회법
  - `b` 라고 하는 것은 메소드이고 `c`는 함수이기 때문에 출력되는 `this.a`가 서로 다르다.

```javascript
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

- `c()` 함수 내부에서 `this.a` 에도 20이 출력되게 하기 위해서는 `스코프 체인`을 이용하면 된다.

```javascript
var a = 10;
var obj = {
  a: 20,
  b: function() {
    var self = this; // 개발자 취향에 따라 변수명은 self가 꼭 아니여도 된다.
    console.log(this.a); // 20
      
    function c() {
      console.log(self.a); // 20
    }
    
    c();
  }
}

obj.b();
```

<br>

## 4. callback에서 => 기본적으로는 함수 내부에서와 동일

- <b>기본적으로는 함수 내부에서와 동일하지만 `call`, `apply`, `bind`를 통해서 다른 대상을 `this`로 바인딩할 수 있다.</b>

### (1) call, apply, bind

```javascript
function a(x, y, z) {
  console.log(this, x, y, z);
}

var b = {
  c: 'eee'
}

a.call(b, 1, 2, 3);

a.apply(b, [1, 2, 3]);

var c = a.bind(b);
c(1, 2, 3);

var d = a.bind(b, 1, 2);
d(3);
```

```
// 결과는 모두 아래와 같다.
Object {c: "eee"} 1 2 3
```

- `func.call(thisArg[, arg1[, arg2[, ...]]])`
- `func.apply(thisArg[, argsArray])`
- `func.bind(thisArg[, arg1[, arg2[, ...]]])`
- `thisArg`는 개발자가 해당 인자 위치에 첫 번째 인자로 넣은 값을 `func` 함수 내부에서 `this`로 설정하겠다는 의미이다.
- `call`과 `apply`는 즉시 호출하는 명령이고, `bind`는 새로운 함수를 생성(currying)할 뿐 호출을 담당하지 않는다.
  - 즉, 마지막 구문을 보면 `b`를 `this`로 사용할 것이고 인자는 1과 2를 미리 넣어두고 이렇게 해서 새로 만들어진 함수를 변수 `d`에 담는다. 그리고 `d`는 함수인데 1과 2는 받지 말고 그 뒤에 있는 세 번째 인자만 받게 해달라는 의미이다.

<br>

### (2) 콜백함수에서 this

```javascript
var callback = function() {
  console.dir(this);
};

var obj = {
  a: 1,
  b: function(cb) {
    cb(); // 단순히 callback 함수를 실행하기만 할 뿐이므로 이 때 this는 Window이다.
    
    console.log(this); // obj 객체 그 자체
    // 콜백함수의 제어권을 넘겨 받은 함수나 메소드가 this를 다른 곳으로 명시하면 다른 결과가 나온다.
    cb.call(this); // 이 때 this는 obj 객체가 출력된다.
  }
};

obj.b(callback);
```

```javascript
var callback = function() {
  console.dir(this); // Window 전역 객체
};

var obj = {
  a: 1
};

setTimeout(callback, 100);
```

```javascript
var callback = function() {
  console.dir(this); // obj 객체 그 자체
};

var obj = {
  a: 1
};

setTimeout(callback.bind(obj), 100);
```

- <b>콜백함수에서의 this는 기본적으로 함수의 this와 같다.</b>
- <b>하지만 제어권을 가진 함수가 callback의 this를 명시한 경우 그에 따른다.</b>
- <b>개발자가 this를 바인딩한 채로 callback을 넘기면 그에 따른다.</b>

```javascript
document.body.innerHTML += '<div id="a">클릭!</div>';

document.getElementById('a')
  .addEventListener('click', function() {
    console.dir(this); // id가 "a"인 div DOM 객체
  })
```

```javascript
document.body.innerHTML += '<div id="a">클릭!</div>';
var obj = { a: 1 };

document.getElementById('a')
  .addEventListener('click', function() {
    console.dir(this); // obj 객체
  }.bind(obj)); // 만약 제어권을 넘겨 받은 함수가 이와 같이 binding 되면 this는 obj 객체 그 자체가 된다.
```

<br>

## 5. 생성자함수에서 => 인스턴스

```javascript
function Person(n, a) {
  this.name = n;
  this.age = a;
}

var wally = new Person('월리월리', 27);
console.log(wally);
```


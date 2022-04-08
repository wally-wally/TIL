# Chapter1. this라나 뭐라나

<br>

## 1. this를 왜?

- 암시적인 객체 레퍼런스를 함께 넘기는 `this` 체계가 API 설계상 좀 더 깔끔하고 명확하며 재사용하기 쉽다.
- 사용 패턴이 복잡해질수록 보통 명시적인 인자로 컨텍스트를 넘기는 방법이 this 컨텍스트를 사용하는 것보다 코드가 더 지저분해진다.
- 암시적 바인딩 vs 명시적 바인딩(다음 장에서 더 자세히...)
- [참고 자료] `this` 의미, 암시적 바인딩 vs 명시적 바인딩 [(바로 이동)](https://191125.tistory.com/59)

<br>

## 2. 헷갈리는 것들

### (1) 자기 자신

- this는 무조건 자기 자신을 가리키지 않는다.
- 렉시컬 스코프
  - 함수를 어디서 선언하는지에 따라 정의되는 스코프(함수의 호출이 아니라 선언!)
  - 컴파일러의 렉싱 타임(lexing time)에서 변수와 스코프 블록을 어디서 작성하는가에 기초해서 코드를 처리할 때 결정

```javascript
var value = 10;

function foo() {
  var value = 20;
  bar();
}

function bar() {
  console.log(value);
}

foo(); // 10
```

```javascript
var a = 10;

function foo() {
  var a = 20;

	function bar() {
		console.log(a);
  }

  bar();
}

foo(); // 20
```

- [참고 자료] 자바스크립트 - 렉시컬 스코프 [(바로 이동)](https://ljtaek2.tistory.com/145)
- [참고 자료] binding 개념과 call, apply, bind의 차이점 [(바로 이동)](https://wooooooak.github.io/javascript/2018/12/08/call,apply,bind/)
- [참고 자료] 함수 호출 call, apply, bind 차이 [(바로 이동)](https://velog.io/@josworks27/%ED%95%A8%EC%88%98%ED%98%B8%EC%B6%9C-call-apply-bind-%EC%B0%A8%EC%9D%B4)

<br>

### (2) 자신의 스코프

- `this`는 어떤 식으로도 함수의 렉시컬 스코프를 참조하지 않는다.

```javascript
function foo() {
  var a = 2;
  this.bar(); // 그냥 bar();로 쓰는게 더 자연스러움
}

function bar() {
  // 이와 같이 렉시컬 스코프 안에 있는 뭔가를 this 레퍼런스로 참조하는건 애당초 가능하지 않다.
	console.log(this.a);
}
```

<br>

## 3. this는 무엇인가?

- `this`는 작성 시점이 아닌 런타임 시점에 바인딩 되며 함수 호출 당시 상황에 따라 컨텍스트가 결정된다.
- 함수 선언 위치와 상관 없이 this 바인딩은 오로지 어떻게 함수를 호출했느냐에 따라 정해진다.
- 실행 컨텍스트 안에 함수가 호출된 근원(call stack)과 호출 방법, 전달된 인자 등의 정보가 담겨있다.

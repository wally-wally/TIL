# 03-01. 기이한 이름

<br>

## :hand: Intro

- 개발을 하면서 가장 어려운 상황이 이름을 짓는 순간이다.
- 이름만 보고도 어떤 값인지 어떤 기능을 수행하는 로직인지 명확하게 알 수 있도록 이름을 짓는 것이 생각보다 많이 어렵다.
- 리팩토링 책에서 소개하는 이름 짓기와 관련된 기법으로 세 가지가 있는데 살펴보자.

<br>

## (1) 함수 선언 바꾸기

- 함수는 실질적으로 소프트웨어 시스템의 구성 요소를 조립하는 연결부 역할을 하는데 이 때 연결부에서 가장 중요한 요소는 함수의 이름이다.
  - 이름이 좋으면 함수의 구현 코드를 살펴볼 필요 없이 호출문만 보고도 무슨 일을 하는지 파악할 수 있다.
  - 함수 뿐만 아니라 매개변수도 마찬가지다.
- 참고로 처음부터 좋은 이름을 짓는 것은 쉽지 않은 일이다.
  - 그래서 좋은 이름을 떠올리는 데 효과적인 방법으로 주석이 있다.
  - 주석을 작성하여 함수의 목적을 설명하고 그러다 보면 주석으로 작성한 내용에서 좋은 이름을 떠올리게 되는 순간이 있다.

---

- 예를 들어 원의 둘레를 구하는 함수가 있다고 가정하자.

```javascript
// before
function circum(r) {
  return 2 * Math.PI * r;
}
```

- 위 코드에서 함수 이름과 매개변수 이름을 보면 어떤 의미인지 쉽게 파악할 수 없다.

```javascript
// after
function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

- 하지만 위와 같이 원의 둘레를 의미하는 'circumference', 그리고 반지름을 의미하는 'radius'와 같이 이름을 명확하게 작성하면 이 함수가 어떤 동작을 수행하는지 쉽게 파악할 수 있다.

---

- 함수 선언 바꾸기의 다른 예시를 살펴보자. - 고객이 뉴잉글랜드에 살고 있는지 확인하는 함수

```javascript
// before
function inNewEngland(customer) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(customer.address.state);
}

// 호출문
const newEnglanders = customers.filter((customer) => inNewEngland(customer));
```

- 위 코드에서 `inNewEngland` 함수를 주(state) 식별 코드를 매개변수로 받도록 리팩토링하여 고객에 대한 의존성을 제거하여 더 넓은 문맥에서 활용될 수 있도록 할 것이다.

```javascript
// after
function inNewEngland(stateCode) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

// 호출문
const newEnglanders = customers.filter((customer) => inNewEngland(customer.address.state));
```

---

<br>

## (2) 변수 이름 바꾸기

- 앞에서 살펴본 '(1) 함수 선언 바꾸기' 쳅터와 유사한 내용이다. 
  - 사용하는 변수의 이름을 변경하여 맥락으로부터 변수의 목적을 명확히 알 수 있어야 한다.
  - 특히 함수 호출 한 번으로 끝나지 않고 값이 영속되는 필드라면 이름이 더 신경 써야 한다.

---

- 예시1) 상수 이름 바꾸기

```javascript
// before
const cpyNm = 'company';

// after
const companyName = 'company';
```

---

- 예시2) 변수 캡슐화하기

```javascript
let tpHd = 'untitled';
```

- 위와 같은 변수가 있다고 가정하자.

```javascript
result += `<h1>${tpHd}</h1>`;

tpHd = obj['articleTitle'];
```

- 변수를 읽을 수도 있고 값을 수정하는 경우도 있다.

```javascript
// tpHd 변수의 getter
function title() {
  retun tpHd;
}

// tpHd 변수의 setter
function setTitle(arg) {
  tpHd = arg;
}
```

- 이러한 경우 변수 캡슐화 작업을 진행한다.

```javascript
let _title = 'untitled';

result += `<h1>${title()}</h1>`;

setTitle(obj['articleTitle']);

// getter
function title() {
  retun _title;
}

// setter
function setTitle(arg) {
  _title = arg;
}
```

---

### :heavy_plus_sign: 캡슐화(encapsulation)

- 캡슐화는 일반적으로 연관 있는 변수와 함수를 묶어서 그 중 일부를 외부에서 사용하지 못하도록 은닉화하는 작업을 말한다.
- 일반적인 OOP 언어에서는 `public`, `protected`, `private`와 같은 접근 지정자를 제공하여 캡슐화 작업을 할 수 있다.
- 기본적으로 javascript 에서는 `_`를 이름 앞에 붙여서 암묵적으로 `private` 또는 `protected`의 의미로 쓰이고 있다.

- 캡슐화는 객체의 필드(속성), 메소드를 하나로 묶고, 실제 구현 내용을 외부에 감추는 것을 말한다.
- 위부 객체는 객체 내부의 구조를 얻지 못하며 객체가 노출해서 제공하는 필드와 메소드만 이용할 수 있다.
- 이와 같은 정보은닉을 통해서 유지보수나 확장시 오류의 범위를 최소화 할 수 있고 객체 내의 정보가 손상되는 것을 막을 수 있다.
- 객체를 모듈화 할 수 있어서 새로운 시스템의 구성에 하나의 모듈처럼 사용이 가능하다.

```javascript
// 캡슐화 예시(모던 자바스크립트 9.3.3 데이터의 캡슐화 예시 코드 변형)
// 즉시 실행 함수로 클로저를 생성하여 데이터를 객체 외부에서 읽고 쓸 수 없도록 접근자 프로퍼티만 읽고 쓰도록 만든 예시 코드

const user = (function() {
  // private variable(IIFE의 지역 변수이므로 함수 바깥에서 읽거나 쓸 수 없음)
  let _name = 'Wally';
    
  return {
    get name() {
      return _name;
    },
      
    set name(value) {
      const capitalizedStr = value.charAt(0).toUpperCase() + value.substring(1);
      _name = capitalizedStr;
    }
  }
})();

console.log(user.name); // 'Wally'
user.name = 'mally'; // 접근자 프로퍼티에 값을 대입
console.log(user.name); // 'Mally'
```

---

<br>

## (3) 필드 이름 바꾸기

- '필드 이름 바꾸기' 또한 이전에서 살펴보았던 내용과 유사하므로 간단하게 절차만 확인하고 넘어가자.
  - 레코드의 유효 범위가 제한적이라면 필드에 접근하는 모든 코드를 수정한 후 테스트한다.(이후 단계는 필요 없음)
  - 레코드가 캡슐화되지 않았다면 우선 레코드를 캡슐화한다.(class 형태로 만들기)
  - 캡슐화된 객체 안의 private 필드명을 변경하고, 그에 맞게 내부 메소드들을 수정한다.
  - 테스트 후 생성자의 매개변수 중 필드와 이름이 겹치는 게 있다면 함수 선언 바꾸기로 변경한다.
  - 접근자들의 이름도 바꿔준다.

# Chapter05. 더 좋은 액션 만들기

<br>

## 1. 암묵적 입력과 출력은 적을수록 좋다

- 인자가 아닌 모든 입력은 암묵적 입력이고 리턴값이 아닌 모든 출력은 암묵적 출력이다.
- 계산 뿐만 아니라 액션에서도 암묵적 입력과 출력을 줄이면 좋다.
- 어떤 함수에 암묵적 입력과 출력이 있다면 다른 컴포넌트와 강하게 연결된 컴포넌트라고 할 수 있다.
  - 다른 곳에서 사용할 수 없기 때문에 모듈이 아니다.
  - 이런 함수의 동작은 연결된 부분의 동작에 의존한다.
- 암묵적 입력과 출력을 명시적으로 바꿔 모듈화된 컴포넌트로 만들 수 있다.
- 암묵적 입력과 출력이 있느 함수는 아무 때나 실행할 수 없기 때문에 테스트하기 어렵다.
  - 모든 입력값을 설정하고 테스트를 돌린 후에 모든 출력값을 확인해야 한다.
  - 입력과 출력이 많을수록 테스트는 더 어려워진다.
- 계산은 암묵적 입력과 출력이 없어 테스트하기 쉽다.
- 모든 암묵적 입력과 출력을 없애지 못해 액션을 계산으로 바꾸지 못해도 암묵적 입력과 출력을 줄이면 테스트하기 쉽고 재사용하기 좋다.

<br>

## 2. 의미 있는 계층으로 나누기

- 분류 기준
  - C: `cart`에 대한 동작
  - I: `item`에 대한 동작
  - B: 비즈니스 규칙
  - A: 유틸리티 함수
- 현재 코드

```javascript
var shopping_cart = [];

function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);
  var total = calc_total(shopping_cart);
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);
}

function add_item(cart, name, price) { // C, I
  var new_cart = cart.slice();
  new_cart.push({
    name, price
  });
  return new_cart;
}

function calc_total(cart) { // C, I, B
  var total = 0;
  for (var i = 0; i < cart.length; i += 1) {
    var item = cart[i];
    total += item.price;
  }
  return total;
}

function update_shipping_icons(cart) {
  var buttons = get_buy_buttons_dom();
    
  for (var i = 0; i < buttons.length; i += 1) {
    var button = buttons[i];
    var item = buttom.item;
    var new_cart = add_item(cart, item.name, item.price);
      
    if (gets_free_shipping(new_cart)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}

function gets_free_shipping(cart) { // B
  return calc_total(cart) >= 20;
}

function update_tax_dom(total) {
  set_tax_dom(calc_tax(total));
}

function calc_tax(amount) { // B
  return amount * 0.10;
}
```

<br>

## 3. 함수가 잘 분리되어있을 때 좋은 점

- 재사용하기 쉽다.
  - 함수는 작으면 작을수록 재사용하기 쉽다.
  - 하는 일도 적고 쓸 때 가정을 많이 하지 않아도 된다.
- 유지보수하기 쉽다.
  - 작은 함수는 쉽게 이해할 수 있고 유지보수하기 쉽다.
  - 코드가 작기 때문에 올바른지 아닌지 명확하게 알 수 있다.
- 테스트하기 쉽다.
  - 작은 함수는 테스트하기 좋다.
  - 한 가지 일만 하기 때문에 한 가지만 테스트하면 된다.
  - 함수에 특별한 문제가 없어도 꺼낼 것이 있다면 분리하는 것이 좋다.
  - 그렇게 하면 더 좋은 설계가 된다.

<br>

## 4. 리팩토링

### (1) `add_item()`

- 기존 `add_item ` 함수는 `cart`와 `item` 구조를 모두 알고 있어 `item`에 관한 코드를 별도의 함수로 분리한다.

```javascript
// item 구조만 알고 있음
function make_cart_item(name, price) {
  return {
    name,
    price,
  };
}

// cart 구조만 알고 있음
// 이 함수 구현체의 경우 카피-온-라이트를 구현한 부분이므로 함께 두는 것이 좋다.
function add_item(cart, item) {
  var new_cart = cart.slice();
  new_cart.push(item);
  return new_cart;
}

// 호출하는 부분 수정
function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, make_cart_item(name, price));
  // 생략
}
```

-  위와 같이 수정하면 `cart`와 `item`을 독립적으로 확장할 수 있다.
  - 예를 들어 배열인 `cart`를 해시 맽 같은 자료 구조로 바꾼다고 할 때 변경해야 할 부분이 적다.

<br>

### (2) 카피-온-라이트 패턴 빼내기

- 유틸리티 함수의 성격을 띠는 함수의 경우 함수 이름과 인자 이름을 더 일반적인 이름으로 바꾼다.

```javascript
function add_element_last(array, elem) {
  var new_array = array.slice();
  new_array.push(elem);
  return new_array;
}

function add_item(cart, item) {
  return add_element_last(cart, item);
}
```

<br>

### (3) 개선된 코드에서 계산 다시 분류해보기

```javascript
function add_element_last(array, elem) { // A
  var new_array = array.slice();
  new_array.push(elem);
  return new_array;
}

function add_item(cart, item) { // C
  return add_element_last(cart, item);
}

function make_cart_item(name, price) { // I
  return {
    name,
    price,
  };
}

function calc_total(cart) { // C, I, B
  var total = 0;
  for (var i = 0; i < cart.length; i += 1) {
    var item = cart[i];
    total += item.price;
  }
  return total;
}

function gets_free_shipping(cart) { // B
  return calc_total(cart) >= 20;
}

function calc_tax(amount) { // B
  return amount * 0.10;
}
```

<br>

---

#### :grey_question: 비즈니스 규칙과 장바구니 기능의 차이

- 장바구니는 대부분의 전자상거래 서비스에서 사용하는 일반적인 개념이다.
  - 그리고 장바구니가 동작하는 방식도 모두 비슷하다.
- 하지만 비즈니스 규칙은 다르다.
  - 이 책에 나와 있는 예시를 보면 MegaMart에서 운영하는 특별한 규칙이라고 할 수 있다.
- 예를 들어 다른 전자상거래 서비스에도 장바구니 기능이 있을 것이라고 기대하지만, MegaMart와 똑같은 무료 배송 규칙이 있을 것이라고 기대하지는 않는다.
- 그리고 지금 시점에서는 비즈니스 규칙과 장바구니에 대한 동작이 모두 속한 경우도 있지만 이 부분은 사실 코드에서 나는 냄새다.
- 비즈니스 규칙은 장바구니 구조와 같은 하위 계층보다 빠르게 바뀐다.
- 설계를 진행하면서 이 부분은 분리해야 한다. 추후 뒤에서 더 자세히 살펴보자.

---

<br>

## 5. (p.104) 연습 문제

```javascript
function update_shipping_icons(cart) {
  var buy_buttons = get_buy_buttons_dom();
    
  for (var i = 0; i < buy_buttons.length; i += 1) {
    var button = buy_buttons[i];
    var item = buttom.item;
    var is_available_free_shipping = check_available_free_shipping(cart, item);
    set_show_free_shipping_icon(is_available_free_shipping);
  }
}

function check_available_free_shipping(cart, item) {
  var new_cart = add_item(cart, item);
  return get_free_shipping(new_cart);
}

function set_show_free_shipping_icon(is_free_shippping) {
  if (is_free_shippping) {
    button.show_free_shipping_icon();
  } else {
    button.hide_free_shipping_icon();
  }
}
```

<br>

## :exclamation: 정리

- 일반적으로 <b>암묵적 입력과 출력은 인자와 리턴값으로 바꿔 없애는 것이 좋다.</b>
- 설계는 엉켜있는 것을 푸는 것이다. 풀려있는 것은 언제든 다시 합칠 수 있다.
- 엉켜있는 것을 풀어 <b>각 함수가 하나의 일만 하도록 하면, 개념을 중심으로 쉽게 구성할 수 있다.</b>

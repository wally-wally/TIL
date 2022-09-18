# Chapter04. 액션에서 계산 빼내기

<br>

## 1. 함수에는 입력과 출력이 있습니다

- 어떤 함수 안에 액션이 하나만 있어도 그 함수 전체가 액션이 된다.
- 함수에 암묵적 입력과 출력이 있으면 액션이 된다.
  - 여기서 암묵적 입력과 출력을 '부수 효과'라고 부른다.

```javascript
var total = 0;
function add_to_total(amount) { // 인자는 명시적 입력
  console.log('Old total: ' + total); // 전역변수를 읽는 것은 암묵적 입력이고, 콘솔에 찍는 것은 암묵적 출력
  total += amount; // 전역변수를 바꾸는 것도 암묵적 출력
  return total; // 함수의 리턴값은 명시적 출력
}
```

<br>

##  2. 테스트와 재사용성 측면에서 코드 설계하기

### (1) DOM 업데이트와 비즈니스 규칙은 분리되어야 한다.

- DOM을 업데이트하는 일은 함수에서 어떤 정보가 나오는 것이기 때문에 출력이다.
- 하지만 리턴값이 아니므로 암묵적 출력이고 이러한 DOM 업데이트는 어디선가 해야 한다.

<br>

### (2) 전역변수가 없어야 하며 전역변수에 의존하지 않아야 한다.

- 전역변수를 읽는 것은 암묵적 입력이고 바꾸는 것은 암묵적 출력이다.
- <b>암묵적 인자는 함수의 인자로, 암묵적 출력은 함수의 리턴값으로 바꾸면 된다.</b>

<br>

### (3) DOM을 사용할 수 있는 곳에서 실행된다고 가정하면 안 된다.

- 특정 환경에서만 실행되는 함수를 만드는 것은 가급적 피해야 한다.
- 항상 늘 DOM 요소에 접근할 수 있는 환경이 아닐 수 있다.
- 그리고 DOM을 직접 쓰는 행위는 암묵적 출력인데 이는 함수의 리턴값으로 바꿀 수 있다.

<br>

## 3. 실제 예제

### (1) 예제 1

- before

```javascript
function calc_cart_total() {
  shopping_cart_total = 0; // 암묵적 출력
  for (var i = 0; i < shopping_cart.length; i += 1) { // 암묵적 입력
    var item = shopping_cart[i];
    shopping_cart_total += item.price; // 암묵적 출력
  }
    
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}
```

- after
  - 전역변수 대신 지역변수를 사용하도록 바꾸고 지역변숫값을 리턴하도록 고친다.
  - 그리고 원래 함수는 새 함수의 리턴값을 받아 전역변수에 할당한다.

```javascript
function calc_cart_total() {
  shopping_cart_total = calc_total(shopping_cart);
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom();
}

function calc_total(cart) {
  var total = 0;
  for (var i = 0; i < cart.length; i += 1) {
    var item = cart[i];
    total += item.price;
  }
  return total;
}
```

<br>

### (2) 예제 2

- before

```javascript
function add_item_to_cart(name, price) {
  // 전역변수인 shopping_cart를 읽으면 함수가 안으로 데이터가 들어오기 때문에 암묵적 입력
  // push() 함수로 전역 배열을 바꿔 함수 밖으로 데이터가 나가기 때문에 암묵적 출력
  shopping_cart.push({
    name, price
  });
    
  calc_cart_total();
}
```

- after
  - 호출하는 쪽은 전역변수를 인자로 넘기도록 고쳐 명시적인 입력으로 바꾼다.
  - `shopping_cart` 값을 바꾸는 대신 복사본을 만들고 복사본에 추가해 리턴해야 한다.
    - 이와 같이 어떤 값을 바꿀 때 그 값을 복사해서 바꾸는 방법을 '카피-온-라이트'라고 하며 불변성을 구현하는 방법 중 하나이다. (추후 6장에서 더 자세히...)
  - 그리고 자바스크립트에서는 배열을 직접 복사할 수 없어 이 예제에서는 `Array.prototype.slice()`와 같은 메서드를 사용했다.

```javascript
function add_item_to_cart(name, price) {
  shopping_cart = add_item(shopping_cart, name, price);
  calc_cart_total();
}

function add_item(cart, name, price) {
  var new_cart = cart.slice();
  new_cart.push({
    name, price
  });
  return new_cart;
}
```

<br>

## 4. 계산 추출을 단계별로 알아보기

### (1) 계산 코드를 찾아 빼낸다.

- 빼낼 코드를 찾고 코드를 추출해 새로운 함수를 만들어 리팩토링 한다.
- 새 함수에 인자가 필요하다면 추가한다.
- 원래 코드에서 빼낸 부분에서 새 함수를 부르도록 바꾼다.

<br>

### (2) 새 함수에 임묵적 입력과 출력을 찾는다.

- 암묵적 출력은 함수를 부르는 동안 결과에 영향을 줄 수 있는 것을 말하고 암묵적 출력은 함수 호출의 결과로 영향을 받는 것을 말한다.
- 입력
  - 전역변수 읽는 행위
  - 데이터베이스에서 값을 가져오는 것
- 출력
  - console.log로 데이터 찍는 행위
  - 전역변수의 배열에 원소를 추가하는 행위
  - 전역변수를 바꾸는 행위
  - 공유 객체를 바꾸는 행위
  - 웹 요청을 보내는 것

<br>

### (3) 암묵적 입력은 인자로 암묵적 출력은 리턴값으로 바꾼다.

- 한 번에 하나씩 입력은 인자로 출력은 리턴값으로 바꾼다.
- 새로운 리턴값이 생겼다면 호출하는 코드에서 함수의 결과를 변수에 할당해야 할 수도 있다.
- 여기서 <b>인자와 리턴값은 바뀌지 않는 불변값이라는 것이 중요하다.</b>
- 리턴값이 나중에 바뀐다면 암묵적 출력이다.
- 또 인자로 받은 값이 바뀔 수 있다면 암묵적 출력이다.

```javascript
// 암묵적 출력이 적용된 예시
function f1(arr, value) {
  arr.push(value);
  return arr;
}

const a = [1, 2, 3];
const b = f1(a, 4);
console.log(a); // [1, 2, 3, 4]
console.log(b); // [1, 2, 3, 4]
```

<br>

### 5. (p.79) 연습 문제 - 내가 풀어본 방식

```javascript
var shopping_cart_total = 0;

function calc_cart_total() {
  shopping_cart_total = calc_total(shopping_cart);
  set_cart_total_dom();
  update_shipping_icons();
  update_tax_dom(shopping_cart_total);
}

function update_tax_dom(total) {
  const updated_shopping_cart_total = add_tax(total);
  set_tax_dom(updated_shopping_cart_total);
}

function add_tax(price) {
  return price * 0.10;
}
```

<br>

### 6. (p.82) 연습 문제 - 내가 풀어본 방식

```javascript
function calc_cart_total() {
  shopping_cart_total = calc_total(shopping_cart); 
  set_cart_total_dom();
  update_shipping_icons(shopping_cart_total);    
  update_tax_dom(shopping_cart_total);
}

function updated_shipping_icons(total) {
  var buy_buttons = get_buy_buttons_dom();
    
  for (var i = 0; i < buy_buttons.length; i += 1) {
    var button = buy_buttons[i];
    var item = buttom.item;
      
    if (is_free_shipping_item(item.price, total)) {
      button.show_free_shipping_icon();
    } else {
      button.hide_free_shipping_icon();
    }
  }
}
    
function is_free_shipping_item(price, total) {
  return price + total >= 20;
}
```

<br>

## :exclamation: 정리

- 액션은 암묵적인 입력 또는 출력을 가지고 있다.
- 계산의 정의에 따르면 계산은 암묵적인 입력이나 출력이 없어야 한다.
- 공유 변수(전역변수 같은)는 일반적으로 암묵적 입력 또는 출력이 된다.
- 암묵적 입력은 인자로 바꿀 수 있다.
- 암묵적 출력은 리턴값으로 바꿀 수 있다.
- 함수형 원칙을 적용하면 액션은 줄어들고 계산은 늘어난다.

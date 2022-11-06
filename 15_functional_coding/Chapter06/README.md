# Chapter06. 변경 가능한 데이터 구조를 가진 언어에서 불변성 유지하기

<br>

## 1. 동작을 읽기, 쓰기 또는 둘 다로 분류하기

| 분류        | 내용                                                         |
| ----------- | ------------------------------------------------------------ |
| 읽기(read)  | <ul><li>데이터를 바꾸지 않고 정보를 꺼내는 것</li><li>데이터가 바뀌지 않기 대문에 다루기 쉽다.</li><li>만약 인자에만 의존해 정보를 가져오는 읽기 동작이라면 계산이라고 할 수 있다.</li></ul> |
| 쓰기(write) | <ul><li>데이터를 바꾸는 것</li><li>바뀌는 값은 어디서 사용될지 모르기 때문에 바뀌지 않도록 원칙(불변성 원칙)이 필요하다.</li></ul> |

<br>

## 2. 카피-온-라이트

### (1) 카피-온-라이트 원칙 세 단계

| 단계 | 내용                         |
| ---- | ---------------------------- |
| 1    | 복사본 만들기                |
| 2    | 복사본 변경하기(원하는 만큼) |
| 3    | 복사본 리턴하기              |

```javascript
function add_element_last(array, elem) {
  var new_array = array.slice(); // 1. 복사본 만들기 - 배열을 복사하고 기존 배열은 변경하지 않았다.
  new_array.push(elem); // 2. 복사본 변경하기 - 복사본은 함수 범위에 있기 때문에 다른 코드에서 값을 바꾸기 위해 접근할 수 없다.
  return new_array; // 3. 복사본 리턴하기 - 복사본을 변경하고 나서 함수를 나간다. 이후에는 값을 바꿀 수 없다.
}
```

<br>

### (2) 카피-온-라이트로 쓰기를 읽기로 바꾸기

- 제품 이름으로 장바구니에서 제품을 빼는 함수

```javascript
function remove_item_by_name(cart, name) {
  var idx = null;
  for (var i = 0; i < cart.length; i += 1) {
    if (cart[i].name === name) {
      idx = i;
    }
  }
    
  if (idx !== null) {
    cart.splice(idx, 1); // cart.splice()로 장바구니를 변경한다.
  }
}
```

- 위 `remove_item_by_name` 함수에 전역변수 `shopping_cart`를 인자로 넘기면 전역변수인 장바구니가 변경된다.
- 여기서 장바구니가 바뀌지 않기 위해 장바구니를 변경 불가능한 데이터로 쓰려고 한다.
- 카피-온-라이트를 적용해보자.

```javascript
function remove_item_by_name(cart, name) {
  var new_cart = cart.slice();
  var idx = null;
  for (var i = 0; i < new_cart.length; i += 1) {
    if (new_cart[i].name === name) {
      idx = i;
    }
  }
    
  if (idx !== null) {
    new_cart.splice(idx, 1);
  }
    
  return new_cart;
}
```

- 위 함수를 일반화시켜보자.

```javascript
function removeItems(array, idx, count) {
  var copy = array.slice();
  copy.splice(idx, count);
  return copy;
}
```

<br>

## 3. 자바스크립트 배열 메서드

- 인덱스로 값 찾기 - `[idx]`
  - `idx` 위치에 있는 값을 가져온다.
  - 인덱스는 0부터 시작한다.

```javascript
var array = [1, 2, 3];
console.log(array[2]); // 3
```

- 값 할당하기 - `[] = `
  - 값을 할당하는 동작은 배열을 변경한다.

```javascript
var array = [1, 2, 3];
array[2] = 'ab';
console.log(array); // [1, 2, 'ab']
```

- 길이 - `.length`
  - 배열에 항목이 몇 개 있는지 알려준다.
  - 메서드가 아니기 때문에 괄호를 쓰지 않는다.

```javascript
var array = [1, 2, 3];
console.log(array.length); // 3
```

```javascript
// 깜짝 Quiz
var array = [1, 2, 3];
array.length = 4;
console.log(array.length); // ?
console.log(array) // ?

array.length = 1;
console.log(array.length); // ?
console.log(array) // ?
```

- 끝에 추가하기 - `.push(el)`
  - <b>배열을 변경하는 메서드</b>이다.
  - 배열 끝에 `el`을 추가하고 새로운 길이를 리턴한다.

```javascript
var array = [1, 2, 3];
console.log(array.push(7)); // 4
console.log(array); // [1, 2, 3, 7]
```

- 끝에 있는 값을 지우기 - `.pop()`
  - <b>배열을 변경하는 메서드</b>이다.
  - 배열 끝에 있는 값을 지우기 지운 값을 리턴한다.

```javascript
var array = [1, 2, 3];
console.log(array.pop()); // 3
console.log(array); // [1, 2]
```

- 앞에 추가하기 - `.unshift(el)`
  - <b>배열을 변경하는 메서드</b>이다.
  - 배열 맨 앞에 `el`을 추가하고 새로운 길이를 리턴한다.

```javascript
var array = [1, 2, 3];
console.log(array.unshift(7)); // 4
console.log(array); // [7, 1, 2, 3]
```

- 앞에 있는 값을 지우기 - `.shift()`
  - <b>배열을 변경하는 메서드</b>이다.
  - 배열 맨 앞에 있는 값을 지우고 지운 값을 리턴한다.

```javascript
var array = [1, 2, 3];
console.log(array.shift()); // 1
console.log(array); // [2, 3]
```

- 배열 복사하기 - `.slice()`
  - 배열을 얇게 복사해서 새로운 배열을 리턴한다.
  - 배열의 원소가 다른 배열이나 객체를 참조한다면 `.slice()` 해도 참조하는 배열이나 객체는 복사되지 않는다.

```javascript
var array = [1, 2, 3];
console.log(array.slice()); // [1, 2, 3]
```

- 항목 삭제하기 - `.splice(idx, num)`
  - <b>배열을 변경하는 메서드</b>이다.
  - `idx` 위치에서 `num` 개 항목을 지운다.
  - 그리고 지운 항목을 리턴한다.
  - 만약 `num`을 생략하거나 `num` 값이 `array.length - idx` 보다 크면 `idx` 위치부터 모든 요소를 제거하고 0 이하라면 어떠한 요소도 제거하지 않는다.

```javascript
var array = [1, 2, 3];
console.log(array.splice(2, 2)); // [2, 3]
console.log(array); // [1]
```

<br>

## 4. (p.120) 연습 문제 - 내가 풀어본 방식

```javascript
var mailing_list = [];

function add_contact(mailing_list, email) {
  var new_mailing_list = mailing_list.slice();
  new_mailing_list.push(email);
  return new_mailing_list;
}

function submit_form_handler(event) {
  var form = event.target;
  var email = form.elements['email'].value;
  mailing_list = add_contact(mailing_list, email);
}
```

<br>

## 5. 쓰기를 하면서 읽기도 하는 동작은 어떻게 해야 할까요? - `.shift()` 메서드로 알아보기

### (1) 쓰면서 읽기도 하는 함수로 분리하는 방법

#### :round_pushpin: 1단계. 읽기와 쓰기 동작으로 분리하기

- `.shift()` 메서드의 읽기 동작은 값을 단순히 리턴하는 동작이다.
- `.shift()` 메서드가 리턴하는 값은 배열에 첫 번째 항목이다.
- 아래와 같은 함수는 읽기 동작만 할 뿐, 아무것도 바꾸지 않았다.
- 숨겨진 입력이나 출력이 없기 때문에 이 함수는 <b>계산</b>이다.
- 그리고 `first_element` 함수는 읽기 함수이므로 카피-온-라이트를 적용할 필요가 없다.

```javascript
function first_element(array) {
  return array[0];
}
```

- .`shift()` 메서드의 쓰기 동작은 새로 만들 필요가 없다.
- `.shift()` 메서드가 하는 일을 그대로 감싸기만 하면 된다.
- 그리고 `.shift()` 메서드의 리턴값은 사용하지 않는다는 것을 강조하기 위해 리턴값을 무시하도록 처리한다.

```javascript
function drop_first(array) {
  array.shify();
}
```

<br>

#### :round_pushpin: 2단계. 쓰기 동작을 카피-온-라이트로 바꾸기

```javascript
function drop_first(array) {
  var array_copy = array.slice();
  array_copy.shift();
  return array_copy;
}
```

<br>

### (2) 값을 두 개 리턴하는 함수로 만드는 방법

#### :round_pushpin: 1단계. 동작을 감싸기

- `.shift()` 메서드를 바꿀 수 있도록 새로운 함수로 감싼다.
- 여기서 함수 리턴값을 무시하면 안 된다!

```javascript
function shift(array) {
  return array.shift();
}
```

<br>

#### :round_pushpin: 2단계. 읽으면서 쓰기도 하는 함수를 읽기 함수로 바꾸기

- 인자를 복사한 후에 복사한 값의 첫 번째 항목을 지우고, 지운 첫 번째 항목과 변경된 배열을 함께 리턴하도록 바꾼다.

```javascript
function shift(array) {
  var array_copy = array.slice();
  var first = array_copy.shift();
  return {
    first,
    array: array_copy,
  };
}
```

<br>

### :exclamation: 다른 방법

- 첫 번째 접근 방식('쓰면서 읽기도 하는 함수로 분리하는 방법')을 사용해 두 값을 객체로 조합하는 방법
  - 첫 번째 접근 방법으로 만든 두 함수는 모두 계산이기 때문에 쉽게 조합할 수 있고 조합해도 아래 함수는 계산이다.

```javascript
function shift(array) {
  return {
    first: first_element(array),
    array: drop_first(array),
  };
}
```

<br>

## 6. (p.125) 연습 문제 - 내가 풀어본 방식

- 읽기 함수와 쓰기 함수로 분리하기

```javascript
function last_element(array) {
  return array[array.length - 1];
}

function drop_last(array) {
  var array_copy = array.slice();
  array_copy.pop();
  return array_copy;
}
```

- 값 두 개를 리턴하는 함수로 만들기

```javascript
function pop(array) {
  var array_copy = array.slice();
  var first = array_copy.pop();
  return {
    first,
    array: array_copy,
  };
}
```

<br>

## 7. (p.128~130) 연습 문제 - 내가 풀어본 방식

- `.push()` 메서드를 카피-온-라이트 버전으로 만들기

```javascript
function push(array, elem) {
  var array_copy = array.slice();
  array_copy.push(elem);
  return array_copy;
}
```

- 위에서 만든 `push` 함수를 사용해 `add_contact()` 함수 리팩토링

```javascript
// before
function add_contact(mailing_list, email) {
  var list_copy = mailing_list.slice();
  list_copy.push(email);
  return list_copy;
}

// after
function add_contact(mailing_list, email) {
  return push(mailing_list, email);
}
```

- 배열 항목을 카피-온-라이트 방식으로 설정하는 `arraySet()` 만들기
  - `a[15] = 2;` 와 같은 동작을 카피-온-라이트로 만들기

```javascript
function arraySet(array, idx, value) {
  var array_copy = array.slice();
  array_copy[idx] = value;
  return array_copy;
}
```

<br>

## 8. 불변 데이터 구조를 읽는 것은 계산이다.

- 변경 가능한 데이터를 읽는 것은 액션이다.
  - 변경 가능한 값을 읽을 때마다 다른 값을 읽을 수도 있다.
- 쓰기는 데이터를 변경 가능한 구조로 만든다.
  - 쓰기는 데이터를 바꾸기 때문이다.
- 어떤 데이터에 쓰기가 없다면 데이터는 변경 불가능한 데이터이다.
  - 쓰기를 모두 없앴다면 데이터는 생성 이후 바뀌지 않는다.
- 불변 데이터 구조를 읽는 것은 계산이다.
  - 어떤 데이터를 불변형으로 만들었다면 그 데이터에 모든 읽기는 계산이다.
- 쓰기를 읽기로 바꾸면 코드에 계산이 많아진다.
  - 데이터 구조를 불변형으로 만들수록 코드에 더 많은 계산이 생기고 액션은 줄어든다.

<br>

## 9. 불변 데이터 구조는 충분히 빠르다.

- 언제든 최적화할 수 있다.
  - 애플리케이션을 개발할 때 예상하기 힘든 병목 지점이 항상 있다.
  - 그래서 성능 개선을 할 때는 보통 미리 최적화하지 말라고 한다.
  - 불변 데이터 구조를 사용하고 속도가 느린 부분이 있다면 그 때 최적화한다.
- 가비지 콜렉터는 매우 빠르다.
  - 대부분의 언어의 가비지 콜렉터는 최적화가 아주 잘 되어 있다.
  - 우리는 이런 기술을 그냥 쓰면 된다.
- 생각보다 많이 복사하지 않는다.
  - 데이터 구조의 최상위 단계만 복사하는 것을 얕은 복사라고 한다.
  - 얕은 복사는 같은 메모리를 가리키는 참조에 대한 복사본을 만든다.
  - 이것을 구조적 공유라고 한다.
- 함수형 프로그래밍 언어에는 빠른 구현체가 있다.
  - 데이터 구조를 복사할 때 최대한 많은 구조를 공유하여 효율적이다.
  - 그래서 더 적은 메모리를 사용하고 결국 가비지 콜렉터의 부담을 줄여준다.

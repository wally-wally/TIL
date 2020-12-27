# `for in` :vs: `for of`

<br>

## 1. 기존 순회 방식

- 기존 iterable한 데이터를 순회할 때 for 문을 이용해서 구문을 작성하는 방식은 초기 인덱스 번호를 기준으로 지정한 조건까지 인덱스 번호를 증가 또는 감소하여 각 인덱스에 해당하는 데이터를 출력했다.

```javascript
let arr = [1, 2, 3, 4];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

- `iterable` 이란 해당 데이터가 반복될 수 있는지 나타내는 조건이다.
- `iterable` 조건을 만족하기 위해서는 `Symbol.iterator`를 가지고 있어야 하는데 자세한 내용은 `01.md`에 작성되어 있으니 참고!

<br>

## 2. `for in`, `for of` 차이점

### (1) 출력 데이터가 다름

- for in 구문과 for of 구문의 가장 큰 차이점은 아래 결과와 같이 <b>인덱스 번호를 출력</b>하는지 또는 인덱스에 해당하는 <b>실제 데이터를 출력</b>하는지이다.

```javascript
let names = ['wally', 'hong', 'sim', 'nana'];

console.log('---for in 구문---');
for (let val in names) {
  console.log(val);
}

console.log('---for of 구문---');
for (let val of names) {
  console.log(val);
}
```

![01](https://user-images.githubusercontent.com/52685250/86449187-c64b1a00-bd52-11ea-9182-155abb2b301c.JPG)

<br>

### (2) prototype chain에 의한 iterable 포함 여부

- 또다른 차이점은 prototype chain에 의해 추가된 데이터를 포함하여 순회를 돌면서 해당 데이터의 여부이다.
- `for in`은 prototype chain으로 추가한 데이터를 포함해서 함께 출력되고, `for of`는 prototype chain로 추가된 데이터는 순회 대상에서 제외된다.

```javascript
Array.prototype.userCount = function() {
  return 4
}

let names = ['wally', 'hong', 'sim', 'nana'];

console.log('---for in 구문---');
for (let val in names) {
  console.log(val);
  console.log(names[val]);
}

console.log('---for of 구문---');
for (let val of names) {
  console.log(val);
}
```

![02](https://user-images.githubusercontent.com/52685250/86449768-994b3700-bd53-11ea-9bf4-54f120a58302.JPG)

<br>

## 3. `Object` 객체

- 위에서 살펴본 바와 같이 iterable한 데이터는 `for`문을 통해서 순회하면서 데이터를 출력할 수 있음을 확인했다.
- 하지만 `Object`와 같이 iterable한 데이터가 아닌 경우는 `for of`문을 통해서 순회할 수 없다. 아래 예시 코드를 통해서 확인해보자.

```javascript
let userData = {
  name: 'wally',
  age: 27,
  phone: '010-1234-5678'
}

console.log('---for in 구문---');
for (let val in userData) {
  console.log(val);
  console.log(userData[val]);
}

console.log('---for of 구문---');
for (let val of userData) {
  console.log(val);
}
```

![03](https://user-images.githubusercontent.com/52685250/86450306-44f48700-bd54-11ea-898b-f6d9014d0d39.JPG)

- `for in`문으로 순회하면 `Object`의 `key` 값이 출력되고 이 값들을 이용해서 `userData[val]`와 같이 출력하면 `value` 값도 얻을 수 있다.
- 하지만 `for of`문으로 순회하려고 하면 위 사진과 같이 `userData`가 `iterable`이 아니라는 에러 구문이 출력된다.
- `Object` 형태의 데이터를 `for of`문으로 출력하고 싶을 때는 `.keys()` 메서드를 이용하면 된다.
  - `Object.keys()`를 이용하면 iterable하지 않은 객체들을 iterable하게 만들어준다.
  - `userColumns`는 `Object`의 `key` 값들만 추출해서 `Array` 형태로 만든 iterable한 데이터이므로 `for of`문을 통해서 순회할 수 있다.

```javascript
let userData = {
  name: 'wally',
  age: 27,
  phone: '010-1234-5678'
}

let userColumns = Object.keys(userData); // ["name", "age", "phone"]

for (let val of userColumns) {
  console.log(val);
  console.log(userData[val]);
}
```

![04](https://user-images.githubusercontent.com/52685250/86450574-b8969400-bd54-11ea-9034-c9ae85fb2593.JPG)

:warning: <b>`for of`문을 통해서 순회할 때 위 코드와 같이 `userData[val]`로 작성하지 않고 `.`을 이용해서 `userData.val`로 접근하면 항상 `undefined`로 출력되므로 `[]`를 이용해서 접근하도록 하자!</b>


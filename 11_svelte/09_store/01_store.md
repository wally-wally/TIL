# 01_store

<br>

## 1. readable stores

```javascript
readable(initial, function start(set) {
  // code
  return function stop() {

  };
})
```

- `initial`: 첫 번째 인자는 초기값, 초기값 설정할 필요가 없는 경우 null이나 undefined를 사용

- `start` 함수: 첫 구독자가 발생했을 때 호출되는 함수로 set 이라는 콜백 함수를 파라미터로 가지고 stop 함수를 리턴하는 함수

- `set`: 관찰하고 있는 값을 변경하는 콜백 함수

- `stop`: 모든 구독자가 구독을 중단했을 때 호출되는 함수, start 함수에서 사용된 자원들이 있다면, 이 함수 내에서 자원을 해제해야 한다.

<br>

## 2. derived stores

> 기존의 store를 이용해서 새로운 store를 만들 수 있다.

```javascript
store = derived(a, callback: (a: any) => any)
```

```javascript
store = derived(a, callback: (a: any, set: (value: any) => void) => void | () => void, initial_value: any)
```

```javascript
store = derived([a, ...b], callback: ([a: any, ...b: any[]]) => any)
```

```javascript
store = derived([a, ...b], callback: ([a: any, ...b: any[]], set: (value: any) => void) => void | () => void, initial_value: any)
```

- 첫 번째 인자는 참고하는 store이다. 참고하는 store가 하나라면 `derived(a, ...)`으로 객체가 되고, 참고하는 store가 여러 개라면 `derived([a, ...b], ...)`로 배열이 된다.
- 두 번째 인자는 새로운 store의 값을 리턴하는 콜백 함수이다. 콜백 함수의 인자는 참고하는 store이다. 콜백 함수의 마지막 인자는 `set` 함수이다. `derived([a, ...b], ([$a, ...$b], set) => ...)`와 같은 형태이다.
- 세 번째 인자는 새로운 store의 초기값이다.

<br>

## 3. store bindings

- store는 다른 변수와 동일하게 html이나 다른 컴포넌트에 바인딩이 가능하다.
- 바인딩하려면 수정이 되어야 하므로 writable stores이어야 한다.
- store는 subscribe와 set, update를 가지는 객체인데 store를 바인딩하려면 set 함수가 반드시 존재해야 한다.
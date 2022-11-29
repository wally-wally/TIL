# Chapter17. 타임라인 조율하기

<br>

## 1. 타임라인을 나누기 위한 동시성 기본형

### (1) `Cut()` 함수 => `Promise.all()` 과 유사한듯

```javascript
// num - 기다릴 타임라인의 수, callback - 모든 것이 끝났을 때 실행할 콜백
function Cut(num, callback) {
  var num_finished = 0; // 카운터를 0으로 초기화
  return function() { // 리턴되는 함수는 타임라인이 끝났을 때 호출함
    num_finished += 1; // 함수를 호출할 때마다 카운터가 증가
    if (num_finished === num) {
      callback(); // 마지막 타임라인이 끝났을 때 콜백을 호출
    };
  };
}
```

```javascript
var done = Cut(3, function() {
  console.log('finished!');
});

done();
done();
done(); // 이 때 console.log 찍힘
```

<br>

### (2) 적용 예시

- `Cut()`을 보관할 범위
  - 응답 콜백 끝에서 `done()`을 불러야 한다.
  - 따라서 두 응답 콜백 만드는 `calc_cart_total()` 함수 범위에 `Cut()`을 만드는 것이 좋다.
- `Cut()`에 어떤 콜백을 넣을지
  - `calc_cart_total()`에는 `total` 값 계산이 끝났을 때 부르는 콜백이 이미 있다.
  - 실제로 `update_total_dom()`이 실행될 것 같지만 `Cut()`은 어떤 것을 호출하는지는 상관이 없다.
  - 따라서 `Cut()` 콜백에서 `calc_cart_total()` 콜백을 실행하면 된다.

```javascript
function calc_cart_total(cart, callback) {
  var total = 0;
  var done = Cut(2, function() {
    callback(total);
  });
    
  cost_ajax(cart, function(cost) {
    total += cost;
    done();
  });
    
  shipping_ajax(cart, function(shipping) {
    total += shipping;
    done();
  });
}
```

<br>

## 2. 딱 한 번만 호출하는 기본형

### (1) `JustOnce()` 함수 => `Promise.race()` 와 유사한듯

- 최초 한 번만 효과가 발생하는 액션을 멱등원(idempotent)이라고 한다.
- `JustOnce()` 는 어떤 액션이든 멱등원으로 만들어준다.

```javascript
// action - 액션을 전달
function JustOnce(action) {
  var alreadyCalled = false; // 함수가 실행됐는지 기억한다.
  return function(a, b, c) {
    if (alreadyCalled) return; // 실행한 적이 있다면 바로 종료한다.
    alreadyCalled = true; // 함수가 실행됐다고 생각하고 실행한 사실을 기록한다.
    return action(a, b, c); // 인자와 함께 액션을 호출한다.
  }
}
```

<br>

## 3. 자바스크립트의 시간 모델

- 순차적 구문은 순서대로 실행된다.
- 두 타임라인에 있는 단계는 왼쪽 먼저 실행되거나, 오른쪽 먼저 실행될 수 있다.
- 비동기 이벤트는 새로운 타임라인에서 실행된다.
- 액션은 호출될 때마다 실행된다.

<br>

## 4. 동시성 기본형 정리

- `Queue()`, `DroppingQueue()`는 자원을 공유하기 위한 동시성 기본형이고, `Cut()`, `JustOnce()`는 타임라인을 조율하여 액션에 순서나 반복을 제한해주는 동시성 기본형이다.

| 함수              | 내용                                                         |
| ----------------- | ------------------------------------------------------------ |
| `Queue()`         | 큐에 추가된 항목은 독립적으로 하나의 타임라인에서 처리된다. 하나의 항목이 처리되어야 다음 항목을 처리할 수 있다. |
| `DroppingQueue()` | `Queue()`와 비슷하지만 항목이 빠르게 늘어나면 작업을 건너뛴다. 특정 개수 이상 큐에 항목을 추가하지 못하고 싶을 때 사용된다. |
| `Cut()`           | 모든 타임라인이 완료되면 콜백을 불러 새로운 타임라인을 시작한다. |
| `JustOnce()`      | 첫 번째로 실행되는 타임라인이 콜백이 끝나면 콜백이 실행되는 동시성 기본형으로 여러 번 불러도 한 번만 실행된다. |


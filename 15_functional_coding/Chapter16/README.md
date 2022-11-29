# Chapter16. 타임라인 사이에 자원 공유하기

<br>

## 1. 자바스크립트에서 큐 만들기

### (1) 용어 정리

- 큐(Queue)
  - 넣은 순서대로 항목을 꺼낼 수 있는 데이터 구조
- 동시성 기본형(Concurrency Primitive)
  - 자원을 안전하게 공유할 수 있는 재사용 가능한 코드
  - 동시성 기본형은 방법은 다르지만 모두 실행 가능한 순서를 제한하면서 동작한다.
  - 기대하지 않는 실행 순서를 없애면 코드가 기대한 순서로 동작한다는 것을 보장할 수 있다.

<br>

### (2) 예시

```javascript
function add_item_to_cart(item) {
  cart = add_item(cart, item);
  update_total_queue(cart);
}

function calc_cart_total(cart, callback) {
  var total = 0;
  cost_ajax(cart, function(cost) {
    total += cost;
    shipping_ajax(cart, function(shipping) {
      total += shipping;
      callback(total);
    });
  });
}

function Queue() {
  var queue_items = [];
  var working = false;

  function runNext() {
    if (working) return;
    if (queue_items.length === 0) return;
 
    working = true;
 
    var cart = queue_items.shift();
    calc_cart_total(cart, function(total) {
      update_total_dom(total);
      working = false;
      runNext();
    });
  }
    
  return function(cart) {
    queue_items.push(cart);
    setTimeout(runNext, 0);
  }
}

var update_total_queue = Queue();
```

<br>

## 2. 큐를 재사용할 수 있도록 만들기

- 동시성 기본형은 액션을 고차 함수로 받는다. 이 고차 함수는 액션에 '순서 보장'이라는 슈퍼 파워를 준다.

```javascript
function Queue(worker) {
  var queue_items = [];
  var working = false;
    
  function runNext() {
    if (working) return;
    if (queue_items.length === 0) return;
      
    working = true;

    var item = queue_items.shift();

    worker(item.data, function(val) {
      working = false;
      setTimeout(item.callback, 0, val);
      runNext();
    });
  }
    
  return function(data, callback) {
    queue_items.push({
      data: data,
      callback: callback || function() {}
    });
    setTimeout(runNext, 0);
  };
}

function calc_cart_worker(cart, done) {
  calc_cart_total(cart, function(total) {
    update_total_dom(total);
    done(total);
  });
}

var update_total_queue = Queue(calc_cart_worker);
```

<br>

## 3. 큐를 건너뛰도록 만들기

```javascript
function DroppingQueue(max, worker) {
  var queue_items = [];
  var working = false;
    
  function runNext() {
    if (working) return;
    if (queue_items.length === 0) return;
      
    working = true;

    var item = queue_items.shift();

    worker(item.data, function(val) {
      working = false;
      setTimeout(item.callback, 0, val);
      runNext();
    });
  }
    
  return function(data, callback) {
    queue_items.push({
      data: data,
      callback: callback || function() {}
    });
    while (queue_items.length > max) {
      queue_items.shift();
    }
    setTimeout(runNext, 0);
  };
}

function calc_cart_worker(cart, done) {
  calc_cart_total(cart, function(total) {
    update_total_dom(total);
    done(total);
  });
}

var update_total_queue = DroppingQueue(1, calc_cart_worker);
```


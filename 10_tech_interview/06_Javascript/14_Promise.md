# 14. Promise

<br>

## (1) 정의

- 자바스크립트 비동기 처리에 사용되는 객체
- 비동기 처리를 실행하고 그 처리가 끝난 후에 다음 처리를 실행하기 위한 용도로 사용

- 장점: 비동기 작업들을 순차적으로 진행하거나 병렬로 진행하는 등 컨트롤이 보다 수월해지고 가독성이 좋아짐
- 실행 순서가 중요할 때(직렬적) : `then` 메서드 체인
- 실행 순서는 중요하지 않고 여러 비동기 처리를 모두 수행해야 할 때(병렬적) : `Promise.all()` 메서드

<br>

## (2) 구조

```js
let promise = new Promise(function(resolve, reject) { ... })
```

- Promise를 사용하기 위해 Promise 객체를 생성
- Promise에는 실행하고자 하는 처리를 작성하는 함수를 인자로 넘긴다.
  - `resolve` : 함수 안의 처리가 끝났을 때 호출해야 하는 콜백 함수, resolve 함수에는 어떠한 값도 인수로 넘길 수 있고 이 값은 다음 처리를 실행하는 함수에 전달
  - `reject` : 함수 안의 처리가 실패했을 때 호출해야 하는 콜백 함수
- 프로미스는 결과값을 가지고 있지만 `then` 이나 `catch`가 나오기 전에는 값을 반환하지 않는다.

<br>

## (3) Promise의 세 가지 상태

- Pending(대기)
  - 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행)
  - 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
  - 이 때 `then()` 메서드를 사용해서 결과 값을 받을 수 있다.

- Rejected(실패)
  - 비동기 처리가 실패하거나 오류가 발생한 상태
  - 이 때 `catch()` 메서드를 사용해서 실패한 이유(실패 처리의 결과 값)을 받을 수 있다.
  - 프로미스의 에러 처리는 가급적 `catch()`를 사용하는 것이 더 효율적

![img](https://joshua1988.github.io/images/posts/web/javascript/promise.svg)

```js
function getData() {
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData().then(function(data) {
  console.log(data); // response 값 출력
}).catch(function(err) {
  console.error(err); // Error 출력
});
```

- 위 코드는 서버에서 제대로 응답을 받아오면 `resolve()` 메서드를 호출하고, 응답이 없으면 `reject()` 메서드를 호출하는 예제입니다. 호출된 메서드에 따라 `then()`이나 `catch()`로 분기하여 응답 결과 또는 오류를 출력합니다.

<br>

## (4) Promise Chaining

- Promise의 또다른 특징은 여러 개의 프로미스를 연결하여 사용할 수 있다.
- `then` 메서드를 호출하고 나면 새로운 Promise 객체가 반환된다.
- Promise로 비동기 처리를 여러 개 연결해서 순차적으로 실행하려면 `then` 메서드 안에서 실행하는 성공 콜백 함수가 Promise 객체를 반환하도록 만들면 된다.
- 그러면 `then` 메서드로 Promise Chaining을 구현할 수 있다.

```js
function addNum() {
    return new Promise(function(resolve, reject){
        setTimeout(function() {
            resolve(1);
        }, 2000);
    })
}

addNum()
    .then(function(result) {
      console.log(result); // 1
      return result + 10;
    })
    .then(function(result) {
      console.log(result); // 11
      return result + 20;
    })
    .then(function(result) {
      console.log(result); // 31
    });
```

<br>

## (5) Promise.all vs Promise.allSettled vs Promise.race

- Promise.all

  - 여러 개의 프로미스를 동시에 실행시키고 싶을 때 사용(병렬적으로 실행)

  ```js
  Promise.all([
      new Promise(resolve => setTimeout(() => resolve(1), 1000)),
      new Promise(resolve => setTimeout(() => resolve(2), 2000)),
      new Promise(resolve => setTimeout(() => resolve(3), 3000))
  ]).then(res => console.log(res)); // [1, 2, 3]
  ```

  - 하지만 Promise.all에 전달되는 프로미스 중 하나라도 거절이 일어나면 Promise.all이 반환하는 프로미스는 에러와 함께 바로 거절된다.
  - 그래서 `.then` 메서드가 아닌 `.catch` 메서드에 작성한 내용이 실행된다.

  ```js
  Promise.all([
      new Promise(resolve => setTimeout(() => resolve(1), 1000)),
      new Promise((resolve, reject) => setTimeout(() => reject(new Error('에러 발생')), 2000)),
      new Promise(resolve => setTimeout(() => resolve(3), 3000))
  ]).then(res => console.log(res)); // 에러 발생 구문 실행
  ```

- Promise.allSettled

  - Promise.all이 하나라도 거절되면 전체가 거절되는 반면 Promise.allSettled은 모든 프로미스가 처리될 때까지 기다린 후 여러 요청 중 하나가 실패해도 다른 요청 결과에는 영향을 주지 않는다.

  ```js
  Promise.allSettled([
      new Promise(resolve => setTimeout(() => resolve(1), 1000)),
      new Promise((resolve, reject) => setTimeout(() => reject(new Error('에러 발생')), 2000)),
      new Promise(resolve => setTimeout(() => resolve(3), 3000))
  ]).then(res => console.log(res));
  ```

  ```
  [
    {status: "fulfilled", value: 1},
    {status: "rejected", reason: Error: 에러 발생 at <anonymous>:3:62},
    {status: "fulfilled", value: 3}
  ]
  ```

  - Promise.allSettled는 스펙이 추가된 지 얼마 안 된 문법이기 때문에 구식 브라우저는 폴리필을 구현해야 한다.

- Promise.race

  - Promise.all과 비슷하지만 가장 먼저 처리되는 프로미스의 결과(혹은 에러)를 반환한다.
  - 그래서 첫 번째로 결과가 나오면 나머지 요청에 대한 결과는 무시된다.

<br>

## (6) Promise vs callback

- 콜백함수

  - 함수의 제어권을 넘기고자 하는 대상에게 제어권을 맡기는 방식
  - 비동기 처리로 서버에 요청 후 데이터를 받은 후에 어떤 방식으로 처리할지 정의한 함수의 제어권을 넘김
  - 여러 비동기 로직 처리를 수행하는 코드 작성시 콜백 지옥 생길 수도 있어서 안 좋음

  ```js
  function getData(callbackFunc) {
    $.get('url 주소/products/1', function(response) {
      callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
    });
  }
  
  getData(function(tableData) {
    console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
  });
  ```

- Promise

  - Promise 객체 형태로 비동기 처리 로직을 작성하고 받은 결과 값에 따라서 어떻게 처리할 지 `then` 메서드와 `catch` 메서드로 구분해서 작성
  - 콜백함수보다 보다 더 직관적
  - 콜백함수와 달리 여러 비동기 로직 처리를 수행하는 코드 작성시 `then` 메서드 체인을 사용하면 되기 때문에 코드 상으로 보기에 안정적이고 유지보수 용이

  ```js
  function getData() {
    // new Promise() 추가
    return new Promise(function(resolve, reject) {
      $.get('url 주소/products/1', function(response) {
        // 데이터를 받으면 resolve() 호출
        resolve(response);
      });
    });
  }
  
  // getData()의 실행이 끝나면 호출되는 then()
  getData().then(function(tableData) {
    // resolve()의 결과 값이 여기로 전달됨
    console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
  });
  ```

<br>

## (7) Promise의 Event Loop 과정

Javascript 의 Event loop 는 Call stack 과 Queue (task queue, microtask queue) 사이의 작업들을 확인하여 처리한다.

promise 의 then 작업들은 microtask queue 에 등록되어 처리된다.

1. 작업을 만나면 call stack 에 넣는다.
2. call stack 에서 작업을 꺼내고 처리한다.
3. 처리중 callback 을 만나면, task queue 에 등록한다.
4. promise 를 만나면, call stack 에 넣는다.
5. call stack 에서 promise 작업을 꺼내고 처리한다.
6. 이때 then 을 만나면, microtask queue 에 등록한다.
7. 모든 스크립트의 call stack 작업이 끝나면, 우선적으로, microtask queue 를 확인하고 call stack 에 넣는다.
8. call stack 에서 작업을 꺼내고 처리한다.
9. microtask queue 작업이 없다면, task queue 를 확인하고 Call stack 에 넣는다.

(출처 : https://medium.com/@pks2974/javascript-%EC%99%80-promise-a6db8ca424ed)

---

:heavy_check_mark: <b>[참고] Task Queue, Microtask Queue (`11. 이벤트 루프`에 있는 내용)</b>

자바스크립트의 실행 환경은 2가지 큐를 가지고 있으며 **각각 스크립트 실행, 이벤트 핸들러, 콜백함수 등의 태스크(Task) 담기는 공간이다.** 태스크가 콜백함수라면 그 종류에 따라 다른 큐에 담기며 대표적인 예로는 다음과 같은 것들이 있다.

- 태스크 큐
  - `setTimeout()` , `setInterval()` , UI 렌더링, `requestAnimationFrame()`
- 마이크로태스크 큐
  - Promise, MutationObserver

이벤트 루프는 2개의 큐를 감시하고 있다가 콜 스택이 비게 되면, 콜백함수를 꺼내와서 실행한다. 이 때 **마이크로태스크 큐의 콜백함수가 우선순위를 가지기 때문에** 마이크로태스크 큐의 콜백함수를 전부 실행하고 나서 태스크 큐의 콜백함수들을 실행한다. (단, UI 렌더링이 태스크 큐에 속하기 때문에 마이크로태스크 큐의 태스크가 많으면 렌더링이 지연될 수 있다.)

---

<br>

---

:page_facing_up: <b>Reference</b>

- https://joshua1988.github.io/web-development/javascript/promise-for-beginners/
- https://ko.javascript.info/promise-api

---


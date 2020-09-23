# 15. async, await

<br>

## (1) 정의

- 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법
- 콜백 함수와 프로미스의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성할 수 있게 해줌
- 비동기 코드의 겉모습과 동작을 좀 더 동기 코드와 유사하게 만들어준다. => 가장 큰 장점

<br>

## (2) 기본 문법

```js
async function 함수명() {
  await 비동기_처리_메서드_명();
}
```

- 먼저 함수의 앞에 `async` 라는 예약어를 붙입니다. 그러고 나서 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 `await`를 붙입니다. 여기서 주의하셔야 할 점은 비동기 처리 메서드가 꼭 **프로미스 객체를 반환**해야 `await`가 의도한 대로 동작합니다.
- 일반적으로 `await`의 대상이 되는 비동기 처리 코드는 [Axios](https://github.com/axios/axios) 등 프로미스를 반환하는 API 호출 함수입니다.

```js
function fetchItems() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      var items = [1,2,3];
      resolve(items)
    }, 3000);
  });
}

async function logItems() {
  var resultItems = await fetchItems();
  console.log(resultItems); // [1,2,3]
}

logItems();
```

- 만약 `async`, `await`가 없었다면 데이터를 받아온 시점에서 콘솔을 출력할 수 있게 콜백 함수나 `then()` 메소드 등을 사용해야 했다.

- async, await 구문에서 에러 처리는 `try catch` 문법을 사용하면 된다.

<br>

## (3) async, await 가 좋은 이유

- 간결함과 깔끔함
  - 콜백 함수나 Promise를 사용할 때보다 코드가 훨씬더 간결해지고 깊어지는 인덴트도 고민할 필요가 줄어든다.
- 에러 핸들링
  - async, await는 동기와 비동기 에러 모두를 `try catch` 문법을 통해서 처리할 수 있다.
  - Promise를 사용한 경우 promise 안 쪽에서 발생한 에러와 그 밖에서 발생한 에러를 처리하는 것이 서로 달라 까다롭다.
    - promise 상에 `.catch()` 메서드를 호출해야하므로 `try catch`와 `.catch()`메서드 둘 다 사용해야하는 에러를 처리하는 코드의 중복이 발생한다.
  - 하지만 async, await에서는 `try catch`문법으로 간결하게 작성할 수 있다.

- 분기 처리
  - 데이터를 fetch하고 return 하거나 데이터 안의 값을 이용해서 분기 처리하는 경우 코드의 nesting이 많이 깊어지고 많은 괄호와 return 문들이 필요하다. 그래서 코드를 읽는 것이 다소 쉽지 않다.
  - async, await에서는 Promise, callback 형태보다 훨씬 더 가독성이 좋은 상태로 작성할 수 있다.

---

:page_facing_up: <b>Reference</b>

- https://medium.com/@constell99/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-async-await-%EA%B0%80-promises%EB%A5%BC-%EC%82%AC%EB%9D%BC%EC%A7%80%EA%B2%8C-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8A%94-6%EA%B0%80%EC%A7%80-%EC%9D%B4%EC%9C%A0-c5fe0add656c
- https://joshua1988.github.io/web-development/javascript/js-async-await/

---


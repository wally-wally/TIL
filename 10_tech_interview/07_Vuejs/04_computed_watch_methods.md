# 4. computed, watch, methods

<br>

## 1. computed vs methods

- 우선 둘다 계산된 값을 return해서 보여준다는 공통점이 있다.

- 차이점

  - computed는 종속 대상을 따라 저장된다는 점이 있다.
  - 즉, data에 선언한 변수 값이 변경되지 않는 한 computed 속성을 여러 번 요청해도 다시 계산하지 않고 이전에 계산된 값을 즉시 반환해줍니다.
  - 그리고 methods는 메소드를 호출하면 렌더링을 다시 할 때마다 항상 함수를 재실행한다는 점이 있씁니다.
  - 만약 계산이 오래걸리는 로직을 methods에 선언하면 항상 함수가 재실행되므로 오래 걸리지만 computed를 사용하면 data 값이 변경될 때만 로직을 수행하기 때문에 장점이 있습니다.
  - 즉, 참고하고 있는 값의 변경이 일어날 때만 함수를 실행하려면 computed를 값의 변경과 상관없고 간단한 로직을 수행할 때는 methods를 사용하는 것이 좋습니다.

- 또한 `Date.now()`처럼 아무 곳에도 의존하지 않는 computed 속성의 경우 절대로 업데이트되지 않는다는 뜻입니다.

  ```js
  computed: {
    now: function () {
      return Date.now()
    }
  }
  ```

<br>

## 2. computed(선언형 프로그래밍) vs watch(명령형 프로그래밍)

- computed는 Vue 인스턴스의 특정 값이 변경될 때 계산된 결과값을 return해 주는 반면,
- watch는 Vue 인스턴스의 특정 값이 변경될 때 지정한 함수가 실행되는 기능이다.
- Vue 인스턴스의 data에 할당된 값들 사이의 종속관계가 자동으로 세팅하고자 할 때는 computed가 적합
- 특정 프로퍼티의 변경시점에 특정 액션(api 호출이나 route 이동 등)을 취할 때 watch가 적합
- 그래서 computed로 구현가능한 것이라면 watch가 아니라 computed로 구현하는 것이 대게의 경우 옳다.
  - 두 줄 정리
  - `computed` : 계산해야 하는 `목표 데이터를 정의하는 방식`(선언형 프로그래밍)
  - `watch` : 감시할 데이터를 지정하고 그 `데이터가 바뀌면 특정 함수를 실행하라는 방식`(명령형 프로그래밍)

---

:page_facing_up: <b>Reference</b>

- https://kkodu.tistory.com/1
- https://jeonghwan-kim.github.io/vue/2017/03/27/vue.html

---



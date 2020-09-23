# 3. Vuejs Lifecycle

<br>

## (1) create 단계

> 컴포넌트가 초기화 되는 단계로 컴포넌트가 DOM에 추가되기 전 단계이다.(즉, DOM에 접근 불가)

- `beforeCreate` hook
  - **Vue 인스턴스 초기화 직후**, 컴포넌트가 DOM에 추가되기 전 상태
  - **`data`, `event`, `watcher` 에도 접근하기 전이므로 `data`, `methods`에 접근할 수 없다.**
  - 실제로 개발할 때 이 hook 과정에서 해당 컴포넌트에 접근했을 때 회원의 권한을 파악해서 관리자인 경우만 해당 컴포넌트에 접근할 수 있고 아닌 경우 다른 페이지로 튕겨나가게 하고 싶을 때 이 hook에서 구현했다.
- `created` hook
  - **`data`가 활성화된 상태로 `data`를 반응형으로 추적**할 수 있으며, `computed`, `methods`, `watch`가 활성화된다.
  - 하지만 컴포넌트에 DOM에는 여전히 추가되지 않아 **DOM에 접근할 수 없는 상태**이다.
  - 주로 이 hook에서 **`data`에 직접 접근할 수 있기 때문에 초기에서 외부에서 비동기로 받은 `data` 값들을 세팅**할 수 있다.

<br>

## (2) mount 단계

> 컴포넌트가 DOM이 추가될 때 실행되는 단계이다.(렌더링될 때 DOM을 변경하거나 이벤트 리스너를 달고 싶을 때 여기서 주로 선언)

- `beforeMount` hook

  - **DOM에 컴포넌트 부착하기 직전** 상태
  - 렌더링 되고 DOM을 변경해야 한다면 `mounted` hook을 사용하면 되므로 **거의 사용하지 않는 라이프 사이클 훅**이다.

- `mounted` hook

  - **컴포넌트가 DOM에 추가된 후 호출**하는 라이프 사이클 훅
  - **컴포넌트, 템플릿, 렌더링 된 DOM에 직접 접근 가능**하다.
  - cf) 부모의 `mounted` 훅이 모든 자식 컴포넌트가 mount된 상태를 보장하지 않는다. 그래서 `$nextTick`을 이용해서 전체가 렌더링 보장된 상태에서 작업을 할 수 있다.) 

  ![Mounted 훅 호출 순서](https://t1.daumcdn.net/cfile/tistory/999F79345BC7579416)
  - 위 그림과 같이 `created` hook은 부모 => 자식 순으로 호출 되지만, `mounted` hook은 자식 => 부모 순으로 호출된다.
  - 즉, 부모 컴포넌트는 자식 컴포넌트가 모두 DOM에 추가된 후에야 `mounted` hook이 실행된다.

<br>

## (3) update 단계

> 컴포넌트에서 사용되는 속성들이 변경되거나 re-rendering될 때 실행하는 단계

- `beforeUpdate` hook
  - **`data` 값이 변하여 업데이트가 시작될 때**의 상태
  - 정확히 말하면 **DOM이 re-rendering 되기 직전**에 호출되는 라이프 사이클 훅
  - 업데이트 된 값들을 가지고 있는 상태이기 때문에, 업데이트된 값으로 다른 값들을 업데이트 할 수 있다.
  - 여기에서 값이 변경되어도 다시 `beforeUpdate` hook이 호출되지 않아 무한 루프에 빠질 걱정이 없다.
- `updated` hook
  - **DOM이 re-rendering 된 후 호출**되는 라이프 사이클 훅
  - 값이 변해 실제 DOM이 변경된 이후에 호출
  - **변경된 값이 실제 DOM에도 적용**된 상태
  - DOM이 업데이트 된 후에 호출되는 hook 이므로 **변경된 후의 DOM을 이용해야 하는 처리를 할 때 유용**
  - **여기에서 `data`를 바꾸면 `updated` hook이 계속해서 호출되므로 무한 루프에 빠질 수 있으니 주의!**
  - cf) `mounted` hook과 마찬가지로 전체가 re-rendering이 끝난다는 것을 보장하기 위해 `$nextTick`을 사용한다.

<br>

## (4) destroy 단계

> 컴포넌트가 제거 될 때 실행되는 단계

- `beforeDestroy` hook
  - 컴포넌트가 제거되기 직전의 상태
  - 여기서는 아직까지 컴포넌트의 본래 기능을 가지고 있으므로 모든 속성에 접근할 수 있다.
  - 이벤트 리스너 해제, 컴포넌트에서 동적으로 할당받은 자원들을 해제할 때 사용하기 적합하다.
  - 또는 loading Spinner같은 것을 구현할 때 이 훅에서 loading Spinner를 열고 다른 컴포넌트로 이동했을 때 그 컴포넌트에서 `beforeCreate` hook에서 열려있던 loading Spinner를 닫는 용도로 응용할 수도 있다.
- `destroyed` hook
  - 컴포넌트가 제거된 후에 호출되는 라이프 사이클 훅
  - 컴포넌트의 모든 이벤트 리스너와 v-directive의 바인딩이 해제되고 하위 컴포넌트 마저 모두 제거됨

<br>

---

:page_facing_up: <b>Reference</b>

- https://beomy.tistory.com/47

---


# 5. vuex

<br>

## 1. 정의

- 컴포넌트의 데이터를 관리하기 위한 상태 관리 패턴이자 라이브러리
- React의 Flux 패턴에서 기인함
- vuex를 사용하지 않고 여러 개의 컴포넌트를 구성해서 데이터를 전달하려고 하면 컴포넌트가 많아질 수록 계속해서 props나 emit을 선언해서 데이터를 전달해야하므로 불편했다.
  - 그러자니 이벤트 버스라는 기능이 있지만 이벤트 버스는 어디서 이벤트를 보냈고 혹은 어디서 이벤트를 받았는지 알기가 어렵다. 즉, 컴포넌트간 데이터 전달이 명시적이지 않다는 문제가 있다.
- 그래서 vuex를 통해서 다음과 같은 문제를 해결할 수 있다.
  - MVC 패턴에서 발생하는 구조적 오류
  - 컴포넌트 간 데이터 전달 명시
  - 여러 개의 컴포넌트에서 같은 데이터를 업데이트할 때 동기화 문제

<br>

## 2. Flux 패턴

- 데이터 흐름이 여러 갈래로 나뉘지 않고 단방향으로만 처리
  - 데이터 흐름을 정형화 시켜서 향후 발생할 수 있는 문제점들을 방지

![img](https://github.com/namjunemy/TIL/blob/master/Vue/img/07.PNG?raw=true)

- 기존의 MVC 패턴은 뷰와 모델이 양방향 통신이 가능하므로 하나의 뷰가 모델을 변경했을 때, 다시 그 모델이 연관된 뷰들을 갱신하고, 업데이트 된 뷰들이 연관된 모델을 다시 갱신하고, 엮이고 엮이는 관계를 추적하기가 힘들었다.

<br>

## 3. vuex 컨셉

![img](https://github.com/namjunemy/TIL/blob/master/Vue/img/09.PNG?raw=true)

**State** : 컴포넌트 간에 공유하는 데이터 `data()`

**View** : 데이터를 표시하는 화면 `template`

**Action** : 사용자의 입력에 따라 데이터를 변경하는 `methods`

**단방향 데이터 흐름** 처리를 단순하게 도식화한 그림

- View(Template)에서 버튼을 클릭했을때, 클릭이라는 Action(Method)이 발생한다.
- 해당 Action이 동작을 통해서 State(data)를 변경한다.

<br>

## 4. vuex 구조

![](https://github.com/namjunemy/TIL/blob/master/Vue/img/10.PNG?raw=true)

- 뷰 컴포넌트 -> 비동기 로직 -> 동기 로직 -> 상태
  - 시작점은 Vue Components이다.
  - 컴포넌트에서 비동기 로직(Method를 선언해서 API 콜 하는 부분 등)인 Actions를 콜하고,
  - Actions는 비동기 로직만 처리할 뿐 State(Data)를 직접 변경하진 않는다.
  - Actions가 동기 로직인 Mutations를 호출해서 State(Data)를 변경한다.
  - Mutations에서만 State(Data)를 변경할 수 있다.

- mutations

  - **Mutations 의 성격상 안에 정의한 로직들이 순차적으로 일어나야 각 컴포넌트의 반영 여부를 제대로 추적할 수가 있기 때문이다.**
  - 여태까지 우리는 counter 를 변경할 때

  ```js
  return this.$store.state.counter++;
  return this.$store.state.counter;
  ```

  와 같이 컴포넌트에서 직접 state 에 접근하여 변경하였지만, 이는 안티패턴으로써 Vue 의 Reactivity 체계와 상태관리 패턴에 맞지 않은 구현방식이다. 안티패턴인 이유는 여러 개의 컴포넌트에서 같은 state 값을 동시에 제어하게 되면, state 값이 어느 컴포넌트에서 호출해서 변경된건지 추적하기가 어렵기 때문이다. 하지만, 상태 변화를 명시적으로 수행함으로써 **테스팅, 디버깅, Vue 의 Reactive 성질 준수** 의 혜택을 얻는다.

- actions

  - Mutations 에 대해 잠깐 짚어보면, Mutations 의 역할 자체가 State 관리에 주안점을 두고 있다. 상태관리 자체가 한 데이터에 대해 여러 개의 컴포넌트가 관여하는 것을 효율적으로 관리하기 위함인데 Mutations 에 비동기 처리 로직들이 포함되면 같은 값에 대해 여러 개의 컴포넌트에서 변경을 요청했을 때, 그 변경 순서 파악이 어렵기 때문이다.
  - 이러한 문제를 방지하기 위해 비동기 처리 로직은 Actions 에 동기 처리 로직은 Mutations 에 나눠 구현한다.
  - 따라서, `setTimeout()` 이나 서버와의 http 통신 처리 같이 결과를 받아올 타이밍이 예측되지 않은 로직은 Actions 에 선언한다.

<br>

---

:page_facing_up: <b>Reference</b>

- https://ict-nroo.tistory.com/106

---



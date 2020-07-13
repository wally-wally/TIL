# :recycle: React Lifecycle API

<img src="https://user-images.githubusercontent.com/52685250/81540357-813ae500-93ac-11ea-8599-13de46adf638.JPG">

(출처 : https://twitter.com/dan_abramov/status/981712092611989509)

<br>

## 1. constructor

- 생성자 함수
- 우리가 만든 컴포넌트가 브라우저 상에서 만들어질 때 가장 먼저 실행되는 함수
- state 같은 값들의 초기 상태 설정, 컴포넌트가 만들어지는 과정에서 미리 작업해야 할 작업들

<br>

## 2. getDerivedStateFromProps

- props로 받은 값을 state에 그대로 동기화 시키고 싶을 때
- 얘는 `static` 값으로 넣어줘야한다!

<br>

## 3. render

- 내부 DOM이 어떻게 그려질지, 내부 TAG 들에 어떤 값들을 보여줄지

<br>

## 4. componentDidMount

- 우리가 만든 컴포넌트가 실제 브라우저 상에 나타난 시점에 수행할 로직을 작성
- 외부 라이브러리(`chart.js` 등)를 사용할 때 특정 DOM에 그릴 외부 라이브러리 컴포넌트 작성
- 네트워크 요청 api, ajax 요청할 때 여기서 처리

- 컴포넌트가 나타나고 몇 초 뒤에 특정 로직을 수행하고 싶을 때

<br>

## 5. shouldComponentUpdate(아주 중요)

- 컴포넌트가 업데이트 되는 <b>성능을 최적화</b>시키고 싶을 때 사용
- <b>virtual DOM에도 랜더링을 할지 말지 결정함</b>
- True(업데이트 함) 또는 False(업데이트 하지 않음 => 업데이트 막는 용도로도 사용됨)를 반환함
- 특정 조건에 따라 랜더링을 막는 함수로 주로 사용된다.

<br>

## 6. getSnapshotBeforeUpdate

- 랜더링 후 랜더링 결과가 브라우저에 보여지기 바로 직전에 호출됨
- 주로 랜더링 후 update 하기전 스크롤 위치, 해당 DOM의 크기를 사전에 가져오고 싶을 때 사용

<br>

## 7. componentDidUpdate

- 컴포넌트가 업데이트 된 후 호출
- state가 바뀌었을 때 이전의 상태와 지금의 상태를 비교해서 변할 때 특정 로직 수행할 때 사용

<br>

## 8. componentWillUnmount

- 컴포넌트가 사라지는 과정에서 수행
- componentDidMount에서 설정한 리스너를 제거하는 역할

<br>

## [추가] componentDidCatch

- 에러를 잡을 때 사용한다.
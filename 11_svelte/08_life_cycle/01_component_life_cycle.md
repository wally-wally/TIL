# Component Life Cycle

<br>

- 라이프 사이클 함수

  - 컴포넌트가 화면에 마운트(화면에 출력) 되거나, 화면이 업데이트 혹은 화면에서 언마운트(화면에서 제거) 될 때 실행되는 콜백 함수

- Svelte의 라이프 사이클 함수

  - `onMount`, `onDestroy`, `beforeUpdate`, `afterUpdate`
  - `import { 라이프_사이클_함수 } from 'svelte'`로 라이프 사이클 함수를 가져올 수 있다.

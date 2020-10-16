<script>
  import { createEventDispatcher } from 'svelte';

  // [주의!] dispatch 함수는 항상 최상위 스코프에 정의되어야 한다.
  // 즉, 아래 sayHello() 함수 안에 정의하면 동작하지 않는다.
  const dispatch = createEventDispatcher(); // 상위 컴포넌트로 이벤트를 전달할 때 사용

  function sayHello() {
    dispatch('message', {
      text: 'Hello!'
    });
  }
</script>

<button on:click={sayHello}>
  Click
</button>
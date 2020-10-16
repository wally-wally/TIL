<script>
  import Child from './Child.svelte';
  // import { createEventDispatcher } from 'svelte';

  // const dispatch = createEventDispatcher();

  // function handleMessage(event) {
  //   dispatch('message', event.text);
  // }
</script>

<!-- <Child on:message={handleMessage} /> -->
<!--
  svelte는 하위 컴포넌트에서 상위 컴포넌트로 이벤트를 전달할 때 코드량을 줄여주기 위해
  아래와 같이 축약해서 작성할 수 있다.
  물론 script에 작성된 코드도 없어도 된다.
-->
<Child on:message />
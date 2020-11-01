<script>
  import { count } from './stores';

  function reset() {
    // set: 현재 값이 필요없이 어떤 값으로 바꿀 건지 선언할 때 사용
    count.set(0);
  }
</script>

<button on:click={reset}>reset</button>
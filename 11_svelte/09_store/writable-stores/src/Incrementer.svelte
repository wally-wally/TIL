<script>
  import { count } from './stores';

  function increment() {
    // update: 현재 값을 가져와서 현재 값을 업데이트할 때 사용
    count.update(n => n + 1);
  }
</script>

<button on:click={increment}>+</button>
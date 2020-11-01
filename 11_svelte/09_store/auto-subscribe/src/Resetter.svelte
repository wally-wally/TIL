<script>
  import { count } from './stores';

  function reset() {
    // count.set(0);
    $count = 0;
  }
</script>

<button on:click={reset}>reset</button>
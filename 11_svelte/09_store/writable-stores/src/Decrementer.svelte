<script>
  import { count } from './stores';

  function decrement() {
    count.update(n => n - 1);
  }
</script>

<button on:click={decrement}>-</button>
<script>
  import { count } from './stores';

  function increment() {
    // count.update(n => n + 1);
    $count = $count + 1;
  }
</script>

<button on:click={increment}>+</button>
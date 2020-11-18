<script>
  import { key } from './context';
  import { getContext } from 'svelte';

  let { context } = getContext(key);

  function reset() {
    context.number = 0;
    console.log(context.number);
  }
</script>

<button on:click={reset}>reset</button>
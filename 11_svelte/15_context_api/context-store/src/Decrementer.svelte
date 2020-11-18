<script>
  import { key } from './context';
  import { getContext } from 'svelte';

  let { context } = getContext(key);

  function decrement() {
    context.number = context.number - 1;
    console.log(context.number);
  }
</script>

<button on:click={decrement}>+</button>
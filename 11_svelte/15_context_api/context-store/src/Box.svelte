<script>
  import { key } from './context';
  import { setContext } from 'svelte';

  let context = {
    number: 0
  };

  setContext(key, {
    context
  });
</script>

<div>
  <slot></slot>
</div>
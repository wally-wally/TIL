<script>
  import { key } from './context';
  import { setContext } from 'svelte';

  const context = {
    name: 'wally',
    job: 'Frontend Developer',
    phone: '010-1234-5678'
  };

  setContext(key, {
    context
  });
</script>

<div>
  <slot></slot>
</div>
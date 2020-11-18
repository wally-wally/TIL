<script>
  import { key } from './context';
  import { getContext } from 'svelte';

  const { context } = getContext(key);
</script>

<p>{context.name}</p>
<p>{context.job}</p>
<p>{context.phone}</p>
<script>
	import { count } from './stores';
</script>

<p>count: {$count}</p>

<button on:click={count.increment}>+</button>
<button on:click={count.decrement}>-</button>
<button on:click={count.reset}>Reset</button>
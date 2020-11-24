<script>
	import Child, { printCount } from './Child.svelte';
</script>

<Child />
<Child />
<button on:click={printCount}>Show</button>
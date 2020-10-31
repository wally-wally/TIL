<script>
	import Child from './Child.svelte';
	let condition = true;
</script>

<button on:click={() => { condition = !condition }}>Toggle</button>

{#if condition}
	<Child />
{/if}
<script>
	import Red from './Red.svelte';
	import Blue from './Blue.svelte';
	import Green from './Green.svelte';

	const options = [
		{ color: 'red', component: Red },
		{ color: 'blue', component: Blue },
		{ color: 'green', component: Green },
	];

	let selected = options[0];
</script>

<select bind:value={selected}>
	{#each options as option (option.color)}
		 <option value={option}>{option.color}</option>
	{/each}
</select>

<svelte:component this={selected.component} />

<!-- {#if selected.color === 'red'}
	<Red />
{:else if selected.color === 'blue'}
	<Blue />
{:else if selected.color === 'green'}
	<Green />
{/if} -->
<script>
	let x = 0;

	function handleAddX() {
		x += 1;
	}
</script>

<button on:click={handleAddX}>Click</button>

{#if x > 10}
	<p>{x}는 10보다 큽니다.</p>
{:else if x > 5}
	<p>{x}는 5보다 큽니다.</p>
{:else}
	<p>{x}는 5보다 작습니다.</p>
{/if}
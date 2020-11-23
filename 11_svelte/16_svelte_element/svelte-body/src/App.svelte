<script>
	let isEnter;
	function handleMouseenter() {
		isEnter = true;
	}
	function handleMouseleave() {
		isEnter = false;
	}
</script>

<svelte:body
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
/>

<div>{isEnter}</div>
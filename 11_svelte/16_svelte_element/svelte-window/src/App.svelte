<script>
	let key;
	let keyCode;
	let innerWidth;
	let innerHeight;
	let scrollY;
	function handleKeydown(event) {
		key = event.key;
		keyCode = event.keyCode;
	}
</script>

<!--
	svelte:window로 binding할 수 있는 값들
	=> innerWidth, innerHeight, outerWidth, outerHeight, scrollX, scrollY, online(window.navigator.onLine의 별칭)
	(scrollX와 scrollY를 제외한 모든 값은 readonly이다.)
-->
<!-- svelte:window에는 mouseenter와 mouseleave 이벤트를 등록할 수 없다.App(svelte:body는 가능) -->
<svelte:window
	on:keydown={handleKeydown}
	bind:innerWidth={innerWidth}
	bind:innerHeight={innerHeight}
	bind:scrollY={scrollY}
/>

<p>{innerWidth}, {innerHeight}</p>
<div>{key}, {keyCode}</div>
<button on:click={() => scrollY = 0}>TOP ({scrollY})</button>

<style>
	button {
		position: fixed;
		bottom: 0;
		right: 0;
	}

	div {
		height: 200vh;
	}
</style>
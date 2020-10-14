<script>
	let count = 0;

	function handleClick() {
		count += 1;
	}

	function handleMouseDown() {
		console.log('mousedown');
	}
</script>

<!-- on:DOM_Event 형태로 이벤트 핸들러를 등록할 수 있다. -->
<button
	on:click={handleClick}
	on:mousedown={handleMouseDown}
>
	Clicked {count}
</button>
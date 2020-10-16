<script>
	let m = { x: 0, y: 0 }; // 마우스 위치를 지정하는 object
	let isEnter = false;

	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}

	function handleMouseenter() {
		isEnter = true;
	}

	function handleMouseleave() {
		isEnter = false;
	}
</script>

<!-- on: 뒤에 DOM 이벤트를 처리할 수 있다. -->
<div
	on:mousemove={handleMousemove}
>
	마우스 위치: {m.x}, {m.y}
	<div
		on:mouseenter={handleMouseenter}
		on:mouseleave={handleMouseleave}
	>
		{isEnter ? 'Enter' : 'Leave'}
	</div>
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}

	div > div {
		width: 100px;
		height: 100px;
		background-color: blue;
		color: white;
		font-weight: 600;
	}
</style>
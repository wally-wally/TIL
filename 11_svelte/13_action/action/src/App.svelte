<script>
	function longpress(node, duration) {
		let timer;

		function handleMousedown() {
			timer = setTimeout(() => {
				node.dispatchEvent(new CustomEvent('longpress'));
			}, duration);
		}
		
		function handleMouseup() {
			clearTimeout(timer);
		}

		node.addEventListener('mousedown', handleMousedown);
		node.addEventListener('mouseup', handleMouseup);

		return {
			update(newValue) {
				duration = newValue;
			},
			destroy() {
				node.removeEventListener('mousedown', handleMousedown);
				node.removeEventListener('mouseup', handleMouseup);
			}
		}
	}

	let duration = 200;
	function handleLongpress() {
		alert('longpress');
	}
</script>

<input type="range" bind:value={duration} min="100" max="2000">

<button
	use:longpress={duration}
	on:longpress={handleLongpress}
>
	Click
</button>
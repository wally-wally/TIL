<script>
	import { spring } from 'svelte/motion';

	let coords = spring({ x: 50, y: 50 }, {
		stiffness: 0.1,
		damping: 0.25,
		precision: 0.01,
	});
</script>

<div>
	<label>
		<h3>stiffness ({coords.stiffness})</h3>
		<input bind:value={coords.stiffness} type="range" min="0" max="1" step="0.01">
	</label>
	<label>
		<h3>damping ({coords.damping})</h3>
		<input bind:value={coords.damping} type="range" min="0" max="1" step="0.01">
	</label>
	<label>
		<h3>precision ({coords.precision})</h3>
		<input bind:value={coords.precision} type="range" min="0" max="10" step="0.01">
	</label>
</div>

<svg
	on:mousemove={e => coords.set({ x: e.clientX, y: e.clientY })}
>
	<circle cx={$coords.x} cy={$coords.y} r={10}>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}

	circle {
		fill: red;
	}

	div {
		position: absolute;
		right: 0;
	}
</style>
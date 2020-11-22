<script>
	import JsonItem from './JsonItem.svelte';
	const json = JSON.stringify({
		array: [
			1,
			2,
			3
		],
		color: 'gold',
		number: 123,
		object: {
			a: 'b',
			c: 'd'
		},
		string: 'Hello World'
	});
</script>

<JsonItem {json} />
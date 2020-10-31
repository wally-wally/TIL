<script>
	import { beforeUpdate, afterUpdate, onMount } from 'svelte';
	let num = 0;
	let p;

	beforeUpdate(() => {
		// 처음 실행될 때는 mount 되기 전이므로 p는 undefined로 출력된다.
		// console.log('beforeUpdate', p);

		// undefined 예외 처리
		console.log('beforeUpdate', p && p.innerText);
	});

	onMount(() => {
		console.log('onMount');
	})

	afterUpdate(() => {
		// afteUpdate 상태 에서는 mount 된 후이므로 항상 p 태그가 있기 때문에 바로 p.innerText만 적어도 무방하다.
		console.log('afterUpdate', p.innerText);
	});
</script>

<button on:click={() => {num += 1}}>Add</button>
<p bind:this={p}>{num}</p>
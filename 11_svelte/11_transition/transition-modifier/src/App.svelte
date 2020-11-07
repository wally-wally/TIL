<script>
	import { slide } from 'svelte/transition';

	let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	let showItems = true;
	let i = 5;
</script>

<label>
	<input type="checkbox" bind:checked={showItems}>
	show list
</label>

<label>
	<input type="range" bind:value={i} max="10">
</label>

{#if showItems}
	{#each items.slice(0, i) as item, index (index)}
		<!-- local이라는 트랜지션 수식어를 사용하면 local 수식어를 작성한 부분에 값이 추가될 때만 해당 트랜지션이 적용된다. -->
		<!-- 그래서 조건문 부분(showItems)에서는 slide 트랜지션이 적용되지 않는다. -->
		<div transition:slide|local>
			{item}
		</div>
	{/each}
{/if}
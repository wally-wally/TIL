<script>
	import { flip } from 'svelte/animate';
	let items = [1];
	function addItem() {
		items.unshift(Math.max(...items) + 1);
		items = items; // 반응형을 위해 재할당 과정 작성
	}
	function removeItem() {
		items.shift();
		items = items;
	}
</script>

<button on:click={addItem}>추가하기</button>
<button on:click={removeItem}>제거하기</button>

<!-- [주의사항1]key 값이 지정된 each 블록 안에서 애니메이션 사용해야 한다. -->
<!--
	[주의사항2]배열이 재정렬될 때 애니메이션이 트리거된다.
	즉, addItem의 배열 메서드를 push로, removeItem의 배열 메서드를 pop으로 바꾸면
	배열이 재정렬되지 않기 때문에 애니메이션이 트리거되지 않는다.
-->
<!-- [주의사항3]each block의 최상위 요소(직계요소)에서 animate directive를 사용해야 한다. -->
{#each items as item (item)}
	<div
		animate:flip={{ delay: 1000, duration: 2000 }}
	>
		{item}
	</div>
{/each}
<script>
	import Hoverable from './Hoverable.svelte';
</script>

<Hoverable let:hovering={active}>
	<!-- active가 true일 때 class에 actvie라는 클래스명이 적용된다는 의미 -->
	<!-- 또한 active 변수는 Hoverable 컴포넌트의 자식 컴포넌트 내에서만 사용 가능하다.active -->
	<div class:active>
		{#if active}
			<p>active가 활성화 되었습니다.</p>
		{:else}
			<p>active가 비활성화 되었습니다.</p>
		{/if}
	</div>
</Hoverable>

<!-- 위 컴포넌트와 아래 컴포넌트의 active는 서로 독립적으로 동작한다. -->
<Hoverable let:hovering={active}>
	<div class:active>
		{#if active}
			<p>active가 활성화 되었습니다.</p>
		{:else}
			<p>active가 비활성화 되었습니다.</p>
		{/if}
	</div>
</Hoverable>

<style>
	div {
		padding: 1em;
		background-color: #eee;
	}
	.active {
		background-color: red;
		color: white;
	}
</style>
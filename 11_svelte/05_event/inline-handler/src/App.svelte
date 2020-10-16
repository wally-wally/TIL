<script>
	let m = { x: 0, y: 0 };
</script>

<!--
	일부 프레임워크에서는 성능상의 이유로 이벤트 핸들러를 인라인으로 정의하는 것을 피하라고 하지만
	svelte에서는 컴파일되면서 최적화되기 때문에 인라인 핸들러를 사용하는데 성능 고민없이 사용할 수 있다는 장점이 있다.
-->
<div on:mousemove={e => m = { x: e.clientX, y: e.clientY }}>
	마우스 위치: {m.x}, {m.y}
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
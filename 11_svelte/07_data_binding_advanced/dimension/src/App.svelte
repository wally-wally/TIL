<script>
	let w;
	let h;
	let size = 42;
	let text = 'Hello Wally';
</script>

<input type="range" bind:value={size}>

<p>너비: {w}, 높이: {h}</p>

<!--
	[주의 사항]
	- 성능 이슈 관점에서 이와 같은 dimension 바인딩이 많아지면 오버헤드가 커져서 성능상 안 좋아진다.
	- dimension 바인딩을 적용할 수 있는 display 속성은 block 속성이 있어야 한다.
	- canvas 태그와 같이 자식 요소를 가질 수 없는 태그들은 dimension 바인딩을 사용할 수 없다.
-->
<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px;">{text}</span>
</div>

<style>
	div {
		display: inline-block;
	}
</style>
<script>
	let html = '<p>텍스트 입니다.</p>';
</script>

<!--
	contenteditable="true"를 사용하면 textContent와 innerHTML 바인딩을 지원한다.
	Vue.js에서는 지원하지 않는 기능입니다.
-->
<div
	contenteditable="true"
	bind:innerHTML={html}
></div>
<pre>{html}</pre>

<style>
	[contenteditable] {
		padding: 0.5rem;
		border: 1px solid #eee;
		border-radius: 5px;
	}
</style>
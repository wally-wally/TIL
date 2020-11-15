<script>
	import Box from './Box.svelte';
</script>

<Box>
	<p slot="title">title</p>
	<p slot="content">content</p>
	<p slot="detail">detail</p>
</Box>

<!-- 순서를 뒤집어도 각 slot의 위치에 배치되므로 순서가 변하지 않는다. -->
<Box>
	<p slot="detail">detail</p>
	<p slot="content">content</p>
	<p slot="title">title</p>
</Box>
<script>
	import Child from './Child.svelte';

	let div;
	let child;

	function handleClick() {
		console.log(div);
		console.log(child);
	}
</script>

<button on:click={handleClick}>This 로그 보기</button>

<!--
	[this 바인딩]
	- vue.js의 ref 속성과 유사하다.
	- element 요소 뿐만 아니라 component에도 this 바인딩을 사용할 수 있다.
-->
<div bind:this={div}>DIV</div>
<Child bind:this={child} />
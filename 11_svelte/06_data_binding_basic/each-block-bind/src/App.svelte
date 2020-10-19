<script>
	let todos = [
		{ done: false, text: '' }
	];

	$: remainTodoCount = todos.filter(todo => !todo.done).length;

	// svelte에서는 재할당을 해줘야하는 것을 잊지 말자!
	function add() {
		todos = todos.concat({ done: false, text: ''});
	}

	function clear() {
		todos = todos.filter(todo => !todo.done);
	}
</script>

{#each todos as todo, index (index)}
	<!-- 해당 todo의 항목의 done 값이 true일 때 class명을 'done'으로 준다. -->
	<div class:done={todo.done}>
		<input type="checkbox" bind:checked={todo.done}>
		<input type="text" bind:value={todo.text} disabled={todo.done}>
	</div>
{/each}

<p>남은 할 일 갯수: {remainTodoCount}</p>

<button on:click={add}>추가</button>
<button on:click={clear}>완료 삭제</button>

<style>
	.done {
		opacity: 0.4;
	}
</style>
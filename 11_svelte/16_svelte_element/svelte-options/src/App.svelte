<script>
	import Todo from './Todo.svelte';

	let todos = [
		{ id: 1, done: false, text: 'todo1' },
		{ id: 2, done: false, text: 'todo2' },
		{ id: 3, done: false, text: 'todo3' },
	];

	function toggle(toggled) {
		todos = todos.map(x => {
			return x === toggled
				? { id: x.id, done: !x.done, text: x.text }
				: x;
		})
	}
</script>

{#each todos as todo (todo.id)}
	<Todo {todo} on:click={() => toggle(todo)}/>
{/each}
<script>
	let list = [
		{ id: 1, text: 'test 1'},
		{ id: 2, text: 'test 2'},
		{ id: 3, text: 'test 3'},
	];

	function addItem() {
		const id = Math.max(...list.map(x => x.id)) + 1;
		list = [...list, {id, text: `test ${id}`}];
	}

	function removeItem() {
		list.shift();
		list = list; // 반응형 동작을 위해 재할당을 함
	}

	function resetItem() {
		list = [
			{ id: 1, text: 'test 1'},
			{ id: 2, text: 'test 2'},
			{ id: 3, text: 'test 3'},
		];
	}
</script>

<button on:click={addItem}>Add</button>
<button on:click={removeItem}>Remove</button>
<button on:click={resetItem}>Reset</button>

<ul>
	<!-- {#each list as { id, text }, i}
		<li>{i}: {id}, {text}</li>
	{/each} -->

	<!-- each block을 사용할 때 (id)와 같이 key를 지정하는 것이 좋다. -->
	{#each list as { id, text } (id)}
		<li>{id}, {text}</li>
	{/each}

	<!-- 
		each block의 key로 object 형태를 사용할 수 있다.
		하지만 가급적이면 string이나 number 형태를 key로 설정하는 것이 훨씬 좋다.
		key 값을 string이나 number 형태로 지정하면 reset 버튼을 눌렀을 때 변경된 부분만 업데이트 되기 때문에 훨씬 더 효율적이다.
	-->
	<!-- {#each list as item (item)}
		<li>{item.id}, {item.text}</li>
	{/each} -->

</ul>
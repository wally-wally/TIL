<script>
	let name = 'Wally';
	let a = 1;
	let yes = false;
	let picked = null;
	const words = ['wally', 'FE', 'developer'];
	let checkedWords = [];
</script>

<!-- 1. text type -->
<input type="text" bind:value={name}>
<h1>{name}</h1>
<hr>

<!-- 2. number, range type -->
<input type="number" bind:value={a} min="0" max="10">
<input type="range" bind:value={a} min="0" max="10">
<h1>{a}</h1>
<hr>

<!-- 3. checkbox type -->
<!-- checkbox type은 value가 아닌 checked 속성과 binding 해야 한다. -->
<input type="checkbox" bind:checked={yes}>
{#if yes}
	<p>YES</p>
{:else}
	<p>NO</p>
{/if}
<hr>

<!-- 4. radio type -->
<!-- 선택된 radio button의 값이 binding 된다. -->
<label>
	<input type="radio" value="one" bind:group={picked}>one
</label>
<label>
	<input type="radio" value="two" bind:group={picked}>two
</label>
<h1>{picked}</h1>
<hr>

<!-- 5. checkbox type에서 bind:group을 사용하는 경우 -->
{#each words as word, index (index)}
	<label>
		<input type="checkbox" value={word} bind:group={checkedWords}>
		{word}
	</label>
{/each}
<h1>{checkedWords}</h1>
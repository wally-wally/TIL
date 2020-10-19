<script>
	const list = [
		{ id: 1, text: 'A' },
		{ id: 2, text: 'B' },
		{ id: 3, text: 'C' }
	];
	let selected;
	let multiSelected = [];
</script>

<!-- 
	select 태그의 value 속성에 binding 할 수 있는 값의 형태로
	object 뿐만 아니라 number, string 등 다양하게 가능하다.
-->
<!--
	svelte는 별도의 초기화 설정을 하지 않았을 때 페이지가 새로고침될 때마다
	option의 첫 번째 항목으로 자동으로 초기화되서 selected에 할당되게 된다.
-->
<select bind:value={selected}>
	{#each list as item}
		<option value={item}>{item.text}</option>
	{/each}
</select>
<p>선택함: {selected ? selected.id : 'waiting...'}</p>

<!-- select 태그의 multiple 속성 -->
<select bind:value={multiSelected} multiple>
	{#each list as item}
		<option value={item}>{item.text}</option>
	{/each}
</select>
<p>선택함: {multiSelected ? multiSelected.map(x => x.id).join(',') : 'waiting...'}</p>
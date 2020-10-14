<script>
	import Child from './Child.svelte';
	// let name = 'wally';
	// let job = 'FE Developer';
	// let website = 'https://wally-wally.kr';

	let info = {
		name: 'wally',
		job: 'FE Developer',
		website: 'https://wally-wally.kr',
	}
</script>

<!-- 속성명과 변수명이 동일할 때 속성명을 생략할 수 있다, => name={name} : {name} -->
<!-- <Child
	{name}
	{job}
	{website}
/> -->
<!-- spread 문법을 사용하면 props를 간결하게 작성할 수 있다. -->
<Child
	{...info}
/>
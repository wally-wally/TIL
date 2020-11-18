<script>
	// import { count } from './stores';
	// import { key } from './context';
	// import { getContext } from 'svelte';

	import Box from './Box.svelte';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';

	// console.log(getContext(key)); // undefined
	// let { context } = getContext(key);
</script>

<Box>
	<!-- <p>count: {context.number}</p> -->
	<Incrementer />
	<Decrementer />
	<Resetter />
</Box>

<!-- 위 Box 컴포넌트의 context.number값과 아래 Box 컴포넌트의 context.number 값은 서로 다르다. -->
<!--
	context vs store
	- store는 어플리케이션 어느 위치에서나 사용 가능
	- context는 해당 컴포넌트와 그 컴포넌트의 하위 컴포넌트에서 사용할 수 있다.
	- 또한 context는 반응형으로 동작하지 않으므로 반응형으로 동작하려면 store를 사용해야 한다.
	- 해당 컴포넌트와 하위 컴포넌트에서만 context를 사용할 수 있으므로 컴포넌트를 여러 개 만들어도 각각의 컴포넌트의 context는 독립적으로 동작하게 된다.
	- getContext와 setContext는 컴포넌트가 생성될 때 실행되어야 한다.
-->
<Box>
	<!-- <p>count: {context.number}</p> -->
	<Incrementer />
	<Decrementer />
	<Resetter />
</Box>

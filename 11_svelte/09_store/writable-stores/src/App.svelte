<script>
	import { onDestroy } from 'svelte';
	import { count } from './stores';

	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';

	let countValue;

	// subscribe: count의 값이 변경(update or set)될 때마다 subscribe에 작성한 함수가 콜백(호출)된다.
	const unsubscribe = count.subscribe(value => countValue = value);

	// subscribe는 count의 값이 변경될 때마다 호출되기 때문에
	// subscribe에 할당된 자원을 해제해줘야 한다.
	// subscribe의 return 값(함수)을 unsubscribe라는 변수에 담고
	// life cycle의 onDestroy를 이용해서 unsubscribe 함수를 호출하면
	// subscribe의 자원의 해제된다.
	// onDestroy(unsubscribe);

	// unsubscribe는 함수이기 때문에 아래와 같이 작성해도 된다.
	onDestroy(() => {
		unsubscribe();
	});
</script>

<p>count: {countValue}</p>

<Incrementer />
<Decrementer />
<Resetter />
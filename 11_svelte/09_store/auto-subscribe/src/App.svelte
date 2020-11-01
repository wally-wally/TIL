<script>
	// import { onDestroy } from 'svelte';
	import { count } from './stores';

	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';

	// store의 자동 구독을 사용하면 아래와 같이 할당하고 해제하는 작업을 별도로 작성하지 않아도 된다.
	// let countValue;

	// const unsubscribe = count.subscribe(value => countValue = value);

	// onDestroy(() => {
	// 	unsubscribe();
	// });

	// svelte에서 store의 자동 구독을 사용하려면 $ 키워드를 사용해야하므로
	// svelte에서 변수 선언시 첫 번째 글자로 $를 사용할 수 없다.
	// const $temp = 0;
</script>

<!-- $ 키워드를 사용해서 store의 자동 구독 기능을 사용할 수 있다. -->
<p>count: {$count}</p>
<!-- <p>count: {countValue}</p> -->

<Incrementer />
<Decrementer />
<Resetter />
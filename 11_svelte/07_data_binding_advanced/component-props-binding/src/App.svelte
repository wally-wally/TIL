<script>
	import Child from './Child.svelte';

	let number = 3;
</script>

<!--
	- bind: 를 사용하지 않고 number={number}만 작성하면 부모에서 자식으로만 데이터가 전달되는 단방향 통신이 일어난다.
	- 하지만 bind: 를 사용하면 부모에서 전달받은 데이터를 자식쪽에서도 수정할 수 있다.
	- 그러나 이러한 방법은 많이 사용하는 것을 추천하지 않다.
	- 왜냐하면 부모와 자식 양쪽에서 모두 같은 값을 변경할 수 있기 때문에 어디에서 변경되었는지 확인하기 어렵다.
	- 즉 유지보수가 어렵다.ㄴ
-->
<Child bind:number={number} />
<p>{number}</p>
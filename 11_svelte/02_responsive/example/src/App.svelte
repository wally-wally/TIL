<script>
	let numbers = [1, 2, 3, 4];

	$: sum = numbers.reduce((acc, cur) => acc + cur, 0);

	function addNumber() {
		// svelte는 값의 재할당이 일어나야만 반응형으로 동작할 수 있다.
		// 그래서 가급적이면 아래와 같이 spread 연산자를 사용하는 것을 권장한다.(약간 React와 유사한 부분?)
		// numbers = [...numbers, numbers.length + 1];

		// 그렇기 때문에 array의 push() 메서드를 사용하면 numbers를 재할당해주는 구문(numbers = numbers;)이 반드시 필요하다.
		numbers.push(numbers.length + 1);
		numbers = numbers;

		// svelte의 $ 문법은 동기적으로 동작하지 않는다.
		// $ 블록 안에 선언된 변수의 값이 변경되었을 때만 선언되는 블록이다.
		// 그래서 동기적으로 동작하지 않고 아래와 같은 if 구문이 동작하는 시점에서는
		// sum의 이전 값을 가지고 있게 되서 if 조건에 올바르게 걸리지 않는다.
		// console.log(sum);
		// if (sum >= 20) {
		// 	alert('error');
		// }
		
		console.log(numbers);
	}
</script>

<p>{numbers.join(' + ')} = {sum}</p>
<button on:click={addNumber}>Add a number</button>
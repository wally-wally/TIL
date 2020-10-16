<script>
	let promise;

	function sayHello() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('Hello Wally!');
				// reject(new Error('에러 발생!'));
			}, 1000);
		})
	}

	function handleClick() {
		promise = sayHello();
	}
</script>

<button on:click={handleClick}>인사하기</button>

{#await promise}
	<!-- 응답이 올 때까지 출력하는 내용 -->
	<p>인사를 기다리는 중...</p>
{:then data} <!-- promise의 응답이 올바르게 왔을 때 -->
	<p>{data}</p>
{:catch error} <!-- 에러가 발생했을 때 -->
	<p>{error.message}</p>
{/await}

<!--
	만약 에러가 없다는 것을 보장할 수 있다면 catch block은 없어도 된다.
	그리고 then block도 아래 구문과 같이 await block에 한 줄로 작성할 수 있다.
	하지만 응답이 올 때까지 기다릴 때는 공백으로 표시됨을 주의해야 한다.
-->
{#await promise then data}
	<p>{data}</p>
{/await}
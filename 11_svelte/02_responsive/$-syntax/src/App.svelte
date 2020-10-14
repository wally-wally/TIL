<script>
	let count = 0;
	// svelte의 $ 문법은 Vue.js의 computed 또는 watch 와 유사하게 구현할 수 있다.
	// 참고 : Javascript의 label 문법(https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/label)
	$: doubled = count * 2; // (1) computed로 쓰일 때

	$: if (count >= 10) { // (2) watch로 쓰일 때
		alert('count는 10을 넘을 수 없습니다.');
		count = 9;
	}

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count}
</button>

<p>{count}를 2배 하면 {doubled}</p>
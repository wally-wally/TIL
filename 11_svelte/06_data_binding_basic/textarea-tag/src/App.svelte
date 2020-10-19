<script>
	let value = '텍스트를 입력해주세요.';
</script>

<!-- <textarea bind:value={value}></textarea> -->

<!--
	binding 과정에서도 약어 기능을 제공한다.
	binding할 속성 이름과 변수 이름이 동일하면
	변수 선언 부분을 아래 코드와 같이 작성할 수 있다.
-->
<textarea bind:value></textarea>
<p>{value}</p>

<style>
	textarea {
		width: 100%;
		height: 200px;
	}
</style>
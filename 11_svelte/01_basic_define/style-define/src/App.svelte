<div class="active">My name is wally</div>

<style>
	/*
		기본적으로 svelte는 해당 컴포넌트에서만 스타일이 적용된다.
		개발자 도구에서 해당 HTML 태그의 class 명을 보면 각각 다른 해시값들이 붙어 있는 것을 확인할 수 있다.
		하지만 전역적으로 모든 컴포넌트에서 적용하고 싶을 때는 해당 셀렉터에 :global()을 작성하면 된다.
	*/
	:global(.active) {
		color: red;
	}
</style>
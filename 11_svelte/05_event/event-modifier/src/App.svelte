<script>
	function handleClick() {
		alert('CLICK');
	}
</script>

<!--
	이벤트 수식어 목록
	- preventDefault: 이벤트 핸들러가 실행되기 전 event.preventDefault()를 호출 => 태그의 기본 동작을 막음
	- stopPropagation: event.stopPropagation()이 호출 => 이벤트가 다음 요소로 흐르는 것을 막음
	- passive: 터치 혹은 휠 이벤트로 발생하는 스크롤 성능을 향상시킴
	- capture: 버블링 단계가 아닌 캡쳐링 단계에서 이벤트 핸들러를 실행
	- once: 해당 이벤트가 단 한 번만 일어날 것이라고 명시
	- self: event.target과 이벤트 핸들러를 정의한 요소가 같을 때 이벤트 핸들러를 실행
-->
<button on:click|once={handleClick}>
	Click
</button>
<!--
	위 이벤트 수식어를 여러 개를 조합해서 사용할 수 있다.
	ex) on:click|once|preventDefault={handleClick}
-->
<button on:click|once|preventDefault={handleClick}>
	Click
</button>
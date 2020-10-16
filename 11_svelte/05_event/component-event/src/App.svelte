<script>
	import Parent from './Parent.svelte';

	// svelte는 하위 컴포넌트에서 상위 컴포넌트로 이벤트를 전달할 때
	// 내부적으로 javascript의 CustomEvent() 생성자를 사용해서 전달한다.
	// 그래서 하위 컴포넌트에서 상위 컴포넌트로 전달된 값도 detail 안에 들어가게 된다.
	// 참고 문서 : https://developer.mozilla.org/ko/docs/Web/API/CustomEvent/CustomEvent
	function handleMessage(event) {
		alert(event.detail.text);
	}
</script>

<!--
	컴포넌트 이벤트는 DOM 이벤트와 달리 이벤트 버블링이 일어나지 않기 때문에
	dispatch를 통해서 인위적으로 하위에서 상위 컴포넌트로 전달하는 작업을 수행해야 한다.
-->
<Parent on:message={handleMessage} />
<script>
	import { tick } from 'svelte';

	let text = 'Hello Wally';

	async function handleKeydown(event) {
		if (event.which !== 9) return; // Tab 키 이외의 것들은 모두 무시

		const { selectionStart, selectionEnd, value } = this; // this: textarea 의 요소 객체
		const selection = value.slice(selectionStart, selectionEnd);

		const replacement = /[a-z]/.test(selection)
			? selection.toUpperCase()
			: selection.toLowerCase();

		text = (
			value.slice(0, selectionStart) +
			replacement +
			value.slice(selectionEnd)
		);

		await tick(); // tick 함수의 return 값은 Promise 객체이므로 await 키워드를 붙여준다.
		// 만약 tick 함수를 사용하지 않으면 Tab 키를 누른 후 selection한 범위를 잃어버리게 된다.

		// 그래서 tick을 사용하는 이유는 svelte는 데이터의 변경을 즉각적으로 처리하지 않고
		// 버퍼에 쌓은 후 나중에 한꺼번에 반영하기 때문에
		// await tick 함수에 이전에 작성한 text의 변경내용이 화면에 업데이트 된다는 것을 보장해준다.(selection 유지)
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
	}
</script>

<textarea value={text} on:keydown|preventDefault={handleKeydown}></textarea>

<style>
	textarea {
		width: 100%;
		height: 200px;
	}
</style>
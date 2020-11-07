<script>
	import { fly } from 'svelte/transition';

	let visible = true;
	let status = '기다리는 중...';
</script>

<p>{status}</p>

<label>
	<input type="checkbox" bind:checked={visible}>
	visible
</label>

<!--
	[transition event]
	- on:introstart => 요소가 화면에 추가되기 시작했을 때 호출되는 이벤트
	- on:introend => 요소가 화면에 추가되는 것이 끝날 때 호출되는 이벤트
	- on:outrostart => 요소가 화면에 제거되기 시작했을 때 호출되는 이벤트
	- on:outroend => 요소가 화면에 제거되는 것이 끝날 때 호출되는 이벤트
-->
{#if visible}
	<p
		transition:fly={{ y: 200, duration: 2000 }}
		on:introstart={() => status = 'intro start'}
		on:introend={() => status = 'intro end'}
		on:outrostart={() => status = 'outro start'}
		on:outroend={() => status = 'outro end'}
	>
		Transition
	</p>
{/if}
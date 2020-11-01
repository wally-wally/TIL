<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// 0.4초 후에 0.2초 동안 동작하며 그 동작은 cubicOut이라는 애니메이션을 사용한다는 의미
	const progress = tweened(0, {
		delay: 200,
		duration: 400,
		easing: cubicOut,
	});
</script>

<!-- tweened의 return 값은 store이므로 $ 키워드를 사용해서 자동 구독하며 value에 할당했다. -->
<progress value={$progress}></progress>

<button on:click={() => $progress = 0}>0%</button>
<button on:click={() => $progress = 0.25}>25%</button>
<button on:click={() => $progress = 0.5}>50%</button>
<button on:click={() => $progress = 0.75}>75%</button>
<button on:click={() => $progress = 1}>100%</button>
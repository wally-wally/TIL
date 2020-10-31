<script>
  import { onDestroy, onMount } from 'svelte';
 
  let seconds = 0;
  const interval = setInterval(() => {
    seconds += 1;
    console.log('interval 중...');
  }, 1000);

  onMount(() => {
    return () => {
      console.log('onMount return'); // 컴포넌트 해제시 순서2(컴포넌트 제거 후 호출)
    }
  })

  onDestroy(() => {
    console.log('onDestroy'); // 컴포넌트 해제시 순서1(컴포넌트 제거 전 호출)
    clearInterval(interval);
  });
</script>

<p>{seconds} 초</p>
<script>
  // props를 전달받아서 사용할 때 export 키워드를 사용한다.
  // 일반 JS에서는 export가 다른 파일로 내보내는 역할을 하지만
  // svelte에서는 부모 컴포넌트에서 자식 컴포넌트로 값을 전달할 때 사용한다.
  export let test;
</script>

<p>{test}</p>
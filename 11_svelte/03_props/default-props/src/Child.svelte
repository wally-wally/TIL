<script>
  // 부모 컴포넌트에서 props로 값을 지정하지 않으면
  // 아래 구문에서 작성된 기본값이 설정된다.
  export let name = '기본값';
</script>

<p>{name}</p>
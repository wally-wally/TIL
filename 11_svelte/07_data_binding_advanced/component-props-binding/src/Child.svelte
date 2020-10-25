<script>
  export let number;

  function handleClick() {
    number *= number;
  }
</script>

<button on:click={handleClick}>제곱 하기</button>
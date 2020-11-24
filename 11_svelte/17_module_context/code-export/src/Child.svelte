<script context="module">
  let count = 0;

  export function printCount() {
    alert(count);
  }
</script>

<script>
  function handleClick() {
    count += 1;
    console.log(count);
  }
</script>

<div>
  {count}
</div>
<button on:click={handleClick}>Add</button>
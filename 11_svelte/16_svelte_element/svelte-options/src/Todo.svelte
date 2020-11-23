<script>
  import { afterUpdate } from 'svelte';
  export let todo;

  let updateCount = 0;
  afterUpdate(() => {
    updateCount += 1;
  })
</script>

<!-- 아래 immutable을 주석처리하면 모든 todo 상태가 동시에 변경된다. -->
<svelte:options immutable={true} />

<div on:click>
  {todo.done} {todo.text} / {updateCount}회 변경됨
</div>
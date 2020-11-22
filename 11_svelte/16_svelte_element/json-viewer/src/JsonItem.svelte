<script>
  export let json;
  export let key = 'JSON'; // 첫 부모 컴포넌트에서 key를 전달받지 못했으므로 'JSON'이라고 기본값을 지정한다.

  const obj = JSON.parse(json);
  let expanded = false;
  const entries = Object.entries(obj);  
  const type = Object.prototype.toString.call(obj);
  let value;
  if (type === '[object Array]') {
    value = `[${entries.length}]`
  } else if (type === '[object Object]') {
    value = `{${entries.length}}`
  } else {
    value = json;
  }
</script>

<div>
  <span>{key}</span>: <span on:click={() => expanded = !expanded}>{value}</span>
  {#if expanded}
    {#each entries as [key, value], index (index)}
      <svelte:self {key} json={JSON.stringify(value)} />
    {/each}
  {/if}
</div>

<style>
  div {
    padding-left: 10px;
  }
</style>
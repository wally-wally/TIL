<script>
  import { onMount } from 'svelte';
  let photos = [];

  onMount(() => {
    const res = fetch('https://jsonplaceholder.typicode.com/photos?_limit=20')
      .then(async res => {
        photos = await res.json();
      })

    // onMount 함수는 함수를 return할 수 있는데 이는 컴포넌트가 제거될 때 return 된다.
    return () => {
      console.log('destoryed');
    }
  });
</script>

{#each photos as photo (photo.id)}
  <figure>
    <img src={photo.thumbnailUrl} alt={photo.title}>
    <figcaption>{photo.title}</figcaption>
  </figure>
{:else}
  <p>로딩 중...</p>
{/each}
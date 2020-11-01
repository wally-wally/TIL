<script>
	import { name, greeting } from './stores';
</script>

<p>{$greeting}</p>
<input type="text" bind:value={$name}>

<button on:click={() => $name += '!'}>Add '!'</button>
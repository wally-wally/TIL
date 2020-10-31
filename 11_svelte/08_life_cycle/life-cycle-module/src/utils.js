import { onDestroy } from 'svelte';

export function onInterval(callback, ms) {
  const interval = setInterval(callback, ms);
  onDestroy(() => {
    clearInterval(interval);
  });
}
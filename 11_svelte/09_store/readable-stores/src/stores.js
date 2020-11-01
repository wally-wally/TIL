import { readable } from 'svelte/store';

export const time = readable(new Date(), function(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);
  return function stop() {
    clearInterval(interval);
  }
});
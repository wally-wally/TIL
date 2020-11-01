import { readable, derived } from 'svelte/store';

export const time = readable(new Date(), function(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);
  return function stop() {
    clearInterval(interval);
  }
});

const start = new Date();

export const elapsed = derived(
  time,
  ($time) => {
    return Math.round(($time - start) / 1000)
  }
);
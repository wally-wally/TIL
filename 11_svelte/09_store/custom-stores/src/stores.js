import { writable } from 'svelte/store';

function createCount() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update(x => x + 1),
    decrement: () => update(x => x - 1),
    reset: () => set(0)
  }
}

export const count = createCount();
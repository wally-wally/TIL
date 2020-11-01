import { writable, derived } from 'svelte/store';

export const name = writable('Wally');

export const greeting = derived(
  name,
  $name => `Hello, ${$name}`
);
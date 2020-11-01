import { writable } from 'svelte/store';

// writable 함수의 전달 인자: 공유할 자원의 초기값
// writable 함수의 return 값: 공유할 store 객체(set, update, subscribe 함수를 포함하는 객체)
export const count = writable(0);
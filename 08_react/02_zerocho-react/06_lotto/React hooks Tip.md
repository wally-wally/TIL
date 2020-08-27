# :notebook_with_decorative_cover: React hooks Tip

<br>

## :one: `componentDidMount`에서만 실행하고 싶을 때

```jsx
useEffect(() => {
  // 여기에 수행할 동작 작성
}, []);
```

<br>

## :two: `componentDidUpdate`에서만 실행하고 싶을 때

```jsx
const mounted = useRef(false);
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
    // 여기에 수행할 동작 작성
  }
}, [바뀌는값]);
```

<br>

## :three: `useMemo`, `useRef`, `useCallback`

| hooks         | contents                             |
| ------------- | ------------------------------------ |
| `useMemo`     | 복잡한 함수 결괏값(return 값)을 기억 |
| `useRef`      | 일반 값을 기억                       |
| `useCallback` | 함수 자체를 기억                     |

<br>

## :four: etc

- 조건문 안에 `useState`, `useRef` 와 같은 hooks를 절대로 넣지 말자.
- 함수나 반복문 안에도 웬만하면 넣지 말자
- `useCallback`, `useEffect` 안에서도 `useState` 같은 것들을 웬만하면 쓰지 말자.
- 그래서 hooks는 최상위에 순서를 고려해서 작성하도록 하자
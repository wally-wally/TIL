# 01_action

<br>

## 1. Action 함수

```typescript
action = (node: HTMLElement, parameters: any) => {
  update?: (parameters: any) => void,
  destroy?: () => void
}
```

- 파라미터
  - `node`: 액션이 선언된 HTML 요소
  - `parameters`: `use:액션_이름={parameters}`로 전달되는 `parameters`

- 리턴 값
  - 액션 함수는 `update`와 `destroy` 속성을 가지는 객체를 리턴해야 한다.
  - `update`와 `destroy`는 함수로 액션의 라이프 사이클 함수이다.

<br>

## 2. 라이프 사이클

- 액션의 라이프 사이클

```javascript
function foo(node, bar) {
  // the node has been mounted in the DOM
  
  return {
    update(bar) {
      // the value of 'bar' has changed
    }
      
    destroy() {
      // the node has been removed from the DOM
    }
  }
}
```

- `update`: 액션이 선언된 DOM이 마운트 된 후 액션의 파라미터가 변경될 때마다 호출
- `destroy`: 액션이 선언된 DOM이 제거되기 직전에 호출됨, 할당받은 자원을 이 라이프 사이클 함수에서 해제해야 함
- `mount`: 액션이 선언된 DOM이 마운트 된 후 동작해야 할 코드가 있다면 함수의 본문에 선언하면 된다.
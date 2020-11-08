# 01_animation

<br>

## 1. `flip` 애니메이션

> `flip` 함수는 아래와 같은 파라미터를 가진다.

- `delay` (number, default 0): 단위는 ms로 설정한 시간이 지난 후에 애니메이션을 시작한다.
- `duration` (number | function, default: `d => Math.sqrt(d) * 120`): 숫자 혹은 함수가 올 수 있다.
  - `number`: 단위는 ms이다.
  - `function`: `distance: number => duration: number` 형태의 함수가 와야 한다. `distance`는 애니메이션으로 움직여야 할 픽셀이고, 함수의 return 값은 ms 단위의 지속시간이다.
- `easing` (function, default cubicOut): easing 함수이다.
  - 참고문서: https://svelte.dev/docs#svelte_easing

<br>

## 2. 커스텀 애니메이션

- 애니메이션 함수의 형태와 애니메이션 함수의 파라미터로 사용되는 `DOMRect` 객체의 형태는 아래와 같다.

```typescript
animation = (node: HTMLElement, { from: DOMRect, to: DOMRect }, params: any) => {
  delay?: number,
  duration?: number,
  easing?: (t: number) => number,
  css?: (t: number, u: number) => string,
  tick?: (t: number, u: number) => void
}
```

```typescript
DOMRect {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
  x: number,
  y: number
}
```

- **애니메이션 함수의 파라미터**
  - `node`: 애니메이션이 적용되는 HTML 요소
  - `{ from: DOMRect, to: DOMRect }`: 애니메이션이 시작될 때의 정보 `from`과 애니메이션이 끝날 때의 정보 `to`를 속성으로 가지는 객체
  - `params`: `animate:애니메이션 이름={params}`의 `params`로 전달될 값이다. 모든 형태의 값을 전달할 수 있다.

- **return 값** - 애니메이션 함수는 객체를 리턴해야 한다. 리턴하는 객체는 아래의 속성을 가져야 하는데, 트랜지션 함수의 객체와 동일하다.
  - `delay`: 단위는 ms로 설정한 시간이 지난 후에 애니메이션을 시작한다.
  - `duration`: 단위는 ms로 설정한 시간 동안 애니메이션이 동작한다.
  - `easing`: `p => t` 형태의 easing 함수이다.
  - `css`: `(t, u) => css` 함수이다. `t`는 0 ~ 1 사이의 값이고, `u`는 `u === 1 - t` 이다. 요소가 추가될 때 `t`는 0에서 1로 증가하고, 요소가 제거될 때 `t`는 1에서 0으로 감소한다. `t`(혹은 `u`)의 변화에 따른 CSS 문자열을 return 해야 한다.
  - `tick`: `(t, u) => { ... }` 함수이다. 매 tick마다 호출되는 콜백 함수이다.
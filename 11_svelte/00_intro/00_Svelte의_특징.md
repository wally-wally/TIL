# Svelte의 특징

---

:heavy_check_mark: <b>Svelte 공식 문서</b>

- 아래 이미지를 클릭하면 Svelte 공식 문서로 이동합니다.

<a href="https://svelte.dev/" target="_blank"><img src="https://user-images.githubusercontent.com/52685250/95838197-741b8b00-0d7c-11eb-86d8-58581e72b1bb.png" width="600px"></a>

---

<br>

## 1. Write less code

> **코드를 간결하게 작성할 수 있다.**

- 번들 크기 감소
  - SPA(Single Page Application) 단점 보완
- 유지보수 비용 감소

<br>

## 2. No virtual DOM

> **Virtual DOM을 사용하지 않는다.**

- Virtual DOM은 항상 빠르지 않다.
  - Virtual DOM을 사용하면 변경 전과 변경 후를 비교하는 overhead가 발생한다.
  - React.js에서는 `shouldComponentUpdate`를 사용하여 최적화 하기도 하지만, Svelte는 최적화가 필요하지 않다.
- 런타임을 포함하지 않는다.
  - Virtual DOM은 변경된 내용을 알기 위한 수단으로 사용된다.
  - Svelte는 Virtual DOM을 사용하지 않아도 변경된 내용을 알 수 있다.
  - Svelte는 변경된 내용을 알기 위해 사용되는 런타임을 포함하지 않아 번들 파일의 크기가 작다.

<br>

## 3. Truly Reactive

> **진짜 반응형 프레임워크이다.**

- Svelte는 컴파일러이다.
  - Vue와 React는 런타임에 Virtual DOM을 비교해서 변경된 내용을 파악하는 방식을 사용한다.
  - Svelte는 빌드 타임에 어느 부분이 변경될지 파악하는 방식을 사용한다.
  - Svelte는 어느 부분이 변경될 지 파악하고 그 부분의 상태가 변경될 경우 반응형으로 화면을 업데이트하는 진짜 반응형이다.
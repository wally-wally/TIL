# 04. CSS 애니메이션 vs JS 애니메이션

<br>

## (1) CSS 애니메이션

- 일반적으로, 마우스를 올렸을 때 혹은 메뉴 버튼의 전환과 같은 <b>간단하게 처리하는 애니메이션</b>의 경우 CSS로 처리한다. 
- ex) 어떤 박스를 이동하는 애니메이션
  - CSS Animation: `transform`, `translate` 를 사용
  - JS Animation: `setInterval`을 통해서 `style.top`와 같은 속성을 변화시켜줘야 하기 때문에 브라우저 렌더링 과정에서 reflow(layout) 단계가 계속 실행된다. 그래서 애니메이션이 다소 부자연스럽게 끊기는 듯한 느낌을 받게 된다.
- <b>반응형</b>으로 애니메이션을 구현하기에 유용한데, <b>미디어 쿼리</b>로 애니메이션을 적용하면 된다.
- <b>외부 라이브러리를 필요로 하지 않는다.</b>
- CSS 자체가 <b>선언형(declarative)</b>이기 때문에 어떤 요소가 애니메이션을 가져야 한다는 <b>직관적인 표현</b>이 가능하다.
- 메인 쓰레드가 아닌 <b>별도의 컴포지터 쓰레드(Compositor Thread)</b>에서 그려지기 때문에 메인 쓰레드에서 작업하는 JS보다 효율적이다.
  - 메인 쓰레드 : 자바스크립트 실행과 Dom 엘리먼트 렌더링을 담당
  - 컴포지터 쓰레드 : GPU를 이용하여 렌더링된 엘리먼트를 화면에 그리는 역할을 담당
- 컴포지터 쓰레드가 이용하는 GPU는 아래와 같은 작업들은 빠르게 수행한다.
  - 비트맵을 화면에 그리는 작업
  - 같은 비트맵을 다시 그리는 작업
  - 같은 비트맵을 다른위치로 이동, 회전, 크기를 변경하여 다시 그리는 작업

<br>

## (2) JS 애니메이션

- CSS로 처리하기에는 훨씬 <b>복잡하고 무거운 애니메이션</b> 작업들을 효율적이고, 세밀하게 다루기 위해 사용한다. 
- RequestAnimationFrame API
  - 바닐라 자바스크립트로 애니메이션을 구현할 경우 계속해서 요소의 위치를 재계산하기 때문에 비효율적이며 사용자 눈에는 부자연스럽게 끊기는 듯한 느낌을 줘서 사용자가 부드럽다고 느끼는 평균 프레임률인 60fps를 유지하지 못한다.
  - 이러한 문제점을 해결하기 위해 RequestAnimationFrame API가 등장했고 구현방식은 바닐라 JS일 때와 동일하지만 60fps를 보장할 수 있게 되었다.
- 이외에도 외부 라이브러리인 Velocity.js와 GSAP 같은 라이브러리를 통해서 성능 좋은 애니메이션을 구현할 수 있다. 
- 요소의 스타일이 변하는 순간마다 제어할 수 있기 때문에 애니메이션의 <b>세밀한 구성</b>이 가능해진다.
- <b>GPU를 통한 하드웨어 가속을 제어</b>할 수 있다. 이는 CSS의 특정 속성으로 인한 가속을 막아주는데, 하드웨어 가속이 모바일에서 성능저하를 발생시킬 수 있기 때문에 이런 면에선 좋다.
- <b>브라우저 호환성 측면</b>에서 `transition` / `animation` 속성보다 뛰어나다.

<br>

![img](https://64.media.tumblr.com/fcb2f559cdffdfc28e73ef5a5bcd24be/tumblr_inline_n846fkSD6H1r38j4f.png)

<br>

---

:page_facing_up: <b>Reference</b>

- https://github.com/baeharam/Must-Know-About-Frontend/blob/master/Notes/frontend/css-js-animation.md
- https://html5crew.tumblr.com/post/90615657642/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%8F%99%EC%9E%91%EC%9B%90%EB%A6%AC%EB%A5%BC-%ED%86%B5%ED%95%B4%EC%84%9C-%EB%B3%B8-css-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98%EC%9D%98-%EC%84%B1%EB%8A%A5

---


# 13. AJAX

<br>

## (1) AJAX란?

- 비동기적으로 자바스크립트를 사용해서 데이터를 받아와 동적으로 DOM을 갱신 및 조작하는 기법
  - 여기서 xml이 있는 이유는 예전에 데이터 포맷으로 XML을 많이 사용했기 때문

<br>

## (2) 동작 방식

- 사용자가 AJAX가 적용된 UI와 상호작용하면, 서버에 AJAX 요청 보냄
- 서버는 DB에서 데이터를 가져와서 JS 파일에 정의되어 있는 대로 HTML/CSS와 데이터를 융합해서 만든 DOM 객체를 UI에 업데이트
- 모두 비동기 처리로 이루어지며 , 필요한 데이터만을 요청해서 받기 때문에 일부만 업데이트하는 방식

<br>

## (3) 사용 방법

- XMLHttpRequest
  - XMLHttpRequest 객체를 사용해서 인스턴스를 만들고 인스턴스의 `open()` 메서드로 요청전 전송 방식이나 요청 주소 설정 후 `send()` 메서드로 요청하는 방식

- fetch API
  - XMLHttpRequest 보다 훨씬 직관적으로 코드 작성 가능
  - ES6에서 표준되었고, Promise 객체를 return
  - IE는 지원 안 함

<br>

## (4) 장단점

- 장점
  - 페이지 전환 없이 빠르게 화면 일부분만 업데이트 가능
  - 서버 처리를 기다리지 않고 비동기 요청 가능
- 단점
  - 지원하지 않는 브라우저가 있다.
  - 무분별하게 사용하면 역으로 서버 부하가 늘어날 수 있다.

<br>

---

:page_facing_up: <b>Reference</b>

- https://github.com/baeharam/Must-Know-About-Frontend/blob/master/Notes/javascript/ajax.md

---


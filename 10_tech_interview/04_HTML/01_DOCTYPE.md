# 01. DOCTYPE

<br>

- Document Type의 약자로 HTML 문서가 어떤 버전으로 작성되었는는지 미리 선언하여 웹브라우저가 내용을 올바로 표시할 수 있도록 해주는 것
- `<!DOCTYPE>`으로 선언하는데 이걸 해주지 않으면 <b>호환 모드</b>로 동작한다.
  
  - 호환 모드의 경우 각 브라우저마다 문서를 나타내는 방식이 다르기 때문에 크로스 브라우징 이슈가 훨씬 심해지게 된다.
- HTML을 나타내주는 DTD(Document Type Definition)로 볼 수 있다.
  
- DTD는 문서 형식을 정의해놓은 것으로 DOCTYPE을 명시할 때 사용한다. 즉, HTML 문서가 어떤 문서 형식을 따르는지 DOCTYPE에서 DTD를 지정하는 것이다.
  
- 현 시점에서 가장 바람직한 DOCTYPE 명시 방법

  ```HTML
  <!DOCTYPE html>
  ```

<br>

---

:heavy_check_mark: <b>[참고] 표준 모드와 호환 모드</b>

- 브라우저는 HTML 문서가 DOCTYPE을 가지고 있지 않으면 호환 모드로 렌더링을 하고, 가지고 있다면 주어진 DOCTYPE에 맞게 표준 모드로 렌더링을 한다.
- 호환 모드로 렌더링을 하게 되면 오래된 웹페이지들을 최신 버전의 브라우저에서도 깨지지 않게 하기 때문에 각 브라우저마다 다르게 보일 수 있다.
  - 예를 들어, IE의 경우 호환 모드에서 박스 모델(Box model)을 잘못 해석하지만, 나머지 브라우저들을 그렇지 않다.

- 정말 특별한 경우가 아니라면 DOCTYPE을 명시하여 브라우저가 표준 모드로 렌더링 하게 하자. 

---

<br>

---

:page_facing_up: <b>Reference</b>

- https://velog.io/@jakeseo_me/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9D%B8%ED%84%B0%EB%B7%B0-%EB%AC%B8%EC%A0%9C-%EB%8B%B5%ED%95%B4%EB%B3%B4%EA%B8%B0-2-DOC-TYPE%EA%B3%BC-%EB%8B%A4%EA%B5%AD%EC%96%B4-%EC%BD%98%ED%85%90%EC%B8%A0

---


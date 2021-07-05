# 01. What is webpack?

<br>

- webpack은 모던 JavaScript 애플리케이션을 위한 **정적 모듈 번들러**이다.
- webpack이 애플리케이션을 처리할 때, 내부적으로는 프로젝트에 필요한 모든 모듈을 매핑하고 **하나 이상의 번들을 생성**하는 **디펜던시 그래프**를 만든다.

---

:heavy_plus_sign: <b>Dependency Graph</b>

- Dependency Graph란?
  - 하나의 파일이 다른 파일에 의존할 때마다, webpack은 이것을 의존성으로 취급합니다.
  - 이를 통해 webpack은 이미지 또는 웹 폰트와 같은 코드가 아닌 애셋을 가져와, 애플리케이션에 의존성으로 제공할 수 있습니다.
  - 즉, 모든 리소스(javascript, css, img, fonts, etc)에 대해 서로 간의 의존성 관계를 형성하여 Dependency Graph를 구성하고 이를 통해 필요한 형태의 하나 또는 여러 개의 bundle 파일로 생성한다.
- Browsify, Grunt, Gulp 등의 도구들은 webpack과 무슨 차이가 있을까?
  - 크고 복잡하며 다양한 리소스들이 들어있는 프로젝트에는 webpack을 사용하는 것이 좋다.
  - Grunt, Gulp는 오로지 리소스들에 대한 툴로 사용되며 Dependency Graph에 대한 개념이 없다.
  - Browsify는 비슷한 도구이지만 속도면에서 webpack이 더 좋다.

> 애플리케이션 번들링은 브라우저가 새 요청을 시작하는 동안 앱이 기다려야 하는 횟수를 최소화하므로 HTTP/1.1 클라이언트에 특히 강력하다다.
>
> HTTP/2의 경우, 코드 스플리팅을 사용하여 좋은 결과를 얻을 수도 있다.

---

:heavy_plus_sign: <b>HTTP1.1 vs HTTP2.0</b>

<img src="https://miro.medium.com/max/700/1*m3TqLQ2sXE51-6b8rNLsmA.gif">

- HTTP1.1은 기본적으로 연결당 하나의 요청과 응답을 처리
  - 그렇기 때문에 동시전송 문제와 다수의 리소스를 처리하기에 속도와 성능 이슈 존재
  - HOL(Head Of Line) Blocking-특정응답지연, RTT(Round Trip TIme) 증가, 헤비한 Header구조라는 문제점들을 가지고 있다.
  - 이러한 문제를 해결하기 위해 이미지 스프라이트, 도메인샤딩, CSS/JavaScript 압축, Data URI 등을 업무에 사용

- HTTP2는 성능 뿐만 아니라 속도면에서도 월등하다.
  - Multiplexed Streams(한 커넥션에 여러개의 메세지를 동시에 주고 받을 수 있음)
  - Stream Prioritization(요청 리소스간 의존관계를 설정)
  - Server Push(HTML문서상에 필요한 리소스를 클라이언트 요청없이 보내줄 수 있음)
  - Header Compression(Header 정보를 HPACK압충방식을 이용하여 압축전송)

:book: <b>Reference</b>

- https://medium.com/@shlee1353/http1-1-vs-http2-0-%EC%B0%A8%EC%9D%B4%EC%A0%90-%EA%B0%84%EB%8B%A8%ED%9E%88-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0-5727b7499b78

---


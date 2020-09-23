# 05. Web Storage

<br>

## (1) Cookie

- 사용자가 웹사이트 접속시 클라이언트 측의 브라우저에 저장되는 작은 텍스트 파일

<br>

## (2) Web Storage - `Local Storage`, `Session Storage`

- 로컬 스토리지, 세션 스토리지 모두 클라이언트 상에서 key/value 쌍으로 저장할 수 있는 메커니즘
- 키와 값은 뭐가 들어와도 문자열로 변환되어 저장된다.
  - 그렇기 때문에 객체를 읽고 쓰려면 `JSON.stringify()` 메서드와 `JSON.parse()` 메서드를 사용해야 한다.
- 브라우저별 용량제한이 다르다.
- origin(도메인)별 Storage는 다르며, origin별 용량제한이 있다.
  - 프로토콜, 호스트, 포트가 같으면 같은 스토리지를 공유한다.
- 이것마저 용량이 부족하다면 IndexedDB 가 있다.
- 또한 쿠키와 가장 큰 차이점은 서버와 통신을 하지 않는다는 것이다.
  - 쿠키는 매 요청마다 서버로 쿠키가 같이 전송(쿠키는 처음부터 서버와 클라이언트 간의 지속적인 데이터 교환을 위해 만들어졌기 때문)하지만 로컬 스토리지와 세션 스토리지는 서버로 전송 안해도 되는 불필요한 데이터를 저장하면 된다.
- 영구히 데이터 저장이 가능하다.
  - 쿠키는 만료일자를 지정하게 되어 있어 언젠가 제거된다. 만료일자로 지정된 날짜에 쿠키가 제거됨
  - 만약 만료일자를 지정하지 않으면 세션 쿠키가 되고, 영구 쿠키를 원하면 만료일자를 굉장히 멀게 설정해서 해결할 수 있다.
  - 반면 Web Storage는 만료기간의 설정이 없다. 그래서 한번 저장한 데이터는 영구적으로 존재한다.
- 다만 주의해야할 점은 사용자가 로컬 스토리지나 세션 스토리지에 마음대로 접근하여 데이터를 보고 지우고 변조할 수 있다.
  - 그래서 민감한 데이터는 로컬 스토리지나 세션 스토리지에 저장하지 않는 것이 좋다.

<br>

## (3) Local Storage

- 일부러 지우지 않는다면 브라우저를 열고 닫아도 계속 남아있다.
- 사용예제 : 지속적으로 필요한 데이터(자동 로그인 등)
- 도메인만 같으면 전역적으로 공유 가능하다.

<br>

## (4) Session Storage

- 로컬 스토리지와 달리 페이지의 window가 바뀌거나 브라우저 탭을 닫을 때 사라진다.
- 사용예제 : 잠깐 동안 필요한 정보(일회성 로그인 정보)
- SessionStorage 역시 Web Storage의 기본 보안 처럼 도메인별로 별도로 생성된다.
  - 여기 더불어 SessionStorage는 같은 사이트의 같은 도메인이라 할지라도 브라우저가 다르면 서로 다른 영역이 된다. 브라우저 컨텍스트가 다르기 때문이다.

<br>

## :mag: 각 Web Storage 비교 정리

|               | cookie           | local storage         | session storage         |
| ------------- | ---------------- | --------------------- | ----------------------- |
| 생성자        | 클라이언트/서버  | 클라이언트            | 클라이언트              |
| 지속시간      | 설정 여부에 따름 | 명시적으로 지울때까지 | 탭 / 윈도우 닫을 때까지 |
| 용량          | 5KB              | 5MB / 10MB            | 5MB                     |
| 서버와의 통신 | O                | X                     | X                       |
| 취약점        | XSS / CSRF 공격  | XSS 공격              | XSS 공격                |

<br>

---

:page_facing_up: <b>Reference</b>

- https://velog.io/@jakeseo_me/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9D%B8%ED%84%B0%EB%B7%B0-%EB%AC%B8%EC%A0%9C-%EB%8B%B5%ED%95%B4%EB%B3%B4%EA%B8%B0-7-cookie-sessionStorage-localStorage-%EC%82%AC%EC%9D%B4%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%84-%EC%84%A4%EB%AA%85%ED%95%98%EC%84%B8%EC%9A%94
- https://github.com/baeharam/Must-Know-About-Frontend/blob/master/Notes/html/web-storage-api.md
- https://sjh836.tistory.com/162
- https://velog.io/@ejchaid/localstorage-sessionstorage-cookie%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90

---


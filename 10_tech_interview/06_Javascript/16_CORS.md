# 16. CORS

<br>

## (1) 동일 출처 정책(Same-Origin Policy)

- 어떠한 문서나 스크립트가 다른 **프로토콜 / 포트 / 호스트** 에 있는 리소스 사용하는 것을 제한하는 정책.
- `http://website.com/ex/ex.html` 와 같은 사이트에서 리소스를 다른 곳으로 요청한다고 가정하자.

| 리소스 요청                      | 허용여부            |
| -------------------------------- | ------------------- |
| http://website.com/ex/           | 성공                |
| http://website.com/ex1/          | 성공                |
| http://website.com:81/ex/ex.html | 실패, 포트가 다름   |
| http://wwebsite.com/ex/          | 실패, 호스트가 다름 |
| https://website.com/ex/ex.html   | 실패, 프로토콜 다름 |

- 위와 같이 호스트, 포트, 프로토콜 중 하나라도 다르면 동일 출처 정책이 적용되서 요청에 실패한다.
- 이와 같은 SOP 정책 문제를 해결하기 위해 `CORS` 가 있다.

<br>

## (2) CORS(Cross-Origin Resource Sharing)

<img src="https://user-images.githubusercontent.com/52685250/69104662-757cfe80-0aac-11ea-97de-f781540b3fb2.png" alt="CORS_principle" width="650px">

- 한 도메인에서 로드되어 다른 도메인에 있는 리소스와 상호 작용 하는 것.

  - 즉, 도메인이나 포트가 다른 서버의 자원을 요청하는 메커니즘.

- HTTP 헤더를 사용하여 클라이언트와 서버로 하여금 서로에 대해 인지하고 한 출처에서 다른 출처의 자원을 사용할 수 있게 하는 메커니즘이다. 클라이언트가 서버에 HTTP 요청을 보낼 때 HTTP 헤더의 `Origin` 속성에 자동으로 값이 할당된다.

  ```
  Origin: http://company.com
  ```

- 이 도메인에서 다른 출처의 자원을 사용하기 위해 ajax 요청을 했다고 하면 SOP 정책 때문에 에러가 발생한다. 따라서 이를 해결하기 위해, **서버의 HTTP 응답 헤더**에 다음과 같이 요청을 허용하는 도메인을 명시한다.

  ```
  Access-Control-Allow-Origin: http://company.com
  ```

- 예를 들어, `http://localhost:8080/` 에서 vue를 실행하고, `http://localhost:8000/` 에서 django를 실행할 경우 포트가 달라 다른 도메인으로 인지하고 브라우저가 요청을 차단한다.
  - 가장 쉬운 방법은 서버(django)와 클라이언트(vue)가 같은 도메인과 포트를 사용하도록 한다. => 하지만 이 방법으로는 잘 해결 안 함
  - 서버에서 cross-origin HTTP 요청을 허가한다.
    - 실제 API 서버들은 이러한 CORS 제한과 관련된 처리를 모두 해두어야한다.
    - django의 경우 `django-cors-headers` 패키지를 설치 후 `settings.py`에서 `CORS_ORIGIN_ALLOW_ALL = True`로 설정한 기억이 있다.

<br>

---

:page_facing_up: <b>Reference</b>

- https://github.com/baeharam/Must-Know-About-Frontend/blob/master/Notes/security/sop.md

---


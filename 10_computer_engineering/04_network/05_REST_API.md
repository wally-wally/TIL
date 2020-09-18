# 05. REST API

<br>

## (1) REST와 API의 의미

- REST는 REpresentational State Transfer의 약자로 전반적인 웹 어플리케이션에서 상호작용하는데 사용되는 웹 아키텍처 모델(**자원의 이름(자원의 표현)**으로 구분하여 해당 **자원의 상태(정보)**를 주고 받는 모든 것을 웹의 장점을 활용한 아키텍처 모델)
  - 즉, **자원을 주고받는 웹 상에서의 통신 체계에 있어서 범용적인 스타일을 규정한 아키텍처**
  - REST는 기본적으로 웹의 기존 기술과 HTTP 프로토콜을 그대로 활용하기 때문에 웹의 장점을 최대한 활용할 수 있는 아키텍처 스타일
  - REST는 **네트워크 상에서 Client와 Server 사이의 통신 방식 중 하나**이다.
- API는 Application Programming Interface의 약자로 기존에 있는 응용 프로그램을 통해서 데이터를 제공받거나 기능을 사용하고자 할 때 사용하는 인터페이스 및 규격을 말한다.
- 데이터와 기능의 집합을 제공하여 컴퓨터 프로그램간 상호작용을 촉진하며, 서로 정보를 교환가능 하도록 하는 것
- 그래서 REST API는 REST 원칙을 적용하여 서비스 API를 설계하는 것을 말한다.

<br>

## (2) REST

- HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다.
  - 즉, 자원 기반의 구조 설계 중심에 Resource가 있고 HTTP Method를 통해 Resource를 처리하도록 설계된 아키텍처
- 웹 사이트의 이미지, 텍스트, DB 내용 등의 모든 자원에 고유한 ID인 HTTP URI를 부여한다.
- CRUD Operation
  - Create : 생성(POST)
  - Read : 조회(GET)
  - Update : 수정(PUT)
  - Delete : 삭제(DELETE)

<br>

## (3) REST의 장단점

- 장점
  - HTTP 프로토콜을 그대로 사용하므로 REST API 사용을 위한 별도의 인프라를 구축할 필요가 없다.
  - 그렇기 때문에 HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.
  - REST API 메시지가 의도하는 바를 명확하게 나타내므로 의도하는 바를 쉽게 파악할 수 있다.
  - 서버와 클라이언트의 역할을 명확하게 분리한다.(어디에서 데이터를 요청하고 어디에서 데이터를 제공하는지 명확하게 분리 가능)
- 단점
  - 사용할 수 있는 메소드가 4가지 밖에 없다.(HTTP Method 형태가 제한적)
  - 구형 브라우저가 모든 부분을 지원하지 않는다.
    - ex) PUT, DELETE를 사용하지 못함

<br>

## (4) REST 구성 요소

- **자원(Resource)**
  - 모든 자원에 고유한 ID가 존재하고, 이 자원은 서버에 존재한다.
  - 자원을 구별하는 ID는 **HTTP URI**이다.
  - 클라이언트는 URI를 이용해서 자원을 지정하고 해당 자원의 상태에 대한 조작을 서버에 요청
- **행위(Verb)**
  - **HTTP 프로토콜의 Method**를 행위로 사용한다.
  - GET, POST, PUT, DELETE Method가 있다.
- **표현(Representation of Resource)**
  - **Client가 자원의 상태(정보)에 대한 조작을 요청하면 Server는 이에 적절한 응답(Representation)**을 보낸다.
  - REST에서 하나의 자원은 JSON, XML, TEXT, RSS 등 여러 형태의 Representation으로 나타내어 질 수 있다.
  - JSON 혹은 XML를 통해 데이터를 주고 받는 것이 일반적이다.

<br>

## (5) REST 특징

- **서버-클라이언트 구조**
  - 자원이 있는 쪽이 서버, 자원을 요청하는 쪽이 클라이언트가 된다.
  - 각각 역할이 명확히 구분되므로 서로 간 의존성이 줄어든다.
- **무상태(Stateless)**
  - HTTP 프로토콜은 Stateless Protocol이므로 REST 역시 무상태성을 갖는다.
  - 서버는 클라이언트의 상황을 고려하지 않고 API 요청에 대해서만 처리하므로 이를 '상태가 없다'라고 표현한다.
  - 이렇게 되면 클라이언트를 고려하지 않아도 되므로 구현이 간결해진다.
- **캐시 처리 가능(Cacheable)**
  - REST는 HTTP 프로토콜을 기반으로 만들어졌기 때문에 HTTP의 특징인 캐싱을 사용할 수 있다.
    - HTTP 프로토콜에서 사용하는 `Last-Modified` 태그나 `e-tag`를 이용해서 캐싱 구현이 가능하다.
  - `GET` 메소드를 `Last-Modified` 값과 함께 보낼 경우, 컨텐츠의 변화가 없을 때 캐시된 값을 사용한다.
    - 이렇게 되면 네트워크 응답 시간 뿐만 아니라 API 서버에 요청을 발생시키지 않아 서버의 부담이 덜하다는 장점이 있다.
  - `Last-Modified` 태그
    - 가장 마지막에 수정했던 시간을 기준으로 판단
  - `e-tag` 태그
    - 파일 수정 여부만 판별
- **인터페이스 일관성(Uniform Interface)**
  - URI로 지정한 Resource에 대한 조작을 통일되고 한정적인 인터페이스로 수행
  - HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능
    - 특정 언어나 기술에 종속되지 않는다.
- **자체 표현성(Self-Descriptiveness)**
  - REST API의 자원명시 규칙이나 메소드는 그 자체로도 의미를 지니므로 어떤 요청에 있어서 그 요청 자체로 어떤 것을 표현하는지 알아보기 쉽다.
  - 물론 대부분 API는 공식 문서를 통해서 가이드를 제공하지만 그렇지 않은 경우 REST API의 자원명시 규칙이나 메소드만 보고서도 어떠한 의미인지 알아야 좋은 REST API라고 할 수 있다.

<br>

## (6) REST API 특징

- 사내 시스템들도 **REST 기반으로 시스템을 분산**해 확장성과 재사용성을 높여 **유지보수 및 운용을 편리**하게 할 수 있다.
- REST는 **HTTP 표준을 기반으로 구현**하므로, **HTTP를 지원하는 프로그램 언어로 클라이언트, 서버를 구현할 수 있다.**
- 즉, REST API를 제작하면 델파이 클라이언트 뿐 아니라, 자바, C#, 웹 등을 이용해 클라이언트를 제작할 수 있다.

<br>

## (7) REST API 설계 규칙

> - 도큐먼트 : 객체 인스턴스나 데이터베이스 레코드와 유사한 개념
> - 컬렉션 : 서버에서 관리하는 디렉터리라는 리소스
> - 스토어 : 클라이언트에서 관리하는 리소스 저장소

- URI는 정보의 자원(리소스)을 표현해야 한다.
  - 리소스는 동사보다는 명사, 대문자보다는 소문자 사용
  - 도큐먼트명은 단수 명사
  - 컬렉션명과 스토어명은 복수명사
  - ex) `/locations/seoul/schools/3` => `locations` : 컬렉션, `schools` : 도큐먼트
- 자원의 행위는 HTTP Method로 표현
  - URI에 HTTP Method가 들어가면 안된다.
  - URI 행위에 대한 동사 표현이 들어가면 안 된다.
- 슬래시 구분자는 계층 관계를 나타내는데 사용
- URI 마지막 문자로 슬래시는 포함하지 않는다.
  - REST API는 분명한 URI를 만들어서 통신해야하므로 혼동을 주지 않기 위해 URI 경로 마지막에는 슬래시를 사용하지 않는다.
- 하이픈(`-`)은 URI 가독성을 높이는데 사용(ex. 불가피하게 긴 단어)
- 언더바(`_`)는 URI에 사용하지 않는다.
  - 보기도 어렵고 밑줄 때문에 문자가 가려질수도... (가독성을 위해 사용 금지)
- URI 경로에는 소문자가 적합
- 파일확장자는 URI에 포함하지 않는다.
  - REST API에서는 메시지 바디 내용의 포맷을 나타내기 위한 파일 확장자를 URI 안에 포함시키지 않는다.
  - Accept header를 사용한다.
  - Ex) `http://restapi.example.com/members/soccer/345/photo.jpg` (X)
  - Ex) `GET / members/soccer/345/photo HTTP/1.1 Host: restapi.example.com Accept: image/jpg` (O)

![img](https://gmlwjd9405.github.io/images/network/restapi-example.png)

<br>

## (8) HTTP 상태 코드

- 1xx : 전송 프로토콜 수준의 정보 교환
- 2xx : 클라이언트 요청이 성공적으로 수행
- 3xx : 클라이언트는 요청을 완료하기 위해 추가적인 행동을 취해야 함
- 4xx : 클라이언트의 잘못된 요청
  - `400` (Bad Request) : 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미
  - `401` (Unauthorized) : 비인증을 의미하며 클라이언트는 요청한 응답을 받기 위해 반드시 스스로를 인증해야 함
  - `403` (Forbidden) : 클라이언트가 해당 콘텐츠가 접근할 권리를 가지고 있지 않음
    - `401` 은 서버측에서 클라이언트가 누구인지 모르나 `403`은 클라이언트가 누구인지 알고 있는 상태임
  - `404` (Not Found) : 서버에서 요청받은 리소스를 찾을 수 없음 의미. 브라우저에서는 알려지지 않은 URL을 의미함
- 5xx : 서버쪽 오류로 인한 상태코드

<br>

## (9) RESTful

- REST 원리를 따르는 시스템을 의미하는 용어
- RESTful의 목적
  - 이해하기 쉽고 사용하기 쉬운 REST API를 만드는 것
  - 근본적인 목적이 성능 향상에 있는 것이 아니라 **일관적인 컨벤션을 통한 API의 이해도 및 호환성을 높이는 것.** 그래서 성능이 중요한 상황에서는 굳이 RESTful한 API를 구현할 필요는 없다.
- RESTful 하지 못한 경우
  - **부적합한 HTTP Method 사용** : CRUD 기능을 모두 `POST`로만 처리하거나 다른 방식으로 Method를 사용하는 경우
  - **자체 표현적이지 않음** : REST의 특징 중 하나인 자체표현성에서 떨어지는 경우로 이해하기 어렵다.(의미 파악하기 어려운 경우)
  - **HTTP 응답 코드 미사용** : 위에서 정리한 응답에 관한 상태코드를 명확하게 정의하지 않은 경우

![img](https://github.com/baeharam/Must-Know-About-Frontend/raw/master/images/network/REST.png)

<br>

---

:page_facing_up: <b>Reference</b>

- https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html
- https://github.com/baeharam/Must-Know-About-Frontend/blob/master/Notes/network/rest-api.md

---


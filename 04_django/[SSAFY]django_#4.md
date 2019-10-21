# [SSAFY]Django_#4(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]Django_#4`은 정규과정 `Django`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

## 11. 10월21일(10일차) - `authentication`

### 11.1 쿠키(Cookie) & 세션(Session)

#### (1) HTTP의 속성

- `비연결지향(Connecctionless)` : 클라이언트와 서버가 한 번 연결을 맺은 후, 클라이언트 요청에 대해 서버가 응답을 마치면 맺었던 연결을 끊어버리는 성질
- `상태정보 유지 안함(stateless, 무상태)` : 연결이 끊어지는 순간 클라이언트와 서버간의 통신이 끝남(각각 완벽하게 독립적)

---

:heavy_check_mark: 매번 새로운 인증을 해야하는 번거로움이 발생하는데 이를 해결하기 위해 상태를 기억하는 방법 중 `쿠키`와 `세션`이 있다.

---

<br>

#### (2) `쿠키(Cookie)`

- 클라이언트의 로컬에 저장되는 키 값의 작은 데이터파일
- 웹페이지에 접속하면 요청한 웹페이지를 서버로부터 받고 쿠키를 로컬에 저장하고, 클라이언트가 재요청시에 웹페이지 요청과 함께 쿠키 값도 함께 전송
- ex) 아이디 자동완성 / 공지 메세지 하루 안보기 / 팝업 안보기 체크 / 비로그인 장바구니에 담기 등 편의를 위하되 <u>지워지거나 유출되도 큰 일은 없을 정보들(가벼운 정보들)을 저장</u>

<br>

#### (3) `세션(Session)`

- 사이트와 특정 브라우저(클라이언트) 사이의 상태를 유지시키는 것
- 일정 시간동안 같은 브라우저로부터 들어오는 일련의 요구를 하나의 상태로 보고 상태를 유지하는 기술
- 클라이언트가 서버에 접속하면 서버가 <u>특정 session id를 발급하고 클라이언트는 session id를 쿠키를 사용해 저장.</u> 클라이언트가 서버에 다시 접속하면 해당 쿠키(session id가 담긴)를 이용해 <u>서버에 session id를 전달하여 인증을 받게 된다.</u>
  - 서버 측에서 클라이언트에게 session id(임시 키) 발급, 그 아이디를 클라이언트 측에서 들고 있고 쿠키에 담아 서버로 보내 어떤 사용자인지 서버가 인식함(session id : 중요정보에 접근하기 위한 키)
  - session id가 없으면 서버는 새로운 사용자라고 인식하게 됨
- Django는 특정 session id를 포함하는 쿠키를 사용해서 각각의 브라우저와 사이트가 연결된 세션을 알아낸다. 실질적인 session의 database에 기본 설정 값으로 저장된다. (이는 쿠키 안에 데이터를 저장하는 것보다 더 보안에 유리하고, 쿠키는 악의적인 사용자들에게 취약하기 때문)
- 세션을 남발하면 사용자가 많은 서버일 경우 서버 부하가 발생한다.
- 쿠키를 지우면 로그아웃은 왜??
  - 서버에서는 session에 사용자 로그인 정보를 가지고 있지만, 그것이 내꺼라는 걸 증명할 session id가 쿠키에서 사라졌기 때문이다.

---

:heavy_check_mark: 쿠키 : 클라이언트 로컬에 파일로 저장

:heavy_check_mark: 세션 : 서버에 저장(이때 session id는 쿠키의 형태로 클라이언트의 로컬에 저장)

---

<br>

#### (4) 캐시(cache)

- 가져오는데 비용이 드는 데이터를 한 번 가져온 뒤에는 임시로 저장.

- 사용자의 컴퓨터 또는 중간 역할을 하는 서버에 저장.

<br>

### 11.2 쿠키 & 세션 실습

:heavy_check_mark: `index` view 처음에 `embed()` 설정

- `request.session._session`으로 딕셔너리 형태의 정보 확인가능

  ```bash
  {'_auth_user_id'': '1',
   '_auth_user_backend': '~~~',
   '_auth_user_hash': '~~~'}
  ```

- `index` view에 다음 구문 추가

  ```python
  # visits_num은 기본적으로 존재하지 않은 키 이므로 키가 없다면(방문한적이 없다면) 0 값을 가져오도록 한다.
  visits_num = request.session.get('visits_num', 0)
  # 그리고 가져온 값은 session에 visits_num에 매번 1씩 증가한 값으로 할당한다. (유저의 다음 방문을 위해)
  request.session['visits_num'] = visits_num + 1
  # session data 안에 있는 특정 새로운 정보를 수정했다면 django는 수정한 사실을 알아채지 못하기 때문에 다음과 같이 설정.
  request.session.modified = True
  ```

  ```python
  context = {'articles': articles, 'visits_num': visits_num,}
  ```

- 그러면 `request.session._session`을 다시 찍으면 딕셔너리에 `visits_num`을 키로 갖는 속성이 새로 추가가 된다.

  ```python
  {'_auth_user_id'': '1',
   '_auth_user_backend': '~~~',
   '_auth_user_hash': '~~~',
   'visits_num': 1}
  ```

- `index.html` 에 구문 추가

  ```django
  <p><b>당신의 방문 횟수 : {{ visits_num }} {% if visits_num == 1 %} time {% else %} times{% endif %}</b></p>
  ```

  
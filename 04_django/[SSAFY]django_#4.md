# [SSAFY]Django_#4(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]Django_#4`은 정규과정 `Django`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

## 11. 10월21일(11일차) - `authentication`

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
- 실습 파일에서 session id 확인하기

<img src="https://user-images.githubusercontent.com/52685250/67169952-b4566080-f3e9-11e9-9698-06d61716ccfb.JPG" width="780px">

---

:heavy_check_mark: 쿠키 : 클라이언트 로컬에 파일로 저장

:heavy_check_mark: 세션 : 서버에 저장(이때 session id는 쿠키의 형태로 클라이언트의 로컬에 저장)

---

<br>

#### (4) 캐시(cache)

- 가져오는데 비용이 드는 데이터를 한 번 가져온 뒤에는 임시로 저장.

- 사용자의 컴퓨터 또는 중간 역할을 하는 서버에 저장.

<br>

### 11.2 방문 횟수 기능 추가하기

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

  ---

  :heavy_plus_sign: <b>[참고] `settings.py`에 다음과 같은 구문을 추가하면...</b>

  ```python
  SESSION_SAVE_EVERY_REQUEST = True # default는 False임
  ```

  - 각 view에서 request.session.modified = True를 일일이 쓰기 어려우므로 모든 곳에서 `request.session.modified = True`를 기본 값으로 사용하고 싶을 때 작성

  ---

  그러면 `request.session._session`을 다시 찍으면 딕셔너리에 `visits_num`을 키로 갖는 속성이 새로 추가가 된다.

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


<br>

### 11.3 Sign up - `user를 create` <a href=" https://docs.djangoproject.com/en/2.2/topics/auth/default/#module-django.contrib.auth.forms " target="_blank">(user 인증 관련 공식 문서)</a>

---

:heavy_exclamation_mark: <b>user 관련된 app 생성시 이름은 통상적으로 `accounts`를 사용한다!</b>

- project의 `urls.py`에 `path('accounts/', include('accounts.urls')),` 추가

---

:heavy_check_mark: <b>Authentication, Authorization</b>

- `Authentication`(인증) - 신원 확인
  - 자신이 누구라고 주장하는 사람의 신원을 확인하는 것
  - <b><u>django에서는 user 인증과 관련하여 form을 이미 다 만들어놨다! (공식 문서를 보고 사용하자!)</u></b>
- `Authorization`(권한, 허가) - 권환 부여
  - 가고 싶은 곳으로 가도록 혹은 원하는 정보를 얻도록 허용하는 과정

---

> `views.py` - `signup` view
>
> ```python
> def signup(request):
>     if request.method == 'POST':
>         form = UserCreationForm(request.POST)
>         if form.is_valid():
>             form.save()
>             return redirect('articles:index')
>     else:
>         form = UserCreationForm()
>     context = {'form': form,}
>     return render(request, 'accounts/signup.html', context)
> ```

> `urls.py`
>
> ```python
> from django.urls import path
> from . import views
> 
> app_name = 'accounts'
> urlpatterns = [
>     path('signup/', views.signup, name='signup'),
> ]
> ```

> `signup.html`
>
> ```django
> {% extends 'articles/base.html' %}
> {% load bootstrap4 %}
> 
> {% block content %}
>   <h1>회원가입</h1>
>   <form action="" method="POST">
>     {% csrf_token %}
>     {% bootstrap_form form %}
>     {% buttons submit='회원가입' reset="Cancel" %}{% endbuttons %}
>   </form>
> {% endblock  %}
> ```

- `admin` 페이지 > `인증 및 권한` > `사용자(들)`에 새로운 user가 생성됨을 확인할 수 있다. 새로 생성된 user는 스태프가 아니고 일반 user이다.

<br>

### 11.4 Login & Logout

#### (1) Login - `session을 create`

> `views.py` - `login` view <a href=" https://docs.djangoproject.com/en/2.2/topics/auth/default/#how-to-log-a-user-in " target="_blank">(login 함수 공식 문서)</a>
>
> ```python
> from django.contrib.auth import login as auth_login
> 
> def login(request):
>     if request.method == 'POST':
>         # request 인자 부터 쓰는 것 주의!(들어가는 순서가 form마다 다르다!)
>         form = AuthenticationForm(request, request.POST)
>         if form.is_valid():
>             # 세션 만드는 과정
>             auth_login(request, form.get_user()) # form.get_user() : user 정보
>             return redirect('articles:index')
>     else:
>         form = AuthenticationForm()
>     context = {'form': form,}
>     return render(request, 'accounts/login.html', context)
> ```

> `urls.py`
>
> ```python
> path('login/', views.login, name='login'),
> ```

> `signup.html`
>
> ```django
> {% extends 'articles/base.html' %}
> {% load bootstrap4 %}
> 
> {% block content %}
>   <h1>로그인</h1>
>   <form action="" method="POST">
>     {% csrf_token %}
>     {% bootstrap_form form %}
>     {% buttons submit='로그인' reset="Cancel" %}{% endbuttons %}
>   </form>
> {% endblock  %}
> ```

> `articles` > `base.html`
>
> - `container` 클래스 안에 구문 추가
> - 세션을 가지고 있으므로 다른 페이지를 왔다갔다해도 username이 유지된다.
>
> ```django
> <h3>Hello, {{ user.username }}</h3>
> ```

<br>

#### (2) Logout - `session을 delete`

> `views.py` - `logout` view <a href=" https://docs.djangoproject.com/en/2.2/topics/auth/default/#how-to-log-a-user-in " target="_blank">(login 함수 공식 문서)</a>
>
> ```python
> from django.contrib.auth import logout as auth_logout
> 
> def logout(request):
>     auth_logout(request)
>     return redirect('articles:index')
> ```

> `urls.py`
>
> ```python
> path('logout/', views.logout, name='logout'),
> ```

> `signup.html`
>
> ```django
> {% extends 'articles/base.html' %}
> {% load bootstrap4 %}
> 
> {% block content %}
>   <h1>로그인</h1>
>   <form action="" method="POST">
>     {% csrf_token %}
>     {% bootstrap_form form %}
>     {% buttons submit='로그인' reset="Cancel" %}{% endbuttons %}
>   </form>
> {% endblock  %}
> ```

> `articles` > `base.html`
>
> - 하지만 로그아웃을 하면 로그아웃 버튼이 여전히 살아있으므로 이를 위한 인증 처리가 필요하다!
>
> ```django
> <h3>
>   Hello, {{ user.username }} &nbsp;
>   <a href="{% url 'accounts:logout' %}">로그아웃</a>
> </h3>
> ```

<br>

#### (3) 로그인 사용자에 대한 접근 제한 <a href=" https://docs.djangoproject.com/en/2.2/topics/auth/default/#auth-web-requests " target="_blank">(공식 문서)</a> - `is_authenticated`

- django는 세션과 미들웨어를 통해 인증 시스템을 request 객체에 연결한다.

- request는 현재 사용자를 나타내는 모든 요청에서 `request.user`를 제공한다.

##### ① `is_authenticated`

- User model의 속성들 중 하나임
- 사용자가 인증 되었는지 알 수 있는 방법
- User 에는 항상 True / AnnoymousUser에 대해서만 항상 False
- 단, 이것은 권한(permission)과는 관련이 없으며 사용자가 활동중(active)이거나 유효한 세션(valid session)을 가지고 있는지도 확인하지 않는다.
- 일반적으로` request.user` 에서 이 속성을 사용하여 미들웨어의 `django.contrib.auth.middleware.AuthenticationMiddleware` (`settings.py` > `MIDDLEWARE` 내부에 있는 있음)를 통과했는지 확인한다.

- 로그인 상태에 따른 return 값 확인 - `is_anonymous`, `is_authenticated`, `is_superuser`

  - `비로그인` 상태

    ![비로그인상태](https://user-images.githubusercontent.com/52685250/67172549-b5da5580-f3f6-11e9-93a9-479fe20c631e.JPG)

  - `관리자 계정`으로 로그인 상태

  ![관리자 계정](https://user-images.githubusercontent.com/52685250/67172550-b672ec00-f3f6-11e9-8fb5-2cc6997ccafa.JPG)

  - `일반 계정`으로 로그인 상태

  ![일반계정](https://user-images.githubusercontent.com/52685250/67172551-b672ec00-f3f6-11e9-93dd-43e4c8d5fd52.JPG)

> `views.py`
>
> - `signup`, `login` view에 다음 구문 추가
>
> ```python
> if request.user.is_authenticated:
>     return redirect('articles:index')
> ```

> `articles` > `base.html`
>
> ```django
> {% if user.is_authenticated %}
> {# request.user.is_authenticated 가 원래 맞는데 user만 써도 django는 알아서 인식해줌 #}
>   <h3> {# 인증 됐을 때 #}
>     Hello, {{ user.username }} &nbsp;
>     <a href="{% url 'accounts:logout' %}">로그아웃</a>
>   </h3>
> {% else %}
>   <h3> {# 인증 안 됐을 때 #}
>     <a href="{% url 'accounts:login' %}">로그인</a>
>     <a href="{% url 'accounts:signup' %}">회원가입</a>
>   </h3>
> {% endif %}
> ```

##### ② 회원가입 동시에 로그인 상태 유지 기능 추가

> `views.py` > `signup` view의 유효성 검증 구문 안에 다음 구문 추가
>
> ![213213](https://user-images.githubusercontent.com/52685250/67173495-f12a5380-f3f9-11e9-9298-bfba9b60caf5.JPG)
>
> - form.save()를 통해 반환된 User 클래스의 인스턴스를 auth_login의 인자로 전달하게 된다.
>
> ```python
> user = form.save()
> auth_login(request, user)
> ```

##### ③ 비로그인 상태일 때 [NEW] 기능 사용 못하게 막기

> `articles` > `view.py`
>
> ```python
> from django.contrib.auth.decorators import login_required
> 
> @login_required # create, delete, update view위에 데코레이터 추가
> ```

> `index.html`
>
> - 현재 상태에서는 비로그인일 때 주소를 직접 입력하면 회원가입 페이지로 이동할 수 있어 문제가 생긴다.
>
> ```django
> {% if user.is_authenticaed %}
>   <a href="{% url 'articles:create' %}">[NEW]</a>
> {% else %}
>   <a href="{% url 'accounts:login' %}">[새 글을 작성하려면 로그인하세요]</a>
> {% endif %}
> ```

##### ④ 댓글기능

-  `@required_POST`가 있는 함수에 `@login_required`가 설정된다면 로그인 이후 `next` 매개변수를 따라 해당 함수로 다시 redirect되면서 `@require_POST` 때문에 405 에러가 발생.

  ```python
  # 405 에러를 해결하기 위해 delete, comments_create, comments_delete view를 다음과 같이 수정
  # @login_required를 쓰지 못하므로 if request.user.is_authenticated: 구문을 사용하여 인증된 사용자만 게시글 삭제, 댓글 생성 및 삭제를 할 수 있게 해준다.
  
  from django.http import Http404, HttpResponse
  # HttpResponse는 댓글 삭제 401 에러 처리를 위해 작성
  
  @require_POST
  def delete(request, article_pk):
      if request.user.is_authenticated:
          article = get_object_or_404(Article, pk=article_pk)
          article.delete()
      return redirect('articles:index')
  
  @require_POST
  def comments_create(request, article_pk):
      if request.user.is_authenticated:
          comment_form = CommentForm(request.POST)
          if comment_form.is_valid():
              comment = comment_form.save(commit=False)
              comment.article_id = article_pk
              comment.save()
      return redirect('articles:detail', article_pk)
  
  @require_POST
  def comments_delete(request, article_pk, comment_pk):
      if request.user.is_authenticated:
          comment = get_object_or_404(Comment, pk=comment_pk)
          comment.delete()
          return redirect('articles:detail', article_pk)
     	# [추가 내용]HTTP 상태 코드 사용하여 semantic하게 작성하기
      return HttpResponse('You are Unauthorized', status=401)
  	# 401 에러가 비인증됐을 때 http 상태 코드이다.
  ```

<br>

#### (4) `next` query string parameter

- `@login_required` 데코레이터가 기본적으로 인증 성공 후 사용자를 redirect 할 경로를 `next`라는 문자열 매개 변수에 저장한다.

- 우리가 url로 접근하려고 했던 그 주소가 로그인하지 않으면 볼 수 없는 곳이라서, django가 로그인 페이지로 강제로 redirect 했는데, 로그인을 다시 정상적으로 하고 나면 원래 요청했던 주소로 보내주기 위해 keep 해준 것
  - ex) ` http://127.0.0.1:8000/accounts/login/?next=/articles/3/update/ `
  - 로그인에 성공하면 `http://127.0.0.1:8000/articles/3/update`로 redirect 해 줌

- `accounts` app의 `views.py`의 `login` view의 redirect 구문 수정
  - `return redirect(request.GET.get('next') or 'articles:index')`

<br>

### 11.5 회원 탈퇴

> `accounts` app > `views.py`
>
> ```python
> @require_POST
> def delete(request):
>     request.user.delete()
>     return redirect('articles:index')
> ```

> `accounts` app > `urls.py`
>
> ```python
> path('delete/', views.delete, name='delete'),
> ```

> `articles` app > `index.html` ([로그아웃] 밑에 작성)
>
> ```django
> <form action="{% url 'accounts:delete' %}" method="POST" style="display: inline;">
>   {% csrf_token %}
>   <input type="submit" value="회원탈퇴" class="btn btn-danger">
> </form>
> ```

<br>

### 11.6 회원 수정
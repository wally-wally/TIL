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

### 11.3 Sign up - `user를 create` <a href=" https://docs.djangoproject.com/en/2.2/topics/auth/default/#module-django.contrib.auth.forms" target="_blank">(user 인증 관련 공식 문서)</a>

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

---

:heavy_check_mark: <b>로그인 상태에 따른 return 값 확인</b> - `is_anonymous`, `is_authenticated`, `is_superuser`

- `비로그인` 상태

  ![비로그인상태](https://user-images.githubusercontent.com/52685250/67172549-b5da5580-f3f6-11e9-93a9-479fe20c631e.JPG)

- `관리자 계정`으로 로그인 상태

  ![관리자 계정](https://user-images.githubusercontent.com/52685250/67172550-b672ec00-f3f6-11e9-8fb5-2cc6997ccafa.JPG)

- `일반 계정`으로 로그인 상태

  ![일반계정](https://user-images.githubusercontent.com/52685250/67172551-b672ec00-f3f6-11e9-93dd-43e4c8d5fd52.JPG)

---

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

### 11.6 회원 수정 <a href=" https://docs.djangoproject.com/en/2.2/topics/auth/default/#django.contrib.auth.forms.UserChangeForm " target="_blank">(UserChangeForm 공식 문서)</a>

#### (1) `get_user_model()`

- `User` model을 직접 참조하는 대신 `django.contrib.auth.get_user_model()` 를 사용하여 `User` model을 참조해야 한다.
- 이 함수는 현재 활성화(active) 된 `User` model을 return 한다.
- `User`를 사용하지 않는 이유는 비어 있기 때문이다. <a href=" https://github.com/django/django/blob/2f72480fbd27896c986c45193e1603e35c0b19a7/django/contrib/auth/models.py#L384 " target="_blank">(github 문서 참고1)</a> <a href=" https://github.com/django/django/blob/2f72480fbd27896c986c45193e1603e35c0b19a7/django/contrib/auth/models.py#L316 " target="_blank">(github 문서 참고2)</a>
- custom 시 참고할 django 공식 문서 <a href=" https://docs.djangoproject.com/en/2.2/topics/auth/default/#user-objects " target="_blank">(User objects 바로 이동)</a>

> `urls.py`
>
> ```python
> path('update/', views.update, name='update'),
> ```

> `update.html`
>
> ```django
> {% extends 'articles/base.html' %}
> {% load bootstrap4 %}
> 
> {% block content %}
>   <h1>회원 정보 수정</h1>
>   <form action="" method="POST">
>     {% csrf_token %}
>     {% bootstrap_form form %}
>     {% buttons submit='정보수정' reset="Cancel" %}{% endbuttons %}
>   </form>
> {% endblock  %}
> ```

> `base.html`
>
> ```django
> <a href="{% url 'accounts:update' %}">정보수정</a>
> ```

> `forms.py`
>
> ```python
> from django.contrib.auth.forms import UserChangeForm
> from django.contrib.auth import get_user_model
> 
> class CustomUserChangeForm(UserChangeForm):
>     class Meta:
>         model = get_user_model() # return User
>         fields =('email', 'first_name', 'last_name',)
> ```

> `views.py`
>
> ```python
> from django.contrib.auth.decorators import login_required
> 
> # 비로그인 상태에서 강제로 url로 회원 정보 수정 페이지 들어가면 로그인 페이지로 넘어가고 로그인하면 자동으로 회원 정보 수정 페이지로 redirect 해준다.
> @ login_required
> def update(request):
>     if request.method == 'POST':
>         form = CustomUserChangeForm(request.POST, instance=request.user)
>         if form.is_valid():
>             form.save()
>             return redirect('articles:index')
>     else:
>         form = CustomUserChangeForm(instance=request.user)
>     context = {'form': form,}
>     return render(request, 'accounts/update.html', context)
> ```

<br>

### 11.7 비밀번호 변경

#### (1) 비밀번호 변경 기능 추가

> `views.py`
>
> ```python
> def change_password(request):
>     if request.method == 'POST':
>         form = PasswordChangeForm(request.user, request.POST)
>         if form.is_valid():
>             form.save()
>             return redirect('articles:index')
>     else:
>         form = PasswordChangeForm(request.user)
>     context = {'form': form,}
>     return render(request, 'accounts/change_password.html', context)
> ```

> `urls.py`
>
> ```python
> path('password/', views.change_password, name='change_password'),
> ```

> `change_password.html`
>
> ```django
> {% extends 'articles/base.html' %}
> {% load bootstrap4 %}
> 
> {% block content %}
>   <h1>비밀번호 변경</h1>
>   <form action="" method="POST">
>     {% csrf_token %}
>     {% bootstrap_form form %}
>     {% buttons submit='변경' reset="Cancel" %}{% endbuttons %}
>   </form>
> {% endblock  %}
> ```

> `base.html`
>
> ```django
> <a href="{% url 'accounts:change_password' %}">비번변경</a>
> ```

<br>

#### (2) `update_session_auth_hash` <a href=" https://docs.djangoproject.com/en/2.2/topics/auth/default/#django.contrib.auth.update_session_auth_hash " target="_blank">(공식 문서)</a>

- <u>비밀번호 변경 후 로그아웃 되버리는 증상</u> 발생
  - 원인 : 비밀번호가 변경되면서 기존 세션과의 회원 인증 정보가 일치하지 않게 되어 버렸기 때문

- `update_session_auth_hash` 메서드를 사용하면 해결할 수 있다.
  - 현재 사용자의 인증 세션이 무효화 되는 것을 막고, 세션을 유지한 상태로 업데이트.
  - 현재 request와 새로운 session hash가 생긴 업데이트 된 user 객체를 적절히 업데이트.

> `views.py`
>
> ```python
> @login_required
> def change_password(request):
>     if request.method == 'POST':
>         form = PasswordChangeForm(request.user, request.POST) # 인자 순서 주의!!!
>         if form.is_valid():
>             form.save()
>             update_session_auth_hash(request, form.user) # 인자 순서 주의!!!
>             return redirect('articles:index')
>     else:
>         form = PasswordChangeForm(request.user)
>     context = {'form': form,}
>     return render(request, 'accounts/change_password.html', context)
> ```

<br>

---

:star: <b>templates 정리</b>

> `auth_form.html`
>
> ```django
> {% extends 'articles/base.html' %}
> {% load bootstrap4 %}
> 
> {% block content %}
>   {##}
>   {% if request.resolver_match.url_name == 'signup' %}
>     <h1>회원가입</h1>
>   {% elif request.resolver_match.url_name == 'login' %}
>     <h1>로그인</h1>
>   {% elif request.resolver_match.url_name == 'update' %}
>     <h1>회원정보 수정</h1>
>   {% else %}
>     <h1>비밀번호 변경</h1>
>   {% endif %}
>   <form action="" method="POST">
>     {% csrf_token %}
>     {% bootstrap_form form %}
>     {% buttons submit='Submit' reset="Cancel" %}{% endbuttons %}
>   </form>
> {% endblock  %}
> ```

> `views.py`
>
> - `change_password.html`, `login.html`, `signup.html`, `update.html` 을 모두 `auth_form.html`로 바꿔준다.

---

<br>

---

<br>

## 12. 10월22일(12일차)

### 12.1 User - Article 관계(1 : N 관계)

#### (1) `settings.AUTH_USER_MODEL`

> `articles` > `models.py`
>
> - `settings.py`에 `AUTH_USER_MODEL`에 대해 나와 있지 않음
> - `AUTH_USER_MODEL = 'auth.User'`가 기본값이기 때문이다.
>
> ```python
> from django.conf import settings
> 
> # Article 클래스에 추가
> user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
> ```

> `forms.py` > `ArticleForm`
>
> ```python
> fields = ('title', 'content',) # 구문 수정
> ```

- `get_user_model()` : return 값이 `class`
- `settings.AUTH_USER_MODEL` : return 값이 `str`

---

:black_flag: <b>[참고사항] django가 서버가 켜질 때 초기화 순서로 보는 <u>`models.py`에서 `get_user_model()`을 사용하지 못하는 이유</u></b>

① `INSTALLED_APPS`의 각 항목을 imports 한다. (단, 순서는 <b>`위에서 아래로`</b>)

- 이 과정에서 직접적, 간접적으로 모델을 import 해선 안 된다.
- ①번 단계에서 app을 import 하는 동안에 불필요한 제약들을 피하기 위해 이 단계에서는 모델을 가져오지 않는다.

② 각 어플리케이션의 `models.py`를 import 한다.

- <font color="red"><b><u>②번 단계가 완료가 되면</u></b></font>, `get_model()`과 같은 모델에서 작동하는 API들을 사용할 수 있게 된다.
- 그러므로 `models.py`에서 외래키 추가할 때 `get_user_model()`을 사용하지 못한다.

③ `AppConfig`의 ready() 메서드를 실행한다.

- <b>②번 단계가 완료된 후에야 `get_user_model()`을 사용할 수 있는데 아직 `accounts` app이 `INSTALLED_APP`의 작성 순서 때문에 아직 import가 되지 완료되지 않은 상황이라 `get_user_model()`이 어떤 `User` model을 return해야 하는지 django가 알 수 없는 상태이다.</b>

<br>

:arrow_forward: <b>결론</b>

- <b>모든 곳</b>에서 User model을 호출할 때는 <b>`get_user_model()`</b>
- 단, <b>`models.py`</b>에서만 <b>`settings.AUTH_USER_MODEL`</b>

---

- DB는 기본으로 `NOT NULL` 조건을 지켜야 하므로 새로운 컬럼 추가시 현재 이미 만들어져 있는 레코드에 대해 `user_id`의 기본값을 어떻게 설정할지 물어보는 구문이 다음과 같이 표시된다.
  - 아래와 같은 상황은 `user_id`를 `1`로 선택한 예시화면이다.

![model](https://user-images.githubusercontent.com/52685250/67252556-7111f580-f4ae-11e9-9c8d-ac9586a3fd39.JPG)

<br>

#### (2) Create Logic 수정

- 글의 작성자가 누구인지를 알기 위해 설정

> `views.py` > `create` view (구문 수정)
>
> ```python
> article = form.save(commit=False)
> article.user = request.user
> article.save()
> ```

<br>

#### (3) Update, Delete Logic 수정

- 자신의 게시글이 아니면 UPDATE, DELETE를 하지 못하도록 설정

> `detail.html` (구문 수정)
>
> ```django
> {% if request.user == article.user %}
>   <a href="{% url 'articles:update' article.pk %}">[UPDATE]</a>
>   <form action="{% url 'articles:delete' article.pk %}" method="POST", onclick="return confirm('진짜로 지우게??')">
>     {% csrf_token %}
>     <input type="submit" value="DELETE">
>   </form>
> {% endif %}
> ```

> `views.py` > `update` view
>
> ```python
> @login_required
> def update(request, article_pk):
>     article = get_object_or_404(Article, pk=article_pk)
>     if request.user == article.user: # 큰 if ~ else문 추가
>         if request.method == 'POST':
>             form = ArticleForm(request.POST, instance=article)
>                 article = form.save()
>                 return redirect(article)
>         else:
>             form = ArticleForm(instance=article)
>     else:
>         return redirect('articles:index')
>     context = {'form': form, 'article': article,}
>     return render(request, 'articles/form.html', context)
> ```
>
> `views.py` > `delete` view
>
> ```python
> @require_POST
> def delete(request, article_pk):
>     if request.user.is_authenticated:
>         article = get_object_or_404(Article, pk=article_pk)
>         if request.user == article.user: # 이 구문 추가
>             article.delete()
>         else:
>             return redirect(article)
>     return redirect('articles:index')
> ```

<br>

### 12.2 User - Comment(1 : N 관계)

> `models.py` > `Comment` Class
>
> ```python
> # 구문 추가
> user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
> ```

#### (1) comments_create logic 수정

> `views.py` > `comments_create` view
>
> ```python
> comment.user = request.user # 구문 추가
> ```

<br>

#### (2) 비로그인 유저 댓글 작성 form 숨기기

> `detail.html`
>
> ```django
> {% if user.is_authenticated %}
>   <form action="{% url 'articles:comments_create' article.pk %}" method="POST">
>     {% csrf_token %}
>     {{ comment_form }}
>     <input type="submit" value="submit">
>   </form>
>   <hr>
> {% else %}
>   <a href="{% url 'accounts:login' %}">[댓글을 작성하려면 로그인하세요]</a>
>   <hr>
> {% endif %}
> ```

<br>

#### (3) 내가 작성한 게시글에서만 DELETE 보이기

> `detail.html`
>
> ```html
> {% if request.user == comment.user %}
>   <form action="{% url 'articles:comments_delete' article.pk comment.pk %}" method="POST" style="display: inline;">
>     {% csrf_token %}
>     <input type="submit" value="DELETE">
>   </form>
> {% endif %}
> ```

> `views.py` > `comments_delete` view
>
> ```python
> @require_POST
> def comments_delete(request, article_pk, comment_pk):
>     if request.user.is_authenticated:
>         comment = get_object_or_404(Comment, pk=comment_pk)
>         if request.user == comment.user: # 이 조건 추가됨
>             comment.delete()
>         return redirect('articles:detail', article_pk)
>     return HttpResponse('You are Unauthorized', status=401)
> ```

<br>

### 12.3 프로필 이미지 기능 추가(gravatar 프로필 이미지)

#### (1) ModelForm Custom

> `accounts` > `forms.py`
>
> ```python
> from django.contrib.auth.forms import UserCreationForm
> 
> class CustomUserCreationForm(UserCreationForm):
>     class Meta(UserCreationForm.Meta):
>         fields = UserCreationForm.Meta.fields + ('email',)
> ```

> `signup` view
>
> - 기존에 import 했던 `UserCreationForm` 삭제, `CustomUserCreationForm` 추가
> - `UserCreationForm` -> `CustomUserCreationForm` 변경

<br>

> `index` view
>
> ```python
> import hashlib
> 
> def index(request):
>     if request.user.is_authenticated:
>         gravatar_url = hashlib.md5(request.user.email.encode('utf-8').lower().strip()).hexdigest()
>     else:
>         gravatar_url = None
>     visits_num = request.session.get('visits_num', 0)
>     request.session['visits_num'] = visits_num + 1
>     request.session.modified = True
>     articles = Article.objects.all()
>     context = {'articles': articles, 'visits_num': visits_num, 'gravatar_url': gravatar_url,}
>     return render(request, 'articles/index.html', context)
> ```

> `base.html` (구문 추가)
>
> ```django
> <img src="https://s.gravatar.com/avatar/{{ gravatar_url }}?s=80" alt="프로필이미지">
> ```

<br>

#### (2) Custom template tags and filters <a href=" https://docs.djangoproject.com/en/2.2/howto/custom-template-tags/" target="_blank">(django custom template tag 공식 문서)</a>

:heavy_check_mark: <b><u>모든 페이지에서 이미지가 나오도록 수정한다.</u></b>

> `accounts` app > `templatetags` folder 생성
>
> - 폴더 내부에 `__init__.py`, `gravatar.py` 생성

> `gravatar.py`
>
> ```python
> import hashlib
> from django import template
> 
> register = template.Library()
> 
> @register.filter # 기존의 템플릿 라이브러리에 아래의 함수(custom filter)가 추가된다는 의미인 decorator
> def makemd5(email): # {{ email | ssafy }} 와 같은 경우 필터 앞에 있는 왼쪽에 있는 값
>     return hashlib.md5(email.encode('utf-8').lower().strip()).hexdigest()
> ```

> `base.html`
>
> ```django
> {% load gravatar %} <!-- 가장 맨 위에 코드 추가 -->
> 
> <img src="https://s.gravatar.com/avatar/{{ request.user.email|makemd5 }}?s=80" alt="프로필이미지"> <!-- 코드 수정-->
> ```

> `index` view
>
> - (1)에서 새로 작성했던 코드가 굳이 있을 필요가 없다.
> - django custom template tag를 사용했기 때문이다.

<br>

### 12.4 Model relationships(M : N) - `05_model_relation`

---

:heavy_exclamation_mark: <b>User : Article = M : N</b>

- User는 여러 개의 Article에 LIKE 할 수 있고
- Article은 여러 User 로 부터 LIKE 받을 수 있다.

:heavy_exclamation_mark: <b>모델링은 현실 세계를 최대한 유사하게 반영하기 위해서 해야한다.</b>

---

:ballot_box_with_check: <b><u>환자와 의사의 예약 시스템을 구축하라는 프로젝트</u></b>

- 모델링(`models.py`)

  ```python
  from django.db import models
  
  class Doctor(models.Model):
      name = models.TextField()
  
      def __str__(self):
          return f'{self.pk}번 의사 {self.name}'
  
  
  class Patient(models.Model):
      name = models.TextField()
      doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
  
      def __str__(self):
          return f'{self.pk}번 환자 {self.name}'
  ```

#### (1) 1:N의 한계 (shell_plus로 객체 생성 후 확인)

- 불필요한 필드(같은 환자 이름을 가진 필드)를 또 만들어야 하는 문제점이 발생한다.

```shell
In [1]: doctor1 = Doctor.objects.create(name='justin')

In [2]: doctor2 = Doctor.objects.create(name='zzulu')

In [3]: patient1 = Patient.objects.create(name='tak', doctor=doctor1)

In [4]: patient2 = Patient.objects.create(name='harry', doctor=doctor2)

In [5]: doctor1
Out[5]: <Doctor: 1번 의사 justin>

In [6]: doctor2
Out[6]: <Doctor: 2번 의사 zzulu>

In [7]: patient1
Out[7]: <Patient: 1번 환자 tak>

In [8]: patient2
Out[8]: <Patient: 2번 환자 harry>

In [9]: patient3 = Patient.objects.create(name='tak', doctor=doctor2)

In [10]: patient3
Out[10]: <Patient: 3번 환자 tak>

In [11]: patient3.doctor.name
Out[11]: 'zzulu'

In [12]: patient4 = Patient.objects.create(name='harry', doctor=doctor1)

In [13]: patient4 = Patient.objects.create(name='harry', doctor=doctor1, doctor=doctor2)
  File "<ipython-input-13-2775590f4f3f>", line 1
    patient4 = Patient.objects.create(name='harry', doctor=doctor1, doctor=doctor2)
                                                                   ^
SyntaxError: keyword argument repeated
```

<br>

#### (2) 중개모델 생성 - `models.py`에 Reservation model 추가

![중개 모델](https://user-images.githubusercontent.com/52685250/67262400-9c610880-f4df-11e9-9904-a8ebb314966b.JPG)

- 1 : N 의 한계점을 해결하기 위해 중개모델을 생성하여 어느 의사가 어느 환자와 매칭되는지 알 수 있다.

- 기존의 `db.sqlite3`, `0001_initial.py` 삭제 후 다시 migration  과정 진행

```python
class Reservation(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.doctor_id}번 의사의 {self.patient_id}번 환자'
```

- 중개 모델이 생겼으므로 `doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)` 이 구문은 필요가 없게 된다.

```shell
In [1]: doctor1 = Doctor.objects.create(name='justin')

In [3]: patient1 = Patient.objects.create(name='tak')

In [5]: Reservation.objects.create(doctor=doctor1, patient=patient1)
Out[5]: <Reservation: 1번 의사의 1번 환자>

In [6]: doctor1.reservation_set.all()
Out[6]: <QuerySet [<Reservation: 1번 의사의 1번 환자>]>

In [7]: patient1.reservation_set.all()
Out[7]: <QuerySet [<Reservation: 1번 의사의 1번 환자>]>

In [8]: patient2 = Patient.objects.create(name='harry')

In [9]: Reservation.objects.create(doctor=doctor1, patient=patient2)
Out[9]: <Reservation: 1번 의사의 2번 환자>

In [10]: doctor1.reservation_set.all()
Out[10]: <QuerySet [<Reservation: 1번 의사의 1번 환자>, <Reservation: 1번 의사의 2번 환자>]>

In [11]: for reservation in doctor1.reservation_set.all():
    ...:     print(reservation.patient.name)
    ...: 
tak
harry
```

<br>

#### (3) 중개 모델을 직접 거치지 않고 바로 가져오기 - `Through` option

- `Through` option
  - 중개 모델을 거치지 않고 직접 서로 테이블을 참조하는 option
  - `ManyToManyField`는 실제적인 물리적인 필드가 DB에 생기는 것이 아니다.

> `models.py`
>
> ```python
> doctors = models.ManyToManyField(Doctor, through='reservation') # 구문 추가
> ```

> `shell_plus`
>
> ```shell
> In [1]: patient1 = Patient.objects.get(pk=1)
> 
> In [2]: patient1
> Out[2]: <Patient: 1번 환자 tak>
> 
> In [3]: patient1.reservation_set.all()
> Out[3]: <QuerySet [<Reservation: 1번 의사의 1번 환자>]>
> 
> In [4]: patient1.doctors.all()
> Out[4]: <QuerySet [<Doctor: 1번 의사 justin>]>
> 
> In [5]: doctor2 = Doctor.objects.create(name='zzulu')
> 
> In [6]: Reservation.objects.create(doctor=doctor2, patient=patient1)
> Out[6]: <Reservation: 2번 의사의 1번 환자>
> 
> In [7]: patient1.reservation_set.all()
> Out[7]: <QuerySet [<Reservation: 1번 의사의 1번 환자>, <Reservation: 2번 의사의 1번 환자>]>
> 
> In [8]: patient1.doctors.all()
> Out[8]: <QuerySet [<Doctor: 1번 의사 justin>, <Doctor: 2번 의사 zzulu>]>
> 
> In [10]: doctor2
> Out[10]: <Doctor: 2번 의사 zzulu>
> 
> In [11]: doctor2.patient_set.all()
> Out[11]: <QuerySet [<Patient: 1번 환자 tak>]>
> ```

<br>

#### (4) Doctor도 patients 를 참조할 수 없을까? - `related_name` option

- `related_name`

  - 참조되는 대상이 참조하는 대상을 찾을 때(역참조), 어떻게 불러 올지에 정의한다.
  - MTOM(ManyToMany) 필드가 없는 테이블이 있는 테이블을 참조할 때 사용한다.
  - 필수적으로 사용하는 건 아니지만 필수적인 상황이 발생할 수 있다.

  ```python
  doctors = models.ManyToManyField(Doctor, related_name='patients') # 구문 추가
  # through='reservation'는 삭제
  ```

- 현재 `models.py` 상황

  ```python
  class Doctor(models.Model):
      name = models.TextField()
  
      def __str__(self):
          return f'{self.pk}번 의사 {self.name}'
  
  
  class Patient(models.Model):
      name = models.TextField()
      doctors = models.ManyToManyField(Doctor, related_name='patients')
  
      def __str__(self):
          return f'{self.pk}번 환자 {self.name}'
  ```

- shell_plus로 확인

  ```shell
  In [1]: doctor1 = Doctor.objects.create(name='justin')
  
  In [3]: patient1 = Patient.objects.create(name='tak')
  
  In [4]: doctor1
  Out[4]: <Doctor: 1번 의사 justin>
  
  In [5]: patient1
  Out[5]: <Patient: 1번 환자 tak>
  
  In [6]: doctor1.patients.add(patient1)
  
  In [8]: doctor1.patients.all()
  Out[8]: <QuerySet [<Patient: 1번 환자 tak>]>
  
  In [9]: patient1.doctors.all()
  Out[9]: <QuerySet [<Doctor: 1번 의사 justin>]>
  
  In [10]: patient1.doctors.remove(doctor1)
  
  In [11]: patient1.doctors.all()
  Out[11]: <QuerySet []>
  
  In [12]: doctor1.patients.all()
  Out[12]: <QuerySet []>
  ```

- 위와 같은 상황일 때 `manytomany_patient_doctors` 테이블이 새로 생성된다.
- 중개 모델을 생성하지 않고 `doctor`에서는 `patients.all()`로, `patients`에서는 `doctors.all()`로 서로 접근할 수 있다.
- 그렇다면 중개모델은 필요가 없는가??? => :no_entry_sign:<b><u>아니다!</u></b>
  - 예약한 시간 정보를 담는다거나 하는 경우(= 추가적인 필드가 필요한 경우)에는 반드시 중개모델을 만들어서 진행을 해야되는 상황도 있다.
  - 다만 그럴 필요가 없는 경우 위와 같이 해결할 수 있다.

<br>

### 12.5 `좋아요(LIKE)` 기능 구현하기

---

- user는 여러 article에 좋아요(LIKE)를 누를 수 있고
- article은 여러 user로부터 좋아요(LIKE)를 받을 수 있다.

---

> `articles` app > `models.py` > `Article` model
>
> :heavy_check_mark: <b>[주의!]변수명 반드시 구분하기!</b>
>
> - ` article.user` => 게시글을 작성한 유저 --- `1 : N`
>
> - `article.like_users` => 게시글을 좋아요한 유저 --- `M : N`
> - `user.like_articles` => 유저가 좋아요를 누른 게시글(역참조, `related_name`) --- `M : N`
> - `user.article_set` => 유저가 작성한 게시글(역참조) --- `1 : N`
>
> ```python
> like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_articles', blank=True) # 구문 추가
> # blank=True : 이미 만들어진 필드에 대해서는 빈 값(빈 string)도 허용된다고 설정 (null=True 하고는 다른 개념)
> ```
>
> - `articles_article_like_user`라는 테이블이 생성됨(좋아요를 누를 때마다 데이터가 이 곳에 저장됨)

> `articles` app > `views.py` > `like` view 새로 생성
>
> ```python
> def like(request, article_pk):
>     article = get_object_or_404(Article, pk=article_pk)
>     # 해당 게시글에 좋아요를 누른 사람들 중에서 현재 접속유저가 있다면 좋아요를 취소
>     if article.like_users.filter(pk=request.user.pk).exists():
>     # .get()은 없을 때 오류가 발생하므로
>     # 키가 없어도 오류(DoesNotExistError) 발생을 막기 위해 .filter()를 사용한다.
>         article.like_users.remove(request.user)
>     else:
>         article.like_users.add(request.user)
>     # 위와 아래와 같은 구문임(어느 것을 써도 무방하다)
>     # if request.user in article.like_users.all():
>     #     article.like_users.remove(request.user) # 좋아요 취소
>     # else:
>     #     article.like_users.add(request.user) # 좋아요 선택
>     return redirect('articles:index')
> ```

> `urls.py`
>
> ```python
> path('<int:article_pk>/like/', views.like, name='like'), # 구문 추가
> ```

> `index.html` (구문 추가, fontawesome 적용)
>
> ```django
> <a href="{% url 'articles:like' article.pk %}">
>   {% if user in article.like_users.all %}
>     <i class="fas fa-heart" style="color: crimson;"></i>
>   {% else %}
>     <i class="fas fa-heart" style="color: black;"></i>
>   {% endif %}
> </a>
> <p>{{ article.like_users.all|length }}명이 이 글을 좋아합니다.</p>
> ```

<br>

### 12.6 template 분할 - `{% include %}`

> `articles` app > `index.html`
>
> - for문 안의 내용을 `_article.html`로 분할하여 작성
>
> ```django
> {% for article in articles %}
>   {% include 'articles/_article.html' %}
> {% endfor %}
> ```

> `articles` app > `_article.html`
>
> - 보통 분할된 template의 이름 앞에는 `_` 가 붙는다.
>
> ```django
> <!-- 기본적으로 index.html에서 for문안에 있으므로 article 이름 자체를 그대로 쓸 수 있다. -->
> 
> <div class="card mb-3">
>   <div class="card-header">
>     <p>작성자: <b>{{ article.user }}</b></p> <!-- 기본적으로 .user만 입력해도 user_name이 나온다. -->
>   </div>
>   <div class="card-body">
>     <h5 class="card-title"><p>글 제목: <b>{{ article.title }}</b></p></h5>
>     <p class="card-text">{{ article.pk }}</p>
>     <hr>
>     <p class="card-text">
>       <a href="{% url 'articles:like' article.pk %}">
>         {% if user in article.like_users.all %}
>           <i class="fas fa-heart" style="color: crimson;"></i>
>         {% else %}
>           <i class="fas fa-heart" style="color: black;"></i>
>         {% endif %}
>       </a>
>       <b>{{ article.like_users.all|length }}</b>명이 이 글을 좋아합니다.
>     </p>
>     <a href="{{ article.get_absolute_url }}" class="btn btn-primary">DETAIL</a>
>     <!-- 원래는 {# url 'articles:detail' article_pk #}이지만 get_absoulte_url에 의해 {{ article.get_absolute_url }}로 간결해진다. -->
>   </div>
> </div>
> ```

<br>

---

<br>

## 13. 10월23일(13일차)

### 13.1 user의 프로필 페이지 만들기

> `accounts` app
>
> - `get_user_model`, `get_object_or_404` import 구문 추가
>
> ```python
> def profile(request, username):
>     person = get_object_or_404(get_user_model(), username=username)
>     context = {'person': person,}
>     return render(request, 'accounts/profile.html', context)
> ```

> `urls.py`
>
> ```python
> path('<username>/', views.profile, name='profile'),
> ```

> `profile.html`
>
> ```html
> {% extends 'articles/base.html' %}
> 
> {% block content %}
>   <h1 class="text-center">{{ person.username }}'s Profile</h1> <!-- username -->
>   <hr>
>   <h3 class="text-center">{{ person.username }}이(가) 작성한 글</h3> <!-- username -->
> 
>   <div class="row">
>   {% with articles=person.article_set.all %}
>     <!-- 이 유저가 작성한 게시글, 댓글만 가져오기(정렬은 모두 최근에 작성한 것부터 => models.py에서 이미 최신순으로 가져올 수 있게 모델링되어 있다.) -->
>     <!-- 그래서 view에서 order_by('-pk')를 할 필요가 없다. -->
>     {% for article in articles %}
>     <div class="col-4 my-2">
>       <div class="card">
>         <div class="card-body">
>           <h5 class="card-title">{{ article.content }}</h5> <!-- 게시글 내용 -->
>           <p class="card-text">{{ article.like_users.all|length }}명이 좋아하는 글</p> <!-- article.like_users.count도 가능 -->
>           <p class="card-text">{{ article.comment_set.all|length }}개의 댓글</p> <!-- article.comment_set.count도 가능 -->
>           <a href="{% url 'articles:detail' article.pk %}" class="btn btn-primary">Go to article</a> <!-- 게시글 보기(link 설정) -->
>         </div>
>       </div>
>     </div>
>     {% endfor %}
>   {% endwith %}
>   </div>
> 
>   <hr>
> 
>   <h3 class="text-center">{{ person.username }}이(가) 작성한 댓글</h3>
>   <div class="row">
>   {% with comments=person.comment_set.all%}
>     {% for comment in comments %}
>     <div class="col-12 my-2">
>       <div class="card">
>         <div class="card-body">
>           <blockquote class="blockquote mb-0">
>             <p>{{ comment.content }}</p> <!-- 댓글의 내용-->
>             <footer class="blockquote-footer">{{ comment.created_at|date:"SHORT_DATE_FORMAT" }}</footer> <!-- 댓글의 작성 날짜 -->
>           </blockquote>
>         </div>
>       </div>
>     </div>
>     {% endfor %}
>   {% endwith %}
>   </div>
> {% endblock  %}
> ```

<br>

---

:heavy_check_mark: [선택사항] <b>`with` template tag</b> => 시험출제X

- 복잡한 변수를 더 간단한 이름으로 저장(캐시)하며, 여러 번 DB를 조회할 때(특히 비용이 많이 드는) 유용하게 사용가능하다.

> `before`
>
> ```django
> {% for article in person.article_set.all %}
> 	...
> {% endfor %}
> ```
>
> `after`
>
> ```django
> {% with articles=person.article_set.all %}
>     {% for article in articles %}
> 	...
> 	{% endfor %}
> {% endwith %}
> ```

:warning: <b>주의사항</b>

- <b>조기 최적화는 프로그래밍에서 악의 근원이다.</b>
- <b>코드는 코드 자체적으로도 빨라야 하지만, 더 중요한 것은 다른 개발자들이 읽기 쉬워야한다.</b>

---

<br>

### 13.2 `팔로우(Follow)` 기능 구현하기 - `M:N(User:User)관계`

#### (1) 맞춤 User 모델 대체하기

> `settings.py`
>
> ```python
> AUTH_USER_MODEL = 'accounts.User' # 맨 마지막에 추가
> ```

> `accounts` > `models.py`
>
> - django는 맞춤 모델을 참조하는 AUTH_USER_MODEL 설정 값을 제공함으로써 기본 User 모델을 오버라이드(덮어씌우기)하도록 할 수 있다.
> - <b>User 모델 대체 작업을 프로젝트 중간에 할 경우 모두 DB 초기화(<u>기존의 db.sqlite3, migrations 파일 모두 삭제</u>)하고 다시 진행한다.</b> <a href=" https://docs.djangoproject.com/ko/2.2/topics/auth/customizing/#substituting-a-custom-user-model" target="_blank">(공식 문서)</a>
> - 새로 생긴 `accounts_user_followers` table이 중개모델 역할을 하게 된다.
>   - `id`, `to_user_id`, `from_user_id` 새로운 컬럼명이 생긴다.
>
> ```python
> from django.db import models
> from django.conf import settings
> from django.contrib.auth.models import AbstractUser
> 
> class User(AbstractUser):
>     followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="followings")
> ```

> `accounts` app > `admin.py`
>
> ```python
> from django.contrib import admin
> from django.contrib.auth.admin import UserAdmin
> from .models import User
> 
> # Register your models here.
> admin.site.register(User, UserAdmin)
> ```

- 현재 상태에서 새로 회원가입 하는 순간 아래와 같은 오류가 발생한다.

  ```
  AttributeError at /accounts/signup/
  Manager isn't available; 'auth.User' has been swapped for 'accounts.User'
  ```

- <a href=" https://docs.djangoproject.com/ko/2.2/topics/auth/customizing/#custom-users-and-the-built-in-auth-forms" target="_blank">(공식 문서)</a> 에 의해 `UserCreationForm`과 `UserChangeForm`을 Custom을 해야 한다.

  `CustomUserCreationForm`에 다음과 같은 구문을 추가한다.

  `auth.User`를 바라보고 있는 것을 `accounts.User`를 바라볼 수 있도록 오버라이드 하게 해 준다.

  ```python
  model = get_user_model()
  ```

<br>

#### (2) 팔로우 구현하기

> `articles` app > `follow` view 생성
>
> ```python
> def follow(request, article_pk, user_pk):
>     person = get_object_or_404(get_user_model(), pk=user_pk) # person = 게시글 유저
>     user = request.user # user = 접속 유저
>     # 내(request.user)가 게시글 유저(person) 팔로워 목록에 이미 존재 한다면,
>     if person.followers.filter(pk=user.pk).exists():
>         person.followers.remove(user)
>     else:
>         person.followers.add(user)
>     return redirect('articles:detail', article_pk)
> ```
>
> `detail` view에 다음 두 줄 구문 추가
>
> ```python
> person = get_object_or_404(get_user_model(), pk=article.user_id) # template에서 person을 사용하기 위해 추가함
> context = {'article': article, 'comment_form': comment_form, 'comments': comments, 'person': person,}
> ```

> `urls.py`
>
> ```python
> path('<int:article_pk>/follow/<int:user_pk>/', views.follow, name='follow'),
> ```

> `_follow.html` (`detail.html` 맨 아래에 `{% include 'articles/_follow.html' %}` 구문 추가)
>
> ```django
> <div class="jumbotron text-center">
>   <h1 class="display-4">{{ person.username }}</h1> {# article.user로도 가능하다. #}
>   <p class="lead">
>     팔로잉 : {{ person.followings.all|length }} / 팔로워 : {{ person.followers.all|length }}
>   </p>
>   <hr class="my-4">
>   {% if user != article.user %} {# 요청된 유저가 게시글의 유저랑 달라야 팔로우 기능이 보인다. #}
>     {% if user in person.followers.all %} {# user는 request.user이다. #}
>       <a class="btn btn-primary btn-lg" href="{% url 'articles:follow' article.pk person.pk %}" role="button">Unfollow</a>
>     {% else %}
>       <a class="btn btn-primary btn-lg" href="{% url 'articles:follow' article.pk person.pk %}#" role="button">Follow</a>
>     {% endif %}
>   {% endif %}
> </div>
> ```

![21312321](https://user-images.githubusercontent.com/52685250/67360060-e6112800-f59f-11e9-80ce-17c55a8efe64.JPG)

- 테이블로 직접 확인하면 1번 유저가 3번 유저에게 팔로우를 했다는 것을 볼 수 있다.

<br>

---

<br>

## 14. 10월24일(14일차)

### 14.1 해시태그 기능 구현하기(M : N Relationships)

#### (1) 해시태그 기능 구현① - 해시태그 생성

> `articles` app > `models.py`
>
> - <b><u>[주의!]Article 모델보다 상위에 있어야 Article 모델의 hashtags 필드가 인식할 수 있다.</u></b>
>
> - `article_id`, `hashtag_id`를 필드로 갖는 `articles_article_hashtags` 라는 중개모델이 생성된다.
>
> ```python
> class Hashtag(models.Model):
>     content = models.TextField(unique=True)
>     # unique=True : 해시태그 하나하나가 고유의 값을 가져야 한다.(같은 해시태그가 따로 또 저장되면 안 된다.)
> 
>     def __str__(self):
>         return self.content
> ```
>
> ```python
> hashtags = models.ManyToManyField(Hashtag, blank=True) # Article 모델에 hashtags 필드 추가
> ```

> `articles` app > `admin.py`
>
> ```python
> from .models import Article, Comment, Hashtag
> 
> class HashtagAdmin(admin.ModelAdmin):
>     list_display = ('content',)
> 
> admin.site.register(Hashtag, HashtagAdmin)
> ```

> `articles` app > `views.py`
>
> - hashtag는 `def hashtag(request)`와 같이 작성하지 않는다.
>
> - 해시태그는 글을 작성할 때 사용하므로 `create` view의 중간에 hashtag 기능 부분을 추가해야 한다.
>
> - `#안녕 하세요 #저는 #누구 입니다`라는 문자열로 들어오면 `.split()`으로 먼저 나눠준다.
>
> - `words = ['#안녕', '하세요', '#저는', '#누구', '입니다']`
>
>   ```python
>   # Pesudo Code
>   for word in words:
>       if word.startswith('#'):
>           # get_or_create를 사용해서 이미 객체가 있으면 저장 안하고(.get이 실행 ) 없으면 저장(.create가 실행)한다.
>           # .get_or_create()는 튜플 형태로 나오므로 아래와 같이 두 개의 변수에 저장한다.(created는 True, False 형태로 출력된다.)
>           hashtag, created = Hashtag.objects.get_or_create(content=word)
>           article.hashtags.add(hashtag) # 해시태그 저장
>   return redirect(detail)
>   ```
>
> ```python
> from .models import Article, Comment, Hashtag
> 
> # article.save() 이후에 작성
> for word in article.content.split(): # content를 공백 기준으로 리스트로 변경
>     if word.startswith('#'): # '#'으로 시작되는 요소만 선택
>         hashtag, created = Hashtag.objects.get_or_create(content=word)
>         article.hashtags.add(hashtag)
> ```

---

:heavy_check_mark: <b>수정할 때 주의사항</b>

- 수정될 때는 게시글의 <b>hashtag 전체를 삭제한 후 다시 등록하는 과정</b>이 필요하다!

---

> `articles` app > `update` view
>
> - 이때 기존에 있던 hashtag는 유지되야 한다.
>
> ```python
> # article = form.save() 이후에 작성
> 
> article.hashtags.clear() # 해당 article의 hashtag 전체 삭제(이 구문만 추가됨)
> # for문은 create 작성할 때와 동일
> for word in article.content.split():
>     if word.startswith('#'):
>         hashtag, created = Hashtag.objects.get_or_create(content=word)
>         article.hashtags.add(hashtag)
> ```

<br>

#### (2) `get_or_create` <a href=" https://docs.djangoproject.com/en/2.2/ref/models/querysets/#get-or-create" target="_blank">(공식문서)</a>

- `get_or_create(defaults=None, **kwargs)`

  - 주어진 kwargs로 객체를 찾으며 필요한 경우 하나를 만든다.
  - `(object, created)` 형태의 tuple을 return 한다.
    - `object` : 검색 또는 생성된 객체
    - `created` : 새 객체 생성 여부를 지정하는 boolean 값(새로 만들어진 object 라면 True, 기존에 존재하던 object 라면 False)
  - 단, 이 메서드는 DB가 키워드 인자의 `unique` 옵션을 강제하고 있다고 가정하고 실행된다.
    - 중복 object 발생하는 것을 방지하기 위해

  - 이는 요청이 병렬로 작성될 때(`try ~ except DoesNotExist`) 및 중복 코드에 대한 문제 방지로 중복 오브젝트가 작성되는 것을 예방한다.

<br>

#### (3) `unique` 속성 <a href=" https://docs.djangoproject.com/en/2.2/ref/models/fields/#unique" target="_blank">(공식 문서)</a>

- True인 경우 이 필드는 테이블 전체에서 고유한 값이어야 한다.
- 유효성 검사(`is_valid`)단계에서 실행되며 중복 값이 있는 모델을 저장하려고 하면 `.save()` 메서드로 인해 `IntegrityError`가 발생한다.

- ManyToManyField 및 OneToOneField 를 제외한 모든 필드 유형에서 유효하다.

<br>

#### (4) 해시태그 기능 구현 ② - 해시태그 모아보기, 해시태그 선택시 상세페이지 이동

> `articles` app > `hashtag` view 생성
>
> ```python
> def hashtag(request, hash_pk):
>     hashtag = get_object_or_404(Hashtag, pk=hash_pk)
>     articles = hashtag.article_set.order_by('-pk')
>     context = {'hashtag': hashtag, 'articles': articles,}
>     return render(request, 'articles/hashtag.html', context)
> ```

> `urls.py`
>
> ```python
> path('<int:hash_pk>/hashtag/', views.hashtag, name='hashtag'),
> ```

> `hashtag.html`
>
> ```django
> {% extends 'articles/base.html' %}
> 
> {% block content %}
>   <div class="jumbotron jumbotron-fluid text-center my-2 text-white bg-dark">
>     <div class="container">
>       <h1 class="display-4">{{ hashtag.content }}</h1>
>       <p class="lead">{{ articles|length }} 개의 게시글</p>
>     </div>
>   </div>
>   <hr>
>   <h3 class="text-center">{{ hashtag.content }} 를 태그한 글</h3>
>   <div class="row">
>     {% for article in articles %}
>     <div class="col-4 my-2">
>       <div class="card">
>         <div class="card-body">
>           <h5 class="card-title">{{ article.title }}</h5>
>           <p class="card-text">{{ article.like_users.all|length }} 명이 좋아요</p>
>           <p class="card-text">{{ article.comment_set.all|length }} 개의 댓글</p>
>           <a href="{% url 'articles:detail' article.pk %}" class="btn btn-success">보러가기</a>
>         </div>
>       </div>
>     </div>
>     {% endfor %}
>   </div>
> {% endblock %}
> ```

:black_flag: result screenshot

![result](https://user-images.githubusercontent.com/52685250/67446106-668c6300-f64a-11e9-9014-d26294d427ee.JPG)

:heavy_check_mark: <b>해시태그 선택 시 해당 해시태그 모아보기 페이지로 이동</b>

> `articles` app > `templatetag` folder 생성 > `make_link.py`
>
> - `templatetag`, `static` 관련 내용은 켜져있는 서버를 끄고 다시 켜면 된다.
>
> ```python
> from django import template
> 
> register = template.Library()
> 
> @register.filter
> def hashtag_link(word):
>     # word 는 article 객체가 들어갈건데
>     # article 의 content 들만 모두 가져와서 그 중 해시태그에만 링크를 붙인다.
>     content = word.content + ' '
>     hashtags = word.hashtags.all()
> 
>     for hashtag in hashtags:
>         content = content.replace(hashtag.content + ' ', f'<a href="/articles/{hashtag.pk}/hashtag/">{hashtag.content}</a> ')
>         # a 태그 작성시 </a> 뒤에 공백 한 칸 반드시 있어야 한다!
>         # 공백이 없으면 모든 게시글들이 다 붙는다.
>         
>     return content
> ```

> `detail.html` 내용 부분 수정
>
> :ballot_box_with_check: `before`
>
> ```django
> <p>내용 : {{ article:content }}</p>
> ```
>
> :ballot_box_with_check: `after` <a href=" https://stackoverflow.com/questions/2080559/disable-html-escaping-in-djangos-textfield" target="_blank">(참고 문서)</a> <a href=" https://docs.djangoproject.com/en/2.2/ref/templates/builtins/#safe" target="_blank">(공식 문서)</a>
>
> - django는 자동으로 autoescape 기능이 켜져 있으므로 `safe` filter를 이용하여 autoescape 기능을 꺼야 한다.
>
> ```django
> {% load make_link %} <!-- 상단에 load 구문 작성 -->
> 
> <p>내용: {{ article|hashtag_link|safe }}</p>
> ```

<br>

### 14.2 OAuth(Social Login) <a href=" https://django-allauth.readthedocs.io/en/latest/installation.html">(django allauth 공식문서)</a>

---

:heavy_exclamation_mark: <b>반드시 공식 문서를 보면서 설치 및 세팅하자!!</b>

---

#### (1) 기본 세팅

- <b>[STEP1] 설치 및 세팅</b>
  - django allauth 공식문서에 나와 있는 순서대로 django-allauth 설치,  `settings.py`, `urls.py`에 추가할 내용 작성, migrate 과정을 진행한다.
  - <b>[주의!] `urls.py` 작성시 `path('accounts/', include('allauth.urls')),`를 기존에 있는 `accouts` url 구문 밑에 넣자.</b>

- <b>[STEP2] 플랫폼 추가</b>

  ![003](https://user-images.githubusercontent.com/52685250/67449474-431ae580-f655-11e9-9115-42f981403c78.JPG)

  - 카카오 개발자센터 로그인, 앱 등록
  - 설정 > 일반 > 플랫폼 추가 > 웹 선택 > <b>http로 시작하는 로컬 주소와 https로 시작하는 로컬 주소를 추가</b> 후 저장한다.

- <b>[STEP3] 사용자 관리 설정</b>

  ![004](https://user-images.githubusercontent.com/52685250/67449475-431ae580-f655-11e9-999c-73618f633c86.JPG)

  - 설정 > 사용자 관리 > 카카오계정(이메일) ON 상태로 전환
  - 이때 반드시 프로필 정보, 카카오계정의 <b>수집목적을 작성</b>(아무거나 작성해도 됨)
  - 작성 후 저장

- <b>[STEP4] 로그인 Redirect URI 등록</b>

  ![005](https://user-images.githubusercontent.com/52685250/67449476-431ae580-f655-11e9-8f0f-2503afbd5206.JPG)

  - <b>django-allauth 공식 홈페이지</b>에 `kakao`라고 검색한 후 맨 위에 나오는 페이지에 들어간다. <a href=" https://django-allauth.readthedocs.io/en/latest/providers.html#kakao" target="_blank">(바로 이동)</a>
  - callback URL(` http://localhost:8000/accounts/kakao/login/callback/ `)을 복사하여 로그인 Redirect URI에 붙여넣고 저장한다.

- <b>[STEP5] Client ID, Secret Key를 Django admin(소셜 어플리케이션)에 등록</b>

  ![006](https://user-images.githubusercontent.com/52685250/67449478-431ae580-f655-11e9-97c2-4317ab1d8141.JPG)

  - Client ID 발급 : 설정 > 일반 > `REST API 키`
  - Secret Key 발급 : 설정 > 고급 > `Client Secret`에서 발급가능
    - <b>이 때 코드 생성 후 상태를 ON으로 전환한 후 반드시 적용을 눌러야 한다.</b> 카카오 개발자센터에 나와 있는 순서 참고
  - 발급받은 Client ID, Secret Key를 django admin 페이지의 소셜 계정 > 소셜 어플리케이션에 위 사진과 같이 추가 및 작성 후 저장한다.
    - 이 때 제공자에 `kakao`는 자동으로 보인다.
    - 이름은 아무거나 작성해도 된다.
    - Sites에서 왼쪽에 있던 example.com은 오른쪽으로 넘겨준다.

<br>

#### (2) 카카오 소셜 로그인 기능 만들기

> 사전 작업
>
> - `login` view : `auth_form.html` => `login.html`
>
> - `auth_form.html` : 로그인 헤드라인 제거(아래 구문 제거)
>
>   ```django
>   {% elif request.resolver_match.url_name == 'login' %}
>   <h1>로그인</h1>
>   ```

> `login.html`
>
> ```django
> {% extends 'articles/base.html' %}
> {% load bootstrap4 %}
> {% load socialaccount %}
> 
> {% block content %}
>   <h1>로그인</h1>
>   <form action="" method="POST">
>     {% csrf_token %}
>     {% bootstrap_form form %}
>     {% buttons submit='로그인' reset="Cancel" %}{% endbuttons %}
>   </form>
>   <a class="btn btn-warning" href="{% provider_login_url "kakao" %}">KAKAO</a>
> {% endblock  %}
> ```

> `settings.py` <a href=" https://docs.djangoproject.com/en/2.2/ref/settings/#login-redirect-url" target="_blank">(참고 공식 문서)</a>
>
> ```python
> # LOGIN_REDIRECT_URL = '/accounts/profile/'
> # 위의 값이 기본값으로 숨겨져 있어서 처음에 카카오 로그인하면 Page Not Found 오류가 떴음
> # 아래와 같이 구문 추가
> LOGIN_REDIRECT_URL = 'articles:index'
> ```

:checkered_flag: result screenshots

![kakao](https://user-images.githubusercontent.com/52685250/67454322-c98af380-f664-11e9-893e-3f08b908734f.JPG)

:heavy_check_mark: 참고 페이지 : <a href=" https://docs.djangoproject.com/en/2.2/ref/settings/" target="_blank">(django settings 공식문서)</a>

- 추후 AWS나 Heroku에 배포할 때 다시 볼 공식 문서이다.

<br>

---

<br>

## 15. 10월28일(15일차) - `REST API` 

### 15.1 REST, API <a href="https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html" target="_blank">(참고하면 좋은 페이지)</a>

- `REST(Repersentational State Transfer)`
  - 각 요청이 어떠한 동작&정보를 위한 것인지 <b><u>요청 형식 자체(주소)로 파악이 가능</u></b>한 것
  - 자원의 표현에 의한 상태 전달
  - HTTP URI를 통해 자원을 명시하고, HTTP Method를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것
- `API(Application Programming Interface)`
  - 데이터와 기능의 집합을 제공하여 컴퓨터 프로그램간 상호작용을 촉진하며, 서로 정보를 교환 가능하도록 하는 것
- `REST API`
  - REST 기반으로 서비스 API를 구현한 것
  - 최근 Open API, 마이크로 서비스 등을 제공하는 업체 대부분은 REST API를 제공한다.

<br>

### 15.2 Django REST Framework <a href="https://www.django-rest-framework.org/" target="_blank">(공식 홈페이지)</a>

#### (1) install process

- project명 : `api`, app명 : `musics`

  ```bash
  pip install djangorestframework
  ```

  ```python
  INSTALLED_APPS = [
      ...
      'rest_framework', # settings.py의 INSTALLED_APPS에 추가
  ]
  ```

- modeling - `models.py`

  Artist : Music = 1 : N, Music : Comment = 1 : N 관계이다.

  ```python
  from django.db import models
  
  class Artist(models.Model):
      name = models.TextField()
  
      def __str__(self):
          return self.name
  
  
  class Music(models.Model):
      artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
      title = models.TextField()
  
      def __str__(self):
          return self.title
  
  
  class Comment(models.Model):
      music = models.ForeignKey(Music, on_delete=models.CASCADE)
      content = models.TextField()
  
      def __str__(self):
          return self.content
  ```

- migrations 과정

  ```bash
  python manage.py makemigrations
  ```

  ```bash
  python manage.py migrate
  ```

- superuser 생성 후 `admin.py` 편집

  ```python
  from django.contrib import admin
  from .models import Artist, Music, Comment
  
  admin.site.register(Artist)
  admin.site.register(Music)
  admin.site.register(Comment)
  ```

- admin page에 들어가서 artist 2개, music는 artist당 2개, comment는 music당 2개씩 미리 dummy data를 생성하자.

<br>

#### (2) dump data <a href="https://docs.djangoproject.com/ko/2.2/ref/django-admin/#dumpdata" target="_blank">(공식 문서)</a>

- 공식 문서에는 `django-admin` commend로 입력해야하는데 각종 문제점이 있기 때문에 `python manage.py` commend로 사용한다.

- dump data 생성

  ```bash
  python manage.py dumpdata musics > dummy.json # 하지만 현재 상태는 데이터가 한 줄로 나와 있어 보기 불편하다.
  ```

  ```bash
  python manage.py dumpdata --indent 2 musics > dummy.json
  # 협업할 때 migrate하고 이 dump data를 받아 DB에 load해서 사용하면 된다.
  ```

<br>

#### (3) load data <a href="https://docs.djangoproject.com/ko/2.2/ref/django-admin/#loaddata" target="_blank">(공식 문서)</a>

##### ① `fixture`

- 데이터베이스의 직렬화(serialized)된 내용을 포함하는 파일 모음이다.

- 각 fixture는 고유한 이름을 가지며, 이를 구성하는 파일은 여러 응용 프로그램에서 여러 디렉토리에 배포될 수 있다.

- [주의사항] django는 `loaddata` 시 설치된 모든 app 에서 `fixtures` 라고 하는 이름의 폴더를 찾는다.

  파일 구조 예시는 다음과 같다.

  ```python
  musics/ # app
  	fixtures/
  		musics/ # namespace 적용
  			dummy.json
  ```

<br>

##### ② load data하기

- `loaddata`를 위해 `db.sqlite3` 지우고 다시 `migrate` 과정만 한다. DB를 지웠기 때문에 createsuperuser를 다시한다.

- 위와 같은 파일구조가 되도록 폴더를 생성하고 `dummy.json`을 옮겨준다.

- load data하기

  ```bash
  python manage.py loaddata musics/dummy.json
  ```

- admin 페이지에 들어가면 동일한 데이터가 들어가 있음을 확인할 수 있다.

<br>

### 15.3 API 만들기

#### (1) Music 관련 API 만들기

> `api` project의 `urls.py`
>
> ```python
> from django.contrib import admin
> from django.urls import path, include
> 
> urlpatterns = [
>        path('api/v1/', include('musics.urls')),
>        path('admin/', admin.site.urls),
> ]
> ```

> `serializers.py`
>
> - serialize할 수 있는 python 파일 생성(사용자가 보기 편한 데이터를 만들어 주는 역할)
>
> ```python
> from rest_framework import serializers
> from .models import Music
> 
> class MusicSerializer(serializers.ModelSerializer):
>        class Meta:
>            model = Music
>            fields = ('id', 'title', 'artist_id')
> ```

> view 작성 <a href="https://www.django-rest-framework.org/api-guide/views/#function-based-views">(공식 문서)</a>
>
> ```python
> from django.shortcuts import render, get_object_or_404
> from rest_framework.decorators import api_view
> from rest_framework.response import Response
> from .serializers import MusicSerializer
> from .models import Music
> 
> @api_view()
> def music_list(request):
>        musics = Music.objects.all()
>        serializer = MusicSerializer(musics, many=True)
>        # 단일 객체가 아닌 여러 개를 가져올 경우 many=True를 작성
>        # Serializer는 musics 라고 하는 queryset을 json 타입으로 바꿔준다.
>        return Response(serializer.data)
> 
> 
> @api_view(['GET']) # GET만 허용할 경우
> def music_detail(request, music_pk):
>        music = get_object_or_404(Music, pk=music_pk)
>        serializer = MusicSerializer(music) # 단일 객체이므로 music만 작성
>        return Response(serializer.data)
> ```

> `urls.py`
>
> ```python
> from django.urls import path
> from . import views
> 
> urlpatterns = [
>        path('musics/', views.music_list),
>        path('musics/<int:music_pk>/', views.music_detail),
> ]
> 
> ```

:checkered_flag: **API result screenshot**

- 전체를 조회할 때는 `list`로 출력된다!(`many=True`가 있기 때문에)

![33](https://user-images.githubusercontent.com/52685250/67647760-bd5da980-f976-11e9-9de7-a3a51901d533.JPG)

- 하나를 조회할 때는 `dictionary`로 출력된다.

![44](https://user-images.githubusercontent.com/52685250/67647960-7d4af680-f977-11e9-865e-da9e5825032c.JPG)

<br>

#### (2) API Document(명세서) 작성 <a href="https://github.com/axnsan12/drf-yasg" target="_blank">(drf-yasg 문서)</a>

- install process

  ```bash
  pip install -U drf-yasg
  ```

  ```python
  INSTALLED_APPS = [
     ...
     'drf_yasg',
     ...
  ]
  ```

  `musics` app의 `urls.py`

  ```python
  from rest_framework import permissions
  from drf_yasg.views import get_schema_view
  from drf_yasg import openapi
  from django.urls import path
  from . import views
  
  schema_view = get_schema_view(
     openapi.Info( # 이 부분은 custom 가능
        title="Music API",
        default_version='v1',
        description="음악 관련 API 서비스 입니다.",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="wallys0213@gmail.com"),
        license=openapi.License(name="SSAFY License"),
     ),
     public=True,
     permission_classes=(permissions.AllowAny,),
  )
  
  urlpatterns = [
      path('musics/', views.music_list),
      path('musics/<int:music_pk>/', views.music_detail),
      # python 1 버전(github페이지에는 정규표현식으로 나와있다)이 아닌 2 버전에 맞게 url 주소 작성
      path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
      path('redocs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
  ]
  
  ```

:checkered_flag: **API result screenshot**

![01](https://user-images.githubusercontent.com/52685250/67648517-407fff00-f979-11e9-9489-9bf4cac81bf0.JPG)
![02](https://user-images.githubusercontent.com/52685250/67648518-407fff00-f979-11e9-91bd-a281c279aeb7.JPG)

#### (3) Artist 관련 API 만들기

:heavy_check_mark: **Artist 관련 전체 API 만들기**

> `serializers.py`
>
> ```python
> class ArtistSerializer(serializers.ModelSerializer):
>        class Meta:
>            model = Artist
>            fields = ('id', 'name')
> ```

> `views.py`
>
> ```python
> @api_view(['GET'])
> def artist_list(request):
>        artists = Artist.objects.all()
>        serializer = ArtistSerializer(artists, many=True)
>        return Response(serializer.data)
> ```

> `urls.py`
>
> - `urlpatterns`에 다음 구문 추가
>
> ```python
> path('artists/', views.artist_list),
> ```

:checkered_flag: **API result screenshot**

- 아래 사진과 같이 좌측 메뉴에 `artists`가 새로 생성됨을 확인할 수 있다.

![03](https://user-images.githubusercontent.com/52685250/67648755-f77c7a80-f979-11e9-850b-f0ae21fcd633.JPG)

:heavy_check_mark: **특정 Artist 정보만 가져오는 API 만들기**

> `views.py`
>
> ```python
> def artist_detail(request, artist_pk):
>     artist = get_object_or_404(Artist, pk=artist_pk)
>        serializer = ArtistSerializer(artist)
>        return Response(serializer.data)
>    ```

> `urls.py`
>
> ```python
> path('artists/<int:artist_pk>/', views.artist_detail), # 구문 추가
> ```

<br>

#### (4) 1 : N 관계 적용된 API 만들기

> `serializers.py`
>
> ```python
> class ArtistDetailSerializer(ArtistSerializer):
>     music_set = MusicSerializer(many=True) # 음악들에 해당하는 필드명
> 
>     class Meta(ArtistSerializer.Meta): # model은 굳이 쓸 필요가 없다(이미 상속 받고 있음)
>         fields = ArtistSerializer.Meta.fields + ('music_set',)
> ```

> `views.py`
>
> ```python
> @api_view(['GET'])
> def artist_detail(request, artist_pk):
>     artist = get_object_or_404(Artist, pk=artist_pk)
>     # ArtistSerailizer => ArtistDetailSerializer로 수정
>     serializer = ArtistDetailSerializer(artist)
>     return Response(serializer.data)
> ```

- ArtistDetailSerializer의 music_set 이름 변경하기

  - [방법1] - `models.py`에서

    ```python
    class Music(models.Model):
        artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='musics')
        title = models.TextField()
    
        def __str__(self):
            return self.title
    ```

  - [방법2] - `serializers.py`에서

    ```python
    class ArtistDetailSerializer(ArtistSerializer):
        musics = MusicSerializer(source='music_set', many=True)
    
        class Meta(ArtistSerializer.Meta):
            fields = ArtistSerializer.Meta.fields + ('musics',)
    ```

<br>

#### (5) 요청만으로 API 만들기

> `serializers.py`
>
> ```python
> class CommentSerializer(serializers.ModelSerializer):
>     class Meta:
>         model = Comment
>         fields = ('id', 'content', 'music_id')
>         
> class MusicDetailSerializer(MusicSerializer):
>     comments = CommentSerializer(source='comment_set', many=True)
>     class Meta(MusicSerializer.Meta):
>         fields = MusicSerializer.Meta.fields + ('comments',)
> ```

> `views.py`
>
> ```python
> @api_view(['POST']) # 글이 작성되는 것이므로 POST이다.
> def comments_create(request, music_pk):
>     serializer = CommentSerializer(data=request.data)
>     if serializer.is_valid(raise_exception=True):
>         serializer.save(music_id=music_pk)
>     return Response(serializer.data)
> ```
>
> ```python
> # music_detail view의 MusicSerializer를 MusicDetailSerializer로 변경
> serializer = MusicDetailSerializer(music)
> ```

> `urls.py`
>
> ```python
> path('musics/<int:music_pk>/comments/', views.comments_create), # 구문 추가
> ```

:checkered_flag: **API result screenshot**

- 아래 사진과 같이 각 음악에 대한 댓글들이 출력됨을 볼 수 있다.

  ![04](https://user-images.githubusercontent.com/52685250/67653361-695dbf80-f98c-11e9-87b0-6d84804a4c6b.JPG)

- POST  방식으로 보내기 위해 POSTMAN을 설치하고 POST방식으로 댓글을 작성하여 보내준다.

  URL 주소 입력 시 1, 2, 3, ...와 같이 매번 숫자를 입력하는 대신에 `:`을 붙여 `:music_pk`를 사용해 보낼 수 있다.

  `Body`에서 KEY에 `content`, VALUE에 작성할 댓글 내용을 쓴다.

  ![10](https://user-images.githubusercontent.com/52685250/67653895-d2decd80-f98e-11e9-9080-ad244c8fa184.JPG)

  Params의 Path Variables의 VALUE에 숫자를 입력하면 된다.

  ![11](https://user-images.githubusercontent.com/52685250/67653896-d3776400-f98e-11e9-8e79-eaa97529fc7b.JPG)
  ![12](https://user-images.githubusercontent.com/52685250/67653897-d3776400-f98e-11e9-966f-af1bb7c62907.JPG)

<br>

#### (6) REST하게 주소 작성하기(PUT(수정), DELETE(삭제) 추가)

> `views.py`
>
> ```python
> @api_view(['PUT', 'DELETE']) # PUT : 수정, DELETE : 삭제
> def comments_update_and_delete(request, comment_pk):
>     comment = get_object_or_404(Comment, pk=comment_pk)
>     if request.method == 'PUT':
>         serializer = CommentSerializer(data=request.data, instance=comment)
>         if serializer.is_valid(raise_exception=True):
>             serializer.save()
>             return Response({'message': 'Comment has been updated !'})
>     else:
>         comment.delete()
>         return Response({'message': 'Comment has been deleted!'})
> ```

> `urls.py`
>
> ```python
> path('comments/<int:comment_pk>/', views.comments_update_and_delete),
> ```

:checkered_flag: **API result screenshot**

- DELETE 동작

![20](https://user-images.githubusercontent.com/52685250/67654213-20a80580-f990-11e9-9933-8b6dfcace732.JPG)

- PUT 동작

![30](https://user-images.githubusercontent.com/52685250/67654378-b6439500-f990-11e9-864d-adfd7ec92e86.JPG)
![31](https://user-images.githubusercontent.com/52685250/67654379-b6dc2b80-f990-11e9-88e6-9d2aed12d1d0.JPG)

- 만약 view에서 정의하지 않은 방식이 들어올 경우 아래 사진과 같이 허용되지 않는다는 문구가 출력된다.

![789](https://user-images.githubusercontent.com/52685250/67654721-d45dc500-f991-11e9-880c-dc7e9ac429f2.JPG)

<br>

#### (7) Custom API

> `serializer.py`
>
> - 음악 개수를 의미하는 `musics_count` 라는 완전히 새로운 필드를 만든다.
>
> ```python
> class ArtistDetailSerializer(ArtistSerializer):
>     musics = MusicSerializer(source='music_set', many=True)
>     musics_count = serializers.IntegerField(source='music_set.count')
>     class Meta(ArtistSerializer.Meta):
>         fields = ArtistSerializer.Meta.fields + ('musics', 'musics_count')
> ```

:checkered_flag: API result screenshot

![40](https://user-images.githubusercontent.com/52685250/67654566-4c77bb00-f991-11e9-8ae5-767d3e5a09cb.JPG)
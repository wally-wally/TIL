# [SSAFY]Django(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]Django`은 정규과정 `Django`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

## 1. 8월14일(01일차)  <a href="https://tothefullest08.github.io/django/2019/02/11/django01/">:rocket:(Intro about Django)</a> ​

### 1.1 Django의 주요 특징 및 성격

- 주요 특징 : `Versatile` (다용도의), `Secure` (안전한), `Scalabe` (확장성 있는) , `Complete` (완결성 있는), `Maintainable` (쉬운 유지보수), `Portable` (포터블한 - 다양한 운영체제에서 작동 가능)

- django의 성격 : `다소 독선적` 이라고 공식 문서에서 명시됨
  - `Opinionated` (독선적) : 특정 프레임워크에 맞는 규칙(약속)을 반드시 지켜야 함
    - 개발의 자유도는 떨어지거나 유연한 개발이 어렵다.
    - 하지만 개발자가 손 볼 것이 많지 않다.
    - 최근에는 생산성이 높아야 하므로 `Opinionated` 이 대세다.
  - `Unopinionated` (관용적) 
    - 자유도가 비교적 높아 제약이 거의 없이 여러 컴포넌트들을 붙여 사용할 수 있다.

<br>

### 1.2 가상 환경

#### (1)가상 환경을 사용하는 이유

- `의존성` 문제 : 본인의 컴퓨터에서 자 작동하던 프로그램도 다른 프로그램에 설치 했을 때 잘 동작하리라는 보장이 없음.
  - Python도 같은 버전, 같은 모듈을 쓴다는 보장이 없다.

- 특정 프로그램만을 실행하기 위한 Python 환경을 따로 만들어서 그 환경속에서만 모듈을 관리하고 앱을 실행하기 위해 가상환경을 설정한다.
  - 다른 앱을 실행시키는 일이 생기면 그 가상환경을 빠져나와 다른 환경을 만드는 방식으로 진행한다.
- `python -m venv` (가상환경 경로 + 이름)
  - `python -m venv ssafy` : 특정경로 없이 현재 위치에서 ssafy라는 이름의 가상환경이 만들어짐
  - `python -m venv ~/documents/ssafy`

<br>

#### (2) 가상 환경 만들기

- [1st] `git bash` 명령어
  - `python -m venv venv` (이 과정만 수행하고 바로 `[2nd]`로 넘어가자)
  - `source venv/Scripts/activate`
  - `pip list` : update 명령어 실행
  - 다시 `pip list` 누르고 버전 확인
  - `deactivate` 가상환경 종료
- :star: **[2nd] `vscode` 에서 할 일 (이 과정은 vscode 켤 때마다 항상 실행할 과정 / 반드시 차례대로 수행!)**
  - [Ctrl] + [Shift] + [P] 입력 후 `Python: Select Interpreter` 선택
  - `venv` 적힌 Python 버전 선택
  - 기존에 켜져 있는 `vscode`의 터미널 강제 종료 후 다시 터미널 실행한다.
  - 새로 열린 터미널에서 `(venv)` 적힌거 확인하고  `pip list`로 버전 및 가상환경 확인 (**<u>반드시 가상환경을 먼저 켜고(상위 세 과정) 터미널을 열자!</u>**)
  - update 명령어 나오면 항상 수행하자

>만약 [Ctrl] + [`] 단축키 안 될 때(Option)
>
>- 업데이트 확인
>- 최신 버전 확인 후 [F1] 누르고 'Perfernces : Open Settings (JSON)' 들어가서 맨 앞에 `"terminal.integrated.cwd": "${workspaceFolder}",` 추가
>- 저장 후 다시 [F1] 누르고 'Perfernces : Open Keyboard Shortcuts' 들어가서 'openInTerminal'에 있던 기존 단축키 삭제 후
>- integrate 검색 후 'Terminal: Create New Integrated Terminal (In Active Workspace)'의 단축키를 [Ctrl] + [`]로 다시 설정하면 됨.

- django 설치 및 버전 확인
  - `pip install django` => `python -m django --version`

<br>

### 1.3 Django 프로젝트 시작하기

#### (1) django 프로젝트 생성

- **django 프로젝트 만들기**
  - `django-admin startproject 만들_프로젝트명 .` (맨 마지막에 한 칸 띄고 온점 반드시 입력!)

- **서버 실행**(반드시 `manage.py` 파일이 있는 곳에서 실행)
  - `python manage.py runserver`
  - 새로 생긴 주소 `http://127.0.0.1:8000/` 를 [Ctrl] 누르고 클릭 하면 서버 열림
  - 서버 종료 : 터미널에서 [Ctrl] + [C]

#### (2) 기본 생성된 Python 파일 설명

- `__init__.py` : Python의 파일들을 모듈화 시키는 파일(앞으로 수정, 열 일이 없음)
- `settings.py` : 웹 어플리케이션 위치, DB 세부설정 등과 같은 Django 프로젝트의 모든 환경이 저장된 곳(대부분 이 곳에서 작업할 예정)
- `urls.py` : 사이트의 url와 view 연결
- `wsgi.py` : 나중에 AWS할 때 만질 예정(웹 서버 규칙이 정의된 곳)

<br>

### 1.4 MTV Model

> 원래는 MVC(Model View Controller)인데 Django에서는 `MTV`(Model Template View)라고 부름
>
> MVC의 V와 MTV의 V는 서로 역할이 다르다! MVC의 V는 MTV의 T와 MVC의 C는 MTV의 V와 역할이 같다!

![mtv](https://user-images.githubusercontent.com/52685250/62988314-e0e87c00-be7e-11e9-8174-c53added38cf.JPG)

- `M` : Model(데이터를 관리)

- `T` : Template(사용자가 보는 화면)
- ` V` : View(중간 관리자)

<br>

### 1.5 Django APP 시작하기

#### (1) APP 초기 생성

- `python manage.py startapp APP_이름` : 통상적으로 APP_이름은 복수형으로 만드는것이 convention
  - ex) `python manage.py startapp pages` 와 같이 작성함

<br>

#### (2) 생성되는 기본 파일들

<img width="467" alt="mtv_process" src="https://user-images.githubusercontent.com/52685250/62988615-fca05200-be7f-11e9-984e-298e3d4dba0e.png">

- `admin.py` : 관리자형 페이지를 기본적으로 만들어 줌
- `apps.py` : APP과 관련된 기본 정보들
- `models.py` : model과 관련된 정보들(추후 DB와 연관됨)
- `tests.py` : test code를 작성하는 곳
- `views.py` : MTV 중 V(중간 관리자) 역할을 하는 곳(여기서 기능별 함수들 같은 거 작성함)

<br>

### 1.6 Django APP 초기 설정(`Settings.py`)

#### (1) APP 등록하기

:warning: **<u>반드시 APP 폴더를 먼저 생성하고 그 다음에 APP 초기 설정을 한다.</u>**

![setting](https://user-images.githubusercontent.com/52685250/62988721-4ee17300-be80-11e9-9ca8-98a5ed04010c.JPG)

- `settings.py` 에 `'pages.apps.PagesConfig',`를 `INSTALLED_APPS` 안에 반드시 작성해주자.
  - `pages.apps` 부분은 파일명에 따라 달라지므로 프로젝트 및 APP 생성 후 폴더명을 따라서 작성하자
- app 등록 순서(django style guide에 따름)
  - local apps => Thrid party apps => 기본적으로 깔려있는 Django apps

<br>

#### (2) Internationalization(I18n) 과정 (한글화 설정)

![I18n](https://user-images.githubusercontent.com/52685250/62989012-5fdeb400-be81-11e9-81d9-44975fa166fb.JPG)

- 기본값이 `en-us`, `UTC`를 한국에 맞게 `LANGUAGE_CODE = 'ko-kr'`, `TIME_ZONE = 'Asia/Seoul'`로 값을 바꿔줌(처음부터 `Asia/Seoul`로 기본값을 바꿀 수는 없다. 일단 처음은 `UTC`임)
  - <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">:watch:(국가별 TIME_ZONE 값 설정)</a>
- `USE_TZ = True` : 사용자의 국가에 맞게 그 국가에 맞는 시간을 자동으로 설정해 줌

<br>

### 1.7 기본적인 요청 & 응답 만들기(M을 제외한 T-V 동작)

:warning: **<u>차례대로 흐름을 반드시 익히자!!</u>**

![URL](https://user-images.githubusercontent.com/52685250/62990260-40965580-be86-11e9-8d45-a39fa83dfd06.JPG)

- **코드 작성 순서**
  - ① `views.py` : 만들고자 하는 view 함수 작성
  - ② `urls.py` : `views.py`에서 만든 함수에 주소를 연결(실제 동작은 이게 먼저임)
  - ③ `templates` : 해당 view 함수가 호출될 때, 보여질 페이지

#### (1) 글자 출력하기

> ① `pages` > `views.py`

```python
def index(request): # 첫 번째 인자는 반드시 request
    return render(request, 'index.html') # render()의 첫 번째 인자도 반드시 request
```

> ② url(입구) 만들기 (`프로젝트명(django_intro)` > `urls.py`)

```python
from django.contrib import admin
from django.urls import path

# views.py 내에 있는 함수 사용하기 위해 import 구문 선언
# 생성한 app pages 폴더 안의 views.py 파일 가져옴
from pages import views

urlpatterns = [
    # url 경로 마지막에 /를 반드시 붙임 | views.index : views.py의 index 함수로 연결
    path('index/', views.index), # index/는 내가 정한 url 이름
    path('admin/', admin.site.urls),
]
```

> ③ template 생성 (`pages` 폴더 안에 `templates` 폴더 만들고 `index.html` 파일 생성)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Hi django!!</h1>
</body>
</html>
```

#### (2) 점심 메뉴 랜덤으로 하나 뽑기

> `views.py`

```python
# 아래 구문을 추가

import random

def dinner(request):
    menu = ['냉국수', '치즈돈가스', '보쌈', '치킨']
    pick = random.choice(menu)
    # 앞의 pick : templates에서 가져갈 이름, 뒤의 pick : 바로 윗 줄의 pick 변수
    # 통상적으로 key랑 value는 같은 이름을 쓴다.
    context = {'pick': pick}
    return render(request, 'dinner.html', context)
```

> `urls.py`

```python
path('dinner/', views.dinner), # 이거만 추가
```

> `dinner.html`

```html
{% comment %} 중괄호 두 개 쓸 때 양 옆으로 한 칸씩 띄는 것이 style guide {% endcomment %}
<h1>오늘 저녁은 {{ pick }}!</h1>
```

#### (3) 이미지 랜덤으로 하나 뽑아오기

> `views.py`

```python
def image(request):
    return render(request, 'image.html')
```

> `urls.py`

```python
path('image/', views.image),
```

> `image.html`

```html
<img src="https://picsum.photos//500/500.jpg" alt="#">
```

<br>

### 1.8 variable routing

#### (1) 동적 라우팅

> `views.py`

```python
def hello(request, name): # name은 원하는 변수명으로 지정
    context = {'name': name} # 위의 name은 context 딕셔너리의 value와 같다.
    return render(request, 'hello.html', context)
```

> `urls.py`

```python
path('hello/<str:name>/', views.hello), # str은 default 이므로 생략 가능
```

> `hello.html`

```html
{% comment %} 여기의 name은 context 딕셔너리의 value값 {% endcomment %}
<h1>안녕하세요, {{ name }}</h1>
```

- 아래와 같이 점심 메뉴 예제와 `hello` 예제를 합칠 수도 있다

> `views.py`

```python
def hello(request, name): # name은 원하는 변수명으로 지정
    menu = ['냉국수', '치즈돈가스', '보쌈', '치킨']
    pick = random.choice(menu)
    context = {'name': name, 'pick': pick,} # 위의 name은 context 딕셔너리의 value와 같다.
    # value값 pick 뒤에 마지막 ,는 적어주는 습관 기르자
    # 이와 같이 context는 개수 제한 없이 넘길 수 있다.
    return render(request, 'hello.html', context)
```

> `urls.py`

```python
path('hello/<str:name>/', views.hello), # str은 default 이므로 생략 가능
```

> `hello.html`

```html
{% comment %} 여기의 name은 context 딕셔너리의 value값 {% endcomment %}
<h1>안녕하세요, {{ name }}</h1>
<h2>{{ name }}님이 먹을 오늘 점심 메뉴는 {{ pick }}입니다.</h2>
```

#### (2) [예제] 반지름 받아서 원의 넓이 구하기

> `views.py`

```python
def area(request, r):
    area = (r ** 2) * 3.14
    context = {'r': r, 'area': area,}
    return render(request, 'area.html', context)
```

> `urls.py`

```python
path('area/<int:r>/', views.area),
```

> `area.html`

```html
<h1>반지름이 {{ r }}인 원의 넓이는 {{ area }}입니다.</h1>
```

<br>

### 1.9 Django Template Language(DTL) <a href="https://docs.djangoproject.com/en/2.2/topics/templates/">:pencil:DTL(Official Document)</a>

- django template 에서 사용하는 내장 template system 이다.
- 조건, 반복, 변수 치환, 필터 등 많은 기능을 제공한다.

> `views.py`

```python
from datetime import datetime

def template_language(request):
    menus = ['짜장면', '탕수육', '짬뽕', '볶음밥', '양장피', '팔보채',]
    my_sentence = 'Life is short, you need python'
    messages = ['apple', 'banana', 'cucumber', 'bean',]
    datetimenow = datetime.now()
    empty_list = []
    context = {
        'menus': menus,
        'my_sentence': my_sentence,
        'messages': messages,
        'datetimenow': datetimenow,
        'empty_list': empty_list,
    }
    return render(request, 'template_language.html', context)
```

> `urls.py`

```python
path('template_language/', views.template_language),
```

> `template_language.html`

```html
<h3>1. 반복문</h3>
{% for menu in menus %}
<p>{{ menu }}</p>
{% endfor %}
<hr>

<!-- for loop 는 DTL for 문 안에서 자동으로 생기는 객체-->
{% for menu in menus%}
<p>{{ forloop.counter }}{{ menu }}</p>
{% endfor %}
<hr>

{% for user in empty_list %}
<p>{{ user }}</p>
{% empty %}
<p>현재 가입된 유저가 없습니다.</p>
{% endfor %}
<hr>
<hr>


<h3>2. 조건문</h3>
{% if '짜장면' in menus %}
<p>짜장면에는 고춧가루지!</p>
{% endif %}
<hr>

{% for menu in menus %}
{{ forloop.counter }} 번째 도는중
  {% if loop.first %}
  <p>짜장면 + 고춧가루</p>
  {% else %}
  <p>{{ menu }}</p>
  {% endif %}
{% endfor %}
<hr>
<hr>


<!-- <=, >=, ==, != >, <, in not in is 모두 사용 가능-->
<h3>3. length filter</h3>
{% for message in messages %}
 {% if message|length > 5 %}
 <p>{{ mesage }}, 글자가 너무 길어요.</p>
 {% else %}
 <p>{{ message }}, {{ message|length }}</p>
 {% endif %}
{% endfor %}
<hr>
<hr>


<!-- 이미 정의되어 있는 변수 호출은 % 태그로 감싸서 사용한다. -->
<h3>4. lorem ipsum</h3>
{% lorem %}
<hr>
{% lorem 3 w %}
<hr>
{% lorem 4 w random %}
<hr>
{% lorem 2 p %}
<hr>
<hr>


<h3>5. 글자수 제한</h3>
<p>{{ my_sentence|truncatewords:3 }}</p>
<p>{{ my_sentence|truncatechars:3 }}</p>
<hr>
<hr>

<h3>6. 글자 관련 필터</h3>
<p>{{ 'abc'|length }}</p>
<p>{{ 'ABC'|lower }}</p>
<p>{{ my_sentence|title }}</p>
<p>{{ 'abc def'|capfirst }}</p>
<p>{{ menus|random }}</p>
<hr>
<hr>

<h3>7. 연산</h3>
<!-- 연산은 이거 하나만 기억-->
<!-- 더 많은 연산 관련 기능은 django-mathfilters 라이브러리가 필요-->
<!-- 하지만 연산은 views에서 처리하고 넘기자 -->
<p>{{ 4|add:6 }}</p>
<hr>
<hr>

<h3>8. 날짜표현</h3>
<p>{{ datetimenow }}</p>
<!-- 아래 구문이 외장 라이브러리 없이 사용한 구문-->
<p>{% now "DATETIME_FORMAT" %}</p>
<p>{% now "SHORT_DATETIME_FORMAT" %}</p>
<p>{% now "DATE_FORMAT" %}</p>
<p>{% now "SHORT_DATE_FORMAT" %}</p>
<hr>
<!-- 날짜 표현 커스터마이징(공식문서를 보고 만들자) -->
{% now "Y년 m월 d일 (D) h:i" %}
<hr>
{% now "Y" as current_year %}
<!-- 이 아래 부터는 Y 대신에 current_year로 쓴다.-->
Copyright {{ current_year }}
<hr>
<!-- 굳이 필터를 걸어서 표현한다면 다음과 같이 쓴다. -->
{{ datetimenow|date:"SHORT_DATE_FORMAT" }}
<hr>
<hr>


<h3>9. 기타</h3>
<p>{{ 'google.com'|urlize }}</p>
```

<br>

>  [예제] 오늘 날짜 광복절인지 판단하기

> `views.py`

```python
from datetime import datetime

def isitgwangbok(request):
    today = datetime.now()
    if today.month == 8 and today.day == 15:
        result = True
    else:
        result = False
    context = {'result': result,}
    return render(request, 'isitgwangbok.html', context)
```

> `isitgwangbok.html`

```html
{% if result %}
<h1>오늘은 광복절입니다.</h1>
{% else %}
<h1>오늘은 광복절이 아닙니다.</h1>
{% endif %}
```

<br>

---

<br>

## 2. 8월16일(02일차)

### 2.1 GET 방식으로 요청 보내기(form 태그 활용)

> `views.py`

```python
def throw(request):
    return render(request, 'throw.html')


def catch(request):
    # pprint(request)
    # pprint(request.scheme)
    # pprint(request.path)
    # pprint(request.method)
    # pprint(request.GET) => 이게 중요한 것임! (QueryDict(딕셔너리 형태로 데이터를 넘긴다는 것이 중요한 것임)
    # pprint(request.META)
    message = request.GET.get('message')
    context = {'message': message,}
    return render(request, 'catch.html', context)
```

> `urls.py`

```python
    path('catch/', views.catch),
    path('throw/', views.throw),
```

> `catch.html`

```html
<!-- form 태그는 다른 페이지로 전달할 때 사용됨 -->
<!-- GET 방식은 action 주소 입력시 끝에 / 안붙여도 상관X(앞에 /는 필수) -->
<!-- POST 방식은 끝에 / 붙이는 것이 필수이므로 앞으로 그냥 끝에 다 붙이자 -->
<form action="/catch/" method="GET">
  <!-- 사용자로부터 데이터를 입력받기 위해 input 태그 사용 / key가 되는 name이 중요 -->
  <!-- id는 javascript에 연결할 때 사용됨 -->
  <label for="message">THROW</label>
  <input type="text" id="message" name="message">
  <input type="submit">
</form>
```

> `throw.html`

```html
<h1>catch 에서 보낸 {{ message }} 를 받았습니다.</h1>
```

:point_right: **[예제] ASCII Art**

- `pip install requests` 로 설치 후 `views.py`에 `import requests`를 선언해주고 시작하자

> `views.py`

```python
def art(request):
    return render(request, 'art.html')


def result(request):
    # 1. art 에서 form 으로 보낸 데이터를 받는다.
    word = request.GET.get('word')

    # 2. ARTII API 폰트 리스트로 요청을 보내 응답을 text 로 받는다.
    fonts = requests.get('http://artii.herokuapp.com/fonts_list').text

    # 3. str 을 list 로 바꾼다.
    fonts = fonts.split('\n')
    
    # 4. fonts list 안에 들어있는 요소 중 하나를 선택해서 변수에 저장
    font = random.choice(fonts)

    # 5. 위에서 만든 word 와 font 를 가지고 다시 요청을 만들어서 보내 응답결과를 받는다.
    response = requests.get(f'http://artii.herokuapp.com/make?text={word}&font={font}').text
        
    context = {'response': response,}
    return render(request, 'result.html', context)
```

> `urls.py`

```python
    path('result/', views.result),
    path('art/', views.art),
```

> `art.html`

```html
<form action="/result/" method="GET">
  <label for="word">영단어를 입력하세요.</label>
  <input type="text" id="word" name="word">
  <input type="submit" value="만들기!">
</form>
```

> `result.html`

```html
<h1>Welcome to ASCII ART ^__________^</h1>

<pre>{{ response }}</pre>
```

<br>

### 2.2 POST 방식으로 요청 보내기(form 태그 활용)

> `views.py`

```python
def user_new(request):
    return render(request, 'user_new.html')


def user_create(request):
    name = request.POST.get('name')
    pwd = request.POST.get('pwd')
    context = {'name': name, 'pwd': pwd,}
    return render(request, 'user_create.html', context)
```

> `urls.py`

```python
    path('user_create/', views.user_create),
    path('user_new/', views.user_new),
```

> `user_new.html`

```html
<form action="/user_create/" method="POST"> <!-- POST 방식은 마지막 / 작성 필수! -->
  <label for="name">아이디</label>
  <input type="text" id="name" name="name"><br>
  <label for="pwd">패스워드</label>
  <input type="password" id="pwd" name="pwd">
  <input type="submit" value="가입">
</form>
```

> `user_create.html`

```html
<p>아이디 : {{ name }}</p>
<p>패스워드 : {{ pwd }}</p>
```

:warning: **Django에서 CSRF Token의 POST 방식으로 전달하는 방법**

---

:heavy_check_mark: **CSRF 사이트간 요청 위조**

- 웹 어플리케이션 취약점 중 하나로 사용자가 자신의 의도와 무관하게 공격자가 의도한 행동을 해서 특정 웹 페이지의 보안을 무력화 시키거나, 수정, 삭제 등의 강제적인 작업을 하게하는 공격 방법
- Django는 최소한의 안전장치를 위해 자신이 부여한 랜덤 hash 값을 token으로 부여한다.
  - 이 token 값이 없는 요청은 잘못된 요청이라고 판단하여 접근을 거부한다.(403 Error)
- 추가내용 : XSS(사이트 간 스크립팅)와 CSRF(사이트 간 요청 위조)의 차이점(정보처리기사 실기에서도 도움되는 내용)
  - <a href="https://glasgowkiss.tistory.com/16">차이점 알아보기</a>

---

- `user_new.html` 에 `form` 태그 안에서 첫 번째 줄에 `{% csrf_token %}` 만 추가하면 된다.
- `user_new.html`을 브라우저에서 확인하면 input type이 `hidden`이 된다.

```html
<form action="/user_create/" method="POST"> <!-- POST 방식은 마지막 / 작성 필수! -->
  {% csrf_token %}
  <label for="name">아이디</label>
  <input type="text" id="name" name="name"><br>
  <label for="pwd">패스워드</label>
  <input type="password" id="pwd" name="pwd">
  <input type="submit" value="가입">
</form>
```

![csrf](https://user-images.githubusercontent.com/52685250/63140781-02339e80-c01e-11e9-91ec-9663af91a8a7.jpg)

(위와 같이 빨간색으로 표시한 `csrfmiddlewaretoken` 이 생성된 모습을 볼 수 있다.)

<br>

### 2.3 정적 파일(static file)

---

:heavy_check_mark: `정적 파일` 이란?

- image / css / js 파일과 같이 해당 내용이 고정되어 응답을 할 때 별도의 처리 없이 그대로 보여주면 되는 파일들

---

> `static_example.html`

![static01](https://user-images.githubusercontent.com/52685250/63144347-6f026500-c02d-11e9-90ab-5378363bce46.JPG)

- 파일 및 폴더 생성시 경로 주의해서 생성한다.
- html 파일에서 `{% load static %}` 먼저 반드시 선언한다.
- 이미지 및 css 파일 경로 지정시 `{% static '파일 경로명' %}`와 같이 선언한다.

<br>

### 2.4 URL 로직 분리

#### (1) APP 별로 `urls.py` 새로 작성하기

- `django_intro` 프로젝트에 있던 `urls.py`의 내용을 각 APP 별로 나눠서 새로 작성한다.
- 프로젝트에 있는 urlpatterns 중 admin을 제외하고 `pages` 폴더 바로 아래에  `urls.py`를 새로 만들어 복사하여 붙인다.(`utilities` 폴더도 마찬가지) => **<u>폴더 및 파일 경로 주의!</u>**
- 또한 프로젝트의 `urls.py`도 다음과 같이 몇 가지 구문을 추가하여 작성한다.

> 프로젝트의 `urls.py`

```python
from django.contrib import admin
from django.urls import path, include # include가 추가됨

urlpatterns = [
    path('pages/', include('pages.urls')),
    # 위 구문을 추가해야 http://~/pages/index와 같이 주소를 작성할 수 있다.
    path('utilities/', include('utilities.urls')),
    path('admin/', admin.site.urls),
]
# 앞으로 프로젝트의 url은 생성한 APP의 개수만큼만 작성한다.
```

> `pages` APP의 `urls.py`

```python
from django.urls import path
from . import views
# 위 두 구문을 반드시 작성해야 한다.

urlpatterns = [
    # app url 은 아래로 작성해 나간다.
    path('index/', views.index),
    path('introduce/<name>/<int:age>', views.introduce),
    path('dinner/', views.dinner),
    path('image/', views.image),
    path('hello/<str:name>/', views.hello),
    path('times/<int:num1>/<int:num2>/', views.times),
    path('area/<int:r>/', views.area),
    path('template_language/', views.template_language),
    path('isitgwangbok/', views.isitgwangbok),
    path('throw/', views.throw),
    path('catch/', views.catch),
    path('art/', views.art),
    path('result/', views.result),
    path('user_new/', views.user_new),
    path('user_create/', views.user_create),
    path('static_example/', views.static_example),
]
```

> `utilities` APP의 `urls.py`

```python
from django.urls import path
from . import views

urlpatterns = [
    path('index/', views.index),
]
```

- 이와 같이 작성하면 기존의 `http://~/dinner`였던 주소에서 `http://~/pages/dinner`로 바뀌게 된다.

- 참고로 pages의 templates에 작성했던 form 태그의 주소들 앞에 `pages/`를 추가로 붙여줘야 원래대로 올바르게 작성된다.(url 로직이 바뀌었기 때문)
  - 앞으로는 새로 프로젝트 시작할 때 이러한 모든 사항들을 고려하여 제대로 작성하므로 이 내용은 지금만 잠깐 보고 넘어가자

#### (2) Django namspace

![namaspace](https://user-images.githubusercontent.com/52685250/63146608-78dc9600-c036-11e9-9ed6-49cba233db6b.JPG)

- 하지만 `pages`, `utilities` 둘 다 `index.html`이 있어서 `http://~/pages/index`로 검색해도 `utilities`의 `index.html` 이 불러와진다.
  - `settings.py`의 `INSTALLED_APPS`의 등록 순서 때문이다.
- 한 곳에 모여진 `templates`, `static` 을 APP 별로 분리해줘야 한다.
  - 각 APP의 templates 폴더 안에 APP의 이름과 동일한 폴더를 하나 생성하고 그 안에 지금까지 만든 html 파일들을 옮겨준다.
  - 그리고 각 APP의 `views.py`의 return 구문의 페이지 주소 앞에 `APP의 이름/`을 추가해주면 된다.
  - static도 마찬가지로 `static_example.html`에서 파일 경로 앞에 `pages/`를 모두 붙여준다.
  - 앞으로는 이러한 번거로움 없이 애초에 프로젝트 시작할 때 올바른 방법으로 시작하니 지금 한 번만 보고 넘어가자

<br>

### 2.5 Template Inheritance(상속)

![0001](https://user-images.githubusercontent.com/52685250/63147381-f2758380-c038-11e9-9196-1eac9360bc9f.JPG)

- `django_intro` > `templates` > `base.html` 파일 생성 (html 파일명은 다른 이름도 가능)
- ` settings.py` 에서 `TEMPLATES`의 DIRS의 빈 리스트에 `os.path.join(BASE_DIR, 'django_intro', 'templates')`와 같이 경로를 추가해야 함
  - `00_django_intro` 폴더 자체가 `BASE_DIR`임

> `base.html`

```html
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <title>Document</title>
  {% block css %}
  {% endblock %}
</head>

<body>
  <h1 class="text-center">Template Inheritance</h1>
  <hr>
  <div class="container">
    {% block content %} <!-- 이 부분이 상속받는 부분 -->
    {% endblock %}
  </div>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
  </script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
  </script>
</body>

</html>
```

- 위와 같이 `base.html`을 만들고  각 APP의 templates 파일에 아래와 같은 구문을 추가해준다.

```html
{% extends 'base.html' %}
{% block content %}
{% endblock %}
```

> `index.html`

- **extends**는 무슨 경우가 됐건 **항상 최상위 위치(가장 맨 위)**에 있어야 한다.

```html
{% extends 'base.html' %} <!-- 이 페이지는 base.html을 상속받고 있다는 의미 -->

{% block content %}
  <h1>Hi django!!</h1>
{% endblock %}
```

> `static_example.html`

```html
{% extends 'base.html' %}
{% load static %}

{% block css %}
  <link rel="stylesheet" href="{% static 'pages/stylesheets/style.css' %}">
{% endblock %}

{% block content %}
  <h1>Static 파일 실습</h1>
  <img src="{% static 'pages/images/baseball.jpg' %}" alt="static_img"> 
{% endblock %}
```


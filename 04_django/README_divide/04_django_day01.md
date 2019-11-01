# :notebook_with_decorative_cover: 04_django - Day01

<br>

## 1. 8월14일(01일차)  <a href="https://tothefullest08.github.io/django/2019/02/11/django01/">:rocket:(Intro about Django)</a> ​

### 1.1 Django의 주요 특징 및 성격

- 주요 특징 : `Versatile` (다용도의), `Secure` (안전한), `Scalable` (확장성 있는) , `Complete` (완결성 있는), `Maintainable` (쉬운 유지보수), `Portable` (포터블한 - 다양한 운영체제에서 작동 가능)

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

- `의존성` 문제 : 본인의 컴퓨터에서 잘 작동하던 프로그램도 다른 프로그램에 설치 했을 때 잘 동작하리라는 보장이 없음.
  - Python도 같은 버전, 같은 모듈을 쓴다는 보장이 없다.

- 특정 프로그램만을 실행하기 위한 Python 환경을 따로 만들어서 그 환경속에서만 모듈을 관리하고 앱을 실행하기 위해 가상환경을 설정한다.
  - 다른 앱을 실행시키는 일이 생기면 그 가상환경을 빠져나와 다른 환경을 만드는 방식으로 진행한다.
- `python -m venv` (가상환경 경로 + 이름)
  - `python -m venv ssafy` : 특정경로 없이 현재 위치에서 ssafy라는 이름의 가상환경이 만들어짐
  - `python -m venv ~/documents/ssafy`

<br>

#### (2) 가상 환경 만들기

- [1st] `git bash` 명령어
  - <font color="red">`python -m venv venv`</font> (이 과정만 수행하고 바로 `[2nd]`로 넘어가자)
  - `source venv/Scripts/activate`
  - `pip list` : update 명령어 실행
  - 다시 `pip list` 누르고 버전 확인
  - `deactivate` 가상환경 종료
- :star: **[2nd] `vscode` 에서 할 일 (이 과정은 vscode 켤 때마다 항상 실행할 과정 / 반드시 차례대로 수행!)**
  - [Ctrl] + [Shift] + [P] 입력 후 <font color="red">`Python: Select Interpreter`</font> 선택
  - `venv` 적힌 Python 버전 선택
  - 기존에 켜져 있는 `vscode`의 터미널 강제 종료 후 다시 터미널 실행한다.
  - 새로 열린 터미널에서 `(venv)` 적힌거 확인하고  <font color="red">`pip list`</font>로 버전 및 가상환경 확인 (**<u>반드시 가상환경을 먼저 켜고(상위 세 과정) 터미널을 열자!</u>**)
  - update 명령어 나오면 항상 수행하자

>만약 [Ctrl] + [`] 단축키 안 될 때(Option)
>
>- 업데이트 확인
>- 최신 버전 확인 후 [F1] 누르고 'Perfernces : Open Settings (JSON)' 들어가서 맨 앞에 `"terminal.integrated.cwd": "${workspaceFolder}",` 추가
>- 저장 후 다시 [F1] 누르고 'Perfernces : Open Keyboard Shortcuts' 들어가서 'openInTerminal'에 있던 기존 단축키 삭제 후
>- integrate 검색 후 'Terminal: Create New Integrated Terminal (In Active Workspace)'의 단축키를 [Ctrl] + [`]로 다시 설정하면 됨.

- django 설치 및 버전 확인
  - <font color="red">`pip install django`</font> => `python -m django --version`

<br>

### 1.3 Django 프로젝트 시작하기

#### (1) django 프로젝트 생성

- **django 프로젝트 만들기**
  - <font color="red">`django-admin startproject 만들_프로젝트명 .`</font> (맨 마지막에 한 칸 띄고 온점 반드시 입력!)

- **서버 실행**(반드시 `manage.py` 파일이 있는 곳에서 실행)
  - <font color="red">`python manage.py runserver`</font>
  - 새로 생긴 주소 `http://127.0.0.1:8000/` 를 [Ctrl] 누르고 클릭 하면 서버 열림
  - 서버 종료 : 터미널에서 [Ctrl] + [C]

#### (2) 기본 생성된 Python 파일 설명

- `__init__.py` : Python의 파일들을 모듈화 시키는 파일(앞으로 수정, 열 일이 없음)
- `settings.py` : 웹 어플리케이션 위치, DB 세부설정 등과 같은 Django 프로젝트의 모든 환경이 저장된 곳(대부분 이 곳에서 작업할 예정)
- `urls.py` : 사이트의 url와 view 연결, 주소(URL) 관리
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

- <font color="red">`python manage.py startapp APP_이름`</font> : 통상적으로 APP_이름은 복수형으로 만드는것이 convention
  - ex) `python manage.py startapp pages` 와 같이 작성함

<br>

#### (2) 생성되는 기본 파일들

<img width="467" alt="mtv_process" src="https://user-images.githubusercontent.com/52685250/62988615-fca05200-be7f-11e9-984e-298e3d4dba0e.png">

- `admin.py` : 관리자형 페이지를 기본적으로 만들어 줌
- `apps.py` : APP과 관련된 기본 정보들
- `models.py` : model과 관련된 정보들, 데이터베이스 관리(추후 DB와 연관됨)
- `tests.py` : test code를 작성하는 곳
- `views.py` : MTV 중 V(중간 관리자) 역할을 하는 곳, 페이지 관리(페이지 하나 당, 하나의 함수)(여기서 기능별 함수들 같은 거 작성함)

<img width="753" alt="img_01-6dcda166-f486-488a-a11e-724dca5cbf5b" src="https://user-images.githubusercontent.com/52446416/63153229-c82bc200-c048-11e9-92b0-18352f088c56.png">

<br>

### 1.6 Django APP 초기 설정(`Settings.py`)

#### (1) APP 등록하기

:warning: **<u>반드시 APP 폴더를 먼저 생성하고 그 다음에 APP 초기 설정을 한다.</u>**

![setting](https://user-images.githubusercontent.com/52685250/62988721-4ee17300-be80-11e9-9ca8-98a5ed04010c.JPG)

- `settings.py` 에 <font color="red">`'pages.apps.PagesConfig',`</font>를 `INSTALLED_APPS` 안에 반드시 작성해주자.
  - <font color="blue">`pages`, `PagesConfig` 부분은 파일명에 따라 달라지므로</font> 프로젝트 및 APP 생성 후 폴더명을 따라서 작성하자
- app 등록 순서(django style guide에 따름)
  - local apps => Thrid party apps => 기본적으로 깔려있는 Django apps

<br>

#### (2) Internationalization(I18n) 과정 (한글화 설정)

![I18n](https://user-images.githubusercontent.com/52685250/62989012-5fdeb400-be81-11e9-81d9-44975fa166fb.JPG)

- 기본값이 `en-us`, `UTC`를 한국에 맞게 <font color="red">`LANGUAGE_CODE = 'ko-kr'`, `TIME_ZONE = 'Asia/Seoul'`</font>로 값을 바꿔줌(처음부터 `Asia/Seoul`로 기본값을 바꿀 수는 없다. 일단 처음은 `UTC`임)
  - <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">:watch:(국가별 TIME_ZONE 값 설정)</a>
- `USE_TZ = True` : 사용자의 국가에 맞게 그 국가에 맞는 시간을 자동으로 설정해 줌

<br>

### 1.7 기본적인 요청 & 응답 만들기(M을 제외한 T-V 동작)

:warning: **<u>차례대로 흐름을 반드시 익히자!!</u>**

![URL](https://user-images.githubusercontent.com/52685250/62990260-40965580-be86-11e9-8d45-a39fa83dfd06.JPG)

- **코드 작성 순서**
  - ① <font color="red">`views.py`</font> : 만들고자 하는 view 함수 작성
  - ② <font color="red">`urls.py`</font> : `views.py`에서 만든 함수에 주소를 연결(실제 동작은 이게 먼저임)
  - ③ <font color="red">`templates`</font> : 해당 view 함수가 호출될 때, 보여질 페이지

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






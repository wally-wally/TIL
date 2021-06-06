# [SSAFY]Django_#1(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]Django_#1`은 정규과정 `Django`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
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
  - `manage.py` : Django의 다양한 명령어를 실행하기 위한 파일(임의로 변경하지 않도록 주의하자!)
  - <font color="red">`python manage.py runserver`</font>
  - 새로 생긴 주소 `http://127.0.0.1:8000/` 를 [Ctrl] 누르고 클릭 하면 서버 열림
  - 서버 종료 : 터미널에서 [Ctrl] + [C]

#### (2) 기본 생성된 Python 파일 설명

- `__init__.py` : Python의 파일들을 모듈화 시키는 파일(앞으로 수정, 열 일이 없음)
- `settings.py` : 웹 어플리케이션 위치, DB 세부설정 등과 같은 Django 프로젝트의 모든 환경이 저장된 곳(대부분 이 곳에서 작업할 예정)
- `urls.py` : 사이트의 url와 view 연결, 주소(URL) 관리
- `wsgi.py` : Web Server Gateway Interface의 약자로, 예전에 사용했던 cgi 그리고 php의 fpm과 비슷한 게이트웨이 인터페이스이다. 나중에 AWS할 때 만질 예정(웹 서버 규칙이 정의된 곳)
- `asgi.py` : Django 3.x 버전에서 새롭게 등장한 파일로 django-channels를 사용할 때 알아야 하는 개념이다. Asynchronous Server Gateway Interface의 약자로 WSGI의 상위 호환으로 web server와 django를 연결해주는 Python의 표준 API이다.

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
- `views.py` : MTV 중 V(중간 관리자) 역할을 하는 곳, 페이지 고나리(페이지 하나 당, 하나의 함수)(여기서 기능별 함수들 같은 거 작성함)

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

- 기본값이 `en-us`, `UTC`를 한국에 맞게 <font color="red">`LANGUAGE_CODE = 'ko-kr'`(2.x 버전 한정), `TIME_ZONE = 'Asia/Seoul'`</font>로 값을 바꿔줌(처음부터 `Asia/Seoul`로 기본값을 바꿀 수는 없다. 일단 처음은 `UTC`임)
  - <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">:watch:(국가별 TIME_ZONE 값 설정)</a>
  - **[참고!] Django가 3.x 버전으로 업데이트된 후에는 한국의  `LANGUAGE_CODE `가 `ko`로 바뀌었다.**
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

- `user_new.html` 에 `form` 태그 안에서 첫 번째 줄에 <font color="red">`{% csrf_token %}`</font> 만 추가하면 된다.
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
- html 파일에서 <font color="red">`{% load static %}`</font> 먼저 반드시 선언한다.
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
- ` settings.py` 에서 `TEMPLATES`의 DIRS의 빈 리스트에 <font color="red">`os.path.join(BASE_DIR, 'django_intro', 'templates')`</font>와 같이 경로를 추가해야 함
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

- <font color="red">**extends**는 무슨 경우가 됐건 **항상 최상위 위치(가장 맨 위)**에 있어야 한다.</font>

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

<br>

------

<br>

## 3. 8월21일(03일차)

### 3.1 SQL 기본 용어 정리

<img src="https://user-images.githubusercontent.com/52685250/63411004-8aa3ac00-c42f-11e9-8ff1-cda68b0b3ac1.JPG" alt="SQL_Basic" width=600px height=350px>

| 용어             | 설명                                                         |
| ---------------- | ------------------------------------------------------------ |
| 스키마(scheme)   | 데이터베이스의 구조와 제약 조건(자료의 구조, 표현 방법, 관계)에 관련한 <br>전반적인 명세를 기술한 것 |
| 테이블(table)    | 열(컬럼/필드)과 행(레코드/값)의 모델을 사용해 조직된 데이터 요소들의 집합. <br>SQL 데이터베이스에서는 테이블을 관계 라고도 한다. |
| 열(Column), 필드 | 각 열에는 고유한 데이터 형식이 지정된다.<br>ex) INTEGER TEXT NULL 등 |
| 행(row), 레코드  | 테이블의 데이터는 행에 저장된다.<br>위와 같은 경우 4명의 고객정보가 저장되어 있으며, 행은 4개가 존재한다. |
| PK(기본키)       | 각 행(레코드)의 고유값으로 Primary Key로 불린다.<br>반드시 설정해여야하며, 데이터베이스 관리 및 관계 설정시 주요하게 활용된다. |

<br>

### 3.2 ORM(Object-Relational Mapping) 장점과 단점

<img src="https://user-images.githubusercontent.com/52685250/63411128-d6eeec00-c42f-11e9-8307-f6c6c099c9a0.JPG" alt="SQL_Basic" width=600px height=250px>

- 장점
  - SQL문을 아예 몰라도 DB사용 가능
  - SQL의 절차적인 접근이 아닌 객체 지향적 접근 간응
  - 매핑 정보가 명확하여 ERD를 보는 것에 대한 의존도를 낮출 수 있다.
  - ORM은 독립적으로 작성되어 있고 해당 객체들을 재활용할 수 있다. 개발자는 객체에 집중함으로써 해당 DB에 종속될 필요없이 자유롭게 개발할 수 있다.
- 단점
  - ORM 만으로 완전히 거대한 서비스를 구현하기가 어렵다.
    - 사용하기는 편하지만, 설계는 매우 신중하게 해야함.
    - 프로젝트의 규모가 커질 경우 난이도가 올라간다.
    - 순수 SQL보다 약간의 속도 저하가 생길 수 있다.
  - 이미 많은 프로세스가 많은 시스템에서는 ORM 으로 대체하기가 어렵다.
- 결론
  - **<font color="blue">생산성(productivity)</font>!!**
  - ORM 을 사용하여 얻게되는 생산성은 약간의 성능저하나 다른 단점들을 상쇄할 만큼 뛰어나기 때문.
  - 장점으로 인한 생산성 증가가 훨씬 크기 때문에 현대에는 대부분의 프레임워크들이 ORM 을 사용하고 있다.
  - 즉, 우리는 DB를 객체(Object) - 인스턴스(instance)로 조작하기 위해 ORM 을 배운다.

<br>

### 3.3 Model

#### (1) 모델의 개념

- 모델은 단일한 데이터에 대한 정보를 가지고 있다.
- 필수적인 필드(컬럼, 열)와 데이터(레코드, 행)에 대한 정보를 포함한다. 일반적으로 각각의 **모델(클래스)**는 단일한 데이터베이스 **테이블과 매핑(연결, 연동)**된다.
- 모델은 부가적인 메타데이터를 가진 **DB의 구조(layout)를 의미**
- 사용자가 저장하는 데이터들의 **필수적인 필드와 동작(behavior)을 포함**

```python
from django.db import models

# Create your models here.
class Article(models.Model): # models.Model 의 상속을 받는다.
    # id(프라이머리 키)는 기본적으로 처음 테이블 생성시 자동으로 만들어진다,.
    # id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=10) # 클래스 변수(DB 의 필드)
    # max_length=10이 동작
    content = models.TextField()  # 클래스 변수(DB 의 필드), 길이 제약X
    create_at = models.DateTimeField(auto_now_add=True) # 클래스 변수(DB 의 필드)
    updated_at = models.DateTimeField(auto_now=True)
```

#### (2) 필드 <a href="https://docs.djangoproject.com/en/2.2/ref/models/fields/">Model field reference</a>

- `CharField()`
  - 길이의 제한이 있는 문자열을 넣을 때 사용
  - `max_length`는 필수 인자다.
  - 필드의 최대 길이(문자)이며 DB 와 django 의 유효성검사(값을 검증)에서 사용됨.
  - 텍스트 양이 많을 경우 `TextField()`로 사용
- `TextField()`
  - 글의 수가 많을 때 사용
  - max_length 옵션을 줄 수 있지만 모델과 실제 DB에는 적용되지 않는다. 길이 제한을 주고 싶다면 `CharField()`를 사용해야 한다.
- `DateTimeField()`
  - 시간과 날짜를 기록하기 위한 필드
  - `auto_now_add=True`
    - django ORM 이 **최초 INSERT(테이블에 데이터 입력)시에만** 현재 날짜와 시간을 작성
    - **<u>최초 생성 일자</u>**
  - ` auto_now=True`
    - django ORM이 SAVE 를 할 때마다 현재 날짜와 시간 작성
    - **<u>최종 수정 일자</u>**

#### (3) Model 로직

- DB 칼럼과 어떠한 타입으로 정의할 것인지에 대해 `django.db` 모듈의 `models`의 상속을 받아서 적용된다.
- 각 모델은 **`django.db.models.Model` 클래스의 서브 클래스**로 표현된다.(자식 클래스)
- 모든 필드는 **기본적으로 NOT NULL 조건**이 붙는다.(NULL 값이 들어갈 수 없다.)
- 각각의 **클래스 변수**들은 **모델의 데이터베이스 필드**를 나타낸다.

#### (4) Migrations(`git clone` 후 migration 과정을 다시 해 줘야 함)

- `migrations`

  ```bash
  $ python manage.py makemigrations
  ```

  - makemigrations 명령어는 모델(model.py)을 작성 / 변경한 사항을 django에게 알리는 작업(ORM에 보낼 PYTHON 코드 설계도를 작성)

  - 테이블에 대한 설계도(django ORM 이 만들어줌)를 생성

- `migrate`
  - migrations 로 만든 설계도를 기반으로 실제 `db.sqlite3` DB에 반영한다.
  - **모델에서의 변경사항들과 DB 스키마가 동기화**를 이룬다.

- `python manage.py makemigrations` : migrations 생성(1)

- `python manage.py sqlmigrate articles 0001`(2)

  - ```sql
    CREATE TABLE "articles_article" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "title" varchar(10) NOT NULL, "content" text NOT NULL, "creative_time" datetime NOT NULL);
    COMMIT;
    ```

- `python manage.py migrate` : sqlite 실행 후 입력(4)

> 추가사항
>
> ```bash
> $ python manage.py sqlmigrate app_name 0001
> ```
>
> - 해당 migrations 설계도가 SQL 문으로 어떻게 해석되어서 동작할지 미리 볼 수 있다.
>
> ```bash
> $ python manage.py showmigrations
> ```
>
> - migrations 설계도가 migrate 됐는지 안 됐는지 확인(3)(6)
>
> ```bash
> $ sqlite3 db.sqlite3
> ```
>
> - sqlite3로 켜기(5)

#### (5) Model 변경 시 작성 순서(아주 중요!)

① <font color="red">`models.py`</font> : 작성 및 변경(생성 / 수정)

② <font color="red">`makemigrations`</font> : migrations 파일 만들기(DB에 들어가기 위한 설계도 만들기)

③ <font color="red">`migrate`</font> : 실제 DB에 적용 및 동기화(테이블 생성)

:warning: **참고 주의사항**

- 테이블의 이름은 app 이름과 model에 작성한 class 이름이 조합되어져서 자동으로 만들어진다.(**모두 소문자**로 작성됨)
- 모델의 클래스변수들은 반드시 **소문자**로 작성한다.
- 만약 `models.py`를 잘못써서 다시 만들어야 할 때
  - `migrations` 폴더 내에 숫자로 된 설계도 다 지우고, `db.sqlite3` 도 지우고 초기 상태에서 다시 `models.py`를 만들면 된다.
  - 숫자로 된 설계도는 우리가 임의로 절대로 수정하지 말자!!

---

:heavy_check_mark:  **`vsocde` 에서`sqlite3` 실행하기**

1. C 드라이브에 sqlite3 폴더 추가
2. 환경 변수 편집 - 시스템 변수의 `path`에 새로 만들기로 `C:\sqlite3` 추가
3. 파일 5개를 폴더 내에 넣기
4. `code ~/.bashrc` 로 bashrc 켜서 `alias sqlite3="winpty sqlite3"` 추가
5. `source ~/.bashrc`로 적용 후 sqlite3로만 입력하면 켜짐(`.exit`는 sqlite3 종료 명령어)
6. 열려있는 vscode 닫은 후 다시 실행후 `sqlite3 db.sqlite3` 실행하면 됨
7. `.tables` : 저장된 테이블 확인 / `.schema articles_article` : SQL 구문 확인

---

<br>

### 3.4 <font color="red">C</font><font color="orange">R</font><font color="green">U</font><font color="blue">D</font> (DB API 조작)

#### (1) Django Shell

- django 프로젝트 설정이 로딩된 파이썬 shell
  - 일반 파이썬 shell 로는 django 환경에 접근 불가
  - 즉, django 프로젝트 환경에서 파이썬 shell을 활용한다고 생각

---

- `pip install ipython` 설치 후 `python manage.py shell` 실행
- `from articles.models import Article`로 먼저 import를 해주고 시작하자.

- `Article.objects.all()` = `SELECT * FROM articles_article;`
  - 테이블 내용을 전부 조회(READ)
  - DB에 쿼리를 날려서 인스턴스 객체 전부를 달라고 하는 뜻
  - 만약에 레코드가 하나라면, 인스턴스 단일 객체로 반환
  - 두 개 이상의 레코드라면, QuerySet 형태로 반환
  - `.all()`은 다중이라고 가정하고 조회하므로 아무 것도 없어도 `<QuerySet []>`으로 출력됨

---

#### (2) <a href="https://docs.djangoproject.com/ko/2.2/ref/models/querysets/#queryset-api-reference">QuerySet</a> 기본 개념

- 전달 받은 객체의 목록
  - QuerySet : 쿼리 set 객체
  - Query : 단일 객체
- DB 로부터 데이터를 읽고, 필터를 걸거나 정렬 등을 수행

- Query 를 던지는 Language (django ORM)를 활용해서 DB 에게 데이터에 대한 조작을 요구한다.

---

`QuerySet`

- objects 사용하여 **다수의 데이터를 가져오는 함수를 사용할 때 반환되는 객체**
- 단일한 객체를 반환(return)할 때는 테이블(class) 의 인스턴스로 리턴 됨

`objects`

- Model Manager 와 Django Model 사이의 Query 연산의 인터페이스 역할을 해주는 친구
- 즉, `models.py`에 설정한 클래스(테이블)을 불러와서 사용할 때 DB 와의 인터페이스 역할(쿼리를 날려주는) 하는 매니저이다.
- 쉽게 이해하려면 ORM 의 역할이라고 생각하면 된다.
  - [DB] -------------- [objects] -------------- [Python Class(models.py)]

- Manager(objects) 를 통해 특정 **데이터를 조작(메서드)**할 수 있다.
  - `Article.objects.all()` 에서 `.all()`이 메서드이다.

---

#### (3) <font color="red">C</font>REATE : 데이터 객체를 만드는(생성) 3가지 방법

##### 	a) 첫 번째 방법 - 특정 테이블에 새로운 레코드(행)을 추가하여 데이터 추가

```bash
$ python manage.py shell
```

```python
# SQL 구문으로 쓴다면 이런 식으로...
# INSERT INTO table (column1, column2, ...) VALUES (value1, value2, ...)
# INSERT INTO articles_article (title, content) VALUES ('first', 'django!')

# ORM 방식으로 쓴다면 이런 식으로...
>>> article = Article() # Article class 로부터 article 인스턴스 생성
>>> article.title = 'first' # 인스턴스 변수(title)에 값을 할당
>>> article.content = 'django!' # 인스턴스 변수(content)에 값을 할당

# save 를 하지 않으면 아직 DB에 값일 저장되지 않음
>>> article # 이 상태에서는 아직 아무것도 없다. <Article: Article object (None)>
>>> Article.oject.all() # <QuerySet []> 아직 DB에 저장이 안 되어 있으므로 이렇게 뜬다.

# save 를 하고 확인해보면 저장된 것을 확인할 수 있다.
>>> article.save() # 이 코드를 입력해야 저장된다.(클래스의 메소드를 호출하는 과정)
>>> article # <Article: Article object (1)>
>>> Article.object.all() # <QuerySet [<Article: Article object (1)>]>가 출력됨

# 인스턴스 article 을 활용하여 변수에 접근할 수 있다.(저장된 값 확인)
>>> article.title # 저장된 title의 값('first')이 출력됨
>>> article.content # 저장된 content 값('django!')이 출력됨
>>> article.create_at # datetime.datetime(2019, 8, 21, 2, 44, 1, 144082, tzinfo=<UTC>)이 출력됨 / 이 때 시간의 tzinfo는 UTC로 설정되어 있어야 한다.
```

##### 	b) 두 번째 방법 - 함수에서 키워드 인자 넘기는 방법

```python
>>> article = Article(title='second', content='django!!')
>>> article
<Article: Article object (None)>
>>> article.save()
>>> article
<Article: Article object (2)>
>>> Article.objects.all()
<QuerySet [<Article: Article object (1)>, <Article: Article object (2)>]>
>>> article.title
'second'
```

##### 	c) 세 번째 방법 - 한 번에 쿼리 생성까지 이루어짐

- `create()`를 사용하면 쿼리셋 객체를 생성하고 저장하는 로직이 한번의 스텝으로 끝난다.
- 바로 저장하므로 유효성 검사를 할 틈이 없어서 사용하지 않는 방법이다.
- 그래서 첫 번째 혹은 두 번째 방법을 사용한다.

```python
>>> Article.objects.create(title='third', content='django!!!')
<Article: Article object (3)>
    
>>> Article.objects.all()
<QuerySet [<Article: Article object (1)>, <Article: Article object (2)>, <Article: Article object (3)>]>

>>> test = Article.objects.all()
>>> test
<QuerySet [<Article: Article object (1)>, <Article: Article object (2)>, <Article: Article object (3)>]>
```

```python
>>> article = Article()
>>> article.title = 'fourth'
>>> article.content = 'django!!!!'
>>> article.save()
>>> article.id
4
>>> article.pk
4
```

> **유효성 검사**
>
> - save 전에 `full_clean()` 메서드를 통해 article 이라는 인스턴스 객체가 검증(validation)에 적합한지를 알아 볼 수 있다.
> - `models.py` 에 필드 속성과 옵션에 따라 검증을 진행한다. (ex. max_length = 10 ...)
>
> ```python
> >>> article = Article()
> 
> >>> article.title = 'Life is short, you need python'
> 
> >>> article.full_clean()
> ---------------------------------------------------------------------------
> ValidationError                           Traceback (most recent call last)
> <ipython-input-30-ae01d73cadbe> in <module>
> ----> 1 article.full_clean()
> 
> ~\Desktop\TIL\04_django\01_django_orm_crud\venv\lib\site-packages\django\db\models\base.py in full_clean(self, exclude, validate_unique)
>    1201
>    1202         if errors:
> -> 1203             raise ValidationError(errors)
>    1204
>    1205     def clean_fields(self, exclude=None):
> 
> ValidationError: {'title': ['이 값이 최대 10 개의 글자인지 확인하세요(입력값 30 자).'], 'content': ['이 필드는 빈 칸으로 둘 수 없습니다.']}
> ```

#### (4) <font color="orange">R</font>EAD

```python
# 1. SELECT * FROM articles_article;
# 1. DB에 있는 모든 글 가져오기
>>> Article.objects.all()

# 2. SELECT * FROM articles_article WHERE title='first';
# 2. DB 에 저장된 글 중에서 title이 first인 글만 가져오기
>>> Article.objects.filter(title='first')

# 3. SELECT * FROM articles_article WHERE title='first' LIMIT 1;
# 3. DB 에 저장된 글 중에서 title이 first 인 글 중에서 첫번째 글만 가져오기
>>> Article.objects.all().first()
>>> Article.objects.all().last() # 마지막 값

# 4-1. SELECT * FROM articles_article WHERE id=1;
# 4-1. DB에 저장된 글 중에서 PK 가 1인 글만 가져오기
>>> Article.objects.get(pk=1)

# PK 만 .get() 으로 가져올 수 있다. (.get() 은 값이 중복이거나 일치하는 값이 없으면 에러를 발생시킨다.) 즉, pk 에만 사용하자.

# 4-2. filter의 경우 존재하지 않으면 에러가 아닌 빈 쿼리셋을 반환한다. 마치 딕셔너리에서 value 를 꺼낼 때 [] 방식으로 꺼내냐 혹은 .get 으로 꺼내냐 하는 차이와 유사
>>> Article.objects.filter(pk=100)
<QuerySet []>

# 4-3. filter / get
# filter 자체가 여러 값을 가져올 수 있기 때문에 django가 개수를 보장하지 못한다. 그래서 0개, 1개라도 무조건 쿼리셋으로 반환한다.

# 5-1. 오름차순
# SELECT * FROM articles_article ORDER BY title ASC;
>>> Article.objects.order_by('pk')

# 5-2. 내림차순
# SELECT * FROM articles_article ORDER BY title DESC;
>>> Article.objects.order_by('-pk')

# 6. 쿼리셋은 리스트 자료형은 아니지만, 리스트에서 할 수 있는 인덱스 접근 및 슬라이싱이 모두 가능하다.
>>> Article.objects.all()[2]
>>> Article.objects.all()[1:3]

# 7. LIKE / startswith / endswith
# django ORM 은 이름(title)과 필터(contains)를 더블언더스코어(__)로 구분한다.
# 더블언더스코어 == 던더(dunder)스코어

# LIKE
>>> Article.objects.filter(title__contains='fir')

# startswith
>>> Article.objects.filter(title__startswith='fir')

# endswith
>>> Article.objects.filter(title__endswith='!')
```

기존에 켜져 있던 shell을 `exit` 명령어로 종료후 다시 shell을 켠다.

```bash
$ python manage.py shell
```

```python
>>> from articles.models import Article

>>> Article.objects.all()
<QuerySet [<Article: 1번글 - first : django!>, <Article: 2번글 - second : django!!>, <Article: 3번글 - third : django!!!>, <Article: 4번글 - fourth : django!!!!>]>

>>> Article.objects.create(title='fifth', content='django!!!!!')
<Article: 5번글 - fifth : django!!!!!>
        
>>> articles = Article.objects.filter(title='first')
>>> articles
<QuerySet [<Article: 1번글 - first : django!>]>

>>> type(articles)
django.db.models.query.QuerySet
```

```python
>>> Article.objects.create(title='first', content='django!!!!!!')
<Article: 6번글 - first : django!!!!!!>
        
>>> Article.objects.filter(title='first')
<QuerySet [<Article: 1번글 - first : django!>, <Article: 6번글 - first : django!!!!!!>]>

>>> Article.objects.filter(title='first').first()
<Article: 1번글 - first : django!>
        
>>> Article.objects.filter(title='first').last()
<Article: 6번글 - first : django!!!!!!>
```

```python
>>> article = Article.objects.get(pk=1)
>>> article
<Article: 1번글 - first : django!>
        
>>> type(article)
articles.models.Article

>>> Article.objects.get(pk=10) # pk가 잘못된 경우
---------------------------------------------------------------------------
DoesNotExist                              Traceback (most recent call last)
<ipython-input-15-0dfc467affe8> in <module>
----> 1 Article.objects.get(pk=10)

~\Desktop\TIL\04_django\01_django_orm_crud\venv\lib\site-packages\django\db\models\manager.py in manager_method(self, *args, **kwargs)
     80         def create_method(name, method):
     81             def manager_method(self, *args, **kwargs):
---> 82                 return getattr(self.get_queryset(), name)(*args, **kwargs)
     83             manager_method.__name__ = method.__name__
     84             manager_method.__doc__ = method.__doc__

~\Desktop\TIL\04_django\01_django_orm_crud\venv\lib\site-packages\django\db\models\query.py in
get(self, *args, **kwargs)
    406             raise self.model.DoesNotExist(
    407                 "%s matching query does not exist." %
--> 408                 self.model._meta.object_name
    409             )
    410         raise self.model.MultipleObjectsReturned(

DoesNotExist: Article matching query does not exist.
        
>>> Article.objects.get(title='first') 
---------------------------------------------------------------------------
MultipleObjectsReturned                   Traceback (most recent call last)
<ipython-input-16-d1fbb51d7cde> in <module>
----> 1 Article.objects.get(title='first')

~\Desktop\TIL\04_django\01_django_orm_crud\venv\lib\site-packages\django\db\models\manager.py in manager_method(self, *args, **kwargs)
     80         def create_method(name, method):
     81             def manager_method(self, *args, **kwargs):
---> 82                 return getattr(self.get_queryset(), name)(*args, **kwargs)
     83             manager_method.__name__ = method.__name__
     84             manager_method.__doc__ = method.__doc__

~\Desktop\TIL\04_django\01_django_orm_crud\venv\lib\site-packages\django\db\models\query.py in
get(self, *args, **kwargs)
    410         raise self.model.MultipleObjectsReturned(
    411             "get() returned more than one %s -- it returned %s!" %
--> 412             (self.model._meta.object_name, num)
    413         )
    414

MultipleObjectsReturned: get() returned more than one Article -- it returned 2
        
>>> Article.objects.filter(pk=10) # filter는 get과 달리 오류를 출력하지 않는다.
<QuerySet []>
        
>>> article = Article.objects.get(pk=1)
        
>>> article.pk
1

>>> article.content
'django!''
```

> 역순 출력

```python
>>> Article.objects.order_by('-pk')
<QuerySet [<Article: 6번글 - first : django!!!!!!>, <Article: 5번글 - fifth : django!!!!!>, <Article: 4번글 - fourth : django!!!!>, <Article: 3번글 - third : django!!!>, <Article: 2번글 - second : django!!>, <Article: 1번글 - first : django!>]>
```

> 필요한 데이터만 출력

```python
>>> articles = Article.objects.all()[1:3]
>>> articles
<QuerySet [<Article: 2번글 - second : django!!>, <Article: 3번글 - third : django!!!>]>

>>> articles = Article.objects.all()[4]
>>> articles
<Article: 5번글 - fifth : django!!!!!>

>>> articles = Article.objects.filter(title__contains='fir')
>>> articles
<QuerySet [<Article: 1번글 - first : django!>, <Article: 6번글 - first : django!!!!!!>]>

>>> articles = Article.objects.filter(title__startswith='fir')
>>> articles
<QuerySet [<Article: 1번글 - first : django!>, <Article: 6번글 - first : django!!!!!!>]>

>>> articles = Article.objects.filter(content__endswith='!')
>>> articles
<QuerySet [<Article: 1번글 - first : django!>, <Article: 2번글 - second : django!!>, <Article: 3번글 - third : django!!!>, <Article: 4번글 - fourth : django!!!!>, <Article: 5번글 -
fifth : django!!!!!>, <Article: 6번글 - first : django!!!!!!>]>
```

#### (5) <font color="green">U</font>PDATE

```python
# article 인스턴스 객체의 인스턴스 변수에 들어있는 기존 값을 변경하고 저장
>>> article = Article.objects.get(pk=1)

>>> article.title = 'byebye'

>>> article.save()
```

#### (6) <font color="blue">D</font>ELETE

```python
# article 인스턴스 객체를 생성후 .delete() 메서도를 호출
>>> article = Article.objects.get(pk=1)

>>> article.delete()
```

```python
>>> article = Article.objects.get(pk=1)

>>> article.delete()
(1, {'articles.Article': 1})

>>> Article.objects.get(pk=1)
---------------------------------------------------------------------------
DoesNotExist                              Traceback (most recent call last)
<ipython-input-43-00adbda49bfd> in <module>
----> 1 Article.objects.get(pk=1)

~\Desktop\TIL\04_django\01_django_orm_crud\venv\lib\site-packages\django\db\models\manager.py in manager_method(self, *args, **kwargs)
     80         def create_method(name, method):
     81             def manager_method(self, *args, **kwargs):
---> 82                 return getattr(self.get_queryset(), name)(*args, **kwargs)
     83             manager_method.__name__ = method.__name__
     84             manager_method.__doc__ = method.__doc__

~\Desktop\TIL\04_django\01_django_orm_crud\venv\lib\site-packages\django\db\models\query.py in
get(self, *args, **kwargs)
    406             raise self.model.DoesNotExist(
    407                 "%s matching query does not exist." %
--> 408                 self.model._meta.object_name
    409             )
    410         raise self.model.MultipleObjectsReturned(

DoesNotExist: Article matching query does not exist.
```

![db](https://user-images.githubusercontent.com/52685250/63408723-a6588380-c42a-11e9-8eae-30eded70187c.JPG)

:point_right: 이 상태에서 새로운 데이터를 넣으면 1번을 다시 채우지 않고 뒷 번호 이어서 7번부터 들어간다.(컴퓨터 내부적으로 1번은 이유가 있어서 삭제된 것이라고 생각하기 때문에 1번은 무시하고 다음 번호로 저장된다.)

---

- 핵심은 우리는 ORM을 통해 클래스의 인스턴스 객체로 DB를 조작할 수 있다는 것!
- 앞으로 CRUD 로직을 직접 작성하면서 위에서 배운 코드들을 다시 활용하게 될 것이다.

---

<br>

### 3.5 ADMIN

#### (1) ADMIN이란?

- 사용자가 아닌 서버의 관리자가 활용하기 위한 페이지.
- `models.py`에 작성한 클래스를 `admin.py`에 등록하고 관리.
- record 생성 여부 확인에 매우 유용하고 직접 레코드를 작성할 수도 있다.
- CRUD 로직을 모두 관리자 페이지에서 사용할 수 있다.
- <font color="red">`python manage.py createsuperuser`</font> : 관리자 계정 등록할 수 있음

> `admin.py`

```python
from django.contrib import admin
from .models import Article # 명시적 상대 경로 표현

# Register your models here.
class ArticleAdmin(admin.ModelAdmin):
    # 튜플이나 리스트로 작성한다.
    list_display = ('pk', 'title', 'content', 'create_at', 'updated_at',) # 이게 가장 중요
    list_filter = ('create_at',) # 원소가 하나인 튜플 생성시 마지막에 ,(콤마) 반드시 찍어준다.
    list_display_links = ('content',)
    list_editable = ('title',)
    list_per_page = 2 # 이건 안 넣으면 기본값 = 100

admin.site.register(Article, ArticleAdmin)
```

#### (2) 관리자 변경 목록(change list) <a href="https://docs.djangoproject.com/ko/2.2/ref/contrib/admin/">커스터마이징</a>

① <font color="red">**`list_display`(가장 중요!)**</font>

- admin 페이지에서 우리가 `models.py` 에 정의한 각각의 속성(컬럼)들의 값(레코드)을 보여준다.

② `list_filter`

- 특정 필드에 의해 변경목록을 필터링 할 수 있게 해주는 Filter 사이드바를 추가한다.
- 표시되는 필터의 유형은 필드의 유형에 따라 다르다.

③ `list_display_links`

- 목록 내에서 링크로 지정할 필드 적용(설정하지 않으면 기본값을 첫 번째 필드에 링크가 적용)

④ `list_editable`

- 목록 상에서 직접 수정할 필드 적용

⑤ `list_per_page`

- 한 페이지에 표시되는 항목 수를 제어 (기본 값 : 100)

<br>

### 3.6 <a href="https://django-extensions.readthedocs.io/en/latest/index.html">Django Extensions</a>

- Django-extension 은 커스텀 확장 tool 이다.
- Django app 구조로 되어 있기 때문에 프로젝트에서 사용하기 위해서는 app 등록 과정을 거쳐야 한다.

#### (1) <a href="https://django-extensions.readthedocs.io/en/latest/shell_plus.html#interactive-python-shells">Shell_plus</a>

- `python manage.py shell_plus`
- 저장되어 있는 파일들에 대하여 전부 다 import 해준다.

<br>

------

<br>

## 4. 8월22일(04일차)

### 4.1 CRUD 실전

:warning:**​ C => R => D => U 순으로 작성하자!**

#### (1) CREATE

- 글을 쓰는 view(new), 작성된 글을 받아서 DB에 저장하는 역할을 하는 view(create)가 필요하다.

> `views.py`

```python
def new(request):
    return render(request, 'articles/new.html')


def create(request):
    # embed() # 서버 잠깐 일시정지
    title = request.POST.get('title')
    content = request.POST.get('content')

    # # 1
    # article = Article()
    # article.title = title
    # article.content = content
    # article.save()

    # 2
    article = Article(title=title, content=content)
    article.save()

    # # 3
    # Article.objects.create(title=title, content=content)
    return redirect('/articles/') # 메인 페이지
    # POST방식은 render 대신에 redirect를 사용한다.
```

> `new.html`

```django
{% extends 'base.html' %}
{% block content %}
  <h1 class="text-center">NEW</h1>
  <form action="/articles/create/" method="POST">
    {% csrf_token %}
    <label for="title">TITLE</label>
    <input type="text" name="title" id="title"><br>
    <label for="content">CONTENT</label>
    <textarea name="content" id="content" cols="30" rows="5"></textarea><br>
    <input type="submit" value="submit">
  </form>
{% endblock  %}
```

> `index.html`

```django
{% extends 'base.html' %}

{% block content %}
  <h1 class="text-center">Articles</h1>
  <a href="/articles/new/">[NEW]</a>
  <hr>
  {% comment %} {{ articles }} {% endcomment %}
  {% for article in articles %}
    <p>글 번호: {{ article.pk }}</p>
    <p>글 제목: {{ article.title }}</p>
    <p>글 내용: {{ article.content }}</p>
    <hr>
  {% endfor %}
{% endblock  %}
```

<br>

#### (2) READ

- 글이 보이지 않는 이유는 페이지 자체는 index 가 맞지만 url은 아직 create에 머물러있다. 왜냐하면 페이지는 전환됐지만 url 은 돌아가지 못했기 때문이다.

---

:heavy_check_mark: **GET -> POST(글을 작성할 때 GET이 아닌 POST 를 쓰는 3가지 이유)**

- 사용자는 django에서 **HTML 파일을 줘!(GET)** 가 아니라 **~한 레코드(글)을 생성해줘!(POST)** 이기 때문에 GET 보다는 POST 요청이 더 알맞다.
- 데이터는 URL 에 노출되면 안 된다. (우리가 URL에 접근하느 방식은 모두 GET).
  - query의 형태를 통해 DB schema 를 유추할 수 있게 되고 이는 보안의 측면에서 매우 취약하게 된다.
- 모델(DB) 를 조작하는 친구는 GET이 아닌 POST 요청!
  - DB를 수정하는 건 매우 중요한 일이고 그에 따른 **최소한의 신원 확인**이 필요하기 때문
  - GET 으로 동작하게 된다면 악성사용자가 URL 만으로 글을 작성, 수정, 삭제 할 수 있게 된다.

---

:heavy_check_mark: **Redirect**

- POST 요청은 HTML 문서를 render 하는게 아니라 `~~좀 처리 해줘(요청)`의 의미 이기 때문에 요청을 처리하고 나서의 결과를 보기위한 페이지로 넘겨줘야 한다.

---

:heavy_check_mark: **POST 요청으로 변경 후 변화하는 것**

- form 을 통해 전송한 데이터를 받을때도 `request.POST` 로 받아야 한다.
- 글이 작성되면 실제로 URL 에 데이터가 나타나지 않게 된다.
- html 문서를 요청하는게 아니기 때문에 html 문서를 받아볼 수 있는 다른 페이지로 redirect 하게 된다.

---

<br>

:checkered_flag: **상세정보 페이지 만들기**

> `views.py`의 `detail` 함수

```python
def detail(request, pk):
    article = Article.objects.get(pk=pk)
    context = {'article': article,}
    return render(request, 'articles/detail.html', context)
```

> [심화] `views.py`의 `create` 함수(try-except로 유효성 검증하는 구문 추가) <a href="https://docs.djangoproject.com/en/2.2/ref/models/instances/#validating-objects">유효성 검증 공식 문서</a>
>
> `from django.core.exceptions import ValidationError` 구문 추가
>
> - 이렇게 작성해야 제목이 20자 이상이거나 내용이 빈 칸일 때  오류발생하여 오류성을 검증하게 해준다.
> - 빈 칸(blank)은 `blank=False`가 default임. / `blank=True`로 하면 빈 칸도 허용하여 저장하게 됨.

```python
def create(request):
    try:
        title = request.POST.get('title')
        content = request.POST.get('content')
        article = Article(title=title, content=content)
        article.full_clean()
    except ValidationError:
        raise ValidationError('Error')
    else:
        article.save()
        return redirect(f'/articles/{article.pk}/')
```

> `urls.py`에 `path('<int:pk>/', views.detail),` 추가

> `detail.html`

```django
{% extends 'base.html' %}
{% block content %}
  <h1 class="text-center">DETAIL</h1>
  <h2>{{ article.pk }} 번째 글</h2>
  <hr>
  <p>제목: {{ article.title }}</p>
  <p>내용: {{ article.content }}</p>
  <p>작성 시각: {{ article.created_at }}</p>
  <p>수정 시각: {{ article.updated_at }}</p>
  <hr>
  <a href="/articles/">[back]</a> <!-- 뒤로 가기 버튼-->
{% endblock  %}
```

> `index.html`

```django
{% extends 'base.html' %}

{% block content %}
  <h1 class="text-center">Articles</h1>
  <a href="/articles/new/">[NEW]</a>
  <hr>
  {% comment %} {{ articles }} {% endcomment %}
  {% for article in articles %}
    <p>글 번호: {{ article.pk }}</p>
    <p>글 제목: {{ article.title }}</p>
    <p>글 내용: {{ article.content }}</p>
    <a href="/articles/{{ article.pk }}/">[DETAIL]</a>
    <hr>
  {% endfor %}
{% endblock  %}
```

<br>

#### (3) DELETE

> `views.py`

```python
def delete(request, pk):
    article = Article.objects.get(pk=pk)
    article.delete()
    return redirect('/articles/') # DB를 건드렸기 때문에 페이지 반환인 render보다 redirect가 더 적절하다.
```

> `urls.py`

```python
path('<int:pk>/delete/', views.delete),
```

> `detail.html`

```django
{% extends 'base.html' %}
{% block content %}
  <h1 class="text-center">DETAIL</h1>
  <h2>{{ article.pk }} 번째 글</h2>
  <hr>
  <p>제목: {{ article.title }}</p>
  <p>내용: {{ article.content }}</p>
  <p>작성 시각: {{ article.created_at }}</p>
  <p>수정 시각: {{ article.updated_at }}</p>
  <hr>
  <a href="/articles/{{ article.pk }}/delete/">[DELETE]</a>
  <!-- 지금은 GET 방식이므로 인터넷 주소창에 DELETE관련 주소를 직접 입력하면 지울 수 있다.-->
  <a href="/articles/">[back]</a> <!-- 뒤로 가기 버튼-->
{% endblock  %}
```

<br>

#### (4) UPDATE

- <u>수정하는 페이지 view</u>(edit), <u>직접 모델에 수정 요청을 보내는 view</u>(update) => 총 2개의 view가 필요함.

> `views.py`

```python
def edit(request, pk):
    article = Article.objects.get(pk=pk)
    context = {'article': article,}
    return render(request, 'articles/edit.html', context)


def update(request, pk):
    article = Article.objects.get(pk=pk)
    article.title = request.POST.get('title')
    article.content = request.POST.get('content')
    article.save()
    return redirect(f'/articles/{article.pk}/')
```

> `urls.py`

```python
path('<int:pk>/edit/', views.edit),
path('<int:pk>/update/', views.update),
```

> `edit.html`

```django
{% extends 'base.html' %}
{% block content %}
  <h1 class="text-center">EDIT</h1>
  <form action="/articles/{{ article.pk }}/update/" method="POST">
    {% csrf_token %}
    <label for="title">TITLE</label>
    <input type="text" name="title" id="title" value="{{ article.title }}"><br> <!-- 사용자 적인 측면에서 기능 추가한 것임 -->
    <label for="content">CONTENT</label>
    <textarea name="content" id="content" cols="30" rows="5">{{ article.content }}</textarea><br> <!-- textarea는 value 속성이 없으므로 태그 안에 작성 / 사용자 적인 측면에서 기능 추가한 것임-->
    <input type="submit" value="submit">
  </form>
  <a href="/articles/{{ article.pk }}/">[BACK]</a>
{% endblock  %}
```

> `detail.html`

```django
{% extends 'base.html' %}
{% block content %}
  <h1 class="text-center">EDIT</h1>
  <form action="/articles/{{ article.pk }}/update/" method="POST">
    {% csrf_token %}
    <label for="title">TITLE</label>
    <input type="text" name="title" id="title" value="{{ article.title }}"><br> <!-- 사용자 적인 측면에서 기능 추가한 것임 -->
    <label for="content">CONTENT</label>
    <textarea name="content" id="content" cols="30" rows="5">{{ article.content }}</textarea><br> <!-- textarea는 value 속성이 없으므로 태그 안에 작성 / 사용자 적인 측면에서 기능 추가한 것임-->
    <input type="submit" value="submit">
  </form>
  <a href="/articles/{{ article.pk }}/">[BACK]</a>
{% endblock  %}
```


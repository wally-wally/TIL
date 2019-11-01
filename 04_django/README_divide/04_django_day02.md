# :notebook_with_decorative_cover: 04_django - Day02

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

- <b>extends</b>는 무슨 경우가 됐건 <b>항상 최상위 위치(가장 맨 위)</b>에 있어야 한다.

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






### 1. Internationalization(I18n) (한글화 설정)

> `settings.py`
>
> ```python
> LANGUAGE_CODE = 'ko-kr' # 기본값 : en-us
> 
> TIME_ZONE = 'Asia/Seoul' # 기본값 : UTC
> 
> USE_I18N = True
> 
> USE_L10N = True
> 
> USE_TZ = True # 사용자의 국가에 맞게 그 국가에 맞는 시간을 자동으로 설정해 줌
> ```

<br>

### 2. Django Template Language(DTL)

> `template_language.html`
>
> ```django
> <h3>1. 반복문</h3>
> {% for menu in menus %}
> <p>{{ menu }}</p>
> {% endfor %}
> <hr>
> 
> <!-- for loop 는 DTL for 문 안에서 자동으로 생기는 객체-->
> {% for menu in menus%}
> <p>{{ forloop.counter }}{{ menu }}</p> <!-- {{ forloop.counter }} : 1 - 2 - 3 - ..-->
> {% endfor %}
> <hr>
> 
> {% for user in empty_list %}
> <p>{{ user }}</p>
> {% empty %} <!-- empty : 없는 경우 아래 구문 실행 -->
> <p>현재 가입된 유저가 없습니다.</p>
> {% endfor %}
> <hr>
> <hr>
> 
> 
> <h3>2. 조건문</h3>
> {% if '짜장면' in menus %}
> <p>짜장면에는 고춧가루지!</p>
> {% endif %}
> <hr>
> 
> {% for menu in menus %}
> {{ forloop.counter }} 번째 도는중
>   {% if loop.first %} <!-- loop의 첫번째일 때 -->
>   <p>짜장면 + 고춧가루</p>
>   {% else %}
>   <p>{{ menu }}</p>
>   {% endif %}
> {% endfor %}
> <hr>
> <hr>
> 
> 
> <!-- <=, >=, ==, != >, <, in not in is 모두 사용 가능-->
> <h3>3. length filter</h3>
> {% for message in messages %}
>  {% if message|length > 5 %}
>  <p>{{ mesage }}, 글자가 너무 길어요.</p>
>  {% else %}
>  <p>{{ message }}, {{ message|length }}</p>
>  {% endif %}
> {% endfor %}
> <hr>
> <hr>
> 
> 
> <!-- 이미 정의되어 있는 변수 호출은 % 태그로 감싸서 사용한다. -->
> <h3>4. lorem ipsum</h3>
> {% lorem %}
> <hr>
> {% lorem 3 w %}
> <hr>
> {% lorem 4 w random %}
> <hr>
> {% lorem 2 p %}
> <hr>
> <hr>
> 
> 
> <h3>5. 글자수 제한</h3>
> <!-- my_sentence = 'Life is short, you need python' -->
> <p>{{ my_sentence|truncatewords:3 }}</p> <!-- Life is short, … -->
> <p>{{ my_sentence|truncatechars:3 }}</p> <!-- Li… -->
> <hr>
> <hr>
> 
> <h3>6. 글자 관련 필터</h3>
> <p>{{ 'abc'|length }}</p> <!-- 문자열 길이 -->
> <p>{{ 'ABC'|lower }}</p> <!-- 모든 문자 소문자로 -->
> <p>{{ my_sentence|title }}</p> <!-- 공백을 기준으로 한 단어의 첫번째 글자는 대문자, 나머지는 소문자 => Life Is Short, You Need Python-->
> <p>{{ 'abc def'|capfirst }}</p> <!-- 전체 문자열에서 첫번째 글자만 대문자 => Abc def -->
> <p>{{ menus|random }}</p>
> <hr>
> <hr>
> 
> <h3>7. 연산</h3>
> <!-- 연산은 이거 하나만 기억-->
> <!-- 더 많은 연산 관련 기능은 django-mathfilters 라이브러리가 필요-->
> <!-- 하지만 연산은 views에서 처리하고 넘기자 -->
> <p>{{ 4|add:6 }}</p>
> <hr>
> <hr>
> 
> <h3>8. 날짜표현</h3>
> <p>{{ datetimenow }}</p>
> <!-- 아래 구문이 외장 라이브러리 없이 사용한 구문-->
> <p>{% now "DATETIME_FORMAT" %}</p>
> <p>{% now "SHORT_DATETIME_FORMAT" %}</p>
> <p>{% now "DATE_FORMAT" %}</p>
> <p>{% now "SHORT_DATE_FORMAT" %}</p>
> <hr>
> <!-- 날짜 표현 커스터마이징(공식문서를 보고 만들자) -->
> {% now "Y년 m월 d일 (D) h:i" %}
> <hr>
> {% now "Y" as current_year %}
> <!-- 이 아래 부터는 Y 대신에 current_year로 쓴다.-->
> Copyright {{ current_year }}
> <hr>
> <!-- 굳이 필터를 걸어서 표현한다면 다음과 같이 쓴다. -->
> {{ datetimenow|date:"SHORT_DATE_FORMAT" }}
> <hr>
> <hr>
> 
> 
> <h3>9. 기타</h3>
> <p>{{ 'google.com'|urlize }}</p>
> ```

<br>

### 3. Django에서 CSRF Token의 POST 방식으로 전달하는 방법

------

✔️ **CSRF 사이트간 요청 위조**

- 웹 어플리케이션 취약점 중 하나로 사용자가 자신의 의도와 무관하게 공격자가 의도한 행동을 해서 특정 웹 페이지의 보안을 무력화 시키거나, 수정, 삭제 등의 강제적인 작업을 하게하는 공격 방법
- Django는 최소한의 안전장치를 위해 자신이 부여한 랜덤 hash 값을 token으로 부여한다.
  - 이 token 값이 없는 요청은 잘못된 요청이라고 판단하여 접근을 거부한다.(403 Error)
- 추가내용 : XSS(사이트 간 스크립팅)와 CSRF(사이트 간 요청 위조)의 차이점(정보처리기사 실기에서도 도움되는 내용)
  - [차이점 알아보기](https://glasgowkiss.tistory.com/16)

------

- `user_new.html` 에 `form` 태그 안에서 첫 번째 줄에 `{% csrf_token %}` 만 추가하면 된다.
- `user_new.html`을 브라우저에서 확인하면 input type이 `hidden`이 된다.

```
<form action="/user_create/" method="POST"> <!-- POST 방식은 마지막 / 작성 필수! -->
  {% csrf_token %}
  <label for="name">아이디</label>
  <input type="text" id="name" name="name"><br>
  <label for="pwd">패스워드</label>
  <input type="password" id="pwd" name="pwd">
  <input type="submit" value="가입">
</form>
```

[![csrf](https://user-images.githubusercontent.com/52685250/63140781-02339e80-c01e-11e9-91ec-9663af91a8a7.jpg)](https://user-images.githubusercontent.com/52685250/63140781-02339e80-c01e-11e9-91ec-9663af91a8a7.jpg)

(위와 같이 빨간색으로 표시한 `csrfmiddlewaretoken` 이 생성된 모습을 볼 수 있다.)

<br>

### 4. Template Inheritance(상속)

- `os.path.join(BASE_DIR, '프로젝트 이름', 'templates')`

  ```python
  TEMPLATES = [
      {
          'BACKEND': 'django.template.backends.django.DjangoTemplates',
          'DIRS': [os.path.join(BASE_DIR, 'django_intro', 'templates')],
          'APP_DIRS': True,
          'OPTIONS': {
              'context_processors': [
                  'django.template.context_processors.debug',
                  'django.template.context_processors.request',
                  'django.contrib.auth.context_processors.auth',
                  'django.contrib.messages.context_processors.messages',
              ],
          },
      },
  ]
  ```

<br>

### 5. Model 필드 <a href="https://docs.djangoproject.com/en/2.2/ref/models/fields/">Model field reference</a>

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

<br>

### 6. `admin.py` 관리자 변경 목록(change list) <a href="https://docs.djangoproject.com/ko/2.2/ref/contrib/admin/">커스터마이징</a>

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

### 7. static file 정의하기

- django는 기본적으로 app 내부의 static 파일을 찾을 수 있는데, 프로젝트 내부의 static 파일을 찾기 위해 아래와 같이 경로를 작성해야 한다.
- `STATIC_URL = '/static/'` : 실제 파일이나 딜게토리가 아니고 URL 로만 존재하는 단위

> `settings.py`
>
> ```python
> # 개발 단계에서 사용하는 실제 정적 파일이 위치한 경로를 지정하는 설정(프로젝트 안에 assets 폴더 생성)
> STATICFILES_DIRS = [
>     os.path.join(BASE_DIR, 'crud', 'assets'),
> ]
> ```

> `create.html`
>
> ```django
> {% extends 'base.html' %}
> {% load static %}
> 
> {% block content %}
> <!-- assets 이후의 경로를 써야 이미지 파일을 가져올 수 있다. -->
> <img src="{% static 'images/apple.png' %}" alt="asset_img">
> {% endblock %}
> ```

<br>

### 8. Image Upload & MEDIA

#### (1) Image Upload

- 이미 테이블이 만들어져 있는 경우 `models.py`에 `image = models.ImageField(blank=True)` 추가
- `views.py` > `create` 함수 > `image = request.FILES.get('image')` 추가
- 파일을 올리기 위해서는 template의 form 태그 안에  ` enctype="multipart/form-data" `를 반드시 추가해야 한다.

- detail 페이지에서 이미지를 보여주기 위해 src 부분에 `article.image.url`과 같이 써야 한다.

  ```django
  <img src="{{ article.image.url }}" alt="{{ article.image }}">
  ```

- 하지만 이 상태에서는 업로드한 이미지가 나오지 않아 미디어 파일 경로를 설정해줘야 한다.

<br>

#### (2) MEDIA

> `settings.py` (맨 아래에 두 줄 추가)
>
> - `MEDIA_URL = 'media'`
>   - `STATIC_URL` 과 비슷한 역할
>   - 업로든 된 파일(stored files)의 URL 주소를 만들어주는 역할
>   - [주의!] STATIC_URL 과 값이 달라야 한다.
> - `MEDIA_ROOT = os.path.join(BASE_DIR, 'media')`
>   - `STATICFILES_DIRS` 와 비슷한 역할
>   - 실제 파일이 업로든 되면 어디에 저장될 지 정하는 <b>실제 경로</b>
>   - [주의!] STATICFILES_DIRS 와 값이 달라야 한다.
>   - 개발 단계에서 사용하는 경로이므로 실제 배포 단계에서는 다른 경로 설정을 해야 한다.

> `project`의 `urls.py`
>
> - `settings.MEDIA_URL` : 어떤 URL을 정적으로 추가할지 (Media file url)
> - `document_root=` : 실제 해당 미디어 파일이 어디에 존재하는지
>
> ```python
> from django.contrib import admin
> from django.urls import path, include
> from django.conf import settings
> from django.conf.urls.static import static
> 
> urlpatterns = [
>  path('jobs/', include('jobs.urls')),
>  path('articles/', include('articles.urls')),
>  path('admin/', admin.site.urls),
> ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
> 
> # urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
> ```
>
> 
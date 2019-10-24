# :notebook_with_decorative_cover: 04_django - Day14

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
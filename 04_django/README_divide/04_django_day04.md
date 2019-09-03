# :notebook_with_decorative_cover: 04_django - Day04

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




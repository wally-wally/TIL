# [SSAFY]Django_#3(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]Django_#3`은 정규과정 `Django`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

## 9. 9월25일(09일차) - `django form`

---

:checkered_flag: <b>[참고사항] Django Template Filter</b>

- `Django Template Filter`를 통해 날짜와 같은 양식을 커스터마이징 할 수 있다.
  - filter 적용 전 : `{{ article.updated_at }}` => `2019년 9월 25일 10:06 오전`
  - filter 적용 후 : `{{ article.updated_at|date:"M, j, Y" }} ` => `9월, 25, 2019`
- <a href="https://docs.djangoproject.com/en/2.2/ref/templates/builtins/#date" target="_blank">(Date 관련 커스터마이징 페이지로 이동)</a>

:checkered_flag: <b>[참고사항] Django template에서 주석 처리 할 때 주의사항</b>

```django
{% extends 'articles/base.html' %}

{% block content %}
  <h1>Articles</h1>
  <a href="{% url 'articles:create' %}">[NEW]</a>
  {% for article in articles %}
    <p>번호: {{ article.pk }}</p>
    <p>제목: {{ article.title }}</p>
    <a href="{{ article.get_absolute_url }}">[DETAIL]</a>
    <!-- {% url 'articles:detail' article_pk %}이 구문 대신 위 구문으로 작성 -->
    <hr>
  {% endfor %}
{% endblock  %}
```

- 위와 같이 주석 처리를 하면 `<!-- -->` 주석 구문 내에 있는 django url tag `{% %}` 는 url이 그대로 살아 있다고 인식하므로 `%` 대신에 `#`으로 바꿔야 django url tag도 주석 처리를 할 수 있다.
- 즉, `<!-- {# url 'articles:detail' article_pk #}이 구문 대신 위 구문으로 작성 -->`으로 변경

---

### 9.1 django form

#### (1) django form 작성(CREATE)

- `views.py`에서 `request.POST.get('title')`과 같은 방법을 사용해 작성했던 예전 방식은 사용하지 않고 form을 사용하여 다른 방식으로 작성한다.

> `views.py` > `create` 함수
>
> - `request.POST.get('title')` 을 사용했던 기존 방식
>
> ```python
> def create(request):
>     if request.method == 'POST':
>         title = request.POST.get('title')
>         content = request.POST.get('content')
>         article = Article(title=title, content=content)
>         article.save()
>         return redirect(article)
>     else:
>         return render(request, 'articles/create.html')
> ```
>
> - `django form`을 사용해서 새로 작성
>
> ```python
> def create(request):
>     if request.method == 'POST':
>         form = ArticleForm(request.POST)
>         if form.is_valid():
>             title = form.cleaned_data.get('title')
>             content = form.cleaned_data.get('content')
>             article = Article.objects.create(title=title, content=content)
>             return redirect(article)
>     else:
>         form = ArticleForm()
>     context = {'form': form,}
>     return render(request, 'articles/create.html', context)
> ```

> `articles` > `forms.py` 새로 생성
>
> ```python
> from django import forms
> 
> class ArticleForm(forms.Form):
>     title = forms.CharField(max_length=10)
>     content = forms.CharField()
>     # form 에서는 max_length를 적지 않고 CharField를 선언하면 TextField와 동일하다.
> ```

> `create.html`
>
> - `{{ form.as_p }}` 로 `label`, `input` 을 작성했던 네 줄 코드를 한 줄로 줄일 수 있다.
> - 각각의 input을 p 태그로 나눠서 한 줄에 하나씩 배치되게 한다.
>
> ```django
> {% extends 'articles/base.html' %}
> 
> {% block content %}
>   <h1>CREATE</h1>
>   <form action="" method="POST">
>     {% csrf_token %}
>     {{ form.as_p }} <!-- 아래 네 줄을 form.as_p 한 줄로 정리할 수 있다. -->
>   <!--
>     <label for="title">TITLE</label>
>     <input type="text" name="title" id="title"><br>
>     <label for="content">CONTENT</label>
>     <input type="text" name="content" id="content"><br>
>   -->
>     <input type="submit" value="CREATE">
>   </form>
> {% endblock %}
> ```

- `{{ form.as_p }}` 를 커스터마이징 하기 위해서는 이 태그를 풀어서 써 줘야 한다. <a href="https://docs.djangoproject.com/en/2.2/topics/forms/#rendering-fields-manually">(참고 공식 페이지)</a>

```django
<!-- 첫 번째 방법 -->
{{ form.title.label_tag }}
{{ form.title }}
{{ form.content.label_tag }}
{{ form.content }}

<!-- 두 번째 방법(for문 이용) -->
{% for field in form %}
  {{ field.label_tag }}
  {{ field }}
{% endfor %}
```

<br>

#### (2) `is_valid`, `cleaned_data`

:heavy_check_mark: `is_valid`

- <b>Form 객체의 유효성 검사</b>를 하는데 가장 중요한 역할.
- Form 객체가 생성되면, 유효성 검사를 하고 유효한지 아닌지 여부를 boolean으로 반환.

:heavy_check_mark: `cleaned_data`

- 유효성 검사 후 깔끔하고 정제된 dict 형태에서 데이터를 가져오는 방법.
- <b>`request.POST.get('title')` 은 이제 절대 추천하지 않는다.</b>

<br>

#### (3) Forms as HTML

| Forms        | 내용                                      |
| ------------ | ----------------------------------------- |
| `as_p()`     | 각 필드가 단락(paragraph)으로 랜더링      |
| `as_ul()`    | 각 필드가 목록 항목(list item)으로 랜더링 |
| `as_table()` | 각 필드가 테이블 행으로 랜더링            |

<br>

---

:checkered_flag: <b>IPython 으로 확인하기</b>

- `is_valid`를 수행하면 `form`을 찍었을 때 `valid` 값이 `unknown`에서 `True`로 바뀜을 볼 수 있다.
- `cleaned_data` 를 수행하면 정제된 dict 형태의 데이터가 출력된다.

```bash
In [1]: form
Out[1]: <ArticleForm bound=True, valid=Unknown, fields=(title;content)>

In [3]: type(form)
Out[3]: articles.forms.ArticleForm

In [4]: form.is_valid()
Out[4]: True

In [5]: form
Out[5]: <ArticleForm bound=True, valid=True, fields=(title;content)>

In [7]: form.cleaned_data
Out[7]: {'title': '제목4', 'content': '내용4'}

In [9]: form.cleaned_data.get('title')
Out[9]: '제목4'

In [10]: form.as_p
Out[10]: <bound method BaseForm.as_p of <ArticleForm bound=True, valid=True, field=(title;content)>>

In [12]: form.as_table()
Out[12]: '<tr><th><label for="id_title">Title:</label></th><td><input type="text" name="title" value="제목
4" maxlength="10" required id="id_title"></td></tr>\n<tr><th><label for="id_content">Content:</label></th><td><input type="text" name="content" value="내용4" required id="id_content"></td></tr>'

In [13]: form.as_ul()
Out[13]: '<li><label for="id_title">Title:</label> <input type="text" name="title" value="제목4" maxlength="10" required id="id_title"></li>\n<li><label for="id_content">Content:</label> <input type="text" name="content" value="내용4" required id="id_content"></li>'
```

---

<br>

#### (4) Widget

- django form을 사용하면 기본적으로 field 에 맞는 defalut widget 를 사용한다.

- 그런데 다른 widget을 사용하고 싶다면 `widget` 인자를 통해 field를 새로 정의할 수 있다.
- template에서 작성하는 것이 아니라 `forms.py`에서 작성한다. 즉, html에서 작성하는 것을 여기서 작성하는 것이다.
- boostrap 적용시 class를 사용해야 하는데 이럴 때 widget을 사용한다.

> `forms.py`
>
> ```python
> from django import forms
> 
> class ArticleForm(forms.Form):
>     title = forms.CharField(
>         max_length=10,
>         label='제목',
>         widget=forms.TextInput(
>             attrs={
>                 'class': 'my-title',
>                 'placeholder': 'Enter the title',
>             }
>         )
>     )
>     content = forms.CharField(
>         label='내용',
>         widget=forms.Textarea(
>             attrs={
>                 'class': 'my-content',
>                 'placeholder': 'Enter the content',
>                 'rows': 5,
>                 'cols': 50,
>             }
>         )
>     )
> ```

<img src="https://user-images.githubusercontent.com/52685250/65564339-86ffc980-df87-11e9-9d26-140f0216285b.JPG" alt="widget">

- 위와 같이 개발자 도구에서 보이는 것과 같이 class, placeholder 속성이 자동으로 생긴다.

<br>

#### (5) Semantic 요소 적용하기(READ)

> `views.py` > `detail` 함수
>
> - 기존과 같이 get 방식을 사용하여 데이터가 없는 `http://127.0.0.1:8000/articles/100/`에 접속하면 DoesNotExist 에러가 뜨는데 이는 원래 404 에러가 발생해야 하는데 500 에러가 발생한다.
>
> ```python
> def detail(request, article_pk):
>     article = Article.objects.get(pk=article_pk)
>     context = {'article': article,}
>     return render(request, 'articles/detail.html', context)
> ```
>
> - 그래서 404 에러 페이지와 우리가 정한 오류안내 메세지가 나올 수 있게 수정해준다.
>
> ```python
> from django.http import Http404
> 
> def detail(request, article_pk):
>     try:
>         article = Article.objects.get(pk=article_pk)
>     except Article.DoesNotExist:
>         raise Http404('No Article matches the given query.')
>     context = {'article': article,}
>     return render(request, 'articles/detail.html', context)
> ```
>
> - 위와 같이 작성할 수 있지만 `try-except` 구문 대신에 `get_object_or_404` shortcut을 적용하여 아래와 같이 간결하게 작성할 수 있다.
>
> ```python
> from django.shortcuts import render, redirect, get_object_or_404
> 
> def detail(request, article_pk):
>     article = get_object_or_404(Article, pk=article_pk)
>     context = {'article': article,}
>     return render(request, 'articles/detail.html', context)
> ```

<img src="https://user-images.githubusercontent.com/52685250/65565153-08585b80-df8a-11e9-8c79-477314306957.JPG" alt="404_error">

---

:heavy_check_mark: `get_object_or_404()` / `get_list_or_404()`

- 해당 객체가 있다면 `objects.get()`을 실행하고, 없으면 <b>ObjectDoesNotExist</b>  예외가 아닌 <b>Http404(HttpResponseNotFound)</b> 를 raise를 한다.

:question: 왜 404error 가 나올 상황에 django는 500 error를 발생시켰을까?

- `.get()` 메서도는 조건에 맞는 데이터가 없는 경우에 에러를 나타나게 설계되어있다. <b>코드 단계에서 발생한 에러에 대해서는 브라우저는 500 Internal Server Error</b> 로 인식.
- <font color="blue">클라이언트 입장에서 `서버에 오류가 발생하여 요청을 수행할 수 없다(500)` 라는 원인이 정확하지 않은 에러를 마주하기 때문에 올바른 에러를 예외 처리하고 발생시키는 것 또한 개발에서 중요한 요소 중 하나이다.</font>
- 즉, 500 에러가 최대한 안 뜨게 하자!!

---

<br>

#### (6) django form 작성(DELETE)

> `views.py`
>
> ```python
> from django.shortcuts import render, redirect, get_object_or_404
> 
> def delete(request, article_pk):
>     article = get_object_or_404(Article, pk=article_pk)
>     if request.method == 'POST':
>         article.delete()
>         return redirect('articles:index')
>     else:
>         return redirect(article)
> ```

> `urls.py`
>
> - `path('<int:article_pk>/delete/', views.delete, name='delete'),` 구문 추가

> `detail.html`
>
> ```django
> <form action="{% url 'articles:delete' article.pk %}" method="POST">
>   {% csrf_token %}
>   <input type="submit" value="DELETE">
> </form>
> ```

<br>

#### (7) django form 작성(UPDATE)

> `views.py`
>
> - `initial`
>   - form 나타날 때 해당 필드의 초기 값.
>   - HTML input 태그의 `value` 속성을 사용했던 것과 동일.
>   - 초기 값을 설정하는 인수는 딕셔너리 자료형이어야 한다.
>
> ```python
> def update(request, article_pk):
>     article = get_object_or_404(Article, pk=article_pk)
>     if request.method == 'POST':
>         form = ArticleForm(request.POST) # binding 작업
>         if form.is_valid(): # 유효성 검증
>             article.title = form.cleaned_data.get('title')
>             article.content = form.cleaned_data.get('content')
>             article.save()
>             return redirect(article)
>     else:
>         #form = ArticleForm(initial={'title': article.title, 'content': article.content}) # initial : 기존의 값을 가져온다
>         form = ArticleForm(initial=article.__dict__)
>     context = {'form': form,}
>     return render(request, 'articles/create.html', context)
>     # 서로 form을 쓰므로 create.html을 빌려와서 쓴다.(template은 공유하는 상태)
> ```

---

:checkered_flag: <b>IPython 으로 확인하기</b>

```bash
In [1]: article
Out[1]: <Article: 새로운 제목>

In [2]: dir(article)
Out[2]:
['DoesNotExist',
 'MultipleObjectsReturned',
 '__class__',
 '__delattr__',
 '__dict__',
 '__dir__',
 '__doc__',
 '__eq__',
 '__format__',
 ...
 ]

In [3]: article.__dict__
Out[3]:
{'_state': <django.db.models.base.ModelState at 0x1978e5dc518>,
 'id': 6,
 'title': '새로운 제목',
 'content': '새로운 내용',
 'created_at': datetime.datetime(2019, 9, 25, 4, 55, 49, 873688, tzinfo=<UTC>),
 'updated_at': datetime.datetime(2019, 9, 25, 4, 55, 49, 873688, tzinfo=<UTC>)}
```

- `__dict__`를 이용하여`form = ArticleForm(initial={'title': article.title, 'content': article.content})`와 같이 쓴 구문을 `form = ArticleForm(initial=article.__dict__)` 으로 줄여서 작성할 수 있다.

- `__dict__` : article 객체 데이터를 딕셔너리 자료형으로 변환

---

<br>

### 9.2 django ModelForm

- 일반 form과 다르게 Model 로부터 Form 을 자동으로 생성하는 기능
- form class 안에 Meta 클래스를 정의하고, Meta 클래스 안에 Model 속성에 해당하는 모델 클래스를 지정한다. 즉, 어떤 모델을 기반으로 form 을 작성할 것인지를 지정하는 것이다.
- 일반 form에 비해 모델 정의를 다시 하지 않아서 쉽고 간결하게 작성 가능하다.

> `forms.py`
>
> ```python
> from django import forms
> from .models import Article
> 
> class ArticleForm(forms.ModelForm):
> 
>     class Meta:
>         model = Article # 이 모델은 models.py에 만들어놓은 Article에 의해 만들어질꺼라는 의미
>         # fields = ('title', 'content',)
>         fields = '__all__' # 전체 입력 column(field)을 가져온다.
>         # exclude = ('title',) # title를 뺀 field를 사용한다.
> ```

#### (1) form customizing

- widgets을 meta data 안에 넣는 방법

```python
class ArticleForm(forms.ModelForm):

    class Meta:
        model = Article
        fields = '__all__'
        widgets = {
            'title': forms.TextInput(attrts={
                'class': 'my-title'
            })
        }
```

- widgets을 meta data 밖에서 작성하는 방법(django 공식 문서에서 권장하는 방법)

```python
class ArticleForm(forms.ModelForm):
    title = forms.CharField(
        label='제목',
        max_length=10,
        widget=forms.TextInput(
            attrs={
                'class': 'my-title',
                'placeholder': 'Enter the title'
            }
        )
    )
    content = forms.CharField(
        label='내용',
        widget=forms.Textarea(
            attrs={
                'class': 'my-content',
                'placeholder': 'Enter the content',
                'rows': 5,
                'cols': 50,
            }
        )
    )

    class Meta:
        model = Article
        fields = '__all__'
```

- django 가 해당 모델에서 양식에 필요한 대부분의 정보를 이미 정의하게 된다.
- 어떤 모델의 레코드를 만들어야 할 지 이미 알고 있으므로 유효성 검사 후 바로 저장(`save()`)이 가능하다.

> `views.py` > `create` 함수
>
> - `ModelForm`을 쓰면 `cleaned_data`관련 구문과 `article = Article.objects.create(title=title, content=content)`가 필요 없어진다.
>
> ```python
> def create(request):
>     if request.method == 'POST':
>         form = ArticleForm(request.POST)
>         if form.is_valid():
>             article = form.save()
>             return redirect(article)
>     else:
>         form = ArticleForm()
>     context = {'form': form,}
>     return render(request, 'articles/create.html', context)
> ```

- django modelform을 쓰면 update 구문에서도 편해진다.

> `views.py` > `update` 함수
>
> ```python
> def update(request, article_pk):
>     article = get_object_or_404(Article, pk=article_pk)
>     if request.method == 'POST':
>         form = ArticleForm(request.POST, instance=article)
>         if form.is_valid():
>             article = form.save()
>             return redirect(article)
>     else:
>         form = ArticleForm(instance=article)
>     context = {'form': form,}
>     return render(request, 'articles/form.html', context)
> 	# template에서 create.html => form.html로 변경
> ```

- form class 를 반드시 `forms.py`에 작성할 필요는 없다.
  - 하지만 되도록 해당 app 폴더 안에 `forms.py` 에 작성하는 것이 바람직하다.

<br>

#### (2) 분기하여 표현하기

---

:checkered_flag: <b>IPython으로 확인하기</b>

```bash
In [1]: request
Out[1]: <WSGIRequest: GET '/articles/create/'>

In [2]: dir(request)
Out[2]:
[
 ...
 'path',
 'path_info',
 'read',
 'readline',
 'readlines',
 'resolver_match',
 'scheme',
 ...
 ]

In [3]: request.resolver_match
Out[3]: ResolverMatch(func=articles.views.create, args=(), kwargs={}, url_name=create, app_names=['articles'], namespaces=['articles'], route=articles/create/)s'], namespaces=['articles'], route=articles/create/)

In [4]: request.resolver_match.url_name
Out[4]: 'create'
```

---

> `form.html`
>
> - `request.resolver_match.url_name`을 이용하여 상황에 맞는 동작이 수행되도록 해준다.
>
> ```django
> {% extends 'articles/base.html' %}
> 
> {% block content %}
>   {% if request.resolver_match.url_name == 'create' %}
>     <h1>CREATE</h1>
>   {% else %}
>     <h1>UPDATE</h1>
>   {% endif %}
>   <form action="" method="POST">
>     {% csrf_token %}
>     {{ form.as_p }}
>     <input type="submit" value="CREATE">
>   </form>
>   <hr>
>   {% if request.resolver_match.url_name == 'create' %}
>     <a href="{% url 'articles:index' %}">BACK</a>
>   {% else %}
>     <a href="{{ article.get_absolute_url }}">BACK</a>
>   {% endif %}
> {% endblock %}
> ```

> `views.py`
>
> - `context` 내부에 `'article': article,` 를 추가해야 `form.html` 에서 `article.get_absolute_url`의 `article`을 읽을 수 있다.

<br>

### 9.3 django-bootstrap4 <a href="https://django-bootstrap4.readthedocs.io/en/latest/">(공식 홈페이지)</a>

:warning: <b>반드시 공식 문서를 보면서 작업하자!!</b>

#### (1) django-bootstrap4 설치 : <a href="https://django-bootstrap4.readthedocs.io/en/latest/installation.html">(홈페이지로 바로 이동)</a>

#### (2) templates django-bootstrap4에 맞게 수정 및 추가

> `base.html`
>
> ```django
> {% load bootstrap4 %}
> 
> <!DOCTYPE html>
> <html lang="ko">
> <head>
>   <meta charset="UTF-8">
>   <meta name="viewport" content="width=device-width, initial-scale=1.0">
>   <meta http-equiv="X-UA-Compatible" content="ie=edge">
>   {% bootstrap_css %}
>   <title>Document</title>
> </head>
> <body>
>   <div class="container">
>     {% block content %}
>     {% endblock  %}
>   </div>
>   {% bootstrap_javascript jquery='full' %}
> </body>
> </html>
> ```

> `form.html`
>
> ```django
> {% extends 'articles/base.html' %}
> {% load bootstrap4 %}
> 
> {% block content %}
>   {% if request.resolver_match.url_name == 'create' %}
>     <h1>CREATE</h1>
>   {% else %}
>     <h1>UPDATE</h1>
>   {% endif %}
>   <form action="" method="POST">
>     {% csrf_token %}
>     {% bootstrap_form form %} {# 초록색 form은 view에서 넘어온 이름임 => form #}
>     {% buttons %}
>       <button type="submit" class="btn btn-primary">Submit</button>
>     {% endbuttons %}
>   </form>
>   <hr>
>   {% if request.resolver_match.url_name == 'create' %}
>     <a href="{% url 'articles:index' %}">BACK</a>
>   {% else %}
>     <a href="{{ article.get_absolute_url }}">BACK</a>
>   {% endif %}
> {% endblock %}
> ```

<br>

## 10. 9월26일(10일차)

### 10.1 댓글(comment) 기능 추가 <a href="https://docs.djangoproject.com/en/2.2/topics/forms/modelforms/#the-save-method">(참고 공식 문서)</a>

> `views.py`
>
> ```python
> def detail(request, article_pk):
>     article = get_object_or_404(Article, pk=article_pk)
>     comments = article.comment_set.all() # article의 모든 댓글
>     comment_form = CommentForm() # 댓글 form
>     context = {'article': article, 'comment_form': comment_form, 'comments': comments,}
>     return render(request, 'articles/detail.html', context)
> 
> def comments_create(request, article_pk):
>     if request.methdo == 'POST':
>         comment_form = CommentForm(request.POST)
>         if comment_form.is_valid():
>             # commit=False => 객체를 Create 하지만, db에 레코드는 작성하지 않는다.
>             comment = comment_form.save(commit=False)
>             comment.article_id = article_pk
>             comment.save()
>     return redirect('articles:detail', article_pk)
> 
> def comments_delete(request, article_pk, comment_pk):
>     if request.method == 'POST':
>         comment = get_object_or_404(Comment, pk=comment_pk)
>         comment.delete()
>     return redirect('articles:detail', article_pk)
> ```

> `urls.py`
>
> - `urlpatterns` 안에 아래 두 줄 추가
>
> ```python
> path('<int:article_pk>/comments/', views.comments_create, name='comments_create'),
> path('<int:article_pk>/comments/<int:comment_pk>/delete/', views.comments_delete, name='comments_delete'),
> ```

> `detail.html`
>
> - `for`와 관련된 다양한 변수들(ex. `forloop.revcounter`) 참고 공식 문서 => <a href="https://docs.djangoproject.com/en/1.7/ref/templates/builtins/#for">(바로 이동)</a>
>
> ```HTML
> <!-- 댓글 출력 -->
> <p><b>{{ comments|length }}개의 댓글</b></p>
> {% for comment in comments %}
>   <div> <!-- <p> 태그 대신 <div> 태그로 해야 한 줄에 delete 버튼과 댓글이 나온다. -->
>     댓글 {{ forloop.revcounter }} : {{ comment.content }}
>     <form action="{% url 'articles:comments_delete' article.pk comment.pk %}" method="POST" style="display: inline;">
>       {% csrf_token %}
>       <input type="submit" value="DELETE">
>     </form>
>   </div>
> {% empty %}
>   <p><b>댓글이 없어요...</b></p>
> {% endfor %}
> ```
>
> ```django
> <!-- 댓글 작성 form -->
> <form action="{% url 'articles:comments_create' article.pk %}" method="POST">
>   {% csrf_token %}
>   <!-- <label for="content">COMMENT</label>
>   <input type="text" name="content" id="content"> -->
>   {{ comment_form }} <!-- 주석 처리한 위 두줄이 다음과 같이 한 줄로 작성 가능 -->
>   <input type="submit" value="submit">
> </form>
> ```

<br>

### 10.2 Decorator

#### (1) 데코레이터 기본 개념

<img src="https://user-images.githubusercontent.com/52685250/65651831-9e53bb00-e04a-11e9-922d-0e305e61b85d.JPG" alt="데코레이터">

(이미지 출처 : 파이썬 코딩 도장)

---

- 하나의 함수를 취해서 또 다른 함수를 반환하는 함수이다.
- `#`에 숫자를 붙여서 사용하거나 `@` 심볼을 활용하여 데코레이터를 사용한다.
- 데코레이터는 주로 로그를 남기거나 유저의 로그인 상태를 확인하여 로그인 페이지로 redirect할 때, 프로그램 성능을 위한 테스트할 때 사용한다고 한다. <a href="https://whatisthenext.tistory.com/113">(원본 페이지)</a>

---

>  데코레이터 간단한 예제
>
> ```python
> def hello(func):
>     def wrapper():
>         print('HiHi')
>         func()
>         print('hahahaha')
>     return wrapper
> 
> @hello
> def bye():
>     print('byebye')
> 
> bye()
> ```
>
> ```
> HiHi
> byebye
> hahahaha
> ```

- `admin.py`에서 선언한 class를 데코레이터를 사용하여 아래와 같이 쓸 수 있다.

```python
class CommentAdmin(admin.ModelAdmin):
    list_display = ('pk', 'content', 'created_at', 'updated_at', 'article_id',)

admin.site.register(Comment, CommentAdmin)
```

```python
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('pk', 'content', 'created_at', 'updated_at', 'article_id',)
```

<br>

#### (2) django view decorator <a href="https://docs.djangoproject.com/en/2.2/topics/http/decorators/">(공식 문서)</a>

- 데코레이터를 사용해서 `request.method == 'POST'` 를 if문으로 판단하는 구문을 줄여준다.
- 단, if - else문은 그대로 유지해야 한다.

```python
from django.views.decorators.http import require_POST

@require_POST
def delete(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    # if request.method == 'POST':
    article.delete()
    return redirect('articles:index')
    #else:
        # return redirect(article)

    
@require_POST
def comments_create(request, article_pk):
    # if request.method == 'POST': 데코레이터를 선언했기 때문에 이 if문은 필요없다.
    comment_form = CommentForm(request.POST)
    if comment_form.is_valid():
        comment = comment_form.save(commit=False)
        comment.article_id = article_pk
        comment.save()
    return redirect('articles:detail', article_pk)


@require_POST
def comments_delete(request, article_pk, comment_pk):
    # if request.method == 'POST':
    comment = get_object_or_404(Comment, pk=comment_pk)
    comment.delete()
    return redirect('articles:detail', article_pk)
```


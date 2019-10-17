## :heavy_exclamation_mark: django CRUD 만들 때조심하자!

<br>

### 1.`models.py`에서 외래키 설정할 때

```python
class Comment(models.Model):
    # 부모 테이블 이름 작성시 "Article"(X), Article(O) => 더블 쿼터 쓰지 말자!
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.CharField(max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

<br>

### 2.`forms.py`에서 form 만들 때

```python
class ArticleForm(forms.ModelForm): # forms.Form (X) / forms.ModelForm(O)
    title = forms.CharField(
        max_length=10,
        label='제목'
    )
    content = forms.CharField(
        max_length=140,
        label='내용'
    )
```

<br>

### 3.`delete` view 만들 때

```python
from django.views.decorators.http import require_POST # 맨 위에 반드시 작성

@require_POST # 데코레이터
def delete(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    article.delete()
    return redirect('articles:index') # articles/index.html(X) / articles:index(O)
```

<br>

### 4.삭제 기능 template 만들 때

```django
{# 단순이 a 태그로 링크걸어서 delete 만들면 안 되고 아래와 같이 POST 방식을 사용한다. #}
{# 그래야 홈페이지 주소로 직접 입력해서 삭제되는 불상사가 일어나지 않는다. #}

<form action="{% url 'articles:delete' article.pk %}" method="POST">
  {% csrf_token %}
  <input type="submit" value="DELETE">
</form>
```

<br>

### 5. 댓글 생성 기능 만들 때

```python
@require_POST
def comments_create(request, article_pk):
    comment_form = CommentForm(request.POST)
    if comment_form.is_valid():
        comment = comment_form.save(commit=False)
        comment.article_id = article_pk # article_id는 외래키 지정하면서 자동으로 생긴 고정 column명(sqlite3로 확인하면 쉽다.)
        comment.save()
    return redirect('articles:detail', article_pk)
```


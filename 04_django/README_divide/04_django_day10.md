# :notebook_with_decorative_cover: 04_django - Day10

<br>

## 10. 9월26일(10일차)

### 10.1 댓글(comment) 기능 추가 <a href="https://docs.djangoproject.com/en/2.2/topics/forms/modelforms/#the-save-method">(참고 공식 문서)</a>

> `views.py`
>
> ```python
> def detail(request, article_pk):
>      article = get_object_or_404(Article, pk=article_pk)
>      comments = article.comment_set.all() # article의 모든 댓글
>      comment_form = CommentForm() # 댓글 form
>      context = {'article': article, 'comment_form': comment_form, 'comments': comments,}
>      return render(request, 'articles/detail.html', context)
> 
> def comments_create(request, article_pk):
>      if request.method == 'POST':
>            comment_form = CommentForm(request.POST)
>            if comment_form.is_valid():
>                # commit=False => 객체를 Create 하지만, db에 레코드는 작성하지 않는다.
>                comment = comment_form.save(commit=False)
>                comment.article_id = article_pk # article과 comment의 번호를 일치시킨 후
>                comment.save() # 그 다음에 .save() 메서드를 수행한다.
>      return redirect('articles:detail', article_pk)
> 
> def comments_delete(request, article_pk, comment_pk):
>      if request.method == 'POST':
>            comment = get_object_or_404(Comment, pk=comment_pk)
>            comment.delete()
>      return redirect('articles:detail', article_pk)
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
>    댓글 {{ forloop.revcounter }} : {{ comment.content }}
>      <form action="{% url 'articles:comments_delete' article.pk comment.pk %}" method="POST" style="display: inline;">
>          {% csrf_token %}
>          <input type="submit" value="DELETE">
>      </form>
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

------

- 하나의 함수를 취해서 또 다른 함수를 반환하는 함수이다.
- `#`에 숫자를 붙여서 사용하거나 `@` 심볼을 활용하여 데코레이터를 사용한다.
- 데코레이터는 주로 로그를 남기거나 유저의 로그인 상태를 확인하여 로그인 페이지로 redirect할 때, 프로그램 성능을 위한 테스트할 때 사용한다고 한다. <a href="https://whatisthenext.tistory.com/113">(원본 페이지)</a>

------

> 데코레이터 간단한 예제
>
> ```python
> def hello(func):
>      def wrapper():
>            print('HiHi')
>            func()
>            print('hahahaha')
>      return wrapper
> 
> @hello
> def bye():
>      print('byebye')
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
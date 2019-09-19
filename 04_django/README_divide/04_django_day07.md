# :notebook_with_decorative_cover: 04_django - Day07

<br>

## 7. 9월19일(07일차) - `1 : N 관계`

### 7.1 기본 용어 정리

#### (1)`ForeignKey` (참조 키, 외래 키) <a href="https://docs.djangoproject.com/en/2.2/ref/models/fields/#foreignkey">(django 공식 문서)</a>

- 개념
  - 외래 키는 참조하는 테이블에서 1개의 키(속성 또는 속성의 집합), 참조하는 측의 변수는 참조되는 측의 테이블의 키를 가리킨다.
  - 하나(또는 복수)의 다른 테이블의 기본 키 필드를 가리키는 데이터의 <u>참조 무결성을 확인</u>하기 위하여 사용된다.
- 특징
  - 외래 키의 값으로는 부모 테이블에 존재하는 키의 값만 넣을 수 있다.
  - 외래 키를 사용하여 부모 테이블의 유일한 값을 참조한다.(부모 테이블의 기본 키)

<br>

#### (2)`on_delete` (`models.py`에서 models.ForeignKey의 필수 속성이다.)

- 개념
  - ForeignKey의 필수 인자 이며, 참조하고 있는 부모 객체가 사라졌을 때 어떻게 처리할 것인지를 정의.
- 속성
  - `CASCADE` : <b>부모 객체가 삭제 됐을 때 이를 참조하는 객체도 삭제</b>한다.(주로 이거 사용!)
  - `PROTECT` : 참조가 되어 있는 경우 오류가 발생한다.
  - `SET_NULL` : 부모 객체가 삭제 됐을 때 참조하는 모든 값을 NULL로 치환한다.(DB 상에 NOT_NULL 조건이 있다면 불가능)
  - `SET_DEFAULT` : 모든 값이 DEFAULT로 설정한 값으로 치환(DB 상에 DEFAULT 조건 값이 있어야 함.)
  - `SET()` : 특정 함수를 호출(직접 만든 함수나 내장 함수)
  - `DO_NOTHING` : 아무것도 하지 않음.(단, DB 상에 필드에 대한 `ON_ DELETE` 제한 조건을 따로 설정해야 한다.)

<br>

#### (3) Relationship Fields

- ForeignKey - 1 : N 관계에서 사용
- ManyToManyField - M : N 관계에서 성립
- OneToOneField - 1 : 1 관계에서 성립 (ex. 내 프로필 페이지 / 잘 사용하지 않는 관계)

<br>

#### (4) Metadata <a href="https://docs.djangoproject.com/en/2.2/ref/models/options/">(django 공식 문서)</a>

- `class Meta`와 같이 선언하여 모델에 대한 모델-레벨의 메타데이터를 선언할 수 있다.
- 유용한 기능들 중 하나는 쿼리할 때 반환되는 기본 레코드 순서를 제어하는 것이다.(`ordering` 속성)

```python
# 예시
class Meta:
    # 알파벳순(A-Z) 순으로 content 를 정렬한 후
    # 작성일(created_at) 별로 가장 나중에 작성된 것 부터 정렬
    ordering = ['content', '-created_at']
```

- META : 데이터에 대한 데이터

<br>

### 7.2 1 : N(일 대 다) 관계

> `models.py`
>
> ```python
> class Comment(models.Model):
>  article = models.ForeignKey(Article, on_delete=models.CASCADE)
>  content = models.CharField(max_length=200)
>  created_at = models.DateTimeField(auto_now_add=True)
>  updated_at = models.DateTimeField(auto_now=True)
> 
>  class Meta:
>      ordering = ['-pk'] # 이렇게 model에서 선언하면 views.py에서 ordey_by('-pk') 안 쓰고 .all()로 가져와도 역순으로 출력할 수 있다.
> 
>  def __str__(self):
>      return self.content
> ```

```sql
CREATE TABLE "articles_comment" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "content" varchar(200) NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "article_id" integer
NOT NULL REFERENCES "articles_article" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "articles_comment_article_id_59ff1409" ON "articles_comment" ("article_id");
COMMIT;
```

<img src="https://user-images.githubusercontent.com/52685250/65200791-3853ba80-dac3-11e9-8f63-585db1727f52.JPG" alt="1-N" widt="700px">

- commet 등록(shell_plus로 확인)

```shell
In [1]: article = Article.objects.get(pk=1)

In [2]: comment = Comment()

In [3]: comment.content = 'first comment'

In [4]: comment.article_id = article.pk

In [5]: comment.save()

In [6]: comment
Out[6]: <Comment: <Article(1): Comment(1)-first comment>

In [7]: comment = Comment()

In [8]: comment.content = 'second comment'

In [9]: comment.article = article

In [10]: comment.save()

In [11]: comment
Out[11]: <Comment: <Article(1): Comment(2)-second comment>

In [12]: comment.pk
Out[12]: 2

In [13]: comment.article_id
Out[13]: 1

In [14]: comment.article
Out[14]: <Article: 제목1>

In [15]: comment.content
Out[15]: 'second comment'

In [16]: comment.article_id
Out[16]: 1

In [17]: comment.article.pk
Out[17]: 1

In [18]: comment.article.title
Out[18]: '제목1'

In [19]: comment.article.content
Out[19]: '내용1'

In [20]: exit
```

#### (1)  1 : N 관계 활용하기

- `참조` : 1 : N 에서 N 쪽에서 1을 참조하는건 어렵지 않음
  - 댓글의 입장에서 `comment.article` 이 가능한 이유는 어떠한 댓글이든 반드시 자신이 참조하는 article이 있으므로 이와 같이 접근할 수 있다.

```python
comment.article
comment.article_id
...
```

- `역참조` : 1 : N 에서 <u>1 쪽에서 N을 참조</u>하는 경우 -> 이게 어려움...
  - `article.comment` 형태로는 가져올 수 없다. 게시글에 몇 개의 댓글이 있는지 django ORM 이 보장할 수 없기 때문이다.(본질적으로 Article 모델에 Comment 와의 관계에 대해 작성된 것이 존재하지 않는다.)
  - `article.comment_set` 로 접근할 수 있다.
  - `Comment` 모델에서 `article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')` 와 같이 `related_name` 속성을 추가하면 `article.comment_set` 대신에 `article.comments`로 바꿔서 쓸 수 있다.(이건 주로 M : N에서 사용함)

```shell
In [1]: article = Article.objects.get(pk=1)

In [2]: dir(article)
Out[2]: 
[ ...,
 'check',
 'clean',
 'clean_fields',
 'comment_set',
 'content',
 'created_at',
 ...
 ]

In [3]: article.comment_set
Out[3]: <django.db.models.fields.related_descriptors.create_reverse_many_to_one_manager.<locals>.RelatedManager at 0x1e6d2527208>

In [4]: article.comment_set.all()
Out[4]: <QuerySet [<Comment: <Article(1): Comment(2)-second comment>, <Comment: <Article(1): Comment(1)-first comment>]>
```

`article.comment_set.all()`로 전부 가져온 다음에 for문을 돌려 하나씩 출력하면 된다.

```shell
In [5]: comments = article.comment_set.all()

In [8]: comments.first()
Out[8]: <Comment: <Article(1): Comment(2)-second comment>

In [9]: comments.first().content
Out[9]: 'second comment'

In [10]: comments[0].content
Out[10]: 'second comment'
```

<br>

#### (2) [실습]댓글 작성 기능 추가하기(소스 코드로 바로 이동)

- `models.py` <a href="https://github.com/wally-wally/TIL/blob/master/04_django/03_django_crud_REST/articles/models.py" target="_blank">(바로 이동)</a>
- `admin.py` <a href="https://github.com/wally-wally/TIL/blob/master/04_django/03_django_crud_REST/articles/admin.py" target="_blank">(바로 이동)</a>
- `views.py` <a href="https://github.com/wally-wally/TIL/blob/master/04_django/03_django_crud_REST/articles/views.py" targe="_blank">(바로 이동)</a>
- `urls.py` <a href="https://github.com/wally-wally/TIL/blob/master/04_django/03_django_crud_REST/articles/urls.py" target="_blank">(바로 이동)</a>
- `detail.html` <a href="https://github.com/wally-wally/TIL/blob/master/04_django/03_django_crud_REST/articles/templates/articles/detail.html" target="_blank">(바로 이동)</a>
- `index.html`, `update.html`, `create.html` 은 이전과 동일

<br>

------

:spiral_notepad: <b>comments 관련 추가 사항 - 댓글 개수 출력</b>(`detail.html`)

```django
{{ comments|length }}
{{ article.comment_set.all|length }}
{{ comments.count }}
```

- `{{ comments.count }}` 은 메서드가 호출되면서 `comment` 모델 쿼리를 한 번 더 DB에 보내기 때문에 매우 작은 차이지만 더 느리다.
- `{{ article.comment_set.all|length }}` 은 context가 없는 경우(어쩔 수 없을 때만) 사용한다.
- 가급적 첫번째 방법을 사용하자!

- 댓글이 없는 경우 `0개` 대신에 대체 문장 출력

```html
<p><b>{{ comments|length }}개의 댓글</b></p>
{% for comment in comments %}
  <li>{{ comment.content }}
  <form action="{% url 'articles:comments_delete' article.pk comment.pk %}" method="POST" style="display: inline;" onclick="return confirm('진짜 지울꺼야??')">
    {% csrf_token %}
    <input type="submit" value="DELETE">
  </form>
  </li>
  {% empty %}
  <p><b>댓글이 없어요...</b></p>
{% endfor %}
```

------


# :ballot_box: ORM Review

---

- 수업시간에 배웠던 ORM 관련 기본 내용들과 shell_plus로 확인했던 내용들을 위주로 정리함.
- 부족한 부분은 django README를 참고할 것.

---

<br>

## 1. ORM(Object-Relational Mapping)의 장단점

<img src="https://user-images.githubusercontent.com/52685250/63411128-d6eeec00-c42f-11e9-8307-f6c6c099c9a0.JPG" alt="SQL_Basic" width=600px height=250px>

- 장점
  - SQL문을 아예 몰라도 DB사용 가능
  - SQL의 절차적인 접근이 아닌 **객체 지향적 접근** 가능
  - 매핑 정보가 명확하여 **ERD를 보는 것에 대한 의존도를 낮출 수 있다.**
  - ORM은 **독립적으로 작성**되어 있고 해당 객체들을 재활용할 수 있다. 개발자는 객체에 집중함으로써 해당 **DB에 종속될 필요없이 자유롭게 개발**할 수 있다.
- 단점
  - ORM 만으로 완전히 거대한 서비스를 구현하기가 어렵다.
    - 사용하기는 편하지만, 설계는 매우 신중하게 해야함.
    - 프로젝트의 규모가 커질 경우 난이도가 올라간다.
    - **순수 SQL보다 약간의 속도 저하가 생길 수 있다.**
  - 이미 많은 프로세스가 많은 시스템에서는 ORM 으로 대체하기가 어렵다.
- 결론
  - **<font color="blue">생산성(productivity)</font>!!**
  - ORM 을 사용하여 얻게되는 생산성은 약간의 성능저하나 다른 단점들을 상쇄할 만큼 뛰어나기 때문.
  - 장점으로 인한 생산성 증가가 훨씬 크기 때문에 현대에는 대부분의 프레임워크들이 ORM 을 사용하고 있다.
  - 즉, 우리는 DB를 객체(Object) - 인스턴스(instance)로 조작하기 위해 ORM 을 배운다.

<br>

---

:checkered_flag: **[추가] migrate한 후 생성되는 테이블의 schema 확인**

- 해당 migrations 설계도가 SQL 문으로 어떻게 해석되어서 동작할지 미리 확인할 수 있음

```bash
python manage.py sqlmigrate app_name 0001
```

```sql
CREATE TABLE "articles_article" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "title" varchar(10) NOT NULL, "content" text NOT NULL, "creative_time" datetime NOT NULL);
COMMIT;
```

- TABLE의 이름은 `articles_article`

- 각 컬럼의 특징

  - `id` : integer형으로 `NOT NULL` 조건 설정, pk는 `AUTOINCREMENT` 속성이 적용되어 삭제 된 행의 값을 재사용하지 않고 새로운 값이 적용된다.
  - `title` : varchar는 가변 길이 문자열로 원래는 문자열 길이에 제한을 두지만  sqlite에서는 문자열 길이에 제한하지 않는다.<a href=" https://crystalcube.co.kr/89" target="_blank">(참고 문서)</a> / `NOT NULL` 조건 설정되어 있음

  - `content` : text 형식으로 `NOT NULL` 조건 설정되어 있음
  - `creative_time` : datetime 형식으로 `NOT NULL` 조건 설정되어 있음

---

<br>

## 2. QuerySet 기본 개념

- 달 받은 객체의 목록
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
  - `<QuerySet []>`와 같은 형태로 출력됨
  - DB에 쿼리를 날려 인스턴스 객체를 전부 달라고 얘기! 이때, 레코드가 하나만 있으면 인스턴스 객체로, 두개이상이면 쿼리셋으로!(애초에 쿼리를 다르게 날림)

---

<br>

## 3. Django ORM - CRUD

### (1) CREATE

- 첫 번째 방법 : 특정 테이블에 새로운 레코드(행)을 추가하여 데이터 추가

  ```bash
  # SQL 구문으로 쓴다면 이런 식으로...
  # INSERT INTO table (column1, column2, ...) VALUES (value1, value2, ...)
  # INSERT INTO articles_article (title, content) VALUES ('first', 'django!')
  
  # ORM 방식으로 쓴다면 이런 식으로...
  >>> article = Article() # Article class 로부터 article 인스턴스 생성
  >>> article.title = 'first' # 인스턴스 변수(title)에 값을 할당
  >>> article.content = 'django!' # 인스턴스 변수(content)에 값을 할당
  
  # save 를 하지 않으면 아직 DB에 값일 저장되지 않음
  >>> article # 이 상태에서는 아직 아무것도 없다. <Article: Article object (None)>
  >>> Article.object.all() # <QuerySet []> 아직 DB에 저장이 안 되어 있으므로 이렇게 뜬다.
  
  # save 를 하고 확인해보면 저장된 것을 확인할 수 있다.
  >>> article.save() # 이 코드를 입력해야 저장된다.(클래스의 메소드를 호출하는 과정)
  >>> article # <Article: Article object (1)>
  >>> Article.object.all() # <QuerySet [<Article: Article object (1)>]>가 출력됨
  
  # 인스턴스 article 을 활용하여 변수에 접근할 수 있다.(저장된 값 확인)
  >>> article.title # 저장된 title의 값('first')이 출력됨
  >>> article.content # 저장된 content 값('django!')이 출력됨
  >>> article.create_at # datetime.datetime(2019, 8, 21, 2, 44, 1, 144082, tzinfo=<UTC>)이 출력됨 / 이 때 시간의 tzinfo는 UTC로 설정되어 있어야 한다.
  ```

- 두 번째 방법 : 함수에서 키워드 인자 넘기는 방법

  ```bash
  >>> article = Article(title='second', content='django!!')
  
  >>> article
  <Article: Article object (None)> # 아직 저장 안 된 상태
  
  >>> article.save() # .save() 메서드를 사용해야 저장됨
  >>> article
  <Article: Article object (2)>
  
  >>> Article.objects.all()
  <QuerySet [<Article: Article object (1)>, <Article: Article object (2)>]>
  
  >>> article.title
  'second'
  >> article.content
  'django!'
  ```

- 세 번째 방법 : 한 번에 쿼리 생성까지 이루어짐

  `create()`을 사용하면 쿼리셋 객체를 생성하고 저장하는 로직이 한 번의 스텝으로 끝난다.

  바로 저장하기 때문에 <u>유효성 검사를 할 틈이 없어서</u> 자주 사용하지는 않는다.

  그래서 첫 번째 혹은 두 번째 방법을 사용한다.

  ```bash
  >>> Article.objects.create(title='third', content='django!!!')
  <Article: Article object (3)> # 바로 쿼리 표현식(Django에서는 QuerySet이라고 함) return
      
  >>> Article.objects.all()
  <QuerySet [<Article: Article object (1)>, <Article: Article object (2)>, <Article: Article object (3)>]>
  
  >>> test = Article.objects.all()
  >>> test
  <QuerySet [<Article: Article object (1)>, <Article: Article object (2)>, <Article: Article object (3)>]>
  ```

---

:checkered_flag: **[추가]유효성 검사 - `full_clean()`**

- save 하기 전에 `full_clean()` 메서드를 통해 article이라는 인스턴스 객체가 검증(validation)에 적합한지를 알아볼 수 있다.

  ```bash
  >>> article = Article()
  
  >>> article.title = 'Life is short, you need python' # model 구성 시 title의 최대 길이를 10이라고 정한 상태임.
  
  >>> article.full_clean()
  ---------------------------------------------------------------------------
  ValidationError                           Traceback (most recent call last)
  <ipython-input-30-ae01d73cadbe> in <module>
  ----> 1 article.full_clean()
  
  ~\Desktop\TIL\04_django\01_django_orm_crud\venv\lib\site-packages\django\db\models\base.py in full_clean(self, exclude, validate_unique)
  1201
  1202         if errors:
  -> 1203             raise ValidationError(errors)
  1204
  1205     def clean_fields(self, exclude=None):
  
  ValidationError: {'title': ['이 값이 최대 10 개의 글자인지 확인하세요(입력값 30 자).'], 'content': ['이 필드는 빈 칸으로 둘 수 없습니다.']}
  ```

---

<br>

### (2) READ

**`.get()`**

- `.get()` 을 사용할 때 객체가 없으면 `DoesNotExist` 에러가 나오고 객체가 여러 개일 경우에 `MultipleObjectReturned` 오류를 띄움.
- 위와 같은 특징을 가지고 있기 때문에 unique 혹은 Not Null 특징을 가지고 있으면 사용할 수 있다.
- 또한, 우리가 `.get(id=1)` 형태 뿐만 아니라 `.get(pk=1)` 로 사용할 수 있는 이유는(DB에는 id로 필드 이름이 지정 됨에도) `.get(pk=1)` 이`.get(id__exact=1)` 와 동일한 의미이기 때문이다. pk는 `id__exact` 의 shortcut 이다.
- 쿼리셋은 쿼리셋 객체이고 단일 객체는 클래스의 인스턴스이다. (실제로 type을 찍어보면 `QuerySet`과 `Article의 인스턴스`라고 다르게 나온다.)

```bash
# 1. SELECT * FROM articles_article;
# 1. DB에 있는 모든 글 가져오기(테이블에서 전체 컬럼(*) 데이터 가져오기)
>>> Article.objects.all()
<QuerySet [<Article: 1번글 - first>, <Article: 2번글 - second>, <Article: 3번글 - third>, <Article: 4번글 - fourth>]>


# 2. SELECT * FROM articles_article WHERE title='first';
# 2. DB 에 저장된 글 중에서 title이 first인 글만 가져오기
>>> Article.objects.filter(title='first')
<QuerySet [<Article: 1번글 - first>]>

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
# filter는 해당되는 QuerySet 객체를 전부 다 가지고 온다.
# filter 자체가 여러 값을 가져올 수 있기 때문에 django가 개수를 보장하지 못한다. 그래서 0개, 1개라도 무조건 쿼리셋으로 반환한다.
```

```bash
# filter 자체가 여러 값을 가져올 수 있기 때문에 장고가 몇개인지 보장을 못해서 0개, 1개라도 쿼리셋을 리턴한다.
>>> article = Article.objects.filter(pk=1)
>>> article
<QuerySet [<Article: 1번글 - first>]>


# .get() 으로 pk 를 가져오는 것과 다르게 QuerySet(리스트형식) 으로 가져오기 때문에 article.id 등으로 접근 불가.
>>> article.pk
AttributeError: 'QuerySet' object has no attribute 'pk'
>>> article.title
AttributeError: 'QuerySet' object has no attribute 'title'


# 쿼리셋 객체(articles)라고 불렀을 때와 비교)
>>> type(article)
<class 'django.db.models.query.QuerySet'>

# .get() 으로 데이터를 가져와보자
>>> article = Article.objects.get(pk=1)
>>> type(article)
<class 'articles.models.Article'>

# .get() 으로 부르면 인스턴스 객체이기 때문에 변수 접근 하는 것처럼 사용 가능
>>> article = Article.objects.get(pk=1)
>>> article.pk
1
>>> article.title
'first'
```

```bash
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

# 이것도 당연히 인덱싱 접근이 가능하다 why? QuerySet 이기 때문에
>>> Article.objects.filter(content__endswith='!')[1]
<Article: 2번글 - second>
```

<br>

### (3) UPDATE

```bash
# article 인스턴스 객체의 인스턴스 변수에 들어있는 기존 값을 변경하고 저장
>>> article = Article.objects.get(pk=1)

>>> article.title = 'byebye'

>>> article.save()
```

<br>

### (4) DELETE

```bash
# article 인스턴스 객체를 생성후 .delete() 메서도를 호출
>>> article = Article.objects.get(pk=1)

>>> article.delete()
```

```bash
>>> article = Article.objects.get(pk=1)

>>> article.delete()
(1, {'articles.Article': 1})

>>> Article.objects.get(pk=1)
DoesNotExist 에러 발생
# 이 상태에서 새로운 데이터를 넣으면 1번을 다시 채우지 않고 맨 뒷 번호 이후부터 들어간다.(컴퓨터 내부적으로 1번은 이유가 있어서 삭제된 것이라고 생각하기 때문에 1번은 무시하고 다음 번호로 저장된다.)
```

<br>

## 4. 1 : N Relationships

> `models.py` 상태
>
> ```python
> # articles/models.py
> 
> class Article(models.Model):
> 	...
> 
> class Comment(models.Model):
>     article = models.ForeignKey(Article, on_delete=models.CASCADE)
>     content = models.CharField(max_length=200)
>     created_at = models.DateTimeField(auto_now_add=True)
>     updated_at = models.DateTimeField(auto_now=True)
> 
>     class Meta:
>         ordering = ['-pk',]
> 
>     def __str__(self):
>         return self.content
> ```

> `Table 직접 확인하기`
>
> ```sql
> $ sqlite3 db.sqlite3
> 
> sqlite> .tables
> articles_article            auth_user_user_permissions
> articles_comment            django_admin_log          
> auth_group                  django_content_type       
> auth_group_permissions      django_migrations         
> auth_permission             django_session            
> auth_user                   jobs_job                  
> auth_user_groups
> 
> 
> sqlite> .schema articles_comment
> CREATE TABLE IF NOT EXISTS "articles_comment" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "content" varchar(200) NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL, "article_id" integer NOT NULL REFERENCES "articles_article" ("id") DEFERRABLE INITIALLY DEFERRED);
> CREATE INDEX "articles_comment_article_id_59ff1409" ON "articles_comment" ("article_id");
> 
> # 우리는 분명히 컬럼을 설정할 때  article 이라고 이름 붙였지만, 실제 ORM이 SQL문을 만들 때 해당 이름을 article_id 로 만들었다. article 라고 이름 붙인 컬럼에  [컬럼이름_id] 형태로 만들어준다.
> 
> # 또한 참조하는 것은 articles_article 테이블 (REFERENCES "articles_article" ("id"))
> ```

- `article_id`라는 컬럼이 생성되었다. 우리가 댓글을 작성하면 댓글이 해당하는 글이 **몇 번째 게시 글의 댓글인지 알아야 하기 때문**
- 만약 ForeignKey 를 article 이라고 하지 않고 `abcd = models.ForeignKey(..)`형태로 생성 했다면 `abcd_id`로 만들어진다. 이렇게되면 모델 관계를 파악하는 것이 어렵기 때문에 **부모 클래스명의 소문자로 작성하는 것이 바람직하다.**

<img src="https://user-images.githubusercontent.com/52685250/65200791-3853ba80-dac3-11e9-8f63-585db1727f52.JPG" alt="1-N" widt="700px">

- comment 등록

  ```bash
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

### (1) 참조, 역참조 (1 : N 관계 활용하기)

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

- 만약 `models.py`에서 `related_name=comments`로 변경하면 django가 기본적으로 만들어주는 `_set` 명령어를 임의의로 변경할 수 있다.
- `article.comment_set` 은 사용할 수 없고 `article.comments`로 대체된다. (이 경우는 주로 M : N 관계에서 반드시 사용해야 할 경우가 생긴다.)

<br>

## 5. is_valid, forms as HTML

```python
# articles/views.py

from IPython import embed

def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        embed()
```

```shell
In [1]: form
Out[1]: <ArticleForm bound=True, valid=Unknown, fields=(title;content)>

In [2]: request.POST
Out[2]: <QueryDict: {'csrfmiddlewaretoken': ['~~~~'], 'title': ['제목제목'], 'content': ['내용내용']}>

In [3]: type(form)
Out[3]: articles.forms.ArticleForm

In [4]: form.is_valid() # is_valid를 수행하면 form을 찍었을 때 valid의 값이 unknown에서 True로 바뀜
Out[4]: True

In [5]: form
Out[5]: <ArticleForm bound=True, valid=True, fields=(title;content)>

In [7]: form.cleaned_data # cleaned_data를 수행하면 정제된 dict 형태의 데이터가 출력된다.
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

:checkered_flag: [추가] <b>`initial`</b>

- form 나타날 때 해당 필드의 초기 값
- 초기 값을 설정하는 인수는 딕셔너리 자료형이어야 한다.

```python
# article.__dict__ 확인해보기

# articles/views.py

def update(request, article_pk):
		...
    else:
        embed()
        form = ArticleForm(initial=article.__dict__)
		...
```

```shell
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

## 6. url resolver

- `request.resolver_match` 까보기

  ```python
  # articles/views.py
  
  def create(request):
      embed()
  ```

  ```shell
  In [1]: request                                               
  Out[1]: <WSGIRequest: GET '/articles/create/'>
  
  In [2]: dir(request)               
  Out[2]: 
  ['COOKIES',
   'FILES',
   'GET',
   'META',
   'POST',
   ...,
   'resolver_match',
   'scheme',
   'session',
   'upload_handlers',
   'user',
   'xreadlines']
  
  In [3]: request.resolver_match               
  Out[3]: ResolverMatch(func=articles.views.create, args=(), kwargs={}, url_name=create, app_names=['articles'], namespaces=['articles'], route=articles/create/)
  
  In [4]: dir(request.resolver_match)                           
  Out[4]: 
  ['__class__',
   '__delattr__',
   ...
   'app_name',
   'app_names',
   'args',
   'func',
   'kwargs',
   'namespace',
   'namespaces',
   'route',
   'url_name',
   'view_name']
  
  In [5]: request.resolver_match.url_name                       
  Out[5]: 'create'
  ```

<br>

## 7. session 사용하기

```python
# articles/views.py

def index(request):
    embed()
    ...
```

```shell
In [1]: request.session                                                               
Out[1]: <django.contrib.sessions.backends.db.SessionStore at 0x106bc8cf8>

In [2]: dir(request.session)                                                          
Out[2]: 
[...,
 '_get_session',
 '_get_session_from_db',
 '_get_session_key',
 '_hash',
 '_session',
 '_session_key',
 '_set_session_key',
 '_validate_session_key',
 ...,
 'has_key',
 'is_empty',
 'items',
 'keys',
 'load',
 'model',
 'modified',
 'pop',
 'save',
 'serializer',
 'session_key',
 'set_expiry',
 'set_test_cookie',
 'setdefault',
 'test_cookie_worked',
 'update',
 'values']

In [3]: request.session._session                                                      
Out[3]: 
{'_auth_user_id': '1',
 '_auth_user_backend': 'django.contrib.auth.backends.ModelBackend',
 '_auth_user_hash': '~~~'}

In [4]: request.session.items()                                                       
Out[4]: dict_items([('_auth_user_id', '1'), ('_auth_user_backend', 'django.contrib.auth.backends.ModelBackend'), ('_auth_user_hash', '~~~')])

In [5]: request.session.get('_auth_user_id')
Out[5]: '1'
```

```python
# articles/views.py

def index(request):
    # visits_num은 기본적으로 존재하지 않은 키 이므로 키가 없다면(방문한적이 없다면) 0 값을 가져오도록 한다.
    visits_num = request.session.get('visits_num', 0)
    # 그리고 가져온 값은 session에 visits_num에 매번 1씩 증가한 값으로 할당한다. (유저의 다음 방문을 위해)
    request.session['visits_num'] = visits_num + 1
    embed()
    # session data 안에 있는 특정 새로운 정보를 수정했다면 django는 수정한 사실을 알아채지 못하기 때문에 다음과 같이 설정.
    request.session.modified = True
    ...
```

```shell
In [1]: request.session._session                                                      
Out[1]: 
{'_auth_user_id': '1',
 '_auth_user_backend': 'django.contrib.auth.backends.ModelBackend',
 '_auth_user_hash': '~~~',
 'visits_num': 1}

In [2]: request.session.get('visits_num')                                            
Out[2]: 1
```

<br>

## 8. `next` query string parameter

```python
def login(request):
    if request.user.is_authenticated:
        return redirect('articles:index')

    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            embed()
            return redirect(request.GET.get('next') or 'articles:index')
```

```shell
In [1]: request.GET
Out[1]: <QueryDict: {'next': ['/articles/create/']}>

In [2]: request.GET.get('next')
Out[2]: '/articles/create/
```

---

:checkered_flag: ​ [추가]<b>로그인 상태에 따른 return 값 확인</b> - `is_anonymous`, `is_authenticated`, `is_superuser`

- `비로그인` 상태

  ![비로그인상태](https://user-images.githubusercontent.com/52685250/67172549-b5da5580-f3f6-11e9-93a9-479fe20c631e.JPG)

- `관리자 계정`으로 로그인 상태

  ![관리자 계정](https://user-images.githubusercontent.com/52685250/67172550-b672ec00-f3f6-11e9-8fb5-2cc6997ccafa.JPG)

- `일반 계정`으로 로그인 상태

  ![일반계정](https://user-images.githubusercontent.com/52685250/67172551-b672ec00-f3f6-11e9-93dd-43e4c8d5fd52.JPG)

 

---

<br>

## 9. [중요!] Model relationships(M : N)

:ballot_box_with_check: <b><u>환자와 의사의 예약 시스템을 구축하라는 프로젝트</u></b>

- 모델링(`models.py`)

  ```python
  from django.db import models
  
  class Doctor(models.Model):
      name = models.TextField()
  
      def __str__(self):
          return f'{self.pk}번 의사 {self.name}'
  
  
  class Patient(models.Model):
      name = models.TextField()
      doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
  
      def __str__(self):
          return f'{self.pk}번 환자 {self.name}'
  ```

### (1) 1:N의 한계 (shell_plus로 객체 생성 후 확인)

- 불필요한 필드(같은 환자 이름을 가진 필드)를 또 만들어야 하는 문제점이 발생한다.

  ```shell
  In [1]: doctor1 = Doctor.objects.create(name='justin')
  
  In [2]: doctor2 = Doctor.objects.create(name='zzulu')
  
  In [3]: patient1 = Patient.objects.create(name='tak', doctor=doctor1)
  
  In [4]: patient2 = Patient.objects.create(name='harry', doctor=doctor2)
  
  In [5]: doctor1
  Out[5]: <Doctor: 1번 의사 justin>
  
  In [6]: doctor2
  Out[6]: <Doctor: 2번 의사 zzulu>
  
  In [7]: patient1
  Out[7]: <Patient: 1번 환자 tak>
  
  In [8]: patient2
  Out[8]: <Patient: 2번 환자 harry>
  
  # 1번 환자(tak)가 justin 의사가 마음에 안들어 다른 의사 zzulu(doctor2)에게 방문하려고 한다.
  # 기존 객체 patient 를 삭제하지 않고 어떻게 추가할 수 있을까?
  In [9]: patient3 = Patient.objects.create(name='tak', doctor=doctor2)
  
  In [10]: patient3
  Out[10]: <Patient: 3번 환자 tak>
  
  In [11]: patient3.doctor.name
  Out[11]: 'zzulu'
  
  In [12]: patient4 = Patient.objects.create(name='harry', doctor=doctor1)
  
  # 2번 환자 (harry)가 다른 의사 justin(doctor)에게도 방문하려고 한다. (에러)
  In [13]: patient4 = Patient.objects.create(name='harry', doctor=doctor1, doctor2)
  File "<ipython-input-9-6edaf3ffb4e6>", line 1
      patient4 = Patient.objects.create(name='harry', doctor=doctor1, doctor2)
                                                                     ^
  SyntaxError: positional argument follows keyword argument
  
  # 이렇게는 가능?
  In [14]: patient4 = Patient.objects.create(name='harry', doctor=doctor1, doctor=doctor2)
    File "<ipython-input-13-2775590f4f3f>", line 1
      patient4 = Patient.objects.create(name='harry', doctor=doctor1, doctor=doctor2)
                                                                     ^
  SyntaxError: keyword argument repeated
  ```

  - 방문 예약을 바꾸는 것이 불가능하다.
    - 즉, tak이 1번 의사한테 예약을 했다가 1번이 아닌 2번 의사로 방문 예약을 바꾸려면 어떻게 해야 할까...? 새로운 객체를 생성해서 예약해야 한다.
  - 다른 의사를 방문한 기록을 남길 수 없다.
    - 동일한 환자(harry)지만 다른 의사에게 예약하기 위해서는 객체를 하나 더 만들어서 예약을 진행해야 한다. `1, 2` 형태로 쓰려면 튜플, 리스트 같은 자료형이 되기 때문에 Integer가 아니라 안된다. (`doctor_id` 는 1, 2 처럼 정수 형태여야 하며 (1, 2) 이런 식으로 값을 받을 수 없다.

<br>

### (2) 중개 모델 생성

![중개 모델](https://user-images.githubusercontent.com/52685250/67262400-9c610880-f4df-11e9-9904-a8ebb314966b.JPG)

- 모델링(`models.py`)

  ```python
  # manytomany/models.py
  
  class Doctor(models.Model):
      name = models.TextField()
  
      def __str__(self):
          return f'{self.pk}번 의사 {self.name}'
  
  
  class Patient(models.Model):
      name = models.TextField()
      # 외래키 삭제
  
      def __str__(self):
          return f'{self.pk}번 환자 {self.name}'
  
  # 중개모델 작성
  class Reservation(models.Model):
      doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
      patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
  
      def __str__(self):
          return f'{self.doctor_id}번 의사의 {self.patient_id}번 환자'
  ```

  ```shell
  In [1]: doctor1 = Doctor.objects.create(name='justin')
  
  In [3]: patient1 = Patient.objects.create(name='tak')
  
  In [5]: Reservation.objects.create(doctor=doctor1, patient=patient1)
  Out[5]: <Reservation: 1번 의사의 1번 환자>
  
  In [6]: doctor1.reservation_set.all()
  Out[6]: <QuerySet [<Reservation: 1번 의사의 1번 환자>]>
  
  In [7]: patient1.reservation_set.all()
  Out[7]: <QuerySet [<Reservation: 1번 의사의 1번 환자>]>
  
  In [8]: patient2 = Patient.objects.create(name='harry')
  
  In [9]: Reservation.objects.create(doctor=doctor1, patient=patient2)
  Out[9]: <Reservation: 1번 의사의 2번 환자>
  
  In [10]: doctor1.reservation_set.all()
  Out[10]: <QuerySet [<Reservation: 1번 의사의 1번 환자>, <Reservation: 1번 의사의 2번 환자>]>
  
  In [11]: for reservation in doctor1.reservation_set.all():
      ...:     print(reservation.patient.name)
      ...: 
  tak
  harry
  ```

  - 1 : N 의 한계점을 해결하기 위해 중개모델을 생성하여 어느 의사가 어느 환자와 매칭되는지 알 수 있다.
  - docotr1의 환자 목록을 보고 싶다면
    - N에서 1을 참조하는 건 바로 접근
    - 1에서 N을 참조하기 위해서는 ORM이 확신을 할 수 없어 `_set` 으로 접근

<br>

### (3) `Through` option - 중개 모델을 거치지 않고 바로 가져오기

- 중개 모델을 거치지 않고 직접 서로 테이블을 참조하는 option
- **`ManyToManyField`는 실제적인 물리적인 필드가 DB에 생기는 것이 아니다.**

- 모델링(`models.py`)

  참조하는 사람 쪽에 M2M 필드 설정 (아래와 같은 경우는 환자가 의사를 참조하므로 환자쪽에 M2M 필드)

  ```python
  # manytomany/models.py
  
  class Patient(models.Model):
      name = models.TextField()
  		# 중개 모델인 Reservation 클래스를 등록
      # M:N 관계 설정을 환자가 의사를 참조하도록 설정 (MTM 필드를 Patient 에 작성)
      doctors = models.ManyToManyField(Doctor, through='Reservation')
  
  		def __str__(self):
          return f'{self.id}번 환자 {self.name}'
  ```

  ```shell
  In [1]: patient1 = Patient.objects.get(pk=1)
  
  In [2]: patient1
  Out[2]: <Patient: 1번 환자 tak>
  
  # 기존 - 중개모델
  # tak 환자의 모든 예약 목록
  In [3]: patient1.reservation_set.all()
  Out[3]: <QuerySet [<Reservation: 1번 의사의 1번 환자>]>
  
  # 변경 - M2M 필드 변경
  In [4]: patient1.doctors.all()
  Out[4]: <QuerySet [<Doctor: 1번 의사 justin>]>
  
  # 새로운 의사 추가
  In [5]: doctor2 = Doctor.objects.create(name='zzulu')
  
  # 중개 모델을 통해 1번 환자와 2번 환자 연결
  In [6]: Reservation.objects.create(doctor=doctor2, patient=patient1)
  Out[6]: <Reservation: 2번 의사의 1번 환자>
  
  # 기존 - 중개모델
  # TAK 환자의 모든 예약 목록
  In [7]: patient1.reservation_set.all()
  Out[7]: <QuerySet [<Reservation: 1번 의사의 1번 환자>, <Reservation: 2번 의사의 1번 환자>]>
  
  # 1번 환자가 예약한 의사 목록
  In [8]: patient1.doctors.all()
  Out[8]: <QuerySet [<Doctor: 1번 의사 justin>, <Doctor: 2번 의사 zzulu>]>
  ```

  - 그럼 의사 입장에서 환자 목록을 보기 위해서는 어떻게 해야할까?
    - 여전히 `patient_set.all()` 이라고 한 이유는 애초에 M:N 관계 설정을 환자가 의사를 참조하도록 설정했기 때문이다. (MTM 필드를 Patient 에 작성했기 때문)
    - 1:N 관계와는 다르게 무조건 이렇게 참조해야 하는 것이 아니라 반대로 환자들을 의사가 참조하게 모델을 설계할 수도 있다. (MTM 필드를 Doctor 에 작성해도 됨)
    - patient를 기준으로 doctor를 참조하도록 설정했기 때문에 doctor가 patient를 참조할 때 그 수를 보장할 수 없기 때문에 `patient_set`으로 찾게 된다.

  ```shell
  In [10]: doctor2
  Out[10]: <Doctor: 2번 의사 zzulu>
  
  In [11]: doctor2.patient_set.all()
  Out[11]: <QuerySet [<Patient: 1번 환자 tak>]>
  ```

<br>

### (4) `related_name` option - Doctor도 patients를 참조하기

- `related_name`
  - 참조되는 대상이 참조하는 대상을 찾을 때(역참조), 어떻게 불러 올지에 정의한다.
  - MTOM(ManyToMany) 필드가 없는 테이블이 있는 테이블을 참조할 때 사용한다.
  - **<u>필수적으로 사용하는 건 아니지만 필수적인 상황이 발생할 수 있다.</u>**

- 모델링(`models.py`)

  ```python
  # manytomany/models.py
  
  class Patient(models.Model):
      name = models.CharField(max_length=20)
      doctors = models.ManyToManyField(Doctor, through='Reservation', related_name='patients')
      ...
  ```

  ```shell
  # 1. 1번 의사 불러오기
  In [1]: doctor1 = Doctor.objects.get(pk=1)
  
  In [2]: doctor1
  Out[2]: <Doctor: 1번 의사 justin>
  
  
  # 2. 1번 의사에게 예약한 모든 환자 목록!
  # 기존 - 에러 발생 (related_name 을 설정하면 기존 _set 은 사용할 수 없다.)
  In [3]: doctor1.patient_set.all()
  AttributeError: 'Doctor' object has no attribute 'patient_set'
  
  
  # 변경 - 이제는 1:N 에서 역참조 이름 설정과 동일!
  In [4]: doctor1.patients.all()
  Out[4]: <QuerySet [<Patient: 1번 환자 tak>, <Patient: 2번 환자 harry>]>
  ```

<br>

### (5) ManyToMany

- 최종 모델링(`models.py`)

  ```python
  from django.db import models
  
  class Doctor(models.Model):
      name = models.TextField()
  
      def __str__(self):
          return f'{self.pk}번 의사 {self.name}'
  
  
  class Patient(models.Model):
      name = models.TextField()
      doctors = models.ManyToManyField(Doctor, related_name='patients') # through 삭제
  
      def __str__(self):
          return f'{self.pk}번 환자 {self.name}'
  
  
  # Reservation class 삭제
  ```

- 테이블의 이름 확인하면 `manytomany_patient_doctors` 라는 테이블이 보인다.

  ```sqlite
  $ sqlite3 db.sqlite3
  
  sqlite> .tables
  auth_group                  django_migrations
  auth_group_permissions      django_session
  auth_permission             manytomany_doctor
  auth_user                   manytomany_patient
  auth_user_groups            manytomany_patient_doctors
  auth_user_user_permissions  onetomany_article
  django_admin_log            onetomany_comment
  django_content_type         onetomany_user
  
  
  sqlite> .schema manytomany_patient_doctors
  CREATE TABLE IF NOT EXISTS "manytomany_patient_doctors" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "patient_id" integer NOT NULL REFERENCES "manytomany_patient" ("id") DEFERRABLE INITIALLY DEFERRED, "doctor_id" integer NOT NULL REFERENCES "manytomany_doctor" ("id") DEFERRABLE INITIALLY DEFERRED);
  CREATE UNIQUE INDEX "manytomany_patient_doctors_patient_id_doctor_id_23ab539b_uniq" ON "manytomany_patient_doctors" ("patient_id", "doctor_id");
  CREATE INDEX "manytomany_patient_doctors_patient_id_cb4ef2b1" ON "manytomany_patient_doctors" ("patient_id");
  CREATE INDEX "manytomany_patient_doctors_doctor_id_7b77037d" ON "manytomany_patient_doctors" ("doctor_id");
  
  # 스키마를 살펴보면 patient_id와 doctor_id가 자동으로 만들어 진 것을 볼 수 있다.
  # 우리 테이블 상의 변화는 없다. 
  ```

- shell_plus로 확인하기

  ```shell
  In [2]: doctor1 = Doctor.objects.create(name='justin')
  In [3]: patient1 = Patient.objects.create(name='tak')
  
  In [4]: doctor1
  Out[4]: <Doctor: 1번 의사 justin>
  
  In [5]: patient1
  Out[5]: <Patient: 1번 환자 tak>
  ```

  - 예약 등록

  ```python
  # 1. doctor1(justin)에게 예약을 한다. 누가? patient1(tak)이!
  In [6]: doctor1.patients.add(patient1)
  # patient1.doctors.add(doctor1)도 상관없음
  
  # 2. doctor1 -> 자신의 예약 목록 확인
  In [7]: doctor1.patients.all() 
  Out[7]: <QuerySet [<Patient: 1번 환자 tak>]>
  
  # 3. patient1 -> 자신이 예약한 의사
  In [8]: patient1.doctors.all()
  Out[8]: <QuerySet [<Doctor: 1번 의사 justin>]>
  ```

  -  삭제는 어떻게 할까? 기존에는 해당하는 Reservation을 찾아서 지워야 했다면, 이젠 아래와 같이 지울 수가 있다. 

  ```shell
  # 1. doctor1(justin)의 환자 목록에서 patient1(tak) 예약 취소
  In [9]: doctor1.patients.remove(patient1)
  # patient1.doctors.remove(doctor1) 도 가능
  
  In [10]: doctor1.patients.all()
  Out[10]: <QuerySet []>
  
  In [11]: patient1.doctors.all()
  Out[11]: <QuerySet []>
  ```

  - 중개 모델을 생성하지 않고 `doctor`에서는 `patients.all()`로, `patients`에서는 `doctors.all()`로 서로 접근할 수 있다.
  - 그렇다면 중개모델은 필요가 없는가??? => :no_entry_sign:<b><u>아니다!</u></b>
    - 예약한 시간 정보를 담는다거나 하는 경우(= 추가적인 필드가 필요한 경우)에는 반드시 중개모델을 만들어서 진행을 해야되는 상황도 있다.
    - 다만 그럴 필요가 없는 경우 위와 같이 해결할 수 있다.

<br>

## 10. 추가 개념 정리

### (1)`ForeignKey` (참조 키, 외래 키) <a href="https://docs.djangoproject.com/en/2.2/ref/models/fields/#foreignkey">(django 공식 문서)</a>

- 개념
  - 외래 키는 참조하는 테이블에서 1개의 키(속성 또는 속성의 집합), 참조하는 측의 변수는 참조되는 측의 테이블의 키를 가리킨다.
  - 하나(또는 복수)의 다른 테이블의 기본 키 필드를 가리키는 데이터의 <u>참조 무결성을 확인</u>하기 위하여 사용된다.
- 특징
  - 외래 키의 값으로는 **부모 테이블에 존재하는 키의 값만 넣을 수 있다.**
  - 외래 키를 사용하여 부모 테이블의 유일한 값을 참조한다.(부모 테이블의 기본 키)

<br>

### (2)`on_delete` (`models.py`에서 models.ForeignKey의 필수 속성)

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

### (3) `is_valid`, `cleaned_data`

:heavy_check_mark: `is_valid`

- <b>Form 객체의 유효성 검사</b>를 하는데 가장 중요한 역할.
- Form 객체가 생성되면, 유효성 검사를 하고 유효한지 아닌지 여부를 boolean으로 반환.

:heavy_check_mark: `cleaned_data`

- 유효성 검사 후 깔끔하고 정제된 dict 형태에서 데이터를 가져오는 방법.
- <b>`request.POST.get('title')` 은 이제 절대 추천하지 않는다.</b>

<br>

### (4) Forms as HTML

| Forms        | 내용                                      |
| ------------ | ----------------------------------------- |
| `as_p()`     | 각 필드가 단락(paragraph)으로 랜더링      |
| `as_ul()`    | 각 필드가 목록 항목(list item)으로 랜더링 |
| `as_table()` | 각 필드가 테이블 행으로 랜더링            |

<br>

### (5) `is_authenticated`

- User model의 속성들 중 하나임
- 사용자가 인증 되었는지 알 수 있는 방법
- User 에는 항상 True / AnnoymousUser에 대해서만 항상 False
- 단, 이것은 권한(permission)과는 관련이 없으며 사용자가 활동중(active)이거나 유효한 세션(valid session)을 가지고 있는지도 확인하지 않는다.
- 일반적으로` request.user` 에서 이 속성을 사용하여 미들웨어의 `django.contrib.auth.middleware.AuthenticationMiddleware` (`settings.py` > `MIDDLEWARE` 내부에 있는 있음)를 통과했는지 확인한다.

<br>

### (6) `settings.AUTH_USER_MODEL`

> `articles` > `models.py`
>
> - `settings.py`에 `AUTH_USER_MODEL`에 대해 나와 있지 않음
> - `AUTH_USER_MODEL = 'auth.User'`가 기본값이기 때문이다.
>
> ```python
> from django.conf import settings
> 
> # Article 클래스에 추가
> user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
> ```

> `forms.py` > `ArticleForm`
>
> ```python
> fields = ('title', 'content',) # 구문 수정
> ```

- `get_user_model()` : return 값이 `class`
- `settings.AUTH_USER_MODEL` : return 값이 `str`

<br>

### (7) `get_or_create` <a href="https://docs.djangoproject.com/en/2.2/ref/models/querysets/#get-or-create" target="_blank">(공식문서)</a>

- `get_or_create(defaults=None, **kwargs)`

  - 주어진 kwargs로 객체를 찾으며 필요한 경우 하나를 만든다.
  - `(object, created)` 형태의 tuple을 return 한다.
    - `object` : 검색 또는 생성된 객체
    - `created` : 새 객체 생성 여부를 지정하는 boolean 값(새로 만들어진 object 라면 True, 기존에 존재하던 object 라면 False)
  - 단, 이 메서드는 DB가 키워드 인자의 `unique` 옵션을 강제하고 있다고 가정하고 실행된다.
    - 중복 object 발생하는 것을 방지하기 위해

  - 이는 요청이 병렬로 작성될 때(`try ~ except DoesNotExist`) 및 중복 코드에 대한 문제 방지로 중복 오브젝트가 작성되는 것을 예방한다.

<br>

### (8) `unique` 속성 <a href="https://docs.djangoproject.com/en/2.2/ref/models/fields/#unique" target="_blank">(공식 문서)</a>

- True인 경우 이 필드는 테이블 전체에서 고유한 값이어야 한다.
- 유효성 검사(`is_valid`)단계에서 실행되며 중복 값이 있는 모델을 저장하려고 하면 `.save()` 메서드로 인해 `IntegrityError`가 발생한다.

- ManyToManyField 및 OneToOneField 를 제외한 모든 필드 유형에서 유효하다.


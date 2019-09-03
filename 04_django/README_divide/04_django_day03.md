# :notebook_with_decorative_cover: 04_django - Day03

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

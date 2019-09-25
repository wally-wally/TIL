# [SSAFY]Django_#2(written by wally-wally)

----

**※참고사항※**

- `[SSAFY]Django_#2`은 정규과정 `Django`을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

## 5. 9월11일(05일차)

### 5.1 Django Modeling, Migrations 주의사항

- Modeling

```python
class Articles(models.Model):
    title = models.CharField(max_length=20)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) # 기본값
    updated_at = models.DateTimeField(auto_now=True) # 기본값

    def __str__(self):
        return self.title
```

- migrations  과정

```bash
[1] python manage.py makemigrations
```

```bash
[optional과정] python manage.py sqlmigrate articles 0001

# 단순히 확인하는 과정
BEGIN;
--
-- Create model Articles
--
CREATE TABLE "articles_articles" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "title" varchar(20) NOT NULL, "content" text NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
COMMIT;
```

```bash
[2]python manage.py migrate => 테이블 실질적으로 만드는 과정
```

```bash
[3]python manage.py createsuperuser => 테이블 생성 후 슈퍼유저 생성하기
```

:warning: 만약에 migrations 과정 중 중간에 실수(`admin.py` 잘못 작성하는 것)하면 migratinos 폴더 내에 있는 파이썬 파일과 생성된 `db.sqlite3` 을 지우고 다시 처음부터 수행한다.

<br>

### 5.2 git 응용 <a href="https://github.com/wally-wally/TIL/blob/master/00_startcamp/README_divide/00_startcamp_day02.md#22-git의-특징-및-작업-흐름">:rocket:(Go to git basic)</a>

#### (1) git branch의 특징

- branch는 나뭇가지의 비유적 표현을 가져온 것이다.
- master는 유지한 채 새로운 branch를 만들어서 다른 사용자가 수정할 수 있다.

- 매우 가볍다.
- 순식간에 branch를 만들고 branch 사이를 이동할 수 있다.
- git이 가지고 온 혁신 중 하나는 branch 기능을 매우 쓸 만한 수준까지 만들었다는 것이다.

<br>

#### (2) git branch 사용

---

:heavy_check_mark: 사전 준비 : `master` 상태에서 `touch a.txt`, `touch b.txt`로 파일 먼저 생성

```bash
student@DESKTOP MINGW64 ~/Desktop/git_branch
$ git init
Initialized empty Git repository in C:/Users/student/Desktop/git_branch/.git/

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git branch

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ touch a.txt

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ touch b.txt

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ ls
a.txt  b.txt

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        a.txt
        b.txt

nothing added to commit but untracked files present (use "git add" to track)

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git add .

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git commit -m "first commit"
[master (root-commit) a60972a] first commit
 2 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 a.txt
 create mode 100644 b.txt

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git log
commit a60972accc54169981ef6729e473745869e19900 (HEAD -> master)
Author: wally-wally <wallys0213@gmail.com>
Date:   Wed Sep 11 11:44:46 2019 +0900

    first commit
```

---

- `git branch` : branch 목록 확인
  - 초록색으로 현재 있는 위치를 알 수 있음
- `git branch 이름명` : 이름명으로 branch 생성(ex. `git branch ssafy`)

- `git checkout 이름명` : 이름명 branch로 이동(ex. `git checkout ssafy`)

- branch명이 `ssafy`인 상태에서 `touch c.txt`로 파일 생성 후 commit 후 다시 `master`로 돌아가면...
  - `master` 상태 : `a.txt`, `b.txt`만 보임
  - `ssafy` 상태 : `c.txt`도 같이 보임

```bash
student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ ls
a.txt  b.txt

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git checkout ssafy
Switched to branch 'ssafy'

student@DESKTOP MINGW64 ~/Desktop/git_branch (ssafy)
$ ls
a.txt  b.txt  c.txt
```

- branch를 지우고 싶으면 `master`로 돌아가서 수행한다.

```bash
student@DESKTOP MINGW64 ~/Desktop/git_branch (ssafy)
$ git checkout master
Switched to branch 'master'

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git branch -d ssafy
error: The branch 'ssafy' is not fully merged.
If you are sure you want to delete it, run 'git branch -D ssafy'. # 병합 안했는데 진짜로 지울래? 그러면 대문자 D로 쳐!

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git branch -D ssafy
Deleted branch ssafy (was 580d458).

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git branch
* master
```

- `git checkout -b branch_name` : `git branch branch_name` + `git checkout branch_name` 두 명령어를 하나로 명령할 때(앞으론 이 한 줄로 작성하자)

<br>

#### (3) git merge

- `git merge branch_name` : 병합(merge)은 `master` 에서 수행하자

**:heavy_check_mark: merge(병합)가 되는 상황**

**① Fast-forward**

```bash
student@DESKTOP MINGW64 ~/Desktop/git_branch (feature/test)
$ touch test.txt

student@DESKTOP MINGW64 ~/Desktop/git_branch (feature/test)
$ git add .

student@DESKTOP MINGW64 ~/Desktop/git_branch (feature/test)
$ git commit -m "complete test.txt"
[feature/test 0c73ba2] complete test.txt
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 test.txt

student@DESKTOP MINGW64 ~/Desktop/git_branch (feature/test)
$ git checkout master
Switched to branch 'master'

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git merge feature/test
Updating a60972a..0c73ba2
Fast-forward
 test.txt | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 test.txt

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git log
commit 0c73ba206953949282ba9e6013e8e9340dfb1650 (HEAD -> master, feature/test)
Author: wally-wally <wallys0213@gmail.com>
Date:   Wed Sep 11 13:40:13 2019 +0900

    complete test.txt

commit a60972accc54169981ef6729e473745869e19900
Author: wally-wally <wallys0213@gmail.com>
Date:   Wed Sep 11 11:44:46 2019 +0900

    first commit
```

- log 정보가 많을 때 `git log --oneline --graph`로 입력하면 한 눈에 branch 상태를 알 수 있다.

**② Merge-commit**

```bash
student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git merge feature/signout
Merge made by the 'recursive' strategy.
 login.txt   | 0
 signout.txt | 0
 2 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 login.txt
 create mode 100644 signout.txt
 
# 위 커멘드 입력 후 상황에서 빠져나올 때 [Esc] 누르고 :wq 를 입력 후 [Enter] 치면 된다.

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git log --oneline --graph
*   b9bf4c8 (HEAD -> master) Merge branch 'feature/signout'
|\
| * 4ea2154 (feature/signout) Complete login.txt
| * fe480fa Complete signout.txt
* | 6ec542b Make master.txt
|/
* 0c73ba2 complete test.txt
* a60972a first commit

```

**③ Merge-conflict**

- 사람이 직접 수정하는 방식

```bash
student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git commit -m "fix a.txt master"
[master 711e35a] fix a.txt master
 1 file changed, 1 insertion(+)

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git merge feature/article
Auto-merging a.txt
CONFLICT (content): Merge conflict in a.txt
Automatic merge failed; fix conflicts and then commit the result.
```

> `a.txt`
>
> ```
> <<<<<<< HEAD
> 이건 master 가 작성한 글.
> =======
> 이건 feature/article에서 작성한 글.
> >>>>>>> feature/article
> 
> 
> 아래와 같이 수정
> 
> 이건 master 가 작성한 글.
> ```

```bash
student@DESKTOP MINGW64 ~/Desktop/git_branch (feature/article)
$ git checkout master
Switched to branch 'master'

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   a.txt

no changes added to commit (use "git add" and/or "git commit -a")

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git add .

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git commit -m "fix a.txt master"
[master 711e35a] fix a.txt master
 1 file changed, 1 insertion(+)

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git merge feature/article
Auto-merging a.txt
CONFLICT (content): Merge conflict in a.txt
Automatic merge failed; fix conflicts and then commit the result.

student@DESKTOP MINGW64 ~/Desktop/git_branch (master|MERGING)
$ git add .

student@DESKTOP MINGW64 ~/Desktop/git_branch (master|MERGING)
$ git commit
[master 9897c23] Merge branch 'feature/article'

student@DESKTOP MINGW64 ~/Desktop/git_branch (master)
$ git log --oneline --graph
*   9897c23 (HEAD -> master) Merge branch 'feature/article'
|\
| * 977313c (feature/article) fix a.txt
* | 711e35a fix a.txt master
|/
*   b9bf4c8 Merge branch 'feature/signout'
|\
| * 4ea2154 Complete login.txt
| * fe480fa Complete signout.txt
* | 6ec542b Make master.txt
|/
* 0c73ba2 complete test.txt
* a60972a first commit
```

<br>

### 5.3 merge 종류

#### (1) feature branch workflow

- `Pull request`
  - 기능 개발을 끝내고 master에 바로 병합시키는게 아니라, branch를 중앙 원격 저장소에 올리고(push) master에 병합을 요청(merge)
  - **중앙에서 병합을 했다면, 다른 팀원들은 master branch를 pull 받아야 한다!**

#### (2) forking workflow

- git remote add upstream [중앙 원격 저장소 주소]
  - [중앙 원격 저장소 주소] : master의 원래 주소
- git remote -v
- git checkout -b feature/login
- 내용 수정 후
- git push -u origin feature/login

---

:ballot_box_with_check: Merge가 되는 상황들

**1.fast-forward**

- feature/test branch 이동

```bash
$ git checkout -b feature/test
$ (feature/test)
```

- 작업 완료 후 commit

```bash
$ touch test.md
$ git add .
$ git commit -m "Complete test.md"
```

- master 이동

```bash
$ git checkout master
$ (master)
```

- master에 병합

```bash
$ git merge feature/test
```

- 결과
  - 단순히 HEAD가 최신 commit으로 이동
  - `feature/test` branch 생성 이후 `master` branch의 이력에 변화가 없었기 때문
- branch 삭제

```bash
$ git branch -d feature/test
```

<br>

**2.megre commit**

- `feature/login` branch 이동

```bash
$ git checkout -b feature/login
```

- 작업 완료 후 commit

```bash
$ touch login.md
$ git add .
$ git commit -m "complete login.md"
```

- `master`로 이동

```bash
$ git checkout master
```

- `master`에 추가 commit 생성

```bash
$ touch master.md
$ git add .
$ git commit -m "fix master.md"
```

- `master`에 병합

```bash
$ git merge feature/login
```

- 자동으로 merge commit 발생
  - Vim 에디터로 열림
  - 메세지를 수정하고자 하면 `i`로 편집 모드 바꾼다음에 commit을 수정하고
  - `Esc` + `:wq`를 통해 저장 및 종료

```bash
Merge branch 'feature/login'

# Please enter a commit ...
...
```

- commit 그래프 확인하기

```bash
$ git log --oneline --graph
```

```bash
*   9897c23 (HEAD -> master) Merge branch 'feature/login'
|\
| * 977313c (feature/article) fix a.txt
* | 711e35a fix a.txt master
|/
*   b9bf4c8 Merge branch 'feature/signout'
|\
| * 4ea2154 Complete login.txt
| * fe480fa Complete signout.txt
* | 6ec542b Make master.txt
|/
* 0c73ba2 complete test.txt
* a60972a first commit
```

- branch 삭제

```bash
$ git branch -d feature/login
```

<br>

**3. merge comflict**

- `feature/article` branch 생성 및 이동

```bash
$ git checkout -b feature/aritcle
```

- 작업 완료 후 commit

```bash
# 충돌을 만들어 낼 파일에 코드를 작성
$ git add .
$ git commit -m "fixed minor update"
```

- `master`로 이동

```bash
$ git checkout master
```

- `master`에 추가 commit 만들기

```bash
# feature/article branch 에서 수정한 파일과 동일 파일의 같은 위치를 수정
$ git add .
$ git commit -m "fixed master update"
```

- `master`에 병합

```bash
$ git merge feature/article
```

- merge conflict 발생

```bash
$ git merge feature/article
Auto-mergin a.txt
CONFLICT ...
Automatic merge failed; fix conflicts and then commit result.
```

- 충돌 확인 및 해결

```bash
# 충돌이 일어난 파일 열기
# 그럼 아래와 같은 내용이 있다.

<<<<<<<< HEAD
master 에서 작성한 내용
========
feature/article 에서 작성한 내용
>>>>>>>> feature/article

# 원하는 코드로 수정
```

- merge commit 진행
  - 여기서는 commit 메세지는 미리 작성되어 있으므로 안 써도 된다.

```bash
$ git add .
$ git commit
```

- commit 그래프 확인

```bash
$ git log --oneline --graph

*   9897c23 (HEAD -> master) Merge branch 'feature/article'
|\
| * 977313c (feature/article) fix a.txt
* | 711e35a fix a.txt master
|/
*   b9bf4c8 Merge branch 'feature/signout'
|\
| * 4ea2154 Complete login.txt
| * fe480fa Complete signout.txt
* | 6ec542b Make master.txt
|/
* 0c73ba2 complete test.txt
* a60972a first commit
```

- branch 삭제

```bash
$ git branch -d feature/article
```

<br>

## 6. 9월18일(06일차)

### 6.1 URL Namespace

#### (1) 하드코딩 URL 제거

- `{% url %}`template tag를 사용하여 하드코딩 URL을 제거한다.

> `urls.py`
>
> - `name` 속성을 추가하여 일일히 url을 작성하는 번거로움을 줄여준다.
>
> ```django
> urlpatterns = [
> path('', views.index, name='index'),
> path('new/', views.new, name='new'),
> path('create/', views.create, name='create'),
> path('<int:pk>/', views.detail, name='detail'),
> path('<int:pk>/delete/', views.delete, name='delete'),
> path('<int:pk>/edit/', views.edit, name='edit'),
> path('<int:pk>/update/', views.update, name='update'),
> ]
> ```

> `detail.html`
>
> ```django
> {% extends 'base.html' %}
> 
> {% block content %}
> <h1 class="text-center">DETAIL</h1>
> <h2>{{ article.pk }} 번째 글</h2>
> <hr>
> <p>제목: {{ article.title }}</p>
> <p>내용: {{ article.content }}</p>
> <p>작성 시각: {{ article.created_at }}</p>
> <p>수정 시각: {{ article.updated_at }}</p>
> <hr>
> <a href="/articles/{{ article.pk }}/edit/">[EDIT]</a>
> <a href="/articles/{{ article.pk }}/delete/">[DELETE]</a><br>
> <a href="{% url 'index' %}">[back]</a>
> {% endblock %}
> ```

> `index.html`
>
> ```django
> {% extends 'base.html' %}
> 
> {% block content %}
> <h1 class="text-center">Articles</h1>
> <a href="/articles/new/">[NEW]</a>
> <hr>
> {% for article in articles %}
> <p>글 번호: {{ article.pk }}</p>
> <p>글 제목: {{ article.title }}</p>
> <p>글 내용: {{ article.content }}</p>
> <a href="{% url 'detail' article.pk %}">[DETAIL]</a>
> <hr>
> {% endfor %}
> {% endblock %}
> ```

<br>

#### (2) URL Namespace 설정

- 문제점 발생 : app이 여러 개가 되면, 단순히 url name만 가지고는 어떤 app의 url 인지 알 수 없다.
- 문제점 해결 : app의 `urls.py`에 `app_name`을 선언한다.

> `urls.py`
>
> ```django
> app_name = 'articles'
> urlpatterns = [
> path('', views.index, name='index'),
> path('new/', views.new, name='new'),
> path('create/', views.create, name='create'),
> path('<int:pk>/', views.detail, name='detail'),
> path('<int:pk>/delete/', views.delete, name='delete'),
> path('<int:pk>/edit/', views.edit, name='edit'),
> path('<int:pk>/update/', views.update, name='update'),
> ]
> ```

> `detail.html`
>
> - `{% url 'articles:edit' article.pk %}` 에서 공백으로 `'articles:edit'` 과 `article.pk`를 구분한다.
>
> ```django
> {% block content %}
> <h1 class="text-center">DETAIL</h1>
> <h2>{{ article.pk }} 번째 글</h2>
> <hr>
> <p>제목: {{ article.title }}</p>
> <p>내용: {{ article.content }}</p>
> <p>작성 시각: {{ article.created_at }}</p>
> <p>수정 시각: {{ article.updated_at }}</p>
> <hr>
> <a href="{% url 'articles:edit' article.pk %}">[EDIT]</a>
> <a href="{% url 'articles:delete' article.pk %}">[DELETE]</a><br>
> <a href={% url 'articles:index' %}[back]</a>
> {% endblock %}
> ```

> `views.py`
>
> - `return redirect(f'/articles/{article.pk}/')` => `return redirect('articles:detail', article.pk)`
>
> ```python
> def create(request):
> try: 
>   title = request.POST.get('title')
>   content = request.POST.get('content')
>   article = Article(title=title, content=content)
>   article.full_clean() # 유효성 검증
> except ValidationError:
>   raise ValidationError('Error')
> else:
>   article.save()
>   return redirect('articles:detail', article.pk)
> ```

<br>

### 6.2 HTTP

#### (1) HTTP의 속성

- 비연결성(Connectionless) : 클라이언트와 서버가 한 번 연결을 맺은 후, 클라이언트 요청에 대해 서버가 응답을 마치면 맺었던 연결을 끊어버리는 성질
- 무상태(Stateless) : Connectionless로 인해 서버는 클라이언트를 식별할 수가 없는데, 이를 Stateless라고 함
  - 매번 새로운 인증을 해야하는 번거로움이 발생하는데 이를 해결하기 위해 상태를 기억하는 방법 중 `쿠키`와 `세션`이 있다.

<br>

#### (2) Cookie, Session

- `쿠키(Cookie)` : 브라우저가 가지고 있는 쿠키
  - 하지만 이 쿠키는 보안에 취약한 특징이 있어 서버가 쿠키를 들고 있는 `세션` 개념이 새로 생김
  - 보통 브라우저에서 사용자 기록 삭제하는 것이 쿠키 삭제하는 것임
- `세션(Session)` : 서버가 가지고 있는 쿠키
  - 보통 회원탈퇴하는 것이 세션이 들고 있는 쿠키 삭제하는 것임

<br>

#### (3) <a href="https://developer.mozilla.org/ko/docs/Web/HTTP/Status">HTTP 응답 코드</a>

- `200` : 요청이 성공적으로 됨.
- `400` (Bad Request) : 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미
- `401` (Unauthorized) : 비인증을 의미하며 클라이언트는 요청한 응답을 받기 위해 반드시 스스로를 인증해야 함
- `404` (Not Found) : 서버에서 요청받은 리소스를 찾을 수 없음 의미. 브라우저에서는 알려지지 않은 URL을 의미함
- `500` (Internal Server Error) : 서버에서 문제가 발생했는데 해결 방법을 알 수 없음.

<br>

#### (4) <a href="https://developer.mozilla.org/ko/docs/Web/HTTP/Methods">HTTP Method</a>

- `GET` : 특정 리소스의 표시를 요청한다. `GET`을 사용하는 요청은 오직 데이터를 받기만 한다.
- `POST` : 특정 리소스에 엔티티를 제출할 때 쓰임
- `PATCH` : 리소스의 부분만을 수정하는 데 쓰임
- `PUT` : 목적 리소스 모든 현재 표시를 요청 payload로 바꿈
- `DELETE` : 특정 리소스를 삭제함
- 실제로는 네 가지 메소드 중 공식적으로 GET, POST로만 사용된다.

<br>

### 6.3 URI, URL

| 구분                                 | 내용                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| URI<br>(Uniform Resource Identifier) | <ul><li>인터넷에 자원을 나타내는 유일한 주소</li><li>인터넷에서 요구되는 기본조건으로서 http에 항상 붙어다닌다.</li></ul> |
| URL<br>(Uniform Resource Locator)    | <ul><li>인터넷 상에서 자원이 어디 있는지 알려주기 위한 규약</li></ul> |
| URN<br>(Uniform Resource Name)       | <ul><li>사람이 쓰는 것이 아니고 기계 간 통신할 때 쓰는 주소이다. <a href="https://docs.aws.amazon.com/thingsgraph/latest/ug/iot-tg-models-tdm-urnscheme.html">(URN 예시)</a></li><li>우리가 직접 쓸 일은 없다.</li></ul> |

------

**:heavy_check_mark: [Example] URI, URL 구분하기**

- `https://www.google.com`
  - 서버 주소(URL 이면서 URI)
- `https://github.com/wally-wally/TIL/blob/master/README.md`
  - 주소(`https://github.com/`) + 디렉토리 파일의 주소(자원의 위치)(`이하 부분`)
  - URL 이면서 URI
- `https://www.google.com/search?q=삼성`
  - 주소 + 특정 문자열(query string)(`search?q=`)
  - `search` 까지가 URL + `q=삼성` 이라는 **<u>식별자가 필요</u>**하므로 URI 이지만 URL은 아니다.
- `https://getbootstrap.com/docs/4.3/components/dropdowns/#single-button`
  - `#single-button` : fragment 부분으로 페이지에서 특정 헤딩 위치로 바로 이동시켜줄 때 사용 

------

<br>

### 6.4 REST(Representational State Transfer)

#### (1) REST의 구성 및 규칙

- REST의 구성 : 자원(URI) + 행위(HTTP Method) + 표현(Representations)
- REST는 반드시 꼭 지켜야하는 것은 아니다. 프레임워크마다 달라질 수 있다.
- <font color="red"><b>REST 중심 규칙</b></font>
  - URI는 <b>정보의 자원</b>을 표현해야 한다.
  - 자원에 대한 행위는 <b>HTTP Method</b>로 표현한다.
- RESTful하게 바꾸기
  - `GET/users/1/read/`(X) => `GET/users/1/`(O) : URI에 불필요한 정보가 포함.
  - `GET/users/1/delete/`(X) => `DELETE/users/1/`(O) : URI는 자원을 표현하는데에만 중점을 둬야함
  - `GET/users/1/create/`(X) => `POST/users/1/`(O) : GET 메소드는 적절하지 않음.

<br>

#### (2) RESTful한 URL

- URL 작성 Tip : URL는 소문자를 사용, 파일 확장자는 미포함, 밑줄(_) 대신에 하이픈(-) 사용
- django에서 RESTful하게 URL 주소 확인하기
  - `pip install django-extensions` 설치
  - `settings.py`의 `INSTALLED_APPS`에 `'django_extensions,'` 추가
  - `python manage.py show_urls`
- RESTful하게 URL 바꾸기
  - <b>같은 주소로 들어가는데 GET이냐 POST 냐에 따라 행동을 다르게 할 것이다.(NEW+CREATE)</b>
  - GET `articles/create/` : 글을 작성하는 페이지로 이동
  - POST `articles/create/` : 글이 실제로 작성
  - `NoReverseMatch` 오류가 뜨면 url 주소를 다시 확인하자!

> `views.py` ( `new` 함수는 삭제 )
>
> ```python
> def create(request):
> # CREATE 동작
> if request.method == 'POST': 
>   title = request.POST.get('title')
>   content = request.POST.get('content')
>   article = Article(title=title, content=content)
>   article.save()
>   return redirect('articles:detail', article.pk)
> # NEW 동작
> else:
>   return render(request, 'articles/new.html')
> ```

> `urls.py` 에서 `new` 구문 제거

> `create.html` (`new.html`의 이름이 바뀜)
>
> - `{% url 'articles:new' %}` => `{% url 'articles:create' %}`
> - POST 방식으로 자기 자신 페이지로 보내는 것이므로 `{% url 'articles:create' %}` 이 action 구문마저 필요 없으므로 빈 칸으로 둬도 올바르게 동작한다.(`<form action="" method="POST">`)
>   - 즉, form tag에 action이 없다면 현재 머물고 있는 URL로 요청을 보낸다.
>
> ```django
> {% extends 'base.html' %}
> 
> {% block content %}
> <h1 class="text-center">CREATE</h1>
> <form action="{% url 'articles:create' %}" method="POST">
> {% csrf_token %}
> <label for="title">TITLE</label>
> <input type="text" name="title" id="title"><br>
> <label for="content">CONTENT</label>
> <textarea name="content" id="content" cols="30" rows="5"></textarea><br>
> <input type="submit" value="submit">
> </form>
> {% endblock %}
> ```

- RESTful하게 DELETE 구문 수정

> `views.py`
>
> - POST 방식으로 올 때만 삭제할 수 있도록 구문 수정 (즉, 주소창에 직접 입력하여 지울려고 하면 GET 방식으로 삭제할 수 없다.)
>
> ```python
> def delete(request, pk):
> article = Article.objects.get(pk=pk)
> if request.method == 'POST':
>   article.delete()
>   return redirect('articles:index')
> else:
>   return redirect('articles:detail', article.pk)
> ```

> `detail.html`
>
> ```django
> {% extends 'base.html' %}
> 
> {% block content %}
> <h1 class="text-center">DETAIL</h1>
> <h2>{{ article.pk }} 번째 글</h2>
> <hr>
> <p>제목: {{ article.title }}</p>
> <p>내용: {{ article.content }}</p>
> <p>작성 시각: {{ article.created_at }}</p>
> <p>수정 시각: {{ article.updated_at }}</p>
> <hr>
> <a href="{% url 'articles:update' article.pk %}">[EDIT]</a>
> {% comment %} 이렇게 쓰면 url로 삭제할 수 없게 할 수 있다. {% endcomment %}
> <form action="{% url 'articles:delete' article.pk %}" method="POST" onclick="return confirm('진짜 지울꺼야??')">
> {% csrf_token %}
> <input type="submit" value="DELETE">
> </form>
> <a href={% url 'articles:index' %}>[back]</a>
> {% endblock %}
> ```

<br>

### 6.5 Model Instance Method

#### (1) `get_absolute_url()` <a href="https://wayhome25.github.io/django/2017/05/05/django-url-reverse/">(Go to more infomation)</a>

- 특정 모델에 대해 detail view를 작성할 경우, detail url을 완성하자마자 사용하는 것을 권장한다.
- 반복되는 코드가 줄고 보다 간결해진다.
- admin 페이지에서 `사이트에서 보기` 버튼이 새로 생겨 바로 설정된 템플릿 페이지로 이동할 수 있다.

> `models.py`
>
> - <b>`detail`에 한해서</b> 모든 url 주소는 아래와 같이 작성하면 된다.
> - 아래 세 구문 모두 `articles/10` 과 같이 똑같이 작동한다.
>   - `return f'/articles/{self.pk}/'`
>   - `return reverse('articles:detail', args=[self.pk])`
>   - `return reverse('articles:detail', kwargs={'pk': self.pk})`
> - reverse 함수에 args 랑 kwargs 를 동시에 인자로 보낼 수 없다.
>
> ```python
> from django.urls import reverse
> from django.db import models
> 
> class Article(models.Model):
> title = models.CharField(max_length=20)
> content = models.TextField()
> created_at = models.DateTimeField(auto_now_add=True)
> updated_at = models.DateTimeField(auto_now=True)
> 
> def __str__(self):
>   return self.title
> 
> def get_absolute_url(self):
>   # return f'/articles/{self.pk}/'
>   # args는 리스트로 넣는다.
>   # kwargs는 딕셔너리로 넣는다.
>   # return reverse('articles:detail', args=[self.pk])
>   return reverse('articles:detail', kwargs={'pk': self.pk})
>   # 딕셔너리의 key는 views.py의 detail 함수의 pk이다.
> ```

------

:checkered_flag: <b>URL Reverse 를 수행하는 함수들</b>

① `reverse()`

- 리턴 값 : string(문자열)

  ```python
  reverse('articles:index') # '/articles/'
  ```

② `redirect()`

- 리턴값 : HttpResponseRedirect (객체)

- 내부적으로 `resolve_url()` 을 사용

- view 함수에서 특정 url로 돌려보내고자 할 때 사용

  ```python
  redirect('articles:article')
  # <HttpResponsedRedirect status_code=200, "text/html; charset=utf-8, url="/articles/">
  ```

③ url template tag ( `{% url %}` )

- 내부적으로 `reverse()`를 사용

------

> `index.html`
>
> - `{% url 'articles:detail' article.pk %}` => `{{ article.get_absolute_url }}`
> - `redirect(모델 인스턴스)` 를 통해서 모델 인스턴스의 `get_absolute_url()` 함수를 자동으로 호출
>
> ```django
> {% extends 'base.html' %}
> 
> {% block content %}
> <h1 class="text-center">Articles</h1>
> <a href="{% url 'articles:create' %}">[NEW]</a>
> {% comment %} '/articles/create/'와 같은 문자열을 뱉어냄 {% endcomment %}
> <hr>
> {% for article in articles %}
> <p>글 번호: {{ article.pk }}</p>
> <p>글 제목: {{ article.title }}</p>
> <p>글 내용: {{ article.content }}</p>
> <a href="{{ article.get_absolute_url }}">[DETAIL]</a>
> <hr>
> {% endfor %}
> {% endblock %}
> ```

> `views.py`
>
> - `'articles:detail', article.pk` => `article`
>
> ```python
> def create(request):
> # CREATE 동작
> if request.method == 'POST': 
>   title = request.POST.get('title')
>   content = request.POST.get('content')
>   article = Article(title=title, content=content)
>   article.save()
>   return redirect(article)
> # NEW 동작
> else:
>   return render(request, 'articles/create.html')
> 
> 
> def delete(request, pk):
> article = Article.objects.get(pk=pk)
> if request.method == 'POST':
>   article.delete()
>   return redirect('articles:index')
> else:
>   return redirect(article)
> 
> 
> def update(request, pk):
> article = Article.objects.get(pk=pk)
> # UPDATE 동작
> if request.method == 'POST':
>   article.title = request.POST.get('title')
>   article.content = request.POST.get('content')
>   article.save()
>   return redirect(article)
> # EDIT 동작
> else:
>   context = {'article': article,}
>   return render(request, 'articles/update.html', context)
> ```

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
>     article = models.ForeignKey(Article, on_delete=models.CASCADE)
>     content = models.CharField(max_length=200)
>     created_at = models.DateTimeField(auto_now_add=True)
>     updated_at = models.DateTimeField(auto_now=True)
> 
>     class Meta:
>         ordering = ['-pk'] # 이렇게 model에서 선언하면 views.py에서 ordey_by('-pk') 안 쓰고 .all()로 가져와도 역순으로 출력할 수 있다.
> 
>     def __str__(self):
>         return self.content
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

---

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

---

<br>

## 8. 9월20일(08일차) - `STATIC` / `MEDIA`

### 8.1 static file 정의하기

- 기존 templates 파일 경로 : `app_name/templates/app_name/index.html`
- static 파일 경로 : `app_name/static/app_name/sample.png`
- 아래 사진과 같이 절대 경로를 만들어준다.(`static` > `articles` > `images` > `sea.jpg`)

<img src="https://user-images.githubusercontent.com/52685250/65289788-23405f80-db87-11e9-9737-3ca514a722ab.JPG">

> `index.html`
>
> ```django
> {% extends 'base.html' %}
> {% load static %} <!-- 반드시 extends 밑에 작성해야 한다. -->
> 
> {% block content %}
>   <img src="{% static 'articles/images/sea.jpg' %}" alt="sample_img">
> {% endblock %}
> ```

> `settings.py`
>
> - 맨 아래에 아래와 같은 구문 추가하여 커스텀 경로 만들기
> - <b>개발 단계에서 사용하는 실제 정적 파일이 위치한 경로를 지정하는 설정.</b>
> - django는 기본적으로 app 내부의 static 파일을 찾을 수 있는데, 프로젝트 내부의 static 파일을 찾기 위해 아래와 같이 경로를 작성해 줘야 한다.
> - 주로, bootstrap, 외부 템플릿 등을 저장하기 위해 경로를 만듬.
>
> ```python
> STATICFILES_DIRS = [
>     os.path.join(BASE_DIR, 'crud', 'assets'),
> ]
> ```
>
> - [추가사항] `STATIC_URL = '/static/'` 의 의미(기본적으로 `setting.py` 에 작성되어 있음.)
>   - 실제 파일이나 디렉토리가 아니고 URL 로만 존재하는 단위.

> - 아래와 같이 프로젝트 내부에 assets 파일경로를 만든다.(`assets` > `images` > `apple.png`)
>
> <img src="https://user-images.githubusercontent.com/52685250/65290094-a0200900-db88-11e9-9535-67744c7ff995.JPG">
>
> `create.html`
>
> ```django
> {% extends 'base.html' %}
> {% load static %}
> 
> {% block content %}
>   <!-- assets 이후의 경로를 써야 이미지 파일을 가져올 수 있다. -->
>   <img src="{% static 'images/apple.png' %}" alt="asset_img">
> {% endblock %}
> ```

<br>

### 8.2 image upload <a href="https://docs.djangoproject.com/en/2.2/howto/static-files/">(django 공식 문서)</a>

#### (1) 이미지 파일 업로드하기

- `models.py`에 `image = models.ImageField()` 구문 추가
- 하지만 이미 테이블이 만들어져 있으므로 image 컬럼을 그냥 추가하면 `NOT NULL` 무결성 조건에 위배된다.
- 그러므로 `blank=True`를 추가해야 에러가 발생하지 않는다. (`image = models.ImageField(blank=True)`)

---

:heavy_check_mark: <b>`NULL` vs `blank`</b>

- `NULL`
  - 기본 값 : `False`
  - <b>DB</b>와 관련되어 있다.(Databased-related)
  - 주어진 컬럼이 NULL 값을 가질 것인지를 결정.
- `blank`
  - 기본 값 : `False`
  - <u><b>데이터 유효성</b></u>과 관련되어 있다.(Validation-related)
  - `full_clean()` / `is_valid()` 처럼 유효성 검사 메서드가 호출될 때  유효성 검사에 사용
- `null=True, blank=False` : DB 내에서는 해당필드가 NULL을 사용하지만, 웹 사이트에서는 HTML INPUT 태그에 `required` 속성이 필요하다라는 것을 의미한다.
  - `required` 속성 : 반드시 입력해야 다음 단계로 넘어갈 수 있음을 의미

<br>

:warning: <b>주의사항</b>

- <b>문자열 기반 필드(CharField, TextField...)에는 `null=True` 금지(`blank=True`를 차라리 주자)</b>
- 이렇게 정의하게 되면 문자열 기반 필드는 `데이터 없음`에 대한 값이 2가지가 된다. <b>None과 빈 문자열</b>을 갖게 된다.
- 데이터 없음에 대한 조건이 2가지이면 중복이기 때문에 문자열 기반 필드는 NULL이 아닌 빈 문자열을 사용하는게 django의 convention이다.

```python
class Person(models.Model):
    name = models.TextField(blank=True) # null=True는 금지
    birth = models.DateField(null=True, blank=True)
    # 문자열 기반 필드가 아닌 숫자 필드이기 때문에 가능.
```

---

- 단, 이미지를 쓸 때 `Pillow`를 설치해야 한다.
  - image 필드를 사용할 때 필수로 필요한 패키지이다.

- `models.py`의 내용이 수정되었으므로 `migration` 과정을 다시 해 준다.

<img src="https://user-images.githubusercontent.com/52685250/65290871-efb40400-db8b-11e9-94ec-f320144bff92.JPG">

```sql
CREATE TABLE "new__articles_article" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "image" varchar(100) NOT NULL, "title" varchar(20) NOT NULL, "content" text NOT NULL, "created_at" datetime NOT NULL, "updated_at" datetime NOT NULL);
INSERT INTO "new__articles_article" ("id", "title", "content", "created_at", "updated_at", "image") SELECT "id", "title", "content", "created_at", "updated_at", '' FROM "articles_article";
DROP TABLE "articles_article";
ALTER TABLE "new__articles_article" RENAME TO "articles_article";
COMMIT;
```

- 위 SQL 구문에서 `"image" varchar(100) NOT NULL`와 같이 실제로는 image의 URL 경로가 저장된다.(max_length default 값 : 100)

> `views.py` > `create 함수`
>
> - `image = request.FILES.get('image')` 추가
> - `article = Article(title=title, content=content, image=image)` 로 수정

> `create.html`
>
> - 파일을 올릴 때는 `enctype="multipart/form-data"`를 반드시 추가해줘야 한다.
> - MDN 공식문서(form - enctype)
>
> <a href="https://developer.mozilla.org/ko/docs/Web/HTML/Element/form"><img src="https://user-images.githubusercontent.com/52685250/65291516-add88d00-db8e-11e9-8bde-359c805ab56b.JPG"></a>
>
> ```django
> {% extends 'base.html' %}
> {% load static %}
> 
> {% block content %}
>   <img src="{% static 'images/apple.png' %}" alt="asset_img">
>   <h1 class="text-center">CREATE</h1>
>   <form action="{% url 'articles:create' %}" method="POST" enctype="multipart/form-data">
>     {% csrf_token %}
>     <label for="title">TITLE</label>
>     <input type="text" name="title" id="title" required><br>
>     <label for="content">CONTENT</label>
>     <textarea name="content" id="content" cols="30" rows="5"></textarea><br>
>     <label for="image">IMAGE</label>
>     <!-- 아래 두 줄 추가 -->
>     <!-- accept="image/*"는 시멘틱한 요소로 파일 선택 눌렀을 때 이미지 파일로 바로 연결 할 수 있게 해준다.-->
>     <input type="file" name="image" id="image" accept="image/*">
>     <input type="submit" value="submit">
>   </form>
> {% endblock %}
> ```

```bash
In [1]: image
Out[1]: <InMemoryUploadedFile: sea.jpg (image/jpeg)>

In [2]: dir(image)
Out[2]:
[
 ...
 'charset',
 'chunks',
 'close',
 'closed',
 'content_type',
 'content_type_extra',
 'encoding',
 'field_name',
 'file',
 'fileno',
 'flush',
 'isatty',
 'multiple_chunks',
 'name',
 'newlines',
 ...
]

In [3]: image.field_name
Out[3]: 'image'

In [4]: image.name
Out[4]: 'sea.jpg'

In [5]: article.image
Out[5]: <ImageFieldFile: sea.jpg>

In [6]: article.image.url
Out[6]: 'sea.jpg'
```

- `img src` 쓸 때 `article.image.url`로 반드시 써야 한다.

> `detail.html`
>
> - `<img src="{{ article.image.url }}" alt="{{ article.image }}">` 구문 추가
> - 하지만 이 상태에서는 업로드한 이미지가 나오지 않는다. 미디어 파일 경로를 설정해 줘야 한다.

<br>

#### (2) 미디어 파일 경로 설정

> `settings.py` (맨 아래에 두 줄 추가)
>
> ```python
> # STATIC_URL 과 비슷한 역할을 한다.
> # 업로드 된 파일(stored files)의 URL 주소를 만들어주는 역할.
> # 주의사항 : STATIC_URL 과 값이 달라야 한다.
> MEDIA_URL = '/media/'
> 
> # STATICFILES_DIRS 와 비슷한 역할을 한다.
> # 실제 파일이 업로드 되면 어디에 저장될 지 정하는 실제 경로.
> # 주의사항 : STATICFILES_DIRS 와 값이 달라야 한다.
> # 개발 단계에서 사용하는 경로이므로 실제 배포 단계에서는 다른 경로 설정을 해야 한다.
> MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
> ```

> `crud`의 `urls.py`
>
> - 첫 번째 인자(settings.MEDIA_URL) : 어떤 url을 정적으로 추가할지 (Media file url)
> - 두 번째 인자(document_root=) : 실제 해당 미디어 파일이 어디에 존재하는지
>
> ```python
> from django.contrib import admin
> from django.urls import path, include
> from django.conf import settings
> from django.conf.urls.static import static
> 
> urlpatterns = [
>     path('jobs/', include('jobs.urls')),
>     path('articles/', include('articles.urls')),
>     path('admin/', admin.site.urls),
> ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
> 
> # urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
> ```

---

:warning: <b>문제점 발생(1)</b>

- 이미지도 edit을 통해 새로운 이미지로 수정할 수는 있지만, text 와는 다르게 수정할 때 이미지를 무조건 업로드하지 않으면 에러가 발생한다. (글만 수정하는 건 안 된다는 의미.)
  - 이미지는 바이너리 데이터(하나의 덩어리)라서 텍스트처럼 <b>일부만 수정하는게 불가능.</b>
  - 그렇기 때문에 html input 태그의 value 속성으로 수정하는 방식이 아니고, 새로운 사진으로 덮어 씌우는 방법을 사용.
  - `<input type="file">` 가 `value=""` 를 지원하지 않는다.
  - 정말 글만 수정하고 싶다면 이전과 똑같은 이미지를 업로드하면 된다.

> `views.py`의 `update` 함수에 `article.image = request.FILES.get('image')` 추가
>
> `update.html` 에 두 줄 추가
>
> ```html
> <label for="image">IMAGE</label>
> <input type="file" name="image" id="image" accept="image/*"><br>
> ```

> `admin.py`
>
> ```python
> class ArticleAdmin(admin.ModelAdmin):
>     list_display = ('pk', 'title', 'content', 'image', 'created_at', 'updated_at',)
> 
> admin.site.register(Article, ArticleAdmin)
> ```

---

:warning: <b>문제점 발생(2)</b>

- 이미지 필드 설정 이전에 작성했던 게시글의 detail 페이지가 동작하지 않는다.
  - `article.image.url` 을 불러오지 못하기 때문이다.
- 해결방법1
  - static 파일로 이미지가 없을 때 대신 사용할 이미지를 미리 넣어둠.
  - `static` > `articles` > `images` 에 대체 이미지 저장
- 해결방법2
  - 템프릿에서 `{% if %}` 문으로 `article.image` 가 존재하는 경우(True인 경우)만 이미지를 출력하도록 설정

> `detail.html`
>
> ```django
> {% extends 'base.html' %}
> {% load static %}
> 
> {% block content %}
> <h1 class="text-center">DETAIL</h1>
> {% if article.image %}
>   <img src="{{ article.image.url }}" alt="{{ article.image }}">
> {% else %}
>   <img src="{% static 'articles/images/no_image.png' %}" alt="no_image">
> {% endif %}
> <!-- 이하 동일 -->
> ```

> `update.html`
>
> ```django
> {% extends 'base.html' %}
> {% load static %}
> 
> {% block content %}
>   <h1 class="text-center">UPDATE</h1>
>   {% if article.image %}
>     <img src="{{ article.image.url }}" alt="sample">
>   {% else %}
>     <img src="{% static 'articles/images/no_image.png' %}" alt="no_image" width="200px">
>   {% endif %}
> <!-- 이하 동일 -->
> ```

<br>

### 8.3 image resizing

---

:checkered_flag: <b>준비 사항</b>

- `pillow`, `pilkit`, `django-imagekit`를 미리 설치해야 한다.

  - <font color="red"><b>설치 순서 : `pillow` -> `pilkit` -> `django-imagekit` (<u>반드시 지키자!!</u>)</b></font>
  - `pilkit` : `pillow` 를 쉽게 쓸 수 있도록 도와주는 라이브러리
  - `django-imagekit` : 이미지 helper를 제공하는 dango app

  - `settings.py` 에 `django-imagekit` app 등록 => `'imagekit',` 추가

---

#### (1) html 태그로 직접 사이즈 조정

- 원본은 그대로 저장되어 있고 보여지는 사이즈만 조정하는 것이기 때문에 근본적인 해결책이 아니다.

#### (2) 업로드 할 때 이미지 자체를 resizing 해서 저장

<img src="https://user-images.githubusercontent.com/52685250/65299698-880db100-dbab-11e9-85f0-5e69b8e28de9.jpg" alt="img_resizing_file_route">

##### ① 원본 X / 썸네일 O

> `models.py`
>
> - 맨 위에 두 줄 추가
>
> ```python
> from imagekit.models import ProcessedImageField
> from imagekit.processors import Thumbnail
> ```
>
> - ImageField 대신 다음 구문으로 작성
>   - `Thumbnail`은 이미지를 잘라서 저장되는 것이므로 원본 비율을 유지한채 작게 저장하고 싶으면 다른 것을 찾아서 쓰면 된다.
>
> ```python
> 	image = ProcessedImageField(
>         # ProcessedImageField 에 인자로 들어가 있는 값들은 migrations 이후에
>         # 추가되거나 수정되더라도 makemigrations 를 하지 않아도 된다.
>         processors=[Thumbnail(200, 300)], # processors : 처리할 작업 목록
>         format='JPEG', # 저장 포맷 (JPEG가 퀄리티를 낮췄을 때 이미지가 덜 깨진다.)
>         options={'quality': 90}, # 추가 옵션들
>         upload_to='articles/images', # 저장 위치(MEDIA_ROOT/articles/images)
>     )
> ```

##### ② 원본 O / 썸네일 O

> `models.py`
>
> - import 구문 수정
>
> ```python
> from imagekit.models import ProcessedImageField, ImageSpecField
> ```
>
> - image 필드 내용 수정
>   - 썸네일을 쓰겠다고 호출하는 순간에만 썸네일로 저장된다.
>   - 이 때는 image 필드를 다시 추가했으므로 migrations 과정을 다시 해줘야 한다.
>
> ```python
> 	image = models.ImageField(blank=True)
>     image_thumbnail = ImageSpecField( # detail.html에서 썸네일을 호출할 때만 불러온다.
>         source='image', # 원본 ImageField 이름 (upload_to 대신 source를 사용)
>         processors=[Thumbnail(200, 300)],
>         format='JPEG',
>         options={'quality': 90},
>     )
> ```

> `detail.html`
>
> - `{% block content %}` 내부에 아래 구문 추가
>
> ```django
> <img src="{{ article.image_thumbnail.url }}" alt="썸네일">
> ```

---

:heavy_check_mark: <b>[추가내용] 이미지 업로드 경로 커스터마이징</b>

> `models.py`
>
> - 맨 위에 두 줄로 `articles_image_path` 함수 추가(함수명은 내 마음대로 설정 가능)
>
> ```python
> def articles_image_path(instance, filename):
>     return f'articles/{instance.pk}/images/{filename}'
> 
> ...
> 
> 	image = ProcessedImageField(
>         # ProcessedImageField 에 인자로 들어가 있는 값들은 migrations 이후에
>         # 추가되거나 수정되더라도 makemigrations 를 하지 않아도 된다.
>         processors=[Thumbnail(200, 300)], # processors : 처리할 작업 목록
>         format='JPEG', # 저장 포맷 (JPEG가 퀄리티를 낮췄을 때 이미지가 덜 깨진다.)
>         options={'quality': 90}, # 추가 옵션들
>         upload_to=articles_image_path, # 저장 위치
>     )
> ```

- `instance.pk` 는 처음 레코드가 작성되는 순간에 pk 값이 없기 때문에 `None` 폴더로 생성된다.

- `media/articles/None/images` 로 저장이 되어버린다.

<img src="https://user-images.githubusercontent.com/52685250/65299923-7bd62380-dbac-11e9-8c99-84784ac31405.JPG">

- 실제 개발에서는 `instance.pk`로 하지 않고 로그인을 통해 유저 정보를 받고, `instance.user.pk` 또는 `instance.user.username` 처럼 업로드한 유저의 정보로 폴더를 구조화하는 경우가 많다.

---

<br>

### 8.4 favicon <a href="https://webdir.tistory.com/337">(all about favicon)</a>

- `static` > `articles` 안에 `favicon` 폴더 새로 생성한 후 다운받은 이미지 파일을 넣는다.

> `base.html`
>
> ```django
> {% load static %}
> <!DOCTYPE html>
> <html lang="ko">
> 
> <head>
>   <meta charset="UTF-8">
>   <meta name="viewport" content="width=device-width, initial-scale=1.0">
>   <meta http-equiv="X-UA-Compatible" content="ie=edge">
>   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
>     integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
>   <link rel="shortcut icon" href="{% static 'articles/favicon/notebook.png'%}">
>   <title>Document</title>
> </head>
> ```


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


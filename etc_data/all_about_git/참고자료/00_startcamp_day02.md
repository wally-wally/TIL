# **[SSAFY] StartCamp(written by wally-wally)**

----

※참고사항※

- `[SSAFY] StartCamp`는 Startcamp 과정을 학습하면서 헷갈리거나 중요하다고 생각한 내용을 정리한 것임.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

----

<br>

<br>

## 2. 7월 09일(2일차)

### 2.1 네이버 실시간 검색어 크롤링

> 홈페이지에서 selector를 복사해 올 때 네이버 메인 페이지의 실시간 검색어가 어떤 등수이든지 상관 없으므로 아무거나 선택하여 복사해온다.

```python
import requests
from bs4 import BeautifulSoup

# 1. 원하는 주소로 요청을 보내 응답을 저장한다.
url='https://www.naver.com'
html = requests.get(url).text

# 2. 정보를 조작하기 편하게 바꾸고
soup = BeautifulSoup(html, 'html.parser')

# 3. 바꾼 정보 중 원하는 것만 뽑아서
searches = soup.select('#PM_ID_ct > div.header > div.section_navbar > div.area_hotkeyword.PM_CL_realtimeKeyword_base > div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li > a > span.ah_k')
  # 추출한 셀렉터 중 li:nth-child(13)에서 ':nth-child(13)'은 필요없는 부분이므로 삭제
  # nth-child(13)은 특정 등수의 정보만 뽑아내기 때문에 우리가 필요한 건 리스트이다!
  # 여러 개를 뽑아 리스트에 저장해야 하므로 select_one이 아닌 select를 사용한다.
    
# 4. 출력한다.
for search in searches:
    print(search.text)
  # for문으로 리스트의 내용들을 전부 출력하는데 텍스트 부분만 필요하므로 .text를 붙인다.
```

<br>

### 2.2 git의 특징 및 작업 흐름

#### (1) git의 특징

- (분산) 버전 관리 시스템(DVCS), 코드의 History를 관리하는 도구
- 개발된 과정과 역사를 볼 수 있음
- 코드 병합, 수정, 백업, 이전 버전과 비교가 가능

<br>

#### (2) git의 작업 흐름(add-commit-push)

- [Working directory] --***add***--> [INDEX] --***commit***--> [HEAD] --***push***--> [GitHub]
  - add : 커밋할 목록에 추가
  - commit : 커밋(create a snapshot)  만들기
  - push : 현재까지의 역사(commits)가 기록되어 있는 곳에 새로 생성한 커밋들 반영하기
  - [INDEX]부터 git이 인식할 수 있는 공간이다.
- 반드시 단계별로 진행되어야 한다.
- git은 INDEX에 있는 내용으로 commit을 해준다.(INDEX 과정 꼭 놓치지 말자!)

<br>

### 2.3 git 세팅 과정

#### (1) 자격 설정 과정(컴퓨터에 처음으로 시작할 때만 수행)

- windows 자격 증명 관리자에서 git 관련 정보를 삭제하면 git이 초기화 된다.(Windows 자격 증명)
  - git bash를 연다.
  - `git config --global user.name "wally-wally"`
  - `git config --global user.email wallys0213@gmail.com`

<br>

#### (2) add 과정

- git init : git 한테 저장소 권한 부여(새로운 폴더를 만들면 꼭 해야 함)
  - 단, TIL 폴더로 이동 후 git init을 실행해야 함. 즉, 관리할 최상위 폴더(TIL 폴더)에서 push 해야 함(**master 표시가 있는 것을 확인하자**)
- **`git status`는 수시로 항상 찍어서 확인하자!!!**(빨간 글씨X, 초록 글씨O)
- `git add 00_startcamp` 찍은 후 `git status`를 입력하면 add 됨.

<br>

#### (3) commit 과정

- **`git add .`** : **수정사항이 있을 때 add할 경우 전체를 다 add 함.(가능한 이거 사용)**
- `git commit -m "first commit"` -> `git status`로 확인 -> `git log`로 확인
- `git log` : commit한 과정들 확인할 때

<br>

#### (4) push 과정

- `git remote add origin https://github.com/wally-wally/TIL.git` (맨 처음 한 번만 하면 됨, 새로운 폴더 만들면 remote 과정 수행해야 함, 뒤에 주소는 매번 달라짐)
- `git remote -v`로 확인 후 `git push -u origin master` (맨 처음 한 번만 하면 됨, 새로운 폴더 만들면 이 과정 수행해야 함)
- 두 번째 push 부터는 `git push`만 치면 됨
- 무조건 항상 add->commit->push 순서로만 하는게 아니고 commit으로 여러 개 쌓고 마지막에 push 하면 한 번에 업데이트 됨.

<br>

### 2.4 git clone, pull, gitignore

- 집에서 github을 사용할 때(`git clone`) == git -> 집 컴
  - 바탕화면 경로 지정 후 git bash에서 `git clone https://github.com/wally-wally/TIL.git`
  - clone하면 remote할 필요가 없음
- 집에서 사용 후 github으로 올릴 때(`git pull`) == 집 컴 -> git
  - second commit git에 올린다(`git commit -m "second commit"`)
  - pull로 git에서 ssafy 컴퓨터로 가져온다.(즉, 버전을 맞추는 과정이므로 집에서 코드 수정사항이 있으면 ssafy 출근하자마자 pull 한다.)
  - ssafy에서 작업 후 코드가 바뀌면 또 다시 집에서도 pull을 해야 한다.
  - 다른 사람과 협업할 때는 github 사이트 맨 위에 settings > Collaborators에서 추가적인 설정을 해야 한다.

- 첫 push 전에 gitignore 설정을 반드시 하자!(github에 개인 정보나 개인 token을 절대로 올리지X)
  - 최상위 폴더에 `code .gitignore`
  - https://github.com/github/gitignore/blob/master/Python.gitignore 에 있는 내용 복사하여 붙여넣기
  - gitignore.io에서 나만의 .gitignore 파일 만들 수 있음
    - cf) ls -al : 숨김 파일 보이기(숨김 파일들은 앞에 .(온점)이 숨어있다.(확장자명 없음))

***

**[요약!]** **<git의 작업 흐름 과정 정리>**

- 작업 후 올릴 때 : **<u>git add. => git commit -m "commit이름" =>  git push</u>**
- 집에서 할 때 : **<u>git pull</u>** => '작업 후 올릴 때' 과정 반복
- 과정 하나하나 지나갈 때 마다 **<u>git status로 상태를 수시로 확인</u>**하자!

***

<br>

### 2.5 문자열(string) 삽입

#### (1) 문자열 삽입 방법

```python
# 과거 -> 이 방법은 잊자
'%s %s' % ('one', 'two')

# pyformat(~ver3.5) -> 이 방법은 잊자
'{} {}'.format('one', 'two')

# f-string(new in ver3.6) -> 이 방법을 사용하자!
a = 'one'
b = 'two'
print(f'{a}, {b}')
```

<br>

#### (2) 문자열 예제

> f-string을 사용하여 <u>재사용 가능한 구문</u>으로 작성해준다.

```python
import random

# 1.f-string을 이용한 간단한 문장 출력하기
name = '심규현'
print(f'안녕하세요, {name} 입니다.')

# 2. 점심 메뉴 추천
menu = ['냉국수', '치즈돈가스', '냉모밀']
lunch = random.choice(menu)

print(f'오늘의 점심은 {lunch}입니다.')

# 3. 로또 추천
numbers = range(1,46) #1~45까지의 수 중에서 뽑는 것이므로 45가 아닌 46임을 주의!
lotto = random.sample(numbers, 6)

print(f'오늘의 로또 당첨 번호는 {sorted(lotto)}입니다.')

# 4. 필요하면 이렇게도 해보자(문자열끼리 합치기)
name = '홍길동'
print('안녕하세요, ' + name + '입니다.')
```

<br>

#### (3) (사무 자동화를 위한) 파일명 바꾸기(import os)

- `os.chdir(r'폴더주소')`
  - 윈도우에서는 폴더주소 앞에 r을 꼭 쳐줘야 한다.  \ 문자를 이스케이프 문자로 인식 안하고 하나의 문자열로 인식해주기 위해 r을 입력해줘야 한다.
  - \의 원래 기능 : "심규현"입니다. 에서 " " 표시를 나타나게 해줌.
- `os.listdir('폴더주소')`
- `os.rename(이전 파일명, 바꿀 파일명)`
- `'happy'.replace('h', 'B')` : Bappy로 바뀜
- os 모듈을 이용한 파일명 바꾸기 예제

```python
import os

# 1. 해당 파일들이 있는 위치로 이동
os.chdir(r'C:\Users\student\Desktop\TIL\00_startcamp\02_day\change_filenames')

# 2. 현재 폴더 안에 모든 파일 이름은 수집
filenames = os.listdir('.') # 현재 위치를 나타내는 것은 .(온점) 하나만 찍으면 됨.(이미 os.chdir로 위치를 이동했기 때문)

# 3. 각각의 파일명을 돌면서 수정
for filename in filenames:
    os.rename(filename, f'SAMSUNG_{filename}')
```

```PYTHON
import os

os.chdir(r'C:\Users\student\Desktop\TIL\00_startcamp\02_day\change_filenames')
filenames = os.listdir('.')

# 4. SAMSUNG을 SSAFY로 변환
for filename in filenames:
    os.rename(filename, filename.replace('SAMSUNG_', 'SSAFY_'))
```

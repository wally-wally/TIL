# **SSAFY StartCamp(written by wally-wally)**

----

※참고사항※

- 'SSAFY StartCamp'는 학습하면서 헷갈리거나 중요하다고 생각한 내용을 정리한 것임.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

----





[TOC]





## 1. 7월08일(1일차)**



### 1.1 파이썬 기본 Convention

- 파이썬의 구문 3요소 : 저장, 조건, 반복
- 파이썬의 **글자(문자)**는 큰 따옴표 대신에 **<u>작은 따옴표</u>**로 사용한다.
- 'x는 30 이하'는 x<=30로, 'x는 30 이상'은 x>=30으로 작성한다.
- 'x=30'은 30을 변수 x에 삽입한다는 의미이다.
- python은 **영어 대소문자를 구분**하므로 주의한다.



### 1.2 if문과 for문 작성하기

##### (1) 간단한 if문 예제

```python
x = 30
if x>20:
    print('A') # x가 20보다 큰 경우 A를 출력
elif x>10 and x<=20:
    print('B') # 10보다 크고 20보다 작거나 같은 경우 B를 출력
else:
    print('C') # 그 외의 경우는 C를 출력
```

##### (2) 간단한 for문 예제

```python
for i in range(5):
    print('안녕하세요') # 안녕하세요를 5번 출력하는 구문
```



### 1.3 리스트

> 음식 메뉴 리스트를 만들어 무작위 메뉴 추출하기(random 모듈 이용)

```python
import random # random 모듈 선언

menu = ['냉국수', '치즈돈가스', '냉모밀', '삼겹살', '제육덮밥'] # 리스트 생성
choice = random.choice(menu) # 리스트 항목 중 랜덤으로 하나의 항목을 골라 choice 변수에 삽입
print(choice) # 선택된 항목 출력하기
```

 cf) random 모듈을 이용한 로또번호 출력하기

```python
import random

numbers = range(1,46)
select = random.sample(numbers, 6)
print(select)
```



### 1.4 딕셔너리

```python
dust={'영등포구': 58, '강남구': 40} # 영등포구, 강남구는 '키', 58, 40을 'value'라고 함.
print(dust['영등포구'])
```



### 1.5 CLI 명령어(CLI : 명령줄 인터페이스)

- ls : 현재 디렉트리 내용 나열
- cd : 현재 작업하는 디렉토리 변경
  - cd .. : 상위 디렉토리로 이동
- mkdir : 새로운 디렉토리(폴더) 생성
- echo : 문자열 출력
- rm : 파일 지우기
- exit : 터미널 종료



### 1.6 webbrowser 열기

##### (1) 리스트에 웹 주소 입력하여 홈페이지 전부 열기

```python
import webbrowser

sites = ['www.google.com', 'www.naver.com', 'www.daum.net']
for site in sites:
    webbrowser.open_new(sites)
```



##### (2) 홈페이지 주소의 검색값을 리스트로 입력하여 홈페이지 열기

```python
import webbrowser

idols = ['BTS', 'nrg', 'hot', 'babyvox']
url = 'https://search.naver.com/search.naver?query='

for idol in idols
    webbrowser.open_new(url + idol)
```



### 1.7 [웹 크롤링]KOSPI 지수와 원/달러 환율 출력하기

##### (1) requests 모듈을 이용하여 홈페이지의 상태 코드 출력하기

```python
import requests

response = requests.get('https://www.naver.com').status_code
print(response)
```



##### (2) 네이버 금융에서 KOSPI 지수 출력하기

```PYTHON
import requests
from bs4 import BeautifulSoup

# 1. 원하는 주소로 요청을 보내 응답을 저장한다.
html = requests.get('https://finance.naver.com/sise/').text
# 2. 정보를 조작하기 편하게 바꾸고
soup = BeautifulSoup(html, 'html.parser')
# 3. 바꾼 정보 중 원하는 것만 뽑아서
kospi = soup.select_one('#KOSPI_now').text
# 4. 출력한다.
print(kospi)
```



##### (3) 네이버 금융에서 원/달러 환율 출력하기

```PYTHON
import requests
from bs4 import BeautifulSoup

# 1. 원하는 주소로 요청을 보내 응답을 저장한다.
html = requests.get('https://finance.naver.com/marketindex/').text
# 2. 정보를 조작하기 편하게 바꾸고
soup = BeautifulSoup(html, 'html.parser')
# 3. 바꾼 정보 중 원하는 것만 뽑아서
exchange = soup.select_one('#exchangeList > li.on > a.head.usd > div > span.value').text  #여러 정보 찍을 때는 select_one 대신 select로 한다.
# 4. 출력한다.
print(exchange)
```

 cf) 홈페이지(ex.네이버 금융)에서 selector 가져오기

![순서01](https://user-images.githubusercontent.com/52685250/60976004-dd397500-a367-11e9-87c6-92973bfaa61d.jpg)

> ① 네이버 금융 > 국내증시에 접속하여 빈 화면에서 오른쪽 버튼을 눌러 '검사'를 선택한다.
>
> ② 오른쪽에 새로 생기는 창에서 빨간 네모로 표시된 아이콘을 선택한다.

![순서02](https://user-images.githubusercontent.com/52685250/60976034-ea566400-a367-11e9-9c35-f6bab327e852.jpg)

> ③ 코스피 숫자 부분에 파란색으로 음영처리 되면 클릭을 한다.
>
> ④ 오른쪽 창에 빨간 네모로 표시된 부분을 오른쪽 버튼을 클릭하여 Copy > Copy selector를 선택한다.
>
> ⑤ 복사된 selector를 VSCODE에 복사하여 코드를 작성하여 사용한다.



----





## **2. 7월 09일(2일차)**



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



### 2.2 git의 특징 및 작업 흐름

##### (1) git의 특징

- (분산) 버전 관리 시스템(DVCS), 코드의 History를 관리하는 도구
- 개발된 과정과 역사를 볼 수 있음
- 코드 병합, 수정, 백업, 이전 버전과 비교가 가능

##### (2) git의 작업 흐름(add-commit-push)

- [Working directory] --***add***--> [INDEX] --***commit***--> [HEAD] --***push***--> [GitHub]
  - add : 커밋할 목록에 추가
  - commit : 커밋(create a snapshot)  만들기
  - push : 현재까지의 역사(commits)가 기록되어 있는 곳에 새로 생성한 커밋들 반영하기
  - [INDEX]부터 git이 인식할 수 있는 공간이다.
- 반드시 단계별로 진행되어야 한다.
- git은 INDEX에 있는 내용으로 commit을 해준다.(INDEX 과정 꼭 놓치지 말자!)



### 2.3 git 세팅 과정

##### (1) 자격 설정 과정(컴퓨터에 처음으로 시작할 때만 수행)

- windows 자격 증명 관리자에서 git 관련 정보를 삭제하면 git이 초기화 된다.(Windows 자격 증명)
  - git bash를 연다.
  - `git config --global user.name "wally-wally"`
  - `git config --global user.email wallys0213@gmail.com`

##### (2) add 과정

- git init : git 한테 저장소 권한 부여(새로운 폴더를 만들면 꼭 해야 함)
  - 단, TIL 폴더로 이동 후 git init을 실행해야 함. 즉, 관리할 최상위 폴더(TIL 폴더)에서 push 해야 함(**master 표시가 있는 것을 확인하자**)
- **`git status`는 수시로 항상 찍어서 확인하자!!!**(빨간 글씨X, 초록 글씨O)
- `git add 00_startcamp` 찍은 후 `git status`를 입력하면 add 됨.

##### (3) commit 과정

- **`git add .`** : **수정사항이 있을 때 add할 경우 전체를 다 add 함.(가능한 이거 사용)**
- `git commit -m "first commit"` -> `git status`로 확인 -> `git log`로 확인
- `git log` : commit한 과정들 확인할 때

##### (4) push 과정

- `git remote add origin https://github.com/wally-wally/TIL.git` (맨 처음 한 번만 하면 됨, 새로운 폴더 만들면 remote 과정 수행해야 함, 뒤에 주소는 매번 달라짐)
- `git remote -v`로 확인 후 `git push -u origin master` (맨 처음 한 번만 하면 됨, 새로운 폴더 만들면 이 과정 수행해야 함)
- 두 번째 push 부터는 `git push`만 치면 됨
- 무조건 항상 add->commit->push 순서로만 하는게 아니고 commit으로 여러 개 쌓고 마지막에 push 하면 한 번에 업데이트 됨.



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



### 2.5 문자열(string) 삽입

##### (1) 문자열 삽입 방법

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



##### (2) 문자열 예제

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



##### (3) (사무 자동화를 위한) 파일명 바꾸기(import os)

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



----





## **3. 7월 10일(3일차)**



### 3.1 이스케이프 문자

- \n : 개행문자(다음 줄 이동)
- \t : 탭(tab)문자
- \\\ : 백슬래쉬를 사용하기 위해 사용
- \\'(또는 \\") : 작은 따옴표 또는 큰 따옴표를 출력하기 위해 사용



### 3.2 파일 쓰고, 읽기

##### (1) 파일 쓰기(txt_write.py)

```python
# 1. 변수에 만들고 싶은 파일을 open() 해야 한다.
# open() 할 때 r은 읽기, w는 쓰기(+덮어씌워짐), a는 추가
f = open('ssafy.txt', 'w') #open('만들 파일 명', '행동')
for i in range(10):
    f.write(f'This is line {i+1}.\n') # \n은 enter의 역할 / 0부터 시작하므로 i+1로 해야 함
f.close() # 끝나고 반드시 파일을 닫아줘야 한다.

# 2. with 구문 (context manager)으로 작성하기
with open('with_ssafy.txt', 'w') as f: # line3, 6을 한 줄로 작성됨
    for i in range(10):
        f.write(f'This is line {i+1}.\n')

# 3. writelines() 이용한 파일 작성
# writelines() : list를 넣어주면 요소 하나당 한 줄씩 작성한다.
#                \n을 요소마다 끝에 넣어줘야 한 줄씩 작성된다.(안 쓰면 전부 다 한 줄로 작성)
with open('ssafy.txt', 'w') as f:
    f.writelines(['0\n', '1\n', '2\n', '3\n'])
```



##### (2) 파일 읽기(txt_read.py)

> - dir()함수 :  ()안에 입력한 변수에 맞는 사용할 수 있는 함수를 모두 보여준다.
>
>   > ex)print(dir(line)) : 위 구문에서 line이 문자열이므로 문자열에서 사용할 수 있는 함수를 모두 보여준다.
>
> - DOCstring : 더블쿼트 세 개를 이용하여 <u>주석과 같은 기능</u>을 한다.((2)파일 읽기의 2번 예제와 같이 표시함)

```python
# 1. read() 함수 이용하여 파일 읽기
# read() : 개행문자를 포함한 하나의 문자열
#          즉, 내용 전체가 하나의 문자열임.
with open('with_ssafy.txt', 'r') as f:
    all_text = f.read() # 다른 곳에서 사용하기 위해 변수를 선언해줘야 함
    print(all_text)

"""
2. readlines() 함수 이용하여 파일 읽기
   readlines() : 파일의 모든 라인을 읽어서 각각의 줄을 요소로 갖는 list로 만들어냄.
               즉, This is line 1.과 This is line 2.는 서로 다른 리스트의 요소임.
"""
with open('with_ssafy.txt', 'r') as f:
    lines = f.readlines() # 변수로 따로 지정해줘야 for문 안에서 리스트 요소가 출력됨
    for line in lines:
        print(line.strip()) # '문자열'.strip() : 양 쪽 빈 공백을 지워줌
                          # print() 내에는 \n이 숨겨져 있어서 strip을 이용하여 \n을 지워줌.
```



##### (3) 역순으로 출력하기

[Question]quest.txt 파일의 내용을 역순으로 하여 reverse_quest.txt 라는 파일로 저장하시오.

> 내가 푼 방법①

```python
# 1. quest.txt 파일을 읽고
with open('quest.txt', 'r') as f:
    lines = f.readlines() 
    for line in lines:
        print(line.strip())
        
# 2. 읽은 것을 기반으로 뒤집고(확인용)
for i in reversed(lines):
    print(i.strip())
    
# 3. reverse_quest.txt 파일 작성하기
with open('reverse_quest.txt', 'w') as f:
    for i in reversed(lines):
        f.writelines(i)
```

> 내가 푼 방법② == 강사가 푼 방법

```python 
# 1. quest.txt 파일을 읽고
with open('quest.txt', 'r') as f:
    lines = f.readlines() 

# 2. 읽은 것을 기반으로 뒤집고
lines.reverse()

# 3. reverse_quest.txt 작성하기
with open('reverse_quest.txt', 'w') as f:
    f.writelines(lines)

# f.writelines(lines)대신에
# for line in lines:
#     f.write(line)으로 해도 똑같이 출력된다.
```



### 3.3 [응용 예제]크롤링 + 파일 저장

[Question] 네이버 실시간 검색어를 크롤링하여 with 구문으로 example.txt 파일 저장하기

> 내가 푼 방법

```python
import requests
from bs4 import BeautifulSoup

url = 'https://www.naver.com'

# 1. 요청 보내서 html 파일 받고
html = requests.get(url).text

# 2. BeautifulSoup으로 정제
soup = BeautifulSoup(html, 'html.parser')

# 3. select 메소드로 사용해서 list를 얻어낸다.
searches = soup.select('#PM_ID_ct > div.header > div.section_navbar > div.area_hotkeyword.PM_CL_realtimeKeyword_base > div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li > a > span.ah_k')

# 4. 뽑은 list를 with 구문으로 txt파일을 작성한다.(encoding='utf-8' : 한글이 안 깨짐)
with open('naver_search.txt', 'w', encoding='utf-8') as f:
    for search in searches:
        f.write(f'{search.text}\n')
```

> 강사가 푼 방법

```python
import requests
from bs4 import BeautifulSoup

url = 'https://www.naver.com'

# 1. 요청 보내서 html 파일 받고
html = requests.get(url).text

# 2. BeautifulSoup으로 정제
soup = BeautifulSoup(html, 'html.parser')

# 3. select 메소드로 사용해서 list를 얻어낸다.(span부분은 밑에서 따로 작성하므로 지운다.)
searches = soup.select('#PM_ID_ct > div.header > div.section_navbar > div.area_hotkeyword.PM_CL_realtimeKeyword_base > div.ah_roll.PM_CL_realtimeKeyword_rolling_base > div > ul > li > a')

# 4. 뽑은 list를 with 구문으로 txt파일을 작성한다.(등수도 함께 작성)
with open('naver_search.txt', 'w', encoding='utf-8') as f:
    for search in searches:
        rank = search.select_one('span.ah_r').text
        keyword = search.select_one('span.ah_k').text
        f.write(f'{rank}위 : {keyword}\n')
```



### 3.4 Python 기본 예제

##### (1) 문자열 입력받아 첫 글자와 마지막 글자 출력(문자열 순서의 이해)

> 내가 푼 방법

```python
str = input('문자를 입력하세요: ')

print('첫 번째 글자 : ' + str[0])
print('마지막 글자 : ' + str[-1])
```

> 강사가 푼 방법(f-string 사용)

```python
str = input('문자를 입력하세요: ')

print(f'첫 글자는 {str[0]}, 마지막 글자 {str[-1]}')
```



##### (2) 1부터 입력받은 숫자 N까지 한 줄에 하나씩 출력(for문의 이해)

> 내가 푼 방법

```python
numbers = int(input('숫자를 입력하세요: '))

for i in range(1,numbers+1):
    print(i)
```

> 강사가 푼 방법

```python
numbers = int(input('숫자를 입력하세요: ')) # int를 붙여줘야 string에서 정수형으로 바뀐다.

for i range(numbers):
    print(i+1)
```



##### (3) 숫자를 입력 받아 짝수/홀수를 구분(나머지 연산자 %, if문의 이해)

> 내가 푼 방법(1부터 입력한 숫자까지 짝수, 홀수 구분하는 줄 알고 잘못 푼 코드)

```python
number = int(input('숫자를 입력하세요: '))

odd=[]
even=[]
for i in range(1,number+1):
    if i % 2 == 0:
        even.append(i)
    else:
        odd.append(i)

print('홀수' + odd)
print('짝수' + even)
```

> 강사가 푼 방법

```python
number = int(input('숫자를 입력하세요: '))

if number % 2:  # number % 2 == 0으로 적어도 무방하지만 number % 2로 쓰는게 통상적임. False는 숫자 0으로, True는 1, 2, 3...등의 숫자로 인식함.
    print('짝수입니다.')
else:
    print('홀수입니다.')
```



##### (4) 모든 조건 만족시 True, 하나라도 만족 못 하면 False 출력(and 연산자의 이해)

> 내가 푼 방법 == 강사가 푼 방법

```python
a = int(input('국어: '))
b = int(input('영어: '))
c = int(input('수학: '))
d = int(input('과학: '))

if a>=90 and b>80 and c>85 and d>=80:
    print(True)
else:
    print(False)
```



##### (5) 세미콜론으로 구분된 물품 가격 여러 개를 문자열 한 줄로 입력 후 높은 가격순으로 출력(문자열 => 리스트로 형변환)

> 내가 푼 방법

```python
prices = input('물품 가격을 입력하세요: ')

price1, price2, price3 = map(int, prices.split(';'))
#split()함수 : 문자열.split('구분자') => 구분자를 기준으로 문자열을 구분
#map 함수를 이용해 int형으로 바꿔야 크기 변경이 가능함
print(sorted({price1, price2, price3},reverse=True))
```

> 강사가 푼 방법

```python
prices = input('물품 가격을 입력하세요: ')

makes = prices.split(';')

boxes = [] # 문자열 기반의 내용을 리스트를 만들어 숫자형으로 바꾸어 저장
for make in makes: # list.append(1) => list 리스트에 1을 추가한다는 의미
    boxes.append(int(make)) # 문자열이 아닌 숫자형이 리스트에 저장됨.
    
boxes.sort(reverse=True) # 내림차순으로 정렬

for box in boxes:
    print(box)
```



### 3.5 HTML & CSS의 쌩기초

##### (1) HTML

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>여기는 네이버입니다.</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1>H1 태그입니다.</h1>
        <H2>HTML & CSS 맛보기</H2>
        <p>이건 문단을 구분하는 p 태그</p>
        <ol>
            <li>이건 순서가 있는 태그</li>
            <li>이것도 순서가 있지롱</li>
        </ol>
        <ul>
            <li>이건 순서가 없는 태그</li>
            <li>나도 없지롱</li>
        </ul>
    </body>
</html>
```

> head부분은 사용자가 화면상에서 볼 수 없는 부분이다.
>
> [!] + [Tab]하면 기본적으로 필요한 내용들을 자동으로 작성해준다.
>
> html은 작은 따옴표 대신 <u>큰 따옴표</u>가 convention이다.



##### (2) CSS

```css
h1 {
    color: crimson;
}

h2 {
    color: blue;
}

p {
    font-size: 60px;
}

li {
    text-align: center;
}
```



### 3.6 Web Server - Flask

##### (1) Python Web Framework의 종류

- Flask : 마이크로 프레임워크

- Django : 풀스택 프레임워크



##### (2) Flask 예제

```python
from flask import Flask
app = Flask(__name__)

@app.route('/') # '/' : 현재 기본 라우터 주소에 서버 생성
def hello(): # hello()라는 함수 생성
    return 'Hello!'


@app.route('/ssafy') # '/ssafy' : 127.0.0.1:5000/ssafy에 새로운 서버 생성
def ssafy(): # 위와 다른 이름의 함수를 만들어야 함
    return 'This is SSAFY!!'
```

> 위 파이썬 코드를 통해 생성된 서버 주소 127.0.0.1:5000은 localhost 5000을 의미한다.
>
> `FLASK_APP=hello.py flask run` : 서버 켜는 구문
>
> Ctrl+C로 서버를 끄고 다시 켜야 수정된 사항이 서버에 반영된다.
>
> 함수나 클래스끼리는 두 줄씩 띄우는 것을 Convention으로 한다.

- flask run만 입력하여 반영하기 & Debug mode를 on으로 바꾸기
  - ~/.bash_profile(이 파일은 항상 home directory(물결 표시)안에 있어야 함) : git bash에 환경 변수 설정하기 위해 필요한 숨김 파일(<u>환경 변수 설정 파일</u>)
  - git bash를 켜서 ~/ 디렉토리 위치에서 code ~/.bash_profile 입력
  - 열린 VSCODE에서 `export FLASK_APP=hello.py`입력 후 저장
  - TERMINAL창에 source ~/.bash_profile 입력(위치 무관)
  - flask 폴더 터미널 위치에서 flask run만 입력하면 실행됨.
  - VSCODE에 `export FLASK_ENV=development` 입력 후 저장 => Debug mode를 on으로 설정
  - TERMINAL 창에 source ~/.bash_profile 입력 후 flask run하면 Debug mode가 on으로 바뀜.(Debug mode가 on이 되면 VSCODE에서 수정 후 저장하면 실시간으로 수정내용이 반영됨)
  - .bash_profile과 hello.py 파일 둘 다 VSCODE에 열린 상태로 하자



----





## **4. 7월 11일(4일차)**



### 4.1 Flask 이어서...

##### (1) Flask 초기 파일(hello.py => <u>app.py</u>) 설정

- 실제 Flask 초기 값은 hello.py가 아니고 app.py이다.

- code ~/.bash_profile에서 첫 번째 줄 삭제하고 저장 후 TERMINAL창에 source ~/.bash_profile 입력
- flask 폴더 터미널 위치에서 flask run만 입력하면 실행됨.

> <VSCODE에서 Debug mode 오류 안 뜨게 하기>(1,2,4 : VSCODE 터미널에, 3:생성된 .bashrc에 입력)
>
> => **.bash_profile을 삭제하고 .bashrc생성하는 과정**
>
> - rm -rf ~/.bash_profile
> - code ~/.bashrc
> - `export FLASK_ENV=development`
> - source ~/.bashrc



##### (2) Flask 추가 예제 - day 계산, HTML TAG 출력

```python
from flask import Flask
from datetime import datetime
app = Flask(__name__)

@app.route('/dday')
def dday():
    today_time = datetime.now() # 오늘 날짜
    endgame = datetime(2019, 11, 29) # 수료 날짜
    dday = endgame - today_time # D-day = 수료 날짜 - 오류 날짜
    return f'{dday.days} 일 남았습니다.'


@app.route('/html')
def html():
    return '<h1>This is HTML TAG</h1>'


@app.route('/html_line')
def html_line():
    return """
    <h1>여러 줄을 보내 봅시다.</h1>
    <ol>
        <li>순서가 있는 태그1</li>
        <li>순서가 있는 태그2</li>
    </ol>
    <ul>
        <li>순서가 없는 태그1</li>
        <li>순서가 없는 태그2</li>
    </ul>
    """
```



### 4.2 Flask 응용

##### (1) variable routing(변수 라우팅)

![](https://user-images.githubusercontent.com/52685250/61014028-582e7a00-a3c0-11e9-9882-6bb1cbbcc8ec.JPG)

​    ( Converter types 내용 출처 : http://flask.pocoo.org/docs/1.0/quickstart/ )

> string을 받아 출력하기

```python
@app.route('/greeting/<name>') # name이 변수로 지정됨 (원래는 <string:name>으로 써야함, 숫자로 쓸려면 int:name으로 쓰면 됨. 즉, string이 기본값이므로 string일 때만 생략 가능)
def greeting(name): # ()안에 name 변수를 선언해줘야 함수 내에서 인식이 가능
    return f'{name}님 반갑습니다.'
```

> 숫자를 입력받아 세제곱 출력하기

```python
@app.route('/cube/<int:number>')
def cube(number):
    return f'{number}의 세제곱은 {pow(number, 3)}입니다.'
# number ** 3 == pow(number,3)
```

> 식사 인원(number)을 입력하면 여러 메뉴 중 인원 수 만큼의 메뉴를 응답

```python
import random

@app.route('/lunch/<int:people>')
def lunch(people):
    menu = ['냉국수', '치즈돈가스', '짜장면', '짬뽕', '냉모밀', '오므라이스']
    order = random.sample(menu, people)
    return f'{people}명의 메뉴는 {order}입니다.'
    # return은 list를 바로 출력할 수 없음
    # return str(order)도 가능
```



##### (2) render template

- flask 서버에서 처리하는 것이 아니라 templates 별도의 폴더에서 저장된 요청한 페이지를 응답하여 출력해주는 것을 말한다.

> 예제1

```python
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/greeting/<name>')
def greeting(name):
    return render_template('greeting.html', html_name=name)
```

> app.py랑 똑같은 위치에 templates 폴더를 만들어야 한다.
>
> 이 폴더 안에 출력할 index.html과 같은 파일을 넣으면 된다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    {{ html_name }}
</body>
</html>
```



> 예제2

```python
@app.route('/cube/<int:number>')
def cube(number):
    # 연산을 모두 끝내고 변수만 cube.html로 넘긴다.
    result = number ** 3
    return render_template('cube.html', result=result, number=number)
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    {{ number }}의 세제곱은 {{ result }}입니다.
</body>
</html>
```

> result=result, number=number에서 좌변과 우변의 이름이 같아도 똑같은 건 아니다.



##### (3) jinja2 활용

- {%  %} 는 사용자에게 보여져서는 안 될 코드를 쓸 때 사용한다.
- 함수를 하나 열면 반드시 {%  %}로 닫아줘야 한다. ex.{% endif %}, {% endfor %}
- 변수를 사용할 때는 {{  }}를 반드시 써준다.

> 예제1. 규현이라는 이름으로 값이 오면 인사하고 아니면 누구세요랴고 묻는다.(app.py의 내용은 (4)-예제1과 동일함)(if문 사용)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <!-- 규현이라는 이름으로 값이 오면 인사하고 아니면 누구세요랴고 묻는다. -->
    <!-- jinja2 주석 {# #} -->
    {% if html_name == '규현' %}
        <h2>{{ html_name }} 왔니?</h2>
    {% else %}
        <h2>누구세요?</h2>
    {% endif %} 
</body>
</html>
```



> 예제2.영화목록 출력하기(for문 사용)

```python
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/movie')
def movie():
    movies = ['알라딘', '스파이더맨', '토이스토리4', '기생충', '라이언킹']
    return render_template('movie.html', movies=movies)
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>영화 목록</h1>
    {% for movie in movies %}
        <h3>{{ movie }}</h3>
    {% endfor %}
</body>
</html>
```



### 4.3 Flask Request & Response

- url로 넘기는 것이 아닌 템플릿 내에서 작성해서 이 내용을 Flask로 넘겨주기(ex. 회원가입)

![Flask Request & Response](https://user-images.githubusercontent.com/52685250/61059012-4639ef00-a433-11e9-9e0f-11bad075edbd.jpg)



##### (1) ping-pong page

> app.py

```python
from flask import Flask, render_template, request

@app.route('/ping')
def ping():
    return render_template('ping.html')


@app.route('/pong')
def pong():
    name = request.args.get('data') # 이 안에 입력한 '안녕하세요'가 들어있음
    return render_template('pong.html', name=name)
```

> ping.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width>, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="/pong">
        <input type="text" name="data">
        <!-- 입력한 글이 전송되는 것이 아닌 이름표 'data'가 전송되는 것임 -->
        <!-- 실제로는 name='data'가 key로, 입력한 글자가 value로 설정되어 딕셔너리로 전송되는 것임 -->
        <input type="submit" value="퐁!">
    </form>
</body>
</html>
```

> pong.html

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>{{ name }}받았음!!</h1>
</body>
</html>
```



##### (2) fake naver, fake google  만들기

> app.py

```python
# https://search.naver.com/search.naver?query=

@app.route('/naver')
def naver():
    return render_template('naver.html')
```

> naver.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>네이버 검색!!!</h1>
    <form action="https://search.naver.com/search.naver?"> <!-- '?'표시는 지워도 무방 -->
        <input type="text" name="query">
        <input type="submit" value="검색!">
    </form>
</body>
</html>
```

> app.py

```python
# https://www.google.com/search?q=

@app.route('/google')
def google():
    return render_template('google.html')
```

> google.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>구글 검색!!!</h1>
    <form action="https://www.google.com/search?"> <!-- '?'표시는 지워도 무방 -->
        <input type="text" name="q">
        <input type="submit" value="검색!">
    </form>
</body>
</html>
```



##### (3) vonvon 만들기

- 이름 받을 페이지, 결과가 나올 페이지 => 페이지 총 2개 필요
- 함수도 동일하게 2개 필요

> app.py

```python
@app.route('/vonvon_send')
def vonvon_send():
    return render_template('vonvon_send.html')


@app.route('/vonvon_view')
def vonvon_view():
    vonvon_name = request.args.get('data')
    vonvon_lists = ['학업능력', '미적감각', '외모', '체력', '재력', '계산능력']
    vonvon_select = random.sample(vonvon_lists,3)
    no1 = vonvon_select[0]
    no2 = vonvon_select[1]
    no3 = vonvon_select[2]
    return render_template('vonvon_view.html', vonvon_name=vonvon_name, vonvon_select=vonvon_select, no1=no1, no2=no2, no3=no3)
```

> vonvon_send.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="/vonvon_view">
        <h1>이름을 입력하고 '확인'을 누르세요!</h1>
        <input type="text" name="data">
        <input type="submit" value="확인">
    </form>
</body>
</html>
```

> vonvon_view.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h2>신이 {{ vonvon_name }}를 만들 때</h2>
    <p> {{ no1 }} 한 스푼... </p>
    <p> {{ no2 }} 두 스푼... </p>
    <p> {{ no3 }} 세 스푼... </p>
</body>
</html>
```



### 4.4 Dictionary(딕셔너리)(아주 중요!)

##### (1) 딕셔너리의 기본

```python
# 1. 딕셔너리 만들기(1)
lunch = {
    '중국집' : '02-123-1234'
}

# 2. 딕셔너리 만들기(2)
dinner = dict(중국집='02', 일식집='031', 한식집='041')

# 3. 딕셔너리에 내용 추가하기
lunch['분식집'] = '032-123-5131'

# 4. 딕셔너리 내용 가져오기(중요!)
idol = {
    'bts' : {
        '지민' : 25,  # 딕셔너리는 key, value를 확실히 보기위해 enter치자!
        'RM' : 24
    }
}

# RM의 나이는?
idol['bts']['RM'] # 첫 번째 방법(이 방법은 서버입장에서 오류 발생시 다운될 수 있다.)
idol.get('bts').get('RM') # 두 번째 방법(서버입장에서는 .get()을 써야 다운이 안 된다.)
```

> `dict['key']`로 존재하지 않는 key를 접근할 경우 key error가 발생하지만,
>
> `dict.get('key')`로 존재하지 않는 key를 접근할 경우 None 값을 넘겨준다.



##### (2) 딕셔너리의 활용

```python
lunch = {
    '중국집' : '02-123-1234',
    '분식집' : '032-123-5131',
    '일식집' : '042-385-7239'
}

# 1. 기본 활용
for key in lunch:
    print(key)
    print(lunch[key])

# 2. .items() 메소드 활용
for key, value in lunch.items(): # key, value를 다른 변수명으로 사용해도 무방
    print(key, value) # 하지만 key, value가 통상적인 변수명임.

# 3. value 만 가져오기(.values() 메소드 활용)
for value in lunch.values():
    print(value)

# 4. key 만 가져오기(.keys() 메소드 활용)
for key in lunch.keys():
    print(key)
```



##### (3) 딕셔너리 예제

> 04_day 디렉터리에 있는 03_dict_practice.py와 04_data_practice_01.py가 있으니 참고.
>
> > 03_dict_practice.py : 디렉터리를 활용한 특정 조건에 맞는 데이터 추출
> >
> > 04_data_practice01.py : 많은 데이터가 있는 디렉터리에서 특정 조건에 맞는 데이터 찾아오기



------





## **5. 7월 12일(5일차)**



### 5.1 연산자

- int : 수학 연산자
- string : 문자열 연산자
- list : 리스트 연산자
- dict : 딕셔너리 연산자
- set : 집합 연산자(합집합, 교집합, 차집합)

```python
for num in numbers:
    if num in winner:
        matched += 1
```

```python
matched = (set(winner) & set(numbers))
```

> set 연산자를 이용하여 한 줄로 간단하게 작성할 수 있다.



### 5.2 Telegram 챗봇 만들기

##### (1) GET, POST 방식

- GET 방식 : 네이버에 검색 후 주소에 정보가 그대로 나타나는 방식

- POST 방식 : ID, PW와 같은 정보들을 서버 아래로 지나가며 정보가 나타나지 않는 방식



##### (2) webhook, ngrok

![](https://user-images.githubusercontent.com/52685250/61098420-df9bec00-a499-11e9-9bbd-60ad9ec04b14.jpg)

   ( 이미지 출처 : https://phoby.github.io/ngrok/ )



##### (3) 배포(deploy) - pythonanywhere

- 무료 배포 사이트인 pythonanywhere을 이용하여 VSCODE에서 flask run을 안 해도 항상 챗봇을 이용할 수 있다.
- 단, webhook 이용시 회원가입을 안 하고 이용하는 경우 8시간만 사용 가능하다.



----

**<Telegram 챗봇의 전반적인 과정>**

![](https://user-images.githubusercontent.com/52685250/61181258-b11b3e00-a65e-11e9-8680-7c3e1a362629.jpg)

----



### 5.3 슬라이싱(slicing)

```python
a = ['a', 'b', 'c', 'd', 'e']
a[0:2] = ['a', 'b']
a[3:] = ['d', 'e']
a[-4:-2] = ['c', 'd']
a[:-1] = ['a', 'b', 'c', 'd']
```

> 슬라이싱은 요소 사이의 간격을 기준으로 한다.
>
> 앞에서부터 0, 1, 2, 3, ... 이고, 뒤에서부터는 -1, -2, -3, ... 이다.


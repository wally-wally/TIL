# **[SSAFY] StartCamp(written by wally-wally)**

----

※참고사항※

- `[SSAFY] StartCamp`는 Startcamp 과정을 학습하면서 헷갈리거나 중요하다고 생각한 내용을 정리한 것임.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

----

<br>

<br>

## 3. 7월 10일(3일차)

### 3.1 이스케이프 문자

- \n : 개행문자(다음 줄 이동)
- \t : 탭(tab)문자
- \\\ : 백슬래쉬를 사용하기 위해 사용
- \\'(또는 \\") : 작은 따옴표 또는 큰 따옴표를 출력하기 위해 사용

<br>

### 3.2 파일 쓰고, 읽기

#### (1) 파일 쓰기(`txt_write.py`)

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

<br>

#### (2) 파일 읽기(`txt_read.py`)

> - dir()함수 :  ()안에 입력한 변수에 맞는 사용할 수 있는 함수를 모두 보여준다.
>
>   ex) `print(dir(line))` : 위 구문에서 line이 문자열이므로 문자열에서 사용할 수 있는 함수를 모두 보여준다.
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

<br>

#### (3) 역순으로 출력하기

[Question] `quest.txt` 파일의 내용을 역순으로 하여 `reverse_quest.txt`라는 파일로 저장하시오.

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

<br>

### 3.3 [응용 예제]크롤링 + 파일 저장

[Question] 네이버 실시간 검색어를 크롤링하여 with 구문으로 `example.txt` 파일 저장하기

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

<br>

### 3.4 Python 기본 예제

#### (1) 문자열 입력받아 첫 글자와 마지막 글자 출력(문자열 순서의 이해)

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

<br>

#### (2) 1부터 입력받은 숫자 N까지 한 줄에 하나씩 출력(for문의 이해)

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

<br>

#### (3) 숫자를 입력 받아 짝수/홀수를 구분(나머지 연산자 %, if문의 이해)

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

<br>

#### (4) 모든 조건 만족시 True, 하나라도 만족 못 하면 False 출력(and 연산자의 이해)

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

<br>

#### (5) 세미콜론으로 구분된 물품 가격 여러 개를 문자열 한 줄로 입력 후 높은 가격순으로 출력

- 문자열 => 리스트로 형변환

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

<br>

### 3.5 HTML & CSS의 쌩기초

#### (1) HTML

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

<br>

#### (2) CSS

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

<br>

### 3.6 Web Server - Flask

#### (1) Python Web Framework의 종류

- Flask : 마이크로 프레임워크

- Django : 풀스택 프레임워크

<br>

#### (2) Flask 예제

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

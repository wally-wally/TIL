# **[SSAFY] StartCamp(written by wally-wally)**

----

※참고사항※

- `[SSAFY] StartCamp`는 Startcamp 과정을 학습하면서 헷갈리거나 중요하다고 생각한 내용을 정리한 것임.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

----

<br>

<br>

## 1. 7월08일(1일차)

### 1.1 파이썬 기본 Convention

- 파이썬의 구문 3요소 : 저장, 조건, 반복
- 파이썬의 **글자(문자)**는 큰 따옴표 대신에 **<u>작은 따옴표</u>**로 사용한다.
- 'x는 30 이하'는 x<=30로, 'x는 30 이상'은 x>=30으로 작성한다.
- 'x=30'은 30을 변수 x에 삽입한다는 의미이다.
- python은 **영어 대소문자를 구분**하므로 주의한다.

<br>

### 1.2 if문과 for문 작성하기

#### (1) 간단한 if문 예제

```python
x = 30
if x>20:
    print('A') # x가 20보다 큰 경우 A를 출력
elif x>10 and x<=20:
    print('B') # 10보다 크고 20보다 작거나 같은 경우 B를 출력
else:
    print('C') # 그 외의 경우는 C를 출력
```

<br>

#### (2) 간단한 for문 예제

```python
for i in range(5):
    print('안녕하세요') # 안녕하세요를 5번 출력하는 구문
```

<br>

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

<br>

### 1.4 딕셔너리

```python
dust={'영등포구': 58, '강남구': 40} # 영등포구, 강남구는 '키', 58, 40을 'value'라고 함.
print(dust['영등포구'])
```

<br>

### 1.5 CLI 명령어(CLI : 명령줄 인터페이스)

- ls : 현재 디렉트리 내용 나열
- cd : 현재 작업하는 디렉토리 변경
  - cd .. : 상위 디렉토리로 이동
- mkdir : 새로운 디렉토리(폴더) 생성
- echo : 문자열 출력
- rm : 파일 지우기
- exit : 터미널 종료

<br>

### 1.6 webbrowser 열기

#### (1) 리스트에 웹 주소 입력하여 홈페이지 전부 열기

```python
import webbrowser

sites = ['www.google.com', 'www.naver.com', 'www.daum.net']
for site in sites:
    webbrowser.open_new(sites)
```

<br>

#### (2) 홈페이지 주소의 검색값을 리스트로 입력하여 홈페이지 열기

```python
import webbrowser

idols = ['BTS', 'nrg', 'hot', 'babyvox']
url = 'https://search.naver.com/search.naver?query='

for idol in idols
    webbrowser.open_new(url + idol)
```

<br>

### 1.7 [웹 크롤링]KOSPI 지수와 원/달러 환율 출력하기

#### (1) requests 모듈을 이용하여 홈페이지의 상태 코드 출력하기

```python
import requests

response = requests.get('https://www.naver.com').status_code
print(response)
```

<br>

#### (2) 네이버 금융에서 KOSPI 지수 출력하기

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

<br>

#### (3) 네이버 금융에서 원/달러 환율 출력하기

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

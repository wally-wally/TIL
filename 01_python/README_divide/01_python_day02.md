# :notebook_with_decorative_cover: 01_python - Day02

---

:white_check_mark: **Python 7월16일(2일차) 상세 내용(필독!)** <a href="https://github.com/wally-wally/TIL/blob/master/01_python/python_review/Python%20총정리_2.md">(바로 이동)</a>

---

<br>

## 2. 7월16일(2일차)

### 2.1 Python 예제(1일차 복습)

#### (1) 딕셔너리, if문을 이용하여 상승장, 하락장 출력하기

```python
import requests
from pprint import pprint # 딕셔너리 보기 좋게 해주기 위해 작성

url = "https://api.bithumb.com/public/ticker/btc"
data = requests.get(url).json()['data']
pprint(data)

"""
 - 변동폭 : 최고와 최저의 차이
 - 시가 : 시작가
"""
# 최고가와 최저가
max_price = int(data.get('max_price'))
min_price = int(data.get('min_price'))

# 변동폭
volatility = max_price - min_price

# 시가
opening_price = int(data.get('opening_price'))

# '시가 + 변동폭'이 최고가 보다 높나요?
if opening_price + volatility > max_price:
    print('상승장')
else:
    print('하락장')
```

<br>

#### (2) 문장에서 모음만 제거하기

> 내가 푼 방법

```python
# 아래에 코드를 작성하세요.
before = list(my_str)
revise = []
count=0
for i in before:
    if (before[count] == 'a') or (before[count] == 'e') or (before[count] == 'i') or (before[count] == 'o') or (before[count] == 'u'):
        revise.append('')
    else:
        revise.append(i)
    count += 1
print(''.join(revise))
```

> 첫 번째 방법(이 방법을 먼저 확실하게 익히자!)

```python
my_str = "Life is too short, you need python"

"""
 - 그럼 하나한씩 돌면서 모음이면 기록하지 않고, 모음이 아니면 기록해야 겠다!
 - => 기록할 변수가 필요하네!
 - => result = '' 선언
"""
result = ''

# 문자열을 하나하나씩 돌면서
for char in my_str:
#    모음이 아니면 기록
    if char != 'a' and char != 'e' and char != 'i' and char != 'o' and char != 'u':
        result += char
print(result)

# 무식해보이지만 맞는 코드이다. 이렇게 단계별로 끊어서 생각하면 문제를 풀 수 있다.
# 두 번째 방법, 세 번째 방법은 한 번에 접근해서 짤 수는 없으므로 지금은 첫 번째 방법처럼 짜는게 우선이다!
```

> 두 번째 방법

```python
# 각각의 비교가 아니라, 어떤 통 안에 들어있나없나를 판단(in을 사용)

vowels = ['a', 'e', 'i', 'o', 'u'] # 리스트대신 문자열 'aeiou'로도 가능하다.
result = ''

for char in my_str:
    if char not in vowels:
        result += char
print(result)
```

> 세 번째 방법

```python
# 새로운 변수를 만드는게 아니라 원본을 수정

vowels = 'aeiou'

for vowel in vowels:
    my_str = my_str.replace(vowel, '')
    
print(my_str)
```

<br>

### 2.2 dictionary 구축하기

> 첫 번째 방법

```python
book_title =  ['great', 'expectations','the', 'adventures', 'of', 'sherlock','holmes','the','great','gasby','hamlet','adventures','of','huckleberry','fin']

# 1. for, if 사용

book_dict = {}
for title in book_title:
    if title in book_dict:
        book_dict[title] += 1 # 기존 키 값이 있으면 1을 더함
    else:
        book_dict[title] = 1 # 기존 키 값이 없으면 1 값을 할당
print(book_dict)
```

> 두 번째 방법

```python
# 2. .count()
book_dict = {}
for title in book_title:
    # 리스트의 특정 요소가 몇 개 있는지 count해서 그 값을 딕셔너리의 value로 설정
    book_dict[title] = book_title.count(title)
print(book_dict)
```

> 세 번째 방법

```python
# 3. .get() (4장에서 다시 배웁니다.)
book_dict = {}
for title in book_title:
    book_dict[title] = book_dict.get(title, 0) + 1
print(book_dict)
```

- `get(key[, default])`
    - key가 딕셔너리에 있는 경우 key에 대응하는 value를 돌려주고, 그렇지 않으면 default를 돌려준다.
    - default를 따로 작성하지 않으면 기본값 'None'이 사용된다. 그래서 이 메서드는 절대로 `Keyerror`를 일으키지 않는다.
    - 결국 key가 없을 때, None이 아닌 다른 값을 받길 원하다면, `.get(key, 3)` 처럼 사용할 수 있다.

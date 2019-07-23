# [SSAFY]Python(written by wally-wally)

----

**※참고사항※**

- '[SSAFY] Python'은 정규과정 'Python'을 진행하면서 강의파일에 없는 추가적인 내용이나 중요하게 다루었던 내용을 상세하게 작성했음.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

<br>

## 1. 7월15일(1일차)

<br>

### 1.1 단축키 설정방법(단축키로 jupyter notebook 실행)

- `code ~/.bashrc`
- .bashrc파일에서 <u>alias 단축키명="원래이름"</u> 추가 작성  ex) alias jp="jupyter notebook"
- 저장 후 `source ~/.bashrc`하면 적용됨

<br>

### 1.2 jupyter notebook - keyboard shortcuts

> edit mode, command mode

- 현재 상태 확인하기 : edit mode(초록색), command mode(파란색)

- command mode -> edit mode : enter 또는 마우스 더블클릭

- edit mode -> command mode : [Shift] + [Enter]하면 적용 후 다음 셀로 이동

> command mode에서...

- command mode에서 [D]를 빠르게 두 번 누르면 선택된 셀이 지워짐

- command mode에서 [Z]를 누르면 실행 취소의 개념으로 지워진 셀이 다시 복구됨

- command mode에서 [A]를 누르면 그 셀 위로 새로운 셀이 생성됨

- command mode에서 [B]를 누르면 그 셀 아래로 새로운 셀이 생성됨

> edit mode일 때 Enter 단축키 종류

- [Ctrl] + [Enter] : 현재 셀 실행

- **[Shift] + [Enter] : 실행 + 다음 셀 선택(다음 셀 없으면 새로운 셀 생성) => 주로 이거로 사용!**

- [Alt] + [Enter] : 실행 + 다음 셀 생성

> 추가내용

- 궁금한 단축키가 있으면 [H]를 누르면 단축키 내용이 나옴
- 메뉴의 [Kernel] > [Restart & Clear Output] : 무한루프 빠졌을 때 강제 재실행

<br>

### 1.3 Programming Font의 조건

- **고정폭 글꼴**
  - 고정폭이어야 프로그래밍시 위치를 잘 잡을 수 있음

- **Sans-serif**

- **가독성과 명확한 구분**
  - 숫자 1, 소문자 L, 대문자 L, Pipe와 같은 것들이 구분될 수 있어야 함

<br>

<br>

----

<br>

<br>

## 2. 7월16일(2일차)

<br>

### 2.1 Python 예제(1일차 복습)

##### (1) 딕셔너리, if문을 이용하여 상승장, 하락장 출력하기

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

##### (2) 문장에서 모음만 제거하기

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

<br>

<br>

----

<br>

<br>

## 3. 7월17일(3일차)

<br>

### 3.1 Pyformat - Padding and aligning strings

> Align right

![01_day03_01](https://user-images.githubusercontent.com/52685250/61423304-46158400-a94a-11e9-8ae3-79cb66ded40a.JPG)

> Align left

![01_day03_02](https://user-images.githubusercontent.com/52685250/61423313-4b72ce80-a94a-11e9-9226-4824e0dbcdf5.JPG)

> Plus

![01_day03_03](https://user-images.githubusercontent.com/52685250/61423324-5299dc80-a94a-11e9-9f3a-63b9d7a4eb6f.JPG)

 ( Pyformat 이미지 출처 : https://pyformat.info/ )

<br>

### 3.2 가변 인자 리스트(*args)

- 임의의 숫자의 인자를 받기 위해 가변인자를 활용함

- 가변인자는**`tuple` 형태**로 처리가 되며, '*'로 표현됨

```python
def func(a, b, *args):

#*args : 임의의 개수의 위치인자를 받음을 의미

#보통, 이 가변인자 리스트는 형식 인자 목록의 마지막에 옵니다.
```

<br>

### 3.3 정의되지 않은 키워드 인자들 처리하기(**kwargs)

- 정의되지 않은 키워드 인자들은 **`dict` 형태**로 처리가 되며, `**`로 표현합니다.

- 주로 `kwagrs`라는 이름을 사용하며, `**kwargs`를 통해 인자를 받아 처리할 수 있습니다.

```python
def my_dict(**kwargs):
    result = []
    for key, value in kwargs.items():
        result.append(f'{key}: {value}')
    return ', '.join(result) # 리스트 -> 문자열로 ', '기준으로 합치기

result = my_dict(한국어='안녕', 영어='hello', 독일어='Guten Tag')
print(result)
```

```python
# 사실은 dict()는 출력이 아니라 딕셔너리를 return 합니다. 
# 딕셔너리를 return 하는 my_fake_dict() 를 만들어주세요.
def my_fake_dict(**kwargs):
    return kwargs

result = my_fake_dict(한국어='안녕', 영어='hello', 독일어='Guten Tag')
print(result)
```

<br>

### 3.4 인자 리스트 언패킹(unpacking arguments list)

> 패킹(packing)

- 여러 개의 값을 하나의 컬렉션으로 묶어 변수에 대입하는 것
- collection = 1, 2, 3

> 언패킹(unpacking)

- 컬렉션 속의 요소들을 여러 개의 변수에 나누어 대입하는 것
- a, b, c = collection

<br>

### 3.5 이름공간(namespace)

- 파이썬에서 사용되는 이름들은 이름공간(namespce)에 저장되어 있습니다.

- 그리고, `LEGB Rule` 을 가지고 있습니다. 
  - `L`ocal scope: 정의된 함수
  - `E`nclosed scope: 상위 함수 
  - `G`lobal scope: 함수 밖의 변수 혹은 import된 모듈
  - `B`uilt-in scope: 파이썬안에 내장되어 있는 함수 또는 속성

- 변수에서 값을 찾을 때 아래와 같은 순서대로 이름을 찾아나갑니다.

<br>

<br>

----

<br>

<br>

## 4. 7월18일(4일차)

<br>

### 4.1 Python Style Guide Recommend

```python
def func(parameter=5): # Recommend
    pass
def func(parameter = 5): # Not Recommend
    pass

func(5) # Must
func (5) # Never
```

```python
y = x**2 + 5
z = (x+y) * (x-y) # Recommend

y = x ** 2 + 5
z = (x + y) * (x - y) # Not Recommend
```

```python
if x > 10 and x % 2 == 0: # Not Recommend
    pass

if x>10 and x%2 == 0: # Recommend
    pass

if x >10 and x% 2 == 0: # Definitely do not do this!
    pass
```

```python
list = [1,2,3] # Not Recommend
list = [1, 2, 3] # Recommend
list = [ 1, 2, 3 ] # Not Recommend
print(x, y) # Only Recommend
```

```python
my_bool = 6 > 5
if my_bool == True: # Not Recommend
    return 'Hello'

my_bool = 6 > 5
if my_bool: # Recommend(위에 명확한 조건이 있으면 굳이 '==True'를 쓸 필요가 없다.)
    return 'Hello'
```

- 연산자 우선순위가 높은 것 끼리 붙여 쓰는 것이 좋다.

<br>

### 4.2 재귀 함수(recursive function)

- 재귀함수는 기본적으로 같은 문제이지만 점점 범위가 줄어드는 문제를 풀게 된다.
- 재귀함수를 작성시에는 반드시, `base case`가 존재 하여야 한다.
- `base case`는 점점 범위가 줄어들어 반복되지 않는 최종적으로 도달하는 곳이다.
- 자기 자신을 호출하는 **재귀함수는 알고리즘 구현시 많이 사용**된다.
- 코드가 더 직관적이고 이해하기 쉬운 경우가 있음. (하지만, 만들기는 어려움)
- [Python Tutor](https://goo.gl/k1hQYz)에 보면, 함수가 호출될 때마다 메모리 공간에 쌓이는 것을 볼 수 있다.
- 이 경우, 메모리 스택이 넘치거나(Stack overflow) 프로그램 실행 속도가 늘어지는 단점이 생긴다.
- 파이썬에서는 이를 방지하기 위해 **1,000번**이 넘어가게 되면 더이상 함수를 호출하지 않고, 종료된다. (**최대 재귀 깊이**)

<br>

### 4.3 얕은 복사(Shallow copy) VS 깊은 복사(Deep copy)

> 얕은 복사(Shallow copy)

```python
a = [1, 2, [1, 2]]
b = a[:]

b[2][0] = 100
print(a)
```

```python
# '얕은 복사' 출력
[1, 2, [100, 2]]
```

![01_day04_01](https://user-images.githubusercontent.com/52685250/61459503-cf0ed880-a9a7-11e9-997a-8c2bdf784855.jpg)



> 깊은 복사(Deep copy)

```python
import copy

a = [1, 2, [1, 2]]
b = copy.deepcopy(a)

b[2][0] = 100
print(a)
```

```python
# '깊은 복사' 출력
[1, 2, [1, 2]]
```

![01_day04_02](https://user-images.githubusercontent.com/52685250/61459559-f9609600-a9a7-11e9-9fd4-e6b8ea3fd786.jpg)

<br>

### 4.4 Parameter != Argument

```python
# x = parameter(매개변수)

def func(x):
    return x + 2

# 2 = argument(인자 또는 전달인자)

func(2)
```

- 매개변수는 함수의 정의 부분에서 볼 수 있다.
- 인자는 함수를 호출하는 부분에서 볼 수 있다.

<br>

<br>

----

<br>

<br>

## 5. 7월22일(5일차)

<br>

### 5.1 List, Dictionary Comprehension

##### (1) List Comprehension 구문 작성하기

- `[식 for 변수 in iterable]`
- `list(식 for 변수 in iterable)`

<br>

##### (2) List Comprehension + 조건문

- `[식 for 변수 in iterable if 조건식]` => **<u>주로 이 표현식 많이 씀</u>**
- `[식 if 조건식 else 식 for 변수 in iterable]` : if 조건식에 else가 붙은 경우
- `[식 if 조건식 else 식 if 조건식 else 식 for 변수 in interable]` : elif의 경우

<br>

##### (3) Dictionary Comprehension

- `{키: 값 for 키, 값 in 딕셔너리}`
- `dict(키: 값 for 키, 값 in 딕셔너리)`
- `{키: 값 for 키, 값 in 딕셔너리 if 조건식}`
- `{키: 값 if 조건식 else 값 for 키, 값 in 딕셔너리}`

<br>

### 5.2 set

##### (1) set에서 임의의 원소의 의미(ex .pop())

- 불변인 type은 python이 **hash table** 이라는 것으로 만듬(가변인 것은 애초에 hash table로 안 만듬)
- 이 hash table에 **정해진 순서**가 존재함.
- 현재 python 실행환경에서 set.pop()이 계속 같은 이유는 **처음 만들어진 set이 같은 hash table 값으로 이루어져**있기 때문임.
- **python 실행환경이 바뀌어야 pop으로 나오는 인자가 바뀜**. 즉, python 실행환경이 바뀌면 만들어지는 hash table도 바뀌기 때문임.
- jupyter notebook에서 kernel을 restart하면 pop으로 나오는 인자가 바뀜.

<br>

### 5.3 map()

- `map(function, iterable)` 와 같은 형태로 작성한다.

- iterable의 모든 원소에 function을 적용한 후 그 결과를 돌려준다.

- return은 `map_object` 형태로 됩니다.
- `map()`은 아주 강력한 도구이므로 반드시 알아두자!!

```python
# 세제곱의 결과를 나타내는 함수
def cube(num):
    return num**3

numbers = [1, 2, 3, 4, 5]
result = list(map(cube, numbers))
# map에 들어가는 function 자리는 사용자 정의 함수명만 작성하면 됨.
# map object 자체를 함수로 호출해야 하므로 list()를 써야 함 (딕셔너리는 dict()로!)
print(result)
```

<br>

<br>

------

<br>

<br>

## 6. 7월23일(6일차)

<br>

### 6.1 isdecimal(), isdigit(), isnumeric()

<img width="655" alt="01_day05_01" src="https://user-images.githubusercontent.com/52685250/61682821-1c939880-ad4e-11e9-9f52-3c2840e29544.png">

<br>

### 6.2 모듈, 패키지, 파이썬 표준 라이브러리

- `모듈` : 특정 기능을 .py 파일 단위로 작성한 것.
- `패키지` : 특정 기능과 관련된 여러 모듈을 묶은 것. 보통 인터넷에 있는 패키지를 설치해서 사용.
- `파이썬 표준 라이브러리` : 파이썬에 기본적으로 설치된 모듈과 내장 함수를 묶어서 파이썬 표준 라이브러리 (Python Standard Library, PSL) 라 함.

<br>

### 6.3 예외 처리

##### (1) 기본 - try, except

```python
try:
    num = input('값을 입력하시오. : ')
    print(int(num))
except ValueError: # 에러 마다 고유의 이름이 존재하므로 대소문자 구별하여 잘 적을 것
    print('바보야 숫자를 입력해!')
```

<br>

##### (2) 복수의 예외 처리

```python
try:
    num = input('100 으로 나눌 값을 입력하시오. : ')
    print(100/int(num))
except (ValueError, ZeroDivisionError):
    print('바보냐?')
```

```python
try:
    num = input('100 으로 나눌 값을 입력하시오. : ')
    100/int(num)
except ValueError:
    print('숫자를 넣어')
except ZeroDivisionError:
    print('0으로 나눌 수 없어')
except:
    print('모르겠지만 오류야!')
```

<br>

##### (3) 에러의 범주

<img width="678" alt="01_day05_02" src="https://user-images.githubusercontent.com/52685250/61690650-c8e07980-ad64-11e9-9b9d-f6d8b63cf921.png">

<br>

##### (4) 에러 문구 처리

```python
try:
    empty_list = []
    print(empty_list[-1])
except IndexError as err:
    print(f'{err}, 오류가 발생하였습니다.')
```

<br>

##### (5) else

- `else`는 모든 `except` 절 뒤에 와야 한다.
- `try` 절이 예외를 일으키지 않을 때 실행되어야만 하는 코드에 적절하다.

```python
try:
    numbers = [1, 2, 3]
    number = numbers[2]
except IndexError:
    print('오류 발생 !!')
else:
    print(number * 100)

# 300이 출력
```

```python
try:
    numbers = [1, 2, 3]
    number = numbers[100]
except IndexError:
    print('오류 발생 !!')
else:
    print(number * 100)

# '오류 발생 !!' 이 출력
```

<br>

##### (6) finally

- 모든 상황에 실행되어야만 하는 코드를 정의하는데 활용된다.
- 예외의 발생 여부와 관계없이 `try` 문을 떠날 때 항상 실행된다.

```python
try:
    languages = {'python': 'good'}
    languages['java']
except KeyError as err:
    print(f'{err} 는 딕셔너리에 없는 키입니다.')
finally:
    print(f'마침내 여기까지 왔네')
```

<br>

<br>

------

<br>

<br>

## 7. 7월24일(7일차)

<br>

### 7.1

<br>

### 7.2

<br>

### 7.3

<br>

<br>

------

<br>

<br>

## 8. 7월24일(8일차)

<br>

### 8.1

<br>

### 8.2

<br>

### 8.3


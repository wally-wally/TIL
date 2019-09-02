# :notebook_with_decorative_cover: 01_python - (1) python_intro

<br>

## 1. 식별자

- 영문 알파벳, 밑줄(_), 숫자로 구성된다.
- 첫 글자에 숫자가 올 수 없다.
- 길이에 제한이 없다.
- 영문 알파벳 대소문자를 구별한다.
- 밑줄문자(_)로 시작할 수 있다.
- 특수 문자(+, -, *, /, $, @, &, % 등)는 사용할 수 없다.
- 아래의 예약어는 사용할 수 없다.

```python
import keyword
print(keyword.kwlist)
```

- 위 구문을 입력하여 아래와 같이 확인할 수 있음
- `False, None, True, and, as, assert, break, class, continue, def, del, elif, else, except, finally, for, from, global, if, import, in, is, lambda, nonlocal, not, or, pass, raise, return, try, while, with, yield`

<br>

## 2. 기초문법

- 인코딩은 선언하지 않더라도 `UTF-8`로 기본 설정이 되어 있다.
- 주석은 `#`으로 표현하고, `docstring`은 `"""`으로 표현한다.
- `docstring`은 다음과 같이 확인할 수 있다. => `함수명.__doc__`

```python
sum.__doc__
max.__doc__
```

<br>

## 3. 변수 및 자료형

- 변수는 `=`을 통해 **<u>할당</u>**(assignment) 된다.
- 해당 **<u>자료형</u>**을 확인하기 위해서는 `type()`을 활용한다.
- 해당 변수의 **<u>메모리 주소</u>**를 확인하기 위해서는 `id()`를 활용한다.
- [예제] 변수 `x`와 `y`의 값 바꾸기

```python
x, y = y, x
print(x, y)
```

<br>

### 3.1 숫자형(Numbers)

#### (1) `int` (정수, integer)

- 모든 정수는 `int`로 표현된다.
- 파이썬 3.x 버전에서는 **`long` 타입은 없고 모두 `int` 형으로 표기**된다.
- 파이썬에서 가장 큰 숫자를 활용하기 위해 `sys` 모듈을 불러온다.

```python
import sys
max_int = sys.maxsize
# sys.maxsize 의 값은 2**63-1 => 64비트 컴퓨터에서 부호비트를 뺀 63개의 최대치
print(max_int)
super_max = sys.maxsize +sys.maxsize
print(super_max)
```

- 파이썬은 기존 C 계열 프로그래밍 언어와 다르게 정수 자료형(integer)에서 **<u>오버플로우</u>**가 없다.

  - `오버플로우(overflow)` : 표현할 수 있는 수의 범위를 넘어가는 연산을 하게 되면, 기대했던 값이 출력되지 않는 현상, 즉 메모리가 차고 넘쳐 흐르는 현상

- **`arbitrary-precision arithmetic`**을 사용하기 때문이다.

  - 파이썬에서 아주 큰 정수를 표현할 때 사용하는 메모리의 크기 변화
  - 사용할 수 있는 메모리양이 정해져 있는 기존의 방식과 달리, 현재 남아있는 만큼의 가용 메모리를 모두 수 표현에 끌어다 쓸 수 있는 형태.
  - 특정 값을 나타내는데 4바이트가 부족하다면 5바이트, 더 부족하면 6바이트까지 사용할 수 있게 유동적으로 운용.

- 8진수 : `0o` / 2진수 : `0b` / 16진수 : `0x` 로도 표현 가능하다.

<br>

#### (2)  `float` (부동소수점, 실수, floating point numbers)

- 실수는 `float`로 표현된다.

- 다만, 실수를 컴퓨터가 표현하는 과정에서 부동소수점을 사용하며, 항상 같은 값으로 일치되지 않는다.(floating point rounding error)

  - 이는 컴퓨터가 2진수(비트)를 통해 숫자를 표현하는 과정에서 생기는 오류이며, 대부분의 경우는 중요하지 않으나 값을 같은지 비교하는 과정에서 문제가 발생할 수 있다.


```python
3.5 + 3.2  # => 6.7
3.5 - 3.12 # => 0.3799999999999999
3.5 - 3.12 == 0.38 # => False
```

```python
# 우리가 원하는대로 반올림을 해봅시다.
# round() 는 0~4는 내림, 5는 동일하게 작동하지 않고 반올림 방식에 따라 다르다.
# 짝수에서 .5는 내림 / 홀수에서 5는 올림
round(3.5-3.12, 2) # => 0.38
round(2.5) # => 2
```

- 부동소수점 오류 처리 방법

```python
# 1. 기본적인 처리방법을 알아봅시다.
a = 3.5 - 3.12
b = 0.38

abs(a - b) <= 1e-10 ## 두 값의 차이가 10의 -10제곱보다 작다고 판단되면 두 수는 같은 것임
```

```python
# 2. sys 모듈을 통해 처리하는 방법을 알아봅시다.
# `epsilon` 은 부동소수점 연산에서 반올림을 함으로써 발생하는 오차 상환
import sys
abs(a - b) <= sys.float_info.epsilon
```

```python
# 3. [이건 꼭 기억!]python 3.5부터 활용 가능한 math 모듈을 통해 처리하는 법을 알아봅시다.
import math
math.isclose(a, b)
```

<br>

#### (3)  `complex` (복소수, complex numbers)

- 복소수 z에서 실수부와 허수부를 추출하려면 `z.real`과 `z.imag`를 사용한다.

```python
a = 3 - 4j
print(type(a)) # => complex
print(a.real) # 복소수의 실수부
print(a.imag) # 복소수의 허수부
print(a.conjugate()) # 켤레복소수
```

- 복소수를 문자열로 반환시, 문자열은 중앙의 부호 연산자 주위에 공백을 포함해서는 안 된다.

  - `complex(1+2j)` (O) / `complex('1 + 2j')` (X) => `ValueError` 발생함

<br>

### 3.2 bool

- `True`와 `False`로 이루어져 있다.

- 다음은 `False`로 변환된다.

  - `0, 0.0, (), [], {}, '', None`


```python
print(type(True))
print(type(False))
# 모두 <class 'bool'> 이 출력됨
```

<br>

### 3.3 None

- 값이 없음을 표현하기 위해 `None` 타입이 존재한다.
- `type(None)` =>  NoneType

:heavy_check_mark:**​ `type()`으로 자료형 확인시 출력의 차이**

``` python
a = 3
type(a) # => int
print(type(a)) # => <class 'int'>
```

<br>

### 3.4 문자형(String)

#### (1) 문자형 기본 내용

* 문자열은 Single quotes(`'`)나 Double quotes(`"`)을 활용하여 표현 가능하다.

    - 작은따옴표: `'"큰" 따옴표를 담을 수 있습니다'`
- 큰따옴표: `"'작은' 따옴표를 담을 수 있습니다"`
    - 삼중 따옴표: `'''세 개의 작은따옴표'''`, `"""세 개의 큰따옴표"""`

* 단, 문자열을 묶을 때 동일한 문장부호를 활용해야하며, `PEP-8`에서는 **하나의 문장부호를 선택**하여 유지하도록 하고 있습니다.  (Pick a rule and Stick to it)

```python
# 사용자에게 받은 입력은 기본적으로 str입니다
age = input() # 예)2라고 입력
print(age) # => 2
print(type(age)) # => <class 'str'>
```

* 다만 문자열 안에 문장부호(`'`, `"`)가 활용될 경우 이스케이프 문자(`\`)를 사용하는 것 대신 활용 가능 합니다. 

    * `print('철수가 말했다. \'안녕?\'')` 으로 작성 가능하다.

- 여러줄에 걸쳐있는 문장은 `"""`를 사용한다.

```python
a = True
print(f"""
물론,
f-string 도 사용 가능합니다.
{a}!!!!
""")
```

- 문자열은 `+` 연산자로 이어붙이고, `*` 연산자로 반복시킬 수 있다.

  - `3 * 'hey ' + 'yo!'` => `'hey hey hey yo!'`
- 두 개 이상의 문자열이 연속해서 나타나면 자동으로 이어 붙여진다.

  - `'Py' 'thon'` => `'Python'`

<br>

#### (2) 이스케이프 시퀀스

- 문자열을 활용하는 경우 특수문자 혹은 조작을 하기 위하여 사용되는 것으로 `\`를 활용하여 이를 구분한다.

  - `\n` : 줄 바꿈
  - `\t` : 탭
  - `\r` : 캐리지리턴
  - `\0` : 널(Null)
  - `\\` : \
  - `'` : 단일인용부호(')
  - `"` : 이중인용부호(")


```python
print('이 다음은 엔터\n그리고 탭\t탭')

print('내용을 띄워서 출력하고 싶으면?', end='\t')
print('옆으로 띄워짐')

print('개행 문자 말고도 가능합니다', end='!')
print('진짜로', end='!!')
print('print는 기본이 \\n', end='!')
# 개행 문자 말고도 가능합니다!진짜로!!print는 기본이 \n!
```

<br>

#### (3) String interpolation

- `name = 'kim'`
- `'Hello, %s' % name`
- `'Hello, {}'.format(name)`
- `f'Hello, {name}'`
- f-strings에서는 형식을 지정할 수 있다.

```python
from datetime import datetime
today = datetime.now()
print(today)
print(f'오늘은 {today:%y}년 {today:%m}월 {today:%d}일 {today:%a}')
print(f'오늘은 {today:%Y}년 {today:%m}월 {today:%d}일 {today:%A}')
```

```python
# string interpolation에서 연산과 숫자 출력형식을 지정해봅시다.
pi = 3.141592
f'원주율은 {pi:.3}. 반지름이 2일 때 원의 넓이는 {pi*(2**2)}'
```

<br>

## 4. 연산자

### 4.1 산술 연산자

- `+`,  `-`,  `*`,  `/`,  `//`,  `%`,  `**` 이 있다.
- 나눗셈(`/`) 은 항상 `float`를 돌려준다.
- 정수 나눗셈으로 (소수부 없이) 정수 결과를 얻으려면 `//` 연산자를 사용한다.
- `divmod` 는 나눗셈과 관련된 함수이다.

```python
print(divmod(5, 2))
quotient, remainder = divmod(5, 2)
print(f'몫은 {quotient}이고, 나머지는 {remainder}이다.')

# 아래와 같이 출력된다.
# (2, 1)
# 몫은 2이고, 나머지는 1이다.
```

<br>

### 4.2 비교 연산자

- 이상, 이하, 초과, 미만, 같음, 같지 않음, `is` (객체 아이덴티티), `is not` (부정된 객체 아이덴티티) 가 있다.

<br>

### 4.3 비교 연산자

- 우리가 보통 알고 있는 `&`, `|` 은 파이썬에서 비트 연산자이다.
- **<u>단축평가(short-circuit evaluation)</u>**

```python
# and의 단축평가(short-circuit evaluation)에 대해서 알아봅시다.
print(3 and 5) # 앞이 True지만 뒤가 T/F에 따라 결과값이 달라지므로 뒤의 값이 출력됨.
print(3 and 0) # 앞이 True지만 뒤가 T/F에 따라 결과값이 달라지므로 뒤의 값이 출력됨.
print(0 and 3) # 이미 0이 False이므로 뒤에 볼 필요가 없다.
print(0 and 0) # 출력되는 0은 앞의 0이다.
```

```python
# or의 단축평가(short-circuit evaluation)에 대해서 알아봅시다.
print(5 or 3) # 뒤를 볼 필요가 없으므로 5가 이미 True이므로 5가 출력됨.
print(3 or 0) # 뒤를 볼 필요가 없으므로 5가 이미 True이므로 5가 출력됨.
print(0 or 3) # 앞이 False이지만 뒤의 값을 확실히 알아야 되므로 3이 출력됨.
print(0 or 0) # 이땐 뒤의 0이 출력됨.
```

<br>

### 4.4 복합 연산자

```python
# 복합연산자는 이럴 때 사용됩니다.
count = 0
while count <5:
    print(count)
    count += 1 # 이 구문이 반드시 있어야 무한루프에 안 걸린다.
```

<br>

### 4.5 기타 연산자

```python
# 문자열끼리 더해봅시다.(합쳐봅시다.)
'Hi, ' + 'bye!'
```

```python
# list끼리 더해봅시다.(합쳐봅시다.)
[1, 2, 3] + [4, 5, 6]
```

```python
# 문자열안에 특정한 문자가 있는지 확인해봅시다.
'a' in 'apple'
```

```python
# list안에 특정한 원소가 있는지 확인해봅시다.
1 in [1, 2, 3]
```

```python
# range안에 특정한 원소가 있는지 확인해봅시다.
5 in range(5) # range는 0부터 시작한다!
```

```python
# is는 맛만 봅시다.
# 파이썬에서 -5 부터 256 까지의 id는 동일합니다.
a = 3
b = 3
a is b
```

```python
# id는 다르죠!
a = 257
b = 257
a is b # 값은 같지만 id가 다르므로 False가 출력됨.
```

```python
# 문자열을 인덱싱을 통해 값에 접근해봅시다.
'hi'[0]
```

<br>

### 4.6 연산자 우선순위

1. `()`을 통한 grouping
2. Slicing
3. Indexing
4. 제곱연산자 **
5. 단항연산자 +, - (음수/양수 부호)
6. 산술연산자 *, /, %
7. 산술연산자 +, -
8. 비교연산자, `in`, `is`
9. `not`
10. `and`
11. `or`

```python
print(-3 ** 6) # => -729
print((-3) ** 6) # => 729
```

<br>

## 5. 기초 형변환(Type conversion)

### 5.1 암시적 형변환(Implicit Type Conversion)

- 사용자가 의도하지 않았지만, 파이썬 내부적으로 자동으로 형변환 하는 경우
- `bool`, `Numbers(int, float, complex)` 의 상황에서만 가능하다.

```python
True + 3 # => 4

int_number = 3
float_number = 5.0
complex_number = 3+5j

print(int_number + float_number) # => 8.0
print(type(int_number + float_number)) # => <class 'float'>

print(int_number + complex_number) # => (6+5j)
print(type(int_number + complex_number)) # => <class 'complex'>
```

<br>

### 5.2 명시적 형변환(Explicit Type Conversion)

- 위의 상황을 제외하고는 모두 명시적으로 형 변환을 해주어야한다.
  - string -> intger : 형식에 맞는 숫자만 가능
  - integer -> string : 모두 가능
- 암시적 형변환이 되는 모든 경우도 명시적으로 형변환이 가능하다.
  - `int()` : string, float를 int로 변환
  - `float()` : string, int를 float로 변환
  - `str()` : int, float, list, tuple, dictionary를 문자열로 변환

```python
# integer와 string 사이의 관계는 명시적으로 형변환을 해줘야만 합니다.
# 1 + '등'와 같이 입력하면 오류발생
str(1) + '등'

# string은 글자가 숫자일때만 형변환이 가능합니다.
a = 'hi'
int(a) # => ValueError

# string 3.5를 int로 변환할 수는 없습니다.
a = '3.5'
int(a) # => ValueError

# float 3.5는 int로 변환이 가능합니다. / float => int : 내림과정 수행
a = 3.5
int(a) # => 3
```

<br>

## 6. 시퀀스 자료형

- `시퀀스` : 데이터의 순서대로 나열된 형식
  - **순서대로 나열된 것이 정렬되었다 라는 뜻은 아니다.**

### 6.1 리스트(list)

```python
location = ['서울', '대전', '광주', '구미']
print(location)
print(type(location))
print(location[1]) # => '대전'
```

<br>

### 6.2 튜플(tuple)

- 리스트와 유사하지만 `()`로 묶어서 표현된다.
- 수정 불가능(불변, **<u>immutable</u>**)하고, **<u>읽을 수 밖에 없다</u>**.
- 직접 사용하는 것보다는 파이썬 내부에서 사용하고 있다.

- **하나의 항목으로 구성된 튜플은 값 뒤에 쉼표를 붙여서 만든다.**

  - ```python
    single_tuple = (1)
    print(type(single_tuple)) # => <class  'int'>
    single_tuple2 = (1,)
    print(type(single_tuple2)) # => <class 'tuple'>
    ```

<br>

### 6.3 range()

- 숫자의 시퀀스를 나타내기 위해 사용된다.
- `range(n)` : 0부터 n-1까지의 값
- `range(n, m)` : n부터 m-1까지의 값
- `range(n, m, s)` : n부터 m-1까지 +s만큼 증가한다.

<br>

### 6.4 시퀀스에서 활용할 수 있는 연산자/함수

```python
# concatenation(연결, 연쇄)를 해봅시다.
print('안녕, ' + '하세요')
print((1, 2) + (3, 4))
```

```python
# 숫자 0이 6개 있는 list를 만들어봅시다.
[0] * 6
```

```python
# 두번째, 세번째 값만 가져와봅시다.
location = ['서울', '대전', '광주', '구미']
location[1:3]
```

```python
# [조금 어려움]0부터 30까지의 숫자를 3씩 증가시킨 상태로 만들어봅시다.
sample_list = list(range(0, 31))
print(sample_list)

test_list = sample_list[0:len(sample_list):3]
test_list = sample_list[0::3]
print(test_list)

# 위에서 만든 list의 길이를 확인해봅시다.
len(test_list)

# 위에서 만든 list의 최솟값, 최댓값을 확인해봅시다.
print(max(test_list))
print(min(test_list))
```

```python
# list에 담긴 특정한 것의 개수를 확인할 수도 있습니다.
sample_list = [1, 2, 1, 3, 1, 5]
sample_list.count(1)
```

<br>

### 6.5 set

- 수학에서의 집합과 동일하게 처리되고, 중괄호 `{}`를 통해 만들며, **순서가 없고 중복된 값이 없다**.
- **빈 집합을 만들려면 `set()`을 사용해야 한다. `{}`가 아니다.**

```python
# set 두개를 만들어서 연산자들을 활용해봅시다.
set_a = {1, 2, 3}
set_b = {3, 6, 9}
print(set_a - set_b) # => {1, 2}
print(set_a | set_b) # => {1, 2, 3, 6, 9}
print(set_a & set_b) # => {3}
```

```python
# set은 중복된 값이 있을 수 없습니다.
set_c = {1, 1, 1}
print(set_c) #=> {1}
```

```python
# set으로 중복된 값을 제거해봅시다.
list_a = [1, 2, 3, 1, 1, 2]
set_list = set(list_a)
print(set_list) # => {1, 2, 3}

# 다시 list로 바꿔서 확인해봅시다.
list(set_list) # => [1, 2, 3]
```

<br>

### 6.6 Dictionary

- 딕셔너리는 `key`와 `value`가 쌍으로 이뤄져있으며, 궁극의 자료구조입니다.
- `{}`를 통해 만들며, `dict()`로 만들 수도 있습니다.
- `key`는 불변(immutable)한 모든 것이 가능하다. (불변값 : string, integer, float, boolean, tuple, range)
- `value`는 `list`, `dictionary`를 포함한 모든 것이 가능하다.

```python
# 비어있는 dictionary를 두가지 방법으로 만들어봅시다.
# [중요!]단, set 자료형은 반드시 set() 함수를 사용해서 만든다.
dict_a = {}
print(type(dict_a))

dict_b = dict()
print(type(dict_b))

set_a = set()
print(type(set_a))
```

```python
# 지역번호(서울-02 경기-031)가 담긴 전화번호부를 만들어봅시다.
phone_book = {
    '서울': '02',
    '경기': '031'
}

# 딕셔너리의 .keys() 메소드를 활용하여 key를 확인 해볼 수 있습니다.
phone_book.keys()

# 딕셔너리의 .values() 메소드를 활용하여 value를 확인 해볼 수 있습니다.
phone_book.values()

# 딕셔너리의 .items() 메소드를 활용하여 key, value를 확인 해볼 수 있습니다.
phone_book.items()
```

```python
# dictionary는 중복된 key는 존재할 수가 없습니다. => 중복되면 마지막으로 선언된게 들어가진다.
dict_a = {1: 1, 2: 2, 3: 3, 1: 4}
print(dict_a)
```

<br>

### 7. 데이터 타입 정리

<center><img src="https://user-images.githubusercontent.com/18046097/61180439-44e60d80-a651-11e9-9adc-e60fa57c2165.png", alt="container"/></center>
* `dictionary`는 key만 immutable하다.
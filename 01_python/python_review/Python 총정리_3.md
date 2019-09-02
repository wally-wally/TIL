# :notebook_with_decorative_cover: 01_python - (3) function

<br>

## 1. 함수의 선언과 호출

```python
def func(parameter1, parameter2):
    code line1
    code line2
    return value
```

- 함수 선언은 `def`로 시작하여 `:`으로 끝나고, 다음은 `4spaces 들여쓰기`로 코드 블록을 만듭니다.
- 함수는 `매개변수(parameter, 인자)`를 넘겨줄 수도 있습니다.
- 함수는 동작후에 `return`을 통해 결과값을 전달 할 수도 있습니다. **(`return` 값이 없으면, None을 반환합니다.)**
- 함수는 호출을 `func()` / `func(val1, val2)`와 같이 합니다.

```python
def rectangle(width, height):
    area = width * height
    perimeter = 2 * (width + height)
    return f'직사각형 둘레: {perimeter}, 면적: {area}입니다.'
# print는 터미널에 단순 출력 기능, return 변수에 할당가능! print로 설정하면 None이 출력됨.
# 함수에서는 반드시 return을 쓰자

rectangle(30, 70)
```

<br>

## 2. 함수의 `return`

- 앞서 설명한 것과 마찬가지로 함수는 반환되는 값이 있으며, 이는 어떠한 종류의 객체여도 상관없다.
- 단, **오직 한 개의 객체만 반환**된다.
  - return a, b 처럼 쓸 수 있으나 이는 실제로 튜플 1개가 리턴되는 것이고 이는 하나의 튜플 객체이다.
- 함수가 return 되거나 종료되면, 함수를 호출한 곳으로 돌아간다.

<br>

## 3. 함수의 인자(Arguments)

### 3.1 위치 인자(Positional Arguments)

- 함수는 기본적으로 인자를 위치로 판단한다.

```python
def cylinder(r, h):
    return r**2 * 3.14 * h

print(cylinder(5, 2))
```

<br>

### 3.2 기본 인자 값(Default Argument Values)

- 함수가 호출 될 때, 인자를 지정하지 않아도 기본 값을 설정할 수 있다.
- 기본 인자 값이 설정되어 있더라도 기존의 함수와 동일하게 호출이 가능하다.
- 호출시 인자가 없으면 기본 인자 값이 활용된다.

```python
def greeting(name='익명'): # 기본값이 있으면 오류를 방지해주는 역할도 함
    return f'{name}, 안녕?'

greeting() # => '익명, 안녕?'
greeting('길동') # => '길동, 안녕?'
```

- **<u>단, 기본 인자 이후에 기본 값이 없는 인자는 사용할 수 없다.</u>**

```python
def greeting(name='john', age):
    return f'{name}은 {age}살 입니다.'
greeting(1)

# SyntaxError: non-default argument follows default argument와 같이 오류 발생
```

```python
# 수정해 봅시다.(1)
def greeting(age, name='john'):
    return f'{name}은 {age}살 입니다.'
greeting(1)
```

```python
# 수정해 봅시다.(2)
def greeting(age, name='john'):
    return f'{name}은 {age}살 입니다.'
greeting(1, '철수')
```

<br>

### 3.3 키워드 인자(Keyword Arguments)

- 키워드 인자는 직접적으로 변수의 이름으로 특정 인자를 전달할 수 있다.

```python
def greeting(age, name='john'):
    return f'{name}은 {age}살 입니다.'

greeting(name = '철수', age = 25) # 이와 같이 키워드 인자를 사용하면 위치 바뀌어도 출력됨
greeting(25, name = '철수') # 위와 아래랑 같은 출력
```

- 단, 아래와 같이 키워드 인자를 활용한 뒤에 위치 인자를 활용할 수는 없다.

```python
greeting(age = 25, '철수')
```

:heavy_check_mark: 초기값이 지정된 인자는 뒤쪽에 몰아주면 된다! 그 뒤에 초기값이 없는 인자는 올 수 없다!

<br>

### 3.4 가변 인자 리스트(Arbitrary Argument Lists)

- 정해지지 않은 임의의 숫자의 인자를 받기 위해서는 가변인자를 활용한다.
- 가변인자는 `tuple` 형태로 처리가 되며, `*` 로 표현한다.

```python
def func(a, b, *args):
# *args : 임의의 개수의 위치인자를 받음을 의미
# 보통, 이 가변인자 리스트는 형식 인자 목록의 마지막에 온다.
```

```python
def my_func(*args):
    return args

my_func(1, 2) # => (1, 2)와 같이 출력됨
```

> 정수를 여러 개 받아서 가장 큰 값을 반환(return)하는 `my_max()` 만들기
>
> `my_max(10, 20, 30, 40)` => 예시출력) 50

```python
def my_max(*args):
    result = 0
    for idx, val in enumerate(args):
        if idx == 0:
            result = val
        else:
            if val > result:
                result = val
    return result

my_max(10, 20, 30, 50)
```

> 숫자들을 받아서 양의 정수의 합을 구하는 함수 `positive_sum()` 만들기
>
> ```python
> positive_sum(1,-4,7,12) #=> 20
> ```

```python
def positive_sum(*args):
    # 최종 합산 값 / 반복문을 통해 args를 평가 / 크기가 0보다 큰 지 / 크면 최종 합산 값을 더하기
    total = 0
    for arg in args:
        if arg > 0 :
            total += arg
    return total

print(positive_sum(1,-4,7,12))
```

<br>

### 3.5 정의되지 않은 키워드 인자들 처리하기

- 정의되지 않은 키워드 인자들은 `dict` 형태로 처리가 되며, `**` 로 표현한다.
- 주로 `kwargs`라는 이름을 사용하며, `**kwargs` 를 통해 인자를 받아 처리할 수 있다.
- `dict()` 함수는 파이썬 표준 라이브러리의 내장함수 중 하나이며, 다음과 같이 구성되어 있다.

<center>
    <img src="https://user-images.githubusercontent.com/18046097/61181740-2984fd80-a665-11e9-94cf-7f5ab41873b1.png", alt="dictionary">
</center>

```python
hello = dict(한국어='안녕', 영어='hello', 독일어='Guten Tag') # 괄호 안은 키워드 인자
print(hello)
# {'한국어': '안녕', '영어': 'hello', '독일어': 'Guten Tag'}
```

```python
# 주의 사항
# 식별자는 숫자로 시작할 수 없다.(키워드 인자로 넘기면 함수 안에서 식별자로 쓰이기 때문)
dict(1=1, 2=2) # 이렇게 쓰면 안 됨

# key가 숫자인 경우는 이렇게 사용해야 합니다.
dict([(1, 1), (2, 2)])
dict(((1, 1), (2, 2)))
```

> `my_dict()`함수를 만들어 실제로 dictionary 모습으로 출력 함수 만들기

```python
def my_dict(**kwargs):
    result = []
    for key, value in kwargs.items():
        result.append(f'{key}: {value}')
    return ', '.join(result) # 리스트 -> 문자열로 ', '기준으로 합치기

result = my_dict(한국어='안녕', 영어='hello', 독일어='Guten Tag')
print(result)

# 한국어: 안녕, 영어: hello, 독일어: Guten Tag
```

```python
# 사실은 dict()는 출력이 아니라 딕셔너리를 return 합니다. 
# 딕셔너리를 return 하는 my_fake_dict() 를 만들어주세요.
def my_fake_dict(**kwargs):
    return kwargs

result = my_fake_dict(한국어='안녕', 영어='hello', 독일어='Guten Tag')
print(result)

# {'한국어': '안녕', '영어': 'hello', '독일어': 'Guten Tag'}
```

<br>

### 3.6 인자 리스트 언패킹(unpacking arguments list)

- 패킹(packing) : 여러 개의 값을 하나의 컬렉션으로 묶어 변수에 대입하는 것
  - `collection = 1, 2, 3`
- 언패킹(unpacking) : 컬렉션 속의 요소들을 여러 개의 변수에 나누어 대입하는 것
  - `a, b, c = collection`

```python
list(range(3, 6))
# [3, 4, 5]

args = [3, 6]
list(range(*args)) # list로부터 언패킹한 인자 호출
# [3, 4, 5]
```

```python
# 다음과 같이 사용할 수도 있습니다.
#args_list = ['ming', 'alice', 'tom']
#kwargs_dict = {'wilson': 'ball', 'toy': 'story'}

def combination(*args, **kwargs):
    return args, kwargs

result = combination('ming', 'alice', 'tom', willson='ball', toy='story', spider='man')
print(result)

# (('ming', 'alice', 'tom'), {'willson': 'ball', 'toy': 'story', 'spider': 'man'})
```

> 영진위에서 제공하는 일별 박스오피스 API 서비스 요청하는 URL 편하게 만들기

```python
# 1 재사용성이 좋음

def my_url(**kwargs):
    base_url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?'
    for key, value in kwargs.items():
        base_url += f'{key}={value}&'
    return base_url

api = {
    'key': '^^',
    'targetDt': '20190701'
}

my_url(**api)
```

```python
# 2 기본 인자 값 추가

def my_url(itemPerPage=10, **kwargs): # itemPerPage=10(기본 인자 값)은 default 값으로 지정하고, 가변 인자 리스트(**kwargs)는 뒤에 붙는다.
    
    # 검증
    if int(itemPerPage) not in range(1,11):
        return f'1~10까지의 값을 넣어주세요.'
    
    if 'key' not in kwargs or 'targetDt' not in kwargs:
        return f'필수 요청변수가 누락되었습니다.'
    
    base_url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?'
    base_url += f'itemPerPage={itemPerPage}&'
    for key, value in kwargs.items():
        base_url += f'{key}={value}&'
    return base_url

api = {
    'key': '^^',
    'targetDt': '20190701'
}

my_url(3, **api)
```

<br>

### 3.7 이름공간(namespace)

- 파이썬에서 사용되는 이름들은 이름공간(namespce)에 저장되어 있습니다.

- 그리고, `LEGB Rule` 을 가지고 있습니다. 

- 변수에서 값을 찾을 때 아래와 같은 순서대로 이름을 찾아나갑니다.
  - `L`ocal scope: 정의된 함수
  - `E`nclosed scope: 상위 함수 
  - `G`lobal scope: 함수 밖의 변수 혹은 import된 모듈
  - `B`uilt-in scope: 파이썬안에 내장되어 있는 함수 또는 속성

```python
def test():
    str = '4' # local scope
    
str = '5' # Global scope
str(3)
```

- `str()` 코드가 실행되면
- str 을 Global scope에서 먼저 찾아서 `str = 4`를 가져오고,
- 이는 함수가 아니라 변수이기 때문에 `not callable`하다라는 오류를 내뱉게 됩니다.
- 우리가 원하는 `str()`은 Built-in scope에 있기 때문입니다.

```python
a = 1 # 전역 변수
def localscope(a):
    return a

localscope(3) # => 3
```

```python
# 전역 변수를 바꿀 수 있을까요?

global_num = 3 # 전역 변수
def localscope_2():
    global_num = 5
    return f'global_num이 {global_num}로 설정되었습니다.'

localscope_2() # => 5로 출력
print(global_num) # => 3으로 출력
```

```python
# 굳이 전역에 있는 변수를 바꾸고 싶다면, 아래와 같이 선언할 수 있습니다.

global_num = 3 
def localscope_3():
    global global_num # 앞에 global 붙이면 전역 변수를 바꿀 수 있다.
    global_num = 5
    return f'global_num이 {global_num}로 설정되었습니다.'

localscope_3()
print(global_num) # => 5로 출력
```

<br>

## 4. 재귀 함수(recursive function)

### 4.1 반복문 vs 재귀함수

```python
def fact(n):
    result =  1
    # n이 1보다 작아지는 때에 반복이 종료되어야 함
    while n > 1:
        result *= n
        n -= 1
    return result

fact(5)
```

```python
def factorial(n):
    if n == 1: # n이 1이면 1을 return하고 재귀호출을 끝냄.(base case)
        return 1
    return n * factorial(n-1) # n과 factorial 함수에 n-1을 넣어서 return된 값을 곱함.

factorial(5)
```

```python
factorial(3)
3 * factorail(2)
3 * 2 * factorial(1)
3 * 2 * 1
3 * 2
6
```

* 두 코드 모두 원리는 같다! 
* **반복문 코드**
  * n이 1보다 큰 경우 반복문을 돌며, n은 1씩 감소한다. 
  * 마지막에 n이 1이면 더 이상 반복문을 돌지 않는다.
* **재귀 함수 코드**
  * 재귀 함수를 호출하며, n은 1씩 감소한다.
  * 마지막에 n이 1이면 더 이상 추가 함수를 호출하지 않는다.
* 재귀 함수를 작성시에는 반드시, `base case`가 존재 하여야 한다
* `base case`는 점점 범위가 줄어들어 반복되지 않는 최종적으로 도달하는 곳이다.
* 재귀를 이용한 팩토리얼 계산에서의 `base case`는 **n이 1일때, 함수가 아닌 정수 반환하는 것**이다.
* 재귀 함수의 특징
  * 자기 자신을 호출하는 재귀함수는 **알고리즘 구현시 많이 사용**된다.
  * **코드가 더 직관적**이고 이해하기 쉬운 경우가 있음. (하지만, **만들기는 어려움**)
  * [Python Tutor](https://goo.gl/k1hQYz)에 보면, **함수가 호출될 때마다 메모리 공간에 쌓이는 것**을 볼 수 있다.
  * 이 경우, 메모리 스택이 넘치거나(**Stack overflow**) **프로그램 실행 속도가 늘어지는 단점**이 생긴다.
  * 파이썬에서는 이를 방지하기 위해 **<u>1,000</u>**번이 넘어가게 되면 더이상 함수를 호출하지 않고, 종료된다. (**<u>최대 재귀 깊이</u>**) => `RecursionError` 발생
* 속도의 차이를 느껴보자 (for vs 재귀)
* for 문이 더 빠른데 왜 재귀 씀?
  * 알고리즘 자체가 재귀적인 표현이 자연스러운 경우
  * 재귀 호출은 `변수 사용` 을 줄여줄 수 있다.
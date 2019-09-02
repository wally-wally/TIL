# :notebook_with_decorative_cover: 01_python - (4) data_structure

<br>

## 1. 문자열 메소드 활용하기

### 1.1 변형

```python
a = 'hI! Everyone, I\'m kim'
```

```python
a.capitalize() # 앞글자를 대문자로 만들어 반환
# => "Hi! everyone, i'm kim"
a.title() # 어포스트로피나 공백 이후를 대문자로 만들어 반환
# => "Hi! Everyone, I'M Kim"
a.upper() # 모두 대문자로 만들어 반환
# => "HI! EVERYONE, I'M KIM"
# 원본은 그대로, 변형된 값만 보여주는 것 일 뿐!
print(a) # => hI! Everyone, I'm kim

a.lower() # 모두 소문자로 만들어 반환
# => "hi! everyone, i'm kim"
a.swapcase() # 대 <=> 소문자로 변경하여 반환
# => "Hi! eVERYONE, i'M KIM"
```

```python
'!'.join('배고파') # => '배!고!파'
''.join([1, 2, 3]) # => '123'
```

```python
# .replace(old, new[, count])
# 바꿀 대상 글자를 새로운 글자로 바꿔서 반환
# count를 지정하면 해당 개수만큼만 시행
'yay!'.replace('a', '_') # => 'y_y!'
'wooooooowoo'.replace('o', '', 2) # => 'wooooowoo'
```

```python
# .strip([chars])
# 특정한 문자들을 지정하면, 양쪽을 제거하거나 왼쪽을 제거하거나 오른쪽을 제거한다.
# 지정하지 않으면 공백을 제거한다.
'             oh\n'.strip() # => 'oh'
'           oh\n          '.lstrip() # => 'oh\n          '
'hhehehehehehihihi'.rstrip('hi') # => 'hhehehehehe'
```

<br>

### 1.2 탐색 및 검증

```python
# .find(x) : x의 첫 번째 위치 반환. 없으면 -1을 반환

'apple'.find('p') # => 1
'apple'.find('o') # => -1

# .index(x) : x의 첫 번째 위치를 반환. 없으면 오류가 발생
'apple'.index('p') # => 1
'apple'.index('k') # => ValueError 발생
```

```python
# .split() : 문자열을 특정한 단위로 나누어 리스트로 반환

'a_b_c'.split('_') # => ['a', 'b', 'c']

inputs = input().split() # wally open source
print(inputs) # => ['wally', 'open', 'source']
```

<br>

### 1.3 다양한 확인 메소드 : 참/거짓 반환

- `dir('string')`으로 메소드 확인

- `.isalpha(), .isdecimal(), .isdigit(), .isnumeric(), .isspace(), .isupper(), .istitle(), .islower()`
- `'한글은'.isalpha()` => `True` 출력
- `'apple'.istitle()` => `False` 출력
  - `.istitle()` : 첫 글자 대문자 + 나머지 소문자 로 구성된 문자열인 경우 `True` 반환

<br>

## 2. 리스트 메소드 활용하기

### 2.1 값 추가 및 삭제

#### (1) `.append(x)`

```python
cafe = ['starbucks', 'tomntoms', 'hollys']
print(cafe)

# 값을 추가해봅시다.
cafe.append('hollys')
print(cafe)

# 어렵게 넣어봅시다.
cafe[len(cafe):] = ['ediya']
print(cafe)
```

<br>

#### (2) `.extend(iterable)`

- 리스트에 iterable(list, range, tuple,  string) 값을 붙일 수가 있다.
- **`.append(x)`와 달리 요소를 하나하나 뽑아서 넣는다는 것에 유의한다.**

```python
cafe = ['starbucks', 'tomntoms', 'hollys']

cafe.extend(['droptop', '빽다방'])
# ['starbucks', 'tomntoms', 'hollys', 'droptop', '빽다방']

cafe += ['mcafe', 'burgerking']
# ['starbucks', 'tomntoms', 'hollys', 'droptop', '빽다방', 'mcafe', 'burgerking']

# append와 비교해봅시다.
cafe.append(['append cafe']) # 리스트 자체를 요소로 넣음
print(cafe)
print('--------')

cafe.extend(['extend cafe']) # 리스트 안의 요소를 뽑아서 넣음
print(cafe)
print('--------')

cafe.extend('extendstring') # 문자열이 들어가면 문자열의 요소를 하나하나 뽑아서 넣음
print(cafe)

"""
['starbucks', 'tomntoms', 'hollys', 'droptop', '빽다방', 'mcafe', 'burgerking', ['append cafe']]
--------
['starbucks', 'tomntoms', 'hollys', 'droptop', '빽다방', 'mcafe', 'burgerking', ['append cafe'], 'extend cafe']
--------
['starbucks', 'tomntoms', 'hollys', 'droptop', '빽다방', 'mcafe', 'burgerking', ['append cafe'], 'extend cafe', 'e', 'x', 't', 'e', 'n', 'd', 's', 't', 'r', 'i', 'n', 'g']
"""
```

<br>

#### (3) `.insert(i, x)`

- 정해진 위치에 `i`에 값 `x`를 추가한다.

```python
cafe = ['starbucks', 'tomntoms', 'hollys']

# 앞서 만든 리스트의 가장 앞에 'hi'를 넣어봅시다.
cafe.insert(0, 'hi')
# ['hi', 'starbucks', 'tomntoms', 'hollys']

# 앞서 만든 리스트의 가장 뒤에 'bye'를 넣어봅시다.
cafe.insert(len(cafe), 'bye')
# ['hi', 'starbucks', 'tomntoms', 'hollys', 'bye']

# 길이를 넘어서는 인덱스는 무조건 마지막에 하나만 붙습니다.
cafe.insert(len(cafe)+100, '!')
# ['hi', 'starbucks', 'tomntoms', 'hollys', 'bye', '!']
```

<br>

#### (4) `.remove(x)`

- 리스트에서 값이 `x`인 것을 삭제한다.
- **처음 만난 애부터 지운다.**

```python
numbers = [1, 2, 3, 1, 2]
numbers.remove(1) # 처음 만난 애부터 지운다. / [2, 3, 1, 2]
numbers.remove(1) # 한번 더 삭제 / [2, 3, 2]
numbers.remove(10) # remove는 값이 없으면 오류가 발생합니다. => ValueError 발생
```

<br>

#### (5) `.pop(i)`

- 정해진 위치 `i`에 있는 값을 삭제하며, **그 항목을 반환**합니다.
- **`i`가 지정되지 않으면 마지막 항목을 삭제하고 되돌려준다.**

```python
a = [1, 2, 3, 4, 5, 6]

print(a.pop(0)) # => 1
print(a) # => [2, 3, 4, 5, 6]

deleted_value = a.pop()
print(f'{deleted_value}가 삭제되어 {a}이 되었습니다.')
# 6가 삭제되어 [2, 3, 4, 5]이 되었습니다.
```

<br>

### 2.2 탐색 및 정렬

#### (1) `.index(x)`

- `x` 값을 찾아 해당 index 값을 반환한다.

```python
a = [1, 2, 3, 4, 5]

a.index(3) # => 2
a.index(100) # => ValueError 발생
```

<br>

#### (2) `.count(x)`

- 원하는 값의 갯수를 확인할 수있다.

```python
a = [1, 2, 5, 1, 5, 1]

a.count(1) # => 3

# 따라서 원하는 값을 모두 삭제하려면 다음과 같이 할 수 있습니다.
a = [1, 2, 5, 1, 5, 1]
target_value = 1
for i in range(a.count(target_value)):
    a.remove(target_value)
    
# 모두 삭제되었는지 검증해봅시다.
print(a) # => [2, 5, 5]
target_value in a # => False
```

<br>

#### (3) `.sort()`

:heavy_check_mark:**​ `.sort()`와 `sorted()`의 차이점**

- **`.sort()` : 원본 list를 변형시킴, None을 리턴함**
- **`sorted()` : 원본 list를 변형시키지 않음, 정렬된 새로운 리스트를 리턴함**

```python
import random
lotto = random.sample(range(1,46), 6)
print(lotto) # => [8, 37, 4, 29, 27, 10]
```

```python
re_list = sorted(lotto)
print(re_list) # => [4, 8, 10, 27, 29, 37]
print(lotto) # => [8, 37, 4, 29, 27, 10]
```

```python
lotto.sort()
print(lotto.sort()) # => None
print(lotto) # => [4, 8, 10, 27, 29, 37]

lotto.sort(reverse=True)
print(lotto) # => [37, 29, 27, 10, 8, 4]
```

<br>

#### (4) `.reverse()`

- 반대로 뒤집는다. (**정렬 아님!**)

```python
classroom = ['Tom', 'David', 'Justin']
classroom.reverse()
print(classroom) # => ['Justin', 'David', 'Tom']
```

<br>

#### (5) 복사

```python
original_list = [1, 2, 3]
copy_list = original_list
print(copy_list) # => [1, 2, 3]

copy_list[0] = 5
print(original_list) # => [5, 2, 3]

copy_list is original_list # => True
id(copy_list) == id(original_list) # => True
```

```python
a = 20005
b = a
a is b
b = 30005
print(a) # => 20005
```

```python
lunch = {'김밥천국': '치즈라면', '김가네': '제육볶음'}
dinner = lunch

dinner['김밥천국'] = '참치김밥'
print(lunch) # => {'김밥천국': '참치김밥', '김가네': '제육볶음'}
```

:checkered_flag: **얕은 복사(Shallow copy)**

```python
a = [1, 2, 3]
b = a[:] # 전체 복사

b[0] = 5
print(a) # => [1, 2, 3]
```

- 위와 같이 list의 슬라이싱을 통해 새로운 값을 할당하면 새로운 id가 부여되며, 서로 영향을 받지 않는다.
- 하지만, 이러한 슬라이싱 또한 얕은 복사에 해당한다.
- 리스트안에 리스트 mutable 객체 안에 mutable 객체인 경우 문제가 된다.
- `id(a)` 값과 `id(b)` 값은 다르게 되었지만, 그 내부의 객체 `id(a[0])`과 `id(b[0])` 은 같은 주소를 바라보고 있다.

```python
a = [1, 2, [1, 2]]
b = a[:]

b[2][0] = 100
print(a) # => [1, 2, [100, 2]]
```

![01_day04_01](https://user-images.githubusercontent.com/52685250/61459503-cf0ed880-a9a7-11e9-997a-8c2bdf784855.jpg)

:checkered_flag: **깊은 복사(deep copy)**

- 이와 같이 중첩된 상황에서 복사를 하고 싶다면 `copy.deepcopy`를 사용한다.
- 즉, 내부에 있는 모든 객체까지 새롭게 값이 변경된다.

```python
import copy

a = [1, 2, [1, 2]]
b = copy.deepcopy(a)

b[2][0] = 100
print(a) # => [1, 2, [1, 2]]
```

![01_day04_02](https://user-images.githubusercontent.com/52685250/61459559-f9609600-a9a7-11e9-9fd4-e6b8ea3fd786.jpg)

<br>

## 3. List Comprehension

- List Comprehension은 리스트 안에 식, for 문을 지정합니다.

- 여러줄의 코드를 한 줄로 줄일 수 있습니다.

- 한 줄짜리 for문은 List Comprehension으로 작성하자! 실행시간 단축시킬 수 있다!

```python
[식 for 변수 in iterable] # 이게 조금 더 좋은 방법

list(식 for 변수 in iterable)
```

```python
cubic_list = []
for i in range(1, 11):
    cubic_list.append(i**3)
print(cubic_list)
```

```python
cubic_list = [x**3 for x in range(1, 11)] # 식이 먼저 오고 구문이 뒤에 옴
print(cubic_list)
```

### 3.1 List Comprehension + 조건문

- **`[식 for 변수 in iterable if 조건식]`**
- **`[식 if 조건식 else 식 for 변수 in iterable]`** : else가 붙은 경우
- **`[식 if 조건식 else 식 if 조건식 else 식 for 변수 in interable]`** (elif의 경우 => if 조건식의 나열)

```python
even_list = []
for even in range(1, 11):
    if even % 2 == 0:
        even_list.append(even)
print(even_list)
```

```python
even_list2 = [even for even in range(1, 11) if even % 2 == 0]
print(even_list2)
```

---

```python
pair = []
for boy in boys:
    for girl in girls:
        pair.append((boy, girl))
print(pair)
```

```python
# 큰 조건문부터 차례대로 쓰면 된다.
pair = [(boy, girl) for boy in boys for girl in girls]
print(pair)
```

<br>

## 4. 딕셔너리 메소드 활용

### 4.1 추가 및 삭제

#### (1) `.pop(key[, default])`

- key가 딕셔너리에 있으면 제거하고 그 값을 돌려준다. 그렇지 않으면 default를 반환한다.
- default가 없는 상태에서 딕셔너리에 없으면 KeyError가 발생한다.

```python
my_dict = {'apple': '사과', 'banana': '바나나'}

my_dict.pop('apple')
print(my_dict) # => {'banana': '바나나'}

my_dict.pop('melon')
print(my_dict) # => KeyError 발생

my_dict.pop('melon', 0) # => 0
```

<br>

#### (2) `.update()`

- 값을 제공하는 key, value로 덮어쓴다.

```python
my_dict = {'apple': '사과', 'banana': '바나나', 'melon': '멜론'}

my_dict.update(apple = '사과아아아아아')
print(my_dict) # => {'apple': '사과아아아아아', 'banana': '바나나', 'melon': '멜론'}

my_dict.update(grape = '포도')
print(my_dict)
# => {'apple': '사과아아아아아', 'banana': '바나나', 'melon': '멜론', 'grape': '포도'}
```

<br>

#### (3) `.get(key[, default])`

- key를 통해 value를 가져온다.
- **절대로 KeyError가 발생하지 않는다. default는 기본적으로 None이다.([ ] 방식과는 다름)**

```python
my_dict = {'apple': '사과', 'banana': '바나나', 'melon': '멜론'}
my_dict['pineapple'] # => KeyError 발생
```

```python
print(my_dict.get('pineapple')) # => None
print(my_dict.get('apple')) # => 사과
print(my_dict.get('coconut', 1)) # => 1
```

<br>

### 4.2 dictionary comprehension

- `{키: 값 for 키, 값 in 딕셔너리}`
- `dict(키: 값 for 키, 값 in 딕셔너리)`
- `{키: 값 for 키, 값 in 딕셔너리 if 조건식}`
- `{키: 값 if 조건식 else 값 for 키, 값 in 딕셔너리}`

```python
cubic = {x: x**3 for x in range(1, 8)}
print(cubic)
# => {1: 1, 2: 8, 3: 27, 4: 64, 5: 125, 6: 216, 7: 343}
```

> [예제] dictionary comprehension 사용하기
>
> (1) 미세먼지 농도가 80 초과 지역만 뽑기
>
> (2) 미세머지 농도가 80초과는 나쁨, 80이하는 보통으로 하는 value를 가지도록 바꾸기
>
> (3) elif 사용하여 150초과 : 매우나쁨 / 80초과 : 나쁨 / 30초과 : 보통 / 그외 좋음으로 value 바꾸기(if else 열거)

```python
dusts = {'서울': 72, '대전': 82, '구미': 29, '광주': 45, '중국': 200}
```

```python
# (1)번 문제

result = {}
for region, val in dusts.items():
    if val > 80:
        result[region] = val
print(result)

result = {region: val for region, val in dusts.items() if val>80}
print(result)
```

```python
# (2)번 문제

result_2 = {}

for key, val in dusts.items():
    if val > 80:
        result_2[key] = '나쁨'
    else:
        result_2[key] = '보통'
print(result_2)

result_2 = {key: '나쁨' if val>80 else '좋음' for key, val in dusts.items()}
print(result_2)
```

```python
# (3)번 문제

result_3 = {key: '매우나쁨' if val>150 else '나쁨' if val>80 else '보통' if val>30 else '좋음' for key, val in dusts.items()}
print(result_3)
```

<br>

## 5. 세트 메소드 활용

### 5.1 추가 및 삭제

#### (1) `.add(elem)`

```python
a = {'사과', '바나나', '수박'}

a.add('포도')
print(a) # 세트는 순서가 없으므로 index 접근할 수도 없고 무작위로 들어간다.
a.add('포도')
print(a) # 세트에서는 중복이 존재하지 않는다.

# => {'수박', '사과', '포도', '바나나'}
```

<br>

#### (2) `.update(*others)`

- 여러가지의 값을 추가한다.
- 여기서 **반드시 iterable한 값을 넣어야** 한다.

```python
a = {'사과', '바나나', '수박'}

a.update({'토마토', '토마토', '딸기'}, {'포도', '레몬'})
print(a) # => {'토마토', '딸기', '사과', '포도', '수박', '바나나', '레몬'}
```

<br>

#### (3) `.remove(elem)`, `.discard(elem)`

:heavy_check_mark: `.remove(elem)`과 `.discard(elem)`의 차이점

- `.remove(elem)` : elem을 세트에서 **삭제**하고, **없으면 KeyError 발생**
- `.discard(elem)` : elem을 세트에서 **삭제**하고, **없어도 에러 발생 안 함**

<br>

#### (4) `.pop()`

- **임의의 원소**를 제거해 반환한다.

```python
a = {'사과', '바나나', '수박', '아보카도'}

print(a.pop()) # => 수박
print(a) # => {'사과', '아보카도', '바나나'}
```

<br>

## 6. `map()`, `zip()`, `filter()`

### 6.1 `map(function, iterable)`

- iterable의 모든 원소에 function을 적용한 후 그 결과를 돌려준다.
- function은 사용자 정의 함수도 가능하다.
- 대표적으로 iterable한 타입 - list, dict, set, str, bytes, tuple, range
- **return은 `map_object` 형태**로 된다.

```python
numbers = [1, 2, 3]

# list comprehension 방법
new_numbers = ''.join([str(num) for num in numbers])
print(new_numbers) # => 123

# map 방법
new_numbers = map(str, numbers)
#print(new_numbers) => map_object 형태로 나옴
print(''.join(new_numbers))
```

```python
numbers = ['1', '2', '3']
# 위의 코드를 [1, 2, 3]으로 만들어봅시다.

# list comprehension 방법
new_numbers = [int(num) for num in numbers]
print(new_numbers)
 
# map 방법
new_numbers = list(map(int, numbers)) # map object 자체를 함수로 호출해야 하므로 list()를 써야 함 (딕셔너리는 dict()로!)
print(new_numbers)
```

```python
def cube(num):
    return num**3

numbers = [1, 2, 3, 4, 5]
result = list(map(cube, numbers))
# map에 들어가는 function 자리는 사용자 정의 함수명만 작성하면 됨.
print(result)
```

<br>

### 6.2 `zip(*iterables)`

- 복수 iterable한 것들을 모아준다.
- 결과는 튜플의 모음으로 구성된 `zip object`를 반환한다.

```python
girls = ['jane', 'iu', 'mary']
boys = ['justin', 'david', 'kim']

list(zip(girls, boys))
# [('jane', 'justin'), ('iu', 'david'), ('mary', 'kim')]
```

```python
# for문으로 한 명씩 순서대로 매칭시켜봅시다.
# 예) {'jane': 'justin', 'iu': 'david', 'mary': 'kim'}

# dictionary comprehension
result = {girl: boy for girl in girls for boy in boys}
print(result) # => {'jane': 'kim', 'iu': 'kim', 'mary': 'kim'}
# 이렇게 하면 이중 for 문이기 때문에, key는 유일해서 마지막 값을 덮어씌워진다.

# zip 방법을 써야한다!
{girl: boy for girl, boy in zip(girls, boys)}
# => {'jane': 'justin', 'iu': 'david', 'mary': 'kim'}
```

```python
a = '123'
b = '567'

for digit_a, digit_b in zip(a, b):
    print(digit_a, digit_b)

# 아래와 같이 출력된다.
# 1 5
# 2 6
# 3 7
```

- zip은 반드시 길이가 같을 때 사용해야 한다. 가장 짧은 것을 기준으로 구성한다.

```python
num1 = [1, 2, 3]
num2 = ['1', '2']
list(zip(num1, num2)) # => [(1, '1'), (2, '2')]
```

- 길이가 긴 것을 맞춰서 할 수도 있지만, 사용할 일이 없다.

```python
from itertools import zip_longest
list(zip_longest(num1, num2, fillvalue=0))
# => [(1, '1'), (2, '2'), (3, 0)]
```

<br>

### 6.3 `filter(function, iterable)`

- iterable에서 function의 반환된 결과가 참인 것들만 구성하여 반환한다.

```python
# 홀수인지 판단하는 함수를 작성해봅시다.
def odd(num):
    return num % 2

numbers = [1, 2, 3, 4, 5]
list(filter(odd, numbers)) # => [1, 3, 5]

# 다음의 list comprehension과 동일하다.
[x for x in numbers if x % 2]
[x for x in numbers if odd(x)]
```


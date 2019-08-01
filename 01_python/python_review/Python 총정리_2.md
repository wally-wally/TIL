# :notebook_with_decorative_cover: Python 총정리(2. control_of_flow)

<br>

## 1. 조건 표현식(Conditional Expression)

```python
true_value if <조건식> else false_value
```

```python 
# 여기에 코드를 작성하세요.
num = 2
result = '홀수입니다.' if num % 2 else '짝수입니다.' # True 출력식에서 변수명을 선언해줬으므로 False 출력식쪽에서는 생략 가능
print(result)
```

<br>

## 2. for 문

### 2.1 for문과 if문 작성하기

```python
list_num = []
for num in range(1, 31):
    if num % 2:
        list_num.append(num)
print(list_num)
```

```python
# i = 5 는 for 문에 영향을 주지 않는다.
# 다음 range 요소 값에 의해 덮어 씌워지기 때문이다.
for i in range(10):
    print(i)
    i = 5
```

<br>

### 2.2 index와 함께 for문 활용

- `enumerate()`를 활용하면, 추가적인 변수를 활용할 수 있다.

<center>
    <img src="https://user-images.githubusercontent.com/18046097/61180561-3993e180-a653-11e9-9558-085c9a0ad65d.png", alt="enumerate">
</center>

```python
# enumerate()를 활용해서 출력해봅시다.
lunch = ['짜장면', '초밥']
for idx, menu in enumerate(lunch):
    print(idx, menu)
```

```python
# enumerate() 함수를 사용하였을 때 어떻게 표현이 되는지 확인해봅시다.
classroom = ['Kim', 'Park', 'Lee', 'Kang']
class_list = list(enumerate(classroom))
print(class_list) # => [(0, 'Kim'), (1, 'Park'), (2, 'Lee'), (3, 'Kang')]
print(type(class_list[0])) # => <class 'tuple'>
```

```python
# 숫자를 1부터 카운트 할 수도 있습니다.
for idx, menu in enumerate(lunch, start=1):
    print(idx, menu)

# 아래와 같이 출력된다.
# 1 짜장면
# 2 초밥
```

<br>

### 2.3 dictionary 반복문 활용

```python
# 옆자리 친구의 이름을 활용하여 dictionary를 만들어봅시다.
classroom = {
    'teacher': 'kim',
    'student_1': 'hong',
    'studnet_2': 'kang',
    'student_3': 'sim'
}

for member in classroom:
    print(member)
    
# 아래와 같이 출력된다.
# teacher
# student_1
# studnet_2
# student_3

# value를 출력해봅시다.
for member in classroom:
    print(classroom[member])
```

```python
blood_type = {'A': 4, 'B': 2, 'AB': 3, 'O':1}
a = '혈액형의 종류는 다음과 같습니다 => '
for blood in blood_type:
    a += blood + ' '
print(a) # => 혈액형의 종류는 다음과 같습니다 => A B AB O

b = '혈액형의 종류는 다음과 같습니다 => '
for blood in blood_type.keys():
    b += blood + ' '
print(b) # => print(a)와 동일

people = 0
for person in blood_type.values():
    people += person
print(f'2번 : 총인원은 {people}명입니다.') # => 2번 : 총인원은 10명입니다.

for blood, person in blood_type.items():
    print(f'{blood}형은 {person}명입니다.')
# 아래와 같이 출력된다.
# A형은 4명입니다.
# B형은 2명입니다.
# AB형은 3명입니다.
# O형은 1명입니다.
```

#### (1) dictionary 구축하기(for, if)

> 다음과 같은 리스트가 있을 때 각각의 요소의 개수를 value 값으로 갖는 딕셔너리를 만드시오.
> ```python
> book_title =  ['great', 'expectations','the', 'adventures', 'of', 'sherlock','holmes','the','great','gasby','hamlet','adventures','of','huckleberry','fin']
> ```

> 출력 예시
>
> ```python
> {'great': 2, 'expectations': 1, 'the': 2, 'adventures': 2, 'of': 2, 'sherlock': 1, 'holmes': 1, 'gasby': 1, 'hamlet': 1, 'huckleberry': 1, 'fin': 1}
> ```

```python
book_title =  ['great', 'expectations','the', 'adventures', 'of', 'sherlock','holmes','the','great','gasby','hamlet','adventures','of','huckleberry','fin']
```

> #1. for, if 사용

```python
book_dict = {}
for title in book_title:
    if title in book_dict:
        book_dict[title] += 1 # 기존 키 값이 있으면 1을 더함
    else:
        book_dict[title] = 1 # 기존 키 값이 없으면 1 값을 할당
print(book_dict)
```

> #2. .count() 사용

```python
book_dict = {}
for title in book_title:
    # 리스트의 특정 요소가 몇 개 있는지 count해서 그 값을 딕셔너리의 value로 설정
    book_dict[title] = book_title.count(title)
print(book_dict)
```

> #3. get() 사용

```python
book_dict = {}
for title in book_title:
    # 만약 key가 없으면 None이 아닌 0을 value로 받는다.
    book_dict[title] = book_dict.get(title, 0) + 1
print(book_dict)
```

<br>

### 2.4 range() 함수

- 숫자들의 시퀀스로 반복 할 필요가 있으면 사용한다. 수열을 만든다.

  - `range(start, stop[, step])`

- step 인자가 생략되면 기본값 `1` 이 사용된다. 
- start 인자가 생략되면 기본값 `0` 이 사용된다. 
- step 이 `0` 이면 `ValueError` 를 일으킨다.

- 장점 : list 나 tuple 에 비해 범위의 크기에 무관하게 항상 같은 (작은) 양의 메모리를 사용한다. (start, stop, step 값만을 저장).

- 주의사항
  - range() 가 돌려준 객체(iterable)는 리스트인 것 같지만, 리스트가 아니다. 
  - 반복(이터레이트)할 때 원하는 시퀀스 항목들을 순서대로 돌려주는 객체이지만, 실제로 리스트를 만들지 않아서 공간을 절약하는 것이다.

<br>

### 2.5 break, continue, else, pass

#### (1) break

- 반복문을 종료하는 표현이다.
- for나 while 문으로부터 빠져나가게 만든다.

> 조건문과 반복문, break를 활용하여 다음 headlines 리스트의 요소들을 130자 크기의 하나의 문자열로 이어 붙이는 코드를 작성하라.
>
> ```python
> headlines = [
>     "Local Bear Eaten by Man",
>     "Legislature Announces New Laws",
>     "Peasant Discovers Violence Inherent in System",
>     "Cat Rescues Fireman Stuck in Tree",
>     "Brave Knight Runs Away",
>     "Papperbok Review: Totally Triffic"
> ]
> ```

> 예시 출력
>
> ```python
> Local Bear Eaten by Man Legislature Announces New Laws Peasant Discovers Violence Inherent in System Cat Rescues Fireman Stuck in
> ```

```python
headlines = [
    'Local Bear Eaten by Man',
    'Legislature Announces New Laws',
    'Peasant Discovers Violence Inherent in System',
    'Cat Rescues Fireman Stuck in Tree',
    'Brave Knight Runs Away',
    'Papperbok Review: Totally Triffic'
]
# 여기에 코드를 작성하세요.
news = ''
for headline in headlines:
    news += headline + ' '
    # 만약 news가 130자 이상이 된다면 
    if len(news) >= 130:
        # 130자 까지 자신을 잘라서 다시 할당
        news = news[:130]
        # 반복문을 종료
        break
print(news)
```

<br>

#### (2) continue

- continue 이후의 코드를 수행하지 않고 다음 요소를 선택해 반복을 계속 수행한다.

```python
# continue 문을 활용해봅시다.
for i in range(6):
    if i % 2 == 0:
        # 짝수일 경우에 continue 이후의 코드를 수행하지 않음
        continue
        print(f'{i}는 짝수다')
    print(f'{i}는 홀수')
    
# 아래와 같이 출력된다.
# 1는 홀수
# 3는 홀수
# 5는 홀수
```

<br>

#### (3) else

- `else`문은 **<<끝까지 반복문을 시행한 이후에 실행>>**된다.
- 반복에서 리스트의 소진이나 (for 의 경우) 조건이 거짓이 돼서 (while 의 경우) 종료할 때 실행된다.
- 하지만 반복문이 **break 문으로 종료할 때는 실행되지 않는다.** (`break`를 통해 중간에 종료되지 않은 경우만 실행)
- break, continue, else, pass는 에러 처리할 때 주로 사용됨

```python
# break가 안되는 상황을 만들어봅시다. (반복문 정상종료)
for i in range(3):
    print(i)
    if i == 100:
        print('{}에서 break 시행 됨'.format(i))
        break
else:
    print('break 시행 안 됨')
    
# 출력
# 0
# 1
# 2
# break 시행 안 됨
```

```python
# break가 되는 상황을 만들어봅시다.
for i in range(3):
    print(i)
    if i == 1:
        print('{}에서 break 시행 됨'.format(i))
        break
else:
    print('break 시행 안 됨')
    
# 출력
# 0
# 1
# 1에서 break 시행 됨
```

<br>

#### (4) pass

- pass문은 아무것도 하지 않는다. 문법적으로 문장이 필요하지만, 프로그램이 특별히 할 일이 없을 때 자리를 채우는 용도로 사용할 수 있다.

- ```python
  # pass
  for i in range(5):
      if i == 3:
          pass
      print(i)
      
  # 0
  # 1
  # 2
  # 3
  # 4
  ```

- ```python
  # continue
  for i in range(5):
      if i == 3:
          continue
      print(i)
      
  # 0
  # 1
  # 2
  # 4
  ```
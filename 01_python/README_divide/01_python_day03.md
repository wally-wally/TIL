# :notebook_with_decorative_cover: 01_python - Day03

---

:white_check_mark: **Python 7월17일(3일차) 상세 내용(필독!)** <a href="https://github.com/wally-wally/TIL/blob/master/01_python/python_review/Python%20총정리_3.md">(바로 이동)</a>

---

<br>

## 3. 7월17일(3일차)

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

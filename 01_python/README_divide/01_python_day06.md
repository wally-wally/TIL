# :notebook_with_decorative_cover: 01_python - Day06

<br>

## 6. 7월23일(6일차)

### 6.1 isdecimal(), isdigit(), isnumeric()

<img width="655" alt="01_day05_01" src="https://user-images.githubusercontent.com/52685250/61682821-1c939880-ad4e-11e9-9f52-3c2840e29544.png">

<br>

### 6.2 모듈, 패키지, 파이썬 표준 라이브러리

- `모듈` : 특정 기능을 .py 파일 단위로 작성한 것.
- `패키지` : 특정 기능과 관련된 여러 모듈을 묶은 것. 보통 인터넷에 있는 패키지를 설치해서 사용.
- `파이썬 표준 라이브러리` : 파이썬에 기본적으로 설치된 모듈과 내장 함수를 묶어서 파이썬 표준 라이브러리 (Python Standard Library, PSL) 라 함.

<br>

### 6.3 예외 처리

#### (1) 기본 - try, except

```python
try:
    num = input('값을 입력하시오. : ')
    print(int(num))
except ValueError: # 에러 마다 고유의 이름이 존재하므로 대소문자 구별하여 잘 적을 것
    print('바보야 숫자를 입력해!')
```

<br>

#### (2) 복수의 예외 처리

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

#### (3) 에러의 범주

<img width="678" alt="01_day05_02" src="https://user-images.githubusercontent.com/52685250/61690650-c8e07980-ad64-11e9-9b9d-f6d8b63cf921.png">

<br>

#### (4) 에러 문구 처리

```python
try:
    empty_list = []
    print(empty_list[-1])
except IndexError as err:
    print(f'{err}, 오류가 발생하였습니다.')
```

<br>

#### (5) else

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

#### (6) finally

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

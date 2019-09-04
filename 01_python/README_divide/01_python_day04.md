# :notebook_with_decorative_cover: 01_python - Day04

---

:white_check_mark: **Python 7월18일(4일차) 상세 내용(필독!)** <a href="https://github.com/wally-wally/TIL/blob/master/01_python/python_review/Python%20총정리_3.md">(바로 이동)</a>

---

<br>

## 4. 7월18일(4일차)

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

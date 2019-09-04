# :notebook_with_decorative_cover: 01_python - Day05

---

:white_check_mark: **Python 7월22일(5일차) 상세 내용(필독!)** <a href="https://github.com/wally-wally/TIL/blob/master/01_python/python_review/Python%20총정리_4.md">(바로 이동)</a>

---

<br>

## 5. 7월22일(5일차)

### 5.1 List, Dictionary Comprehension

#### (1) List Comprehension 구문 작성하기

- `[식 for 변수 in iterable]`
- `list(식 for 변수 in iterable)`

<br>

#### (2) List Comprehension + 조건문

- `[식 for 변수 in iterable if 조건식]` => **<u>주로 이 표현식 많이 씀</u>**
- `[식 if 조건식 else 식 for 변수 in iterable]` : if 조건식에 else가 붙은 경우
- `[식 if 조건식 else 식 if 조건식 else 식 for 변수 in interable]` : elif의 경우

<br>

#### (3) Dictionary Comprehension

- `{키: 값 for 키, 값 in 딕셔너리}`
- `dict(키: 값 for 키, 값 in 딕셔너리)`
- `{키: 값 for 키, 값 in 딕셔너리 if 조건식}`
- `{키: 값 if 조건식 else 값 for 키, 값 in 딕셔너리}`

<br>

### 5.2 set

#### (1) set에서 임의의 원소의 의미(ex .pop())

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

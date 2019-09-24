# [SSAFY]Algorithm_#3(written by wally-wally)

------

**※참고사항※**

- `[SSAFY]Algorithm_#3`는 정규과정 `Algorithm`을 진행한 내용들을 작성함.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

<br>

## 15. 9월09일(18일차)

### 15.1 비트 연산

#### (1) 비트 연산자

<img src="https://user-images.githubusercontent.com/52685250/64497798-f91bb180-d2eb-11e9-8352-4215e0ab83fa.JPG" alt="bit_operation" width=600px>

<br>

#### (2) 비트 연산

##### ① 부분집합 구하기

| <div style="text-align:center">연산</div>           | <div style="text-align:center">의미</div>        |
| --------------------------------------------------- | ------------------------------------------------ |
| <div style="text-align:center">`1 << n`</div>       | 원소가 n개일 경우 모든 부분집합의 수             |
| <div style="text-align:center">`i & (1 << j)`</div> | 계산 결과는 i의 j번째 비트가 1인지 아닌지를 의미 |

> 부분집합 생성 코드
>
> ```python
> arr = [3, 6, 7, 1, 5, 4]
> 
> n = len(arr)	# n : 원소의 개수
> 
> for subset in range(1 << n):	 # 1 << n : 부분 집합의 개수
>     print(subset, end = '> ')	# 부분집합 No.
>     for j in range(n + 1):	# 원소의 수만큼 비트를 비교함
>         if subset & (1 << j):	# subset의 j번째 비트가 1이면 j번째 원소 출력
>             print(arr[j], end=' ')
>     print()
> ```

##### ② 엔디안(Endianness)

> 엔디안 확인 코드
>
> ```python
> n = 0x00111111
> 
> if n & 0xff:
>     print('little endian')
> else:
>     print('big endian')
> ```

> 엔디안 변환 코드
>
> ```python
> def ce(n):
>     return (n << 24 & 0xff000000) | (n << 8 & 0xff0000) | (n >> 8 & 0xff00) | (n >> 24 & 0xff)
> ```

<br>

### 15.2 진수

> 10진수 <=> n진수 상호 변환
>
> ```python
> """
> 10진수 -> 2, 8, 16진수 문자열로 변환
> 2진수      bin( 정수 )
> 8진수      oct( 정수 )
> 16진수    hex( 정수 )
> ----------------------------------------
> x진수 -> 10진수 변환
> 
> 형식 : int( 정수, 진수 ) // 진수에 해당하는 정수 문자열
> 
> ex) int( 12345, 7 ) -> 7진수를 10진수로 변환
> """
> bina = bin(1024)
> octa = oct(1024)
> hexa = hex(1024)
> print(bina, octa, hexa)
> 
> print(type(bina))
> print(type(int(bina, 2)))
> 
> print(int(bina, 2))
> print(int(octa, 8))
> print(int(hexa, 16))
> ```
>
> ```
> 0b10000000000 0o2000 0x400
> <class 'str'>
> <class 'int'>
> 1024
> 1024
> 1024
> ```

> 8진수(135<sub>(8)</sub>) => 10진수(93) 변환
>
> ```python
> arr = [1, 3, 5]
> result = 0
> for val in arr:
>        result = result * 8 + val
> print(result)
> ```

<br>

### 15.3 실수

- 실수 자료형의 유효 자릿수
  - 32 비트 실수형 유효자릿수(십진수) : 6
  - 64 비트 실수형 유효자릿수(십진수) : 15
- 파이썬에서의 실수 표현 범위
  - 파이썬에서는 내부적으로 더 많은 비트를 사용해서 훨씬 넓은 범위의 실수를 표현할 수 있다.
  - 최대로 표현할 수 있는 값 : 약 1.8 X 10<sup>308</sup> (이 이상은 `inf`로 표현)
  - 최소로 표현할 수 있는 값 : 약 5.0 X 10<sup>-324</sup> (이 이하는 `0`으로 표현)

<br>

---

<br>

## 16. 9월10일(19일차)

### 16.1 [예제] 암호코드 스캔

```python
# 강사님 코드

P = {(2,1,1):0,
     (2,2,1):1,
     (1,2,2):2,
     (4,1,1):3,
     (1,3,2):4,
     (2,3,1):5,
     (1,1,4):6,
     (3,1,2):7,
     (2,1,3):8,
     (1,1,2):9}
A = ord('A')
nine, zero = ord('9'), ord('0')
 
T = int(input())
for tc in range(1, T + 1):
    N, M = map(int, input().split())
    arr = [input() for _ in range(N)]
 
    def getVal(ch):
        t = ord(ch)
        val = (t - A) + 10 if t > nine else t - zero
        return val
 
    def find():
        ret = 0
        for i in range(N):
            j = M - 1
            while j >= 0:
                if arr[i][j] != '0' and arr[i - 1][j] == '0':
                    pwd = []
                    L = MIN = 0
                    val, c = getVal(arr[i][j]), 0
                    for k in range(8):
                        c2 = c3 = c4 = 0
                        while (val & 1) == 0:
                            val, c = val >> 1, c + 1
                            if c == 4:
                                j, c = j - 1, 0
                                val = getVal(arr[i][j])
                        while val & 1:
                            val, c, c4 = val >> 1, c + 1, c4 + 1
                            if c == 4:
                                j, c = j - 1, 0
                                val = getVal(arr[i][j])
                        while (val & 1) == 0:
                            val, c, c3 = val >> 1, c + 1, c3 + 1
                            if c == 4:
                                j, c = j - 1, 0
                                val = getVal(arr[i][j])
                        while val & 1:
                            val, c, c2 = val >> 1, c + 1, c2 + 1
                            if c == 4:
                                j, c = j - 1, 0
                                val = getVal(arr[i][j])
                        if k == 0:
                            MIN = min(c2, c3, c4)
 
                        pwd.append(P[(c2//MIN, c3//MIN, c4//MIN)])
 
 
                    a = pwd[0] + pwd[2] + pwd[4] + pwd[6]
                    b = pwd[1] + pwd[3] + pwd[5] + pwd[7]
                    if ((b*3 + a) % 10) == 0:
                        ret += (a + b)
                j -= 1
        return ret
    #--------------------------------------
    print('#{} {}'.format(tc, find()))
```

<br>

### 16.2 [예제] 이진수2

```python
# 내 코드

for test_case in range(int(input())):
    N = float(input())
    result = ''
    while True:
        value = N * 2
        under_num_list = [int(num) for num in str(value)[2:]]
        if sum(under_num_list) != 0:
            result += str(int(N * 2))
            N = float('0.' + str(value)[2:]) if int(N * 2) == 0 else N * 2 - 1
        else:
            result += '1'
            print('#{} {}'.format(test_case + 1, result))
            break
        if len(result) > 12:
            print('#{} overflow'.format(test_case + 1))
            break
```

<br>

---

<br>

## 17. 9월16일(20일차)

### 17.1 반복(Iteration) & 재귀(Recursion)

#### (1) 반복(Iteration)

- 수행하는 작업이 완료될 때 계속 반복
  - `for` : 얼마나 반복하지 즉, 반복횟수를 알 때 주로 사용
  - `while` : 반복횟수는 모르나 상태를 알 때 주로 사용
- 초기값 설정 후 반복문을 빠져나갈 종료조건을 설정해야 함
  - 조건 수식, 실제 반복할 내용, 수식에 사용되는 변수 초기값, 무한 루프가 되지 않게 값을 업데이트!

<br>

#### (2) 재귀(Recursion)

- 주어진 문제의 해를 구하기 위해 동일하면서 더 작은 문제의 해를 이용하는 방법
- 재귀 함수로 구현
  - 재귀 함수 : 함수 내부에서 직접 혹은 간접적으로 자기 자신을 호출하는 함수
  - 기본 부분(basis part)와 유도 파트(inductive part)로 구성

<img src="https://user-images.githubusercontent.com/52685250/64931538-187a8780-d874-11e9-8871-c1f9a3471640.JPG" width="700px" alt="반복과 재귀 비교">

> **선택 정렬 함수를 재귀적 알고리즘으로 작성하기**
>
> ```python
> arr = [9, 2, 3, 7, 5, 6, 8, 1, 4, 10]
> 
> def getMin(s, e):  # 최소값 구하기
>     if s == e:  # 기저 사례
>         return arr[s]
>     else:
>         ret = getMin(s, e - 1)  # 매개변수 => 문제의 크기, 반환값 => 문제의 해
>         return min(ret, arr[e])
> 
> print(getMin(0, len(arr) - 1))
> ```
>
> ```python
> arr = [9, 2, 3, 7, 5, 6, 8, 1, 4, 10]
> 
> def getMin(s, e):
>     if s == e: 
>         return arr[s]
>     else:
>         mid == (s + e) // 2
>         l = getMin(s, mid)
>         r = getMin(mid + 1, e)
>         return min(l, r)
> 
> print(getMin(0, len(arr) - 1))
> ```

:heavy_check_mark: 재귀 호출

- 동적계획법(DP) / 분할정복
  - 재귀적 정의 구현할 때
  - 부분문제간의 관계(큰 문제와 작은 문제간 관계)
- 탐색
  - 그래프 깊이 우선 탐색(DFS), 트리 순회
  - 백트래킹 : 상태공간 트리, 그래프 탐색

<br>

### 17.2 완전 검색(Exhaustive Search)

#### (1) Brute Force

- 자료들의 리스트에서 키 값을 찾기 위해 첫 번째 자료부터 비교하면서 진행한다.

- 모든 경우의 수를 생성하고 테스트하므로 수행 속도는 느리지만, 해답을 찾아내지 못할 확률이 작다.
- 우선 완전 검색으로 접근하여 해답을 도출한 후, 성능 개선을 위해 다른 알고리즘을 사용하고 해답을 확인하는 것이 바람직하다.

<br>

### 17.3 조합적 문제

#### (1) 순열(Permutation)

- <sub>n</sub>P<sub>r</sub> : 서로 다른 n개 중 r개를 택하는 순열 (= n × (n - 1) × (n - 2) × … × (n - r + 1))
- r의 수 만큼 for문이 중첩된다.
- 가장 대표적인 문제로 `TSP`가 있다.

> 중복순열
>
> ```python
> arr = 'ABC'
> N = len(arr)
> for i in range(N):  # 첫 번째 위치
>     for j in range(N):  # 두 번째 위치
>         for k in range(N):  # 세 번째 위치
>             print(arr[i], arr[j])
> ```
>
> 순열
>
> ```python
> arr = 'ABC'
> N = len(arr)
> for i in range(N):  # 첫 번째 위치
>     for j in range(N):  # 두 번째 위치
>         if j == i: continue
>         for k in range(N):  # 세 번째 위치
>             if k == i or k == j: continue
>             print(arr[i], arr[j])
> ```

<br>

#### (2) 조합(Combination)

- <sub>n</sub>C<sub>r</sub> = <sub>n</sub>P<sub>r</sub>  × r!
- r의 수 만큼 for문이 중첩된다.

> 조합
>
> ```python
> arr = 'ABCDE'
> N = len(arr)
> for i in range(N):  # 첫 번째 위치
>     for j in range(i + 1, N):  # 두 번째 위치
>         for k in range(j + 1, N):   # 세 번째 위치
>             print(arr[i], arr[j], arr[k])
> ```
>
> 중복조합
>
> ```python
> arr = 'ABCDE'
> N = len(arr)
> for i in range(N):  # 첫 번째 위치
>     for j in range(i, N):  # 두 번째 위치
>         for k in range(j, N):   # 세 번째 위치
>             print(arr[i], arr[j], arr[k])
> ```

- 재귀적 표현을 이용한 조합의 수식
  - <sub>n</sub>C<sub>0</sub> = <sub>n</sub>C<sub>n</sub> = 1
  - <sub>n</sub>C<sub>r</sub> = <sub>n-1</sub>C<sub>r-1</sub> + <sub>n-1</sub>C<sub>r</sub>
  - 중복 호출을 많이 하므로 시간이 오래걸리는 단점이 있다.

```python
def nCr(n, r):
    if n == r or r == 0: return 1
    return nCr(n - 1, r - 1) + nCr(n - 1, r)

print(nCr(5, 3))
print(nCr(10, 4))
```

- 더 좋은 재귀 호출을 이용한 조합 수식

```python
arr = 'ABCDE'
N, R = len(arr), 3
choose = []
def comb(k, s):
    if k == R:
        print(choose)
    else:
        for i in range(s, N):
            choose.append(arr[i])
            comb(k + 1, i + 1)
            choose.pop()

comb(0, 0)
```

```
['A', 'B', 'C']
['A', 'B', 'D']
['A', 'B', 'E']
['A', 'C', 'D']
['A', 'C', 'E']
['A', 'D', 'E']
['B', 'C', 'D']
['B', 'C', 'E']
['B', 'D', 'E']
['C', 'D', 'E']
```

---

**:heavy_check_mark: 순열, 조합 기본 공식 정리**

① 순열 : n개 중에 r개를 뽑아서 배열하는 경우의 수
$$
_{n}P_{r}=\frac {n!} {(n-r)!}
$$
② 중복순열 : n개 중에 r개를 중복하여 뽑아서 배열하는 경우의 수
$$
_{n}\Pi_{r}=n^{r}
$$
③ 조합 : n개 중에 r개를 뽑는 경우의 수
$$
_{n}C_{r}=\frac {n!} {r!(n-r)!}
$$
④ 중복조합 : n개 중에 r개를 중복하여 뽑는 경우의 수
$$
_{n}H_{r}=_{n+r-1}C_{r}
$$

---

<br>

#### (3) 재귀 호출을 통한 순열 생성

```python
arr = [1, 2, 3, 4]
N = len(arr)
for i in range(N):
    arr[0], arr[i] = arr[i], arr[0]
    print(arr)
    arr[0], arr[i] = arr[i], arr[0]
```

```
[1, 2, 3, 4]
[2, 1, 3, 4]
[3, 2, 1, 4]
[4, 2, 3, 1]
```

```python
arr = [1, 2, 3, 4]
N = len(arr)
for i in range(N):
    arr[0], arr[i] = arr[i], arr[0]
    for k in range(1, N):
        arr[1], arr[k] = arr[k], arr[1]
        print(arr)
        arr[1], arr[k] = arr[k], arr[1]
    arr[0], arr[i] = arr[i], arr[0]
```

```
[1, 2, 3, 4]
[1, 3, 2, 4]
[1, 4, 3, 2]
[2, 1, 3, 4]
[2, 3, 1, 4]
[2, 4, 3, 1]
[3, 2, 1, 4]
[3, 1, 2, 4]
[3, 4, 1, 2]
[4, 2, 3, 1]
[4, 3, 2, 1]
[4, 1, 3, 2]
```

```python
arr = [1, 2, 3, 4]
N = len(arr)
for i in range(N):
    arr[0], arr[i] = arr[i], arr[0]
    for k in range(1, N):
        arr[1], arr[k] = arr[k], arr[1]
        for j in range(2, N):
            arr[2], arr[j] = arr[j], arr[2]
            print(arr)
            arr[2], arr[j] = arr[j], arr[2]
        arr[1], arr[k] = arr[k], arr[1]
    arr[0], arr[i] = arr[i], arr[0]
```

```
[1, 2, 3, 4]
[1, 2, 4, 3]
[1, 3, 2, 4]
[1, 3, 4, 2]
[1, 4, 3, 2]
[1, 4, 2, 3]
[2, 1, 3, 4]
[2, 1, 4, 3]
[2, 3, 1, 4]
[2, 3, 4, 1]
[2, 4, 3, 1]
[2, 4, 1, 3]
[3, 2, 1, 4]
[3, 2, 4, 1]
[3, 1, 2, 4]
[3, 1, 4, 2]
[3, 4, 1, 2]
[3, 4, 2, 1]
[4, 2, 3, 1]
[4, 2, 1, 3]
[4, 3, 2, 1]
[4, 3, 1, 2]
[4, 1, 3, 2]
[4, 1, 2, 3]
```

```python
# 위 과정을 재귀 호출로 구현

arr = [1, 2, 3, 4]
N = len(arr)

def perm(k):
    if k == N:
        print(arr)
    else:
        for i in range(k, N):
            arr[k], arr[i] = arr[i], arr[k]
            perm(k + 1)
            arr[k], arr[i] = arr[i], arr[k]
perm(0)
```

<br>

------

<br>

## 18. 9월17일(21일차)

### 18.1 탐욕 알고리즘이란?

- 최적해를 구하는 데 사용되는 근시안적인 방법
- 일반적으로, 머리 속에 떠오르는 생각을 검증 없이 바로 구현하면 Greedy 접근이 된다.
- 여러 경우 중 하나를 선택할 때마다 그 순간에 최적이라고 생각되는 것을 선택해 나가는 방식으로 진행하여 최종적인 해답에 도달한다.
- 각 선택 시점에서 이루어지는 결정은 지역적으로는 최적이지만, 그 선택들을 계속 수집하여 최종적인 해답을 만들었다고 하여, 그것이 최적이라는 보장은 없다.
- 일단, 한번 선택된 것은 번복하지 않는다. 이런 특성 때문에 대부분 탐욕 알고리즘들은 단순하며, 또한 제한적인 문제들에 적용된다.
  - 한 번 선택한 것을 번복할 수 있는 것은 `백트래킹`이다.

<br>

### 18.2 탐욕 알고리즘 예제

#### (1) 배낭 짐싸기(Knapsack)

| 문제 유형           | 내용                                                         |
| ------------------- | ------------------------------------------------------------ |
| 0-1 Knapsack        | <ul><li>배낭에 물건을 통째로 담아야 하는 문제</li><li>물건을 쪼갤 수 없는 경우</li></ul> |
| Fractional Knapsack | <ul><li>물건을 부분적으로 담는 것이 허용되는 문제</li><li>물건을 쪼갤 수 있는 경우</li><li>동적 계획법의 <u>분기 한정(Branch and Bound)</u>에서 사용</li></ul> |

- `0-1 Knapsack` 유형으로 풀면 최적해를 구할 수 없지만 `Fractional Knapsack`인 경우 탐욕적인 방법으로 이상적인 답안을 구할 수 있다.
- `0-1 Knapsack`으로 푼 답안은 `Fractional Knapsack`으로 푼 답안보다 이상적일 수 없다.

<br>

#### (2) 활동 선택 문제(Activity-selection problem)

- 시작시간과 종료시간이 있는 n개의 활동들의 집합에서 서로 겹쳐지 않는(non-overlapping) 최대갯수의 활동들의 집합을 구하는 문제

- 종료 시간 순으로 활동들을 정렬을 먼저 하는 것이 중요하다!

<img src="https://user-images.githubusercontent.com/52685250/65002872-c0ee2180-d930-11e9-8135-1b29888e19d3.JPG" width=700px alt="활동선택문제">

<br>

### 18.3 탐욕 알고리즘의 필수 요소

- 탐욕적 선택 속성(greedy choice property)
  - 탐욕적 선택은 최적해로 갈 수 있음을 보여라.
  - 즉, 탐욕적 선택은 항상 안전하다.
- 최적 부분 구조(optimal substructure property)
  - 최적화 문제를 정형화하라
  - 하나의 선택을 하면 풀어야 할 하나의 하위 문제가 남는다.
- `원문제의 최적해 = 탐욕적 선택 + 하위 문제의 최적해` 임을 증명하라!

---

:heavy_check_mark: `활동 선택 문제` 증명 : **종료 시간이 가장 빠른 활동 a<sub>m</sub> 을 선택하는 것은 항상 안전하다.**

- 전체 활동들의 집합 S<sub>i, j</sub> 에서 양립 가능한 최대 크기의 부분 집합인 A<sub>i, j</sub> 가 있다.
- a<sub>k</sub> 는  A<sub>i, j</sub> 에 속한 종료 시간이 가장 빠른 활동
- 두 가지 경우로 생각하자.
  - a<sub>k</sub> = a<sub>m</sub> : 최대 크기 부분집합에 포함.
  - a<sub>k</sub> != a<sub>m</sub> : A<sub>i, j</sub> 에서 a<sub>k</sub> 를 제거하고 a<sub>m</sub> 을 추가한다. 이 때 a<sub>m</sub> 은 a<sub>k</sub> 보다 종료 시간이 빠르기 때문에 A<sub>i, j</sub> 에 들어있는 다른 행동들과 겹치지 않음
- 따라서 종료 시간이 가장 빠른 활동을 선택하는 것은 항상 안전하다.

---

<img src="https://user-images.githubusercontent.com/52685250/65004226-a3bc5180-d936-11e9-8592-7200692a73cd.JPG" width=700px alt="Greedy vs DP">

:warning: 동적 계획법은 대부분의 최적화 문제에 적용할 수 있고, 탐욕 기법은 장점이 많으나 대부분의 최적화 문제에 적용할 수 없다.

<br>

### 18.4 [예제] 최소합

```python
def min_sum(position, val):
    global ans, N
    if val >= ans:
        return
    if position == [N - 1, N - 1]:
        if val <= ans:
            ans = val
            return
    move = [(0, 1), (1, 0)] # 우, 하
    for i in range(2):
        n_row = position[0] + move[i][0]
        n_col = position[1] + move[i][1]
        if 0 <= n_row < N and 0 <= n_col < N: 
            if not used[n_row][n_col]:
                used[n_row][n_col] = True
                min_sum([n_row, n_col], val + arr[n_row][n_col])
                used[n_row][n_col] = False

for test_case in range(int(input())):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    ans = 13 * 12 * 10
    used = [[False] * N for __ in range(N)]
    init_position = [0, 0]
    min_sum(init_position, arr[0][0])
    print('#{} {}'.format(test_case + 1, ans))
```

<br>

### 18.5 [예제] 베이비진 게임

```python
def baby_gin(lst, chk_num):
    counting_list = [0] * 10
    for num in lst:
        counting_list[num] += 1
    for idx in range(10):
        if counting_list[idx] == 3:
            return 1 if not chk_num else 2
        if idx <= 7:
            if counting_list[idx] >= 1 and counting_list[idx + 1] >= 1 and counting_list[idx + 2] >= 1:
                return 1 if not chk_num else 2


for test_case in range(int(input())):
    player_1, player_2 = [], []
    numbers = list(map(int, input().split()))
    for idx in range(len(numbers)):
        if not idx % 2:
            player_1.append(numbers[idx])
        else:
            player_2.append(numbers[idx])
        if idx >= 4:
            if not idx % 2 and len(player_1) >= 3:
                baby_gin_value = baby_gin(sorted(player_1), idx % 2)
                if baby_gin_value is not None:
                    print('#{} {}'.format(test_case + 1, baby_gin_value))
                    break
            elif idx % 2 and len(player_2) >= 3:
                baby_gin_value = baby_gin(sorted(player_2), idx % 2)
                if baby_gin_value is not None:
                    print('#{} {}'.format(test_case + 1, baby_gin_value))
                    break
    else:
        print('#{} 0'.format(test_case + 1))
```

<br>

------

<br>

## 19. 9월23일(22일차)

### 19.1 분할 정복 - `병합 정렬`, `퀵 정렬`

#### (1) 병합 정렬(Merge Sort)

![01](https://user-images.githubusercontent.com/52685250/65398809-550a2e00-ddf4-11e9-9133-390f4e8614eb.JPG)
![02](https://user-images.githubusercontent.com/52685250/65398810-55a2c480-ddf4-11e9-85a2-d2fcd489ac13.JPG)

- 여러 개의 정렬된 자료의 집합을 병합하여 한 개의 정렬된 집합으로 만드는 방식
- 분할 정복 알고리즘 활용
  - 자료를 최소 단위의 문제까지 나눈 후에 차례대로 정렬하여 최종 결과를 얻어냄.
  - top-down 방식
- 시간 복잡도 : O(n logn)

<br>

#### (2) 퀵 정렬(Quick Sort)

- 병합 정렬과 다른 점
  - 병합 정렬은 그냥 두 부분으로 나누는 반면에, 퀵 정렬은 분할할 때, 기준 아이템(pivot item) 중심으로, 이보다 작은 것은 왼편, 큰 것은 오른편에 위치시킨다.
  - 각 부분 정렬이 끝난 후, 병합정렬은 '병합'이란 후처리 작업이 필요하나, 퀵 정렬은 필요하지 않는다.
- 퀵 정렬 과정(`Hoare-Partition` 알고리즘)

<img src="https://user-images.githubusercontent.com/52685250/65399248-9c91b980-ddf6-11e9-9e0c-5a1537b456e6.JPG" width=600px>
<img src="https://user-images.githubusercontent.com/52685250/65399249-9c91b980-ddf6-11e9-8b2d-13cd4c22f578.JPG" width=600px>
<img src="https://user-images.githubusercontent.com/52685250/65399250-9c91b980-ddf6-11e9-8f46-1866dbd2f9cd.JPG" width=600px>
<img src="https://user-images.githubusercontent.com/52685250/65399251-9c91b980-ddf6-11e9-9b6b-eb846588d07b.JPG" width=600px>
<img src="https://user-images.githubusercontent.com/52685250/65399247-9bf92300-ddf6-11e9-864d-ec889bd496f8.JPG" width=600px>

> `Hoare-Partition 알고리즘`
>
> ```python
> arr = [3, 2, 4, 6, 9, 1, 8, 7, 5]
> def quickSort(lo, hi):
>     if lo >= hi: return
>     i, j, pivot = lo, hi, arr[lo]
>     while i < j:
>         while i <= hi and pivot >= arr[i]: i += 1
>         # 피봇보다 작은 값들만 있으면 오른쪽으로 계속 가므로 오류발생할 수 있는 가능성을 i <= hi를 작성하여 예외 처리를 해준다.
>         while pivot < arr[j]: j -= 1
>         if i < j:
>             arr[i], arr[j] = arr[j], arr[i]
>     arr[lo], arr[j] = arr[j], arr[lo]
>     quickSort(lo, j - 1)
>     quickSort(j + 1, hi)
>     
> print(arr)
> quickSort(0, len(arr) - 1)
> print(arr)
> ```

- 퀵 정렬(`Lomuto partition` 알고리즘)

<img src="https://user-images.githubusercontent.com/52685250/65400035-e1b7ea80-ddfa-11e9-933d-191be910e5de.JPG" width=500px>

> `Lomuto Partition 알고리즘`
>
> ```python
> arr = [69, 10, 30, 2, 16, 8, 31, 22]
> def quickSort(lo, hi):
>     if lo >= hi: return
>     i = lo - 1
>     for j in range(lo, hi):
>         if arr[hi] >= arr[j]:
>             i += 1
>             arr[i], arr[j] = arr[j], arr[i]
>     i += 1
>     arr[hi], arr[i] = arr[i], arr[hi]
> 
>     quickSort(lo, i - 1)
>     quickSort(i + 1, hi)
> 
>     
> print(arr)
> quickSort(0, len(arr) - 1)
> print(arr)
> ```

---

:heavy_check_mark: <b>퀵 정렬 비교 : `Hoare-Partition` vs `Lomuto-Partition` </b>

<a href="http://xiaohuiliucuriosity.blogspot.com/2015/04/quicksort.html" target="_blank"><img src="https://user-images.githubusercontent.com/52685250/65400490-6efc3e80-ddfd-11e9-87b4-dcee0055f9f1.png" width=540px></a>

---

<br>

#### (3) 분할 정복의 활용

- 병합 정렬 : 멀티코어 CPU 나 다수의 프로세서에서 정렬 알고리즘을 병렬화하기 위해 활용
- 퀵 정렬 : 매우 큰 입력 데이터에 대해서 좋은 성능을 보임

- 최근접 점의 쌍(Closet Pair) 문제는 2차원 평면상의 n개의 점이 입력으로 주어질 때, 거리가 가장 가까운 한 쌍의 점을 찾는 문제이다.
  - 컴퓨터 그래픽스, 컴퓨터 비전, 지리 정보 시스템, 항공 트래픽 제어 등의 분야

<br>

### 19.2 백트래킹(Backtracking)

#### (1) 백트래킹 개념

- 기본 개념
  - 여러 가지 선택지(옵션)들이 존재하는 상황에서 한가지를 선택한다.
  - 선택이 이루어지면 새로운 선택지들의 집합이 생성된다.
  - 이런 선택을 반복하면서 최종 상태에 도달한다.
  - 올바른 선택을 계속하면 목표 상태(goal state)에 도달한다.

- DFS와의 차이점
  - 어떤 노드에서 출발하는 경로가 해결책으로 이어질 것 같지 않으면 더 이상 그 경로를 따라가지 않음으로써 시도의 횟수를 줄임.(<b>Prunning</b>, 가지치기)
  - DFS가 모든 경로를 추적하는데 비해 백트래킹은 불필요한 경로를 조기에 차단.
  - DFS는 경우의 수가 너무 많음. 즉, N! 가지의 경우의 수를 가진 문제에 대해 DFS를 가하면 당연히 처리 불가능한 문제.
  - <u>백트래킹을 적용하면 일반적으로 경우의 수가 줄어들지만 이 역시 최악의 경우에는 여전히 지수함수 시간(Exponential Time)을 요하므로 처리 불가능</u>

- [예시] 4-Queens 문제

  <img src="https://user-images.githubusercontent.com/52685250/65402494-abce3280-de09-11e9-8c72-64bd2934d0cc.JPG" width=600px>

  - 위와 같이 상태 공간 트리(state space tree)를 만들 수 있다.
  - DFS로 할 경우 전체 경우의 수는 <sub>16</sub>C<sub>4</sub> = 1820가지 이지만, 백트래킹을 적용하면 각 Queen마다 행 번호가 하나씩 부여되므로 열 번호만 고려하면 되기 때문에 4X4X4X4 = 256가지로 줄어든다.
  - 하지만 이 보다 더 줄어들 수 있다. 열 번호가 중복되면 안 되기 때문에 1, 2, 3, 4를 순서대로 나열하는 경우의 수(=4! = 24가지)로 줄어들 수 있다. => 순열(permutation) 개념 적용하면 쉽게 해결!

<br>

#### (2) 백트래킹 기법

- 어떤 노드의 유망성을 점검한 후에 유망(promising)하지 않다고 결정되면 그 노드의 부모로 되돌아가(backtracking) 다음 자식 노드로 감.
- 어떤 노드를 방문하였을 때 그 노드를 포함한 경로가 해답이 될 수 없으면 그 노드는 유망하지 않다고 하며, 반대로 해답의 가능성이 있으면 유망하다고 한다.
- 가지치기(pruning) : 유망하지 않는 노드가 포함되는 경로는 더 이상 고려하지 않는다.
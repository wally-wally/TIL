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


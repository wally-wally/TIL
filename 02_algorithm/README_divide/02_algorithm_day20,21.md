# :notebook_with_decorative_cover: 02_algorithm - Day20, 21

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
>  if s == e:  # 기저 사례
>      return arr[s]
>  else:
>      ret = getMin(s, e - 1)  # 매개변수 => 문제의 크기, 반환값 => 문제의 해
>      return min(ret, arr[e])
> 
> print(getMin(0, len(arr) - 1))
> ```
>
> ```python
> arr = [9, 2, 3, 7, 5, 6, 8, 1, 4, 10]
> 
> def getMin(s, e):
>  if s == e: 
>      return arr[s]
>  else:
>      mid == (s + e) // 2
>      l = getMin(s, mid)
>      r = getMin(mid + 1, e)
>      return min(l, r)
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
>  for j in range(N):  # 두 번째 위치
>      for k in range(N):  # 세 번째 위치
>          print(arr[i], arr[j])
> ```
>
> 순열
>
> ```python
> arr = 'ABC'
> N = len(arr)
> for i in range(N):  # 첫 번째 위치
>  for j in range(N):  # 두 번째 위치
>      if j == i: continue
>      for k in range(N):  # 세 번째 위치
>          if k == i or k == j: continue
>          print(arr[i], arr[j])
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
>  for j in range(i + 1, N):  # 두 번째 위치
>      for k in range(j + 1, N):   # 세 번째 위치
>          print(arr[i], arr[j], arr[k])
> ```
>
> 중복조합
>
> ```python
> arr = 'ABCDE'
> N = len(arr)
> for i in range(N):  # 첫 번째 위치
>  for j in range(i, N):  # 두 번째 위치
>      for k in range(j, N):   # 세 번째 위치
>          print(arr[i], arr[j], arr[k])
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

------

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

------

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

------

:heavy_check_mark: `활동 선택 문제` 증명 : **종료 시간이 가장 빠른 활동 a<sub>m</sub> 을 선택하는 것은 항상 안전하다.**

- 전체 활동들의 집합 S<sub>i, j</sub> 에서 양립 가능한 최대 크기의 부분 집합인 A<sub>i, j</sub> 가 있다.
- a<sub>k</sub> 는  A<sub>i, j</sub> 에 속한 종료 시간이 가장 빠른 활동
- 두 가지 경우로 생각하자.
  - a<sub>k</sub> = a<sub>m</sub> : 최대 크기 부분집합에 포함.
  - a<sub>k</sub> != a<sub>m</sub> : A<sub>i, j</sub> 에서 a<sub>k</sub> 를 제거하고 a<sub>m</sub> 을 추가한다. 이 때 a<sub>m</sub> 은 a<sub>k</sub> 보다 종료 시간이 빠르기 때문에 A<sub>i, j</sub> 에 들어있는 다른 행동들과 겹치지 않음
- 따라서 종료 시간이 가장 빠른 활동을 선택하는 것은 항상 안전하다.

------

<img src="https://user-images.githubusercontent.com/52685250/65004226-a3bc5180-d936-11e9-8592-7200692a73cd.JPG" width=700px alt="Greedy vs DP">

:warning: 동적 계획법은 대부분의 최적화 문제에 적용할 수 있고, 탐욕 기법은 장점이 많으나 대부분의 최적화 문제에 적용할 수 없다.
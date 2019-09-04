# :notebook_with_decorative_cover: 02_algorithm - Day09, 10

<br>

## 9. 8월26일(09일차) - `Stack(2)`

### 9.1 스택(Stack)의 활용 - 계산기

#### (1) 수식의 표기법

| <div class="text-center">표기법</div>                        | <div class="text-center">내용</div>                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <div class="text-center">중위 표기법</div><div class="text-center">(Infix notation)</div> | <ul><li>연산자를 피연산자의 가운데 표기하는 방법</li>    <li>ex) 3 + 4 * 2</li></ul> |
| <div class="text-center">후위 표기법</div><div class="text-center">(postfix notation)</div> | <ul>    <li>연산자를 피연산자 뒤에 표기하는 방법</li>    <li>후위 표기법의 수식을 스택을 이용하여 계산한다.</li>    <li>ex) 3 4 2 * +</li></ul> |

- 중위 표기법에서 후위 표기법으로의 변환 알고리즘(스택 이용)
  - 스택에 **<u>연산자</u>**가 들어감

```python
# 중위 표기법 -> 후위 표기법

formula = '2+3*4/5'

operand = [] # 피연산자가 들어갈 stack 선언

for data in formula:
    if data.isdigit():
        print(data, end = ' ')
    else:
        operand.append(data)

for i in range(len(operand)):
    print(operand.pop(), end=' ')
```

- 후위 표기법의 수식을 스택을 이용하여 계산

  - 스택에 **<u>피연산자</u>**가 들어감
  - 피연산자를 stack에 push하고 연산자를 만나면 필요한 만큼 피연산자를 스택에서 pop하여 연산하고, 연산결과를 다시 스택에 push함

  :warning: <font color="red">**<u>스택에서 pop할 때 먼저 꺼낸 피연산자가 뒤에, 나중에 꺼낸 피연산자가 앞에 들어간다!</u>**</font> (연산자가 `/`이고 스택에서 `4`, `2` 순서로 pop된 경우 => `2/4` 수식이 완성된다.)

<br>

#### (2) `eval()` 내장함수

- 스택을 두 번 사용해서 처리했던 연산을 파이썬에서 제공되는 `eval()` 내장함수로 계산할 수 있음
- 문자열로 된 수식을 계산함
- 올바른 수식이 아닌 경우 `SyntaxError` 예외가 발생함
- `eval('6+5*(2-8)/2')`와 같이 작성할 수 있음

<br>

### 9.2 백트래킹(Backtracking)

#### (1) 백트래킹의 기본

- 해를 찾는 도중에 '막히면' (즉, 해가 아니면) 되돌아가서 다시 해를 찾아 가는 기법
- 최적화(Optimization) 문제와 결정(Decision) 문제(조건을 만족하는 해의 존재 여부를 'yes'또는 'no'로 답)를 해결할 수 있음
- [대표 예제]미로 찾기, n-Queen 문제, Map coloring, 부분집합의 합
- 백트래킹 vs 깊이우선탐색
  - 깊이우선탐색이 모든 경로를 추적하는데 비해 백트래킹은 불필요한 경로를 조기에 차단(Prunning 가지치기)
  - 깊이우선탐색을 가하기에는 경우의 수가 너무나 많음!(`N!`가지의 경우의 수를 가진 문제)
  - 백트래킹 알고리즘을 적용하면 일반적으로 경우의 수가 줄어들지만 이 역시 최악의 경우에는 여전히 지수함수 시간을 요하므로 처리 불가능
  - 깊이우선탐색 : 모든 후보를 검사 / 백트래킹 : 모든 후보를 검사하지 않음

<br>

#### (2) 백트래킹 기법

- 백트래킹 기법은 어떤 노드의 유망성을 점검한 후에 **<u>유망(promisig)</u>**하지 않다고 결정되면 그 노듸 부모로 되돌아가 다음 자식 노드로 감
- 가지치기(pruning) : 유망하지 않는 노드가 포함되는 경로는 더 이상 고려하지 않음

- 알고리즘 절차
  - 상태 공간 트리의 깊이 우선 검색을 실시
  - 각 노드가 유망한지 점검
  - 만일 그 노드가 유망하지 않으면, 그 노드의 부모 노드로 돌아가서 검색을 계속함

> **상태 공간 트리**
>
> <img src="https://user-images.githubusercontent.com/52685250/63660763-ee90f080-c7f2-11e9-92f8-552adb2f2087.JPG" alt="상태공간트리" width=700px>
>
> - 해를 찾기 위해 탐색할 필요가 있는 모든 후보들을 포함하는 트리
> - 트리의 모든 노드들을 방문하면 해를 찾을 수 있음
>
> :heavy_check_mark: 문제 수행이 불가능해지는 노드는 사전에 탐색을 중지하기 때문에 깊이우선탐색보다 노드 수가 매우 적음

<br>

#### (3) 백트래킹 예제 - 부분집합 구하기

- 어떤 집합의 공집합과 자기자신을 포함한 모든 부분집합을 powerset이라고 함

- 어떤 집합의 원소 개수가 n일 경우 부분집합의 개수는 2<sup>n</sup> 개(공집합 포함)
- true 또는 false값을 가지는 항목들로 구성된 n개의 리스트를 만드는 방법을 이용

<img src="https://user-images.githubusercontent.com/52685250/63661910-5f3a0c00-c7f7-11e9-9b20-7ae20a4a2adb.JPG" width=800px alt="부분집합_구하기">

> [예제] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}의 powerset 중 원소의 합이 10인 부분집합을 구하기
>
> ```python
> def backtrack(a, k, input):
>     global MAXCANDIDATES
>     c = [0] * MAXCANDIDATES
> 
>     if k == input:
>         process_solution(a, k)
>     else:
>         k += 1
>         ncandidates = construct_candidates(a, k, input, c)
>         for i in range(ncandidates):
>             a[k] = c[i]
>             backtrack(a, k, input)
> 
> 
> def construct_candidates(a, k, input, c):
>     c[0] = True
>     c[1] = False
>     return 2
> 
> 
> def process_solution(a, k):
>     arr = []
>     Sum = 0
>     for i in range(k+1):
>         if a[i]:
>             arr.append(i)
>             Sum += i
>     if Sum == 10:
>         print('(', end='')
>         for j in arr:
>             print(j, end='')
>         print(')')
> 
> 
> MAXCANDIDATES = 100
> NMAX = 100
> a = [0] * NMAX
> backtrack(a, 0, 10)
> ```

<br>

#### (4) 백트래킹 예제 - 순열 구하기

<img src="https://user-images.githubusercontent.com/52685250/63666263-ba74fa00-c809-11e9-8cc3-57f0f0181ac0.JPG" width=800px alt="백트래킹_예제_순열">

```python
def backtrack(a, k, input):
    global MAXCANDIDATES
    c = [0] * MAXCANDIDATES

    if k == input:  # 재귀 호출시 Base Case가 반드시 있어야 한다!!!
        for i in range(1, k+1):
            print(a[i], end=' ')
        print()
    else:
        k += 1
        ncandidates = construct_candidates(a, k, input, c)
        for i in range(ncandidates):
            a[k] = c[i]
            backtrack(a, k, input)


def construct_candidates(a, k, input, c):
    in_perm = [False] * NMAX

    for i in range(1, k):
        in_perm[a[i]] = True

    ncandidates = 0
    for i in range(1, input+1):
        if in_perm[i] == False:
            c[ncandidates] = i
            ncandidates += 1
    return ncandidates


MAXCANDIDATES = 100
NMAX = 100
a = [0] * NMAX
backtrack(a, 0, 3)
```

<br>

### 9.3 분할 정복

#### (1)  분할 정복 알고리즘

- 주어진 문제의 입력을 다루기 쉽게 부분으로 <font color="red">**<u>분할하여 문제를 해결(정복)하는 방식의 알고리즘</u>**</font>
- 문제를 더 이상 나눌 수 없을 때까지 나누고 어렇게 나누어진 문제들을 각각 풂으로써 전체 문제의 답을 얻는 알고리즘
- 문제를 두 단계인 ①분할과 ②정복으로 나눠서 해결하는 것
- 분할한 입력에 대하여 동일한 알고리즘을 적용하여 해를 계산하며 이들의 해를 취합해서 원래 문제의 해를 얻음
- 용이하게 풀 수 있는 작은 문제 단위로 나눈 다음 그것들을 다시 합쳐서 해결하자는 것
- 분할 정복의 대표적인 예 : 합병 정렬, 퀵 정렬, 이진 탐색, 거듭제곱 연산(a<sup>b</sup>) 등

> **거듭 제곱(Exponentiation) 계산하기**
>
> - 일반적인 방법 => O(n)
>
> ```python
> def Power(Base, Exp):
>     if Base == 0:
>         return 1
>    	result = 1
>     for i in range(Exp):
>         result *= Base
>     return result
> ```
>
> - 분할 정복 기반 => O(log<sub>2</sub>n)
>   - 거듭제곱을 반씩 나누어서 곱해나감
>   - 반으로 나뉜 부분은 다시 반으로 나누어서 곱해가면서 재귀적으로 하나의 값만 남을 때까지 나눔
>   - n이 짝수일 때 : C<sup>n/2</sup> * C<sup>n/2</sup>
>   - n이 홀수일 때 : C<sup>(n-1)/2</sup> * C<sup>(n-1)/2</sup> * C
>
> ```python
> def Power(Base, Exp):
>     if Exp == 0 or Base == 0:
>         return 1
>     
>     if Exp % 2 == 0:
>         NewBase = Power(Base, Exp/2)
>         return NewBase * NewBase
>    	else:
>         NewBase = Power(Base, (Exp-1)/2)
>         return (NewBase * NewBase) * Base
> ```

<br>

#### (2) 퀵 정렬

- 평균적으로 수행 속도가 매우 빠른 정렬 방법
- 정렬할 전체 데이터에 대해서 정렬을 수행하지 않고 기준키(pivot)를 중심으로 왼쪽 부분 리스트와 오른쪽 부분 리스트로 분할하여 정렬
- 피벗을 기준으로 왼쪽 부분 리스트에는 피벗보다 작은 데이터들을 이동시키고 오른쪽 부분 리스트에는 피벗보다 큰 데이터들을 이동
- 작은 값을 갖는 데이터와 큰 값을 갖는 데이터로 분리해가며 정렬하는 방법
- 프로그램에서 재귀 호출을 이용하기 때문에 스택이 필요

```python
def quickSort(a, low, high):
    if low < high:
        pivot = partition(a, low, high)
        quickSort(a, low, pivot-1)
        quickSort(a, pivot+1, high)


def partition(a, pivot, high):
    i = pivot + 1
    j = high
    while True:
        while i < high and a[i] < a[pivot]:
            i += 1
        while j > pivot and a[j] > a[pivot]:
            j -= 1
        if j <= i:
            break
        a[i], a[j] = a[j], a[i]
        i += 1
        j -= 1

    a[pivot], a[j] = a[j], a[pivot]
    return j


a = [54, 88, 77, 26, 93, 17, 49]
print('정렬 전:\t', a)
quickSort(a, 0, len(a)-1)
print('정렬 후:\t', a)
```

```
정렬 전:	 [54, 88, 77, 26, 93, 17, 49]
정렬 후:	 [17, 26, 49, 54, 77, 88, 93]
```

<br>

### 9.4 정렬 알고리즘 비교

<img src="https://user-images.githubusercontent.com/52685250/63670384-77218800-c817-11e9-893f-56a976d2dbb1.JPG" width=700px alt="정렬 알고리즘 비교">

<br>

------

<br>

## 10. 8월27일(10일차)

### 10.1 [예제] 미로

```python
def find():
    dRow = [0, 1, 0, -1]
    dCol = [1, 0, -1, 0]
    s = []
    s.append([sRow, sCol]) # 입구로 이동
    maze[sRow][sCol] = 1 # 방문 표시
    while (len(s) != 0):
        n = s.pop() # 갈수있는 칸 좌표를 꺼내
        for i in range(4): # 주변 좌표 계산
            nRow = n[0] + dRow[i]
            nCol = n[1] + dCol[i]
            if nRow >= 0 and nRow < N and nCol > 0 and nCol < N: # 미로 내부
                if maze[nRow][nCol] == 3: # 출구인 경우 1 반환
                    return 1
                elif maze[nRow][nCol] == 0: # 갈 수 있는 곳 저장
                    s.append([nRow, nCol])
                    maze[n[0]][n[1]] = 1
    return 0 # 출구에 가지 못하고 모든칸 방문

T = int(input())

for tc in range(1, T + 1):
    N = int(input())
    maze = [[int(x) for x in input()] for i in range(N)]
    for i in range(N):
        if 2 in maze[i]:
            sRow = i
            sCol = maze[i].index(2)
    print('#{} {}'.format(tc, find()))
```

<br>

### 10.2 [예제] 배열 최소 합

#### (1) 파이썬 `itertools` 모듈 활용

- 코드 구성은 간단하지만 수행 시간은 다소 느리다는 단점이 있다.

```python
from itertools import permutations

def find():
    min = 100
    for p in permutations(range(N)):
        s = 0
        for i in range(N):
            s += m[i][p[i]]
        if min > s:
            min = s
    return min

T = int(input())
for tc in range(1, T + 1):
    N = int(input())
    m = [list(map(int, input().split())) for x in range(N)]
    print('#{} {}'.format(tc, find()))
```

#### (2) 외부 함수 선언(알고리즘 방식)

- 위의 방법보다 수행시간이 훨씬 짧다.

```python
def find(n, s): # n은 순열의 인덱스, s는 생성된 부분까지의 합
    global minV
    if n == N: # 순열이 완성된 경우
        if minV > s: # 기존의 최소값보다 작으면
            minV = s
        return
    elif minV <= s: # 순열이 완성되지 않았지만 합이 최소값보다 큰 경우
        return
    else:
        for i in range(N): # 순열의 n번 인덱스에 들어갈 숫자 선택
            if u[i] == 0:
                u[i] = 1
                find(n + 1, s + m[n][i])
                u[i] = 0
        return

T = int(input())
for tc in range(1, T + 1):
    N = int(input())
    m = [list(map(int, input().split())) for x in range(N)]
    u = [0 for i in range(N)]
    minV = 100
    find(0, 0)
    print('#{} {}'.format(tc, minV))
```

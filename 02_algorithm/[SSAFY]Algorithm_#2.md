# [SSAFY]Algorithm_#2(written by wally-wally)

------

**※참고사항※**

- `[SSAFY]Algorithm_#2`는 정규과정 `Algorithm`을 진행한 내용들을 작성함.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

<br>

## 7. 8월19일(07일차) - `Stack(1)`

### 7.1 스택(Stack)의 기본

#### (1) 스택의 특성

- `선형 구조` : 자료 간의 관계가 1대1의 관계를 가짐
  - cf) `비선형 구조` : 자료 간의 관계가 1대N의 관계를 가짐(ex. 트리, 그래프)
- `후입선출(LIFO, Last-In-First-Out)` : 마지막에 삽입한 자료를 가장 먼저 꺼냄
  - 1 - 2 - 3 순으로 **<u>자료 삽입한 후 꺼내면 역순으로</u>** 3 - 2 - 1 순으로 꺼낼 수 있음

<br>

#### (2) 스택의 연산

![stack](https://user-images.githubusercontent.com/52685250/63233409-f8eb4180-c26a-11e9-87e4-d5fae199a63e.JPG)

- 인덱스 0번부터 저장하기 위해 보통 top을 -1로 설정하고 시작한다.(아무 것도 없다는 것을 설정하기 위해)
- `삽입(push)` : 저장소에 자료를 저장
- `삭제(pop)` : 저장소에서 자료를 꺼냄
- `isEmpty` : 공백인지 아닌지 확인
- `peek` : 스택의 top(마지막에 삽입된 원소의 위치)에 있는 원소를 반환

> C-style

```python
S = [0] * 3  # 저장소
top = -1     # 마지막에 저장된 자료의 인덱스

def push(item):
    global top
    # 넣기 전에 full 상태를 체크
    if top == 2:
        return
    top += 1
    S[top] = item

def pop():
    global top
    # empty 상태 체크
    if top == -1:
        return
    ret = S[top]
    top -= 1
    return ret

for i in range(3): # 3 대신 4로 하면 Error 발생
    push(i)

print(pop())
print(pop())
print(pop()) # pop 한 번 더 하면 Error 발생
```

> Python-Style

```python
S = []

def push(item):
    S.append(item)

def pop(): # pop을 할 때는 항상 empty 상태를 체크한다.
    return S.pop()

def isEmpty(): # 직접 이렇게 함수를 안 만들고 empty 상태를 체크해도 된다.
    return len(S) == 0

for i in range(3):
    push(i)

while not isEmpty():
    print(pop())
```

> 이와 같은 style은 여러 개의 stack을 구현할 때 코드가 복잡해진다.

```python
import time
start = time.time()
S = []

def push(item):
    S.append(item)

def pop(): # pop을 할 때는 항상 empty 상태를 체크한다.
    return S.pop()

def isEmpty(): # 직접 이렇게 함수를 안 만들고 empty 상태를 체크해도 된다.
    return len(S) == 0

for i in range(3):
    push(i)

while not isEmpty():
    pop()

print('실행 시간 = ', time.time() - start) # 실행시간 확인
```

> **데크를 사용하면 실행 시간이 훨씬 빠르다.**(파이썬에서는 `deque`를 주로 사용하자!)
>
> cf) `popleft()` : 앞에꺼를 pop하는 함수

```python
from collections import deque
import time
start = time.time()
S = deque()
N = 1000000
for i in range(N):
    S.append(i)
while S: # 이렇게 작성하면 비어있는 상태(S가 false)인지 check 가능
    S.pop()
print('실행 시간 = ', time.time() - start)
```

<br>

#### (3) 스택의 응용① - 괄호검사

- 조건
  - 왼쪽 괄호의 개수 = 오른쪽 괄호의 개수
  - 같은 괄호에서 왼쪽 괄호는 오른쪽 괄호보다 먼저 나와야 함
  - 괄호 사이에는 포함 관계만 포함(여는 괄호의 순서 = 닫는 괄호의 역순) `{ ( [ ] ) }`

- 스택을 이용한 괄호 검사

![괄호검사](https://user-images.githubusercontent.com/52685250/63234989-c34a5680-c272-11e9-8937-b50e0dfbe362.JPG)

- 괄호를 조사하는 알고리즘 개요
  - 여는 괄호는 스택에 삽입, 닫는 괄호 만나면 top에 있는 괄호와 짝이 맞는지 검사
  - 이 때, **스택이 비어 있거나 짝이 맞지 않으면 조건에 위배됨**
  - **마지막 괄호까지 조사한 후에도 스택에 괄호가 남아 있어도 조건에 위배됨**

```python
T = int(input())
for a in range(T):
    S = []
    sentence = input()
    result = 1
    for letter in sentence:
        if letter == '(' or letter == '{':
            S.append(letter)
        elif letter == ')':
            if len(S) == 0:
                result = 0
                break
            if S.pop() != '(':
                result = 0
                break
        elif letter == '}':
            if len(S) == 0:
                result = 0
                break
            if S.pop() != '{':
                result = 0
                break
    if S:
        result = 0
    print('#{} {}'.format(a + 1, result))
```

<br>

#### (4) 스택의 응용② - Function call

- 프로그램에서의 함수 호출과 복귀에 따른 수행 순서를 관리
  - 가장 마지막에 호출된 함수가 가장 먼저 실행을 완료하고 복귀하는 후입선출 구조이므로, 후입선출 구조의 스택을 이용하여 수행순서 관리
  - 스택 프레임 : 함수 호출이 발생하면 호출한 함수 수행에 필요한 지역변수, 매개변수 및 수행 후 복귀할 주소 등의 정보를 저장하는 곳 => 시스템 스택에 삽입
  - 함수 실행이 끝나면 시스템 스택의 top 원소를 삭제 

![ffffff](https://user-images.githubusercontent.com/52685250/63236879-81251300-c27a-11e9-92ed-d93a7f2c5a23.JPG)

<br>

### 7.2 재귀호출(Recursive Function)

- 재귀적 정의를 구현할 때 재귀호출이 좋다.
  - 재귀적 정의 : 좀 더 작은 문제의 답을 사용해서 더 큰 문제의 답을 구하는 방법

> **팩토리얼 구하는 문제**(문제의 크기는 자연수로 표현)
>
> - n = 1 or 0 => `1`
> - n > 1 => `(n-1)! * n`

![fact](https://user-images.githubusercontent.com/52685250/63237217-0957e800-c27c-11e9-9a9d-59f77a085ab6.JPG)

![49465645](https://user-images.githubusercontent.com/52685250/63240139-54c4c300-c289-11e9-8797-20dedc434e6b.JPG)

```python
def factorial(n): # n(매개변수) : 문제(크기)를 나타내는 값
                  # 반환값 = n!의 값(문제의 해)
    if n == 0 or n == 1:    # 기저 사례
        # 재귀호출 하지 않고 종료
        return 1
    else:
        # 재귀호출
        return factorial(n - 1) * n

print(factorial(4)) # 24가 출력됨
```

> **피보나치 수열**

```python
def fibonacci(n): # n 번째 피보나치 수를 반환
    if n == 1 or n == 0:
        return n
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)
    
print(fibonacci(10)) # 55가 출력됨
```

<br>

### 7.3 Memoization

- 앞의 예에서 피보나치 수를 구하는 함수를 재귀함수로 구현하면 시간복잡도가 2<sup>n</sup> 으로 올라가기 때문에 수행 시간이 오래걸리는 문제점이 발생한다.(**엄청난 중복 호출 문제 발생**)

![04646](https://user-images.githubusercontent.com/52685250/63240767-0e249800-c28c-11e9-8a33-5d37b1b098bd.JPG)

- `Memoization` : **<u>이전에 계산한 값</u>**을 메모리에 저장해서 **<u>매번 다시 계산하지 않도록</u>** 하여 전체적인 실행속도를 빠르게 하는 기술이며 동적 계획법의 핵심이 되는 기술

![04646](https://user-images.githubusercontent.com/52685250/63241866-3c0bdb80-c290-11e9-8b9d-b3b4fe8393ea.JPG)

- 초록색으로 표시된 부분만 실질적인 계산을 하게 됨

```python
# 재귀적 DP (재귀호출 + 메모이제이션)

memo = [-1] * 100

def fibonacci(n): # n 번째 피보나치 수를 반환
    if n == 1 or n == 0:
        return n
    # 이미 답을 구했는지 확인
    if memo[n] != -1:
        return memo[n]
    
    memo[n] = fibonacci(n - 1) + fibonacci(n - 2)
    return memo[n]

print(fibonacci(10))
```

<br>

### 7.4 DP(Dynamic Programming) <a href="http://problems.kr/07Design/dp/fibonacci.html">피보나치DP</a>

- Greedy Algorithm과 같이 **<u>최적화 문제를 해결</u>**하는 알고리즘
- 먼저 입력 크기가 작은 부분들을 모두 해결한 후에 그 해들을 이용하여 보다 큰 크기의 부분 문제들을 해결하여, 최종적으로 원래 주어진 입력의 문제를 해결하는 알고리즘

```python
memo = [-1] * 100

def fibonacci(n): # n 번째 피보나치 수를 반환
    memo[0], memo[1] = 0, 1
    for i in range(2, n + 1): # i ==> 문제를 나타내는 값
        memo[i] = memo[i - 1] + memo[i - 2]
    return memo[n]

print(fibonacci(10))
```

- memoization을 재귀적 구조에 사용하는 것보다 반복적 구조로 DP를 구현한 것이 성능면에서 보다 효율적임.
- 재귀적 구조는 내부에 **시스템 호출 스택을 사용하는 오버헤드가 발생**하기 때문이다.

<br>

### 7.5 그래프(Graph) 맛보기

#### (1) 그래프의 특징

- 아이템들과 이들 사이의 연결 관계를 표현
- **정점(Vertex**)들의 집합과 이들을 연결하는 **간선(Edge)**들의 집합으로 구성
- 스택과 달리 비선형 구조로 선형 자료구조나 트리 자료구조로 표현하기 어려운 N : N 관계를 가지는 원소들을 표현하기에 용이
- **<u>문제 풀 때 무향 그래프인지 유향 그래프인지 주의해서 보자!</u>**
- 두 정점 사이에 간선이 존재하면 서로 인접(Adjacency)해 있다.
- 경로 : 간선들(지나간 정점들)을 순서대로 나열한 것
  - 단순경로 : 경로 중 한 정점을 최대 한 번만 지나는 경로
  - 사이클 : 시작한 정점에서 끝나는 경로

<br>

#### (2) 그래프의 표현

- 인접 행렬(Adjacent matrix)
  - 단점 : 쓸 때 없이 메모리를 많이 쓰고 시간이 오래 걸림

![06064](https://user-images.githubusercontent.com/52685250/63244051-467da380-c297-11e9-9c0e-b328f351419d.JPG)

- 인접 리스트(Adjacent list)

![00](https://user-images.githubusercontent.com/52685250/63244610-d839e080-c298-11e9-9e06-d94e0d7d751c.JPG)

```python
# 인접 리스트의 형태로 저장하기

V, E = map(int, input().split())    # 정점수, 간선수

G = [[] for _ in range(V + 1)]    # 정점 번호 1 ~ V

for _ in range(E):
    u, v = map(int, input().split())
    G[u].append(v)
    G[v].append(u)

for i in range(1, V + 1):
    print(i, '-->', G[i])
```

<br>

### 7.6 DFS(깊이우선탐색)

#### (1) DFS의 특징

- 시작 정점의 한 방향으로 갈 수 있는 경로가 있는 곳까지 깊이 탐색해 가다가 더 이상 갈 곳이 없게 되면, 가장 마지막에 만났던 갈림길 간선이 있는 정점을 되돌아와서 다른 방향의 정점으로 탐색을 계속 반복하여 결국 모든 정점을 방문하는 순회방법
- 가장 마지막에 만났던 갈림길의 정점으로 되돌아가서 다시 깊이 우선 탐색을 반복해야 하므로 **<u>후입선출 구조의 스택 사용</u>**
- DFS는 최단으로 방문하지 않는다.

<br>

#### (2) DFS 알고리즘 구현

```python
import sys
sys.stdin = open('DFS_input.txt', 'r')

def DFS(v):    # v : 시작점
    S = []
    visit = [False] * (V + 1)
    visit[v] = True   # 시작점을 방문한다.
    print(v, end=' ')
    S.append(v)   # 시작점을 스택에 push
    while S:    # 빈 스택이 아닐 동안
        for w in G[v]:    # v의 방문하지 않은 인접정점을 찾는다. ==> w
            if not visit[w]:
                visit[w] = True    # w를 방문하고
                print(w, end=' ')
                S.append(v)
                v = w    # w를 현재 방문하는 정점으로 설정
                break
        else:   # 이전에 방문한 정점으로 되돌아간다.
            v = S.pop()


V, E = map(int, input().split())    # 정점수, 간선수

G = [[] for _ in range(V + 1)]    # 정점 번호 1 ~ V

for _ in range(E):
    u, v = map(int, input().split())
    G[u].append(v)
    G[v].append(u)

DFS(1)
```

> 재귀호출로 구현하기

```python
import sys
sys.stdin = open('DFS_input.txt', 'r')

def DFS(v):
    visit[v] = True
    print(v, end=' ')
    for w in G[v]:
        if not visit[w]:
            DFS(w)

V, E = map(int, input().split())
G = [[] for _ in range(V + 1)]
visit = [False] * (V + 1)

for _ in range(E):
    u, v = map(int, input().split())
    G[u].append(v)
    G[v].append(u)

DFS(1)
```

<br>

------

<br>

## 8. 8월20일(08일차)

### 8.1 [예제] <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV14ABYKADACFAYh&categoryId=AV14ABYKADACFAYh&categoryType=CODE">ladder1</a>

```python
for tc in range(1, 11):
    N = input()
    arr = [list(map(int, input().split())) for _ in range(100)]

    x, y = 99, 0
    for i in range(100):
        if arr[99][i] == 2:
            y = i
            break
    # 첫 번째 방법
    dir = 0   # 0: 위, 1:왼쪽, 2: 오른쪽
    while x: # x == 0 이 되면 종료
        if dir != 2 and y - 1 >= 0 and arr[x][y - 1]: #인덱스 유요한 범위인지 체크
            y, dir = y - 1, 1
        elif dir != 1 and y + 1 < 100 and arr[x][y + 1]:
            y, dir = y + 1, 2
        else:
            x, dir = x - 1, 0
    print(y)
```

```python
    # 두 번째 방법
    while x:
        if y - 1 >= 0 and arr[x][y - 1]:
            while y - 1 >= 0 and arr[x][y - 1]:
                y -= 1
            x -= 1
        elif y + 1 < 100 and arr[x][y - 1]:
            while y + 1 < 100 and arr[x][y - 1]:
                y += 1
            x -= 1
        else:
            x -= 1
    print(y)
```

```python
# 세 번째 방법(재귀호출)
def DES(x, y):
    if x == 0: return y

    arr[x][y] = 0
    if y - 1 >= 0 and arr[x][y - 1]:
        return DFS(x, y - 1)
    elif y + 1 < 100 and arr[x][y + 1]:
        return DFS(x, y + 1)
    else:
        return DFS(x - 1, y)

for tc in range(1, 11):
    N = input()
    arr = [list(map(int, input().split())) for _ in range(100)]

    x, y = 99, 0
    for i in range(100):
        if arr[99][i] == 2:
            y = i
            break

    print(DFS(x, y))
```

```python
# 네 번째 방법(전역변수 활용)
ans = -1
def DES(x, y):
    global ans
    if x == 0:
        ans = y
        return

    arr[x][y] = 0
    if y - 1 >= 0 and arr[x][y - 1]:
        DFS(x, y - 1)
    elif y + 1 < 100 and arr[x][y + 1]:
        DFS(x, y + 1)
    else:
        DFS(x - 1, y)

for tc in range(1, 11):
    N = input()
    arr = [list(map(int, input().split())) for _ in range(100)]

    x, y = 99, 0
    for i in range(100):
        if arr[99][i] == 2:
            y = i
            break

    print(DFS(x, y))
```

<br>

### 8.2 위상 정렬

- 어떤 일을 하는 순서를 찾는 알고리즘이다.

- 위상 정렬은 사이클을 포함하지 않는 유향 그래프(DAG 그래프)를 대상으로 한다.
- 진입 차수가 0인 정점을 먼저 선택하고 시작하면 편하다.

<br>

------

<br>

## 9. 8월26일(09일차) - `Stack(2)`

### 9.1 스택(Stack)의 활용 - 계산기

#### (1) 수식의 표기법

| <div class="text-center">표기법</div>                        | <div class="text-center">내용</div>                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <div class="text-center">중위 표기법</div><br><div class="text-center">(Infix notation)</div> | <ul><br/>    <li>연산자를 피연산자의 가운데 표기하는 방법</li><br/>    <li>ex) 3 + 4 * 2</li><br/></ul> |
| <div class="text-center">후위 표기법</div><br><div class="text-center">(postfix notation)</div> | <ul><br/>    <li>연산자를 피연산자 뒤에 표기하는 방법</li><br/>    <li>후위 표기법의 수식을 스택을 이용하여 계산한다.</li><br/>    <li>ex) 3 4 2 * +</li><br/></ul> |

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

<br>

------

<br>

## 11. 8월28일(11일차) - `Queue`

### 11.1 큐(Queue)

#### (1) 큐(Queue)의 특성

- **<u>선입선출구조(FIFO : First In First Out)</u>**
  - 큐에 삽입한 순서대로 원소가 저장되어, 가장 먼저 삽입된 원소는 가장 먼저 삭제된다.
- 스택과 마찬가지로 삽입과 삭제의 위치가 제한적인 자료구조
  - 큐의 뒤에서는 삽입만 하고, 큐의 앞에서는 삭제만 이루어지는 구조

<br>

#### (2) 큐의 연산

![큐1](https://user-images.githubusercontent.com/52685250/63819969-62153800-c982-11e9-8342-746ae62027a3.JPG)

- `enQueue(item)` 연산은 삽입을, `deQueue()` 연산은 삭제 연산을 수행한다.
  - 삽입은 `꼬리(Rear)`에서, 삭제는 `머리(Front)`에서 수행한다.
  - `enQueue()` 연산을 수행하면 우선 `rear` 값을 1 증가시키고 그 위치에 삽입한다.
  - `deQueue()` 연산을 수행하면 우선 `front` 값을 1 증가시키고 그 위치에 있는 원소를 삭제한다.
  - 즉, <font color="red">**큐에서는 `front`와 `rear` 가 증가하기만 한다.(감소 X)**</font>
- `isEmpty()` 연산을 통해 큐가 공백상태인지, `isFull()` 연산을 통해 큐가 포화상태인지 확인한다.
- `Qpeek()` 연산을 통해 큐의 앞쪽(front)에서 <font color="blue">**원소를 삭제 없이 반환**</font>한다.(**front 값 자체 변경 X**)

<img src="https://user-images.githubusercontent.com/52685250/63820031-a7d20080-c982-11e9-8f5c-6495afd6e7f5.JPG" width=700px alt="#">

<img src="https://user-images.githubusercontent.com/52685250/63820032-a7d20080-c982-11e9-85d6-eadab332cda7.JPG" width=700px alt="#">

- 큐의 상태 표현 (선형 큐)
  - 초기 상태 : `front` = `rear` = -1
  - 공백 상태 : `front` = `rear` 
  - 포화 상태 : `rear` = `n` - 1(`n` : 배열의 크기, `n-1` : 배열의 마지막 인덱스)

> 파이썬에서는 `queue` 라이브러리를 제공한다.
>
> ```python
> import queue
> 
> q = queue.Queue()
> q.put('A')
> q.put('B')
> q.put('C')
> 
> while not q.empty():
>     print(q.get())
> ```

<br>

#### (3) 선형 큐의 문제점 : `잘못된 포화 상태 인식!` & `메모리 낭비`

- 잘못된 포화 상태 인식
  - [리스트의 크기를 고정] => [사용할 큐의 크기만큼을 미리 확보] => [메모리의 낭비 발생]
- 선형 큐의 단점 해결 방법
  - `원형 큐` 사용으로 메모리 절약
  - 파이썬의 리스트 특성을 사용한 큐 사용으로 메모리 절약
    - 단점 : 삽입, 삭제 시 복사, 데이터 이동시키는 연산 수행에 많은 시간 소모
  - 단순연결 리스트로 구현한 큐 사용을 메모리 동적 확보
  - 큐 라이브 사용

<br>

#### (4) 원형 큐

- <font color="red">**원형 큐 공간이 `n`개 이면 최대 `n-1`개 원소를 넣을 수 있다. (공백 1칸은 반드시 확보해 놓아야 한다!)**</font>

- 초기 공백 상태 : `front` = `rear` = 0
- `front`와 `rear`의 위치가 배열의 마지막 인덱스인 `n - 1`를 가리킨 후, 그 다음에는 논리적 순환을 이루어 배열의 처음 인덱스인 0으로 이동해야 함
  - 이를 위해 나머지 연산자 `mod`를 사용함
    - 삽입 위치 : `rear = (rear + 1) mod n`
    - 삭제 위치 : `front = (front + 1) mod n`

- `front` 변수 : 공백 상태와 포화 상태 구분을 쉽게 하기 위해 `front` 가 있는 자리는 사용하지 않고 항상 빈자리로 둠

```python
def isEmpty():
    return front == rear

def isFull():
    return (rear + 1) % len(cQ) == front

def enQueue(item): # 원형 큐의 삽입 연산
    global rear
    if isFull():
        print('Queue_Full')
    else:
        rear = (rear + 1) % len(cQ)
        cQ[rear] = item

def deQueue(): # 원형 큐의 삭제 연산
    global front
    if isEmpty():
        print("Queue_Empty")
    else:
        front = (front + 1) % len(cQ)
        return cQ[front]

if __name__ == "__main__":
    cQ_SIZE = 3
    cQ = [0] * cQ_SIZE

    front = rear = 0 # front와 rear를 0으로 초기화

    enQueue('A')
    enQueue('B')
    enQueue('C')
    print(deQueue())
    print(deQueue())
    print(deQueue())
```

> - 문제 발생
>   - 원형 큐 공간이 `n`개 이면 최대 `n-1`개 원소를 넣을 수 있으므로 아래와 같이 처음에 `Queue_Full` 과 같은 **오버플로우** 상태가 발생한다.
>   - 또한 마지막에 `Queue_Empty`와 같은 **언더플로우** 상태도 출력된다.
>
> - 해결 방법
>   - 이를 해결하기 위해서는 `enQueue('A')`, `enQueue('B')` 만 입력하면 된다.
>   - 또는 `cQ_SIZE`를 4로 수정하면 해결할 수 있다.

```
Queue_Full
A
B
Queue_Empty
None
```

<br>

#### (5) 연결 큐(단순 연결 리스트를 이용한 큐)

<img src="https://user-images.githubusercontent.com/52685250/63822037-0189f900-c98a-11e9-8da2-1d036955cc92.JPG" width=700px>

<img src="https://user-images.githubusercontent.com/52685250/63822038-0189f900-c98a-11e9-9471-d1f60afef7ca.JPG" width=700px>
<img src="https://user-images.githubusercontent.com/52685250/63822039-0189f900-c98a-11e9-8547-9344e4464eb5.JPG" width=700px>

- 기본 단위가 Node이므로 새로운 데이터 삽입하려면 무조건 rear 하나를 증가하는 개념이 아니라 Node 할당(메모리 할당)을 받는다.
- 연결 큐는 메모리 절약 효과를 상당히 누릴 수 있다!
  - 연결 큐는 일반 리스트와 달리 입력 데이터의 개수를 모두 선언할 필요 없다.
  - 필요할 때마다 노드를 생성하여 할당받는다.

<br>

#### (6) 우선순위 큐(Priority Queue)

- 우선순위는 FIFO 순서가 아니라 우선순위가 높은 순서대로 먼저 나가게 된다.
- 우선순위 큐 연산
  - 삽입 : `enQueue` (삽입된 원소를 우선순위에 맞는 위치에 삽입)
  - 삭제 : `deQueue` (우선순위가 가장 높은, 가장 앞에 있는 원소를 삭제)

<br>

#### (7) 큐의 활용 - `버퍼(Buffer)`

- 물리적인 장치의 처리 속도 차이에서 발생하는 대기 시간을 극복하기 위한 방법
- 버퍼링 : 버퍼를 활용하는 방식 또는 버퍼를 채우는 동작을 의미한다.

- 일반적으로 입출력 및 네트워크와 관련된 기능에서 이용된다.
- 순서대로 입력 - 출력 - 전달되어야 하므로 FIFO 방식읠 자료구조인 큐가 활용된다.

<br>

### 11.2 BFS(Breadth First Search)

#### (1) BFS 개요

- 탐색 시작점의 인접한 정점들을 먼저 모두 차례로 방문한 후에, 방문했던 정점을 시작점으로 하여 다시 인접한 정점들을 차례로 방문하는 방식
- 인접한 정점들에 대해 탐색을 한 후, 차례로 다시 너비우선탐색을 진행해야 하므로, 선입선출 형태의 자료구조인 큐를 활용함

<br>

#### (2) BFS 탐색 방법

- 다음과 같은 예제 그래프를 아래와 같은 순서(① => ⑨)로 탐색함

<img src="https://user-images.githubusercontent.com/52685250/63823405-b8887380-c98e-11e9-8e54-7f77b1d4f058.JPG" width=700px>

> BFS vs DFS

<a href="https://www.freelancinggig.com/blog/2019/02/06/what-is-the-difference-between-bfs-and-dfs-algorithms/">![BFS-DFS](https://user-images.githubusercontent.com/52685250/63823611-6ac03b00-c98f-11e9-81bd-29d1517772b1.png)</a>

<br>

------

<br>

## 12. 8월29일(12일차)

### 12.1 [예제] 미로의 거리

- 무방향 그래프의 연결 정보를 `인접 행렬`, `인접 리스트`로 표현하기 <a href="https://sarah950716.tistory.com/12">(참고 사이트)</a>
  - 메모리 관리 측면에서는 `인접 행렬`보다 `인접 리스트`가 훨씬 낫지만, 현재 우리가 푸는 문제에서는 `인접  행렬`로 풀어도 무방하다.

- <font color="red">`visited` 리스트를 **<u>방문 유무 체크</u>**와 **<u>이동 거리를 저장</u>**하는 용도로 동시에 사용하자</font>

```python
def find():
    dRow = [0, 1, 0, -1]
    dCol = [1, 0, -1, 0]
    visited = [[0 for x in range(N)] for i in range(N)]
    s = []
    s.append([sRow, sCol]) # 리스트로 큐 표현
    visited[sRow][sCol] = 1 # 방문 표시

    while (len(s) != 0):
        n = s.pop(0) # 갈수있는 칸 좌표를 꺼내
        for i in range(4): # 주변 좌표 계산
            nRow = n[0] + dRow[i]
            nCol = n[1] + dCol[i]
            if nRow >= 0 and nRow < N and nCol >= 0 and nCol < N: # 미로 내부
                if maze[nRow][nCol] == 3: # 출구인 경우 지나온 칸 반환
                    return visited[n[0]][n[1]] - 1 # 출발지는 칸 수에서 제외
                elif maze[nRow][nCol] == 0 and visited[nRow][nCol] == 0 : # 갈 수 있는 곳 저장
                    s.append([nRow, nCol])
                    visited[nRow][nCol] = visited[n[0]][n[1]] + 1
    return 0    # 출구에 가지 못하고 모든 칸 방문

T = int(input())

for tc in range(1, T + 1):
    N = int(input())
    maze = [[int(x) for x in input()] for _ in range(N)]
    for i in range(N):
        if 2 in maze[i]:
            sRow = i
            sCol = maze[i].index(2)
    print('#{} {}'.format(tc, find()))
```

<br>

### 12.2 [예제] Connect

```python
def find(adj, n):
    v = [0] * 101
    q = [n]
    v[n] = 1
    while (len(q) != 0):
        n = q.pop(0)
        for i in range(1, 101):
            if(adj[n][i] == 1 and v[i] == 0):
                q.append(i)
                v[i] = v[n] + 1 # 레벨 증가
    maxIdx = 1
    for i in range(2, 101):
        if (v[maxIdx] <= v[i]): # 가장 레벨이 큰 인덱스 찾기
            maxIdx = i
    return maxIdx


for tc in range(1, 11):
    N, S = map(int, input().split())
    a = [[0]*101 for i in range(102)]
    lst = list(map(int, input().split()))

    for i in range(N//2):
        a[lst[i*2]][lst[i*2+1]] = 1 # 인접 행렬 작성
    print('#{} {}'.format(tc, find(a, S)))
```

<br>

------

<br>

## 13. 9월02일(13일차) - `List`

### 13.1 리스트(List)

#### (1) 순차 리스트의 문제점

- 동적 배열로 작성된 순차 리스트는 자료의 삽입과 삭제 연산시 원소의 이동 작업이 필요하다.
- 원소의 개수가 많고 삽입, 삭제 연산이 빈번하게 일어날수록 작업에 소요되는 시간이 크게 증가한다.
- 또한 배열의 크기가 정해져 있는 경우, 실제로 사용될 메모리보다 크게 할당하여 메모리의 낭비를 초래할 수 있고, 반대로 할당된 메모리보다 많은 자료를 사용하여 새롭게 배열을 만들어 작업을 해야 하는 경우가 발생할 수도 있다.

<br>

#### (2) 연결 리스트(Linked List)

- 개별적으로 위치하고 있는 원소의 주소를 연결하여 하나의 전체적인 자료구조를 이룬다.
- **링크를 통해 원소에 접근**하므로, 순차 리스트에서처럼 <u>물리적인 순서를 맞추기 위한 작업이 필요하지 않다.</u>
- `동적 메모리 할당` 기법을 활용하기 때문에 <u>메모리의 효율적인 사용</u>이 가능하다.

<img src="https://user-images.githubusercontent.com/52685250/64085538-5b196b80-cd6e-11e9-9d20-6890c5a962c1.JPG" width=700px height=120px>

- 연결 리스트의 기본 구조
  - `Head` : 리스트의 **<u>처음 노드</u>**를 가리키는 레퍼런스
  - `Data` : **<u>원소의 값</u>**을 저장
  - `Link` : **<u>다음 노드의 주소</u>**를 저장
- 최종적으로 `NULL`을 가리키는 노드가 리스트의 가장 마지막 노드이다.

<br>

#### (3) 단순 연결 리스트

##### ① 삽입 연산

```python
class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def addtoFirst(data): # 첫 노드에 데이터 삽입
    global Head
    Head = Node(data, Head) # 새로운 노드 생성


data = [1, 2, 3, 4]
Head = None

for i in range(len(data)):
    addtoFirst(data[i])

while Head.link != None:
    print(Head.data, end='->')
    Head = Head.link
print(Head.data)
```

```
4->3->2->1
```

```python
class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def addtoFirst(data): # 첫 노드에 데이터 삽입
    global Head
    Head = Node(data, Head) # 새로운 노드 생성


def add(pre, data): # pre 다음에 데이터 삽입
    if pre == None:
        print('error')
    else:
        pre.link = Node(data, pre.link)


data = [1, 2, 3, 4]
Head = None

for i in range(len(data)):
    addtoFirst(data[i])

add(Head, 8) # Head가 가리키는 Node 다음에 8 삽입

while Head.link != None:
    print(Head.data, end='->')
    Head = Head.link
print(Head.data)
```

```
4->8->3->2->1
```

```python
class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def addtoLast(data): # 마지막에 데이터 삽입
    global Head
    if Head == None: # 빈 리스트이면
        Head = Node(data, None)
    else:
        p = Head
        while p.link != None: # 마지막 노드 찾을 때까지
            p = p.link
        p.link = Node(data, None)

data = [1, 2, 3, 4]
Head = None

for i in range(len(data)):
    addtoLast(data[i])

while Head.link != None:
    print(Head.data, end='->')
    Head = Head.link
print(Head.data)
```

```python
1->2->3->4
```

##### ② 삭제 연산

<img src="https://user-images.githubusercontent.com/52685250/64086960-e6e2c600-cd75-11e9-8ded-50fa7d727ed5.JPG" width=680px height=380px>

```python
class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def addtoFirst(data): # 첫 노드에 데이터 삽입
    global Head
    Head = Node(data, Head) # 새로운 노드 생성

    
def delete(pre): # pre 다음 노드 삭제
    if pre == None or pre.link == None:
        print('error')
    else:
        pre.link = pre.link.link


data = [1, 2, 3, 4]
Head = None

for i in range(len(data)):
    addtoFirst(data[i])

delete(Head)

while Head.link != None:
    print(Head.data, end='->')
    Head = Head.link
print(Head.data)
```

```
4->2->1
```

<br>

#### (4) 이중 연결 리스트

- 양쪽 방향으로 순회할 수 있도록 노드를 연결한 리스트
- 두 개의 링크 필드와 한 개의 데이터 필드로 구성

<img src="https://user-images.githubusercontent.com/52685250/64087330-8e142d00-cd77-11e9-933b-a50a2236eba1.JPG" width=700px height=75px>

<br>

### 13.2 삽입 정렬(Insertion Sort)

<a href="https://wonjayk.tistory.com/218"><img src="https://user-images.githubusercontent.com/52685250/64088343-efd69600-cd7b-11e9-9af4-9368abba118a.png" width=500px height=400px></a>

- 정렬되지 않은 부분집합 U의 원소를 하나씩 꺼내어 이미 정렬되어있는 부분집합 S의 마지막 원소부터 비교하면서 위치를 찾아 삽입한다.
- 삽입 정렬을 반복하면서 부분집합 S의 원소는 하나씩 늘리고 부분집합 U의 원소는 하나씩 감소하게 된다.
- 부분집합 U가 공집합이 되면 삽입정렬이 완성된다.

```python
def insertion_sort(a):
    for i in range(1, len(a)):
        for j in range(i, 0, -1):
            if a[j - 1] > a[j]:
                a[j], a[j - 1] = a[j - 1], a[j]

a = [50, 80, 70, 20, 90]

print('정렬 전: ', end='')
print(a)
insertion_sort(a)

print('정렬 후: ', end='')
print(a)
```

```
정렬 전: [50, 80, 70, 20, 90]
정렬 후: [20, 50, 70, 80, 90]
```

<br>

### 13.3 병합 정렬(Merge Sort)

- 여러 개의 정렬된 자료의 집합을 병합하여 한 개의 정렬된 집합으로 만드는 방식
- 시간 복잡도 : `O(n logn)`
- 연결리스트의 경우 병합 정렬이 가장 효율적인 방식

![01](https://user-images.githubusercontent.com/52685250/64090581-cd964580-cd86-11e9-9c3b-f0c2372a667f.JPG)
![02](https://user-images.githubusercontent.com/52685250/64090582-ce2edc00-cd86-11e9-80f2-547cbb432302.JPG)

```python
def merge_sort(m):
    if len(m) <= 1:
        return m

    mid = len(m) // 2
    left = m[:mid]
    right = m[mid:]

    left = merge_sort(left)
    right = merge_sort(right)

    return merge(left, right)


def merge(left, right):
    result = []
    while len(left) > 0 and len(right) > 0:
        if left[0] <= right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))
    if len(left) > 0:
        result.extend(left)
    if len(right) > 0:
        result.extend(right)
    return result

numbers = [69, 10, 30, 2, 16, 8, 31, 22]

print('정렬 전: {}'.format(numbers))
print('정렬 후: {}'.format(merge_sort(numbers)))
```

```
정렬 전: [69, 10, 30, 2, 16, 8, 31, 22]
정렬 후: [2, 8, 10, 16, 22, 30, 31, 69]
```

<br>

### 13.4 리스트를 이용한 스택

```python
# 리스트를 이용한 스택

class Node:
    def __init__(self, data, link):
        self.data = data
        self.link = link


def push(i):  # 원소 i를 스택 top(맨 앞) 위치에 push
    global top
    top = Node(i, top)  # 새로운 노드 생성


def pop():  # 스택의 top을 pop
    global top

    if top == None:  # 빈 리스트이면
        print('error')
    else:
        data = top.data
        top = top.link  # top이 가리키는 노드를 바꿈
        return data


top = None
push(3)
push(4)
push(5)
push(6)
pop()

while top.link != None:
    print(top.data, end='->')
    top = top.link
print(top.data)
```

```
5->4->3
```

---

:white_check_mark: **객체 지향 프로그래밍(Object-Oriented Programming)**

- 객체는 함수와 변수를 하나의 단위로 묶을 수 있는 방법이다.
- 객체(Object)는 속성(Attribute)과 동작(action)을 가지고 있다.
- 클래스로부터 객체를 생성하여야 한다.

- `__init__()` : 객체를 초기화하기 위해 클래스안에 작성하는 특별한 함수
  - 생성자(constructor)라고 하며 외부에서 전달되는 초기값들을 받을 수 있음
- `self` : 객체 자신을 의미하며 자기 자신을 참조하는 의미

---

<br>

### 13.5 우선순위 큐

#### (1) 배열을 이용한 우선순위 큐

- 구현
  - 원소를 삽입하는 과정에서 우선순위를 비교하여 적절한 위치에 삽입하는 구조
  - 가장 앞에 최고 우선순위의 원소가 위치하게 됨
- 문제점
  - 배열을 사용하므로, 삽입이나 삭제 연산이 일어날 때 원소의 재배치가 발생함
  - 이에 소요되는 시간이나 메모리 낭비가 큼

<br>

#### (2) 연결 리스트를 이용한 우선순위 큐

- 구현
  - 원소를 삽입하는 과정에서 리스트 내 노드의 원소들과 비교하여 적절한 노드를 삽입하는 구조
  - 리스트의 가장 앞쪽에 최고 우선순위가 위치하게 됨
- 배열 대비 장점
  - 삽입 / 삭제 연산 이후 원소의 재배치가 필요 없음
  - 메모리의 효율적인 사용이 가능함

---

:warning: **실제로는 힙(Heap)을 이용하여 우선순위 큐를 구현한다.**

- 최대 힙으로 정렬하면 결과는 내림차순 정렬
- 최소 힙으로 정렬하면 결과는 오름차순 정렬

---


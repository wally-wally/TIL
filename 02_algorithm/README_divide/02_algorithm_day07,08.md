# :notebook_with_decorative_cover: 02_algorithm - Day07, 08

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

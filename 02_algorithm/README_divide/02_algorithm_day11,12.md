# :notebook_with_decorative_cover: 02_algorithm - Day11, 12

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

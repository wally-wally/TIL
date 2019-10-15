# :notebook_with_decorative_cover: 02_algorithm - Day32, 33

<br>

## 25. 10월14일(32일차) - `Graph`

---

:heavy_check_mark: <b>이것만큼은 기본으로 알고 가자!</b>

- 그래프의 정점의 개수가 |V|개일 때 간선의 최대 개수는 `|V|(|V|-1)/2`개이다.(단, 무향 그래프일 때)
- 그래프는 선형 자료구조나 트리 자료구조(1 : N)와 달리 `N : N 관계`이다.

---

### 25.1 서로소 집합들(Disjoint-Sets)

#### (1) 서로소 집합

- `서로소 집합` : <u>서로 중복 포함된 원소가 없는 집합들</u>. 즉, 교집합이 없다는 의미
  - ex) 정점들의 집합을 관리

- 집합에 속한 하나의 특정 맴버를 통해 각 집합들을 구분하는데 이를 `대표자(representative)`라고 한다.
- 상호배타 집합을 표현하는 방법
  - 연결 리스트, 트리
- 상호배타 집합 연산(x, y : 원소를 의미함)
  - `Make-Set(x)` : 초기화 할 때 사용
  - `Find-Set(x)` : x가 속해있는 집합이 어떤 것인지 확인할 때 사용
  - `Union(x, y)` : x가 속해있는 집합과 y가 속해있는 집합을 합쳐 하나의 집합으로 만들 때 사용(합집합 연산) / 합친 후에는 둘 중 대표자를 하나 선정한다.

<br>

#### (2) 상호 배타 집합의 표현

##### ① 연결리스트

- <b>실제로는 연결리스트로 구현하지 않고 트리로 구현한다.</b>
- 같은 집합의 원소들은 하나의 연결리스트로 관리한다.
- 연결리스트의 맨 앞의 원소를 집합의 대표 원소로 삼는다.
- 각 원소는 집합의 대표원소를 가리키는 링크를 갖는다.

- 단점 : 트리에 비해 추가적인 실행시간이 필요하다.

<br>

##### ② 트리 (중요!)

- 하나의 집합(a disjoint set)을 하나의 트리로 표현한다.
- 자식 노드가 부모 노드를 가리키며 루트 노드가 대표자가 된다.

- 상호배타 집합을 표현한 트리의 배열을 이용한 저장된 모습

<img src="https://user-images.githubusercontent.com/52685250/66725665-3c2eee80-ee6f-11e9-980d-aac2cd355ff0.JPG" width="600px">

- 간단하게 구현하기

  - Make-Set(x) : 유일한 멤버 x를 포함하는 새로운 집합을 생성

  ```
  Make-Set(x)
  	p[x] ← x
  ```

  - Find-Set(x) : x를 포함하는 집합을 찾는 연산

  ```
  Find-Set(x)
  	IF x == p[x] : RETURN x
  	ELSE : RETURN Find-Set(p[x])
  ```

  - Union(x, y) : x와 y를 포함하는 두 집합을 통합

  ```
  Union(x, y)
  	p[Find-Set(y)] ← Find-Set(x)
  ```

- 문제점 발생

  - 노드의 수가 많을 때 처음에 Union하면 어쩔 수 없이 트리의 높이가 높아지게 된다.
  - 트리의 높이가 높아지면 편향 이진 트리와 같은 형태가 되어 루트 노드까지 찾아가는데 오래걸린다.
  - 즉, 자료구조를 효율적으로 개선해야 한다.

<br>

#### (3) 상호 배타 집합 연산(연산의 효율을 높인 방법)

##### ① Rank를 이용한 Union

- 각 노드는 자신을 루트로 하는 서브트리의 높이를 랭크Rank라는 이름으로 저장한다.
- 두 집합을 합칠 때 rank가 낮은 집합을 rank가 높은 집합에 붙인다.
- <b>전체 트리의 높이를 최대한 증가시키지 않기 위해 사용된다.</b>
- 랭크 값이 변하지 않는 경우

<img src="https://user-images.githubusercontent.com/52685250/66725892-cb88d180-ee70-11e9-9445-a06a81911fd1.JPG" width="650px">

- 랭크 값이 Union한 후 증가하는 경우
  - 전체 트리의 루트 노드의 랭크 값만 1 증가시켜주면 된다.

<img src="https://user-images.githubusercontent.com/52685250/66725893-cb88d180-ee70-11e9-8eff-4ceece101ee0.JPG" width="650px">

##### ② Path Compression

- Find-Set을 행하는 과정에서 만나는 모든 노드들이 직접 Root를 가리키도록 포인터를 바꾸어 준다.

<img src="https://user-images.githubusercontent.com/52685250/66725953-31755900-ee71-11e9-878e-439dcf5fd8a7.JPG" width="650px">

- 구현

  - Make-Set(x) : 유일한 멤버 x를 포함하는 새로운 집합을 생성

  ```
  Make-Set(x)
  	p[x] ← x
  	rank[x] ← 0
  ```

  - Find-Set(x) : x를 포함하는 집합을 찾는 연산

  ```
  Find-Set(x)
  	IF x != p[x]
  		p[x] ← Find-Set(p[x])
  	RETURN p[x]
  ```

  - Union(x, y) : x와 y를 포함하는 두 집합을 통합

  ```
  Union(x, y)
  	Link( Find-Set(x), Find-Set(y) )
  	
  Link(x, y) // 여기에 들어가는 x, y는 루트이다.
  	IF rank[x] > rank[y] // rank는 트리의 높이
  		p[y] ← x
  	ELSE
  		p[x] ← y
  		IF rank[x] == rank[y]
  			rank[y]++
  ```

<br>

### 25.2 최소신장트리(MST)

#### (1) 최소신장트리 기본개념

- 그래프에서 최소 비용 문제
  - <b>모든 정점을 연결하는 간선들의 가중치의 합이 최소가 되는 트리</b>
  - 두 정점 사이의 최소 비용의 경로 찾기
- 신장 트리
  - n개의 정점으로 이루어진 무향 그래프에서 n개의 정점과 n-1개의 간선으로 이루어진 트리
- `최소신장트리(Minimum Spanning Tree)`
  - 무향 가중치 그래프에서 신장 트리를 구성하는 `간선들의 가중치의 합이 최소`인 신장 트리

<br>

#### (2) Kruskal 알고리즘

- <b>간선을 하나씩 선택해서 MST를 찾는 알고리즘</b>
  - 최초, 모든 간선을 가중치에 따라 <b>`오름차순`</b>으로 정렬
  - 가중치가 가장 낮은 간선부터 선택하면서 트리를 증가시킴
    - 사이클이 존재하면 다음으로 가중치가 낮은 간선 선택
  - <b>`n - 1개의 간선`</b>이 선택될 때까지 트리 증가시키는 과정을 반복
- disjoint-sets을 구현할 줄 알면 Kruskal 알고리즘은 쉽다.

<img src="https://user-images.githubusercontent.com/52685250/66727313-4950db00-ee79-11e9-95d2-3689222b3257.JPG" width="650px">

<img src="https://user-images.githubusercontent.com/52685250/66727314-4950db00-ee79-11e9-93d8-80c3a3c8e181.JPG" width="650px">

<img src="https://user-images.githubusercontent.com/52685250/66727315-49e97180-ee79-11e9-88f2-6b496dbe0b19.JPG" width="650px">

> `input data`
>
> ```
> 7 11
> 0 1 32
> 0 2 31
> 0 5 60
> 0 6 51
> 1 2 21
> 2 4 46
> 2 6 25
> 3 4 34
> 3 5 18
> 4 5 40
> 4 6 51
> ```

> `code`
>
> ```python
> V, E = map(int, input().split())
> 
> Edge = []
> for _ in range(E):
>  Edge.append(tuple(map(int, input().split())))
> 
> Edge.sort(key=lambda x: x[2])
> # disjoint-set(cycle이 생기면 안되므로 cycle을 판단하기 위해 disjoint-set을 사용)
> p = [x for x in range(V)]
> def find_set(x):
>  if x != p[x]:
>      p[x] = find_set(p[x])
>  return p[x]
> 
> # V - 1 개의 간선을 선택
> MST = []
> cur = 0
> while len(MST) < V - 1:
>  u, v, w = Edge[cur]
>  a = find_set(u); b = find_set(v)
>  if a != b:
>      p[b] = a
>      MST.append((u, v, w))
>  cur += 1
> 
> for edge in MST:
>  print(edge)
> ```

<br>

#### (3) Prim 알고리즘

- 하나의 정점에서 연결된 간선들 중에서 하나씩 선택하면서 MST를 만들어 가는 방식
  - 임의 정점을 하나 선택해서 시작
  - 선택한 정점들과 인접하는 정점들 중의 최소 비용 간선이 존재하는 정점을 선택
  - 모든 정점을 선택될 때까지 위 과정들을 반복
- 서로소인 2개의 집합(2 disjoint-sets) 정보를 유지
  - 트리 정점들 - MST를 만들기 위해 선택된 정점들
  - 비트리 정점들 - 선택 되지 않은 정점들

<br>

### 25.3 최단 경로

#### (1) 최단 경로 알고리즘

- 최단 경로 : 간선의 가중치가 있는 그래프에서 두 정점 사이의 경로들 중 간선의 가중치의 합이 최소인 경로
- 하나의 시작 정점에서 끝 정점까지의 최단 경로
  - 다익스트라 알고리즘 : 음의 가중치를 허용하지 않음
  - 벨만-포드 알고리즘 : 음의 가중치 허용
- 모든 정점들에 대한 최단 경로
  - 플로이드-워샬 알고리즘

<br>

#### (2) 간선 완화(Edge Relaxation)(반드시 기본으로 알고 가자!)

- 간선 완화 알고리즘

<img src="https://user-images.githubusercontent.com/52685250/66732002-1d435300-ee95-11e9-9987-c9028407a6b8.png" width="650px">
<img src="https://user-images.githubusercontent.com/52685250/66732003-1d435300-ee95-11e9-820b-4b8abe466e08.png" width="650px">

> `BFS로 최단 경로 구하기` <a href=" http://www.problems.kr/03graph/shortest_path/brute_force.html " target="_blank">(상세 알고리즘 동작 과정)</a>
>
> ```python
> from collections import deque
> 
> V, E = map(int, input().split())
> G = [[] for _ in range(V + 1)] # 1 ~ V
> for _ in range(E):
>  u, v, w = map(int, input().split())
>  G[u].append((v, w))
>  G[v].append((u, w))
> 
> # [아주 중요!] D[] 배열 초기값을 매우 큰 값으로 설정
> # (매우 큰 값 = 출발점에서 특정 정점으로 어떤 경로도 발견하지 못함을 의미)
> D = [0xffffff] * (V + 1)
> 
> def BFS(s):
>  Q = deque()
>  D[s] = 0
>  Q.append(s)
>  while Q:
>      u = Q.popleft()
>      for v, w in G[u]:
>          if D[v] > D[u] + w: # 바뀌면 Q에 바로 넣는다.
>              D[v] = D[u] + w
>              Q.append(v)
> 
> BFS(1)
> 
> print(D[1:])
> ```

<br>

#### (3) Dijkstra 알고리즘

- 시작 정점에서 거리가 최소인 정점을 선택해 나가면서 최단 경로를 구하는 방식
- 시작정점(s) 에서 끝정점(t) 까지의 최단 경로에 정점 x가 존재한다. 이때, 최단 경로는 s에서 x까지의 최단 경로와 x에서 t까지의 최단 경로로 구성된다.
- 탐욕 기법을 사용한 알고리즘으로 MST의 PRIM 알고리즘과 유사하다.

> `Dijkstra 알고리즘 최단 경로` <a href=" http://www.problems.kr/03graph/shortest_path/dijkstra.html " target="_blank">(상세 알고리즘 동작 과정)</a>
>
> ```python
> from collections import deque
> 
> V, E = map(int, input().split())
> G = [[] for _ in range(V + 1)] # 1 ~ V
> for _ in range(E):
>  u, v, w = map(int, input().split())
>  G[u].append((v, w))
>  G[v].append((u, w))
> 
> D = [0xffffff] * (V + 1)
> 
> def dijkstra(s):
>  D[s] = 0
>  visit = [False] * (V + 1) # 최단 경로를 찾은 정점들과 아닌 정점들 구분
>  cnt = V
>  while cnt:
>      u, MIN = 0, 0xffffff
>      for i in range(1, V + 1): # D 값이 최소인 정점을 찾는다.
>          if not visit[i] and MIN > D[i]:
>              u, MIN = i, D[i]
>      visit[u] = True
>      for v, w in G[u]:
>          if D[v] > D[u] + w: 
>              D[v] = D[u] + w
>      cnt -= 1
> 
> dijkstra(1)
> 
> print(D[1 : V + 1])
> ```

<br>

## 26. 10월15일(33일차)

### 26.1 [문제] 상원이의 생일파티

```python
def check():
    result, check_var = 0, 0
    queue = [1]
    visit[1] = True
    while queue:
        temp_list = []
        if check_var == 2: return result
        for pop_elem in queue:
            for tmp in G[pop_elem]:
                if not visit[tmp]:
                    visit[tmp] = True
                    result += 1
                    temp_list.append(tmp)
        if not len(temp_list):
            return result
        queue = [temp for temp in temp_list]
        check_var += 1
            
for tc in range(int(input())):
    N, M = map(int, input().split())
    visit = [False] * (N + 1)
    G = [[] for _ in range(N + 1)]
    for _ in range(M):
        a, b = list(map(int, input().split()))
        G[a].append(b)
        G[b].append(a)
    if not len(G[1]):
        print('#{} 0'.format(tc + 1))
        continue
    print('#{} {}'.format(tc + 1, check()))
```

<br>

### 26.2 [문제] 연산

```python
from collections import deque

def calc():
    operation = [+1, -1, -10]
    result = 0
    queue = deque()
    queue.append((N, 1))
    chk_list[N] = 1
    while queue:
        result += 1
        pop_elem, calc_cnt = queue.popleft()
        for idx in range(4):
            check_val = pop_elem + operation[idx] if idx != 3 else pop_elem * 2
            if check_val == M: return calc_cnt
            # 아래 조건식에서 반드시 해당값이 1 이상 1000000 이하인지 먼저 확인하자!!!
            if 1 <= check_val <= 1000000 and not chk_list[check_val]:
                chk_list[check_val] = 1
                queue.append((check_val, calc_cnt + 1))

for tc in range(int(input())):
    N, M = map(int, input().split())
    chk_list = [0] * 1000001
    print('#{} {}'.format(tc + 1, calc()))
```

<br>

### 26.3 [문제] 최소 비용

```python
from collections import deque

def check_cost():
    queue = deque()
    queue.append((0, 0))
    check_arr[0][0] = 0
    while queue:
        x, y = queue.popleft()
        for direct in [(-1, 0), (0, +1), (+1, 0), (0, -1)]:
            new_x, new_y = x + direct[0], y + direct[1]
            if 0 <= new_x < N and 0 <= new_y < N:
                w = arr[new_x][new_y] - arr[x][y] + 1 if arr[new_x][new_y] > arr[x][y] else 1
                # 간선 완화 부분
                if check_arr[new_x][new_y] > check_arr[x][y] + w:
                    check_arr[new_x][new_y] = check_arr[x][y] + w
                    queue.append((new_x, new_y))
    return check_arr[N - 1][N - 1]

for tc in range(int(input())):
    N = int(input())
    check_arr = [[0xffffff] * N for _ in range(N)]
    arr = [list(map(int, input().split())) for _ in range(N)]
    print('#{} {}'.format(tc + 1, check_cost()))
```

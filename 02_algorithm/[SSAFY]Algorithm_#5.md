# [SSAFY]Algorithm_#5(written by wally-wally)

------

**※참고사항※**

- `[SSAFY]Algorithm_#5`는 정규과정 `Algorithm`을 진행한 내용들을 작성함.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

## 23. 10월10일(30일차) - `Tree`

### 23.1 트리의 정의 및 용어

---

:checkered_flag: <b>트리의 대표 특징</b>

- `싸이클이 없는 무향 연결 그래프`
- `비선형 구조`

---

<img src="https://user-images.githubusercontent.com/52685250/66529554-d543c980-eb3e-11e9-9b40-20eb93b7c497.JPG" alt="트리" width="600px">

- 한 개 이상의 노드로 이루어진 유한 집합
  - 루트(root) : 노드 중 부모가 없는 노드
    - 위 트리에서 루트 노드는  `A`이다.
  - 루트의 서브 트리(subtree) : 나머지 노드들은 n(>=0)개의 분리 집합 T1, ..., TN으로 분리될 수 있으며 이들은 각각의 하나의 트리가 됨(재귀적 정의)
  - 리프 노드(leaf node)(단말 노드) : 맨 끝에 있는 노드들
    - 위 트리에서 단말 노드는 `E`, `K`, `G`, `H`, `I`, `J` 가 해당된다.

- 용어 : `노드`, `간선`, `루트 노드`, `형제 노드`, `조상 노드`, `서브 트리`, `자손 노드`, `차수(degree)`, <b>`트리의 높이`</b>
  - <b>`트리의 높이`</b> : 트리에 있는 노드의 높이 중에서 가장 큰 값. 최대 레벨
  - 트리에서 <b>`높이`</b>의 개념이 중요하다!
  - 이를 이용하여 시간 복잡도도 계산할 수 있다.

<br>

### 23.2 이진 트리(Binary Tree)

#### (1) 기본 개념

- 모든 노드들의 최대 2개의 서브 트리를 갖는 특별한 형태의 트리

- 레벨 i에서 노드의 최대 개수는 2<sup>i</sup>개
- 높이가 h인 이진 트리가 가질 수 있는 노드의 최소 개수는 h+1개가 되며, 최대 개수는 2<sup>h+1</sup>-1개가 된다.

<br>

#### (2) 이진 트리의 종류

- `포화 이진 트리(Full Binary Tree)`

  <img src="https://user-images.githubusercontent.com/52685250/66530067-22c13600-eb41-11e9-8aaa-9e975ca94ede.JPG" alt="포화이진트리" width="600px">

  - 모든 레벨에 노드가 포화상태로 채워져 있는 이진 트리
  - 높이가 h일 때 최대의 노드 개수인 2<sup>h+1</sup>-1 의 노드를 가진 이진 트리
  - 루트를 1번으로 하여 2<sup>h+1</sup>-1까지 정해진 위치에 대한 노드 번호를 가진다. 이렇게 하면 위치를 쉽게 찾을 수 있다.

- `완전 이진 트리(Complete Binary Tree)`

  <img src="https://user-images.githubusercontent.com/52685250/66530113-57cd8880-eb41-11e9-8d62-7ea0a6e84316.JPG" alt="완전이진트리" width="600px">

  - 높이가 h이고 노드 수가 n개일 때, `포화 이진 트리의 노드 번호 1번부터 n번까지 빈 자리가 없는` 이진 트리
  - 위 트리는 노드가 10개인 완전 이진 트리임
  - 앞으로 알고리즘을 접하면서 `완전 이진 트리`를 가장 많이 쓰게 된다.

- `편향 이진 트리(Skewed Binary Tree)`

  <img src="https://user-images.githubusercontent.com/52685250/66530185-b3981180-eb41-11e9-852c-45edbd1af443.JPG" alt="편향이진트리" width="600px">

  - 높이 h에 대한 최소 개수의 노드를 가지면서 한쪽 방향의 자식 노드만을 가진 이진 트리
  - 이진 트리 중에서 가장 피해야 할 제일 안 좋은 이진 트리

<br>

#### (3) 순회(Traversal)

- 트리의 각 노드를 중복되지 않게 전부 방문(visit) 하는 것
- 트리는 비선형 구조이므로 선형 구조에서와 같이 선후 연결 관계를 알 수 없다.

##### ① 전위 순회(preorder traversal)

<img src="https://user-images.githubusercontent.com/52685250/66530536-1d64eb00-eb43-11e9-876c-570ea6371e02.JPG" alt="전위순회" width="650px">

##### ② 중위 순회(inorder traversal)

<img src="https://user-images.githubusercontent.com/52685250/66530583-5604c480-eb43-11e9-80e5-361652ee3a8d.JPG" alt="중위순회" width="650px">

##### ③ 전위 순회(postorder traversal)

<img src="https://user-images.githubusercontent.com/52685250/66530619-75035680-eb43-11e9-8fc1-0eb6e4d4d82a.JPG" alt="후위순회" width="650px">

<br>

### 23.3 트리의 표현

#### (1) 배열을 이용한 이진 트리의 표현

- 이진 트리에 각 노드 번호를 부여
  - 루트의 번호를 1로 부여
  - 레벨 n에 있는 노드에 대하여 왼쪽부터 오른쪽으로 2<sup>n</sup> 부터 2<sup>n+1</sup> - 1까지 번호를 차례대로 부여

<img src="https://user-images.githubusercontent.com/52685250/66531778-f4932480-eb47-11e9-8568-2cbd1b358767.JPG" width="650px">

- 노드 번호의 성질
  - 노드 번호가 i인 노드의 부모 노드 번호 : i / 2
  - 노드 번호가 i인 노드의 왼쪽 자식 노드 번호 : 2*i
  - 노드 번호가 i인 노드의 오른쪽 자식 노드 번호 : 2*i+1
  - 레벨 n의 노드 번호 시작 번호 : 2<sup>n</sup>
  - 노드 번호를 배열의 인덱스로 사용한다!

- 배열을 이용한 이진 트리의 표현의 단점
  - 편향 이진 트리의 경우 사용하지 않는 배열 원소에 대한 메모리 공간 낭비 발생
  - 트리의 중간에 새로운 노드를 삽입하거나 기존의 노드를 삭제할 경우 배열의 크기 변경이 어려워 비효율적이다.

<br>

#### (2) 연결리스트를 이용한 이진 트리의 표현

<img src="https://user-images.githubusercontent.com/52685250/66536498-1c8a8400-eb58-11e9-9b71-5b1ddce02397.JPG" alt="연결리스트로 이진트리 표현" width="700px">

- 배열을 이용한 이진 트리의 표현의 단점을 해결
- 이진 트리의 모든 노드는 최대 2개의 자식 노드를 가지므로 일정한 구조의 단순 연결 리스트 노드를 사용하여 구현

<br>

> <b>[연습문제]간선의 수가 `V`이고 연결 정보가 `arr`일 때, 전위 / 중위 / 후위 순회 결과를 출력</b>
>
> `input_01.txt`
>
> ```
> 13
> 1 2 1 3 2 4 3 5 3 6 4 7 5 8 5 9 6 10 6 11 7 12 11 13
> ```
>
> `practice_01.py`
>
> ```python
> import sys
> sys.stdin = open('input_01.txt', 'r')
> 
> def preorder(n): # 전위 순회
>     if n != 0:
>         print(n, end=' ')
>         preorder(child[n][0])
>         preorder(child[n][1])
> 
> def inorder(n): # 중위 순회
>     if n != 0:
>         inorder(child[n][0])
>         print(n, end=' ')
>         inorder(child[n][1])
> 
> def postorder(n): # 후위 순회
>     if n != 0:
>         postorder(child[n][0])
>         postorder(child[n][1])
>         print(n, end=' ')
> 
> V = int(input()) # 간선의 수
> arr = list(map(int, input().split()))
> child = [[0, 0] for i in range(V + 1)]
> 
> for i in range(V - 1):
>     if child[arr[i * 2]][0] == 0: # 부모 노드 i*2에 자식 노드가 없는 경우
>         child[arr[i * 2]][0] = arr[i * 2 + 1]
>     else: # 이미 자식이 한 개 있는 경우
>         child[arr[i * 2]][1] = arr[i * 2 + 1]
> 
> print('전위 순회 결과: ', end=' ')
> preorder(1)
> print()
> 
> print('중위 순회 결과: ', end=' ')
> inorder(1)
> print()
> 
> print('후위 순회 결과: ', end=' ')
> postorder(1)
> ```
>
> `result`
>
> ```
> 전위 순회 결과:  1 2 4 7 12 3 5 8 9 6 10 11 13
> 중위 순회 결과:  12 7 4 2 1 8 5 9 3 10 6 13 11
> 후위 순회 결과:  12 7 4 2 8 9 5 10 13 11 6 3 1
> ```

<br>

### 23.4 이진 탐색 트리

#### (1) 기본 개념

- 탐색작업을 효율적으로 하기 위한 자료구조
- 모든 원소는 `서로 다른 유일한 키`를 갖는다. (`중복된 값 X`)
- key(왼쪽 서브 트리) < key(루트 노드) < key(오른쪽 서브 트리)
- 왼쪽 서브 트리와 오른쪽 서브 트리도 이진 탐색 드리다.
- 중위 순회하면 오름차순으로 정렬된 값을 얻을 수 있다.

<br>

#### (2) 탐색 연산

<img src="https://user-images.githubusercontent.com/52685250/66536880-7b043200-eb59-11e9-96ab-4e3a1786a172.JPG" alt="탐색연산" width="600px">

- 루트에서 탐색 시작
- `탐색할 키 값 x`를 `루트 노드의 키 값 k`와 비교
  - x == k : 탐색 성공
  - x < k : 루트 노드의 왼쪽 서브 트리에 대해서 탐색연산 수행
  - x > k : 루트 노드의 오른쪽 서브 트리에 대해서 탐색연산 수행
- 서브 트리에 대해서 순환적(재귀적)으로 탐색 연산을 반복하고 탐색 수행할 서브 트리가 없으면 탐색 실패

<br>

#### (3) 삽입 연산

<img src="https://user-images.githubusercontent.com/52685250/66537021-ef3ed580-eb59-11e9-8218-034d3caf5ce8.JPG" alt="삽입연산" width="750px" height="280px">

- 먼저 탐색 연산을 수행
  - 삽입할 원소와 같은 원소가 트리에 있으면 삽입할 수 없으므로, `같은 원소에 트리에 있는지 탐색하여 확인`한다.
  - 탐색에서 `탐색 실패가 결정되는 위치`가 삽입 위치가 된다.
- 탐색 실패한 위치에 원소를 삽입한다.

<br>

#### (4) 삭제 연산 <a href="https://robodream.tistory.com/192" target="_blank">(이미지 출처)</a>

##### ① 삭제할 노드가 단말 노드인 경우(차수 = 0)

<img src="https://user-images.githubusercontent.com/52685250/66540788-f967d080-eb67-11e9-999e-3d7dd65bd2d0.JPG" width="600px">

- 단말 노드는 자식 노드를 갖지 않으므로 단말 노드를 삭제하고 부모 노드를 찾아서 링크 필드를 NULL로 설정하여 연결을 끊어줌

##### ② 삭제할 노드가 하나의 자식 노드(서브 트리)를 가진 경우(차수 = 1)

<img src="https://user-images.githubusercontent.com/52685250/66540789-f967d080-eb67-11e9-81aa-51dae95c93cb.JPG" width="600px">

- 삭제되는 노드가 왼쪽이나 오른쪽 서브 트리 중 하나만 갖는 경우 그 노드는 삭제하고 서브 트리를 부모 노드를 향하도록 함

##### ③ 삭제할 노드가 두 개의 자식 노드(서브 트리)를 가진 경우(차수 = 2)

<img src="https://user-images.githubusercontent.com/52685250/66540790-f967d080-eb67-11e9-9b7c-b005741e123a.JPG" width="600px">

- 노드를 삭제하면 자식 노드들은 트리에서 연결이 끊어지게 됨
- 노드가 삭제된 후에도 이진 탐색 드리가 유지되어야 하므로 트리를 재구성해야 함
- 자손 노드 중에 삭제한 노드의 자리에 들어올 노드를 선택해야 함
- 이때 삭제 노드와 가장 비슷한 값을 가진 노드를 삭제 노드 위치로 가져와야 함
- 삭제 노드와 가장 비슷한 값을 가진 노드는 왼쪽 서브 트리에서 가장 큰 키 값을 가진 노드이거나 오른쪽 서브 트리에서 가장 작은 키 값을 가진 노드
  - 왼쪽 서브 트리에서 가장 큰 키 값을 갖는 노드 선택
  - 오른쪽 서브 트리에서 가장 작은 키 값을 갖는 노드 선택

<br>

#### (5) 이진 탐색 트리의 성능

- 연산의 시간 : 트리의 높이만큼 걸린다. => `O(h)` (h : BST의 깊이(height))
  - 그만큼 트리에서 `트리의 높이`가 매우 중요하다!
- 평균의 경우
  - 이진 트리가 균형적으로 생성되어 있는 경우
  - `O(logn)`
- 최악의 경우
  - 한쪽으로 치우친 편향 이진 트리의 경우
  - `O(n)`
  - 순차탐색과 시간복잡도가 같다.

<br>

### 23.5 힙(heap)

#### (1) 기본 개념

- <font color="red"><b><u>완전 이진 트리</u></b></font>에 있는 노드 중에서 키 값이 가장 큰 노드나 키 값이 가장 작은 노드를 찾기 위해서 만든 자료구조
- 최대 힙(max heap)
  - 키 값이 가장 큰 노드를 찾기 위한 <b>완전 이진 트리</b>
  - 부모 노드의 키 값 > 자식 노드의 키 값
  - 루트 노드 : 키 값이 가장 큰 노드
- 최소 힙(min heap)
  - 키 값이 가장 작은 노드를 찾기 위한 <b>완전 이진 트리</b>
  - 부모 노드의 키 값 < 자식 노드의 키 값
  - 루트 노드 : 키 값이 가장 작은 노드

<br>

#### (2) 삽입 연산

<img src="https://user-images.githubusercontent.com/52685250/66541251-9d9e4700-eb69-11e9-84bf-d9f2ca390eee.JPG" width="700px">

<img src="https://user-images.githubusercontent.com/52685250/66541252-9d9e4700-eb69-11e9-8b88-91f61d352ef6.JPG" width="700px">

- `23삽입`과 같은 과정을 `힙 재구성`이라고 한다.

<br>

#### (3) 삭제 연산

- 힙에서는 루트 노드의 원소만을 삭제할 수 있다.
- 루트 노드의 원소를 삭제하여 반환한다.
- 힙의 종류에 따라 최대값 또는 최소값을 구할 수 있다.
  - 우선순위 큐와 비교

<img src="https://user-images.githubusercontent.com/52685250/66541428-3df46b80-eb6a-11e9-82ed-06e28a217644.JPG" width="700px">

<br>

#### (4) 활용

- 우선순위 큐를 구현하는 가장 효율적인 방법
  - 노드 하나의 추가 / 삭제가 시간 복잡도가 O(logN)이고 최대값 / 최소값을 O(1)에 구할 수 있다.
  - 완전 정렬보다 관리 비용이 적다.
- 배열을 통해 트리 형태를 쉽게 구현할 수 있다.
  - 부모나 자식 노드를 O(1)연산으로 쉽게 찾을 수 있다.
  - n 위치에 있는 노드의 자식은 2<sup>n</sup> 과 2<sup>n+1</sup> 위치한다.
  - 완전 이진 트리의 특성에 의해 추가 / 삭제 위치는 자료의 시작과 끝 인덱스로 쉽게 판단할 수 있다.
  - 루트 노드부터 1번으로 인덱스 번호 시작

<br>

#### (5) 힙 정렬

- 힙 정렬 과정
  - 힙에서 루트 노드의 키 값을 출력
  - 힙의 마지막 노드를 루트 노드로 가정하여 나머지 노드들로 새로운 힙을 만듬
  - 새로 만들어진 힙 트리의 루트 노드를 출력하고 앞에서 만든 힙의 마지막 노드를 루트 노드로 가정하여 새로운 힙을 만드는 과정을 반복

- 힙 정렬의 시간 복잡도
  - N개의 노드 삽입 연산(O(logN)) + N개의 노드 삭제 연산(O(logN))
  - 따라서, 전체 정렬은 `O(NlogN)`이다.
  - 힙 정렬은 수행 시간이 빠르다.
- 힙 정렬은 배열에 저장된 자료를 정렬하기에 유용하다.

<br>

## 24. 10월11일(31일차)

### 24.1 [문제] 이진 탐색

```python
def inorder(n):
    global idx
    if n <= N:
        inorder(n * 2)
        arr[n] = idx
        idx += 1
        inorder(n * 2 + 1)

for tc in range(int(input())):
    N = int(input())
    idx = 1
    arr = [0] * (N + 1)
    inorder(1)
    print('#{} {} {}'.format(tc + 1, arr[1], arr[N // 2]))
```

<br>

### 24.2 [문제] 이진 힙

```python
def heap_check(n):
    p, c = n // 2, n
    while True:
        if c <= 1 or arr[p] < arr[c]: break
        arr[p], arr[c] = arr[c], arr[p]
        c, p = p, c // 2

for tc in range(int(input())):
    N = int(input())
    input_data = list(map(int, input().split()))
    arr = [0] * (N + 1)
    for idx in range(N):
        arr[idx + 1] = input_data[idx]
        heap_check(idx + 1)
    result = 0
    while True:
        N = N // 2
        if N == 0: break
        result += arr[N]
    print('#{} {}'.format(tc + 1, result))
```

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
>     Edge.append(tuple(map(int, input().split())))
> 
> Edge.sort(key=lambda x: x[2])
> # disjoint-set(cycle이 생기면 안되므로 cycle을 판단하기 위해 disjoint-set을 사용)
> p = [x for x in range(V)]
> def find_set(x):
>     if x != p[x]:
>         p[x] = find_set(p[x])
>     return p[x]
> 
> # V - 1 개의 간선을 선택
> MST = []
> cur = 0
> while len(MST) < V - 1:
>     u, v, w = Edge[cur]
>     a = find_set(u); b = find_set(v)
>     if a != b:
>         p[b] = a
>         MST.append((u, v, w))
>     cur += 1
> 
> for edge in MST:
>     print(edge)
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
>     u, v, w = map(int, input().split())
>     G[u].append((v, w))
>     G[v].append((u, w))
> 
> # [아주 중요!] D[] 배열 초기값을 매우 큰 값으로 설정
> # (매우 큰 값 = 출발점에서 특정 정점으로 어떤 경로도 발견하지 못함을 의미)
> D = [0xffffff] * (V + 1)
> 
> def BFS(s):
>     Q = deque()
>     D[s] = 0
>     Q.append(s)
>     while Q:
>         u = Q.popleft()
>         for v, w in G[u]:
>             if D[v] > D[u] + w: # 바뀌면 Q에 바로 넣는다.
>                 D[v] = D[u] + w
>                 Q.append(v)
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
>     u, v, w = map(int, input().split())
>     G[u].append((v, w))
>     G[v].append((u, w))
> 
> D = [0xffffff] * (V + 1)
> 
> def dijkstra(s):
>     D[s] = 0
>     visit = [False] * (V + 1) # 최단 경로를 찾은 정점들과 아닌 정점들 구분
>     cnt = V
>     while cnt:
>         u, MIN = 0, 0xffffff
>         for i in range(1, V + 1): # D 값이 최소인 정점을 찾는다.
>             if not visit[i] and MIN > D[i]:
>                 u, MIN = i, D[i]
>         visit[u] = True
>         for v, w in G[u]:
>             if D[v] > D[u] + w: 
>                 D[v] = D[u] + w
>         cnt -= 1
> 
> dijkstra(1)
> 
> print(D[1 : V + 1])
> ```


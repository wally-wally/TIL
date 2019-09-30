# :notebook_with_decorative_cover: 02_algorithm - Day22, 23

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
>  if lo >= hi: return
>  i, j, pivot = lo, hi, arr[lo]
>  while i < j:
>      while i <= hi and pivot >= arr[i]: i += 1
>      # 피봇보다 작은 값들만 있으면 오른쪽으로 계속 가므로 오류발생할 수 있는 가능성을 i <= hi를 작성하여 예외 처리를 해준다.
>      while pivot < arr[j]: j -= 1
>      if i < j:
>          arr[i], arr[j] = arr[j], arr[i]
>  arr[lo], arr[j] = arr[j], arr[lo]
>  quickSort(lo, j - 1)
>  quickSort(j + 1, hi)
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
>  if lo >= hi: return
>  i = lo - 1
>  for j in range(lo, hi):
>      if arr[hi] >= arr[j]:
>          i += 1
>          arr[i], arr[j] = arr[j], arr[i]
>  i += 1
>  arr[hi], arr[i] = arr[i], arr[hi]
> 
>  quickSort(lo, i - 1)
>  quickSort(i + 1, hi)
> 
>  
> print(arr)
> quickSort(0, len(arr) - 1)
> print(arr)
> ```

------

:heavy_check_mark: <b>퀵 정렬 비교 : `Hoare-Partition` vs `Lomuto-Partition` </b>

<a href="http://xiaohuiliucuriosity.blogspot.com/2015/04/quicksort.html" target="_blank"><img src="https://user-images.githubusercontent.com/52685250/65400490-6efc3e80-ddfd-11e9-87b4-dcee0055f9f1.png" width=540px></a>

------

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

<br>

## 20. 9월24일(23일차)

### 20.1 [예제]이진 탐색

```python
def binary_search(lo, hi, num, direct):
    global result
    mid = (lo + hi) >> 1
    if lo > hi:
        return
    if num == list_A[mid]:
        result += 1
        return
    else:
        if num < list_A[mid]:
            if direct == 0 or direct == 2:
                direct = 1
                binary_search(lo, mid - 1, num, direct)
                return
            else:
                return
        elif num > list_A[mid]:
            if direct == 0 or direct == 1:
                direct = 2
                binary_search(mid + 1, hi, num, direct)
                return
            else:
                return

for test_case in range(int(input())):
    N, M = map(int, input().split())
    list_A = sorted(list(map(int, input().split())))  # 문제 좀 똑바로 읽자...
    list_B = list(map(int, input().split()))
    result = 0
    for m_number in list_B:
        direction = 0
        if m_number in list_A:
            binary_search(0, N - 1, m_number, direction)
    print('#{} {}'.format(test_case + 1, result))
```

<br>

### 20.2 [예제]전기버스2

```python
def battery_check(idx, remain_battery, charge_cnt):
    global result
    if result < charge_cnt or remain_battery < 0:
        return
    if result >= charge_cnt:
        if idx == N - 1:
            result = charge_cnt
            return
        else:
            battery_check(idx + 1, remain_battery - 1, charge_cnt)
            battery_check(idx + 1, charge_spot[idx] - 1, charge_cnt + 1)


for test_case in range(int(input())):
    data = list(map(int, input().split()))
    N, charge_spot = data[0], data[1:]
    result = 10000000
    charge_cnt = 0
    battery_check(1, charge_spot[0] - 1, charge_cnt)
    print('#{} {}'.format(test_case + 1, result))
```

<br>

### 20.3 [예제]최소 생산 비용

```python
def min_production_cost(chk_cnt, val):
    global result
    if val > result:
        return
    if chk_cnt == N:
        if val <= result:
            result = val
            return
    for i in range(N):
        if not visited[i]:
            visited[i] = True
            min_production_cost(chk_cnt + 1, val + arr[chk_cnt][i])
            visited[i] = False

for test_case in range(int(input())):
    N = int(input())
    arr = [list(map(int, input().split())) for _ in range(N)]
    check_cnt, result = 0, 99 * 15
    visited = [False] * N
    before_position, cost = 0, 0
    min_production_cost(check_cnt, cost)
    print('#{} {}'.format(test_case + 1, result))
```
# :notebook_with_decorative_cover: 02_algorithm - Day03, 04

<br>

## 3. 8월05일(03일차)

### 3.1 슬라이딩 윈도우(sliding window)

- 배열의 연속적인 구간(sub-array, 윈도우)을 왼쪽에서 오른쪽으로 움직이면서 문제를 해결하는 방법
- SUM = 첫 번째 구간(0 ~ M - 1)의 합을 구한다.
- 다음 구간 부터 `SUM = SUM - A + B` 

<a href="http://blog.naver.com/PostView.nhn?blogId=kks227&logNo=220795165570&redirect=Dlog&widgetTypeCall=true">![슬라이딩 윈도우](https://user-images.githubusercontent.com/52685250/62431858-66c14480-b766-11e9-8761-6547e52f90fa.png)</a>

- 첫 번째 구간 : I<sub>o</sub> 부터 h<sub>i</sub> 까지의 합을 구한다.
- 다음 구간부터 중복 구간인 L부터 h<sub>i</sub> 까지의 합을 제외하고 계산한다.

<br>

### 3.2 2차원 배열

#### (1) 2차원 배열의 선언

- 2차원 이상의 다차원 List는 차원에 따라 Index를 선언
- 세로길이(행의 개수), 가로길이(열의 개수)를 필요로 함
- **Index 범위를 벗어나지 않게 조심**해야 함! `arr = [[0, 1, 2, 3], [4, 5, 6, 7]]`

<br>

#### (2) 2차원 배열의 접근

- `행 우선 순회`, `열 우선 순회`, `지그재그 순회` => `이중 for문` 으로 작성!

- `전치 행렬`  : 왼쪽 위에서 오른쪽 아래로 내려오는 대각선을 기준으로 행과 열 체인지

  - ```python
    arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] # 3*3 행렬
    for i in range(3):
        for j in range(3):
            if i < j:
                arr[i][j], arr[j][i] = arr[j][i], arr[i][j]
    ```

- `델타를 이용한 2차원 배열` 탐색

  - 2차 배열의 한 좌표에서 4방향의 인접 배열 요소를 탐색하는 방법

  - ```python
    N = 10	# N X N
    dx = [-1, +1, 0, 0]	# 상 하 좌 우
    dy = [0, 0, -1, +1]
    
    for x in range(N):	# 모든 행에 대해서
        for y in range(N):	# 모든 열에 대해서
            # [x][y]
            # 4방향의 인접한 위치 좌표를 생성
            for i in range(4):
                tx, ty = x + dx[i], y + dy[i]
                # 경계 체크
                if tx < 0 or tx == N or ty < 0 or ty == N: continue
    ```

- `대각 배열`

  - ``` python
    arr = [[ 1,  2,  4,  7, 11],
           [ 3,  5,  8, 12, 15],
           [ 6,  9, 13, 16, 18],
           [10, 14, 17, 19, 20]]
    
    N, M = len(arr), len(arr[0])
    for diag in range(0, N + M - 1):    # diag: 사선의 수
                                        # x, y: 시작 좌표
        x = 0 if diag < M else (diag - M + 1)
        y = diag if diag < M else M - 1
    
        while x < N and y >= 0:
            print('%2d ' % arr[x][y], end='')
            x += 1
            y -= 1
        print()
    ```

<br>

### 3.3 부분집합(Subset)

#### (1) 부분집합 생성하기

- 집합의 원소가 n개일 때, 공집합을 포함한 부분집합의 수는 2<sup>n</sup>개이다.

  - n개의 비트로 이루어진 2진수로 부분집합을 표현할 수 있다. => **<u><비트 표현></u>**

- **<u><비트 표현></u>** ex) `{1, 2, 3}`의 부분집합 n개의 비트를 가진 2진수로 표현하기

  - 공집합 : 000 / {1} : 100 / {2} : 010 / {3} : 001 / {1, 2} : 110 / {2, 3} : 011 / {1, 3} : 101 / {1, 2, 3} : 1111

  - 각 자리의 요소가 있으면 1, 없으면 0으로 대응된다.
  - 위 2진수를 10진수로 표현할 수 있다. ex) {1} : 100<sub>(2)</sub> = 4 / {2, 3} : 011<sub>2</sub> = 3
  - 10진수의 값을 각각의 부분집합에 대응시킨다.

```python
# 비트 표현은 보통 재귀 호출 방법으로 이용한다.

arr = 'ABC'
bits = [0] * 3

def print_set(bits):
    print(bits, end=' ')
    for i in range(len(bits)):
        if bits[i]:
            print(arr[i], end=' ')
    print()

for i in range(2):
    bits[0] = i
    for i in range(2):
        bits[1] = i
        for i in range(2):
            bits[2] = i
            for i in range(2):
                print_set(bits)
```

- 각 원소를 부분집합에 포함시키거나 포함시키지 않는 2가지 경우를 모든 원소에 적용한 경우의 수와 같다.

<br>

#### (2) 비트 연산자(<u>실행 속도가 제일 빠름!!</u> / 이들을 활용하여 코드를 작성해보자)

> 논리 연산자

- `&` : 비트 단위로 **AND 연산**
- `|` : 비트 단위로 **OR 연산**
- `^` : 비트 단위로 **XOR 연산**
- `~` : 비트 단위로 **NOT 연산**

> Shift 연산자

- `<<` : 피연산자의 **비트 열을 왼쪽으로 이동**시킴
  - `a << n` : a가 2<sup>n</sup> 배 만큼 증가함.
  - **`1 << n` : 원소가 n개일 경우 <u>모든 부분집합의 수</u>를 의미함.**
  - **`i & (1<<j)` : i의 <u>j번째 비트가 1인지 아닌지</u>를 리턴함 => `0` 또는 2<sup>j</sup> 가 리턴됨**
- `>>` : 피연산자의 **비트 열을 오른쪽으로 이동**시킴
  - `a >> n` : a가 2<sup>n</sup> 배 만큼 감소됨.(=`÷2`)
  - 단, `a = 5`이고 `a >> 1` shift 연산을 수행하면 LSB에 있는 `1`이 나가고 최종적으로 `2`가 출력된다.

```python
if n % 2 == 0:
    print('짝수')
else:
    print('홀수')

# 두 구문의 동작은 같지만 위 구문보다 아래 구문이 실행속도가 훨씬 빠름!
if n & 1: # 2의 0승 자리에 값이 있는지 없는지만 확인하면 홀, 짝 구분 가능!
    print('짝수')
else:
    print('홀수')
```

cf) 10진수, 2진수, 16진수 표현

```python
# 전부 다 10진수 10을 나타내는 표현

num = 10 # 10진수 표현
num2 = 0b1010 # 2진수 표현
num16 = 0xa # 16진수 표현
print(num, num2, num16)
```

- 부분집합 생성하기

```python
arr = [3, 6, 7, 1, 5, 4]

n = len(arr)	# n : 원소의 개수

for subset in range(1 << n):	 # 1 << n : 부분 집합의 개수
    print(subset, end = '> ')	# 부분집합 No.
    for j in range(n + 1):	# 원소의 수만큼 비트를 비교함
        if subset & (1 << j):	# subset의 j번째 비트가 1이면 j번째 원소 출력
            print(arr[j], end=' ')
    print()
```

- 원소의 합이 0이 되는 부분집합의 개수 구하기

```python
arr = [3, 6, -2, 7, -3, 1, -5, -1, 5, 4]

n = len(arr)

zero_subset_count = 0

for subset in range(1 << n): # subset 은 부분집합을 표현하는 값
    Sum = 0
    result = []
    for j in range(n + 1):
        if subset & (1 << j): # arr[j]를 포함하는지 확인
            result.append(arr[j])
            Sum += arr[j]
    if not Sum:
        zero_subset_count += 1
        print('{:>3}> {}'.format(subset, result))
print('원소의 합이 0이 되는 부분집합의 총 개수 : {}'.format(zero_subset_count))
```

<br>

### 3.4 순차 검색(Sequential Search)

#### (1) 정렬되어 있지 않은 경우

- 첫 번째 원소부터 순서대로 검색 대상과 키 값이 같은 원소가 있는지 비교하며 찾기
- 키 값이 동일한 원소를 찾으면 그 원소의 인덱스를 반환
- 자료구조의 마지막에 이를 때까지 검색 대상을 찾지 못하면 검색 실패
- 찾고자 하는 원소의 순서에 따라 비교횟수가 결정됨
  - 정렬되지 않은 자료에서의 순차 검색의 평균 비교 횟수 = `(n+1)/2`
  - 시간 복잡도 : **O(n)** (평균과 최악 모두 O(n)임)

<br>

#### (2) 정렬되어 있는 경우

- 자료를 순차적으로 검색하면서 키 값을 비교하여, 원소의 키 값이 검색 대상의 키 값보다 크면 찾는 원소가 없다는 것이므로 더 이상 검색하지 않고 검색을 종료한다.

- 찾고자 하는 원소의 순서에 따라 비교횟수가 결정됨
  - 정렬이 되어있으므로, 검색 실패를 반환하는 경우 평균 비교 횟수가 반으로 줄어든다.
  - 시간 복잡도 : **O(n)**

<br>

### 3.5 이진 검색(Binary Search)

- 자료의 **가운데에 있는 항목의 키 값과 비교**하여 다음 검색의 위치를 결정하고 검색을 계속 진행하는 방법
  - 목적 키를 찾을 때까지 이진 검색을 순환적으로 반복 수행함으로써 **검색 범위를 반으로 줄여가면서** 보다 **빠르게 검색**을 수행
- 이진 검색을 하기 위해서는 **<u>자료가 정렬된 상태</u>**여야 한다.

![02_day01_01](https://user-images.githubusercontent.com/52685250/62020085-7091f780-b1fc-11e9-88c7-6c41131b6da3.JPG)

- 이진 탐색 파이썬 코드 구현

```python
def binary_search(arr, key):
    lo, hi = 0, len(arr)-1

    while lo <= hi:
        mid = (lo + hi) >> 1 # (lo + hi) // 2 와 같은 의미
        if arr[mid] == key:
            return mid
        if arr[mid] > key:
            hi = mid - 1
        else:
            lo = mid + 1
            
    return -1 # 못 찾는 경우 -1을 리턴한다고 가정
```

- 재귀 함수로 이진 탐색 파이썬 코드 구현(재귀 함수는 나중에 더 자세히 배움)

```python
def binarySerach(arr, lo, hi, key):

    if lo > hi: return False
    
    mid = (lo + hi) // 2
    if arr[mid] == key:
        return True
    if arr[mid] > key:
        return binarySerach(arr, lo, mid - 1, key)
    else:
        return binarySerach(arr, mid + 1, hi, key)
```

<br>

### 3.6 인덱스

- 테이블에 대한 동작 속도를 높여주는 자료 구조를 일컫으며 Database 분야가 아닌 곳에서는 Look up table 등의 용어를 사용하기도 함.
- 인덱스를 저장하는데 필요한 디스크 공간은 보통 테이블을 저장하는데 필요한 디스크 공간보다 작다.
  - 보통 인덱스는 키-필드만 갖고 있고, 테이블의 다른 세부 항목들은 갖고 있지 않기 때문
- 대량 데이터의 성능 저하 문제를 해결하기 위해 **배열 인덱스**를 사용할 수 있음.

<br>

### 3.7 선택 정렬(Selection Sort)

- 주어진 자료들 중 가장 작은 값의 원소부터 차례대로 선택하여 위치를 교환하는 방식

```python
arr = [64, 25, 10, 22, 11]
N = len(arr)

for i in range(N - 1):
    minIdx = i
    for j in range(i + 1, N):
        if arr[minIdx] > arr[j]:
            minIdx = j
    arr[i], arr[minIdx] = arr[minIdx], arr[i]
    print('{}번째 패스 : {}'.format(i + 1, arr))
print('최종 결과: {}'.format(arr))
```

![선택정렬](https://user-images.githubusercontent.com/52685250/62444617-f5e75000-b798-11e9-8873-d59835ae604c.JPG)

> 셀렉션 알고리즘(Selection Algorithm)

- 저장되어 있는 자료로부터 k번째로 큰 혹은 작은 원소를 찾는 방법
- 최솟값, 최댓값 혹은 중간값을 찾는 알고리즘을 의미하기도 함
- k번째로 작은 원소를 찾는 알고리즘
  - 1번부터 k번째까지 작은 원소들을 찾아 배열의 앞쪽으로 이동시키고, 배열의 k번째를 반환함
  - k가 비교적 작을 때 유용하며 O(kn)의 수행시간을 필요로 함
  - 나중에 이보다 더 좋은 `퀵 정렬`과 같은 방법으로도 할 수 있다는 사실을 기억!

![캡처](https://user-images.githubusercontent.com/52685250/62444791-7017d480-b799-11e9-89dc-268c6f6dc22e.JPG)

<br>

------

<br>

## 4. 8월06일(04일차)

### 4.1  [예제]색종이 문제

```python
import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())

for i in range(T):
    N = int(input())
    color = []
    for j in range(N):
        color_info = list(map(int, input().split()))
        color.append(color_info)

    arr = [[0] * 10 for a in range(10)]
    data_count = len(color)
    purple_count = 0
    for a in range(data_count):
        for b in range(color[a][1], color[a][3]+1):
            for c in range(color[a][0], color[a][2]+1):
                if arr[b][c] != color[a][4]:
                    arr[b][c] += color[a][4]
                if arr[b][c] == 3:
                    purple_count += 1


    # 색칠 확인용
    for p in range(10):  # 9X9 배열을 보기좋게 작성함
        for q in range(10):
            print('{:>2}'.format(arr[p][q]), end=' ')
        print()

    # 보라색 개수 확인
    print('#{} {}'.format(i+1, purple_count))
```

<br>

### 4.2 [예제]부분집합의 합

```python
import sys
sys.stdin = open('sample_input.txt', 'r')

T = int(input())
arr = [a+1 for a in range(12)]
n = len(arr)
for i in range(T):
    count = 0
    data = list(map(int, input().split()))
    for subset in range(1 << n):
        Sum = 0
        arr_2 = []
        for j in range(n+1):
            if subset & (1<<j):
                arr_2.append(arr[j])
                Sum += arr[j]
        if len(arr_2) == data[0] and Sum == data[1]:
            count += 1
    print('#{} {}'.format(i+1, count))
```


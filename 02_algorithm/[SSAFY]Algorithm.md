# [SSAFY]Algorithm(written by wally-wally)

------

**※참고사항※**

- `[SSAFY]Algorithm`은 정규과정 `Algorithm`을 진행한 내용들을 작성함.
- 최대한 수업 시간의 모든 내용을 담으려했으나 없는 내용이 있을 수도 있음.

------

<br>

<br>

## 1. 7월29일(01일차)

### 1.1 알고리즘(algorithm)

- `알고리즘`의 정의
  - 컴퓨터가 어떤 일을 수행하기 위한 단계적 방법
  - 어떠한 문제를 해결하기 위한 절차
- 좋은 알고리즘의 조건
  - `정확성`↑(이게 제일 중요)
  - `작업량`↓, `메모리 사용량`↓, `단순성`, `최적성`

<br>

### 1.2 시간 복잡도(Time Complexity)

- 특징
  - **알고리즘의 작업량**을 표현할 때 사용
  - **실제 걸리는 시간**을 측정
  - **실행되는 명령문의 개수**를 계산
- 시간 복잡도 표현 방법
  - 빅오 : `O(  )` => 최악의 경우
  - 오메가 : `Ω(  )` => 최선의 경우
  - 씨타 : `θ(  )` => 최악 = 최선인 경우(빅오랑 같다고 봐도 무방)

> <n개 요소가 있는 List의 순차 검색에서 '최악'과 '최선'의 경우>
>
> 순차 검색 : key를 List의 첫 번째 요소부터 차례대로 검색하는 경우
>
> '최악' : 맨 마지막에 찾거나 없거나 => 1
>
> '최선' : 맨 처음에 발견 => n

- **빅-오(O) 표기법(Big-Oh Notation)**

  - n이 커지면 얼마나 복잡해지는지 알 수 있음

  - 시간 복잡도 함수 중에서 **<u>가장 큰 영향력을 주는 n에 대한 항만</u>**을 표시

  - ```python
    def func(n):
        # 실행문 --- 1번
        for i in range(n):
            # 실행문 --- n번
            for j in range(i, n):
                # 실행문 --- x번 (x를 대략 n*(n+1)/2 라고 하자)
              
    # => (n*(n+1)/2) + n + 1 = 2n^2 + 10n + 4
    # 가장 높은 차수의 항이 무엇인지 중요! => 이 알고리즘의 시간 복잡도 판단 가능!
    ```

  - **최고차항만 선택** 후 **계수(Coeffcient)는 생략**하여 표시

  - `O(2n^2+10n+4)` = `O(2n^2)` = `O(n^2)`

  - `O(4)` = `O(1)`

  - 빅-오 표기법에서 `logn`은 log<sub>2</sub> n이다.

- **순차 검색**에서 '최악'과 '최선'의 경우

  - 순차 검색 : key를 List의 첫 번째 요소부터 차례대로 검색하는 경우
  - '최악' : 맨 마지막에 찾거나 없거나 => 1
  - '최선' : 맨 처음에 발견 => n

- **이진 탐색**

  ![02_day01_01](https://user-images.githubusercontent.com/52685250/62020085-7091f780-b1fc-11e9-88c7-6c41131b6da3.JPG)

- P(Polynomial) 문제 집합 & NP 문제 집합

  - P 문제 집합 : 시간복잡도가 O(logn), O(n), O(nlogn), O(n<sup>2</sup>), O(n<sup>3</sup>) 
  - NP 문제 집합 : 위 보다 더 큰 시간복잡도를 가진 알고리즘으로 해결되는 문제 집합 ( O(2<sup>n</sup>), O(n!) )

<br>

### 1.3  정렬(Sort)

> `정렬(Sort)` : 2개 이상의 자료를 특정 기준에 의해 작은 값부터 큰 값(오름차순 : ascending), 혹은 그 반대의 순서대로(내림차순 : descending) 재배열하는 것

#### (1) 버블 정렬(Bubble Sort) (강의교안 : p.36)

- **<u>인접한 두 개의 원소</u>**를 비교하며 자리를 계속 교환하는 방식

- 정렬 과정(오름차순일 때)

  - 첫 번째 원소부터 인접한 원소끼리 계속 자리를 교환하면서 맨 마지막 자리까지 이동

  - 한 단계가 끝나면 가장 큰 원소가 마지막 자리로 정렬

  - ```
    list = [55, 7, 78, 12, 42]과 같이 원소가 5개인 리스트의 경우
    
    1st 패스 : (0, 1) - (1, 2) - (2, 3) - (3, 4) => list[4] 결정
    2nd 패스 : (0, 1) - (1, 2) - (2, 3) => list[3] 결정
    3rd 패스 : (0, 1) - (1, 2) => list[2] 결정
    4th 패스 : (0, 1) => list[1] 결정 후 이어서 바로 list[0] 결정
    ```

  - list의 요소가 n개인 경우 n-1번 버블 정렬을 거치면 된다.

- 시간 복잡도 : O(n<sup>2</sup>)

```python
arr = [55, 7, 78, 12, 42]
n = len(arr) # list의 길이

for i in range(n-1, 0, -1): # 한 패스당 마지막 위치 지정(-1step)
    for j in range(i):
        if arr[j] > arr[j+1]:
            arr[j], arr[j+1] = arr[j+1], arr[j] # swap

print(arr)
```

<br>

#### (2) 선택 정렬(Selection Sort)(오름차순) 맛보기 (강의교안 : p.90)

- 정렬과정

```
list = [55, 7, 78, 12, 42]과 같이 원소가 5개인 리스트의 경우

1st 패스 : (0, 1) - (0, 2) - (0, 3) - (0, 4) => list[0] 결정
2nd 패스 : (1, 2) - (1, 3) - (1, 4) => list[1] 결정
3rd 패스 : (2, 3) - (2, 4) => list[2] 결정
4th 패스 : (3, 4) => list[3] 결정 후 이어서 바로 list[4] 결정
```

```python
arr = [55, 7, 78, 12, 42]

for j in range(len(arr)-1):
    min = j
    
    for i in range(j+1, len(arr)):
        if arr[i] < arr[min]:
            min = i

    arr[j], arr[min] = arr[min], arr[j]
    
print(arr)
```

<br>

#### (3) 카운팅 정렬(Counting Sort) (강의교안 : p.42)

- 항목들의 순서를 결정하기 위해 집합에 각 항목이 **<u>몇 개씩 있는지 세는 작업</u>**을 하여, **선형 시간(즉, 일차 함수, linear)에 정렬**하는 효율적인 알고리즘

- **<u>실제의 값 자체를 인덱스(index)로 활용</u>**한다. 그래서 값의 범위를 알아야 한다.(즉, 최댓값을 알아야 한다.)

- 제한 사항

  - 카운트들을 위한 충분한 공간을 할당하려면 **집합 내의 가장 큰 정수를 알아야** 한다.
  - 정수나 정수로 표현할 수 있는 자료에 대해서만 적용 가능(음수 불가능) : 정렬할 값들이 **양의 정수** 또는 변환할 값들이 양의 정수일 때 가능. 문자열인 경우 양의 정수로 매핑할 수 있는 경우 가능.

- 시간 복잡도 : O(n+k) (단, n은 리스트의 길이, k는 정수의 최댓값)

- 정렬과정

  - ```python
    # Step 1
    
    data = [0, 4, 1, 3, 1, 2, 4, 1]
    counts = [0] * 5 # 최댓값 = 4 이므로 0이 5개가 있는 리스트를 먼저 만든다.
    
    for val in data:
        counts[val] += 1
    
    print(counts) # => [1, 3, 1, 1, 2]
    ```

  - ```python
    # Step 2-(1)(꼼수 카운팅 정렬 방법)
    
    data = [0, 4, 1, 3, 1, 2, 4, 1]
    counts = [0] * 5 # 최댓값 = 4 이므로 0이 5개가 있는 리스트를 먼저 만든다.
    
    for val in data:
        counts[val] += 1
    
    sorted = []
    for i in range(len(counts)):
        for j in range(counts[i]):
            sorted.append(i)
    print(sorted) # => [0, 1, 1, 1, 2, 3, 4, 4]
    ```

  - ```python
    # Step 2-(2)(누적 빈도수 계산)
    
    # 강의 교안 정렬 과정을 보고 코드를 작성해보자.
    
    data = [0, 4, 1, 3, 1, 2, 4, 1]
    counts = [0] * 5
    temp = [0] * len(data)
    
    for val in data:
        counts[val] += 1
    
    for i in range(1, len(counts)):
        counts[i] = counts[i-1] + counts[i] # 누적 빈도수 계산하여 counts의 원소를 조정
    
    for j in range(len(data)-1, -1, -1):
        counts[data[j]] -= 1
        temp[counts[data[j]]] = data[j]
    
    print(temp)
    ```

<br>

#### (4) 완전 탐색(Exaustive Search)(Brute-force 혹은 generate-and-test 기법)

> `최적화 문제` : 최대 혹은 최소가 되는 경우를 찾는 문제

- 문제의 해법으로 생각할 수 있는 **<u>모든 경우의 수를 나열해보고 확인</u>**하는 기법
- 모든 경우의 수를 테스트한 후, 최종 해법을 도출
- 일반적으로 경우의 수가 상대적으로 작을 때 유용
- 모든 경우의 수를 생성하고 테스트하기 때문에 수행 속도는 느리지만, 해답을 찾아내지 못할 확률이 작음
- `순열`, `조합` 같은 조합론 개념을 알아두면 용이

<br>

#### (5) 순열(Permutation)

```python 
# ABC 문자 세 개로 배열할 수 있는 모든 경우 나열(중복순열)

data = 'ABC'

n = len(data)
for i in range(n):
    for j in range(n):
        for k in range(n):
            print(data[i], data[j], data[k])


```

```python
# 위 중복순열 코드를 순열 코드로 변경 ==> 나중엔 이거를 재귀호출로 작성할 것임.(백 트래킹???)

data = 'ABC'

n = len(data)
for i in range(n):
    for j in range(n):
        if i == j: continue
        for k in range(n):
            if i == k or j == k: continue
            print(data[i], data[j], data[k])
"""
A B C
A C B
B A C
B C A
C A B
C B A
"""


```

<br>

------

<br>

## 2. 7월30일(02일차)

### 2.1 최적화 문제

#### (1) 최적화 문제의 기본 해결 방법 → `완전 검색`

- 최대 혹은 최소가 되는 경우를 찾는 문제
- 모든 가능한 경우를 조사한다.
- 모든 후보해를 조사한다.
- 모든 가능한 경우들이 조합과 관련이 깊다.
  - 순열(n!), 부분집합(2<sup>n</sup>), 조합

<br>

#### (2)완전 검색을 좀 더 효율적으로 하는 방법

- 백 트래킹(가지치기)
- 동적 계획법(메모이제이션)
- 즉, `백 트래킹`과 `동적 계획법` 둘 다 모두 완전 검색이다.
- 완전 검색과는 별개로 `분할 정복`, `탐욕` 방법이 있다.

<br>

### 2.2 탐욕(Greedy) 알고리즘

- **최적해**를 구하는 데 사용되는 근시안적인 방법
- 여러 경우 중 하나를 결정해야 할 때마다 **<u>그 순간에 최적이라고 생각되는 것을 선택</u>**해 나가는 방식으로 진행하여 최종적인 해답에 도달

<br>

------

<br>

## 3. 8월05일(03일차)

### 3.1 슬라이딩 윈도우(sliding window)

- 배열의 연속적인 구간(sub-array, 윈도우)을 왼쪽에서 오른쪽으로 움직이면서 문제를 해결하는 방법
- SUM = 첫 번째 구간(0 ~ M - 1)의 합을 구한다.
- 다음 구간 부터 `SUM = SUM - A + B` 

<a href="http://blog.naver.com/PostView.nhn?blogId=kks227&logNo=220795165570&redirect=Dlog&widgetTypeCall=true">![슬라이딩 윈도우](https://user-images.githubusercontent.com/52685250/62431858-66c14480-b766-11e9-8761-6547e52f90fa.png)</a>

( 이미지 출처 : http://blog.naver.com/PostView.nhn?blogId=kks227&logNo=220795165570&redirect=Dlog&widgetTypeCall=true )

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




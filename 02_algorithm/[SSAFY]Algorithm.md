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

<br>

------

<br>

## 5. 8월12일(05일차)

### 5.1 컴퓨터에서 문자의 표현

- 각 문자에 대해서 대응되는 숫자를 정해 놓고 이것을 메모리에 저장한다.
  - 영어가 대소문자 합쳐서 52 이므로 6(64가지)비트면 모두 표현할 수 있다. 이를 코드체계라고 함.

#### (1) ASCII 코드

- `7bit` 인코딩으로 `128문자`를 표현 = 출력 불가능한 제어 문자(33개) + 공백을 비롯한 출력 가능한 문자(95개)
- 숫자 0(ASCII = `48`) 부터 9까지 차례대로 / 알파벳 대문자 A(ASCII = `65`) 부터 Z까지 차례대로 / 알파벳 소문자a(ASCII = `97`)부터 차례대로
- `ord`, `chr`
  - `print(ord('A'))` 알파벳 대문자 A에 대한 ASCII코드 값을 알 수 있음.
  - `print(chr(65))` : ASCII 코드값이 `65`인 문자가 어떤 것인지 알고 싶을 때
- 확장 아스키 : 표준 문자 이외의 도형 문자, 특수 문자 등 부가적인 문자를 128개 추가할 수 있게 하는 부호
  - 기존 아스키 코드의 7bit와 달리 1B 내의 8bit를 모두 사용함으로써 추가적인 문자를 표현할 수 있음

<br>

#### (2) 유니코드(Unicode)

- 다국어 처리를 위해 마련한 표준 코드체계

- 보통 최대 4Byte까지 쓴다.

- big-endian, little-endian(알고리즘 풀 때는 몰라도 됨!)

  <a href="https://genesis8.tistory.com/37">![endian](https://user-images.githubusercontent.com/52685250/62844241-d8ffcf00-bcfa-11e9-8fbd-da169c8caab9.JPG)</a>

  - big-endian : 앞에서부터 시작주소로 고려하여 메모리 할당
  - little-endian : 뒤에서부터 시작주소로 고려하여 메모리 할당(요즘 방식)

<br>

### 5.2 문자열 처리 방법

- `char` 타입 없음
- 텍스트 데이터의 취급방법이 통일되어 있음
- 문자열 기호 : `'` `''` `'''` (따옴표) , `+` (연결), `*` (반복)
- 문자열은 **시퀀스 자료형**으로 분류되고, 시퀀스 자료형에서 사용할 수 있는 **인덱싱, 슬라이싱 연산들을 사용**할 수 있음

```python
arr = 'ABCDEFG'

# 값 자체를 가져와서 출력 가능
for ch in arr:
    print(ch, end=' ')
    
# 인덱싱으로도 가능
for i in range(len(arr)):
    print(arr[i], end=' ')
    
# 문자열에 있는 요소를 쪼개어 리스트에 하나하나 넣기
mylist = list(arr)
```

- **문자열은 튜플과 같이 요소값을 변경할 수 없음**(**<u>immutable</u>**)

<br>

### 5.3 문자열 조작

#### (1) 문자열 뒤집기

> 슬라이싱으로 간단히 해결(**뒤집는건 가급적 이걸로 하자**)

```python
arr = 'algorithm'
print(arr[::-1]) # mhtirogla와 같이 출력됨
```

> 직접 구문짜서 구현하기

![swap](https://user-images.githubusercontent.com/52685250/62845889-da36f900-bd06-11e9-879c-c207ffe06d98.JPG)

```python
arr = 'algorithm'
arr = list(arr) # 수정하기 위해서 쪼개서 리스트로 저장
n = len(arr)
for i in range(n//2):
    # arr[i] <-> arr[n - 1 - i]
    arr[i], arr[n - 1 - i] = arr[n - 1 - i], arr[i]
print(''.join(arr)) # 위와 같이 동일하게 mhtirogla로 출력됨
```

- 이와 같은 내용은 `회문(palindrome)` 검사할 때 자주 사용된다!(<a href="https://m.blog.naver.com/PostView.nhn?blogId=itperson&logNo=220900000740&proxyReferer=https%3A%2F%2Fwww.google.com%2F">회문</a>)
  - `회문(palindrome)` : 앞에서 부터 읽으나, 뒤에서 부터 읽으나 같은 문자인 경우
  - 간단한 회문 예제 : <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5PyTLqAf4DFAUq&categoryId=AV5PyTLqAf4DFAUq&categoryType=CODE&&&">1989.초심자의 회문 검사</a> (아래 구문 참고)

```python
# 회문인 경우 1을 출력, 아닌 경우 0을 출력하는 구문
for i in range(int(input())):
    data = input()
    print('#{} {}'.format(i+1, 1 if data == data[::-1] else 0))
   
# 아래 방법으로도 가능
for i in range(int(input())):   
    data = input()
    n = len(data)
    for j in range(n//2):
        if data[j] != data[n - 1 - j]:
            print('#{} {}'.format(i + 1, 0))
            break
    else:
        print('#{} {}'.format(i + 1, 1))
```

<br>

#### (2) 문자열 비교

- 문자열 비교시 `사전순 정렬`을 사용한다.
  - 사전순으로 먼저 오는게 더 작고, 나중에 오는게 더 크다.
  - 실제 내부적으로는 ASCII 코드 값으로 비교한다.

```python
print('aaa' == 'aab') # False
print('aaa' < 'aab') # True
print('aaa' > 'aab') # False

astr = 'aaa'
bstr = 'aab'
print(astr < bstr) # 이렇게 해도 위와 동일하게 같은 결과 출력됨.
```

<br>

#### (3) 문자열 숫자를 정수로 변환하기

- **파이썬 내장 함수** 사용 : `int('123')`, `float('3.14')`, `str(123)`, `repr(123)`
- 일일이 코드로 구현하기 보다 내장 함수를 사용하는 것이 훨씬 더 효율적!!

<br>

### 5.4 패턴매칭(pattern matching)

| 문자열 길이에 따른 분류 | 표현법 | 길이 표현 | 인덱싱 할 때 표기법 |
| ----------------------- | ------ | --------- | ------------------- |
| text(조금 긴 문자열)    | t[ ]   | n         | t[i]                |
| pattern(짧은 문자열)    | p[ ]   | m         | p[j]                |

- 모든 패턴 매칭 알고리즘은 두 가지 경우로 나뉜다.
  - `t[i] == p[j]` , `t[i] != p[j]`

#### (1) 고지식한 패턴 검색 알고리즘(Brute Force)

:warning: `Brute Force` 방법은 확실히 알아두자!

<a href="[https://otrodevym.tistory.com/entry/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98%EB%AC%B8%EC%9E%90%EC%97%B4-%EA%B2%80%EC%83%89%EA%B3%A0%EC%A7%80%EC%8B%9D%ED%95%9C-%EA%B2%80%EC%83%89-%EB%9D%BC%EB%B9%88%EC%B9%B4%ED%94%84-KMP-%EB%B3%B4%EC%9D%B4%EC%96%B4%EB%AC%B4%EC%96%B4](https://otrodevym.tistory.com/entry/알고리즘문자열-검색고지식한-검색-라빈카프-KMP-보이어무어)">![brute](https://user-images.githubusercontent.com/52685250/62847352-c85a5380-bd10-11e9-8c4d-7fb0c2378aee.JPG)</a>

- 본문 문자열을 처음부터 끝까지 차례대로 순회하면서 패턴 내의 문자들을 일일이 비교하는 방식으로 동작
- 최악의 경우 시간 복잡도 : `O(MN)` (텍스트의 모든 위치에서 패턴을 비교해야 하므로)
- 예제) `IM-List1`의 `구간합` 문제

```python
p = 'abcdabcdf'
t = 'jslsndfabcdabcdfjksrnosjnnjlzkdle'

n, m = len(t), len(p) # n : 텍스트의 길이, p : 패턴의 길이

# 텍스트에서 패턴이 있을 수 있는 모든 시작 위치
for i in range(n - m + 1):
    for j in range(m):
        if t[i + j] != p[j]:
            break
    else:
        print(t[i:i + m])
        
# 다른 방법으로 작성
i = j = 0
while i < n:
    if p[j] == t[i]:
        i, j = i + 1, j + 1
        if j == m:
            print(t[i - j:])
            break
    else:
        i = i - j + 1
        j = 0
        
# 또는 이렇게
i = j = 0
while i < n:
    if p[j] != t[i]: # 불일치가 일어났을 때 i와 j의 시작위치 설정이 아주 중요!
        i = i - j
        j = -1
    i, j = i + 1, j + 1
    if j == m:
        print(t[i - j:])
        break # break를 j = 0으로 바꾸면 이미 하나 찾았더라도 뒤에 또 같은게 있는지 확인할 수 있음
```

<br>

#### (2) KMP 알고리즘

![kmp](https://user-images.githubusercontent.com/52685250/62848126-f04bb600-bd14-11e9-81ee-7540a11057f1.JPG)

- Brute Force와 달리 `i`는 절대로 back하지 않고 `j`도 무조건 0이 되지 않는다.
- 불일치가 발생한 텍스트 스트링의 앞 부분에 어떤 문자가 있는지를 미리 알고 있으므로, 불일치가 발생한 앞 부분에 대하여 다시 비교하지 않고 매칭을 수행
- KMP 알고리즘에서는`접두어`, `접미어`의 개념을 미리 알고 있어야 한다.
  - 길이가 4인 문자열 `abcd` 가 있다고 가정하자.
  - 접두어와 접미어 개수는 문자열의 길이만큼 있다.
    - 접두어 : `a`, `ab`, `abc`, `abcd`
    - 접미어 : `d`, `cd`, `bcd`, `abcd`
  - 문자열 전체인 경우를 제외한 길이가 같으면서 내용이 같은 접두어, 접미어(공통되는 접두어, 접미어)가 있어야 한다.
- 패턴을 전철하여 배열 next[M]을 구해서 잘못된 시작을 최소화함
  - `next[M]` : 불일치가 발생했을 경우 이동할 다음 위치
- 시간 복잡도 : `O(M+N)`

<br>

#### (3) 보이어-무어 알고리즘

- 오른쪽에서 왼쪽으로 비교
- 대부분의 상용 SW에서 채택하고 있는 알고리즘
- 알고리즘 풀 때 잘 구현안 함(생각보다 코드가 복잡...)
- 패턴에 오른쪽 끝에 있는 문자가 불일치하고 이 문자가 패턴 내에 존재하지 않는 경우, `P[]`를 한 칸씩 이동하는 Brute Force와는 달리 이동 거리는 무려 패턴의 길이 만큼 된다.

![31](https://user-images.githubusercontent.com/52685250/62848625-7406a200-bd17-11e9-99c6-46ec1e49ea64.JPG)

- 오른쪽 끝에 있는 문자가 불일치 하고 이 문자가 패턴 내에 존재할 경우

![32](https://user-images.githubusercontent.com/52685250/62848626-749f3880-bd17-11e9-9d4d-1ef1c8eae765.JPG)

<br>

### 5.5 재귀 호출

- 재귀 함수 : 자기 자신을 호출하는 함수
- 재귀 호출 : 재귀적 정의(점화식) 구현하기 위해 사용
  - 재귀 호출은 for, while을 사용하지 않고 '반복'적 작업을 할 수 있다.
  - 그래프의 깊이 우선 탐색, 백트래킹 구현시 재귀 호출 사용됨

```python
def printHello(i):
    if i < 3:
        print('Hello!!!')
        printHello(i + 1)

# -------------------------

printHello(0)
```

```python
# 이 방법도 가능함
def printHello(i):
    if i == 3:
        print('------------------')
    else:
        print('Hello!!!')
        printHello(i + 1)

# -------------------------

printHello(0)
```

```python
# 우리가 알고있는 순서대로 0 -> 1 -> 2로 출력됨
def printHello(i, n):
    if i == n:
        print('------------------')
        return
    print(i, '> Hello!!!')
    printHello(i + 1, n)

# -------------------------

printHello(0, 3)

"""
0 > Hello!!!
1 > Hello!!!
2 > Hello!!!
------------------
"""
```

```python
# 되돌아오면서 2 -> 1 -> 0으로 출력됨
def printHello(i, n):
    if i == n:
        print('------------------')
        return
    printHello(i + 1, n)
    print(i, '> Hello!!!')

# -------------------------

printHello(0, 3)

"""
------------------
2 > Hello!!!
1 > Hello!!!
0 > Hello!!!
"""
```

```python
cnt = 0
def printHello(i, n):
    global cnt
    if i == n:
        cnt += 1
        return
    printHello(i + 1, n)

# -------------------------

printHello(0, 3)
print(cnt) # 1이 출력됨
```

```python
cnt = 0
def printHello(i, n):
    global cnt
    if i == n:
        cnt += 1
        return
    printHello(i + 1, n)
    printHello(i + 1, n)

# -------------------------

printHello(0, 3)
print(cnt) # 8이 출력됨
```

<br>

------

<br>

## 7. 8월19일(07일차)

### 7.1 스택(Stack)

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


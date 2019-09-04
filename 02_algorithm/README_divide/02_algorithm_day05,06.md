# :notebook_with_decorative_cover: 02_algorithm - Day05, 06

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

## 6. 8월13일(06일차)

### 6.1 [예제] <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV14QpAaAAwCFAYi&categoryId=AV14QpAaAAwCFAYi&categoryType=CODE">회문1</a>

```python
for tc in range(1, 11):
    N = int(input())
    arr = [input() for _ in range(8)]
    ans = 0

    # 모든 행에 대해서
    for idx in range(8):
        # 한 행에 대해서
        # 길이가 N인 문자열의 모든 시작 위치 : 0 ~ 8 - N
        for s in range(8 - N + 1):
            e = s + N - 1
            for i in range(N//2):
                if arr[idx][s + i] != arr[idx][e - i]:
                    break
            else:
                ans += 1
            # 열에 대하여
            for i in range(N//2):
                if arr[s + i][idx] != arr[e - i][idx]:
                    break
            else:
                ans += 1
    print('#{} {}'.format(tc, ans))
```

<br>

### 6.2 [예제] <a href="https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV14Rq5aABUCFAYi">회문2</a>

> 방법1

```python
for tc in range(1, 11):
    N = int(input())
    arr = [input() for _ in range(100)]
    ans = 1

    for idx in range(100):
        for s in range(100):
            for e in range(99, s, -1):
                L = e - s + 1
                if ans >= L:
                    break
                for i in range(L//2):
                    if arr[idx][s + i] != arr[idx][e - i]:
                        break
                else:
                    ans = L
                if ans >= L:
                    break
                for i in range(L//2):
                    if arr[s + i][idx] != arr[e - i][idx]:
                        break
                else:
                    ans = L
    print('#{} {}'.format(tc, ans))
```

> 방법2

```python
for tc in range(1, 11):
    N = int(input())
    arr = [input() for _ in range(100)]
    ans = 0

    for idx in range(100):
        for x in range(100): # x : 기준 위치
            # 길이가 짝수인 경우에는 x -> l(왼쪽)
            # 행
            l, r, cnt = x, x + 1, 0
            while l >= 0 and r < 100:
                if arr[idx][l] != arr[idx][r]:
                    break
                cnt += 2
                l, r = l - 1, r + 1
            ans = max(ans, cnt)

            # 열
            l, r, cnt = x, x + 1, 0
            while l >= 0 and r < 100:
                if arr[l][idx] != arr[r][idx]:
                    break
                cnt += 2
                l, r = l - 1, r + 1
            ans = max(ans, cnt)

            # 홀수인 경우
            # 행
            l, r, cnt = x - 1, x + 1, 1
            while l >= 0 and r < 100:
                if arr[idx][l] != arr[idx][r]:
                    break
                cnt += 2
                l, r = l - 1, r + 1
            ans = max(ans, cnt)

            # 열
            l, r, cnt = x - 1, x + 1, 1
            while l >= 0 and r < 100:
                if arr[l][idx] != arr[r][idx]:
                    break
                cnt += 2
                l, r = l - 1, r + 1
            ans = max(ans, cnt)
    print('#{} {}'.format(tc, ans))
```


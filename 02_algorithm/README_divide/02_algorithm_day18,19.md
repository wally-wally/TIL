# :notebook_with_decorative_cover: 02_algorithm - Day18, 19

<br>

## 15. 9월09일(18일차)

### 15.1 비트 연산

#### (1) 비트 연산자

<img src="https://user-images.githubusercontent.com/52685250/64497798-f91bb180-d2eb-11e9-8352-4215e0ab83fa.JPG" alt="bit_operation" width=600px>

<br>

#### (2) 비트 연산

##### ① 부분집합 구하기

| <div style="text-align:center">연산</div>           | <div style="text-align:center">의미</div>        |
| --------------------------------------------------- | ------------------------------------------------ |
| <div style="text-align:center">`1 << n`</div>       | 원소가 n개일 경우 모든 부분집합의 수             |
| <div style="text-align:center">`i & (1 << j)`</div> | 계산 결과는 i의 j번째 비트가 1인지 아닌지를 의미 |

> 부분집합 생성 코드
>
> ```python
> arr = [3, 6, 7, 1, 5, 4]
> 
> n = len(arr)	# n : 원소의 개수
> 
> for subset in range(1 << n):	 # 1 << n : 부분 집합의 개수
>  print(subset, end = '> ')	# 부분집합 No.
>  for j in range(n + 1):	# 원소의 수만큼 비트를 비교함
>      if subset & (1 << j):	# subset의 j번째 비트가 1이면 j번째 원소 출력
>          print(arr[j], end=' ')
>  print()
> ```

##### ② 엔디안(Endianness)

> 엔디안 확인 코드
>
> ```python
> n = 0x00111111
> 
> if n & 0xff:
>  print('little endian')
> else:
>  print('big endian')
> ```

> 엔디안 변환 코드
>
> ```python
> def ce(n):
>  return (n << 24 & 0xff000000) | (n << 8 & 0xff0000) | (n >> 8 & 0xff00) | (n >> 24 & 0xff)
> ```

<br>

### 15.2 진수

> 10진수 <=> n진수 상호 변환
>
> ```python
> """
> 10진수 -> 2, 8, 16진수 문자열로 변환
> 2진수      bin( 정수 )
> 8진수      oct( 정수 )
> 16진수    hex( 정수 )
> ----------------------------------------
> x진수 -> 10진수 변환
> 
> 형식 : int( 정수, 진수 ) // 진수에 해당하는 정수 문자열
> 
> ex) int( 12345, 7 ) -> 7진수를 10진수로 변환
> """
> bina = bin(1024)
> octa = oct(1024)
> hexa = hex(1024)
> print(bina, octa, hexa)
> 
> print(type(bina))
> print(type(int(bina, 2)))
> 
> print(int(bina, 2))
> print(int(octa, 8))
> print(int(hexa, 16))
> ```
>
> ```
> 0b10000000000 0o2000 0x400
> <class 'str'>
> <class 'int'>
> 1024
> 1024
> 1024
> ```

> 8진수(135<sub>(8)</sub>) => 10진수(93) 변환
>
> ```python
> arr = [1, 3, 5]
> result = 0
> for val in arr:
>     result = result * 8 + val
> print(result)
> ```

<br>

### 15.3 실수

- 실수 자료형의 유효 자릿수
  - 32 비트 실수형 유효자릿수(십진수) : 6
  - 64 비트 실수형 유효자릿수(십진수) : 15
- 파이썬에서의 실수 표현 범위
  - 파이썬에서는 내부적으로 더 많은 비트를 사용해서 훨씬 넓은 범위의 실수를 표현할 수 있다.
  - 최대로 표현할 수 있는 값 : 약 1.8 X 10<sup>308</sup> (이 이상은 `inf`로 표현)
  - 최소로 표현할 수 있는 값 : 약 5.0 X 10<sup>-324</sup> (이 이하는 `0`으로 표현)

<br>

------

<br>

## 16. 9월10일(19일차)

### 16.1 [예제] 암호코드 스캔

```python
# 강사님 코드

P = {(2,1,1):0,
     (2,2,1):1,
     (1,2,2):2,
     (4,1,1):3,
     (1,3,2):4,
     (2,3,1):5,
     (1,1,4):6,
     (3,1,2):7,
     (2,1,3):8,
     (1,1,2):9}
A = ord('A')
nine, zero = ord('9'), ord('0')
 
T = int(input())
for tc in range(1, T + 1):
    N, M = map(int, input().split())
    arr = [input() for _ in range(N)]
 
    def getVal(ch):
        t = ord(ch)
        val = (t - A) + 10 if t > nine else t - zero
        return val
 
    def find():
        ret = 0
        for i in range(N):
            j = M - 1
            while j >= 0:
                if arr[i][j] != '0' and arr[i - 1][j] == '0':
                    pwd = []
                    L = MIN = 0
                    val, c = getVal(arr[i][j]), 0
                    for k in range(8):
                        c2 = c3 = c4 = 0
                        while (val & 1) == 0:
                            val, c = val >> 1, c + 1
                            if c == 4:
                                j, c = j - 1, 0
                                val = getVal(arr[i][j])
                        while val & 1:
                            val, c, c4 = val >> 1, c + 1, c4 + 1
                            if c == 4:
                                j, c = j - 1, 0
                                val = getVal(arr[i][j])
                        while (val & 1) == 0:
                            val, c, c3 = val >> 1, c + 1, c3 + 1
                            if c == 4:
                                j, c = j - 1, 0
                                val = getVal(arr[i][j])
                        while val & 1:
                            val, c, c2 = val >> 1, c + 1, c2 + 1
                            if c == 4:
                                j, c = j - 1, 0
                                val = getVal(arr[i][j])
                        if k == 0:
                            MIN = min(c2, c3, c4)
 
                        pwd.append(P[(c2//MIN, c3//MIN, c4//MIN)])
 
 
                    a = pwd[0] + pwd[2] + pwd[4] + pwd[6]
                    b = pwd[1] + pwd[3] + pwd[5] + pwd[7]
                    if ((b*3 + a) % 10) == 0:
                        ret += (a + b)
                j -= 1
        return ret
    #--------------------------------------
    print('#{} {}'.format(tc, find()))
```

<br>

### 16.2 [예제] 이진수2

```python
# 내 코드

for test_case in range(int(input())):
    N = float(input())
    result = ''
    while True:
        value = N * 2
        under_num_list = [int(num) for num in str(value)[2:]]
        if sum(under_num_list) != 0:
            result += str(int(N * 2))
            N = float('0.' + str(value)[2:]) if int(N * 2) == 0 else N * 2 - 1
        else:
            result += '1'
            print('#{} {}'.format(test_case + 1, result))
            break
        if len(result) > 12:
            print('#{} overflow'.format(test_case + 1))
            break
```